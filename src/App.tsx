import React, { useEffect, useRef, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, GraduationCap, Mail, ChevronRight, Sparkles, CheckCircle2, User, Globe, Lightbulb } from "lucide-react";

// Updated THEME to use centralized colors and new utility classes
const THEME = {
  textPrimary: "text-white",
  textSecondary: "text-brand-light",
  accentText: "text-brand-amber",
  borderAccent: "border-brand-amber/80",
  btnPrimary: "bg-gradient-to-r from-brand-amber to-amber-500 hover:from-amber-500 hover:to-brand-amber text-brand-dark shadow-lg",
  btnGhost: "border-2 border-brand-amber text-brand-amber hover:bg-brand-amber hover:text-brand-dark transition-colors duration-300",
  container: "max-w-7xl mx-auto px-6 lg:px-8 relative z-10",
  paneBg: "bg-brand-dark/80 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-brand-blue/30",
  glow: "drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]",
  animFadeIn: "animate-fade-in",
  animSlideUp: "animate-slide-up",
  animPulseLight: "animate-pulse-light",
  animShine: "shine-effect",
};

const Logo = memo(() => (
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, type: "spring", damping: 10, stiffness: 100 }}
    className="flex items-center gap-2 md:gap-3 select-none cursor-pointer group"
  >
    <div className="relative flex items-center justify-center h-12 w-12 md:h-14 md:w-14 bg-brand-blue rounded-full shadow-lg overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
          delay: 0.5,
        }}
        style={{
          background: "radial-gradient(circle, rgba(251,191,36,0.3) 0%, rgba(30,58,138,0.3) 100%)",
        }}
      />
      <GraduationCap className={`relative h-8 w-8 md:h-10 md:w-10 text-brand-amber z-10 drop-shadow-md`} />
      <Sparkles className={`absolute -top-1 -right-1 h-5 w-5 md:h-6 md:w-6 ${THEME.accentText} ${THEME.glow} animate-pulse z-20`} />
    </div>
    <span className={`font-extrabold tracking-tight text-3xl md:text-4xl ${THEME.accentText} drop-shadow-md`}>
      APRENDE+
    </span>
  </motion.div>
));

const CTAButton = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <motion.a
    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(251,191,36,0.4)" }}
    whileTap={{ scale: 0.95 }}
    href={href}
    className={`px-8 py-5 rounded-full ${THEME.btnPrimary} text-lg font-bold inline-flex items-center gap-3 transform transition-all duration-300 ${THEME.animShine}`}
  >{children}</motion.a>
);

const GhostButton = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <motion.a
    whileHover={{ scale: 1.05, backgroundColor: "rgba(251,191,36,0.1)" }}
    whileTap={{ scale: 0.95 }}
    href={href}
    className={`px-8 py-5 rounded-full border-2 border-brand-amber text-white hover:bg-brand-amber hover:text-brand-dark transition-colors duration-300 inline-flex items-center gap-3`}
  >{children}</motion.a>
);

const testimonials = [
  {
    id: 1,
    quote: "Aprende+ transformó mi inglés. Las clases son dinámicas y el material excelente. ¡Muy recomendable!",
    author: "María G.",
    level: "B2 Inglés",
  },
  {
    id: 2,
    quote: "El curso de Historia me abrió los ojos a nuevas perspectivas. El profesor es un experto y las discusiones muy enriquecedoras.",
    author: "Juan P.",
    level: "Historia Universal",
  },
  {
    id: 3,
    quote: "Necesitaba mejorar mi metodología docente y las capacitaciones de Aprende+ superaron mis expectativas. Profesionales y actualizados.",
    author: "Ana R.",
    level: "Capacitación Docente",
  },
   {
    id: 4,
    quote: "Mi hijo mejoró su promedio en Filosofía gracias a las clases. ¡Atención personalizada y resultados visibles!",
    author: "Carlos S.",
    level: "Filosofía",
  },
];

const services = [
  {
    icon: <BookOpen size={40} />,
    title: "Inglés A1-C1",
    description: "Clases personalizadas para todos los niveles, con énfasis en conversación y gramática."
  },
  {
    icon: <User size={40} />,
    title: "Historia y Filosofía",
    description: "Explora el pensamiento crítico y los eventos que moldearon el mundo."
  },
  {
    icon: <Lightbulb size={40} />,
    title: "Capacitación Docente",
    description: "Desarrolla nuevas habilidades pedagógicas y metodologías innovadoras."
  },
  {
    icon: <Globe size={40} />,
    title: "Clases Bilingües",
    description: "Inmersión total en un ambiente bilingüe para un aprendizaje más rápido."
  },
];

const slideVariants = {
  enter: { opacity: 0, x: 100 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 }
};

const scrollVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function App() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="hero-background absolute inset-0"></div>

      <header className={`py-6 sticky top-0 z-50 bg-brand-dark/80 backdrop-blur-md shadow-md ${THEME.container} flex justify-between items-center`}>
        <Logo />
        <nav className="hidden md:flex gap-8 items-center text-white">
          <a href="#hero" className="link-underline font-medium text-lg hover:text-brand-amber transition-colors duration-200">Inicio</a>
          <a href="#services" className="link-underline font-medium text-lg hover:text-brand-amber transition-colors duration-200">Servicios</a>
          <a href="#testimonials" className="link-underline font-medium text-lg hover:text-brand-amber transition-colors duration-200">Testimonios</a>
          <a href="#contact" className="link-underline font-medium text-lg hover:text-brand-amber transition-colors duration-200">Contacto</a>
          <CTAButton href="/contact">
            Contáctanos <ChevronRight className="h-5 w-5" />
          </CTAButton>
        </nav>
        <button
          className="md:hidden text-white focus:outline-none"
        >
        </button>
      </header>

      <main>
        <section id="hero" className={`${THEME.container} py-24 md:py-32 text-center relative z-20 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]`}>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-extrabold tracking-tight text-brand-amber drop-shadow-lg leading-tight mb-6"
          >
            Aprende con valentía. <br className="hidden sm:inline"/> Enseña el futuro.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-xl md:text-2xl text-white max-w-4xl mx-auto mb-10"
          >
            Cursos bilingües con resultados reales — de Inglés A1–C1 a Historia, Filosofía y Política.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <CTAButton href="#services">
              Explora Cursos <ChevronRight className="h-5 w-5" />
            </CTAButton>
            <GhostButton href="#contact">
              Consulta Gratis <Mail className="h-5 w-5" />
            </GhostButton>
          </motion.div>
        </section>

        <motion.section
          id="services"
          className={`${THEME.container} py-20 relative z-20`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollVariants}
        >
          <h2 className={`text-5xl font-bold text-center mb-16 ${THEME.accentText}`}>Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`${THEME.paneBg} flex flex-col items-center text-center group`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.5 }}
                whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(30,58,138,0.4)" }}
              >
                <div className="p-4 rounded-full bg-brand-blue/20 text-brand-amber mb-6 transition-all duration-300 group-hover:bg-brand-blue group-hover:text-white">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-white">{service.title}</h3>
                <p className="text-brand-light leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="testimonials"
          className={`${THEME.container} py-20 relative z-20`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollVariants}
        >
          <h2 className={`text-5xl font-bold text-center mb-16 ${THEME.accentText}`}>Lo Que Dicen Nuestros Alumnos</h2>
          <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-xl shadow-2xl">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={currentTestimonial}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`${THEME.paneBg} text-center`}
              >
                <p className="text-xl md:text-2xl italic text-white mb-6">"{testimonials[currentTestimonial].quote}"</p>
                <p className="font-semibold text-brand-amber text-lg">- {testimonials[currentTestimonial].author}</p>
                <p className="text-brand-light text-md">{testimonials[currentTestimonial].level}</p>
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                    index === currentTestimonial ? 'bg-brand-amber scale-125' : 'bg-white/40'
                  }`}
                  aria-label={`Testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          className={`${THEME.container} py-20 text-center relative z-20`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={scrollVariants}
        >
          <h2 className={`text-5xl font-bold mb-8 ${THEME.accentText}`}>¿Listo para Empezar?</h2>
          <p className="text-xl text-white max-w-2xl mx-auto mb-12">
            Contáctanos hoy para una consulta gratuita y descubre cómo Aprende+ puede ayudarte a alcanzar tus metas.
          </p>
          <CTAButton href="#">
            ¡Hablemos! <Mail className="h-5 w-5" />
          </CTAButton>
        </motion.section>
      </main>

      <footer className={`py-10 text-center text-brand-light relative z-20 bg-brand-dark/50 mt-16`}>
        <p>&copy; {new Date().getFullYear()} Aprende+. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
