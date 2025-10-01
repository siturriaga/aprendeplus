/* existing ADA, Reveal, Testimonials, Deck code stays the same */

/* --- Show Calendly on click (student-only view) --- */
(function(){
  document.querySelectorAll('[data-open-calendly]').forEach(btn=>{
    const targetSel = btn.getAttribute('data-target') || '.calendly-wrap';
    const target = document.querySelector(targetSel);
    if (!target) return;
    btn.addEventListener('click', ()=>{
      target.removeAttribute('hidden');
      target.scrollIntoView({behavior:'smooth', block:'center'});
    });
  });
})();

/* --- Reveal payments on click (Home) --- */
(function(){
  document.querySelectorAll('[data-reveal-payments]').forEach(btn=>{
    const targetSel = btn.getAttribute('data-target') || '.payments-strip';
    const target = document.querySelector(targetSel);
    if (!target) return;
    btn.addEventListener('click', ()=>{
      target.removeAttribute('hidden');
      target.scrollIntoView({behavior:'smooth', block:'center'});
    });
  });
})();

/* --- Terms gating payments (per-curso pages) --- */
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
    payments.hidden = false; // show logos/links after acceptance + submit
  });
})();
