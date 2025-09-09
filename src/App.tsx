import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { GraduationCap, Menu, X, Sparkles, BookOpen, Mail, Accessibility, Globe } from "lucide-react";

import Home from "./pages/Home";
import EnglishPage from "./pages/EnglishPage";
import EnglishTest from "./pages/EnglishTest";
import HistoryPage from "./pages/HistoryPage";
import PhilosophyPage from "./pages/PhilosophyPage";
import TeachingPage from "./pages/TeachingPage";
import TestPage from "./pages/TestPage";

/* ---------- Moneda (contexto simple) ---------- */
export type Currency = "CLP" | "USD";
export const CurrencyContext = React.createContext<{currency: Currency, setCurrency: (c: Currency)=>void, rate:number}>({
  currency: "CLP",
  setCurrency: () => {},
  rate: 950, // 1 USD ≈ 950 CLP (ajustable)
});

/* ---------- Google Translate (opcional) ---------- */
const TranslateWidget: React.FC = () => {
  useEffect(() => {
    if ((window as any).__gt_loaded) return;
    (window as any).__gt_loaded = true;
    (window as any).googleTranslateElementInit = () => {
      // @ts-ignore
      new window.google.translate.TranslateElement(
        { pageLanguage: "es", includedLanguages: "en,es", layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false },
        "google_translate_element"
      );
    };
    const s = document.createElement("script");
    s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.async = true;
    document.body.appendChild(s);
  }, []);
  return <div id="google_translate_element" className="hidden md:block text-sm rounded-lg px-2 py-1 bg-white/10 border border-white/20" title="Traducir" />;
};

/* ---------- Panel de Accesibilidad ---------- */
const AccessibilityPanel: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [contrast, setContrast] = useState(false);
  const [large, setLarge] = useState(false);
  const [dys, setDys] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("a11y-contrast", contrast);
  }, [contrast]);
  useEffect(() => {
    document.documentElement.classList.toggle("a11y-large-text", large);
  }, [large]);
  useEffect(() => {
    document.documentElement.classList.toggle("a11y-dyslexia", dys);
    if (dys) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://cdn.jsdelivr.net/gh/antijingoist/open-dyslexic/stylesheet.css";
      link.id = "odys";
      if (!document.getElementById("odys")) document.head.appendChild(link);
    }
  }, [dys]);
  useEffect(() => {
    document.documentElement.classList.toggle("a11y-reduce-motion", reduce);
  }, [reduce]);

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Accesibilidad"
        className="fixed bottom-5 right-5 z-[60] rounded-full p-3 bg-fuchsia-500 hover:bg-fuchsia-600 shadow-lg"
      >
        <Accessibility className="w-6 h-6 text-white" />
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 right-5 z-[60] w-72 p-4 rounded-2xl bg-slate-900/90 border border-white/15 backdrop-blur text-white"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Accesibilidad</h3>
              <button onClick={() => setOpen(false)} aria-label="Cerrar"><X className="w-5 h-5" /></button>
            </div>
            <div className="mt-3 space-y-2 text-sm">
              <label className="flex items-center gap-2"><input type="checkbox" checked={contrast} onChange={(e)=>setContrast(e.target.checked)} /> Alto contraste</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={large} onChange={(e)=>setLarge(e.target.checked)} /> Texto grande</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={reduce} onChange={(e)=>setReduce(e.target.checked)} /> Reducir animaciones</label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={dys} onChange={(e)=>setDys(e.target.checked)} /> Fuente amigable (dislexia)</label>
              <p className="text-xs opacity-80 mt-2">Puedes activar/desactivar en cualquier momento.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const THEME = {
  textPrimary: "text-white",
  textSecondary: "text-gray-300",
  accentText: "text-rose-500",
  container: "max-w-6xl mx-auto px-6",
};

const App: React.FC = () => {
  const reduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const [currency, setCurrency] = useState<Currency>("CLP");
  const rate = 950; // <- cambia aquí la tasa

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }, [location.pathname, reduce]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const spring = reduce ? { duration: 0 } : { type: "spring", stiffness: 100, damping: 20 };

  const nav = [
    { to: "/", label: "Inicio" },
    { to: "/english", label: "Inglés" },
    { to: "/history", label: "Historia" },
    { to: "/philosophy", label: "Filosofía" },
    { to: "/teaching", label: "Capacitación Docente" },
    { to: "/test", label: "Test" },
  ];

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rate }}>
      <a href="#main" className="skip-link sr-only focus:not-sr-only">Saltar al contenido</a>

      {/* Header */}
      <motion.header
        initial={reduce ? false : { y: -100 }} animate={reduce ? {} : { y: 0 }} transition={spring}
        className="fixed top-0 left-0 right-0 z-50 py-4 backdrop-blur-md bg-transparent"
        style={{ height: "var(--header-h)" }}
      >
        <div className={`${THEME.container} flex items-center justify-between`}>
          <Link to="/" className="flex items-center gap-3">
            <GraduationCap className={`h-8 w-8 ${THEME.accentText}`} />
            <span className={`text-2xl font-bold ${THEME.textPrimary}`}>Aprende+</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className={`link-underline transition ${location.pathname === n.to ? THEME.accentText : "text-white"}`}>
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Selector de moneda */}
            <div className="hidden md:flex items-center gap-1 bg-white/10 border border-white/20 rounded-lg px-2 py-1">
              <Globe className="w-4 h-4 opacity-80" />
              <select
                value={currency}
                onChange={(e)=>setCurrency(e.target.value as Currency)}
                className="bg-transparent text-white text-sm outline-none"
                aria-label="Selector de moneda"
              >
                <option value="CLP">CLP</option>
                <option value="USD">USD</option>
              </select>
            </div>

            {/* Traducir */}
            <TranslateWidget />

            <button onClick={() => setMenuOpen((v) => !v)} className="md:hidden text-white" aria-label="Abrir menú" aria-expanded={menuOpen} aria-controls="mobile-menu">
              {menuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div id="mobile-menu" role="dialog" aria-modal="true"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={spring}
            className="fixed inset-0 z-40 bg-slate-900/90 backdrop-blur-md p-6 pt-24 md:hidden"
          >
            <div className="flex flex-col items-end space-y-4">
              {nav.map((n) => (
                <Link key={n.to} to={n.to} className="text-white text-2xl">{n.label}</Link>
              ))}
              {/* Selector de moneda en móvil */}
              <div className="mt-4 bg-white/10 border border-white/20 rounded-lg px-3 py-2">
                <label className="text-white/90 text-sm mr-2">Moneda:</label>
                <select value={currency} onChange={(e)=>setCurrency(e.target.value as Currency)} className="bg-transparent text-white text-sm outline-none">
                  <option value="CLP">CLP</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main */}
      <main id="main" className="pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/english" element={<EnglishPage />} />
          <Route path="/english-test" element={<EnglishTest />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/philosophy" element={<PhilosophyPage />} />
          <Route path="/teaching" element={<TeachingPage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </main>

      {/* Botón de accesibilidad */}
      <AccessibilityPanel />

      <footer className="py-12 border-t border-white/10 bg-slate-900/40 backdrop-blur mt-16">
        <div className={`${THEME.container} text-center text-white`}>
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="h-5 w-5 text-rose-400" />
            <GraduationCap className="h-8 w-8 text-white" />
            <BookOpen className="h-5 w-5" />
          </div>
          <p className="mt-4 text-sm">
            Profesionales basados en EE. UU. (Bachelor, Master, PhD). 20+ años de experiencia. 1500+ estudiantes atendidos.
          </p>
          <p className="mt-1 text-xs opacity-80">
            <Mail className="inline w-4 h-4 mr-1" />
            contacto@aprendeplus.example
          </p>
        </div>
      </footer>
    </CurrencyContext.Provider>
  );
};

export default App;
