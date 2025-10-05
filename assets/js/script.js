/* ================
   Aprende+ UI script (enhanced)
   - ADA panel (persist prefs)
   - Terms dialog open on “Continuar a pago / Agendar”
   - Home rail dots + swipe gestures
   - Header elevation on scroll
   - Scroll-reveal via IntersectionObserver
   - Card tilt (pointer parallax)
   - Button ripple (reduced-motion aware)
   - Accessible Testimonials carousel (15 items, 6s rotate, pause on hover/focus, keyboard)
   - Calendly prefill (name/email) + embed color + hide details
   ================ */

(function () {
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- ADA prefs (persisted) ---------- */
  const adaFab = $('[data-action="toggle-ada"]');
  const adaPanel = $('#ada-panel');
  const adaDone = $('[data-action="ada-done"]');
  const adaReset = $('[data-action="ada-reset"]');

  const PREF_KEY = 'adaPrefs';
  const defaultPrefs = { contrast: false, text: false, spacing: false, links: false, pause: false };

  function loadPrefs() {
    try { return JSON.parse(localStorage.getItem(PREF_KEY)) || defaultPrefs; } catch { return defaultPrefs; }
  }
  function savePrefs(p) { try { localStorage.setItem(PREF_KEY, JSON.stringify(p)); } catch {} }
  function applyPrefs(p) {
    document.documentElement.classList.toggle('ada-contrast', !!p.contrast);
    document.documentElement.style.fontSize = p.text ? '112%' : '';
    document.documentElement.classList.toggle('ada-spacing', !!p.spacing);
    document.documentElement.classList.toggle('ada-links-on', !!p.links);
    document.documentElement.classList.toggle('ada-pause', !!p.pause);
  }

  let prefs = loadPrefs(); applyPrefs(prefs);

  adaFab && adaFab.addEventListener('click', () => {
    const open = !adaPanel.hasAttribute('hidden');
    if (open) { adaPanel.setAttribute('hidden', ''); adaFab.setAttribute('aria-expanded', 'false'); }
    else { adaPanel.removeAttribute('hidden'); adaFab.setAttribute('aria-expanded', 'true'); }
  });
  adaDone && adaDone.addEventListener('click', () => { adaPanel.setAttribute('hidden', ''); adaFab.setAttribute('aria-expanded', 'false'); });
  adaReset && adaReset.addEventListener('click', () => {
    prefs = { ...defaultPrefs }; applyPrefs(prefs); savePrefs(prefs);
    $$('#ada-panel [data-ada]').forEach(i => i.checked = false);
  });
  $$('#ada-panel [data-ada]').forEach(input => {
    input.checked = !!prefs[input.dataset.ada];
    input.addEventListener('change', () => {
      prefs[input.dataset.ada] = input.checked;
      applyPrefs(prefs); savePrefs(prefs);
    });
  });

  /* ---------- Header elevation on scroll ---------- */
  (function initHeaderElevation() {
    const header = $('.site-header');
    if (!header) return;
    function onScroll() {
      const raised = (window.scrollY || window.pageYOffset) > 8;
      header.classList.toggle('is-raised', raised);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  })();

  /* ---------- Terms dialog ---------- */
  const terms = $('#terms-modal');
  $$('[data-action="open-terms"]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!terms) return;
      if (typeof terms.showModal === 'function') terms.showModal();
      else terms.removeAttribute('hidden'); // fallback
    });
  });

  /* ---------- Home rail dots + swipe ---------- */
  (function initRail() {
    const rail = $('.rail');
    const dotsWrap = $('.rail-dots');
    if (!rail || !dotsWrap) return;

    const cards = $$('.rail > .card');
    dotsWrap.innerHTML = cards.map((_, i) => `<button class="dot" data-i="${i}" aria-label="Ir a tarjeta ${i + 1}"></button>`).join('');
    const dots = $$('.dot', dotsWrap);
    const cardW = () => (cards[0]?.offsetWidth || 320) + 16;

    const setActive = (i) => { dots.forEach((d, idx) => d.classList.toggle('active', idx === i)); };
    setActive(0);

    dots.forEach(d => d.addEventListener('click', () => rail.scrollTo({ left: d.dataset.i * cardW(), behavior: 'smooth' })));

    let t;
    rail.addEventListener('scroll', () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const i = Math.round(rail.scrollLeft / cardW());
        setActive(Math.max(0, Math.min(i, cards.length - 1)));
      }, 80);
    });

    // Swipe gestures with Pointer Events
    let startX = 0, startLeft = 0, active = false;
    rail.addEventListener('pointerdown', (e) => { active = true; startX = e.clientX; startLeft = rail.scrollLeft; rail.setPointerCapture(e.pointerId); });
    rail.addEventListener('pointermove', (e) => { if (!active) return; rail.scrollLeft = startLeft - (e.clientX - startX); });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => rail.addEventListener(ev, () => { active = false; }));
  })();

  /* ---------- Scroll-reveal (IntersectionObserver) ---------- */
  (function initReveal() {
    const items = $$('[data-animate]');
    if (!items.length) return;
    if (prefersReduced) { items.forEach(el => el.classList.add('in-view')); return; }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('in-view');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

    items.forEach(el => io.observe(el));
  })();

  /* ---------- Card tilt (pointer parallax) ---------- */
  (function initTilt() {
    const tiltEls = $$('[data-tilt]');
    if (!tiltEls.length || prefersReduced) return;
    tiltEls.forEach(el => {
      let rect;
      function onMove(e) {
        rect = rect || el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - y) * 8; // rotateX
        const ry = (x - 0.5) * 10; // rotateY
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      }
      function onLeave() { el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)'; rect = null; }
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
    });
  })();

  /* ---------- Button ripple ---------- */
  (function initRipple() {
    if (prefersReduced) return;
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn, .link');
      if (!btn) return;
      const circle = document.createElement('span');
      circle.className = 'ripple';
      const rect = btn.getBoundingClientRect();
      const d = Math.max(rect.width, rect.height);
      circle.style.width = circle.style.height = d + 'px';
      circle.style.left = (e.clientX - rect.left - d / 2) + 'px';
      circle.style.top = (e.clientY - rect.top - d / 2) + 'px';
      btn.appendChild(circle);
      setTimeout(() => circle.remove(), 500);
    });
  })();

  /* ---------- Testimonials carousel (accessible) ---------- */
  (function initTestimonials() {
    const root = $('.js-testimonials');
    if (!root) return;
    const list = $('.js-t-list', root);
    const slides = $$('.js-t-slide', list);
    const prev = $('.js-t-prev', root);
    const next = $('.js-t-next', root);
    const dots = $('.js-t-dots', root);

    // build dots
    dots.innerHTML = slides.map((_, i) =>
      `<button type="button" role="tab" aria-selected="${i===0?'true':'false'}" aria-controls="t-slide-${i}" data-i="${i}" class="t-dot" title="Ir al testimonio ${i+1}"><span class="sr-only">Testimonio ${i+1}</span></button>`
    ).join('');

    const dotBtns = $$('.t-dot', dots);

    let idx = 0, hover = false, focus = false, timer;

    function setIndex(i, user) {
      idx = (i + slides.length) % slides.length;
      slides.forEach((s, k) => {
        s.hidden = k !== idx;
        s.setAttribute('aria-hidden', String(k !== idx));
      });
      dotBtns.forEach((d, k) => d.setAttribute('aria-selected', String(k === idx)));
      if (user) { root.setAttribute('data-user-advanced', '1'); }
    }

    function start() {
      if (prefersReduced) return;
      stop();
      timer = setInterval(() => {
        if (hover || focus) return;
        setIndex(idx + 1);
      }, 6000); // 6s per WAI/WCAG guidance to allow reading time. :contentReference[oaicite:1]{index=1}
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    // init states
    slides.forEach((s, k) => { s.id = `t-slide-${k}`; s.hidden = k !== 0; s.setAttribute('aria-hidden', String(k !== 0)); });
    setIndex(0);
    start();

    root.addEventListener('mouseenter', () => { hover = true; });
    root.addEventListener('mouseleave', () => { hover = false; });
    root.addEventListener('focusin', () => { focus = true; });
    root.addEventListener('focusout', () => { focus = false; });

    prev && prev.addEventListener('click', () => setIndex(idx - 1, true));
    next && next.addEventListener('click', () => setIndex(idx + 1, true));
    dotBtns.forEach(d => d.addEventListener('click', () => setIndex(parseInt(d.dataset.i, 10), true)));

    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); setIndex(idx - 1, true); }
      if (e.key === 'ArrowRight') { e.preventDefault(); setIndex(idx + 1, true); }
    });

    // Pause all motion if ADA “pause” is enabled
    const obs = new MutationObserver(() => {
      const paused = document.documentElement.classList.contains('ada-pause');
      paused ? stop() : start();
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  })();

  /* ---------- Calendly prefill for name/email ---------- */
  (function initCalendlyPrefill() {
    const frame = document.querySelector('iframe.calendly-embed');
    if (!frame) return;

    const url = new URL(frame.src, location.href);
    url.searchParams.set('hide_event_type_details', '1'); // show only availability grid. :contentReference[oaicite:2]{index=2}
    url.searchParams.set('hide_gdpr_banner', '1');
    url.searchParams.set('locale', 'es');
    url.searchParams.set('primary_color', '14b8a6');

    // If name/email present in page URL, pass them along
    const here = new URL(location.href);
    const name = here.searchParams.get('name') || here.searchParams.get('nombre');
    const email = here.searchParams.get('email') || here.searchParams.get('correo');
    if (name) url.searchParams.set('name', name);
    if (email) url.searchParams.set('email', email);
    frame.src = url.toString();
  })();

  /* ---------- Minimal test button (same as before) ---------- */
  const startBtn = $('[data-action="start-test"]');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      alert('Demo: el test adaptativo completo (20 preguntas) se puede activar luego. ¡Guardamos tu nombre/email con Netlify Forms!');
    });
  }

})();
