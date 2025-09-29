/* Aprende+ main.js
   - ADA preferences with localStorage
   - Testimonials carousel (6s)
   - Adaptive test (20 q, simple adapt)
   - Netlify submit of results
   - Scroll reveal
*/

// ---------- Utilities ----------
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

function lsGet(k, fallback){ try{ const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback } catch { return fallback } }
function lsSet(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); } catch {} }

// ---------- ADA Panel ----------
const adaBtn = $('#ada-button');
const adaPanel = $('#ada-panel');
const adaClose = $('#ada-close');
const adaReset = $('#ada-reset');
const pref = lsGet('adaPrefs', { contrast:false, text:false, spacing:false, pause:false, links:false });

const cbContrast = $('#ada-contrast');
const cbText = $('#ada-text');
const cbSpacing = $('#ada-spacing');
const cbPause = $('#ada-pause');
const cbLinks = $('#ada-links');

function applyPrefs(p){
  document.body.classList.toggle('ada-contrast', !!p.contrast);
  document.body.classList.toggle('ada-bigtext', !!p.text);
  document.body.classList.toggle('ada-spacing', !!p.spacing);
  document.body.classList.toggle('ada-pause', !!p.pause);
  document.body.classList.toggle('ada-links', !!p.links);
}
function refreshToggles(p){
  cbContrast.checked = !!p.contrast;
  cbText.checked = !!p.text;
  cbSpacing.checked = !!p.spacing;
  cbPause.checked = !!p.pause;
  cbLinks.checked = !!p.links;
}
applyPrefs(pref);
refreshToggles(pref);

adaBtn?.addEventListener('click', () => {
  const open = adaPanel.hasAttribute('hidden') ? false : true;
  if (open) adaPanel.setAttribute('hidden','');
  else adaPanel.removeAttribute('hidden');
  adaBtn.setAttribute('aria-expanded', String(!open));
});
adaClose?.addEventListener('click', () => {
  adaPanel.setAttribute('hidden','');
  adaBtn.setAttribute('aria-expanded', 'false');
});

cbContrast?.addEventListener('change', e => { pref.contrast = e.target.checked; lsSet('adaPrefs', pref); applyPrefs(pref); });
cbText?.addEventListener('change', e => { pref.text = e.target.checked; lsSet('adaPrefs', pref); applyPrefs(pref); });
cbSpacing?.addEventListener('change', e => { pref.spacing = e.target.checked; lsSet('adaPrefs', pref); applyPrefs(pref); });
cbPause?.addEventListener('change', e => { pref.pause = e.target.checked; lsSet('adaPrefs', pref); applyPrefs(pref); });
cbLinks?.addEventListener('change', e => { pref.links = e.target.checked; lsSet('adaPrefs', pref); applyPrefs(pref); });

adaReset?.addEventListener('click', () => {
  const p = {contrast:false, text:false, spacing:false, pause:false, links:false};
  lsSet('adaPrefs', p); applyPrefs(p); refreshToggles(p);
});

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold:.15 });
$$('.reveal').forEach(el => io.observe(el));

// ---------- Testimonials Carousel ----------
const TESTIMONIALS = [
  { q:'Me preparé para entrevistas en inglés y mejoré mi fluidez en 2 meses.', n:'María P.' },
  { q:'La metodología crítica me ayudó a argumentar mejor en ensayos.', n:'Daniel R.' },
  { q:'Excelente adaptación ADA: transcripciones y pausas según mis necesidades.', n:'Camila G.' },
  { q:'El acompañamiento real marca la diferencia. Clases personalizadas.', n:'Felipe S.' },
  { q:'Aprendí vocabulario académico útil para mi máster.', n:'Ignacio V.' },
  { q:'Historia comparada con fuentes primarias: muy recomendado.', n:'Valentina H.' },
  { q:'El test adaptativo fue preciso; caí justo en el nivel adecuado.', n:'Sofía L.' },
  { q:'Flexibilidad total: clases sincrónicas y tareas asincrónicas.', n:'Romina A.' },
  { q:'Ciencia Política con casos reales y políticas públicas actuales.', n:'Tomás C.' },
  { q:'Filosofía crítica aplicada a problemas contemporáneos.', n:'Pablo E.' },
  { q:'Buena comunicación y recordatorios claros.', n:'Francisca M.' },
  { q:'Los materiales son de alta calidad y accesibles.', n:'Javiera D.' },
  { q:'Me sirvió para el trabajo: presentaciones en inglés más seguras.', n:'Katherine O.' },
  { q:'La plataforma de pagos es simple y segura (Stripe/PayPal).', n:'Rodrigo N.' },
  { q:'El calendario solo muestra lo que necesito: disponibilidad y reserva.', n:'Nicolás B.' },
];
const qEl = $('#t-quote');
const nEl = $('#t-name');
const dots = $('.dots');
let tIdx = 0, hover = false;

function renderDots(){
  dots.innerHTML = '';
  TESTIMONIALS.forEach((_,i)=>{
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Testimonio ${i+1}`);
    b.setAttribute('aria-selected', i===tIdx ? 'true' : 'false');
    b.addEventListener('click', ()=>{ tIdx=i; updateSlide(); });
    dots.appendChild(b);
  });
}
function updateSlide(){
  qEl.textContent = `“${TESTIMONIALS[tIdx].q}”`;
  nEl.textContent = `— ${TESTIMONIALS[tIdx].n}`;
  $$('.dots button').forEach((b,i)=> b.setAttribute('aria-selected', i===tIdx ? 'true':'false'));
}
renderDots(); updateSlide();

dots?.parentElement?.addEventListener('mouseenter', ()=> hover=true);
dots?.parentElement?.addEventListener('mouseleave', ()=> hover=false);
setInterval(()=>{ if(!hover){ tIdx=(tIdx+1)%TESTIMONIALS.length; updateSlide(); } }, 6000);

// ---------- Adaptive Test (20) ----------
const POOL = [
  {id:1,d:1,c:'vocab',p:'Choose the synonym: "begin"',x:['start','end','late','small'],a:0},
  {id:2,d:1,c:'gram',p:'Pick the correct form: She ___ coffee.',x:['drink','drinks','drinking','drank'],a:1},
  {id:3,d:1,c:'comp',p:'"We meet on Monday" means the meeting is on…',x:['lunes','martes','sábado','domingo'],a:0},
  {id:4,d:2,c:'vocab',p:'Opposite of "difficult"',x:['hard','easy','heavy','empty'],a:1},
  {id:5,d:2,c:'gram',p:'"They ___ already finished."',x:['has','have','had','are'],a:1},
  {id:6,d:2,c:'comp',p:'In "Despite the rain, we played", what happened?',x:['No jugaron','Jugaron','Se canceló','Fue un rumor'],a:1},
  {id:7,d:3,c:'gram',p:'Passive: People speak Spanish here → Spanish ___ here.',x:['is spoken','was spoken','speaks','has spoken'],a:0},
  {id:8,d:3,c:'vocab',p:'"highly ___ evidence"',x:['reliable','rely','reliability','reliably'],a:0},
  {id:9,d:3,c:'comp',p:'"On average, prices rose by 3%" indicates…',x:['una caída','un aumento','sin cambios','desconocido'],a:1},
  {id:10,d:3,c:'gram',p:'Reported: He said, "I am tired" → He said he ___ tired.',x:['is','was','were','be'],a:1},
  {id:11,d:4,c:'vocab',p:'Closest to "mitigate"',x:['agravar','aliviar','ignorar','rechazar'],a:1},
  {id:12,d:4,c:'comp',p:'If policy X is "cost-effective", it is…',x:['caro e ineficiente','eficaz y económico','lento y burocrático','injusto'],a:1},
  {id:13,d:4,c:'gram',p:'"If I ___ more time, I would travel"',x:['have','had','would have','am having'],a:1},
  {id:14,d:4,c:'vocab',p:'"Scarce" means…',x:['abundante','limitado','irrelevante','rápido'],a:1},
  {id:15,d:5,c:'comp',p:'"Notwithstanding" is closest to…',x:['sin embargo','porque','además','antes de'],a:0},
  {id:16,d:5,c:'gram',p:'"Had I known, I ___ helped"',x:['will have','would have','had','have'],a:1},
  {id:17,d:5,c:'vocab',p:'"Salient" means…',x:['oculto','destacado','trivial','erróneo'],a:1},
  {id:18,d:2,c:'comp',p:'"Rarely do we see" is…',x:['enfático','condicional','imperativo','pasivo'],a:0},
  {id:19,d:2,c:'gram',p:'Preposition: interested ___ science',x:['on','in','at','for'],a:1},
  {id:20,d:3,c:'audio',p:'"The project deadline was moved forward" means…',x:['se adelantó','se retrasó','se canceló','se duplicó'],a:0,t:'El plazo se adelantó; ahora es antes.'},
];

const capForm = $('#test-capture');
const btnStart = $('#btn-start');
const testUI = $('#test-ui');
const sIntro = $('#test-state-intro');
const sQ = $('#test-state-question');
const sR = $('#test-state-result');
const qCount = $('#q-count'); const qDiff = $('#q-diff');
const qPrompt = $('#q-prompt'); const qChoices = $('#q-choices'); const qAudio = $('#q-audio');
const rScore = $('#r-score'); const rLevel = $('#r-level');
const btnSend = $('#btn-send');

let done=false, n=0, score=0, level=3, current=null, usedIds=new Set();

function nextQuestion(target){
  const pool = POOL.filter(q=> q.d===target && !usedIds.has(q.id));
  const pick = pool.length ? pool[0] : POOL.find(q=> !usedIds.has(q.id)) || POOL[0];
  current = pick; usedIds.add(pick.id);
  qCount.textContent = `${n+1}/20`;
  qDiff.textContent = `Dificultad ${pick.d}`;
  qPrompt.textContent = pick.p;

  if (pick.c==='audio'){
    qAudio.innerHTML = `<p class="hint">(Audio opcional) Transcripción: ${pick.t||''}</p>`;
    qAudio.classList.remove('hidden');
  } else qAudio.classList.add('hidden');

  qChoices.innerHTML = '';
  pick.x.forEach((choice, i) => {
    const b = document.createElement('button');
    b.textContent = `${String.fromCharCode(65+i)}. ${choice}`;
    b.addEventListener('click', ()=> answer(i));
    qChoices.appendChild(b);
  });
}
function answer(i){
  if(!current) return;
  const correct = (i === current.a); if (correct) score++;
  level = Math.max(1, Math.min(5, level + (correct?1:-1)));
  n++;
  if (n>=20){ finish(); }
  else nextQuestion(level);
}
function recommended(){
  const pct = (score/20)*100;
  if (pct>=85) return 'Avanzado';
  if (pct>=65) return 'Intermedio Alto';
  if (pct>=45) return 'Intermedio';
  if (pct>=25) return 'Básico Alto';
  return 'Básico';
}
function finish(){
  done=true; sQ.classList.add('hidden'); sR.classList.remove('hidden');
  rScore.textContent = `${score}/20`; rLevel.textContent = recommended();
}

btnStart?.addEventListener('click', ()=>{
  const nombre = $('#cap-nombre').value.trim();
  const email = $('#cap-email').value.trim();
  if(!nombre || !email){ alert('Por favor completa nombre y email.'); return; }
  sIntro.classList.add('hidden'); sQ.classList.remove('hidden');
  nextQuestion(level);
});

btnSend?.addEventListener('click', ()=>{
  // Create and submit a hidden form to Netlify with the score
  const f = document.createElement('form');
  f.method = 'POST'; f.setAttribute('data-netlify','true');
  f.style.display='none';
  f.innerHTML = `
    <input type="hidden" name="form-name" value="test-adaptativo-resultados">
    <input type="hidden" name="nombre" value="${$('#cap-nombre').value}">
    <input type="hidden" name="email" value="${$('#cap-email').value}">
    <input type="hidden" name="puntaje" value="${score}/20">
    <input type="hidden" name="nivel" value="${recommended()}">`;
  document.body.appendChild(f); f.submit();
});
