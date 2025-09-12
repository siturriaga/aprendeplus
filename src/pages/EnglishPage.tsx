import React from "react";
import { motion } from "framer-motion";
const fade = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: .5 } } };

export default function EnglishPage() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h1 variants={fade} initial="initial" animate="animate" className="text-5xl font-extrabold text-rose-400">Inglés A1–C1</motion.h1>
        <motion.p variants={fade} initial="initial" animate="animate" className="mt-4 text-lg text-gray-200">
          Clases personalizadas para todos los niveles, con énfasis en conversación y gramática. Incluye prueba de nivel gratuita.
        </motion.p>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <div className="card-glass p-6"><h3 className="font-bold text-xl text-sky-300">A1–A2</h3><p className="mt-2">Vocabulario esencial, frases cotidianas, gramática básica.</p></div>
          <div className="card-glass p-6"><h3 className="font-bold text-xl text-sky-300">B1–B2</h3><p className="mt-2">Fluidez intermedia, conversación compleja, vocabulario profesional.</p></div>
          <div className="card-glass p-6"><h3 className="font-bold text-xl text-sky-300">C1</h3><p className="mt-2">Pronunciación, precisión y espontaneidad en comunicación avanzada.</p></div>
        </div>
        <a href="/english-test" className="btn-primary mt-8 inline-flex">Hacer prueba de nivel</a>
      </div>
    </section>
  );
}
