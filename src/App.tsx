import React, { createContext, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import HistoryPage from "./pages/HistoryPage";
import PhilosophyPage from "./pages/PhilosophyPage";
import EnglishPage from "./pages/EnglishPage";
import EnglishTest from "./pages/EnglishTest";
import TeachingPage from "./pages/TeachingPage";
import { GraduationCap } from "lucide-react";

type Currency = "CLP" | "USD";
export const CurrencyContext = createContext<{ currency: Currency; setCurrency: (c: Currency)=>void; rate: number }>({
  currency: "CLP",
  setCurrency: () => {},
  rate: 900,
});

const App: React.FC = () => {
  const [currency, setCurrency] = useState<Currency>("CLP");
  const rate = 900;
  const ctx = useMemo(() => ({ currency, setCurrency, rate }), [currency]);

  return (
    <CurrencyContext.Provider value={ctx}>
      <BrowserRouter>
        <header className="fixed top-0 left-0 right-0 z-50 py-4 bg-slate-950/70 backdrop-blur border-b border-white/10">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-yellow-400" />
              <span className="text-2xl font-extrabold text-white">Aprende+</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-white">
              <NavLink to="/english" className={({isActive})=> isActive ? "text-sky-300" : "hover:text-sky-300"}>Inglés</NavLink>
              <NavLink to="/history" className={({isActive})=> isActive ? "text-sky-300" : "hover:text-sky-300"}>Historia</NavLink>
              <NavLink to="/philosophy" className={({isActive})=> isActive ? "text-sky-300" : "hover:text-sky-300"}>Filosofía</NavLink>
              <NavLink to="/teaching" className={({isActive})=> isActive ? "text-sky-300" : "hover:text-sky-300"}>Capacitación Docente</NavLink>
              <NavLink to="/english-test" className={({isActive})=> isActive ? "text-sky-300" : "hover:text-sky-300"}>Prueba de Inglés</NavLink>
              <select
                className="ml-4 rounded-xl bg-white/10 border border-white/20 px-3 py-1 text-sm"
                value={currency}
                onChange={(e)=> setCurrency(e.target.value as Currency)}
              >
                <option value="CLP">CLP</option>
                <option value="USD">USD</option>
              </select>
            </nav>
          </div>
        </header>

        <main className="pt-24 bg-slate-950 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/philosophy" element={<PhilosophyPage />} />
            <Route path="/english" element={<EnglishPage />} />
            <Route path="/english-test" element={<EnglishTest />} />
            <Route path="/teaching" element={<TeachingPage />} />
          </Routes>
        </main>

        <footer className="py-10 border-t border-white/10 bg-slate-900/40 backdrop-blur">
          <div className="max-w-6xl mx-auto px-6 text-center text-gray-300">
            © {new Date().getFullYear()} Aprende+. Todos los derechos reservados.
          </div>
        </footer>
      </BrowserRouter>
    </CurrencyContext.Provider>
  );
};

export default App;
