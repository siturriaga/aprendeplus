/* ================
   Aprende+ UI script
   - ADA panel (persist prefs)
   - Terms dialog open on “Continuar a pago / Agendar”
   - Home rail dots + minor UX
   - Minimal demo for test button
   ================ */

(function(){
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  /* ADA prefs */
  const adaFab = $('[data-action="toggle-ada"]');
  const adaPanel = $('#ada-panel');
  const adaDone = $('[data-action="ada-done"]');
  const adaReset = $('[data-action="ada-reset"]');

  const PREF_KEY = 'adaPrefs';
  const defaultPrefs = { contrast:false, text:false, spacing:false, links:false, pause:false };

  function loadPrefs(){
    try { return JSON.parse(localStorage.getItem(PREF_KEY)) || defaultPrefs; }
    catch { return defaultPrefs; }
  }
  function savePrefs(p){ try{ localStorage.setItem(PREF_KEY, JSON.stringify(p)); }catch{} }
  function applyPrefs(p){
    document.documentElement.classList.toggle('ada-contrast', !!p.contrast);
    document.documentElement.style.fontSize = p.text ? '112%' : '';
    document.documentElement.classList.toggle('ada-spacing', !!p.spacing);
    document.documentElement.classList.toggle('ada-links-on', !!p.links);
    document.documentElement.classList.toggle('ada-pause', !!p.pause);
  }

  let prefs = loadPrefs(); applyPrefs(prefs);

  adaFab && adaFab.addEventListener('click', ()=>{
    const open = adaPanel.hasAttribute('hidden') ? false : true;
    if (open){ adaPanel.setAttribute('hidden',''); adaFab.setAttribute('aria-expanded','false'); }
    else { adaPanel.removeAttribute('hidden'); adaFab.setAttribute('aria-expanded','true'); }
  });

  adaDone && adaDone.addEventListener('click', ()=>{
    adaPanel.setAttribute('hidden','');
    adaFab.setAttribute('aria-expanded','false');
  });
  adaReset && adaReset.addEventListener('click', ()=>{
    prefs = {...defaultPrefs}; applyPrefs(prefs); savePrefs(prefs);
    $$('#ada-panel [data-ada]').forEach(i => i.checked = false);
  });
  $$('#ada-panel [data-ada]').forEach(input=>{
    input.checked = !!prefs[input.dataset.ada];
    input.addEventListener('change', ()=>{
      prefs[input.dataset.ada] = input.checked;
      applyPrefs(prefs); savePrefs(prefs);
    });
  });

  /* Highlight links (CSS-driven) */
  // CSS (not here) uses .ada-links-on to underline & outline focusable anchors.

  /* Terms dialog (present on course pages) */
  const terms = $('#terms-modal');
  $$('[data-action="open-terms"]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      if (!terms) return; // not on this page
      terms.showModal();
    });
  });

  /* Home rail dots (basic) */
  const rail = $('.rail');
  const dotsWrap = $('.rail-dots');
  if (rail && dotsWrap){
    const cards = $$('.rail > .card');
    dotsWrap.innerHTML = cards.map((_,i)=>`<button class="dot" data-i="${i}" aria-label="Ir a tarjeta ${i+1}"></button>`).join('');
    const dots = $$('.dot', dotsWrap);
    const setActive = (i)=>{
      dots.forEach((d,idx)=> d.classList.toggle('active', idx===i));
    };
    setActive(0);
    dots.forEach(d=> d.addEventListener('click', ()=> rail.scrollTo({left: d.dataset.i * (cards[0].offsetWidth + 16), behavior:'smooth'})));
    let t;
    rail.addEventListener('scroll', ()=>{
      clearTimeout(t);
      t = setTimeout(()=>{
        const i = Math.round(rail.scrollLeft / (cards[0].offsetWidth + 16));
        setActive(Math.max(0, Math.min(i, cards.length-1)));
      }, 80);
    });
  }

  /* Test button demo */
  const startBtn = $('[data-action="start-test"]');
  if (startBtn){
    startBtn.addEventListener('click', ()=>{
      alert('Demo: el test adaptativo completo (20 preguntas) se puede activar luego. ¡Guardamos tu nombre/email con Netlify Forms!');
    });
  }
})();
