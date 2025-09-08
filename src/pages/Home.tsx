import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, CheckCircle2, MessageSquare, BookOpen, User, Sun, Code, Globe, Sparkles, Pen, Lightbulb, Users } from "lucide-react";

// Define a consistent theme object for easy reuse and maintenance
const THEME = {
  textPrimary: "text-white",
  textSecondary: "text-amber-100",
  accentText: "text-amber-300",
  borderAccent: "border-amber-400/80",
  btnPrimary: "bg-gradient-to-r from-amber-500 via-blue-700 to-blue-900 hover:brightness-110 text-white shadow-lg",
  gradientAccent: "from-blue-900 via-amber-400 to-amber-200",
  container: "max-w-6xl mx-auto px-6",
};

// Animation variant for a subtle reveal effect as elements come into view
const reveal = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Reusable Section component to maintain a consistent layout
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

// Reusable Card component with a subtle reveal effect
const Card = ({ children }: { children: React.ReactNode }) => (
  <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className={`p-8 rounded-3xl border ${THEME.borderAccent} bg-gradient-to-br from-blue-800/90 to-amber-700/90 text-white shadow-lg`}>
    {children}
  </motion.div>
);

// Reusable Pill component
const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${THEME.borderAccent} text-sm font-medium text-white bg-gradient-to-r from-blue-800/80 to-amber-600/80 shadow-md`}>
    <CheckCircle2 className={`h-4 w-4 ${THEME.accentText}`} /> {children}
  </span>
);

export default function Home() {
  return (
    <>
      <section id="hero" className="relative flex flex-col items-center justify-center min-h-screen text-center text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000" 
          style={{ backgroundImage: `url('/background-image.jpg')`, opacity: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/70 to-amber-900/40" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`text-5xl md:text-7xl font-extrabold tracking-tight ${THEME.accentText}`}
          >
            Aprende con valentía. Enseña el futuro.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-xl md:text-2xl text-white max-w-3xl mx-auto"
          >
            Cursos bilingües con resultados reales para un futuro bilingüe y crítico. Clases en línea con profesionales, a tu ritmo y con precios accesibles.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <a href="#contacto" className={`px-8 py-5 rounded-3xl ${THEME.btnPrimary} text-lg font-bold inline-flex items-center gap-3 transform transition hover:scale-105`}>
              <ChevronRight className="h-6 w-6" /> Inscríbete
            </a>
            <Link to="/test" className={`px-8 py-5 rounded-3xl border-2 ${THEME.borderAccent} text-white bg-blue-900/40 hover:bg-amber-500 hover:text-white transition inline-flex items-center gap-3`}>
              <BookOpen className="h-6 w-6" /> Examen de Nivel
            </Link>
          </motion.div>
        </div>
      </section>

      <Section id="programas" title="Nuestros Programas">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <BookOpen className="h-10 w-10 mb-4 text-amber-300" />
            <h3 className="font-bold text-xl text-amber-200">Inglés A1-C1</h3>
            <p className="mt-2 text-white/95">
              Cursos de inglés basados en el CEFR con énfasis en fluidez verbal y acento.
            </p>
            <div className="mt-4">
              <Link to="/english" className="link-underline font-medium text-amber-200 hover:text-white">Ver más &rarr;</Link>
            </div>
          </Card>
          <Card>
            <Globe className="h-10 w-10 mb-4 text-amber-300" />
            <h3 className="font-bold text-xl text-amber-200">Historia</h3>
            <p className="mt-2 text-white/95">
              Desde cursos introductorios hasta temas especializados como Historia de América Latina.
            </p>
            <div className="mt-4">
              <Link to="/history" className="link-underline font-medium text-amber-200 hover:text-white">Ver más &rarr;</Link>
            </div>
          </Card>
          <Card>
            <Sparkles className="h-10 w-10 mb-4 text-amber-300" />
            <h3 className="font-bold text-xl text-amber-200">Filosofía</h3>
            <p className="mt-2 text-white/95">
              Aprende a analizar ideas complejas y a construir argumentos sólidos.
            </p>
            <div className="mt-4">
              <Link to="/philosophy" className="link-underline font-medium text-amber-200 hover:text-white">Ver más &rarr;</Link>
            </div>
          </Card>
          <Card>
            <Users className="h-10 w-10 mb-4 text-amber-300" />
            <h3 className="font-bold text-xl text-amber-200">Docencia</h3>
            <p className="mt-2 text-white/95">
              Capacitación para docentes de secundaria. Perfecciona tu pedagogía.
            </p>
            <div className="mt-4">
              <Link to="/teaching" className="link-underline font-medium text-amber-200 hover:text-white">Ver más &rarr;</Link>
            </div>
          </Card>
        </div>
      </Section>

      <Section id="valores" title="Nuestros Valores" subtitle="Nos enfocamos en la educación de calidad, el pensamiento crítico y la ética en la enseñanza.">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <h4 className="font-bold text-xl text-amber-200">Flexibilidad</h4>
            <p className="mt-2 text-white/95">Clases en línea, a tu ritmo y horario. Adaptamos nuestro currículo a tus necesidades.</p>
          </Card>
          <Card>
            <h4 className="font-bold text-xl text-amber-200">Excelencia</h4>
            <p className="mt-2 text-white/95">Clases personalizadas con profesionales titulados. Nuestros docentes son expertos en sus campos.</p>
          </Card>
          <Card>
            <h4 className="font-bold text-xl text-amber-200">Innovación</h4>
            <p className="mt-2 text-white/95">Integración de herramientas de IA en nuestros cursos para optimizar tu aprendizaje.</p>
          </Card>
        </div>
      </Section>

      <Section id="contacto" title="Contáctanos" subtitle="¿Listo para empezar? Envíanos un mensaje y te responderemos en breve.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <form className="p-8 rounded-3xl border-2 border-amber-400/80 bg-blue-900/40 shadow-lg space-y-4">
              <div>
                <label htmlFor="name" className="block text-white/80 text-sm font-bold mb-2">Nombre</label>
                <input type="text" id="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-blue-950 border-amber-400/80" placeholder="Tu nombre" />
              </div>
              <div>
                <label htmlFor="email" className="block text-white/80 text-sm font-bold mb-2">Email</label>
                <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-blue-950 border-amber-400/80" placeholder="tu.email@ejemplo.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-white/80 text-sm font-bold mb-2">Mensaje</label>
                <textarea id="message" className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-blue-950 border-amber-400/80 h-32" placeholder="Tu mensaje"></textarea>
              </div>
              <button type="submit" className={`w-full ${THEME.btnPrimary} font-bold py-3 px-4 rounded-3xl transition duration-300 transform hover:scale-105`}>Enviar</button>
            </form>
          </div>

          <div className="flex flex-col justify-center text-center md:text-left">
            <h3 className="text-3xl font-bold text-white mb-4">¡Contáctanos!</h3>
            <p className="text-white/90 text-lg mb-4">
              Para más información sobre nuestros cursos, precios o cualquier otra consulta, no dudes en escribirnos.
            </p>
            <p className="text-amber-200 font-bold text-lg">
              Correo: info@aprendeplus.com
            </p>
            <p className="text-amber-200 font-bold text-lg">
              Teléfono: +52 55 1234 5678
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
