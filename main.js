// Theme Toggle
const root = document.documentElement;
const saved = localStorage.getItem('theme');
if (saved) root.setAttribute('data-theme', saved);

document.getElementById('theme-toggle').addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Mobile Menu Toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('primary-nav');
navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.classList.toggle('active', open);
  navToggle.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
  })
);

// Accordion
document.querySelectorAll('.accordion-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !open);
    const content = btn.nextElementSibling;
    content.style.maxHeight = !open ? content.scrollHeight + 'px' : 0;
  });
});

// Reveal on Scroll
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: .18 });
  reveals.forEach(r => io.observe(r));
} else {
  reveals.forEach(r => r.classList.add('is-visible'));
}

// Back to Top Button
const backTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
});
backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
