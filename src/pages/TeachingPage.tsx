import React from "react";

export default function TeachingPage() {
  return (
    <div className="py-24 max-w-6xl mx-auto px-6 text-white text-center">
      <h1 className="text-5xl font-extrabold tracking-tight text-amber-200">Capacitación Docente</h1>
      <p className="mt-4 text-xl md:text-2xl text-white max-w-3xl mx-auto">
        Lleva tu enseñanza al siguiente nivel. Nuestros cursos de capacitación cubren educación secundaria, integración de inteligencia artificial, gamificación e instrucción diferenciada.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <a href="/#contacto" className="px-8 py-5 rounded-3xl bg-gradient-to-r from-amber-500 via-blue-700 to-blue-900 hover:brightness-110 text-white shadow-lg text-lg font-bold inline-flex items-center gap-3 transform transition hover:scale-105">
          <span className="h-6 w-6">👨‍🏫</span> Más información
        </a>
      </div>
    </div>
  );
}
