import React from "react";
import { motion } from "framer-motion";
const fade = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: .5 } } };

export default function HistoryPage() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h1 variants={fade} initial="initial" animate="animate" className="text-5xl font-extrabold text-rose-400">Historia</motion.h1>
        <motion.p variants={fade} initial="initial" animate="animate" className="mt-4 text-lg text-gray-200">
          Latinoamericana, europea e intelectual. Pensamiento crítico, análisis de fuentes y temas especiales.
        </motion.p>
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <div className="card-glass p-6"><h3 className="font-bold text-xl text-sky-300">Latinoamérica</h3><p className="mt-2">Independencias, modernización, movimientos sociales, historia reciente.</p></div>
          <div className="card-glass p-6"><h3 className="font-bold text-xl text-sky-300">Europa</h3><p className="mt-2">Antigüedad a contemporáneo; guerras, integración, cultura e ideas.</p></div>
        </div>
      </div>
    </section>
  );
}
