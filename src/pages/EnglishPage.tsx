import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, ChevronRight } from "lucide-react";

export default function EnglishPage() {
  return (
    <div className="py-24 max-w-6xl mx-auto px-6 text-white text-center">
      <h1 className="text-5xl font-extrabold tracking-tight text-amber-200">Inglés A1-C1: Habla con Confianza</h1>
      <p className="mt-4 text-xl md:text-2xl text-white max-w-3xl mx-auto">
        ¿Quieres dominar el inglés? Nuestros cursos se enfocan en la fluidez verbal, con coaching de acento y evaluaciones CEFR para medir tu progreso. ¡Da el siguiente paso en tu aprendizaje!
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link to="/test" className="px-8 py-5 rounded-3xl bg-gradient-to-r from-amber-500 via-blue-700 to-blue-900 hover:brightness-110 text-white shadow-lg text-lg font-bold inline-flex items-center gap-3 transform transition hover:scale-105">
          <BookOpen className="h-6 w-6" /> Tomar el examen de nivel
        </Link>
        <a href="/#precios" className="px-8 py-5 rounded-3xl border-2 border-amber-400/80 text-white bg-blue-900/40 hover:bg-amber-500 hover:text-white transition inline-flex items-center gap-3">
          <ChevronRight className="h-6 w-6" /> Inscribirme
        </a>
      </div>
    </div>
  );
}
