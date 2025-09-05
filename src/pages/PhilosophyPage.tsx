import React from "react";

export default function PhilosophyPage() {
  return (
    <div className="py-24 max-w-6xl mx-auto px-6 text-white text-center">
      <h1 className="text-5xl font-extrabold tracking-tight text-amber-200">Filosofía y Teoría Política</h1>
      <p className="mt-4 text-xl md:text-2xl text-white max-w-3xl mx-auto">
        Explora las ideas que han moldeado nuestro mundo. Desde Aristóteles hasta Dussel, nuestros cursos son rigurosos y al mismo tiempo claros para que puedas comprender los conceptos más complejos.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <a href="/#contacto" className="px-8 py-5 rounded-3xl bg-gradient-to-r from-amber-500 via-blue-700 to-blue-900 hover:brightness-110 text-white shadow-lg text-lg font-bold inline-flex items-center gap-3 transform transition hover:scale-105">
          <span className="h-6 w-6">🧠</span> Más información
        </a>
      </div>
    </div>
  );
}
