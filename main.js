// Accordion FAQ toggle
document.querySelectorAll('.accordion-header').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.parentElement.classList.toggle('active');
  });
});

// (Opcional) Back-to-top
// const topBtn = document.getElementById('back-to-top');
// window.addEventListener('scroll', () => {
//   topBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
// });
// topBtn.addEventListener('click', () => {
//   window.scrollTo({ top: 0, behavior: 'smooth' });
// });
