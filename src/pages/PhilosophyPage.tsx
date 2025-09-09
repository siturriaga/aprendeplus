import React from "react";

const PhilosophyPage: React.FC = () => {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-extrabold text-rose-400 text-center">Filosofía</h2>
        <p className="mt-6 text-lg text-gray-200 text-center max-w-3xl mx-auto">
          Metafísica, teoría del conocimiento y filosofía política, con enfoque en teoría crítica y pensamiento latinoamericano.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <div className="p-8 rounded-3xl card-glass">
            <h3 className="text-xl font-bold text-sky-300">Metafísica</h3>
            <p className="mt-2 text-white/95">Ser, causalidad, identidad y mundos posibles.</p>
          </div>
          <div className="p-8 rounded-3xl card-glass">
            <h3 className="text-xl font-bold text-sky-300">Teoría Crítica</h3>
            <p className="mt-2 text-white/95">Escuela de Frankfurt, decolonialidad y críticas a la racionalidad instrumental.</p>
          </div>
          <div className="p-8 rounded-3xl card-glass">
            <h3 className="text-xl font-bold text-sky-300">Presocráticos</h3>
            <p className="mt-2 text-white/95">De Tales a Heráclito y Parménides: los orígenes de la filosofía.</p>
          </div>
          <div className="p-8 rounded-3xl card-glass">
            <h3 className="text-xl font-bold text-sky-300">Pensadores Post-antiguos</h3>
            <p className="mt-2 text-white/95">De la escolástica al pensamiento contemporáneo.</p>
          </div>
          <div className="p-8 rounded-3xl card-glass md:col-span-2">
            <h3 className="text-xl font-bold text-sky-300">Temas Especiales</h3>
            <p className="mt-2 text-white/95">Ética aplicada, estética, filosofía de la mente y filosofía de la tecnología.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophyPage;
