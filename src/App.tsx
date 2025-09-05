import { BrowserRouter, Routes, Route, useLocation, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Menu, X, Mail, Facebook, Instagram, Twitter } from "lucide-react";

import Home from "./pages/Home";
import EnglishPage from "./pages/EnglishPage";
import HistoryPage from "./pages/HistoryPage";
import PhilosophyPage from "./pages/PhilosophyPage";
import TeachingPage from "./pages/TeachingPage";
import TestPage from "./pages/TestPage";

// Header Component
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const links = [
    { name: "Inicio", path: "/", type: "internal" },
    { name: "Inglés", path: "/english", type: "internal" },
    { name: "Historia", path: "/history", type: "internal" },
    { name: "Filosofía", path: "/philosophy", type: "internal" },
    { name: "Docencia", path: "/teaching", type: "internal" },
    { name: "Contacto", path: "/#contacto", type: "hash" },
  ];

  const handleLinkClick = (path: string) => {
    if (path.startsWith("/#")) {
      setTimeout(() => {
        const id = path.substring(2);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 py-4 backdrop-blur-md bg-blue-950/80">
      <div className="flex items-center justify-between max-w-6xl px-6 mx-auto">
        <Link to="/" className="text-2xl font-bold text-white">Aprende+</Link>
        
        {/* Desktop Menu */}
        <nav className="hidden space-x-8 md:flex">
          {links.map((link) => (
            link.type === "internal" ? (
              <Link key={link.name} to={link.path} className="link-underline text-white hover:text-amber-200">{link.name}</Link>
            ) : (
              <a key={link.name} href={link.path} className="link-underline text-white hover:text-amber-200" onClick={() => handleLinkClick(link.path)}>{link.name}</a>
            )
          ))}
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div ref={dropdownRef} className="absolute inset-x-0 z-40 p-4 transition-all duration-300 ease-in-out bg-blue-950/90 md:hidden">
          <div className="flex flex-col items-center space-y-4">
            {links.map((link) => (
              link.type === "internal" ? (
                <Link key={link.name} to={link.path} className="text-lg text-white hover:text-amber-200" onClick={() => handleLinkClick(link.path)}>{link.name}</Link>
              ) : (
                <a key={link.name} href={link.path} className="text-lg text-white hover:text-amber-200" onClick={() => handleLinkClick(link.path)}>{link.name}</a>
              )
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

// Footer Component
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 text-white bg-blue-950/80">
      <div className="max-w-6xl px-6 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Aprende+</h3>
            <p className="text-sm">Ofrecemos cursos personalizados de idiomas y humanidades para estudiantes de todas las edades.</p>
          </div>
          <div>
            <h4 className="font-bold text-amber-200">Programas</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/english" className="link-underline">Inglés</Link></li>
              <li><Link to="/history" className="link-underline">Historia</Link></li>
              <li><Link to="/philosophy" className="link-underline">Filosofía</Link></li>
              <li><Link to="/teaching" className="link-underline">Docencia</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-amber-200">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/politicas" className="link-underline">Política de Privacidad</Link></li>
              <li><Link to="/terminos" className="link-underline">Términos de Servicio</Link></li>
              <li><Link to="/faq" className="link-underline">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-amber-200">Síguenos</h4>
            <div className="flex mt-4 space-x-4">
              <a href="#" aria-label="Facebook"><Facebook className="w-6 h-6 hover:text-amber-200" /></a>
              <a href="#" aria-label="Instagram"><Instagram className="w-6 h-6 hover:text-amber-200" /></a>
              <a href="#" aria-label="Twitter"><Twitter className="w-6 h-6 hover:text-amber-200" /></a>
              <a href="mailto:info@aprendeplus.com" aria-label="Email"><Mail className="w-6 h-6 hover:text-amber-200" /></a>
            </div>
          </div>
        </div>
        <div className="pt-8 mt-8 text-center border-t border-amber-400/80">
          <p className="text-sm text-gray-400">© {currentYear} Aprende+. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};


// Main App Component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="bg-blue-950 min-h-screen">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/english" element={<EnglishPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/philosophy" element={<PhilosophyPage />} />
            <Route path="/teaching" element={<TeachingPage />} />
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
