import * as THREE from 'three';
import RAPIER from '@dimforge/rapier3d-compat';
import * as Tone from 'tone';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';

// --- STABILITY & DEBUGGING ---
class Logger {
    static info(message, ...args) { console.log(`%c[INFO] ${message}`, 'color: #88aaff', ...args); }
    static warn(message, ...args) { console.warn(`%c[WARN] ${message}`, 'color: #ffaa88', ...args); }
    static error(message, ...args) { console.error(`%c[ERROR] ${message}`, 'color: #ff8888', ...args); }
    static state(char, state) { console.log(`%c[STATE] ${char.name} -> ${state}`, `color: ${char.isPlayer ? '#4D96FF' : '#FF6B6B'}`); }
}

window.onerror = function(message, source, lineno, colno, error) {
    const gameInstance = window.smashGame;
    if (gameInstance) gameInstance.haltGame(error);
    return true;
};

// --- SOUND MANAGER ---
class SoundManager {
    constructor() {
        this.isMuted = true;
        this.sfx = {};
    }
     async init() {
        this.sfx = {
            hit: new Tone.MembraneSynth({ pitchDecay: 0.05, octaves: 4, envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 1.4 } }).toDestination(),
            smash: new Tone.NoiseSynth({ noise: { type: 'pink' }, envelope: { attack: 0.01, decay: 0.3, sustain: 0 } }).toDestination(),
            jump: new Tone.Synth({ oscillator: { type: 'triangle' }, envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 0.1 } }).toDestination(),
            ko: new Tone.MembraneSynth({ pitchDecay: 0.2, octaves: 5, envelope: { attack: 0.01, decay: 0.8, sustain: 0 } }).toDestination(),
            shield: new Tone.MetalSynth({frequency: 250, envelope: { attack: 0.001, decay: 0.1, release: 0.01}, harmonicity: 5.1, modulationIndex: 32, resonance: 4000, octaves: 1.5}).toDestination()
        };
    }
    async start() {
        await Tone.start();
        this.isMuted = false;
        Tone.Transport.start();
    }
    play(sound, note = 'C4', duration = '8n') {
        if (this.isMuted || !this.sfx[sound]) return;
        if (this.sfx[sound] instanceof Tone.NoiseSynth || this.sfx[sound] instanceof Tone.MetalSynth) {
            this.sfx[sound].triggerAttackRelease(duration);
        } else if(this.sfx[sound].triggerAttackRelease) {
            this.sfx[sound].triggerAttackRelease(note, duration);
        }
    }
}

// --- MAIN GAME CLASS ---
class SmashGame {
    constructor() {
        this.isGameOver = false;
        this.isHalted = false;
        this.clock = new THREE.Clock();
        this.soundManager = new SoundManager();
        this.stars = null;
        window.smashGame = this;
    }

    init() {
        this.initUI();
        try {
            this.initEngine();
            this.initScene();
            this.vfxManager = new VFXManager(this.scene);
        } catch (error) {
            this.haltGame(error);
        }
    }

    initEngine() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.camera.position.set(0, 8, 25);
        this.renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas'), antialias: true, powerPreference: "high-performance" });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        
        const renderScene = new RenderPass(this.scene, this.camera);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.7, 0.1, 0.1);
        const smaaPass = new SMAAPass( window.innerWidth * this.renderer.getPixelRatio(), window.innerHeight * this.renderer.getPixelRatio() );
        this.composer = new EffectComposer(this.renderer);
        this.composer.addPass(renderScene);
        this.composer.addPass(bloomPass);
        this.composer.addPass(smaaPass);
        window.addEventListener('resize', () => this.onWindowResize(), false);
    }

    initScene() {
        this.scene.background = new THREE.Color(0x050515);
        this.scene.fog = new THREE.Fog(0x050515, 40, 70);

        const starGeo = new THREE.BufferGeometry();
        const starVertices = [];
        for(let i=0; i<10000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            starVertices.push(x, y, z);
        }
        starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        const starMat = new THREE.PointsMaterial({color: 0xffffff, size: 0.7});
        this.stars = new THREE.Points(starGeo, starMat);
        this.scene.add(this.stars);

        this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
        const keyLight = new THREE.DirectionalLight(0xffeeb1, 1.5);
        keyLight.position.set(10, 20, 10);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 2048; keyLight.shadow.mapSize.height = 2048;
        keyLight.shadow.camera.left = -30; keyLight.shadow.camera.right = 30;
        keyLight.shadow.camera.top = 30; keyLight.shadow.camera.bottom = -30;
        this.scene.add(keyLight);
    }
    
    startGame() {
        if (this.isHalted) return;
        Logger.info("Starting game...");
        this.ui.hud.style.display = 'flex';
        this.world = new RAPIER.World({ x: 0.0, y: -30.0, z: 0.0 });
        this.initEnvironment();
        this.inputManager = new InputManager();
        this.player1 = new CharacterController({ isPlayer: true, name: 'Player1', position: new THREE.Vector3(-5, 5, 0), color: 0x4D96FF, game: this });
        this.cpu = new CharacterController({ isPlayer: false, name: 'CPU', position: new THREE.Vector3(5, 5, 0), color: 0xFF6B6B, game: this });
        this.player1.opponent = this.cpu;
        this.cpu.opponent = this.player1;
        this.animate();
    }

    initEnvironment() {
        const stageMat = new THREE.MeshStandardMaterial({ color: 0x333344, roughness: 0.9, metalness: 0.1 });
        this.createPlatform(new THREE.Vector3(0, 0, 0), new THREE.Vector3(18, 1, 8), stageMat);
        this.createPlatform(new THREE.Vector3(-10, 5, 0), new THREE.Vector3(6, 0.5, 6), stageMat);
        this.createPlatform(new THREE.Vector3(10, 5, 0), new THREE.Vector3(6, 0.5, 6), stageMat);
        this.blastZoneY = -30; this.blastZoneX = 40;
    }
    
    createPlatform(position, size, material) {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(size.x, size.y, size.z), material);
        mesh.position.copy(position);
        mesh.receiveShadow = true;
        this.scene.add(mesh);
        const body = this.world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(position.x, position.y, position.z));
        const collider = RAPIER.ColliderDesc.cuboid(size.x / 2, size.y / 2, size.z / 2);
        this.world.createCollider(collider, body);
    }

    initUI() {
        this.ui = { 
            hud: document.getElementById('hud'), titleScreen: document.getElementById('title-screen'),
            startBtn: document.getElementById('start-btn'),
            p1Percent: document.getElementById('p1-percent'), p1Stocks: document.getElementById('p1-stocks'), 
            cpuPercent: document.getElementById('cpu-percent'), cpuStocks: document.getElementById('cpu-stocks'), 
            gameOverScreen: document.getElementById('game-over-screen'), gameOverText: document.getElementById('game-over-text'), 
            restartBtn: document.getElementById('restart-btn'), 
            errorScreen: document.getElementById('error-screen'), errorMessage: document.getElementById('error-message'),
            reloadBtn: document.getElementById('reload-btn'),
        };
        this.ui.restartBtn.addEventListener('click', () => window.location.reload());
        this.ui.reloadBtn.addEventListener('click', () => window.location.reload());
        this.ui.startBtn.addEventListener('click', async () => {
            this.ui.titleScreen.style.display = 'none';
            await this.soundManager.init();
            await this.soundManager.start();
            this.startGame();
        }, { once: true });
    }

    animate() {
        if (this.isGameOver || this.isHalted) return;
        requestAnimationFrame(() => this.animate());
        const deltaTime = Math.min(this.clock.getDelta(), 0.05);
        
        try {
            if (this.world) this.world.step();
        } catch (error) {
            this.haltGame(new Error(`Physics engine crashed: ${error.message}`));
            return;
        }

        if(this.stars) this.stars.rotation.y += 0.0001;

        if(this.player1) this.player1.update(deltaTime);
        if(this.cpu) this.cpu.update(deltaTime);
        if(this.vfxManager) this.vfxManager.update(deltaTime);
        
        this.checkCollisions();
        this.checkKOs();
        this.updateUI();
        this.updateCamera();
        this.composer.render();
    }
    
    haltGame(error) {
        if (this.isHalted) return;
        this.isHalted = true;
        Logger.error("Halting game due to fatal error:", error);
        
        this.ui.hud.style.display = 'none';
        this.ui.gameOverScreen.style.display = 'none';
        this.ui.titleScreen.style.display = 'none';
        
        this.ui.errorMessage.textContent = error.stack || error.message;
        this.ui.errorScreen.style.display = 'flex';
    }

    checkCollisions() {
        if (!this.player1 || !this.cpu) return;
        this.checkAttack(this.player1, this.cpu);
        this.checkAttack(this.cpu, this.player1);
    }
    
    checkAttack(attacker, target) {
        if (!attacker.activeHitbox || target.isInvincible) return;
        const attackerPos = attacker.body.translation();
        const targetPos = target.body.translation();
        if (Math.hypot(attackerPos.x - targetPos.x, attackerPos.y - targetPos.y) < attacker.activeHitbox.range) {
            target.takeDamage(attacker.activeHitbox.damage, attacker.activeHitbox.knockback, new THREE.Vector3(attackerPos.x, attackerPos.y, 0));
            this.vfxManager.emit(targetPos, 0xffffff, 15, 1.0);
            attacker.activeHitbox = null; 
        }
    }

    checkKOs() {
        if (!this.player1 || !this.cpu || this.isGameOver) return;
        if (this.player1.checkKO(this.blastZoneX, this.blastZoneY)) { this.soundManager.play('ko', 'C2'); this.checkGameOver(); }
        if (this.cpu.checkKO(this.blastZoneX, this.blastZoneY)) { this.soundManager.play('ko', 'C2'); this.checkGameOver(); }
    }

    checkGameOver() {
        if (this.player1.stocks <= 0) this.triggerGameOver("CPU WINS");
        else if (this.cpu.stocks <= 0) this.triggerGameOver("PLAYER 1 WINS");
    }

    triggerGameOver(message) {
        this.isGameOver = true;
        this.ui.gameOverText.textContent = message;
        this.ui.gameOverScreen.style.display = 'flex';
    }

    updateUI() {
        if(!this.player1 || !this.cpu) return;
        this.ui.p1Percent.textContent = `${Math.floor(this.player1.percent)}%`;
        this.ui.p1Stocks.textContent = '●'.repeat(this.player1.stocks);
        this.ui.cpuPercent.textContent = `${Math.floor(this.cpu.percent)}%`;
        this.ui.cpuStocks.textContent = '●'.repeat(this.cpu.stocks);
        const p1Color = new THREE.Color(0xffffff).lerp(new THREE.Color(0xff0000), this.player1.percent / 200);
        this.ui.p1Percent.style.color = `#${p1Color.getHexString()}`;
        const cpuColor = new THREE.Color(0xffffff).lerp(new THREE.Color(0xff0000), this.cpu.percent / 200);
        this.ui.cpuPercent.style.color = `#${cpuColor.getHexString()}`;
    }
    
    updateCamera() {
         if (!this.player1 || !this.cpu) return;
        const p1Pos = this.player1.model.position;
        const cpuPos = this.cpu.model.position;
        const midpoint = new THREE.Vector3().addVectors(p1Pos, cpuPos).multiplyScalar(0.5);
        const distance = Math.max(p1Pos.distanceTo(cpuPos), 10);
        const newZ = Math.max(20, Math.min(distance * 1.0, 45));
        const targetPosition = new THREE.Vector3(midpoint.x * 0.7, 5 + midpoint.y * 0.1, newZ);
        this.camera.position.lerp(targetPosition, 0.04);
        this.camera.lookAt(new THREE.Vector3(midpoint.x, midpoint.y + 2, 0));
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.composer.setSize(window.innerWidth, window.innerHeight);
    }
}

// --- CHARACTER CONTROLLER ---
class CharacterController {
    constructor(config) {
        Object.assign(this, {
            percent: 0, stocks: 3, isInvincible: false, jumps: 2, state: 'idle', stateTimer: 0, 
            activeHitbox: null, faceDirection: 1, isShielding: false, shieldHealth: 100,
            hasUsedRecovery: false, isLedgeGrabbing: false, aiState: 'APPROACHING', aiTimer: 0
        }, config);
        this.faceDirection = this.isPlayer ? 1 : -1;
        this.initPhysics();
        this.initModel();
    }
    
    initPhysics() {
        const bodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(this.position.x, this.position.y, this.position.z).setLinearDamping(0.5).lockRotations();
        this.body = this.game.world.createRigidBody(bodyDesc);
        this.collider = this.game.world.createCollider(RAPIER.ColliderDesc.capsule(0.9, 0.5).setFriction(0.2), this.body);
    }
    
    initModel() {
        this.model = new THREE.Group();
        this.game.scene.add(this.model);
        const material = new THREE.MeshStandardMaterial({ color: this.color, metalness: 0.8, roughness: 0.2, });

        const torso = new THREE.Mesh(new THREE.BoxGeometry(1, 1.5, 0.6), material);
        torso.castShadow = true;
        this.model.add(torso);
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
        head.position.y = 1.25;
        head.castShadow = true;
        this.model.add(head);

        this.rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.25, 1.2, 0.25), material);
        this.rightArm.geometry.translate(0, -0.6, 0); 
        this.rightArm.position.set(-0.6, 0.6, 0);
        this.rightArm.castShadow = true;
        this.model.add(this.rightArm);

        this.leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.25, 1.2, 0.25), material);
        this.leftArm.geometry.translate(0, -0.6, 0);
        this.leftArm.position.set(0.6, 0.6, 0);
        this.leftArm.castShadow = true;
        this.model.add(this.leftArm);
        
        this.model.scale.setScalar(1.2);
    }
    
    update(deltaTime) {
        if (this.stateTimer > 0) {
            this.stateTimer -= deltaTime;
            if (this.stateTimer <= 0 && this.state !== 'ledgegrab') this.enterState('idle');
        }
        if (this.isPlayer) this.handlePlayerInput(); else this.handleAI(deltaTime);
        
        this.checkGrounded();
        if (!this.isLedgeGrabbing) this.updateLedgeGrab();

        if(this.isShielding) {
            this.shieldHealth = Math.max(0, this.shieldHealth - 5 * deltaTime);
            if(this.shieldHealth <= 0) this.breakShield();
        } else {
             this.shieldHealth = Math.min(100, this.shieldHealth + 10 * deltaTime);
        }
        
        const bodyPos = this.body.translation();
        this.model.position.lerp(new THREE.Vector3(bodyPos.x, bodyPos.y - 1.4, bodyPos.z), 0.5);
        this.model.rotation.y = THREE.MathUtils.lerp(this.model.rotation.y, (this.faceDirection > 0 ? 0 : Math.PI), 0.2);
    }
    
    updateLedgeGrab() {
        if (this.grounded || this.jumps > 0 || this.hasUsedRecovery || this.state === 'ledgegrab') return;
        const start = this.body.translation();
        const ray = new RAPIER.Ray({x: start.x, y: start.y + 1.0, z: start.z}, {x: this.faceDirection, y: 0, z: 0});
        const hit = this.game.world.castRay(ray, 1.0, true);
        
        if (hit) {
            const hitPoint = ray.pointAt(hit.toi);
            const verticalRay = new RAPIER.Ray({x: hitPoint.x + this.faceDirection * 0.1, y: hitPoint.y, z: hitPoint.z }, {x: 0, y: -1, z: 0});
            const downHit = this.game.world.castRay(verticalRay, 1.5, true);
            if (!downHit) { 
                this.isLedgeGrabbing = true;
                this.enterState('ledgegrab');
                this.body.setLinvel({x: 0, y: 0, z: 0}, true);
                this.body.setTranslation({x: hitPoint.x - this.faceDirection * 0.5, y: hitPoint.y - 1.0, z: 0}, true);
            }
        }
    }
    
    checkGrounded() {
         const hit = this.game.world.castRay(new RAPIER.Ray(this.body.translation(), { x: 0, y: -1, z: 0 }), 1.5, true);
        if (!!hit !== this.grounded) {
            this.grounded = !!hit;
            if (this.grounded) {
                this.jumps = 2;
                this.hasUsedRecovery = false;
                if (['jumping', 'recovering'].includes(this.state)) this.enterState('idle');
            }
        }
    }

    handlePlayerInput() {
        const input = this.game.inputManager.keys;
        const canAct = !['hitstun', 'attacking', 'ledgegrab', 'shieldstun'].includes(this.state);
        if (!canAct) {
            if (this.state === 'ledgegrab' && (input.jump || input.up)) {
                this.isLedgeGrabbing = false; this.enterState('idle', 0.1); this.jump(1.2);
            }
            return;
        }

        if (input.shield && this.grounded) { this.shield(); return; } 
        else { this.isShielding = false; }
        
        let moveDir = 0;
        if (input.left) moveDir -= 1;
        if (input.right) moveDir += 1;
        
        this.body.setLinvel({ x: moveDir * 12.0, y: this.body.linvel().y, z: 0 }, true);
        if (moveDir !== 0) {
            this.faceDirection = moveDir;
            if (this.grounded && this.state !== 'running') this.enterState('running');
        } else if (this.grounded && this.state === 'running') this.enterState('idle');
        
        if (input.jump) { this.jump(); input.jump = false; }
        if (input.attack) { this.attack('basic'); input.attack = false; }
        if (input.special) { this.attack('special'); input.special = false; }
    }
    
    handleAI(deltaTime) {
        if (this.aiTimer > 0) { this.aiTimer -= deltaTime; return; }
        if (!['idle', 'running', 'jumping'].includes(this.state) || !this.opponent) return;

        const myPos = this.body.translation();
        const opponentPos = this.opponent.body.translation();
        const distance = Math.hypot(myPos.x - opponentPos.x, myPos.y - opponentPos.y);
        const dir = Math.sign(opponentPos.x - myPos.x);

        if (myPos.y < -2 && !this.isLedgeGrabbing) {
            this.aiState = 'RECOVERING';
            this.faceDirection = Math.sign(0 - myPos.x); 
            if(this.jumps > 0) this.jump(1.1);
            else if(!this.hasUsedRecovery) this.attack('special');
            this.aiTimer = 0.5;
            return;
        }

        this.faceDirection = dir;

        if(this.opponent.state === 'attacking' && distance < 4 && Math.random() < 0.8) {
            this.aiState = 'DEFENDING';
            this.shield();
            this.aiTimer = 0.5;
            return;
        }
        
        if(distance < 3.5) {
            this.aiState = 'ATTACKING';
            this.attack(this.percent > 100 && Math.random() < 0.4 ? 'special' : 'basic');
            this.aiTimer = 0.8;
            return;
        }

        this.aiState = 'APPROACHING';
        this.body.setLinvel({ x: dir * 10.0, y: this.body.linvel().y, z: 0 }, true);
        if(this.grounded) this.enterState('running');
    }
    
    enterState(newState, duration = 0.1) {
        if (this.state === newState) return;
        if(!this.isPlayer) Logger.state(this, newState);
        this.state = newState; 
        this.stateTimer = duration;
    }

    shield() {
        if(this.shieldHealth > 20 && this.grounded) {
            this.isShielding = true;
            this.body.setLinvel({x: 0, y: this.body.linvel().y, z: 0}, true);
        }
    }

    breakShield() {
        this.isShielding = false;
        this.shieldHealth = 0;
        this.enterState('shieldstun', 2.0);
    }

    jump(multiplier = 1.0) { 
        if (this.jumps > 0) { 
            this.body.setLinvel({ x: this.body.linvel().x, y: 18.0 * multiplier, z: 0 }, true); 
            this.jumps--; 
            this.enterState('jumping', 0.8);
            this.game.soundManager.play('jump', 'C5');
        } 
    }
    
    attack(type) {
        if (this.state === 'attacking' || this.isLedgeGrabbing) return;
        
        const armToSwing = this.faceDirection > 0 ? this.rightArm : this.leftArm;
        const originalRotation = armToSwing.rotation.z;
        armToSwing.rotation.z = -Math.PI / 2 * this.faceDirection;
        setTimeout(() => { armToSwing.rotation.z = originalRotation; }, 300);

        if (type === 'special' && !this.grounded && !this.hasUsedRecovery) {
            this.enterState('recovering', 0.6);
            this.hasUsedRecovery = true;
            this.body.setLinvel({x: 0, y: 25.0, z: 0}, true);
            this.activeHitbox = { damage: 6, knockback: { base: 4.0, scale: 0.3 }, range: 2.5 };
            setTimeout(() => this.activeHitbox = null, 300);
            return;
        }

        let attackData = {}, startup = 100;

        if (!this.grounded) {
            this.enterState('attacking', 0.4);
            attackData = { d: 7, k: { b: 2.0, s: 0.7 }, r: 2.8 };
        } else {
            if (type === 'basic') {
                this.enterState('attacking', 0.4);
                attackData = { d: 5, k: { b: 1.0, s: 0.4 }, r: 2.5 };
            } else if (type === 'special') {
                this.enterState('attacking', 0.8);
                attackData = { d: 15, k: { b: 6.0, s: 0.9 }, r: 3.5 };
                startup = 150;
            }
        }
        this.game.soundManager.play(type === 'special' ? 'smash' : 'hit');
        setTimeout(() => { this.activeHitbox = { damage: attackData.d, knockback: { base: attackData.k.b, scale: attackData.k.s }, range: attackData.r }; }, startup);
        setTimeout(() => { this.activeHitbox = null; }, startup + 100);
    }

    takeDamage(damage, knockback, attackerPosition) {
        if (this.isInvincible) return;

        if(this.isShielding) {
            this.shieldHealth -= damage * 1.5;
            this.game.soundManager.play('shield');
            if(this.shieldHealth <= 0) this.breakShield();
            return;
        }

        this.percent += damage; 
        this.enterState('hitstun', 0.1 + (damage * 0.02));
        const myPos = this.body.translation();
        const dir = new THREE.Vector3(myPos.x - attackerPosition.x, 0.5, 0).normalize();
        const force = (knockback.base + (this.percent * knockback.scale));
        this.body.applyImpulse({ x: dir.x * force, y: dir.y * force, z: 0 }, true);
        this.game.soundManager.play('hit', 'A3', '16n');
        const percentElem = document.getElementById(this.isPlayer ? 'p1-percent' : 'cpu-percent');
        percentElem.style.transform = 'scale(1.2)';
        setTimeout(() => percentElem.style.transform = 'scale(1)', 100);
    }
    
    checkKO(blastZoneX, blastZoneY) {
        const pos = this.body.translation();
        if ((pos.y < blastZoneY || Math.abs(pos.x) > blastZoneX) && this.stocks > 0) {
            this.stocks--; 
            this.game.vfxManager.emit(pos, this.color, 50, 3.0);
            if (this.stocks > 0) this.respawn();
            return true;
        }
        return false;
    }

    respawn() {
        this.percent = 0;
        this.body.setTranslation({ x: (this.isPlayer ? -5 : 5), y: 10, z: 0 }, true);
        this.body.setLinvel({ x: 0, y: 0, z: 0 }, true);
        this.isInvincible = true; this.enterState('idle'); this.hasUsedRecovery = false; this.isLedgeGrabbing = false;
        setTimeout(() => { this.isInvincible = false; }, 3000);
    }
}

// --- INPUT MANAGER (Keyboard + Touch) ---
class InputManager {
    constructor() {
        this.keys = { left: false, right: false, up: false, down: false, jump: false, attack: false, special: false, shield: false };
        this.keyPressFlags = { jump: false, attack: false, special: false };
        
        document.addEventListener('keydown', (e) => this.handleKeyEvent(e.code, true));
        document.addEventListener('keyup', (e) => this.handleKeyEvent(e.code, false));
        this.initTouchControls();
    }

    handleKeyEvent(code, isPressed) {
        switch(code) {
            case 'ArrowLeft': case 'KeyA': this.keys.left = isPressed; break;
            case 'ArrowRight': case 'KeyD': this.keys.right = isPressed; break;
            case 'ArrowDown': case 'KeyS': this.keys.down = isPressed; break;
            case 'KeyX': this.keys.shield = isPressed; break;
            
            case 'Space': 
            case 'ArrowUp': 
            case 'KeyW':
                this.keys.up = isPressed;
                if (isPressed && !this.keyPressFlags.jump) this.keys.jump = true;
                this.keyPressFlags.jump = isPressed;
                break;
            case 'KeyZ':
                if (isPressed && !this.keyPressFlags.attack) this.keys.attack = true;
                this.keyPressFlags.attack = isPressed;
                break;
            case 'KeyC':
                if (isPressed && !this.keyPressFlags.special) this.keys.special = true;
                this.keyPressFlags.special = isPressed;
                break;
        }
    }

    initTouchControls() {
        const joystick = document.getElementById('joystick-handle');
        const joystickArea = document.getElementById('joystick-area');
        let touchId = null; let joystickCenter = {x:0, y:0};

        joystickArea.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if(touchId === null) {
                touchId = e.changedTouches[0].identifier;
                const rect = joystickArea.getBoundingClientRect();
                joystickCenter = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
            }
        }, { passive: false });

        document.addEventListener('touchmove', (e) => {
            if (touchId === null) return;
            e.preventDefault();
            for(let i=0; i < e.changedTouches.length; i++) {
                if (e.changedTouches[i].identifier === touchId) {
                    const touch = e.changedTouches[i];
                    const dx = touch.clientX - joystickCenter.x;
                    const dy = touch.clientY - joystickCenter.y;
                    const mag = Math.hypot(dx, dy);
                    if (mag === 0) return;
                    const nx = dx / mag; const ny = dy / mag;
                    joystick.style.transform = `translate(${nx * 25}px, ${ny * 25}px)`;
                    this.keys.left = nx < -0.3; this.keys.right = nx > 0.3;
                    if (ny < -0.7 && !this.keyPressFlags.jump) this.keys.jump = true;
                    this.keyPressFlags.jump = ny < -0.7;
                }
            }
        }, { passive: false });
        
        const touchEndHandler = (e) => {
            for(let i=0; i < e.changedTouches.length; i++) {
                if (e.changedTouches[i].identifier === touchId) {
                    touchId = null;
                    joystick.style.transform = `translate(0px, 0px)`;
                    this.keys.left = this.keys.right = this.keys.up = this.keys.down = false;
                }
            }
        };
        document.addEventListener('touchend', touchEndHandler);
        document.addEventListener('touchcancel', touchEndHandler);

        const bindButton = (id, key) => {
            const btn = document.getElementById(id);
            btn.addEventListener('touchstart', e => { 
                e.preventDefault(); 
                this.keys[key] = true; 
            }, { passive: false });
            btn.addEventListener('touchend', e => { 
                e.preventDefault();
                // This will be reset in the game loop after consumption
            });
        };
        bindButton('jump-btn', 'jump');
        bindButton('attack-btn', 'attack');
        bindButton('special-btn', 'special');
        bindButton('shield-btn', 'shield');
    }
}

// --- VFX MANAGER ---
class VFXManager {
    constructor(scene) {
        this.scene = scene;
        this.particles = [];
        const particleGeo = new THREE.BoxGeometry(0.15, 0.15, 0.15);
        for (let i = 0; i < 100; i++) {
            const particle = new THREE.Mesh(particleGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
            particle.visible = false;
            this.scene.add(particle);
            this.particles.push({ mesh: particle, life: 0, velocity: new THREE.Vector3() });
        }
    }
    emit(position, color, count, power) {
        for (let i = 0; i < count; i++) {
            const p = this.particles.find(p => p.life <= 0);
            if (p) {
                p.mesh.position.copy(position);
                p.mesh.material.color.setHex(color);
                p.mesh.visible = true;
                p.life = Math.random() * 0.8 + 0.2;
                p.velocity.set((Math.random()-0.5)*15*power, (Math.random()-0.5)*15*power, (Math.random()-0.5)*15*power);
            }
        }
    }
    update(deltaTime) {
        for (const p of this.particles) {
            if (p.life > 0) {
                p.life -= deltaTime;
                if (p.life <= 0) p.mesh.visible = false;
                else {
                    p.mesh.position.add(p.velocity.clone().multiplyScalar(deltaTime));
                    p.velocity.y -= 20 * deltaTime; // Gravity
                }
            }
        }
    }
}

// --- INITIALIZATION ---
const game = new SmashGame();

const physicsPromise = RAPIER.init();
const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Physics engine timed out after 15 seconds.')), 15000)
);

document.getElementById('start-btn').textContent = 'LOADING PHYSICS...';
Logger.info("Initializing Physics Engine...");

Promise.race([physicsPromise, timeoutPromise]).then(() => {
    Logger.info("Physics Engine Initialized.");
    game.init();
    
    const startBtn = document.getElementById('start-btn');
    startBtn.disabled = false;
    startBtn.textContent = 'START GAME';

}).catch(error => {
    game.initUI();
    game.haltGame(new Error(`Could not load physics engine: ${error.message}. Please check your connection and try reloading.`));
});
