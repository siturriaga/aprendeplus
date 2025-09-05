import React, { useEffect, useRef, useState, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, GraduationCap, Mail, ChevronRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

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
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className={`p-8 rounded-3xl border ${THEME.borderAccent} bg-gradient-to-br from-blue-800/90 to-amber-700/90 text-white shadow-lg`}>
    {children}
  </motion.div>
);

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

export default function Home() {
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
    if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => setQIdx((i) => (i + 1) % quotes.length), 5000);
    return () => { if (intervalRef.current !== null) window.clearInterval(intervalRef.current); };
  }, [quotes.length]);

  return (
    <>
      <section id="hero" className={`${THEME.container} py-32 text-center`}>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-amber-200 drop-shadow-lg">Aprende con valentía. Enseña el futuro.</h1>
        <p className="mt-6 text-xl md:text-2xl text-white max-w-3xl mx-auto">Cursos bilingües con resultados reales — de Inglés A1–C1 a Historia, Filosofía y Política.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/english" className={`px-8 py-5 rounded-3xl ${THEME.btnPrimary} text-lg font-bold inline-flex items-center gap-3 transform transition hover:scale-105`}>
            <BookOpen className="h-6 w-6" /> Ver programas
          </Link>
          <a href="/#precios" className={`px-8 py-5 rounded-3xl border-2 ${THEME.borderAccent} text-white bg-blue-900/40 hover:bg-amber-500 hover:text-white transition inline-flex items-center gap-3`}>
            <ChevronRight className="h-6 w-6" /> Inscribirme
          </a>
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
            { n: "Inglés A1–C1", b: "Habla primero; coaching de acento y evaluaciones CEFR.", to: "/english" },
            { n: "Historia: desde cursos de entrada hasta temas especiales", b: "Crítico, preciso y alineado a estándares.", to: "/history" },
            { n: "Filosofía y Teoría Política", b: "De Aristóteles a Dussel — riguroso pero claro.", to: "/philosophy" },
            { n: "Capacitación Docente", b: "Educación secundaria, integración de IA, gamificación e instrucción diferenciada.", to: "/teaching" }
          ].map((c) => (
            <Card key={c.n}>
              <h3 className="font-bold text-xl text-amber-200">{c.n}</h3>
              <p className="mt-2 text-base text-white/95">{c.b}</p>
              <div className="mt-4">
                <Link to={c.to} className="inline-flex items-center gap-2 text-sm link-underline text-white hover:text-amber-200">
                  Ver más <ChevronRight className="h-4 w-4" />
                </Link>
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
              <li><Link to="/english" className="link-underline text-white">Ver programas</Link></li>
              <li><a href="#precios" className="link-underline text-white">Precios</a></li>
              <li><a href="#opiniones" className="link-underline text-white">Opiniones</a></li>
              <li><a href="#boletin" className="link-underline text-white">Suscribirse al boletín</a></li>
            </ul>
          </Card>
        </div>
      </Section>
    </>
  );
}
