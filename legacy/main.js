/* ========== Language (i18n) ========== */
const I18N = { current: 'es', packs: {} };
const LANGS = ['es','en','ht'];
async function loadLang(lang){
  if(!LANGS.includes(lang)) lang='es';
  if(I18N.packs[lang]) return I18N.packs[lang];
  const res = await fetch(`/i18n/${lang}.json`).catch(()=>null);
  if(!res || !res.ok){ return I18N.packs['es'] || {}; }
  const json = await res.json();
  I18N.packs[lang] = json;
  return json;
}
function applyI18n(pack){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const value = key.split('.').reduce((o,k)=>o && o[k], pack);
    if(typeof value === 'string'){ el.innerHTML = value; }
  });
}
async function setLanguage(lang){
  const pack = await loadLang(lang);
  I18N.current = lang;
  localStorage.setItem('lang', lang);
  applyI18n(pack);
  document.querySelectorAll('.lang-btn').forEach(btn=>{
    btn.setAttribute('aria-pressed', btn.dataset.lang===lang ? 'true' : 'false');
  });
}
async function initI18n(){
  const saved = localStorage.getItem('lang');
  const initial = saved || (navigator.language || 'es').slice(0,2);
  await setLanguage(LANGS.includes(initial) ? initial : 'es');
  document.querySelectorAll('.lang-btn').forEach(btn=>{
    btn.addEventListener('click',()=>setLanguage(btn.dataset.lang));
  });
}

/* ========== Accessibility Toolbar ========== */
function setPref(cls, enabled){
  document.body.classList.toggle(cls, enabled);
  const prefs = JSON.parse(localStorage.getItem('prefs')||'{}');
  prefs[cls] = !!enabled; localStorage.setItem('prefs', JSON.stringify(prefs));
}
function applySavedPrefs(){
  const prefs = JSON.parse(localStorage.getItem('prefs')||'{}');
  Object.keys(prefs).forEach(cls=>{
    if(prefs[cls]) document.body.classList.add(cls);
  });
}
function initA11yToolbar(){
  applySavedPrefs();
  const btns = document.querySelectorAll('.a11y-toolbar [data-tool]');
  let size = parseInt(localStorage.getItem('pref-size')||'0',10);
  function applySize(){ document.body.classList.toggle('pref-bigger-1', size===1);
                        document.body.classList.toggle('pref-bigger-2', size>=2);
                        localStorage.setItem('pref-size', String(size)); }
  applySize();
  btns.forEach(b=>{
    b.addEventListener('click',()=>{
      const tool = b.dataset.tool;
      if(tool==='text+'){ size = Math.min(2, size+1); applySize(); }
      else if(tool==='text-'){ size = Math.max(0, size-1); applySize(); }
      else if(tool==='lines'){ setPref('pref-lines', !document.body.classList.contains('pref-lines')); }
      else if(tool==='contrast'){ setPref('pref-contrast', !document.body.classList.contains('pref-contrast')); }
      else if(tool==='dyslexia'){ setPref('pref-dyslexia', !document.body.classList.contains('pref-dyslexia')); }
      else if(tool==='motion'){ setPref('pref-reduced-motion', !document.body.classList.contains('pref-reduced-motion')); }
      else if(tool==='underline'){ setPref('pref-underline', !document.body.classList.contains('pref-underline')); }
    });
  });
}

/* ========== Smooth anchor scroll ========== */
document.addEventListener('click', (e)=>{
  const a = e.target.closest('a[href^="#"]');
  if(!a) return;
  const id = a.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
});

/* ========== Testimonials Carousel (robust) ========== */
function initTestimonials(){
  document.querySelectorAll('.testimonials').forEach(block=>{
    const viewport = block.querySelector('.testimonial-viewport');
    const items = viewport ? Array.from(viewport.querySelectorAll('.testimonial')) : [];
    if(!viewport || items.length === 0) return;

    const prev = block.querySelector('.ts-prev');
    const next = block.querySelector('.ts-next');
    const pauseBtn = block.querySelector('.ts-pause');

    // Ensure exactly one "current"
    let i = items.findIndex(el=>el.classList.contains('current'));
    if(i < 0){ i = 0; items[0].classList.add('current'); }
    else {
      items.forEach((el,idx)=>{ if(idx!==i) el.classList.remove('current'); });
    }

    let paused = false;
    let timer = null;
    const delay = 6500;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function show(idx){
      items[i].classList.remove('current');
      i = (idx + items.length) % items.length;
      items[i].classList.add('current');
    }
    function start(){
      stop();
      if (paused || prefersReduced) return;
      timer = setInterval(()=>show(i+1), delay);
    }
    function stop(){ if(timer){ clearInterval(timer); timer=null; } }

    // Controls
    prev && prev.addEventListener('click', ()=>{ show(i-1); start(); });
    next && next.addEventListener('click', ()=>{ show(i+1); start(); });
    pauseBtn && pauseBtn.addEventListener('click', ()=>{
      paused = !paused;
      pauseBtn.setAttribute('aria-pressed', String(paused));
      if(paused) stop(); else start();
    });

    // Auto-pause on user interaction
    viewport.addEventListener('mouseenter', stop);
    viewport.addEventListener('mouseleave', start);
    viewport.addEventListener('focusin', stop);
    viewport.addEventListener('focusout', start);

    // Only start when the block is actually visible on screen
    const io = ('IntersectionObserver' in window) ? new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){ start(); }
        else { stop(); }
      });
    }, { threshold: 0.2 }) : null;

    if(io){ io.observe(block); } else { start(); } // fallback if IO not supported
  });
}

/* ========== CEFR Test Scoring ========== */
function initCefrTest(){
  const form = document.getElementById('cef-test');
  if(!form) return;
  const evaluateBtn = document.getElementById('btn-evaluate');
  const submitBtn = document.getElementById('btn-submit');
  const resLevel = document.getElementById('result-level');
  const resScore = document.getElementById('result-score');

  const key = { q1:'B', q2:'B', q3:'B', q4:'B', q5:'B', q6:'B', q7:'B', q8:'B', q9:'A', q10:'B', q11:'A', q12:'B', q13:'B', q14:'A', q15:'B', q16:'B', q17:'B', q18:'B' };

  function mapScoreToCEFR(score){
    if(score<=3) return 'A1';
    if(score<=6) return 'A2';
    if(score<=10) return 'B1';
    if(score<=14) return 'B2';
    if(score<=16) return 'C1';
    return 'C2';
  }

  function evaluate(){
    const answers = {};
    let score = 0;
    Object.keys(key).forEach(q=>{
      const val = (form.querySelector(`input[name="${q}"]:checked`)||{}).value || '';
      answers[q] = val;
      if(val === key[q]) score++;
    });
    const level = mapScoreToCEFR(score);
    resLevel.textContent = level;
    resScore.textContent = `(${score}/18)`;

    // Fill hidden fields for Netlify
    form.querySelector('#nf-score').value = String(score);
    form.querySelector('#nf-level').value = level;
    form.querySelector('#nf-answers').value = JSON.stringify(answers);

    // Enable submit if user filled name/email
    submitBtn.disabled = !(form.name.value && form.email.value);
  }

  evaluateBtn.addEventListener('click', evaluate);
  form.addEventListener('change', (e)=>{
    if(e.target.name==='name' || e.target.name==='email') return;
    if(resLevel.textContent && resLevel.textContent!=='—') evaluate();
  });
  form.name.addEventListener('input', ()=>{ if(resLevel.textContent!=='—') evaluate(); });
  form.email.addEventListener('input', ()=>{ if(resLevel.textContent!=='—') evaluate(); });
}

/* ========== Init ========== */
document.addEventListener('DOMContentLoaded', ()=>{
  initI18n();
  initA11yToolbar();
  initTestimonials();   // ← carousel is initialized here
  initCefrTest();
});
