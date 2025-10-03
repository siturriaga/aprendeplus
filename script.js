// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// Contact form
document.querySelector(".contact-form")?.addEventListener("submit", e => {
  e.preventDefault();
  alert("¡Gracias por tu mensaje! Te responderemos pronto.");
});
