// Theme toggle
const root = document.documentElement;
const btnTheme = document.getElementById('theme-toggle');
btnTheme.addEventListener('click', ()=>{
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  btnTheme.querySelector('use').setAttribute('href', next==='light'?'#icon-sun':'#icon-moon');
});

// Mobile menu
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('primary-nav');
navToggle.addEventListener('click', ()=>{
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

// Reveal on scroll
document.querySelectorAll('.reveal').forEach(el=>{
  new IntersectionObserver((entries, obs)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  },{threshold:.2}).observe(el);
});

// Floating buttons
const back = document.getElementById('back-to-top');
const home = document.getElementById('home-button');
window.addEventListener('scroll', ()=>{
  const show = window.scrollY>300;
  back.style.display = show?'flex':'none';
  home.style.display = show?'flex':'none';
});
back.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));
home.addEventListener('click', ()=>window.scrollTo({top:0,behavior:'smooth'}));
