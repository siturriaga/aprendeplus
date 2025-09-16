// src/data/content.ts
import { BookOpen, GraduationCap, Mail, Clock, Calendar, CheckCircle2 } from "lucide-react";

export const THEME = {
  container: "container mx-auto px-6 max-w-7xl",
  accent: "text-amber-600",
  heading: "font-serif text-gray-900 text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight",
};

export const TESTIMONIALS = [
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

export const PROGRAMS = [
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
      { icon: <Clock className="h-5 w-5" />, text: "Clases de 60 minutos" },
      { icon: <Calendar className="h-5 w-5" />, text: "Mínimo 2 clases/semana" },
      { icon: <CheckCircle2 className="h-5 w-5" />, text: "Prueba de nivel incluida" },
      { icon: <CheckCircle2 className="h-5 w-5" />, text: "Materiales digitales" },
    ],
  },
  {
    id: "historia-filosofia",
    title: "Historia y Filosofía",
    icon: <GraduationCap className="h-10 w-10 text-white" />,
    description: "Historia latinoamericana/europea e intelectual; filosofía clásica y moderna.",
    fullDescription: "Sumérgete en el pensamiento crítico a través de la historia y la filosofía. Analizamos eventos y corrientes de pensamiento desde una perspectiva académica, fomentando el debate y la reflexión. Este curso es ideal para quienes buscan una comprensión más profunda del mundo.",
    includes: [
      "Clases de 60 minutos",
      "Mínimo 2 clases por semana",
      "Materiales digitales",
      "Enfoque en pensamiento crítico",
    ],
    price: "CLP $250.000 / mes",
    features: [
      { icon: <Clock className="h-5 w-5" />, text: "Clases de 60 minutos" },
      { icon: <Calendar className="h-5 w-5" />, text: "Mínimo 2 clases/semana" },
      { icon: <CheckCircle2 className="h-5 w-5" />, text: "Enfoque en pensamiento crítico" },
      { icon: <CheckCircle2 className="h-5 w-5" />, text: "Materiales digitales" },
    ],
  },
  {
    id: "capacitacion-docente",
    title: "Capacitación Docente",
    icon: <GraduationCap className="h-10 w-10 text-white" />,
    description: "Instrucción diferenciada, DUA, manejo de aula, gamificación y uso de IA, además de análisis de datos.",
    fullDescription: "Este programa está diseñado para educadores que buscan innovar en sus aulas. Cubrimos metodologías avanzadas, como el Diseño Universal para el Aprendizaje (DUA), y el uso de herramientas de inteligencia artificial para personalizar la enseñanza. Aprende a analizar datos para mejorar tus estrategias pedagógicas.",
    includes: [
      "Clases de 60 minutos",
      "Mínimo 2 clases por semana",
      "Materiales digitales",
      "Uso de IA en la educación",
    ],
    price: "CLP $250.000 / mes",
    features: [
      { icon: <Clock className="h-5 w-5" />, text: "Clases de 60 minutos" },
      { icon: <Calendar className="h-5 w-5" />, text: "Mínimo 2 clases/semana" },
      { icon: <CheckCircle2 className="h-5 w-5" />, text: "Uso de IA en la educación" },
      { icon: <CheckCircle2 className="h-5 w-5" />, text: "Análisis de datos educativos" },
    ],
  },
];

type Program = typeof PROGRAMS[0];

export type { Program };
