import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, CheckCircle2 } from "lucide-react";

// Theming and common components are reused from the Home page for consistency
const THEME = {
  textPrimary: "text-white",
  textSecondary: "text-amber-100",
  accentText: "text-amber-300",
  borderAccent: "border-amber-400/80",
  btnPrimary: "bg-gradient-to-r from-amber-500 via-blue-700 to-blue-900 hover:brightness-110 text-white shadow-lg",
  gradientAccent: "from-blue-900 via-amber-400 to-amber-200",
  container: "max-w-6xl mx-auto px-6",
};

// Animation variant for a subtle reveal effect as elements come into view
const reveal = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Reusable Section component to maintain a consistent layout
const Section = ({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: React.ReactNode }) => (
  <section id={id} className="py-24">
    <div className={THEME.container}>
      <motion.header variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center">
        <h2 className={`text-5xl font-extrabold tracking-tight ${THEME.textPrimary}`}>{title}</h2>
        {subtitle ? <p className={`mt-4 text-lg ${THEME.textSecondary} max-w-3xl mx-auto`}>{subtitle}</p> : null}
      </motion.header>
      <div className="mt-8 divider" />
      <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className="mt-12">{children}</motion.div>
    </div>
  </section>
);

// Reusable Card component with a subtle reveal effect
const Card = ({ children }: { children: React.ReactNode }) => (
  <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className={`p-8 rounded-3xl border ${THEME.borderAccent} bg-gradient-to-br from-blue-800/90 to-amber-700/90 text-white shadow-lg`}>
    {children}
  </motion.div>
);

// Reusable Pill component
const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${THEME.borderAccent} text-sm font-medium text-white bg-gradient-to-r from-blue-800/80 to-amber-600/80 shadow-md`}>
    <CheckCircle2 className={`h-4 w-4 ${THEME.accentText}`} /> {children}
  </span>
);

export default function EnglishPage() {
  return (
    <>
      <section id="hero" className={`py-24 ${THEME.container} text-white text-center`}>
        <h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight ${THEME.accentText}`}>Inglés A1-C1: Habla con Confianza</h1>
        <p className="mt-4 text-xl md:text-2xl text-white max-w-3xl mx-auto">
          ¿Quieres dominar el inglés? Nuestros cursos se enfocan en la fluidez verbal, con coaching de acento y evaluaciones CEFR para medir tu progreso. ¡Da el siguiente paso en tu aprendizaje!
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/test" className={`px-8 py-5 rounded-3xl ${THEME.btnPrimary} text-lg font-bold inline-flex items-center gap-3 transform transition hover:scale-105`}>
            <BookOpen className="h-6 w-6" /> Tomar el examen de nivel
          </Link>
          <a href="/#precios" className={`px-8 py-5 rounded-3xl border-2 ${THEME.borderAccent} text-white bg-blue-900/40 hover:bg-amber-500 hover:text-white transition inline-flex items-center gap-3`}>
            <ChevronRight className="h-6 w-6" /> Ver precios
          </a>
        </div>
      </section>

      <Section id="niveles" title="Niveles de Certificación">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <h3 className="font-bold text-xl text-amber-200">Básico (A1-A2)</h3>
            <p className="mt-2 text-white/95">
              Ideal para principiantes. Aprende las bases para comunicarte en situaciones cotidianas, como presentarte, hablar de tu familia y hacer preguntas sencillas.
            </p>
          </Card>
          <Card>
            <h3 className="font-bold text-xl text-amber-200">Intermedio (B1-B2)</h3>
            <p className="mt-2 text-white/95">
              Mejora tu fluidez para hablar con más confianza. Desarrolla habilidades para discutir temas más complejos, tanto en el trabajo como en tu vida personal.
            </p>
          </Card>
          <Card>
            <h3 className="font-bold text-xl text-amber-200">Avanzado (C1)</h3>
            <p className="mt-2 text-white/95">
              Domina el idioma. Perfecciona tu acento y logra una comunicación espontánea y fluida para entornos académicos y profesionales de alto nivel.
            </p>
          </Card>
        </div>
      </Section>
      
      <Section id="metodologia" title="Nuestra Metodología">
        <div className="space-y-6">
          <Card>
            <h3 className="font-bold text-xl text-amber-200">Enfoque en la Fluidez</h3>
            <p className="mt-2 text-white/95">
              Nuestras clases se centran en la práctica oral para que puedas hablar con naturalidad desde el primer día.
            </p>
          </Card>
          <Card>
            <h3 className="font-bold text-xl text-amber-200">Coaching de Acento</h3>
            <p className="mt-2 text-white/95">
              Recibirás retroalimentación personalizada para mejorar tu pronunciación y sonar más como un hablante nativo.
            </p>
          </Card>
          <Card>
            <h3 className="font-bold text-xl text-amber-200">Evaluaciones CEFR</h3>
            <p className="mt-2 text-white/95">
              Medimos tu progreso con evaluaciones basadas en el Marco Común Europeo de Referencia (CEFR) para que sepas exactamente dónde te encuentras.
            </p>
          </Card>
        </div>
      </Section>
    </>
  );
}
