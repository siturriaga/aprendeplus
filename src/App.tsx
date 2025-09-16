// src/App.tsx
import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, GraduationCap, Mail, ChevronRight, CheckCircle2, Menu, X, DollarSign, Calendar, Clock } from "lucide-react";

// Import data and components from new locations
import { THEME, TESTIMONIALS, PROGRAMS, Program } from './data/content';
import EnglishTest from './components/EnglishTest';

// Main App component that orchestrates all other components
export default function App() {
  const [page, setPage] = useState('home');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showA11yPanel, setShowA11yPanel] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  
  // Corrected state for accessibility options
  const [a11y, setA11y] = useState({
    contrast: false,
    dyslexia: false,
    largeText: false,
    reduceMotion: false
  });

  const aboutRef = useRef<HTMLDivElement>(null);
  const programsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const testRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const navLinks = useMemo(() => [
    { name: "Programas", ref: programsRef },
    { name: "Sobre Nosotros", ref: aboutRef },
    { name: "Testimonios", ref: testimonialsRef },
    { name: "Test de Nivel", ref: testRef },
    { name: "Contacto", ref: contactRef },
  ], []);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const openProgramModal = (program: Program) => {
    setSelectedProgram(program);
  };

  const closeProgramModal = () => {
    setSelectedProgram(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleA11yChange = (key: keyof typeof a11y) => {
    setA11y(prevA11y => ({
      ...prevA11y,
      [key]: !prevA11y[key],
    }));
  };

  const a11yClass = useMemo(() => {
    const keys = Object.keys(a11y) as Array<keyof typeof a11y>;
    return keys.filter(key => a11y[key]).map(key => `a11y-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`).join(' ');
  }, [a11y]);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form data submitted:", formData);
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 5000);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const PAGES = {
    home: (
      <>
        {/* Header and Navigation */}
        <header className="py-6 sm:py-8 bg-white/80 backdrop-blur fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
          <div className={`${THEME.container} flex items-center justify-between`}>
            <a href="#hero" className="flex items-center gap-3 text-gray-900">
              <GraduationCap className={`h-8 w-8 ${THEME.accent}`} />
              <span className="font-bold text-lg sm:text-xl">Aprende+</span>
            </a>
            <nav className="hidden md:flex items-center gap-8 text-gray-600 text-base font-medium">
              {navLinks.map((link) => (
                <button key={link.name} onClick={() => scrollTo(link.ref)} className="nav-link">{link.name}</button>
              ))}
            </nav>
            <div className="flex items-center gap-4 md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-full text-gray-900 bg-gray-200 hover:bg-gray-300 transition-colors">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed top-20 left-0 right-0 bg-white/95 backdrop-blur shadow-lg z-40 p-6 rounded-b-xl"
            >
              <nav className="flex flex-col gap-6 text-gray-800 text-lg font-semibold text-center">
                {navLinks.map((link) => (
                  <button key={link.name} onClick={() => scrollTo(link.ref)} className="link-underline">{link.name}</button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
    
        <main>
          {/* Hero Section */}
          <div className="min-h-screen bg-main relative overflow-hidden flex items-center justify-center text-center pt-24" id="hero">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/F3F4F6/1A2744?text=Academic+Background')] opacity-10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-100 via-transparent to-gray-100"></div>
            </div>
            <div className={`${THEME.container} relative z-10 py-24 sm:py-32 lg:py-40 text-center`}>
              <motion.h1
                className={`${THEME.heading} font-extrabold text-balance drop-shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Educación de <span className={`${THEME.accent} font-bold`}>Excelencia</span>, a tu Alcance
              </motion.h1>
              <motion.p
                className="mt-6 text-lg leading-8 text-gray-700 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Cursos de Historia, Filosofía y Capacitación Docente. Clases de Inglés adaptadas a tus necesidades.
              </motion.p>
              <motion.div
                className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <button onClick={() => scrollTo(programsRef)} className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-amber-300 transition-colors">
                  Ver Programas
                </button>
                <button onClick={() => scrollTo(contactRef)} className="text-sm font-semibold leading-6 text-gray-700 flex items-center gap-2 group hover:text-gray-900 transition-colors">
                  Contáctanos <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            </div>
          </div>
    
          {/* About Section */}
          <section className="py-16 sm:py-24 bg-main" ref={aboutRef}>
            <div className={`${THEME.container} text-center`}>
              <h2 className={`${THEME.heading} mb-12`}>Sobre Nosotros</h2>
              <div className="max-w-3xl mx-auto pane p-8 rounded-3xl">
                <p className="text-gray-700 text-lg text-center">
                  Somos educadores basados en EE. UU., con grados de Licenciatura, Maestría y Doctorado. Más de 20 años de experiencia y especialización en nuestras áreas. Nuestra filosofía se basa en la inclusión, el pensamiento crítico y el aprendizaje activo.
                </p>
              </div>
            </div>
          </section>

          {/* Programs Section */}
          <section className="py-16 sm:py-24 bg-main" ref={programsRef}>
            <div className={`${THEME.container} text-center`}>
              <h2 className={`${THEME.heading} mb-4`}>Nuestros Programas</h2>
              <p className="text-gray-700 max-w-2xl mx-auto mb-12 text-lg">
                Haz clic en cada programa para ver los detalles.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PROGRAMS.map((program, index) => (
                  <motion.div
                    key={program.id}
                    className="pane p-8 rounded-3xl text-center flex flex-col items-center pricing-card-highlight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => openProgramModal(program)}
                  >
                    <div className="flex justify-center mb-4 p-3 rounded-full bg-amber-400/20">
                      {program.icon}
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">{program.title}</h3>
                    <p className="text-gray-700">{program.description}</p>
                    <button className="mt-6 px-4 py-2 rounded-full border-2 border-amber-400 text-amber-600 hover:bg-amber-400 hover:text-white transition-colors text-sm font-semibold">
                      Ver Detalles
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-16 sm:py-24 bg-main" ref={testimonialsRef}>
            <div className={`${THEME.container} text-center`}>
              <h2 className={`${THEME.heading} mb-12`}>Lo que dicen nuestros estudiantes</h2>
              <div className="relative h-40 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center p-4"
                  >
                    <div className="max-w-2xl text-center text-gray-900">
                      <p className="italic text-lg">"{TESTIMONIALS[currentTestimonial].text}"</p>
                      <p className="mt-4 font-semibold text-amber-600">- {TESTIMONIALS[currentTestimonial].author}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </section>
    
          {/* Test de Nivel Section */}
          <section className="py-16 sm:py-24 bg-main" ref={testRef}>
            <div className={`${THEME.container} text-center`}>
              <h2 className={`${THEME.heading} mb-12`}>Test de Nivel</h2>
              <p className="text-gray-700 max-w-xl mx-auto text-lg mb-6">
                Descubre tu nivel de inglés con nuestro test adaptativo. Rápido, preciso y completamente gratuito.
              </p>
              <button
                onClick={() => setPage('test')}
                className="rounded-full bg-amber-400 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-amber-300 transition-colors"
              >
                ¡Hacer el Test Ahora!
              </button>
            </div>
          </section>
    
          {/* Contact Section */}
          <section className="py-16 sm:py-24 bg-main" ref={contactRef}>
            <div className={`${THEME.container}`}>
              <div className="text-center mb-12">
                <h2 className={`${THEME.heading}`}>Contáctanos</h2>
              </div>
              <div className="max-w-xl mx-auto pane p-8 rounded-3xl text-center">
                <Mail className={`h-12 w-12 ${THEME.accent} mx-auto mb-4`} />
                <p className="text-gray-700 text-lg">
                  ¿Listo para empezar tu camino de aprendizaje? Llena el formulario y te responderemos pronto.
                </p>
                
                <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Nombre"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Correo electrónico"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      placeholder="Tu mensaje"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    ></textarea>
                  </div>
                  <div className="flex justify-center">
                    <motion.button
                      type="submit"
                      className="rounded-full bg-amber-400 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-amber-300 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Enviar
                    </motion.button>
                  </div>
                </form>
                <AnimatePresence>
                  {messageSent && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="mt-6 flex items-center justify-center gap-2 text-green-600 font-semibold"
                    >
                      <CheckCircle2 className="h-5 w-5" />
                      <span>¡Mensaje enviado! Te responderemos pronto.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>
        </main>
        <footer className="py-12 border-t border-gray-200 bg-white/80 backdrop-blur">
          <div className={`${THEME.container} text-center text-gray-700`}>
            <div className="flex items-center justify-center gap-3">
              <GraduationCap className={`h-8 w-8 ${THEME.accent}`} />
              <div className="font-bold text-lg">Aprende+</div>
            </div>
            <p className="mt-4 text-gray-500 text-sm">© 2024 Aprende+. Todos los derechos reservados.</p>
          </div>
        </footer>
        <div className="fixed bottom-4 right-4 z-50">
          <button onClick={() => setShowA11yPanel(s => !s)} className="p-3 rounded-full text-white bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg">
            <BookOpen className="h-6 w-6" />
          </button>
        </div>
        <AnimatePresence>
          {showA11yPanel && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-4 right-4 md:right-20 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl z-50 text-gray-900 border border-gray-200"
            >
              <h4 className="font-bold mb-2 text-lg font-serif">Accesibilidad</h4>
              <div className="mt-3 space-y-2 text-sm">
                <label className="flex items-center gap-2"><input type="checkbox" checked={a11y.contrast} onChange={() => handleA11yChange('contrast')} /> Alto contraste</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={a11y.dyslexia} onChange={() => handleA11yChange('dyslexia')} /> Fuente amigable</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={a11y.largeText} onChange={() => handleA11yChange('largeText')} /> Texto grande</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={a11y.reduceMotion} onChange={() => handleA11yChange('reduceMotion')} /> Reducir animaciones</label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    ),
    test: <EnglishTest onBack={() => setPage('home')} />,
  };

  return (
    <div className={`font-sans ${a11yClass}`}>
      {PAGES[page]}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-lg w-full text-center shadow-2xl relative"
            >
              <button onClick={closeProgramModal} className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors">
                <X className="h-6 w-6" />
              </button>
              <div className="flex justify-center mb-4 p-3 rounded-full bg-amber-400/20 mx-auto w-fit">
                {selectedProgram.icon}
              </div>
              <h3 className="font-serif text-3xl font-bold text-gray-900 mb-2">{selectedProgram.title}</h3>
              <p className="text-gray-700">{selectedProgram.fullDescription}</p>
              <div className="mt-6 space-y-4 text-left text-gray-800">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-6 w-6 text-amber-600" />
                  <span className="font-semibold text-lg">{selectedProgram.price}</span>
                </div>
                {selectedProgram.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    {feature.icon}
                    <p className="text-base">{feature.text}</p>
                  </div>
                ))}
              </div>
              <a href="#contact" onClick={closeProgramModal} className="mt-8 inline-block rounded-full bg-amber-400 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-amber-300 transition-colors">
                ¡Contáctanos para empezar!
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
