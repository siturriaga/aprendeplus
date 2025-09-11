import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../utils";

export default function EnglishPage() {
  return (
    <>
      <section
        className="relative min-h-[45vh] flex items-end overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(rgba(2,6,23,.72), rgba(2,6,23,.72)), url('/images/english-page.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-label="Fondo Inglés"
      >
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12">
          <motion.h1 variants={fadeUp} initial="initial" animate="animate" className="text-4xl md:text-5xl font-extrabold text-yellow-400">
            Inglés A1–C1
          </motion.h1>
          <motion.p variants={fadeUp} initial="initial" animate="animate" className="mt-3 text-lg text-gray-200">
            Conversación, gramática y <span className="text-sky-300 font-semibold">prueba de nivel</span>.
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 text-gray-200">
        {/* ...contenido... */}
      </div>
    </>
  );
}
