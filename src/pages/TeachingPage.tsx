import React from "react";

const TeachingPage: React.FC = () => {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-extrabold text-rose-400 text-center">Capacitación Docente</h2>
        <p className="mt-6 text-lg text-gray-200 text-center max-w-3xl mx-auto">
          Programas prácticos para docentes y equipos directivos con enfoque en mejora continua y equidad.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <div className="p-8 rounded-3xl card-glass">
            <h3 className="text-xl font-bold text-sky-300">Instrucción Diferenciada & Diseño Universal (UDL)</h3>
            <p className="mt-2 text-white/95">Planificación para la diversidad, accesibilidad y múltiples medios de representación, acción y compromiso.</p>
          </div>
          <div className="p-8 rounded-3xl card-glass">
            <h3 className="text-xl font-bold text-sky-300">Manejo de Aula & Agrupaciones Heterodoxas</h3>
            <p className="mt-2 text-white/95">Rutinas, normas, restaurativo y agrupaciones flexibles para aprendizaje colaborativo.</p>
          </div>
          <div className="p-8 rounded-3xl card-glass">
            <h3 className="text-xl font-bold text-sky-300">Gamificación</h3>
            <p className="mt-2 text-white/95">Sistemas de puntos, retos, narrativa y feedback inmediato.</p>
          </div>
          <div className="p-8 rounded-3xl card-glass">
            <h3 className="text-xl font-bold text-sky-300">IA como Herramienta</h3>
            <p className="mt-2 text-white/95">Instrumentos de IA para diferenciación, retroalimentación y evaluación formativa con ética y privacidad.</p>
          </div>
        </div>

        <p className="mt-10 text-center text-white/90"><strong>Mínimo: 2 clases por semana</strong>. Descuentos para grupos y redes escolares.</p>
      </div>
    </section>
  );
};

export default TeachingPage;
