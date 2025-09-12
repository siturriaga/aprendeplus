import React from "react";
import { motion } from "framer-motion";
const fade = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: .5 } } };

export default function PhilosophyPage() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h1 variants={fade} initial="initial" animate="animate" className="text-5xl font-extrabold text-rose-400">Filosofía</motion.h1>
        <motion.p variants={fade} initial="initial" animate="animate" className="mt-4 text-lg text-gray-200">
          Metafísica, teoría crítica, presocráticos y pensadores posteriores; seminarios temáticos especiales.
        </motion.p>
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <div className="card-glass p-6"><h3 className="font-bold text-xl text-sky-300">Clásicos</h3><p className="mt-2">Presocráticos, Platón, Aristóteles, helenismo y medievales.</p></div>
          <div className="card-glass p-6"><h3 className="font-bold text-xl text-sky-300">Modernos y Contemporáneos</h3><p className="mt-2">Racionalismo, empirismo, crítica, fenomenología y teoría crítica.</p></div>
        </div>
      </div>
    </section>
  );
}
