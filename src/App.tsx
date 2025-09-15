import React, { useEffect, useRef, useState, memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, GraduationCap, Mail, ChevronRight, CheckCircle2, Menu, X, DollarSign, Calendar, Clock } from "lucide-react";

// The single-file mandate requires all CSS to be in the component file.
const GlobalStyles = memo(() => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Poppins:wght@400;600;700;800&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Open+Dyslexic:wght@400;700&display=swap');
    
    :root { 
      --bg-light: #F8F9FA;
      --bg-medium: #E9ECEF;
      --text-dark: #212529;
      --accent-gold: #FFC300;
      --accent-dark: #1A2744;
      --text-muted: #6C757D;
    }
    html { scroll-behavior: smooth; }
    body { font-family: 'Poppins', sans-serif; background-color: var(--bg-light); color: var(--text-dark); }
    h1, h2, h3, h4 { font-family: 'Cormorant Garamond', serif; font-weight: 700; }
    .bg-main { 
      background: linear-gradient(135deg, var(--bg-light) 0%, var(--bg-medium) 100%); 
    }
    .pane { 
      background: rgba(0, 0, 0, 0.05); 
      backdrop-filter: blur(5px); 
      -webkit-backdrop-filter: blur(5px); 
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05); 
    }
    .divider { height: 3px; background-color: var(--accent-gold); border-radius: 9999px; }
    .nav-link { 
      position: relative; 
      transition: color 0.3s ease;
      font-family: 'Cormorant Garamond', serif;
      font-weight: 600;
    }
    .nav-link::after { 
      content: ""; 
      position: absolute; 
      left: 0; 
      bottom: -2px; 
      height: 2px; 
      width: 0; 
      background-color: var(--accent-gold);
      transition: width .3s ease; 
    }
    .nav-link:hover::after, .nav-active::after { width: 100%; }
    
    .a11y-contrast { filter: contrast(1.4) brightness(1.1); }
    .a11y-dyslexia { font-family: 'Open Dyslexic', sans-serif; }
    .a11y-large-text { font-size: 1.25em; }
    .a11y-reduce-motion * { transition: none !important; animation: none !important; }
    
    .pricing-card-highlight {
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(0, 0, 0, 0.15);
      cursor: pointer;
    }
    .pricing-card-highlight::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(45deg, rgba(255, 195, 0, 0.1), rgba(255, 195, 0, 0.05));
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .pricing-card-highlight:hover::before {
      opacity: 1;
    }
  `}</style>
));

const THEME = {
  container: "container mx-auto px-6 max-w-7xl",
  accent: "text-amber-600",
  heading: "font-serif text-gray-900 text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight",
};

// Testimonials Data
const TESTIMONIALS = [
  { text: "Las clases de historia son fascinantes y el material es excelente. ¡Totalmente recomendado!", author: "Ana M." },
  { text: "Mi inglés ha mejorado muchísimo en solo 3 meses. La metodología es muy efectiva.", author: "Carlos S." },
  { text: "La capacitación docente me dio herramientas prácticas que uso a diario. Una inversión increíble.", author: "Sofía P." },
  { text: "El test de nivel fue muy preciso. Me ayudó a entender exactamente dónde estoy.", author: "Luis G." },
  { text: "La atención personalizada marca la diferencia. Se nota el profesionalismo.", author: "Elena R." },
  { text: "Clases de inglés dinámicas y divertidas. Por fin me siento confiado al hablar.", author: "Juan D." },
  { text: "El enfoque filosófico me abrió la mente. Las discusiones son muy profundas.", author: "Marta F." },
  { text: "Pasé mi examen de certificación gracias a las clases. ¡Gracias, Aprende+!", author: "Pedro L." },
  { text: "Los profesores son muy pacientes y siempre dispuestos a ayudar. Un gran ambiente de aprendizaje.", author: "Gabriela V." },
  { text: "El material digital es de alta calidad y muy fácil de seguir. Es un complemento perfecto.", author: "Diego A." },
];

const PROGRAMS = [
  {
    id: "ingles",
    title: "Inglés A1–C1",
    icon: <BookOpen className="h-10 w-10 text-white" />,
    description: "Conversación y gramática. Incluye prueba de nivel.",
    fullDescription: "Nuestro programa de inglés se enfoca en la fluidez conversacional y una sólida base gramatical. Las clases son dinámicas y personalizadas, adaptadas a tu nivel y objetivos. Ofrecemos seguimiento constante y materiales digitales interactivos.",
    includes: [
      "Clases de 60 minutos",
      "Mínimo 2 clases por semana",
      "Materiales digitales",
      "Prueba de nivel",
    ],
    price: "CLP $250.000 / mes",
    features: [
      { icon: <Clock className="h-5 w-5" />, text: "Clases de 60 minutos" },
      { icon: <Calendar className="h-5 w-5" />, text: "Mínimo 2 clases/semana" },
      { icon: <CheckCircle2 className="h-5 w-5" />, text: "Prueba de nivel incluida" },
      { icon: <CheckCircle2 className="h-5 w-5" />, text: "Materiales digitales" },
    ],
  },
  {
    id: "historia-filosofia",
    title: "Historia y Filosofía",
    icon: <GraduationCap className="h-10 w-10 text-white" />,
    description: "Historia latinoamericana/europea e intelectual; filosofía clásica y moderna.",
    fullDescription: "Sumérgete en el pensamiento crítico a través de la historia y la filosofía. Analizamos eventos y corrientes de pensamiento desde una perspectiva académica, fomentando el debate y la reflexión. Este curso es ideal para quienes buscan una comprensión más profunda del mundo.",
    includes: [
      "Clases de 60 minutos",
      "Mínimo 2 clases por semana",
      "Materiales digitales",
      "Enfoque en pensamiento crítico",
    ],
    price: "CLP $250.000 / mes",
    features: [
      { icon: <Clock className="h-5 w-5" />, text: "Clases de 60 minutos" },
      { icon: <Calendar className="h-5 w-5" />, text: "Mínimo 2 clases/semana" },
      { icon: <CheckCircle2 className="h-5 w-5" />, text: "Enfoque en pensamiento crítico" },
      { icon: <CheckCircle2 className="h-5 w-5" />, text: "Materiales digitales" },
    ],
  },
  {
    id: "capacitacion-docente",
    title: "Capacitación Docente",
    icon: <GraduationCap className="h-10 w-10 text-white" />,
    description: "Instrucción diferenciada, DUA, manejo de aula, gamificación y uso de IA, además de análisis de datos.",
    fullDescription: "Este programa está diseñado para educadores que buscan innovar en sus aulas. Cubrimos metodologías avanzadas, como el Diseño Universal para el Aprendizaje (DUA), y el uso de herramientas de inteligencia artificial para personalizar la enseñanza. Aprende a analizar datos para mejorar tus estrategias pedagógicas.",
    includes: [
      "Clases de 60 minutos",
      "Mínimo 2 clases por semana",
      "Materiales digitales",
      "Uso de IA en la educación",
    ],
    price: "CLP $250.000 / mes",
    features: [
      { icon: <Clock className="h-5 w-5" />, text: "Clases de 60 minutos" },
      { icon: <Calendar className="h-5 w-5" />, text: "Mínimo 2 clases/semana" },
      { icon: <CheckCircle2 className="h-5 w-5" />, text: "Uso de IA en la educación" },
      { icon: <CheckCircle2 className="h-5 w-5" />, text: "Análisis de datos educativos" },
    ],
  },
];

type Q = { q: string; a: string[]; correct: number };
type Program = typeof PROGRAMS[0];

// English Test Component
const EnglishTest = ({ onBack }: { onBack: () => void }) => {
  const POOLS: Q[][] = useMemo(() => [
    [
      { q: "Seleccione el artículo correcto: ___ apple.", a: ["a", "an", "the"], correct: 1 },
      { q: "El plural de “book” es…", a: ["books", "bookes", "book"], correct: 0 },
      { q: "“I ___ a student.”", a: ["am", "is", "are"], correct: 0 }
    ],
    [
      { q: "El pasado de “go” es…", a: ["goed", "goes", "went"], correct: 2 },
      { q: "Seleccione el comparativo correcto: “fast” →", a: ["more fast", "faster", "fastest"], correct: 1 },
      { q: "Seleccione la opción correcta: “She has lived here ___ 2019.”", a: ["since", "for", "from"], correct: 0 }
    ],
    [
      { q: "El condicional: “If I ___ more time, I would travel.”", a: ["have", "had", "would have"], correct: 1 },
      { q: "Seleccione el “phrasal verb” correcto: “to look ___ information”", a: ["after", "up", "out"], correct: 1 },
      { q: "“Hardly ___ he arrived when it started to rain.”", a: ["had", "has", "did"], correct: 0 }
    ]
  ], []);

  const [level, setLevel] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const current = useMemo(() => {
    return POOLS[level]?.[questionIndex];
  }, [level, questionIndex, POOLS]);

  const answer = (i: number) => {
    let newCorrect = correct;
    let newIncorrect = incorrect;

    if (current && i === current.correct) {
      newCorrect = newCorrect + 1;
      setCorrect(newCorrect);
    } else {
      newIncorrect = newIncorrect + 1;
      setIncorrect(newIncorrect);
    }

    if (newCorrect > newIncorrect && level < POOLS.length - 1) {
      setLevel(l => l + 1);
      setQuestionIndex(0);
    } else if (newIncorrect >= newCorrect && level > 0) {
      setLevel(l => l - 1);
      setQuestionIndex(0);
    } else {
      if (questionIndex < POOLS[level].length - 1) {
        setQuestionIndex(q => q + 1);
      } else {
        setShowResult(true);
      }
    }
  };

  if (showResult) {
    const score = Math.round((correct / (correct + incorrect)) * 100) || 0;
    let levelText = "";
    if (score >= 80) levelText = "Avanzado";
    else if (score >= 60) levelText = "Intermedio";
    else if (score >= 40) levelText = "Básico";
    else levelText = "Principiante";

    return (
      <div className="min-h-screen bg-white text-gray-900 p-6">
        <div className="max-w-xl mx-auto p-8 rounded-3xl border border-amber-400/80 bg-white shadow-lg text-center">
          <CheckCircle2 className="h-16 w-16 mx-auto text-amber-600 mb-4" />
          <h1 className="text-3xl font-extrabold text-amber-800">Test completado</h1>
          <p className="mt-2 text-gray-700">Has respondido a {correct + incorrect} preguntas.</p>
          <div className="mt-6 text-xl font-bold">
            <p className="text-gray-900">Puntuación: {score}%</p>
            <p className="text-amber-600">Nivel estimado: {levelText}</p>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <button onClick={onBack} className="px-6 py-3 rounded-2xl border-2 border-amber-400 text-amber-600 hover:bg-amber-400 hover:text-white transition-colors">Volver al inicio</button>
            <a href="#contact" className="px-6 py-3 rounded-2xl bg-amber-400 text-white font-bold hover:brightness-110">Quiero clases</a>
          </div>
        </div>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="min-h-screen bg-white text-gray-900 p-6 flex items-center justify-center">
        <p className="text-lg">Cargando preguntas...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      <div className="max-w-xl mx-auto p-8 rounded-3xl border border-amber-400/80 bg-white shadow-lg">
        <h1 className="font-serif text-3xl font-extrabold text-amber-800">Test de nivel de inglés</h1>
        <p className="mt-2 text-gray-700">Dificultad adaptativa: si respondes bien, sube de nivel; si fallas, puede bajar para afinar el estimado.</p>
        <div className="mt-6">
          <p className="text-lg">{current.q}</p>
          <div className="mt-4 grid gap-3">
            {current.a.map((opt, i) => (
              <button key={i} onClick={() => answer(i)} className="px-4 py-3 rounded-xl border border-amber-400/80 text-gray-900 hover:bg-amber-400 hover:text-white transition-colors">
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

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
