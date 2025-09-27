/* ======= Config ======= */
const CFG = (window.APP_CONFIG || {});
const INSTAGRAM_URL = CFG.INSTAGRAM_URL || '#';
const STRIPE_CHECKOUT_URL = CFG.STRIPE_CHECKOUT_URL || '#';
const PAYPAL_CLIENT_ID = CFG.PAYPAL_CLIENT_ID || '';
const CALENDLY_URL = CFG.CALENDLY_URL || '';

/* ======= Utilities ======= */
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

/* ======= Instagram footer link ======= */
const igBtn = $('#ig-btn');
if (igBtn) igBtn.href = INSTAGRAM_URL;

/* ======= Calendly iframe ======= */
const calendly = $('#calendly');
if (calendly) calendly.src = CALENDLY_URL;

/* ======= Testimonials (15) ======= */
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
  { q:'Presentaciones en inglés más seguras para el trabajo.', n:'Katherine O.' },
  { q:'Pago simple y seguro (Stripe/PayPal).', n:'Rodrigo N.' },
  { q:'El calendario muestra justo lo que necesito: disponibilidad y reserva.', n:'Nicolás B.' },
];

(function mountTestimonials(){
  const quote = $('#t-quote'), name = $('#t-name'), dots = $('#t-dots');
  if (!quote || !name || !dots) return;
  TESTIMONIALS.forEach((_,i)=>{
    const b = document.createElement('button');
    b.type='button'; b.setAttribute('role','tab'); b.setAttribute('aria-selected', i===0?'true':'false');
    b.addEventListener('click', ()=> setIdx(i, true));
    dots.appendChild(b);
  });
  let idx = 0, hover=false, timer=null;
  function render(){
    quote.textContent = `“${TESTIMONIALS[idx].q}”`;
    name.textContent = `— ${TESTIMONIALS[idx].n}`;
    $$('.dots button', dots).forEach((b,j)=> b.setAttribute('aria-selected', j===idx ? 'true' : 'false'));
  }
  function setIdx(i, user=false){ idx = (i+TESTIMONIALS.length)%TESTIMONIALS.length; render(); if(user) restart(); }
  function restart(){ if(timer) clearInterval(timer); if(!hover){ timer=setInterval(()=> setIdx(idx+1), 6000); } }
  dots.parentElement.addEventListener('mouseenter', ()=>{hover=true; if(timer) clearInterval(timer);});
  dots.parentElement.addEventListener('mouseleave', ()=>{hover=false; restart();});
  render(); restart();
})();

/* ======= ADA panel ======= */
const adaBtn = $('#ada-btn'), adaPanel = $('#ada-panel');
const pref = loadAda();
bind('#ada-contrast','checked','contrast');
bind('#ada-text','checked','bigText');
bind('#ada-spacing','checked','spacing');
bind('#ada-pause','checked','pause');
bind('#ada-links','checked','links');

function bind(sel, prop, key){
  const el = $(sel); if(!el) return;
  el[prop] = !!pref[key];
  el.addEventListener('change', ()=>{
    pref[key]=el[prop];
    applyAda(pref); saveAda(pref);
  });
}
applyAda(pref);

if (adaBtn && adaPanel){
  adaBtn.addEventListener('click', ()=>{
    const open = adaPanel.hasAttribute('hidden') ? false : true;
    if (open){ adaPanel.setAttribute('hidden',''); adaBtn.setAttribute('aria-expanded','false'); }
    else { adaPanel.removeAttribute('hidden'); adaBtn.setAttribute('aria-expanded','true'); }
  });
  $('#ada-done')?.addEventListener('click', ()=> {
    adaPanel.setAttribute('hidden',''); adaBtn.setAttribute('aria-expanded','false');
  });
  $('#ada-reset')?.addEventListener('click', ()=>{
    const d = {contrast:false,bigText:false,spacing:false,pause:false,links:false};
    applyAda(d); saveAda(d);
    ['#ada-contrast','#ada-text','#ada-spacing','#ada-pause','#ada-links'].forEach(s=> { const e=$(s); if(e) e.checked=false; });
  });
}

function applyAda(p){
  document.documentElement.classList.toggle('ada-contrast', !!p.contrast);
  document.documentElement.classList.toggle('ada-bigText', !!p.bigText);
  document.documentElement.classList.toggle('ada-spacing', !!p.spacing);
  document.documentElement.classList.toggle('ada-pause', !!p.pause);
  document.documentElement.classList.toggle('ada-links', !!p.links);
}

function loadAda(){
  try{ return JSON.parse(localStorage.getItem('adaPrefs')||'{}') }catch{ return {}; }
}
function saveAda(p){ try{ localStorage.setItem('adaPrefs', JSON.stringify(p)); }catch{} }

/* ADA style effects */
const adaStyle = document.createElement('style');
adaStyle.textContent = `
  .ada-contrast { filter: contrast(1.12) saturate(1.05); }
  .ada-bigText body { font-size: 112%; }
  .ada-spacing body { line-height: 1.75; letter-spacing: .02em; word-spacing: .06em; }
  .ada-pause * { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
  .ada-links a { text-decoration: underline !important; text-underline-offset: 3px; outline: 2px solid rgba(59,130,246,.5); outline-offset: 2px; }
`;
document.head.appendChild(adaStyle);

/* ======= Terms Modal (before pay) ======= */
const TERMS = [
  'Modalidad: clases online, flexibles y personalizadas (sincrónicas o asincrónicas).',
  'Pagos: tarjetas (Stripe) y PayPal. El cobro mensual estándar es de $250.000 CLP por curso (mínimo 2 clases semanales).',
  'Recargo por tópicos especiales: $10.000–$20.000 CLP por clase.',
  'Cancelaciones: deben realizarse con al menos 48 horas de anticipación para reagendar sin costo.',
  'Reprogramaciones: sujetas a disponibilidad docente.',
  'Puntualidad y asistencia: los atrasos no extienden la clase.',
  'Materiales y propiedad intelectual: uso personal del estudiante; prohibida la distribución sin autorización.',
  'Accesibilidad: ofrecemos ajustes razonables (subtítulos/transcripción, contrastes, pausas).',
  'Datos personales: solo para gestión académica y facturación.',
  'Conducta: respetuosa y libre de discriminación.',
  'Devoluciones: dentro de los primeros 7 días del primer mes (prorrateado; menos comisiones).'
];
const termsModal = $('#terms-modal');
const termsList = $('#terms-list');
const termsAccept = $('#terms-accept');
const termsContinue = $('#terms-continue');
const termsCourse = $('#terms-course');
const termsName = $('#terms-name');
const termsEmail = $('#terms-email');

if (termsList){
  termsList.innerHTML = TERMS.map(t=> `<li>${t}</li>`).join('');
  termsAccept?.addEventListener('change', ()=> {
    termsContinue.disabled = !termsAccept.checked;
  });
  $$('[data-open-terms]').forEach(btn => {
    btn.addEventListener('click', ()=>{
      const course = btn.getAttribute('data-course') || 'Curso';
      $('#terms-title').textContent = course;
      termsCourse.value = course;
      termsName.value = ''; termsEmail.value='';
      termsAccept.checked = false;
      termsContinue.disabled = true;
      if (typeof termsModal.showModal === 'function') termsModal.showModal();
      else termsModal.removeAttribute('hidden');
    });
  });
  termsModal?.addEventListener('close', ()=>{} );
  termsContinue?.addEventListener('click', (e)=>{
    if (!termsAccept.checked) { e.preventDefault(); return; }
    // Redirect to Stripe Checkout (or you can attach PayPal button on course pages)
    if (STRIPE_CHECKOUT_URL && STRIPE_CHECKOUT_URL !== '#') {
      window.location.href = STRIPE_CHECKOUT_URL;
    } else {
      alert('Gracias. Tus términos han sido aceptados. Configura STRIPE_CHECKOUT_URL para completar el pago.');
    }
  });
}

/* ======= Adaptive Test (20, simple adaptive) ======= */
const POOL = [
  {id:1,d:1,p:'Choose the synonym: "begin"',a:['start','end','late','small'],i:0},
  {id:2,d:1,p:'Pick the correct form: She ___ coffee.',a:['drink','drinks','drinking','drank'],i:1},
  {id:3,d:1,p:'"We meet on Monday" means the meeting is on…',a:['lunes','martes','sábado','domingo'],i:0},
  {id:4,d:2,p:'Opposite of "difficult"',a:['hard','easy','heavy','empty'],i:1},
  {id:5,d:2,p:'"They ___ already finished."',a:['has','have','had','are'],i:1},
  {id:6,d:2,p:'In "Despite the rain, we played", what happened?',a:['No jugaron','Jugaron','Se canceló','Fue un rumor'],i:1},
  {id:7,d:3,p:'Passive: People speak Spanish here → Spanish ___ here.',a:['is spoken','was spoken','speaks','has spoken'],i:0},
  {id:8,d:3,p:'"highly ___ evidence"',a:['reliable','rely','reliability','reliably'],i:0},
  {id:9,d:3,p:'"On average, prices rose by 3%" indicates…',a:['una caída','un aumento','sin cambios','desconocido'],i:1},
  {id:10,d:3,p:'Reported: He said, "I am tired" → He said he ___ tired.',a:['is','was','were','be'],i:1},
  {id:11,d:4,p:'Closest to "mitigate"',a:['agravar','aliviar','ignorar','rechazar'],i:1},
  {id:12,d:4,p:'If policy X is "cost-effective", it is…',a:['caro e ineficiente','eficaz y económico','lento y burocrático','injusto'],i:1},
  {id:13,d:4,p:'"If I ___ more time, I would travel"',a:['have','had','would have','am having'],i:1},
  {id:14,d:4,p:'"Scarce" means…',a:['abundante','limitado','irrelevante','rápido'],i:1},
  {id:15,d:5,p:'"Notwithstanding" is closest to…',a:['sin embargo','porque','además','antes de'],i:0},
  {id:16,d:5,p:'"Had I known, I ___ helped"',a:['will have','would have','had','have'],i:1},
  {id:17,d:5,p:'"Salient" means…',a:['oculto','destacado','trivial','erróneo'],i:1},
  {id:18,d:2,p:'"Rarely do we see" is…',a:['enfático','condicional','imperativo','pasivo'],i:0},
  {id:19,d:2,p:'Preposition: interested ___ science',a:['on','in','at','for'],i:1},
  {id:20,d:3,p:'"The project deadline was moved forward" means…',a:['se adelantó','se retrasó','se canceló','se duplicó'],i:0},
];
const START_LVL = 2;
(function testAdaptive(){
  const startBtn = $('#test-start'); if(!startBtn) return;
  const form = $('#test-form'), area = $('#test-area'), result = $('#test-result');
  const meta = $('#test-meta'), qEl = $('#test-question'), ans = $('#test-answers');
  const scoreEl = $('#test-score'), levelEl = $('#test-level');
  const rN = $('#r-nombre'), rE = $('#r-email'), rS = $('#r-score'), rL = $('#r-level');
  let started=false, q=0, score=0, lvl=START_LVL, current=null;
  function nextQuestion(){
    const pool = POOL.filter(x=> x.d===lvl && (!current || x.id!==current.id));
    current = pool[Math.floor(Math.random()*pool.length)] || POOL[(q)%POOL.length];
    meta.textContent = `Pregunta ${q+1} de 20 · Dificultad ${current.d}`;
    qEl.textContent = current.p;
    ans.innerHTML = '';
    current.a.forEach((text,i)=>{
      const b=document.createElement('button'); b.type='button'; b.className='ans';
      b.textContent = `${String.fromCharCode(65+i)}. ${text}`;
      b.addEventListener('click', ()=> answer(i));
      ans.appendChild(b);
    });
  }
  function answer(i){
    const ok = i===current.i; if(ok) score++;
    lvl = Math.max(1, Math.min(5, lvl + (ok?1:-1)));
    q++;
    if(q>=20){ finish(); return; }
    nextQuestion();
  }
  function levelFromScore(s){
    if(s<=6) return 'A1';
    if(s<=10) return 'A2';
    if(s<=14) return 'B1';
    if(s<=17) return 'B2';
    return 'C1';
  }
  function finish(){
    area.hidden = true; result.hidden = false;
    const lvlText = levelFromScore(score);
    scoreEl.textContent = `${score}/20`; levelEl.textContent = lvlText;
    rN.value = $('#t-nombre').value || ''; rE.value = $('#t-email').value || '';
    rS.value = String(score); rL.value = lvlText;
  }
  startBtn.addEventListener('click', ()=>{
    if(!$('#t-nombre').checkValidity() || !$('#t-email').checkValidity()){
      form.reportValidity(); return;
    }
    form.hidden = true; area.hidden = false; result.hidden = true;
    started = true; q=0; score=0; lvl=START_LVL; current=null; nextQuestion();
  });
})();

/* ======= Tiny sanity checks (console) ======= */
(function tests(){
  try{
    console.assert($$('.card').length===5, 'Debe haber 5 cards de cursos');
    const homeHasPrice = !!$('.card .price'); // we removed price on Home
    console.assert(!homeHasPrice, 'Home NO debe mostrar precio en cards');
    console.assert($('.btn.btn-ig') && $('#ig-btn'), 'Botón Instagram en footer');
  }catch(e){ console.warn('Silent tests error', e); }
})();
