<script>
/* ========== ADA Panel ========== */
(function(){
  const html = document.documentElement;
  const qs = (sel,root=document) => root.querySelector(sel);
  const qsa = (sel,root=document) => Array.from(root.querySelectorAll(sel));

  function getPrefs(){
    try { return JSON.parse(localStorage.getItem('adaPrefs')||'{}'); } catch { return {}; }
  }
  function savePrefs(p){ try { localStorage.setItem('adaPrefs', JSON.stringify(p)); } catch {} }
  function setDataFlags(p){
    html.setAttribute('data-ada-contrast', String(!!p.contrast));
    html.setAttribute('data-ada-big-text', String(!!p.bigText));
    html.setAttribute('data-ada-spacing', String(!!p.spacing));
    html.setAttribute('data-ada-pause', String(!!p.pause));
    html.setAttribute('data-ada-highlight-links', String(!!p.links));
  }

  const pref = Object.assign({contrast:false,bigText:false,spacing:false,pause:false,links:false}, getPrefs());
  setDataFlags(pref);

  const btn = qs('#ada-button'); const panel = qs('#ada-panel');
  if (btn && panel){
    btn.addEventListener('click', ()=> panel.classList.toggle('hidden'));
    qs('#ada-close')?.addEventListener('click', ()=> panel.classList.add('hidden'));
    qs('#ada-reset')?.addEventListener('click', ()=>{
      pref.contrast=pref.bigText=pref.spacing=pref.pause=pref.links=false;
      savePrefs(pref); setDataFlags(pref);
      qsa('#ada-panel input[type=checkbox]').forEach(i=> i.checked=false);
    });
    const map = { '#ada-contrast':'contrast', '#ada-text':'bigText', '#ada-spacing':'spacing', '#ada-pause':'pause', '#ada-links':'links' };
    for (const id in map){
      const el = qs(id);
      if (el){ el.checked = !!pref[map[id]]; el.addEventListener('change', e=>{ pref[map[id]] = e.target.checked; savePrefs(pref); setDataFlags(pref); }); }
    }
  }
})();

/* ========== Testimonials (15) ========== */
(function(){
  const items = [
    { q: 'Me preparé para entrevistas en inglés y mejoré mi fluidez en 2 meses.', n:'María P.', a:'assets/avatars/avatar-1.webp' },
    { q: 'La metodología crítica me ayudó a argumentar mejor en ensayos.', n:'Daniel R.', a:'assets/avatars/avatar-2.webp' },
    { q: 'Excelente adaptación ADA: transcripciones y pausas según mis necesidades.', n:'Camila G.', a:'assets/avatars/avatar-3.webp' },
    { q: 'El acompañamiento real marca la diferencia. Clases personalizadas.', n:'Felipe S.', a:'assets/avatars/avatar-4.webp' },
    { q: 'Aprendí vocabulario académico útil para mi máster.', n:'Ignacio V.', a:'assets/avatars/avatar-5.webp' },
    { q: 'Historia comparada con fuentes primarias: muy recomendado.', n:'Valentina H.', a:'assets/avatars/avatar-6.webp' },
    { q: 'El test adaptativo fue preciso; caí justo en el nivel adecuado.', n:'Sofía L.', a:'assets/avatars/avatar-7.webp' },
    { q: 'Flexibilidad total: clases sincrónicas y tareas asincrónicas.', n:'Romina A.', a:'assets/avatars/avatar-8.webp' },
    { q: 'Ciencia Política con casos reales y políticas públicas actuales.', n:'Tomás C.', a:'assets/avatars/avatar-9.webp' },
    { q: 'Filosofía crítica aplicada a problemas contemporáneos.', n:'Pablo E.', a:'assets/avatars/avatar-10.webp' },
    { q: 'Buena comunicación y recordatorios claros.', n:'Francisca M.', a:'assets/avatars/avatar-11.webp' },
    { q: 'Los materiales son de alta calidad y accesibles.', n:'Javiera D.', a:'assets/avatars/avatar-12.webp' },
    { q: 'Me sirvió para el trabajo: presentaciones en inglés más seguras.', n:'Katherine O.', a:'assets/avatars/avatar-13.webp' },
    { q: 'La plataforma de pagos es simple y segura (Stripe/PayPal).', n:'Rodrigo N.', a:'assets/avatars/avatar-14.webp' },
    { q: 'El calendario solo muestra lo que necesito: disponibilidad y reserva.', n:'Nicolás B.', a:'assets/avatars/avatar-15.webp' },
  ];
  const wrap = document.getElementById('testimonial-body');
  const dots = document.getElementById('testimonial-dots');
  if (!wrap || !dots) return;

  let idx = 0, hover=false, timer=null;
  function render(){
    const it = items[idx];
    wrap.innerHTML = `
      <figure class="flex items-center gap-3">
        <img src="${it.a}" alt="${it.n}" width="40" height="40" class="w-10 h-10 rounded-full" loading="lazy">
        <figcaption class="text-sm text-slate-600">— ${it.n}</figcaption>
      </figure>
      <blockquote class="text-lg">“${it.q}”</blockquote>
    `;
    dots.innerHTML = items.map((_,i)=> `<button class="dot" role="tab" aria-selected="${i===idx}" aria-label="Testimonio ${i+1}" data-i="${i}"></button>`).join('');
  }
  function play(){ timer = setInterval(()=>{ if(!hover){ idx=(idx+1)%items.length; render(); } }, 6000); }
  render(); play();
  dots.addEventListener('click', e=>{ const b = e.target.closest('button[data-i]'); if(!b) return; idx=+b.dataset.i; render(); });
  wrap.parentElement.addEventListener('mouseenter', ()=>hover=true);
  wrap.parentElement.addEventListener('mouseleave', ()=>hover=false);
})();

/* ========== Adaptive Test (20) ========== */
(function(){
  const root = document.getElementById('adaptive-test');
  if (!root) return;

  const pool = [
    {d:1,p:'Choose the synonym: "begin"',c:['start','end','late','small'],a:0},
    {d:1,p:'Pick the correct form: She ___ coffee.',c:['drink','drinks','drinking','drank'],a:1},
    {d:1,p:'"We meet on Monday" means the meeting is on…',c:['lunes','martes','sábado','domingo'],a:0},
    {d:2,p:'Opposite of "difficult"',c:['hard','easy','heavy','empty'],a:1},
    {d:2,p:'"They ___ already finished."',c:['has','have','had','are'],a:1},
    {d:2,p:'In "Despite the rain, we played", what happened?',c:['No jugaron','Jugaron','Se canceló','Fue un rumor'],a:1},
    {d:3,p:'Passive: People speak Spanish here → Spanish ___ here.',c:['is spoken','was spoken','speaks','has spoken'],a:0},
    {d:3,p:'"highly ___ evidence"',c:['reliable','rely','reliability','reliably'],a:0},
    {d:3,p:'"On average, prices rose by 3%" indicates…',c:['una caída','un aumento','sin cambios','desconocido'],a:1},
    {d:3,p:'Reported: He said, "I am tired" → He said he ___ tired.',c:['is','was','were','be'],a:1},
    {d:4,p:'Closest to "mitigate"',c:['agravar','aliviar','ignorar','rechazar'],a:1},
    {d:4,p:'If policy X is "cost-effective", it is…',c:['caro e ineficiente','eficaz y económico','lento y burocrático','injusto'],a:1},
    {d:4,p:'"If I ___ more time, I would travel"',c:['have','had','would have','am having'],a:1},
    {d:4,p:'"Scarce" means…',c:['abundante','limitado','irrelevante','rápido'],a:1},
    {d:5,p:'"Notwithstanding" is closest to…',c:['sin embargo','porque','además','antes de'],a:0},
    {d:5,p:'"Had I known, I ___ helped"',c:['will have','would have','had','have'],a:1},
    {d:5,p:'"Salient" means…',c:['oculto','destacado','trivial','erróneo'],a:1},
    {d:2,p:'"Rarely do we see" is…',c:['enfático','condicional','imperativo','pasivo'],a:0},
    {d:2,p:'Preposition: interested ___ science',c:['on','in','at','for'],a:1},
    {d:3,p:'Audio (opcional): "The project deadline was moved forward" means…',c:['se adelantó','se retrasó','se canceló','se duplicó'],a:0},
  ];

  let started=false, qIndex=0, score=0, level=2, current=null, name='', email='';
  function pickQuestion(target){
    const candidates = pool.filter(q=> q.d===target && (!current || q!==current));
    current = candidates[Math.floor(Math.random()*candidates.length)] || pool[qIndex % pool.length];
  }
  function levelName(s){
    const pct = (s/20)*100;
    if (pct>=85) return 'Avanzado';
    if (pct>=65) return 'Intermedio Alto';
    if (pct>=45) return 'Intermedio';
    if (pct>=25) return 'Básico Alto';
    return 'Básico';
  }
  function renderStart(){
    root.innerHTML = `
      <form name="test-adaptativo" method="POST" data-netlify="true" netlify-honeypot="bot-field" class="grid gap-3 max-w-md">
        <input type="hidden" name="form-name" value="test-adaptativo" />
        <p class="hidden"><label>¿No completar? <input name="bot-field"/></label></p>
        <div class="grid gap-1">
          <label for="t-nombre">Nombre</label>
          <input id="t-nombre" name="nombre" required />
        </div>
        <div class="grid gap-1">
          <label for="t-email">Email</label>
          <input id="t-email" name="email" type="email" required />
        </div>
        <button type="button" id="test-start" class="btn btn-primary">Comenzar</button>
      </form>
    `;
    document.getElementById('test-start').addEventListener('click', ()=>{
      name = document.getElementById('t-nombre').value.trim();
      email = document.getElementById('t-email').value.trim();
      if (!name || !email) return;
      started=true; qIndex=0; score=0; level=2; current=null;
      pickQuestion(level); renderQuestion();
    });
  }
  function renderQuestion(){
    root.innerHTML = `
      <div class="card">
        <div class="text-sm text-slate-600">Pregunta ${qIndex+1} / 20 · Dificultad ${current.d}</div>
        <h3 class="mt-2 text-xl font-semibold">${current.p}</h3>
        <div class="mt-4 grid gap-2" id="choices"></div>
      </div>`;
    const choices = document.getElementById('choices');
    current.c.forEach((ch,i)=>{
      const b = document.createElement('button');
      b.className='text-left px-4 py-2 rounded-xl border hover:bg-slate-50';
      b.textContent = String.fromCharCode(65+i)+'. '+ch;
      b.addEventListener('click', ()=>{
        const ok = (i===current.a);
        if (ok) score++;
        level = Math.min(5, Math.max(1, level + (ok?1:-1)));
        qIndex++;
        if (qIndex>=20){ renderDone(); }
        else { pickQuestion(level); renderQuestion(); }
      });
      choices.appendChild(b);
    });
  }
  function renderDone(){
    const lvl = levelName(score);
    root.innerHTML = `
      <div class="card">
        <h3 class="text-2xl font-bold">Resultado</h3>
        <p class="mt-2">Puntaje: <strong>${score}/20</strong></p>
        <p class="mt-1">Nivel recomendado: <strong>${lvl}</strong></p>
        <form name="resultado-test" method="POST" data-netlify="true" class="mt-4 grid gap-2">
          <input type="hidden" name="form-name" value="resultado-test" />
          <input type="hidden" name="nombre" value="${name}" />
          <input type="hidden" name="email" value="${email}" />
          <input type="hidden" name="puntaje" value="${score}" />
          <input type="hidden" name="nivel" value="${lvl}" />
          <button class="btn btn-primary">Enviar resultados por correo</button>
        </form>
      </div>`;
  }
  renderStart();
})();

/* ========== Terms Modal on course pages ========== */
(function(){
  const openBtn = document.getElementById('open-terms');
  const modal = document.getElementById('terms');
  if (!openBtn || !modal) return;

  const backdrop = modal.querySelector('[data-close-terms]');
  const ok = modal.querySelector('#terms-ok');
  const goStripe = modal.querySelector('#go-stripe');
  const goPayPal = modal.querySelector('#go-paypal');

  openBtn.addEventListener('click', ()=> modal.classList.remove('hidden'));
  backdrop.addEventListener('click', ()=> modal.classList.add('hidden'));

  ok.addEventListener('change', (e)=>{
    const on = e.target.checked;
    [goStripe, goPayPal].forEach(el=>{
      el.classList.toggle('pointer-events-none', !on);
      el.classList.toggle('opacity-50', !on);
    });
  });
})();
</script>
