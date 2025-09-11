import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function EnglishPage() {
  return (
    <>
      {/* Banner with fading background */}
      <section
        className="relative min-h-[45vh] flex items-end overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(2,6,23,0.72), rgba(2,6,23,0.72)), url('/images/english-page.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-label="Fondo decorativo de Inglés"
      >
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12">
          <motion.h1
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="text-4xl md:text-5xl font-extrabold text-yellow-400"
          >
            Inglés A1–C1
          </motion.h1>
          <motion.p
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="mt-3 text-lg text-gray-200"
          >
            Conversación, gramática y{" "}
            <span className="text-sky-300 font-semibold">prueba de nivel</span>.
          </motion.p>
        </div>
      </section>

      {/* Your existing English content below */}
      <div className="max-w-6xl mx-auto px-6 py-16 text-gray-200">
        {/* ...contenido de Inglés... */}
      </div>
    </>
  );
}
