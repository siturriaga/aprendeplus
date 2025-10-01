// ---------- ADA panel (persisted) ----------
(function(){
  const btn = document.getElementById('ada-button');
  const panel = document.getElementById('ada-panel');
  if (!btn || !panel) return;

  const qs = id => document.getElementById(id);
  const state = loadPrefs();

  apply(state);

  btn.addEventListener('click', () => {
    const open = panel.hasAttribute('hidden') ? false : true;
    if (open) { panel.setAttribute('hidden',''); btn.setAttribute('aria-expanded','false'); }
    else { panel.removeAttribute('hidden'); btn.setAttribute('aria-expanded','true'); panel.querySelector('input,button')?.focus(); }
  });
  qs('ada-close')?.addEventListener('click', () => panel.setAttribute('hidden',''));
  qs('ada-reset')?.addEventListener('click', () => { const n = {contrast:false,text:false,spacing:false,pause:false,links:false}; savePrefs(n); apply(n); sync(n); });

  const map = [
    ['ada-contrast','contrast','ada-contrast'],
    ['ada-text','text','ada-text'],
    ['ada-spacing','spacing','ada-spacing'],
    ['ada-pause','pause','ada-pause'],
    ['ada-links','links','ada-links'],
  ];
  function sync(s){
    map.forEach(([id, key]) => { const el = qs(id); if (el) el.checked = !!s[key]; });
  }
  sync(state);

  map.forEach(([id, key, cls])=>{
    const el = qs(id); if(!el) return;
    el.addEventListener('change', e => {
      const s = loadPrefs(); s[key] = e.target.checked; savePrefs(s); apply(s);
    });
  });

  function apply(s){
    document.body.classList.toggle('ada-contrast', !!s.contrast);
    document.body.classList.toggle('ada-text', !!s.text);
    document.body.classList.toggle('ada-spacing', !!s.spacing);
    document.body.classList.toggle('ada-pause', !!s.pause);
    document.body.classList.toggle('ada-links', !!s.links);
  }
  function loadPrefs(){ try{ return JSON.parse(localStorage.getItem('adaPrefs')||'{}'); }catch{ return {}; } }
  function savePrefs(v){ try{ localStorage.setItem('adaPrefs', JSON.stringify(v)); }catch{} }
})();

// ---------- Reveal on scroll ----------
(function(){
  const els = [...document.querySelectorAll('.reveal')];
  if (!('IntersectionObserver' in window) || !els.length) { els.forEach(e=>e.classList.add('revealed')); return; }
  const io = new IntersectionObserver((entries)=>{
    for(const en of entries){
      if (en.isIntersecting){ en.target.classList.add('revealed'); io.unobserve(en.target); }
    }
  }, { threshold:.12 });
  els.forEach(e=> io.observe(e));
})();

// ---------- Testimonials carousel (15, auto 6s, keyboardable dots) ----------
(function(){
  const quotes = [
    ['Me preparé para entrevistas y mejoré mi fluidez en 2 meses.','María P.'],
    ['La metodología crítica me ayudó a argumentar mejor en ensayos.','Daniel R.'],
    ['Excelente adaptación ADA: transcripciones y pausas según mis necesidades.','Camila G.'],
    ['El acompañamiento real marca la diferencia. Clases personalizadas.','Felipe S.'],
    ['Aprendí vocabulario académico útil para mi máster.','Ignacio V.'],
    ['Historia comparada con fuentes primarias: muy recomendado.','Valentina H.'],
    ['El test adaptativo fue preciso; quedé en el nivel adecuado.','Sofía L.'],
    ['Flexibilidad total: sincrónicas y tareas asincrónicas.','Romina A.'],
    ['Ciencia Política con casos reales y políticas actuales.','Tomás C.'],
    ['Filosofía crítica aplicada a problemas contemporáneos.','Pablo E.'],
    ['Buena comunicación y recordatorios claros.','Francisca M.'],
    ['Materiales de alta calidad y accesibles.','Javiera D.'],
    ['Me sirvió para el trabajo: presentaciones más seguras.','Katherine O.'],
    ['Pagos simples y seguros.','Rodrigo N.'],
    ['El calendario muestra justo lo necesario para reservar.','Nicolás B.'],
  ];
  const q = document.getElementById('t-quote');
  const n = document.getElementById('t-name');
  const dotsWrap = document.querySelector('.dots');
  if (!q || !n || !dotsWrap) return;

  let idx = 0, timer = null, hover = false;
  function render(i){
    const [qq, nn] = quotes[i]; q.textContent = `“${qq}”`; n.textContent = `— ${nn}`;
    [...dotsWrap.children].forEach((b,bi)=> b.setAttribute('aria-selected', bi===i ? 'true' : 'false'));
  }
  quotes.forEach((_,i)=> {
    const b = document.createElement('button');
    b.type = 'button'; b.setAttribute('aria-label', `Testimonio ${i+1}`);
    b.addEventListener('click', ()=>{ idx=i; render(idx); restart(); });
    dotsWrap.appendChild(b);
  });
  function tick(){ idx = (idx+1) % quotes.length; render(idx); }
  function restart(){ if(timer) clearInterval(timer); if(!hover) timer = setInterval(tick, 6000); }
  dotsWrap.parentElement.addEventListener('mouseenter', ()=>{ hover=true; if(timer) clearInterval(timer); });
  dotsWrap.parentElement.addEventListener('mouseleave', ()=>{ hover=false; restart(); });

  render(idx); restart();
})();

// ---------- Cursos deck (book-like swipe with arrows/keys) ----------
(function(){
  const deck = document.getElementById('course-deck');
  if (!deck) return;
  const pages = deck.querySelector('.pages');
  const arrows = deck.querySelectorAll('.deck-arrow');

  arrows.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const dir = Number(btn.dataset.dir||1);
      pages.scrollBy({ left: dir * (pages.clientWidth * .8), behavior: 'smooth' });
    });
  });

  pages.addEventListener('keydown', (e)=>{
    if (e.key === 'ArrowRight'){ pages.scrollBy({ left: pages.clientWidth*.8, behavior:'smooth' }); }
    if (e.key === 'ArrowLeft'){ pages.scrollBy({ left: -pages.clientWidth*.8, behavior:'smooth' }); }
    if (e.key === 'Enter'){
      const el = document.elementFromPoint(pages.clientWidth/2, pages.clientHeight/2)?.closest('.page');
      const href = el?.dataset.href; if (href) location.href = href;
    }
  });

  // subtle page-curl on pointer move
  pages.addEventListener('pointermove', (e)=>{
    const el = e.target.closest('.page-inner'); if(!el) return;
    const rect = el.getBoundingClientRect();
    const t = Math.max(0, Math.min(1, (e.clientX - rect.left)/rect.width));
    el.style.transform = `rotateY(${(t - .5)*-6}deg)`;
  });
  pages.addEventListener('pointerleave', ()=>{
    pages.querySelectorAll('.page-inner').forEach(el=> el.style.transform = '');
  });
})();

// ---------- Terms gating payments (per-course pages) ----------
(function(){
  const openBtn = document.querySelector('[data-open-terms]');
  const modal = document.getElementById('terms-modal');
  const closeBtn = document.querySelector('[data-close-terms]');
  const acceptBtn = document.querySelector('[data-accept-terms]');
  const payments = document.querySelector('.pay-block .payments');

  if (!openBtn || !modal || !closeBtn || !acceptBtn || !payments) return;

  openBtn.addEventListener('click', ()=> modal.removeAttribute('hidden'));
  closeBtn.addEventListener('click', ()=> modal.setAttribute('hidden',''));
  modal.addEventListener('click', (e)=> { if (e.target === modal) modal.setAttribute('hidden',''); });

  acceptBtn.addEventListener('click', ()=>{
    // On Netlify submit, page reloads or thank-you; meanwhile we reveal payments immediately:
    payments.hidden = false;
  });
})();
