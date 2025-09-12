// ... (imports remain the same)
import { Link, NavLink } from "react-router-dom"; // Add Link here

// ... (CurrencyContext and App component setup)

const App: React.FC = () => {
  const [currency, setCurrency] = useState<Currency>("CLP");
  const rate = 900;
  const ctx = useMemo(() => ({ currency, setCurrency, rate }), [currency]);

  return (
    <CurrencyContext.Provider value={ctx}>
      <BrowserRouter>
        <header className="fixed top-0 left-0 right-0 z-50 py-4 backdrop-blur-md bg-transparent">
          <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
            {/* Using Link for internal navigation */}
            <Link to="/" className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-rose-500" />
              <span className="text-2xl font-bold text-white">Aprende+</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <NavLink to="/english" className={({isActive})=> isActive ? "text-rose-500" : "text-white hover:text-rose-400"}>Inglés</NavLink>
              <NavLink to="/history" className={({isActive})=> isActive ? "text-rose-500" : "text-white hover:text-rose-400"}>Historia</NavLink>
              <NavLink to="/philosophy" className={({isActive})=> isActive ? "text-rose-500" : "text-white hover:text-rose-400"}>Filosofía</NavLink>
              <NavLink to="/teaching" className={({isActive})=> isActive ? "text-rose-500" : "text-white hover:text-rose-400"}>Capacitación Docente</NavLink>
              <NavLink to="/english-test" className={({isActive})=> isActive ? "text-rose-500" : "text-white hover:text-rose-400"}>Prueba de Inglés</NavLink>
              <select
                className="ml-3 rounded-xl bg-white/10 border border-white/20 px-3 py-1 text-sm text-white"
                value={currency}
                onChange={(e)=> setCurrency(e.target.value as Currency)}
              >
                <option value="CLP">CLP</option>
                <option value="USD">USD</option>
              </select>
            </nav>
          </div>
        </header>

        <main className="pt-24 min-h-screen bg-slate-950 text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/english" element={<EnglishPage />} />
            <Route path="/english-test" element={<EnglishTest />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/philosophy" element={<PhilosophyPage />} />
            <Route path="/teaching" element={<TeachingPage />} />
          </Routes>
        </main>

        <footer className="py-12 border-t border-white/10 bg-slate-900/40 backdrop-blur">
          <div className="max-w-6xl mx-auto px-6 text-center text-white/90">
            © {new Date().getFullYear()} Aprende+. Todos los derechos reservados.
          </div>
        </footer>
      </BrowserRouter>
    </CurrencyContext.Provider>
  );
};

export default App;
