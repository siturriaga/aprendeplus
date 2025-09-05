import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, CheckCircle2, MessageSquare, Lightbulb, Users } from "lucide-react";

// Theming and components reused from Home page
const THEME = {
  textPrimary: "text-white",
  textSecondary: "text-amber-100",
  accentText: "text-amber-300",
  borderAccent: "border-amber-400/80",
  btnPrimary: "bg-gradient-to-r from-amber-500 via-blue-700 to-blue-900 hover:brightness-110 text-white shadow-lg",
  gradientAccent: "from-blue-900 via-amber-400 to-amber-200",
  container: "max-w-6xl mx-auto px-6",
};

const reveal = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

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

const Card = ({ children }: { children: React.ReactNode }) => (
  <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true }} className={`p-8 rounded-3xl border ${THEME.borderAccent} bg-gradient-to-br from-blue-800/90 to-amber-700/90 text-white shadow-lg`}>
    {children}
  </motion.div>
);

export default function TeachingPage() {
  return (
    <>
      <section id="hero" className={`py-24 ${THEME.container} text-white text-center`}>
        <h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight ${THEME.accentText}`}>Capacitación Docente</h1>
        <p className="mt-4 text-xl md:text-2xl text-white max-w-3xl mx-auto">
          Cursos de capacitación para docentes de secundaria. Perfecciona tu pedagogía y mantente al día con las últimas metodologías de enseñanza.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="/#contacto" className={`px-8 py-5 rounded-3xl ${THEME.btnPrimary} text-lg font-bold inline-flex items-center gap-3 transform transition hover:scale-105`}>
            <ChevronRight className="h-6 w-6" /> Inscribirse ahora
          </a>
        </div>
      </section>

      <Section id="cursos" title="Nuestros Cursos de Pedagogía" subtitle="Cursos para desarrollar habilidades y mejorar tu práctica docente.">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-bold text-xl text-amber-200">Enseñanza Secundaria</h3>
            <p className="mt-2 text-white/95">
              Desde planificación de clases hasta estrategias para el aula.
            </p>
          </Card>
          <Card>
            <h3 className="font-bold text-xl text-amber-200">Integración de IA</h3>
            <p className="mt-2 text-white/95">
              Aprende a usar herramientas de Inteligencia Artificial para potenciar tu enseñanza.
            </p>
          </Card>
          <Card>
            <h3 className="font-bold text-xl text-amber-200">Gamificación</h3>
            <p className="mt-2 text-white/95">
              Descubre cómo hacer tus clases más interactivas y divertidas usando principios de juegos.
            </p>
          </Card>
          <Card>
            <h3 className="font-bold text-xl text-amber-200">Instrucción Diferenciada</h3>
            <p className="mt-2 text-white/95">
              Adapta tu currículo para satisfacer las necesidades de cada estudiante en el aula.
            </p>
          </Card>
        </div>
      </Section>

      <Section id="habilidades" title="Habilidades Clave para Docentes">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-start gap-4">
              <MessageSquare className="h-8 w-8 text-amber-300" />
              <div>
                <h4 className="font-bold text-xl text-amber-200">Comunicación Efectiva</h4>
                <p className="mt-2 text-base text-white/95">Mejora la forma en que te comunicas con tus estudiantes y padres de familia.</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start gap-4">
              <Lightbulb className="h-8 w-8 text-amber-300" />
              <div>
                <h4 className="font-bold text-xl text-amber-200">Pensamiento Innovador</h4>
                <p className="mt-2 text-base text-white/95">Aprende a desarrollar soluciones creativas para los desafíos pedagógicos modernos.</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start gap-4">
              <Users className="h-8 w-8 text-amber-300" />
              <div>
                <h4 className="font-bold text-xl text-amber-200">Manejo de Aula</h4>
                <p className="mt-2 text-base text-white/95">Estrategias prácticas para mantener un ambiente de aprendizaje productivo y positivo.</p>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
