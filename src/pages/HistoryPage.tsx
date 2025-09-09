import React from "react";

const HistoryPage: React.FC = () => {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-extrabold text-rose-400 text-center">Clases de Historia</h2>
        <p className="mt-6 text-lg text-gray-200 text-center max-w-3xl mx-auto">
          Pensamiento crítico, análisis de fuentes y escritura argumentativa.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <div className="p-8 rounded-3xl card-glass">
            <h3 className="text-xl font-bold text-sky-300">Historia Latinoamericana</h3>
            <p className="mt-2 text-white/95">Procesos coloniales, independencia, estados poscoloniales y movimientos sociales.</p>
          </div>
          <div className="p-8 rounded-3xl card-glass">
            <h3 className="text-xl font-bold text-sky-300">Historia Europea</h3>
            <p className="mt-2 text-white/95">De la Antigüedad al siglo XX: revoluciones, guerras, integración y cultura.</p>
          </div>
          <div className="p-8 rounded-3xl card-glass">
            <h3 className="text-xl font-bold text-sky-300">Historia Intelectual</h3>
            <p className="mt-2 text-white/95">Ideas que transformaron el mundo: ciencia, filosofía, política y arte.</p>
          </div>
          <div className="p-8 rounded-3xl card-glass md:col-span-2">
            <h3 className="text-xl font-bold text-sky-300">Temas Especiales</h3>
            <p className="mt-2 text-white/95">Historia ambiental, historia de las mujeres, migraciones, memoria y derechos humanos.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoryPage;
