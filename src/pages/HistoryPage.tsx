import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, CheckCircle2, Globe, Sparkles } from "lucide-react";

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

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${THEME.borderAccent} text-sm font-medium text-white bg-gradient-to-r from-blue-800/80 to-amber-600/80 shadow-md`}>
    <CheckCircle2 className={`h-4 w-4 ${THEME.accentText}`} /> {children}
  </span>
);

export default function HistoryPage() {
  return (
    <>
      <section id="hero" className={`py-24 ${THEME.container} text-white text-center`}>
        <h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight ${THEME.accentText}`}>Historia: Desde Cursos de Entrada hasta Temas Especiales</h1>
        <p className="mt-4 text-xl md:text-2xl text-white max-w-3xl mx-auto">
          Nuestros cursos de historia son rigurosos, precisos y están alineados con los más altos estándares académicos. Aprende a pensar de forma crítica y a escribir con claridad.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="/#contacto" className={`px-8 py-5 rounded-3xl ${THEME.btnPrimary} text-lg font-bold inline-flex items-center gap-3 transform transition hover:scale-105`}>
            <ChevronRight className="h-6 w-6" /> Inscribirse ahora
          </a>
        </div>
      </section>

      <Section id="cursos" title="Nuestros Cursos de Historia" subtitle="Desde el mundo antiguo hasta la era moderna, adaptamos el temario a tus intereses.">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-bold text-xl text-amber-200">Introducción a la Historia</h3>
            <p className="mt-2 text-white/95">
              Un curso de entrada para entender los principales conceptos, métodos y debates que forman la disciplina de la historia.
            </p>
          </Card>
          <Card>
            <h3 className="font-bold text-xl text-amber-200">Historia Mundial y Geografía</h3>
            <p className="mt-2 text-white/95">
              Explora las interacciones entre civilizaciones y culturas, y cómo la geografía ha influido en la evolución de la humanidad.
            </p>
          </Card>
          <Card>
            <h3 className="font-bold text-xl text-amber-200">Historia de América Latina</h3>
            <p className="mt-2 text-white/95">
              Analiza los eventos clave, las figuras históricas y los movimientos sociales que han dado forma a la región.
            </p>
          </Card>
          <Card>
            <h3 className="font-bold text-xl text-amber-200">Temas de Historia Especiales</h3>
            <p className="mt-2 text-white/95">
              Clases personalizadas sobre temas específicos como la Guerra Fría, historia del arte, o historia de la ciencia y tecnología.
            </p>
          </Card>
        </div>
      </Section>

      <Section id="habilidades" title="Habilidades que Desarrollarás" subtitle="Nuestros cursos de historia te enseñan a pensar, no solo a memorizar.">
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-start gap-4">
              <Globe className="h-8 w-8 text-amber-300" />
              <div>
                <h4 className="font-bold text-xl text-amber-200">Pensamiento Crítico</h4>
                <p className="mt-2 text-base text-white/95">Aprenderás a analizar fuentes, identificar sesgos y construir argumentos sólidos.</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start gap-4">
              <Sparkles className="h-8 w-8 text-amber-300" />
              <div>
                <h4 className="font-bold text-xl text-amber-200">Habilidades de Escritura</h4>
                <p className="mt-2 text-base text-white/95">Mejora tus ensayos y documentos con claridad, precisión y una estructura rigurosa.</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-8 w-8 text-amber-300" />
              <div>
                <h4 className="font-bold text-xl text-amber-200">Investigación Académica</h4>
                <p className="mt-2 text-base text-white/95">Te guiaremos en el uso de bases de datos y bibliotecas para realizar investigaciones de alta calidad.</p>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </>
  );
}
