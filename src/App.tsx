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
      { icon: <Clock className="h-5 w-5" />, text: "Cl
