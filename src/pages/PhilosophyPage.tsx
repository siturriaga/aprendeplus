import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const THEME = {
  textPrimary: "text-white",
  textSecondary: "text-amber-100",
  accentText: "text-amber-300",
  borderAccent: "border-amber-400/80",
  btnPrimary: "bg-gradient-to-r from-amber-500 via-blue-700 to-blue-900 hover:brightness-110 text-white shadow-lg",
  gradientAccent: "from-blue-900 via-amber-400 to-amber-200",
  container: "max-w-6xl mx-auto px-6",
};

export default function PhilosophyPage() {
  return (
    <div className={`py-24 ${THEME.container} text-white text-center`}>
      <h1 className={`text-5xl font-extrabold tracking-tight ${THEME.accentText}`}>Filosofía y Teoría Política</h1>
      <p className="mt-4 text-xl md:text-2xl text-white max-w-3xl mx-auto">
        Desde Aristóteles hasta pensadores contemporáneos. Nuestros cursos son rigurosos pero claros, diseñados para abrirte las puertas a nuevas formas de pensar.
      </p>
      <div className="mt-10">
        <a href="/#contacto" className={`px-8 py-5 rounded-3xl ${THEME.btnPrimary} text-lg font-bold inline-flex items-center gap-3 transform transition hover:scale-105`}>
          <ChevronRight className="h-6 w-6" /> Inscribirse ahora
        </a>
      </div>
    </div>
  );
}
