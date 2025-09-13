import React, { useEffect, useRef, useState, memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, GraduationCap, Mail, ChevronRight, CheckCircle2, Menu, X } from "lucide-react";

// The single-file mandate requires all CSS to be in the component file.
const GlobalStyles = memo(() => (
  <style>{`
    :root { --brand-purple: 99, 70, 193; --brand-pink: 236, 72, 153; }
    html { scroll-behavior: smooth; }
    .bg-static { background: linear-gradient(135deg, rgba(var(--brand-purple),0.8), rgba(var(--brand-pink),0.8)); min-height: 100vh; }
    .pane { background: linear-gradient(135deg, rgba(var(--brand-purple),0.20), rgba(var(--brand-pink),0.20)); backdrop-filter: blur(8px); }
    .divider { height: 3px; background: linear-gradient(90deg, rgb(var(--brand-pink)), rgb(var(--brand-purple))); border-radius: 9999px; }
    .link-underline { position: relative; }
    .link-underline::after { content: ""; position: absolute; left: 0; bottom: -2px; height: 3px; width: 0; background: linear-gradient(90deg, rgb(var(--brand-pink)), rgb(var(--brand-purple))); transition: width .3s ease; border-radius: 9999px; }
    .link-underline:hover::after { width: 100%; }
    .nav-active { color: #f9a8d4; }
    .a11y-contrast { filter: contrast(1.4) brightness(1.1); }
    .a11y-dyslexia { font-family: OpenDyslexic, sans-serif; }
    .a11y-large-text { font-size: 1.25em; }
    .a11y-reduce-motion * { transition: none !important; animation: none !important; }
  `}</style>
));

const THEME = {
  container: "container mx-auto px-6",
  accent: "text-pink-400",
  accentText: "text-pink-400",
  heading: "font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl tracking-tight text-balance",
};

type Q = { q: string; a: string[]; correct: number };

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
  { text: "A pesar de la distancia, las clases online se sienten muy cercanas y efectivas.", author: "Laura C." },
  { text: "El curso de historia fue genial. No es solo memorizar, es entender los procesos.", author: "Ricardo B." },
  { text: "Las clases son muy flexibles, lo que se adapta perfectamente a mi horario de trabajo.", author: "Valeria N." },
  { text: "No solo aprendí inglés, sino que también gané confianza. El mejor curso que he tomado.", author: "Javier M." },
  { text: "La capacitación para docentes me ayudó a innovar mis propias clases.", author: "Lucía P." },
];

// English Test Component
const EnglishTest = ({ onBack }) => {
  const POOLS: Q[][] = [
    [
      { q: "Seleccione el artículo correcto: ___ apple", a: ["a", "an", "the"], correct: 1 },
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
  ];

  const [level, setLevel] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const current = useMemo(() => {
    return POOLS[level]?.[questionIndex];
  }, [level, questionIndex]);

  const totalQuestions = useMemo(() => {
    return POOLS.reduce((acc, pool) => acc + pool.length, 0);
  }, [POOLS]);

  const answer = (i) => {
    if (i === current.correct) {
      setCorrect(c => c + 1);
      // Advance level on 2 correct answers in a row
      if (correct + 1 > incorrect + 1 && level < POOLS.length - 1) {
        setLevel(l => l + 1);
      }
    } else {
      setIncorrect(c => c + 1);
      // Decrease level on 2 incorrect answers in a row
      if (incorrect + 1 > correct + 1 && level > 0) {
        setLevel(l => l - 1);
      }
    }

    if (questionIndex < POOLS[level].length - 1) {
      setQuestionIndex(q => q + 1);
    } else {
      setShowResult(true);
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
      <div className="min-h-screen bg-slate-950 text-white p-6">
        <div className="max-w-xl mx-auto p-8 rounded-3xl border border-pink-400/80 bg-gradient-to-br from-purple-800/90 to-pink-700/90 shadow-lg text-center">
          <CheckCircle2 className="h-16 w-16 mx-auto text-pink-300 mb-4" />
          <h1 className="text-3xl font-extrabold text-pink-200">Test completado</h1>
          <p className="mt-2 text-pink-100">Has respondido a {correct + incorrect} preguntas.</p>
          <div className="mt-6 text-xl font-bold">
            <p className="text-purple-300">Puntuación: {score}%</p>
            <p className="text-pink-300">Nivel estimado: {levelText}</p>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <button onClick={onBack} className="px-6 py-3 rounded-2xl border border-pink-400/80 hover:bg-pink-500 hover:text-white">Volver al inicio</button>
            <a href="#contacto" className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-700 to-purple-900 hover:brightness-110">Quiero clases</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-xl mx-auto p-8 rounded-3xl border border-pink-400/80 bg-gradient-to-br from-purple-800/90 to-pink-700/90 shadow-lg">
        <h1 className="text-3xl font-extrabold text-pink-200">Test de nivel de inglés</h1>
        <p className="mt-2 text-pink-100">Dificultad adaptativa: si respondes bien, sube de nivel; si fallas, puede bajar para afinar el estimado.</p>
        <div className="mt-6">
          <p className="text-lg">{current.q}</p>
          <div className="mt-4 grid gap-3">
            {current.a.map((opt, i) => (
              <button key={i} onClick={() => answer(i)} className="px-4 py-3 rounded-xl border border-pink-400/80 hover:bg-pink-500 hover:text-white">
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default function App() {
  const [a11y, setA11y] = useState({ contrast: false, dyslexia: false, largeText: false, reduceMotion: false });
  const [showA11y, setShowA11y] = useState(false);
  const [page, setPage] = useState('home');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const englishRef = useRef(null);
  const historyRef = useRef(null);
  const docenciaRef = useRef(null);
  const aboutRef = useRef(null);
  const testRef = useRef(null);
  const contactRef = useRef(null);
  const socialProofRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const a11yClass = Object.keys(a11y).filter(key => a11y[key]).map(key => `a11y-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`).join(' ');

  const PAGES = {
    home: (
      <>
        <header className="py-6 sm:py-8 bg-blue-900/40 backdrop-blur fixed top-0 left-0 right-0 z-50">
          <div className={`${THEME.container} flex items-center justify-between`}>
            <div className="flex items-center gap-3 text-white">
              <GraduationCap className={`h-8 w-8 ${THEME.accent}`} />
              <span className="font-bold text-lg sm:text-xl">Aprende+</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 text-white text-lg font-semibold">
              <button onClick={() => scrollTo(aboutRef)} className="link-underline">Sobre Nosotros</button>
              <button onClick={() => scrollTo(englishRef)} className="link-underline">Clases de Inglés</button>
              <button onClick={() => scrollTo(historyRef)} className="link-underline">Historia y Filosofía</button>
              <button onClick={() => scrollTo(docenciaRef)} className="link-underline">Capacitación Docente</button>
              <button onClick={() => scrollTo(testRef)} className="link-underline">Test de Nivel</button>
              <button onClick={() => scrollTo(contactRef)} className="link-underline">Contacto</button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-full text-white bg-white/20 hover:bg-white/30 transition-colors">
                <Menu className="h-6 w-6" />
              </button>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <button onClick={() => setShowA11y(s => !s)} className="p-2 rounded-full text-white bg-white/20 hover:bg-white/30 transition-colors">
                <BookOpen className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-4 p-4 bg-blue-900/40 backdrop-blur shadow-lg border-t border-purple-400"
              >
                <nav className="flex flex-col gap-4 text-white text-base font-semibold">
                  <button onClick={() => scrollTo(aboutRef)} className="link-underline">Sobre Nosotros</button>
                  <button onClick={() => scrollTo(englishRef)} className="link-underline">Clases de Inglés</button>
                  <button onClick={() => scrollTo(historyRef)} className="link-underline">Historia y Filosofía</button>
                  <button onClick={() => scrollTo(docenciaRef)} className="link-underline">Capacitación Docente</button>
                  <button onClick={() => scrollTo(testRef)} className="link-underline">Test de Nivel</button>
                  <button onClick={() => { setShowA11y(s => !s); setIsMobileMenuOpen(false); }} className="text-left">
                    <BookOpen className="inline-block h-6 w-6 mr-2" />
                    Accesibilidad
                  </button>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
  
        <main>
          {/* Hero Section */}
          <div className="relative isolate px-6 pt-24 lg:px-8 bg-static">
            <div className={`${THEME.container} py-24 sm:py-32 lg:py-40 text-center`}>
              <h1 className={`${THEME.heading}`}>
                Clases Personalizadas, <span className={`${THEME.accent}`}>Materiales Digitales</span>, a tu Ritmo.
              </h1>
              <p className="mt-6 text-lg leading-8 text-purple-200 max-w-2xl mx-auto">
                Descubre un nuevo enfoque para aprender inglés, historia, filosofía y capacitación docente. Clases flexibles y adaptadas a tus necesidades.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4">
                <button onClick={() => scrollTo(englishRef)} className="rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-pink-400 transition-colors">
                  Ver servicios
                </button>
                <button onClick={() => scrollTo(contactRef)} className="text-sm font-semibold leading-6 text-white flex items-center gap-2 group">
                  Contáctanos <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-slate-900 py-12" ref={socialProofRef}>
            <div className={`${THEME.container} text-center text-white`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-2xl sm:text-3xl font-bold">
                <div className="pane p-6 rounded-2xl shadow-lg">
                  <span className="text-pink-400">20+</span> años de experiencia
                </div>
                <div className="pane p-6 rounded-2xl shadow-lg">
                  <span className="text-pink-400">1500+</span> estudiantes ayudados
                </div>
              </div>
            </div>
          </div>
  
          {/* About Section */}
          <div className="bg-slate-950 py-12 sm:py-24" ref={aboutRef}>
            <div className={`${THEME.container}`}>
              <div className="text-center mb-12">
                <h2 className={`${THEME.heading}`}>Sobre Nosotros</h2>
                <div className="divider w-24 mx-auto mt-4"></div>
              </div>
              <div className="max-w-3xl mx-auto pane p-8 rounded-3xl shadow-lg">
                <p className="text-purple-200 text-lg text-center">
                  Somos educadores basados en EE. UU., con grados de Licenciatura, Maestría y Doctorado. Más de 20 años de experiencia y especialización en nuestras áreas.
                </p>
              </div>
            </div>
          </div>

          {/* Testimonials Carousel */}
          <div className="bg-slate-900 py-12 sm:py-24">
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
                    <div className="max-w-2xl text-center text-white">
                      <p className="italic text-lg">"{TESTIMONIALS[currentTestimonial].text}"</p>
                      <p className="mt-4 font-bold text-pink-400">- {TESTIMONIALS[currentTestimonial].author}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
  
          {/* Services Section */}
          <div className="bg-slate-950 py-12 sm:py-24">
            <div className={`${THEME.container}`}>
              <div className="text-center mb-12">
                <h2 className={`${THEME.heading}`}>Nuestros Servicios</h2>
                <div className="divider w-24 mx-auto mt-4"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="pane p-8 rounded-3xl text-center shadow-lg" ref={englishRef}>
                  <div className="flex justify-center mb-4">
                    <GraduationCap className={`h-12 w-12 ${THEME.accent}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Clases de Inglés</h3>
                  <p className="text-purple-200">Desde niveles básicos hasta avanzados. Preparación para exámenes internacionales y foco en fluidez.</p>
                </div>
                <div className="pane p-8 rounded-3xl text-center shadow-lg" ref={historyRef}>
                  <div className="flex justify-center mb-4">
                    <GraduationCap className={`h-12 w-12 ${THEME.accent}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Historia y Filosofía</h3>
                  <p className="text-purple-200">Análisis crítico de la historia y el pensamiento filosófico a través del tiempo. Clases interactivas.</p>
                </div>
                <div className="pane p-8 rounded-3xl text-center shadow-lg" ref={docenciaRef}>
                  <div className="flex justify-center mb-4">
                    <GraduationCap className={`h-12 w-12 ${THEME.accent}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Capacitación Docente</h3>
                  <p className="text-purple-200">Herramientas y metodologías para educadores. Aprende a crear clases dinámicas y significativas.</p>
                </div>
              </div>
            </div>
          </div>
  
          <div className="bg-slate-900 py-12 sm:py-24" ref={testRef}>
            <div className={`${THEME.container}`}>
              <div className="text-center mb-12">
                <h2 className={`${THEME.heading}`}>Test de Nivel</h2>
                <div className="divider w-24 mx-auto mt-4"></div>
              </div>
              <div className="text-center">
                <p className="text-purple-200 max-w-xl mx-auto text-lg mb-6">
                  Descubre tu nivel de inglés con nuestro test adaptativo. Rápido, preciso y completamente gratuito.
                </p>
                <button
                  onClick={() => setPage('test')}
                  className="rounded-full bg-pink-500 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-pink-400 transition-colors"
                >
                  ¡Hacer el Test Ahora!
                </button>
              </div>
            </div>
          </div>
  
          <div className="bg-slate-950 py-12 sm:py-24" ref={contactRef}>
            <div className={`${THEME.container}`}>
              <div className="text-center mb-12">
                <h2 className={`${THEME.heading}`}>Contáctanos</h2>
                <div className="divider w-24 mx-auto mt-4"></div>
              </div>
              <div className="max-w-xl mx-auto pane p-8 ro
