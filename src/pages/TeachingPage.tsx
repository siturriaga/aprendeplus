import React from "react";
import { motion } from "framer-motion";
const fade = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: .5 } } };

export default function TeachingPage() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h1 variants={fade} initial="initial" animate="animate" className="text-5xl font-extrabold text-rose-400">Capacitación Docente</motion.h1>
        <motion.p variants={fade} initial="initial" animate="animate" className="mt-4 text-lg text-gray-200">
          Instrucción diferenciada, Diseño Universal para el Aprendizaje (DUA), manejo de aula,
          agrupamientos heterodoxos, gamificación y uso de IA como herramienta pedagógica.
        </motion.p>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="card-glass p-6"><h3 className="font-bold text-xl text-sky-300">Instrucción Diferenciada</h3><p className="mt-2">Adaptaciones para estilos, niveles y ritmos de aprendizaje.</p></div>
          <div className="card-glass p-6"><h3 className="font-bold text-xl text-sky-300">DUA</h3><p className="mt-2">Accesibilidad, múltiples medios de compromiso y representación.</p></div>
          <div className="card-glass p-6"><h3 className="font-bold text-xl text-sky-300">IA en el Aula</h3><p className="mt-2">Herramientas prácticas, ética y evaluación auténtica.</p></div>
        </div>
      </div>
    </section>
  );
}
