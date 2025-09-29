/* Aprende+ main.js — PRO
   - ADA preferences (localStorage)
   - Reveal on scroll
   - Testimonials carousel (index)
   - Adaptive test (index)
   - Chip filters (cursos.html)
   - 3D tilt cards (cursos.html)
   - Mesh parallax (cursos.html)
*/

const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
function lsGet(k, f){ try{ const v = localStorage.getItem(k); return v ? JSON.parse(v) : f } catch { return f } }
function lsSet(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); } catch {} }

/* ---------- ADA ---------- */
const adaBtn = $('#ada-button'), adaPanel = $('#ada-panel'), adaClose = $('#ada-close'), adaReset = $('#ada-reset');
const pref = lsGet('adaPrefs', { contrast:false, text:false, spacing:false, pause:false, links:false });
const cbContrast = $('#ada-contrast'), cbText = $('#ada-text'), cbSpacing = $('#ada-spacing'), cbPause = $('#ada-pause'), cbLinks = $('#ada-links');

function applyPrefs(p){
  document.body.classList.toggle('ada-contrast', !!p.contrast);
  document.body.classList.toggle('ada-bigtext', !!p.text);
  document.body.classList.toggle('ada-spacing', !!p.spacing);
  document.body.classList.toggle('ada-pause', !!p.pause);
  document.body.classList.toggle('ada-links', !!p.links);
}
function syncToggles(p){
  if(cbContrast) cbContrast.checked = !!p.contrast;
  if(cbText) cbText.checked = !!p.text;
  if(cbSpacing) cbSpacing.checked = !!p.spacing;
  if(cbPause) cbPause.checked = !!p.pause;
  if(cbLinks) cbLinks.checked = !!p.links;
}
applyPrefs(pref); syncToggles(pref);

adaBtn?.addEventListener('click', () => {
  const open = !adaPanel.hasAttribute('hidden');
  if (open) adaPanel.setAttribute('hidden',''); else adaPanel.removeAttribute('hidden');
  adaBtn.setAttribute('aria-expanded', String(!open));
});
adaClose?.addEventListener('click', () => { adaPanel.setAttribute('hidden',''); adaBtn.setAttribute('aria-expanded','false'); });

cbContrast?.addEventListener('change', e => { pref.contrast = e.target.checked; lsSet('adaPrefs', pref); applyPrefs(pref); });
cbText?.addEventListener('change', e => { pref.text = e.target.checked; lsSet('adaPrefs', pref); applyPrefs(pref); });
cbSpacing?.addEventListener('change', e => { pref.spacing = e.target.checked; lsSet('adaPrefs', pref); applyPrefs(pref); });
cbPause?.addEventListener('change', e => { pref.pause = e.target.checked; lsSet('adaPrefs', pref); applyPrefs(pref); });
cbLinks?.addEventListener('change', e => { pref.links = e.target.checked; lsSet('adaPrefs', pref); applyPrefs(pref); });

adaReset?.addEventListener('click', () => { const p = {contrast:false, text:false, spacing:false, pause:false, links:false}; lsSet('adaPrefs', p); applyPrefs(p); syncToggles(p); });

/* ---------- Reveal ---------- */
const io = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold:.15 });
$$('.reveal').forEach(el => io.observe(el));

/* ---------- Testimonials (index) ---------- */
(function(){
  const qEl = $('#t-quote'); const nEl = $('#t-name'); const dots = $('.dots');
  if (!qEl || !nEl || !dots) return;
  const DATA = [
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
  let idx=0, hover=false;
  function renderDots(){ dots.innerHTML=''; DATA.forEach((_,i)=>{ const b=document.createElement('button'); b.setAttribute('aria-label',`Testimonio ${i+1}`); b.setAttribute('aria-selected', i===idx ? 'true':'false'); b.addEventListener('click',()=>{ idx=i; update(); }); dots.appendChild(b); }); }
  function update(){ qEl.textContent = `“${DATA[idx].q}”`; nEl.textContent = `— ${DATA[idx].n}`; $$('.dots button').forEach((b,i)=> b.setAttribute('aria-selected', i===idx ? 'true':'false')); }
  renderDots(); update();
  dots?.parentElement?.addEventListener('mouseenter', ()=> hover=true);
  dots?.parentElement?.addEventListener('mouseleave', ()=> hover=false);
  setInterval(()=>{ if(!hover){ idx=(idx+1)%DATA.length; update(); } }, 6000);
})();

/* ---------- Adaptive Test (index) ---------- */
/* (kept from your previous main.js — omitted here for brevity if already present)
   If you replaced the file, paste your existing test block here,
   or keep the earlier version I sent (works out of the box). */

/* ---------- Cursos page: chips filter ---------- */
(function(){
  const grid = $('.courses-grid'); if(!grid) return;
  const chips = $$('.chip');
  chips.forEach(ch => ch.addEventListener('click', () => {
    const now = ch.dataset.filter;
    chips.forEach(c => c.classList.toggle('is-on', c===ch));
    $$('.course', grid).forEach(card => {
      card.style.display = (now==='all' || card.classList.contains(now)) ? '' : 'none';
    });
  }));
})();

/* ---------- Cursos page: 3D tilt ---------- */
(function(){
  const cards = $$('[data-tilt]'); if (!cards.length) return;
  const MAX = 10; const SENS = 20;
  cards.forEach(card => {
    let rect=null;
    function update(e){
      rect = rect || card.getBoundingClientRect();
      const cx = rect.left + rect.width/2;
      const cy = rect.top + rect.height/2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const rx = (dy * -MAX).toFixed(2);
      const ry = (dx *  MAX).toFixed(2);
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    }
    function reset(){ card.style.transform=''; rect=null; }
    card.addEventListener('mousemove', update);
    card.addEventListener('mouseleave', reset);
    card.addEventListener('mouseenter', ()=> rect=null);
  });
})();

/* ---------- Cursos page: mesh parallax ---------- */
(function(){
  const mesh = $('.hero-mesh .mesh'); if(!mesh) return;
  const orbs = $$('.hero-mesh .orb'); if(!orbs.length) return;
  window.addEventListener('scroll', ()=>{
    const y = window.scrollY || 0;
    orbs.forEach((o,i)=>{ o.style.transform = `translateY(${-(y*0.06*(i+1))}px)`; });
  }, {passive:true});
})();
