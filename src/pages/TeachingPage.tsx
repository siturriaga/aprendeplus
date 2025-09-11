import React from "react";
import { motion } from "framer-motion";
const fadeUp = { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0, transition: { duration: .5 } } };

export default function TeachingPage() {
  return (
    <>
      <section
        className="relative min-h-[45vh] flex items-end overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(rgba(2,6,23,.75), rgba(2,6,23,.75)), url('/images/docencia.png')",
          backgroundSize: "cover", backgroundPosition: "center",
        }}
        aria-label="Fondo Capacitación Docente"
      >
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12">
          <motion.h1 variants={fadeUp} initial="initial" animate="animate" className="text-4xl md:text-5xl font-extrabold text-yellow-400">
            Capacitación Docente
          </motion.h1>
          <motion.p variants={fadeUp} initial="initial" animate="animate" className="mt-3 text-lg text-gray-200">
            Instrucción diferenciada, DUA, manejo de aula, agrupamientos heterodoxos, gamificación y uso de IA.
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 text-gray-200">
        {/* …contenido de Docencia… */}
      </div>
    </>
  );
}
