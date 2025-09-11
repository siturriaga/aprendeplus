import React from "react";
import { motion } from "framer-motion";
// Mantén tu lógica/estado de prueba adaptativa existente aquí…

const fadeUp = { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0, transition: { duration: .5 } } };

export default function EnglishTest() {
  return (
    <>
      {/* Intro banner (fading background) */}
      <section
        className="relative min-h-[36vh] flex items-end overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(rgba(2,6,23,.78), rgba(2,6,23,.78)), url('/images/english-page.png')",
          backgroundSize: "cover", backgroundPosition: "center",
        }}
        aria-label="Fondo Prueba de Inglés"
      >
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-10 text-center">
          <motion.h1 variants={fadeUp} initial="initial" animate="animate" className="text-4xl font-extrabold text-yellow-400">
            Prueba Adaptativa de Inglés
          </motion.h1>
          <motion.p variants={fadeUp} initial="initial" animate="animate" className="mt-3 text-gray-200">
            Basada en niveles CEFR A1–C2 • 14 preguntas
          </motion.p>
        </div>
      </section>

      {/* Tu UI/lógica de la prueba va aquí, sin cambios */}
    </>
  );
}
