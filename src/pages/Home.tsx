import React, { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Mail, ChevronRight, Sparkles, CheckCircle2 } from "lucide-react";

// Reusable components (Pill, Card, Section) and THEME are now imported from App.tsx
// to maintain consistency and avoid duplication.
// For the purpose of this response, I'm showing the full component.
// In a real project, these would be in their own files and imported.
const THEME = {
  textPrimary: "text-white",
  textSecondary: "text-gray-300",
  accentText: "text-amber-400",
  accentTextSecondary: "text-cyan-400",
  borderAccent: "border-amber-400/80",
  btnPrimary: "bg-gradient-to-r from-amber-500 via-blue-700 to-blue-900 hover:brightness-110 text-white shadow-lg",
  gradientAccent: "from-blue-900 via-amber-400 to-amber-200",
  container: "max-w-6xl mx-auto px-6",
};

const Card = memo(({ children }: { children: React.ReactNode }) => (
  <div className={`pane p-8 rounded-3xl ${THEME.borderAccent} border shadow-lg`}>
    {children}
  </div>
));

const Section = memo(({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: React.ReactNode }) => {
  const reveal = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id={id} className="py-24">
      <div className={THEME.container}>
        <motion.header variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center">
          <h2 className={`text-5xl font-extrabold ${THEME.accentText} leading-tight`}>{title}</h2>
          {subtitle && <p className={`mt-4 text-xl ${THEME.textSecondary}`}>{subtitle}</p>}
        </motion.header>
        <div className="mt-12">
          {children}
        </div>
      </div>
    </section>
  );
});

const Pill = memo(({ children }: { children: React.ReactNode }) => (
  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${THEME.borderAccent} text-sm font-medium ${THEME.textPrimary} bg-gradient-to-r from-blue-900/80 to-amber-400/80 shadow-md`}>
    <CheckCircle2 className={`h-4 w-4 ${THEME.accentTextSecondary}`} /> {children}
  </span>
));

export default function HomePage() {
  const heroImage = "hero-image.jpg";
  const image_1 = "image_1e0833.png";
  const image_2 = "image_1e0870.png";
  const image_3 = "image_1e08af.png";
  const image_4 = "image_1e0b77.png";

  return (
    <div className="bg-slate-950">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-static" style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className={`${THEME.container} relative z-10 text-center text-white py-24`}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-7xl font-extrabold leading-tight drop-shadow-lg">
              <span className={THEME.accentText}>Aprende+</span> <br />
              Clases Personalizadas
            </h1>
            <p className="mt-4 text-2xl font-light max-w-2xl mx-auto drop-shadow-md">
              Desbloquea tu potencial con clases de inglés, historia, filosofía y capacitación docente.
            </p>
            <div className="mt-8 flex justify-center items-center gap-4">
              <Link to="/english" className={`px-8 py-4 rounded-full text-lg font-bold transition-transform transform hover:scale-105 ${THEME.btnPrimary}`}>
                Ver Programas <ChevronRight className="inline h-5 w-5" />
              </Link>
              <a href="#contacto" className="text-lg font-bold link-underline text-white">
                Contáctanos
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <Section id="beneficios" title="Nuestra Propuesta de Valor" subtitle="Clases en línea, flexibles y a tu ritmo.">
        <div className="grid md:grid-cols-3 gap-8 text-center mt-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <GraduationCap className={`mx-auto h-16 w-16 ${THEME.accentText}`} />
              <h3 className="mt-4 font-bold text-2xl text-amber-200">Educación de Calidad</h3>
              <p className="mt-2 text-white/95">
                Profesores apasionados y con experiencia en cada campo.
              </p>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card>
              <BookOpen className={`mx-auto h-16 w-16 ${THEME.accentText}`} />
              <h3 className="mt-4 font-bold text-2xl text-amber-200">Material Digital</h3>
              <p className="mt-2 text-white/95">
                Accede a recursos, libros y guías desde cualquier dispositivo.
              </p>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Card>
              <Mail className={`mx-auto h-16 w-16 ${THEME.accentText}`} />
              <h3 className="mt-4 font-bold text-2xl text-amber-200">Soporte Continuo</h3>
              <p className="mt-2 text-white/95">
                Resolvemos tus dudas y te acompañamos en todo el proceso.
              </p>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* Subject Section */}
      <Section id="programas" title="Nuestros Programas" subtitle="Descubre el curso perfecto para ti.">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center mt-12">
          <Link to="/english">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card>
                <img src={image_1} alt="English class illustration" className="mx-auto w-full h-auto rounded-xl" />
                <h3 className="mt-4 font-bold text-xl text-amber-200">Inglés</h3>
                <p className="mt-2 text-white/95">
                  Desde principiante a avanzado. Prepara tu futuro profesional.
                </p>
              </Card>
            </motion.div>
          </Link>

          <Link to="/history">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card>
                <img src={image_2} alt="History class illustration" className="mx-auto w-full h-auto rounded-xl" />
                <h3 className="mt-4 font-bold text-xl text-amber-200">Historia</h3>
                <p className="mt-2 text-white/95">
                  Análisis crítico, investigación académica y preparación para exámenes.
                </p>
              </Card>
            </motion.div>
          </Link>

          <Link to="/philosophy">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Card>
                <img src={image_3} alt="Philosophy class illustration" className="mx-auto w-full h-auto rounded-xl" />
                <h3 className="mt-4 font-bold text-xl text-amber-200">Filosofía</h3>
                <p className="mt-2 text-white/95">
                  Entrena tu pensamiento crítico, debate y lógica.
                </p>
              </Card>
            </motion.div>
          </Link>

          <Link to="/teaching">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Card>
                <img src={image_4} alt="Teaching class illustration" className="mx-auto w-full h-auto rounded-xl" />
                <h3 className="mt-4 font-bold text-xl text-amber-200">Capacitación Docente</h3>
                <p className="mt-2 text-white/95">
                  Domina nuevas tecnologías y metodologías para el aula.
                </p>
              </Card>
            </motion.div>
          </Link>
        </div>
      </Section>
    </div>
  );
}
