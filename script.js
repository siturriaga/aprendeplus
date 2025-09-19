// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');

if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.hasAttribute('hidden');
    if (open) mobileNav.removeAttribute('hidden');
    else mobileNav.setAttribute('hidden', '');
  });
}
