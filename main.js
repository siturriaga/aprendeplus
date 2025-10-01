/* ====== Aprende+ — behavior ====== */

// ---- ADA panel (persisted) ----
const ADA = {
  state: {hc:false,big:false,space:false,pause:false,links:false,open:false},
  load(){ try{this.state = {...this.state, ...JSON.parse(localStorage.getItem('adaPrefs')||'{}')};}catch{} },
  save(){ try{localStorage.setItem('adaPrefs',JSON.stringify(this.state));}catch{} },
  apply(){
    const r = document.documentElement;
    r.classList.toggle('pref-hc', this.state.hc);
    r.classList.toggle('pref-big', this.state.big);
    r.classList.toggle('pref-space', this.state.space);
    r.classList.toggle('pref-pause', this.state.pause);
    r.classList.toggle('pref-links', this.state.links);
  },
  bind(){
    const btn = document.getElementById('ada-button');
    const panel = document.getElementById('ada-panel');
    const map = [
      ['ada-contrast','hc'],
      ['ada-text','big'],
      ['ada-spacing','space'],
      ['ada-pause','pause'],
      ['ada-links','links']
    ];
    if(btn && panel){
      btn.addEventListener('click', ()=>{
        this.state.open = !this.state.open;
        panel.hidden = !this.state.open;
        btn.setAttribute('aria-expanded', String(this.state.open));
      });
    }
    const close = document.getElementById('ada-close');
    const reset = document.getElementById('ada-reset');
    if(close) close.addEventListener('click', ()=>{ this.state.open=false; panel.hidden=true; btn.setAttribute('aria-expanded','false'); });
    if(reset) reset.addEventListener('click', ()=>{
      this.state={hc:false,big:false,space:false,pause:false,links:false,open:false};
      this.apply(); this.save();
      map.forEach(([id,k])=>{ const el=document.getElementById(id); if(el) el.checked=this.state[k]; });
    });
    map.forEach(([id,k])=>{
      const el = document.getElementById(id);
      if(!el) return;
      el.checked = !!this.state[k];
      el.addEventListener('change', ()=>{
        this.state[k] = el.checked; this.apply(); this.save();
      });
    });
  }
};

// ---- Testimonials (accessible, auto-rotate 6s) ----
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
  { q:'El calendario solo muestra lo que necesito: disponibilidad y reserva.', n:'Nicolás B.' }
];

function initTestimonials(){
  const quote = document.getElementById('t-quote');
  const name = document.getElementById('t-name');
  const dots = document.querySelector('.dots');
  if(!quote || !name || !dots) return;
  let idx=0, hover=false, itv;

  function render(i){
    const t = TESTIMONIALS[i];
    quote.textContent = `“${t.q}”`;
    name.textContent = `— ${t.n}`;
    [...dots.children].forEach((b,j)=> b.setAttribute('aria-selected', String(j===i)));
  }
  function start(){ itv = setInterval(()=>{ idx=(idx+1)%TESTIMONIALS.length; render(idx); }, 6000); }
  function stop(){ clearInterval(itv); }

  dots.innerHTML = TESTIMONIALS.map((_,i)=>`<button aria-label="Testimonio ${i+1}" aria-selected="${i===0}"></button>`).join('');
  dots.addEventListener('click', e=>{
    const i = [...dots.children].indexOf(e.target);
    if(i>-1){ idx=i; render(idx); }
  });

  const card = dots.closest('.t-card');
  if(card){
    card.addEventListener('mouseenter', ()=>{hover=true;stop();});
    card.addEventListener('mouseleave', ()=>{hover=false;start();});
    card.addEventListener('focusin', stop);
    card.addEventListener('focusout', ()=>{ if(!hover) start(); });
  }
  render(0); start();
}

// ---- Terms modal (curso pages only) ----
function bindTerms(){
  const openers = document.querySelectorAll('[data-open-terms]');
  const modal = document.getElementById('terms-modal');
  if(!modal) return;
  const accept = modal.querySelector('#terms-accept');
  const go = modal.querySelector('#terms-continue');
  const close = modal.querySelector('#terms-close');
  const backdrop = modal.querySelector('.backdrop');
  const payment = document.getElementById('payment-section');

  function setEnabled(){ go.disabled = !accept.checked; }
  accept && accept.addEventListener('change', setEnabled);

  openers.forEach(btn=> btn.addEventListener('click', ()=>{
    modal.setAttribute('open','');
    setEnabled();
  }));
  function hide(){ modal.removeAttribute('open'); }
  [close, backdrop].forEach(el=> el && el.addEventListener('click', hide));
  go && go.addEventListener('click', ()=>{
    hide();
    if(payment){ payment.hidden=false; payment.scrollIntoView({behavior:'smooth',block:'start'}); }
  });
}

// ---- Test Adaptativo (minimal flow: capture + level suggestion) ----
const QUESTIONS = [
  {d:1,c:'vocab',p:'Sinónimo de "begin"',a:['start','end','late','small'],i:0},
  {d:1,c:'gram',p:'She ___ coffee.',a:['drink','drinks','drinking','drank'],i:1},
  {d:1,c:'comp',p:'"We meet on Monday" significa…',a:['lunes','martes','sábado','domingo'],i:0},
  {d:2,c:'vocab',p:'Opuesto de "difficult"',a:['hard','easy','heavy','empty'],i:1},
  {d:2,c:'gram',p:'They ___ already finished.',a:['has','have','had','are'],i:1},
  {d:2,c:'comp',p:'"Despite the rain, we played" →',a:['No jugaron','Jugaron','Se canceló','Rumor'],i:1},
  {d:3,c:'gram',p:'Passive: People speak Spanish here → Spanish ___ here.',a:['is spoken','was spoken','speaks','has spoken'],i:0},
  {d:3,c:'vocab',p:'"highly ___ evidence"',a:['reliable','rely','reliability','reliably'],i:0},
  {d:3,c:'comp',p:'"On average, prices rose by 3%" →',a:['cayeron','aumentaron','sin cambios','desconocido'],i:1},
  {d:3,c:'gram',p:'He said, "I am tired" → He said he ___ tired.',a:['is','was','were','be'],i:1},
  {d:4,c:'vocab',p:'"mitigate" ≈',a:['agravar','aliviar','ignorar','rechazar'],i:1},
  {d:4,c:'comp',p:'Si una política es "cost-effective", es…',a:['cara','eficaz y económica','lenta','injusta'],i:1},
  {d:4,c:'gram',p:'If I ___ more time, I would travel',a:['have','had','would have','am having'],i:1},
  {d:4,c:'vocab',p:'"Scarce" =',a:['abundante','limitado','irrelevante','rápido'],i:1},
  {d:5,c:'comp',p:'"Notwithstanding" ≈',a:['sin embargo','porque','además','antes de'],i:0},
  {d:5,c:'gram',p:'"Had I known, I ___ helped"',a:['will have','would have','had','have'],i:1},
  {d:5,c:'vocab',p:'"Salient" =',a:['oculto','destacado','trivial','erróneo'],i:1},
  {d:2,c:'comp',p:'"Rarely do we see" es…',a:['enfático','condicional','imperativo','pasivo'],i:0},
  {d:2,c:'gram',p:'interested ___ science',a:['on','in','at','for'],i:1},
  {d:3,c:'audio',p:'"Deadline moved forward" =',a:['se adelantó','se retrasó','se canceló','se duplicó'],i:0}
];

function initTest(){
  const wrap = document.getElementById('test-app');
  if(!wrap) return;
  const startBtn = document.getElementById('test-start');
  const form = document.getElementById('test-form');
  const qBox = document.getElementById('test-q');
  const aBox = document.getElementById('test-a');
  const res = document.getElementById('test-result');
  let started=false, n=0, score=0, level=3, current=null;

  function pick(l){
    const pool = QUESTIONS.filter(q=>q.d===l && (!current || q.p!==current.p));
    return pool[0] || QUESTIONS[n%QUESTIONS.length];
  }
  function show(){
    if(n>=20){ // finish
      const pct=(score/20)*100;
      const lvl = pct>=85?'Avanzado':pct>=65?'Intermedio Alto':pct>=45?'Intermedio':pct>=25?'Básico Alto':'Básico';
      qBox.textContent='Resultado';
      aBox.innerHTML='';
      res.innerHTML = `<p>Puntaje: <strong>${score}/20</strong></p><p>Nivel recomendado: <strong>${lvl}</strong></p>`;
      return;
    }
    current = pick(level);
    qBox.textContent = `Pregunta ${n+1}/20 · ${current.p}`;
    aBox.innerHTML = current.a.map((t,i)=>`<button class="btn btn-outline" data-i="${i}">${String.fromCharCode(65+i)}. ${t}</button>`).join('');
  }
  aBox?.addEventListener('click', e=>{
    const b = e.target.closest('button[data-i]'); if(!b) return;
    const i = +b.getAttribute('data-i');
    const correct = i===current.i;
    score += correct?1:0; level = Math.min(5,Math.max(1,level+(correct?1:-1))); n++; show();
  });

  startBtn?.addEventListener('click', ()=>{
    if(!form.checkValidity()){ form.reportValidity(); return; }
    started=true; document.getElementById('test-start-wrap').hidden=true;
    document.getElementById('test-run').hidden=false; show();
  });
}

// ---- Init all ----
document.addEventListener('DOMContentLoaded', ()=>{
  ADA.load(); ADA.apply(); ADA.bind();
  initTestimonials();
  bindTerms();
  initTest();
});
