import React, { useEffect, useRef, useState, memo, createContext, useMemo } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import HistoryPage from "./pages/HistoryPage";
import PhilosophyPage from "./pages/PhilosophyPage";
import EnglishPage from "./pages/EnglishPage";
import EnglishTest from "./pages/EnglishTest";
import TeachingPage from "./pages/TeachingPage";
import { GraduationCap, Sparkles, Sun, Moon, Eye, Text, Minus, ChevronRight, CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// Types and Context for Currency
type Currency = "CLP" | "USD";
export const CurrencyContext = createContext<{ currency: Currency; setCurrency: (c: Currency) => void; rate: number }>({
  currency: "CLP",
  setCurrency: () => {},
  rate: 900,
});

// Types and Context for Accessibility
type A11ySettings = {
  contrast: boolean;
  dyslexia: boolean;
  largeText: boolean;
  reduceMotion: boolean;
};

export const AccessibilityContext = createContext<{
  a11y: A11ySettings;
  setA11y: React.Dispatch<React.SetStateAction<A11ySettings>>;
} | null>(null);

const testimonialData = [
  // ... (Testimonials data as it was originally)
];

const THEME = {
  container: "max-w-6xl mx-auto px-6",
  accentText: "text-brandGold",
  mainText: "text-gray-200",
};

const GlobalStyles = memo(() => (
  <style>{`
    html { scroll-behavior: smooth; }
  `}</style>
));

const App: React.FC = () => {
  const [currency, setCurrency] = useState<Currency>("CLP");
  const [a11y, setA11y] = useState<A11ySettings>({
    contrast: false,
    dyslexia: false,
    largeText: false,
    reduceMotion: false,
  });
  const rate = 900;
  const ctx = useMemo(() => ({ currency, setCurrency, rate }), [currency]);

  // Accessibility effect
  useEffect(() => {
    document.body.classList.toggle("a11y-contrast", a11y.contrast);
    document.body.classList.toggle("a11y-dyslexia", a11y.dyslexia);
    document.body.classList.toggle("a11y-large-text", a11y.largeText);
    document.body.classList.toggle("a11y-reduce-motion", a11y.reduceMotion);
    localStorage.setItem("a11y-settings", JSON.stringify(a11y));
  }, [a11y]);

  // Testimonial rotator
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((i) => (i + 1) % testimonialData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for active nav links
  const headerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    const sections = document.querySelectorAll("main section[id]");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <AccessibilityContext.Provider value={{ a11y, setA11y }}>
      <CurrencyContext.Provider value={ctx}>
        <BrowserRouter>
          <GlobalStyles />
          {/* Header */}
          <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 py-4 bg-slate-950/70 backdrop-blur border-b border-white/10">
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3">
                <GraduationCap className="h-8 w-8 text-yellow-400" />
                <span className="text-2xl font-extrabold text-white">Aprende+</span>
              </Link>
              <nav className="hidden md:flex items-center gap-4 text-white/80 font-bold">
                <a href="#hero" className={`link-underline ${activeSection === "hero" ? "nav-active" : ""}`}>Aprende</a>
                <a href="#programas" className={`link-underline ${activeSection === "programas" ? "nav-active" : ""}`}>Programas</a>
                <a href="#opiniones" className={`link-underline ${activeSection === "opiniones" ? "nav-active" : ""}`}>Opiniones</a>
                <a href="#precios" className={`link-underline ${activeSection === "precios" ? "nav-active" : ""}`}>Precios</a>
                <a href="#contacto" className={`link-underline ${activeSection === "contacto" ? "nav-active" : ""}`}>Contacto</a>
                <select
                  className="ml-4 rounded-xl bg-white/10 border border-white/20 px-3 py-1 text-sm"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                >
                  <option value="CLP">CLP</option>
                  <option value="USD">USD</option>
                </select>
              </nav>
            </div>
          </header>

          <main className="bg-slate-950 min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/philosophy" element={<PhilosophyPage />} />
              <Route path="/english" element={<EnglishPage />} />
              <Route path="/english-test" element={<EnglishTest />} />
              <Route path="/teaching" element={<TeachingPage />} />
            </Routes>
          </main>

          <footer className="py-12 border-t border-amber-400/60 bg-blue-900/40 backdrop-blur">
            <div className={`${THEME.container} text-center text-white`}>
              <div className="flex items-center justify-center gap-3">
                <Sparkles className={`h-5 w-5 ${THEME.accentText}`} />
                <GraduationCap className="h-8 w-8 text-white" />
                <p className="text-xl font-extrabold">Aprende+</p>
              </div>
              <p className="mt-4 text-sm text-gray-400">© {new Date().getFullYear()} Aprende+. Todos los derechos reservados.</p>
            </div>
          </footer>
        </BrowserRouter>
      </CurrencyContext.Provider>
    </AccessibilityContext.Provider>
  );
};

export default App;
