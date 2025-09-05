import React, { useEffect, useRef, useState, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, GraduationCap, Mail, ChevronRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Routes, Route, Link } from "react-router-dom";
import EnglishTest from "./pages/EnglishTest";
import EnglishPage from "./pages/EnglishPage";
import HistoryPage from "./pages/HistoryPage";
import PhilosophyPage from "./pages/PhilosophyPage";
import TeachingPage from "./pages/TeachingPage";
import Home from "./pages/Home";

const THEME = {
  textPrimary: "text-white",
  textSecondary: "text-amber-100",
  accentText: "text-amber-300",
  borderAccent: "border-amber-400/80",
  btnPrimary: "bg-gradient-to-r from-amber-500 via-blue-700 to-blue-900 hover:brightness-110 text-white shadow-lg",
  gradientAccent: "from-blue-900 via-amber-400 to-amber-200",
  container: "max-w-6xl mx-auto px-6",
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

const NavLinks = memo(({ onClick }: { onClick?: () => void; }) => (
  <>
    <Link to="/" onClick={onClick} className={`hover:text-amber-300 transition link-underline`}>Home</Link>
    <Link to="/english" onClick={onClick} className={`hover:text-amber-300 transition link-underline`}>Inglés</Link>
    <Link to="/history" onClick={onClick} className={`hover:text-amber-300 transition link-underline`}>Historia</Link>
    <Link to="/philosophy" onClick={onClick} className={`hover:text-amber-300 transition link-underline`}>Filosofía</Link>
    <Link to="/teaching" onClick={onClick} className={`hover:text-amber-300 transition link-underline`}>Docente</Link>
    <a href="/#contacto" onClick={onClick} className={`hover:text-amber-300 transition link-underline`}>Contacto</a>
  </>
));

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
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

  return (
    <div className={`bg-static ${a11y.contrast ? "a11y-contrast" : ""} ${a11y.dyslexia ? "a11y-dyslexia" : ""} ${a11y.largeText ? "a11y-large-text" : ""} ${a11y.reduceMotion ? "a11y-reduce-motion" : ""}`}>

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

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/english" element={<EnglishPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/philosophy" element={<PhilosophyPage />} />
        <Route path="/teaching" element={<TeachingPage />} />
        <Route path="/test" element={<EnglishTest />} />
      </Routes>

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
