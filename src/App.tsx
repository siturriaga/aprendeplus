import React, { useEffect, useRef, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, GraduationCap, Mail, ChevronRight, Sparkles, CheckCircle2 } from "lucide-react";

const GlobalStyles = memo(() => (
  <style>{`
    :root { --brand-blue: 30, 58, 138; --brand-amber: 245, 158, 11; }
    html { scroll-behavior: smooth; }
    .bg-static { background: linear-gradient(135deg, rgba(var(--brand-blue),0.8), rgba(var(--brand-amber),0.8)); min-height: 100vh; }
    .pane { background: linear-gradient(135deg, rgba(var(--brand-blue),0.20), rgba(var(--brand-amber),0.20)); backdrop-filter: blur(8px); }
    .divider { height: 3px; background: linear-gradient(90deg, rgb(var(--brand-amber)), rgb(var(--brand-blue))); border-radius: 9999px; }
    .link-underline { position: relative; }
    .link-underline::after { content: ""; position: absolute; left: 0; bottom: -2px; height: 3px; width: 0; background: linear-gradient(90deg, rgb(var(--brand-amber)), rgb(var(--brand-blue))); transition: width .3s ease; border-radius: 9999px; }
    .link-underline:hover::after { width: 100%; }
    .nav-active { color: #fcd34d; }
    .a11y-contrast { filter: contrast(1.4) brightness(1.1); }
    .a11y-dyslexia { font-family: Arial, Verdana, sans-serif; letter-spacing: 0.05em; }
    .a11y-large-text { font-size: 18px; }
    .a11y-reduce-motion * { animation: none !important; transition: none !important; }
    .testimonial-grid { display: grid; gap: 1rem; }
    @media (min-width: 768px) { .testimonial-grid { grid-template-columns: repeat(2, 1fr); } }
  `}</style>
));

const THEME = {
  textPrimary: "text-white",
  textSecondary: "text-amber-100",
  accentText: "text-amber-300",
  borderAccent: "border-amber-400/80",
  btnPrimary: "bg-gradient-to-r from-amber-500 via-blue-700 to-blue-900 hover:brightness-110 text-white shadow-lg",
  gradientAccent: "from-blue-900 via-amber-400 to-amber-200",
  container: "max-w-6xl mx-auto px-6",
};

const reveal = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Logo = memo(() => (
  <div className="flex items-center gap-3 select-none">
    <div className="relative">
      <Sparkles className={`absolute -top-2 -right-2 h-5 w-5 animate-pulse ${THEME.accentText}`} />
      <GraduationCap className={`h-10 w-10 text-amber-300 drop-shadow`} />
    </div>
    <span className={`font-extrabold tracking-tight text-3xl text-amber-200 drop-shadow`}>Aprende+</span>
  </div>
));

const Pill = memo(({ children }: { children: React.ReactNode }) => (
  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${THEME.borderAccent} text-sm font-medium text-white bg-gradient-to-r from-blue-800/80 to-amber-600/80 shadow-md`}>
    <CheckCircle2 className={`h-4 w-4 ${THEME.accentText}`} /> {children}
  </span>
));

const Section = ({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: React.ReactNode }) => (
  <section id={id} className="py-24">
    <div className={THEME.container}>
      <motion.header variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center">
        <h2 className={`text-5xl font-extrabold tracking-tight ${THEME.textPrimary}`}>{title}</h2>
        {subtitle ? <p className={`mt-4 text-lg ${THEME.textSecondary} max-w-3xl mx-auto`}>{subtitle}</p> : null}
      </motion.header>
      <div className="mt-8 divider" />
      <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12">{children}</motion.div>
    </div>
  </section>
));

const Card = ({ children }: { children: React.ReactNode }) => (
  <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className={`p-8 rounded-3xl border ${THEME.borderAccent} bg-gradient-to-br from-blue-800/90 to-amber-700/90 text-white shadow-lg`}>
    {children}
  </motion.div>
));

const CTAButton = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className={`px-8 py-5 rounded-3xl ${THEME.btnPrimary} text-lg font-bold inline-flex items-center gap-3 transform transition hover:scale-105`}>{children}</a>
));

const GhostButton = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className={`px-8 py-5 rounded-3xl border-2 ${THEME.borderAccent} text-white bg-blue-900/40 hover:bg-amber-500 hover:text-white transition inline-flex items-center gap-3`}>{children}</a>
));

const Testimonial = memo(({ item }: { item: { quote: string; name: string } }) => (
  <motion.div
    key={item.name}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.45 }}
    className={`p-6 rounded-3xl shadow-xl bg-gradient-to-br from-blue-900/80 to-amber-700/80 border ${THEME.borderAccent} text-white`}
  >
    <p className="text-lg leading-relaxed">“{item.quote}”</p>
    <p className={`mt-4 font-bold ${THEME.accentText}`}>— {item.name}</p>
  </motion.div>
));

export default function App() {
  const quotes = [
    { quote: "El coaching de inglés C1 por fin me hizo hablar con naturalidad.", name: "Daniela R." },
    { quote: "Historia fue rigurosa y justa — mis ensayos mejoraron rápido.", name: "Marcus J." },
    { quote: "El curso de filosofía me abrió puertas.", name: "Ana P." },
    { quote: "Las clases son flexibles y personalizadas a mis necesidades.", name: "Luis F." },
    { quote: "Profesores expertos que me guiaron con paciencia.", name: "María G." },
    { quote: "Los materiales digitales incluidos son de gran calidad.", name: "Sofía L." },
    { quote: "Aprendí más en 3 meses que en años de estudios.", name: "Carlos H." },
    { quote: "Clases dinámicas y motivadoras.", name: "Fernanda V." },
    { quote: "Excelente preparación para exámenes internacionales.", name: "Tomás I." },
    { quote: "Muy buena atención y seguimiento del progreso.", name: "Patricia O." },
    { quote: "Se nota la experiencia de más de 20 años en pedagogía.", name: "Rodrigo P." },
    { quote: "Horarios muy cómodos para mi trabajo.", name: "Valentina D." },
    { quote: "Clases prácticas y fáciles de entender.", name: "Ignacio R." },
    { quote: "Me apoyaron en todo el proceso de aprendizaje.", name: "Camila B." },
    { quote: "Recomiendo Aprende+ sin dudarlo.", name: "Javier S." }
  ];
  const [qIdx, setQIdx] = useState(0);
  const intervalRef = useRef<number | null>(null);
  useEffect(() => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => setQIdx((i) => (i + 1) % quotes.length), 5000);
    return () => { if (intervalRef.current) window.clearInterval(intervalRef.current); };
  }, [quotes.length]);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const [a11y, setA11y] = useState({ contrast: false, dyslexia: false, largeText: false, reduceMotion: false });
  const [a11yOpen, setA11yOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ap_a11y");
      if (saved) setA11y(JSON.parse(saved));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("ap_a11y", JSON.stringify(a11y));
    } catch {}
  }, [a11y]);

  useEffect(() => {
    const ids = ["hero", "programas", "opiniones", "precios", "boletin", "quienes", "contacto"];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.2, 0.5, 0.8] }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      <a href="#programas" onClick={onClick} className={`hover:text-amber-300 transition link-underline ${activeId === "programas" ? "nav-active" : ""}`}>Programas</a>
      <a href="#opiniones" onClick={onClick} className={`hover:text-amber-300 transition link-underline ${activeId === "opiniones" ? "nav-active" : ""}`}>Opiniones</a>
      <a href="#precios" onClick={onClick} className={`hover:text-amber-300 transition link-underline ${activeId === "precios" ? "nav-active" : ""}`}>Precios</a>
      <a href="#boletin" onClick={onClick} className={`hover:text-amber-300 transition link-underline ${activeId === "boletin" ? "nav-active" : ""}`}>Boletín</a>
      <a href="#quienes" onClick={onClick} className={`hover:text-amber-300 transition link-underline ${activeId === "quienes" ? "nav-active" : ""}`}>Quiénes Somos</a>
      <a href="#contacto" onClick={onClick} className={`hover:text-amber-300 transition link-underline ${activeId === "contacto" ? "nav-active" : ""}`}>Contacto</a>
    </>
  );

  return (
    <div className={`bg-static ${a11y.contrast ? "a11y-contrast" : ""} ${a11y.dyslexia ? "a11y-dyslexia" : ""} ${a11y.largeText ? "a11y-large-text" : ""} ${a11y.reduceMotion ? "a11y-reduce-motion" : ""}`}>
      <GlobalStyles />

      <header className="sticky top-0 z-50 backdrop-blur bg-gradient-to-r from-blue-900/90 to-amber-600/90 border-b border-amber-400/60 shadow-lg">
        <div className={`${THEME.container} h-16 flex items-center justify-between`}>
          <Logo />
          <nav className="hidden md:flex items-center gap-6 text-white font-medium">
            <NavLinks />
          </nav>
          <button className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-amber-400/60 text-white" onClick={() => setMobileOpen((v) => !v)} aria-label="Abrir menú">
            <span className="sr-only">Menú</span>
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </div>
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden border-t border-amber-400/60 bg-blue-950/95 text-white">
            <div className={`${THEME.container} py-4 flex flex-col gap-4 text-lg`} onClick={() => setMobileOpen(false)}>
              <NavLinks onClick={() => setMobileOpen(false)} />
            </div>
          </div>
        )}
      </header>

      <section id="hero" className={`${THEME.container} py-32 text-center`}>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-amber-200 drop-shadow-lg">Aprende con valentía. Enseña el futuro.</h1>
        <p className="mt-6 text-xl md:text-2xl text-white max-w-3xl mx-auto">Cursos bilingües con resultados reales — de Inglés A1–C1 a Historia, Filosofía y Política.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <CTAButton href="#programas"><BookOpen className="h-6 w-6" /> Ver programas</CTAButton>
          <GhostButton href="#precios"><ChevronRight className="h-6 w-6" /> Inscribirme</GhostButton>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Pill>Materiales digitales incluidos</Pill>
          <Pill>2× sesiones por semana</Pill>
          <Pill>CEFR • Estándares</Pill>
        </div>
      </section>

      <Section id="programas" title="Programas">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { n: "Inglés A1–C1", b: "Habla primero; coaching de acento y evaluaciones CEFR." },
            { n: "Historia: desde cursos de entrada hasta temas especiales", b: "Crítico, preciso y alineado a estándares." },
            { n: "Filosofía y Teoría Política", b: "De Aristóteles a Dussel — riguroso pero claro." },
            { n: "Capacitación Docente", b: "Educación secundaria, integración de IA, gamificación e instrucción diferenciada." }
          ].map((c) => (
            <Card key={c.n}>
              <h3 className="font-bold text-xl text-amber-200">{c.n}</h3>
              <p className="mt-2 text-base text-white/95">{c.b}</p>
              <div className="mt-4">
                <a href="#precios" className="inline-flex items-center gap-2 text-sm link-underline text-white hover:text-amber-200">
                  Ver precios <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="opiniones" title="Lo que dicen">
        <div className="max-w-3xl mx-auto">
          <div className={`rounded-3xl p-1 bg-gradient-to-r ${THEME.gradientAccent} shadow-2xl`}>
            <div className="rounded-[22px] p-8">
              <AnimatePresence mode="wait">
                <Testimonial item={quotes[qIdx]} key={quotes[qIdx].name} />
              </AnimatePresence>
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setQIdx(i)}
                className={`h-3 w-3 rounded-full border ${i === qIdx ? "bg-amber-400 border-white" : "border-amber-300 opacity-70"}`}
                aria-label={`Ir a testimonio ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="quienes"
        title="Quiénes Somos"
        subtitle="Empresa con base en EE. UU. • 20+ años de experiencia en enseñanza y pedagogía"
      >
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-start gap-4">
              <GraduationCap className="h-8 w-8 text-amber-300" />
              <div>
                <h4 className="font-bold text-xl text-amber-200">Docentes expertos</h4>
                <p className="mt-2 text-base text-white/95">Cursos impartidos por profesionales con grados de <strong>Licenciatura</strong>, <strong>Maestría</strong> y <strong>Doctorado</strong>.</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start gap-4">
              <BookOpen className="h-8 w-8 text-amber-300" />
              <div>
                <h4 className="font-bold text-xl text-amber-200">Metodología</h4>
                <p className="mt-2 text-base text-white/95">Clases flexibles y personalizadas, con materiales digitales incluidos y medición de progreso.</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start gap-4">
              <Sparkles className="h-8 w-8 text-amber-300" />
              <div>
                <h4 className="font-bold text-xl text-amber-200">Resultados</h4>
                <p className="mt-2 text-base text-white/95">Más de 20 años ayudando a estudiantes a alcanzar metas académicas y profesionales.</p>
              </div>
            </div>
          </Card>
        </div>
        <div className="mt-8 grid md:grid-cols-4 gap-4">
          <div className={`pane rounded-2xl p-4 text-center border ${THEME.borderAccent}`}><p className="text-3xl font-extrabold text-white">20+</p><p className="text-amber-100">Años de experiencia</p></div>
          <div className={`pane rounded-2xl p-4 text-center border ${THEME.borderAccent}`}><p className="text-3xl font-extrabold text-white">1000+</p><p className="text-amber-100">Estudiantes guiados</p></div>
          <div className={`pane rounded-2xl p-4 text-center border ${THEME.borderAccent}`}><p className="text-3xl font-extrabold text-white">BA–PhD</p><p className="text-amber-100">Niveles de instrucción</p></div>
          <div className={`pane rounded-2xl p-4 text-center border ${THEME.borderAccent}`}><p className="text-3xl font-extrabold text-white">100%</p><p className="text-amber-100">Clases personalizadas</p></div>
        </div>
      </Section>

      <Section id="precios" title="Precios">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: "Inglés", p: "20.000", nota: "por clase" },
            { n: "Historia: entrada y temas", p: "25.000", nota: "por clase" },
            { n: "Filosofía y Teoría Política", p: "30.000", nota: "por clase" }
          ].map((card, i) => (
            <Card key={i}>
              <h3 className="font-bold text-xl text-amber-200">{card.n}</h3>
              <div className="mt-2 text-4xl font-extrabold text-white">CLP ${card.p}<span className="text-lg font-medium opacity-90"> {card.nota}</span></div>
              <ul className="mt-4 space-y-2 text-base text-white/95">
                <li>• Mínimo 2× por semana</li>
                <li>• Materiales digitales incluidos</li>
                <li>• Retroalimentación de progreso</li>
              </ul>
              <div className="mt-6">
                <a href="#contacto" className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl border ${THEME.borderAccent} text-white hover:bg-amber-500 hover:text-white transition`}>
                  <ChevronRight className="h-5 w-5" /> Comenzar
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="boletin" title="Suscríbete a nuestro boletín" subtitle="Nuevos cursos, recursos gratuitos y becas ocasionales.">
        <form
          onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); const email = fd.get("email"); alert(`¡Gracias! Te escribiremos: ${email}`); e.currentTarget.reset(); }}
          className={`max-w-xl mx-auto p-6 rounded-3xl border ${THEME.borderAccent} bg-gradient-to-br from-blue-900/80 to-amber-600/80 shadow-lg`}
        >
          <div className="flex gap-2">
            <input name="email" type="email" required placeholder="Tu correo electrónico" className="flex-1 px-4 py-3 rounded-xl border bg-white/95 text-blue-900 placeholder:text-blue-600" />
            <button type="submit" className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl ${THEME.btnPrimary}`}>
              <Mail className="h-5 w-5" /> Suscribirme
            </button>
          </div>
          <p className="mt-3 text-sm text-amber-100">Sin spam. Puedes darte de baja cuando quieras.</p>
        </form>
      </Section>

      <Section id="contacto" title="Contacto">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-bold text-xl text-amber-200">Escríbenos</h3>
            <form onSubmit={(e) => { e.preventDefault(); alert("¡Mensaje enviado! Te responderemos pronto."); e.currentTarget.reset(); }} className="mt-4 space-y-3">
              <input className="w-full px-4 py-3 rounded-xl border bg-white/95 text-blue-900 placeholder:text-blue-600" placeholder="Nombre" required />
              <input className="w-full px-4 py-3 rounded-xl border bg-white/95 text-blue-900 placeholder:text-blue-600" type="email" placeholder="Correo" required />
              <textarea className="w-full px-4 py-3 rounded-xl border bg-white/95 text-blue-900 placeholder:text-blue-600" rows={4} placeholder="¿Cómo podemos ayudar?" />
              <button className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl border ${THEME.borderAccent} text-white hover:bg-amber-500 hover:text-white transition`}>
                <Mail className="h-5 w-5" /> Enviar
              </button>
            </form>
          </Card>
          <Card>
            <h3 className="font-bold text-xl text-amber-200">Accesos rápidos</h3>
            <ul className="mt-3 space-y-2 text-base">
              <li><a href="#programas" className="link-underline text-white">Ver programas</a></li>
              <li><a href="#precios" className="link-underline text-white">Precios</a></li>
              <li><a href="#opiniones" className="link-underline text-white">Opiniones</a></li>
              <li><a href="#boletin" className="link-underline text-white">Suscribirse al boletín</a></li>
            </ul>
          </Card>
        </div>
      </Section>

      <button
        aria-label="Abrir accesibilidad"
        onClick={() => setA11yOpen((v) => !v)}
        className={`fixed bottom-4 right-4 px-4 py-3 rounded-2xl ${THEME.btnPrimary}`}
      >
        Accesibilidad
      </button>
      {a11yOpen && (
        <div className={`fixed bottom-20 right-4 p-4 rounded-2xl border ${THEME.borderAccent} bg-blue-900/90 text-white shadow-xl w-72`}>
          <h4 className="font-bold">Opciones de accesibilidad</h4>
          <div className="mt-3 space-y-2 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" checked={a11y.contrast} onChange={(e) => setA11y({ ...a11y, contrast: e.target.checked })} /> Alto contraste</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={a11y.dyslexia} onChange={(e) => setA11y({ ...a11y, dyslexia: e.target.checked })} /> Fuente amigable</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={a11y.largeText} onChange={(e) => setA11y({ ...a11y, largeText: e.target.checked })} /> Texto grande</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={a11y.reduceMotion} onChange={(e) => setA11y({ ...a11y, reduceMotion: e.target.checked })} /> Reducir animaciones</label>
          </div>
        </div>
      )}

      <footer className="py-12 border-t border-amber-400/60 bg-blue-900/40 backdrop-blur">
        <div className={`${THEME.container} text-center text-white`}>
          <div className="flex items-center justify-center gap-3">
            <Sparkles className={`h-5 w-5 ${THEME.accentText}`} />
            <GraduationCap className="h-8 w-8 text-white" />
            <span className="font-extrabold tracking-tight text-2xl">Aprende+</span>
          </div>
          <p className="mt-4 text-sm opacity-95">© {new Date().getFullYear()} Aprende+. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
