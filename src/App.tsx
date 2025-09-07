import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, BookOpen, Globe, Sparkles, Users, MessageSquare, Sun, Code, Pen, Lightbulb, User } from 'lucide-react';
import Home from './pages/Home';
import EnglishPage from './pages/EnglishPage';
import HistoryPage from './pages/HistoryPage';
import PhilosophyPage from './pages/PhilosophyPage';
import TeachingPage from './pages/TeachingPage';
import TestPage from './pages/TestPage';

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
        <Link to="/" className="text-2xl font-bold text-white">
          <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImxvZ28tZ3JhZGllbnQiIHgxPSIwJSIgeTE9IjUwJSIgeDI9IjEwMCUiIHkyPSI1MCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZmZjZDBhIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjMjYzMzc4Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzE4MWMzYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxmaWx0ZXIgaWQ9Imdsb3ciPgogICAgICA8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMSAwIi8+CiAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjUiIGluPSJzb3VyY2VBbHBoYSIgcmVzdWx0PSJibHVyIi8+CiAgICAgIDxmZU9mZnNldCBkeD0iMiIgZHk9IjIiLz4KICAgICAgPGZlQmxlbmQgaW49IlNvdXJjZUdyYXBoaWMiLz4KICAgIDwvZmlsdGVyPgogIDwvZGVmcz4KCiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YyZjJmMiIvPgogIAogIDxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iODAiIGZpbGw9IiNmZmYwMDAiIHN0cm9rZT0iIzE4MWMzYSIgc3Ryb2tlLXdpZHRoPSI1IiBmaWx0ZXI9InVybCgjZ2xvdykiIC8+CiAgCiAgPHBhdGggZD0iTTEwMCAyMCBMNDAgMTQwIEgxNjAgTDEwMCAyMFoiIHN0cm9rZT0iIzE4MWMzYSIgc3Ryb2tlLXdpZHRoPSI0IiBmaWxsPSJ1cmwoI2xvZ28tZ3JhZGllbnQpIiBmaWx0ZXI9InVybCgjZ2xvdykiLz4KCiAgPHRleHQgeD0iMTAwIiB5PSIxMDUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPkFQLzwvdGV4dD4KPC9zdmc+" alt="Aprende+ Logo" className="h-8" />
        </Link>
        
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
  return (
    <footer className="py-8 text-center text-white bg-blue-950">
      <div className="max-w-6xl px-6 mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="text-lg font-bold">Aprende+</div>
          <div className="mt-4 text-sm md:mt-0">
            &copy; {new Date().getFullYear()} Aprende+. Todos los derechos reservados.
          </div>
          <div className="mt-4 md:mt-0">
            <a href="#" className="link-underline mx-2 text-white hover:text-amber-200">Privacidad</a>
            <a href="#" className="link-underline mx-2 text-white hover:text-amber-200">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
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
    </>
  );
  }
