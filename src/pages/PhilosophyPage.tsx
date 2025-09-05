import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, CheckCircle2, Pen, MessageCircle } from "lucide-react";

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

export default function PhilosophyPage() {
  return (
    <>
      <section id="hero" className={`py-24 ${THEME.container} text-white text-center`}>
        <h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight ${THEME.accentText}`}>Filosofía y Teoría Política</h1>
        <p className="mt-4 text-xl md:text-2xl text-white max-w-3xl mx-auto">
          Cursos rigurosos pero claros que exploran la historia del pensamiento, desde el mundo antiguo hasta el presente. Aprende a construir argumentos y a analizar ideas complejas.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="/#contacto" className={`px-8 py-5 rounded-3xl ${THEME.btnPrimary} text-lg font-bold inline-flex items-center gap-3 transform transition hover:scale-105`}>
            <ChevronRight className="h-6 w-6" /> Inscribirse ahora
          </a>
        </div>
      </section>

      <Section id="cursos" title="Nuestros Cursos de Filosofía">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-bold text-xl text-amber-200">Introducción a la Filosofía</h3>
            <p className="mt-2 text-white/95">
              Un punto de partida para aprender sobre ética, metafísica y lógica.
            </p>
          </Card>
          <Card>
            <h3 className="font-bold text-xl text-amber-200">Teoría Política</h3>
            <p className="mt-2 text-white/95">
              Estudia las ideas detrás de la democracia, el socialismo, el liberalismo y otros sistemas políticos.
            </p>
          </Card>
          <Card>
            <h3 className="font-bold text-xl text-amber-200">Filosofía Latinoamericana</h3>
            <p className="mt-2 text-white/95">
              Analiza las contribuciones de pensadores de la región y sus ideas sobre la identidad y la justicia.
            </p>
          </Card>
          <Card>
            <h3 className="font-bold text-xl text-amber-200">Lógica y Argumentación</h3>
            <p className="mt-2 text-white/95">
              Aprende a identificar falacias y a construir argumentos sólidos y convincentes.
            </p>
          </Card>
        </div>
      </Section>

      <Section id="habilidades" title="Habilidades Clave">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-start gap-4">
              <Pen className="h-8 w-8 text-amber-300" />
              <div>
                <h4 className="font-bold text-xl text-amber-200">Análisis de Texto</h4>
                <p className="mt-2 text-base text-white/95">Mejora tu capacidad para leer y desglosar textos filosóficos complejos.</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start gap-4">
              <MessageCircle className="h-8 w-8 text-amber-300" />
              <div>
                <h4 className="font-bold text-xl text-amber-200">Debate y Diálogo</h4>
                <p className="mt-2 text-base text-white/95">Participa en discusiones críticas sobre conceptos abstractos y argumentos de diferentes autores.</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-8 w-8 text-amber-300" />
              <div>
                <h4 className="font-bold text-xl text-amber-200">Pensamiento Abstracto</h4>
                <p className="mt-2 text-base text-white/95">Entrena tu mente para trabajar con ideas y conceptos que no son tangibles.</p>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
