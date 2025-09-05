import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import EnglishPage from "./pages/EnglishPage";
import HistoryPage from "./pages/HistoryPage";
import PhilosophyPage from "./pages/PhilosophyPage";
import TeachingPage from "./pages/TeachingPage";
import TestPage from "./pages/TestPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
