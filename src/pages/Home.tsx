import React, { useContext } from "react";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Languages, School, Users, Tag } from "lucide-react";
import { CurrencyContext } from "../App";

const Card: React.FC<React.PropsWithChildren> = ({ children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="p-8 rounded-3xl card-glass shadow-xl">
    {children}
  </motion.div>
);

const usePrice = () => {
  const { currency, rate } = useContext(CurrencyContext);
  const conv = (clp: number) => (currency === "CLP" ? `CLP $${clp.toLocaleString("es-CL")}` : `USD $${(clp / rate).toFixed(2)}`);
  return conv;
};

const PriceRow: React.FC<{ clp: number }> = ({ clp }) => {
  const conv = usePrice();
  return <p className="text-2xl font-extrabold text-rose-400">{conv(clp)} <span className="text-sm text-gray-300 font-normal">por clase</span></p>;
};

const Home: React.FC = () => {
  const conv = usePrice();
  return (
    <>
      {/* Hero */}
      <section className="relative hero-bg py-24 md:py-32 overflow-hidden min-h-[70vh] flex items-center">
        <div className="relative z-10 text-center w-full">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              <span className="text-fuchsia-800">Cursos de Historia y Filosofía.</span><br />
              <span className="text-rose-800">Clases de Inglés de Calidad.</span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-white/95 font-medium">Aprende más allá del aula. Clases flexibles, personalizadas y con materiales digitales incluidos.</p>
            <div className="mt-8 flex justify-center flex-wrap gap-4">
              <a href="/english" className="px-6 py-3 rounded-2xl bg-gradient-to-r from-fuchsia-500 to-sky-500 text-white font-bold hover:scale-105 transition-transform shadow-lg">Quiero clases</a>
              <a href="#programas" className="px-6 py-3 rounded-2xl bg-white/20 border border-white/30 text-white font-bold hover:bg-white/30 transition-colors">Ver programas</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Credenciales */}
      <section className="py-10 bg-slate-900/50 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid gap-6 md:grid-cols-3 text-center">
          <div className="flex flex-col items-center"><GraduationCap className="h-8 w-8 text-rose-400" /><p className="mt-2 text-white/95 font-semibold">Profesionales en EE. UU. con <span className="text-sky-300">Bachelor, Master y PhD</span></p></div>
          <div className="flex flex-col items-center"><Users className="h-8 w-8 text-rose-400" /><p className="mt-2 text-white/95 font-semibold"><span className="text-sky-300">20+ años</span> de experiencia docente</p></div>
          <div className="flex flex-col items-center"><Users className="h-8 w-8 text-rose-400" /><p className="mt-2 text-white/95 font-semibold"><span className="text-sky-300">1500+</span> estudiantes enseñados y acompañados</p></div>
        </div>
      </section>

      {/* Programas y precios */}
      <section id="programas" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl font-extrabold text-rose-400 text-center">Programas y precios</motion.h2>
          <p className="mt-6 text-lg text-gray-200 text-center max-w-3xl mx-auto">Descuentos para grupos. <strong>Mínimo: 2 clases por semana</strong>.</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <Card>
              <div className="flex items-start gap-4">
                <Languages className="h-8 w-8 text-sky-300" />
                <div>
                  <h3 className="font-bold text-xl text-sky-300">Inglés A1–C1</h3>
                  <p className="mt-2 text-white/95">Clases personalizadas para todos los niveles, con énfasis en conversación y gramática. Incluye <span className="font-semibold">prueba de nivel</span> para ubicarte.</p>
                  <div className="mt-3"><PriceRow clp={20000} /></div>
                  <div className="mt-3"><a href="/english" className="text-sky-300 hover:underline">Ver más →</a> <a href="/english-test" className="ml-3 text-rose-300 hover:underline">Prueba de nivel →</a></div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-4">
                <BookOpen className="h-8 w-8 text-sky-300" />
                <div>
                  <h3 className="font-bold text-xl text-sky-300">Historia y Filosofía</h3>
                  <p className="mt-2 text-white/95">Explora pensamiento crítico y eventos que moldearon el mundo.</p>
                  <div className="mt-3"><PriceRow clp={25000} /></div>
                  <a href="/philosophy" className="inline-block mt-3 text-sky-300 hover:underline">Ver más →</a>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-4">
                <School className="h-8 w-8 text-sky-300" />
                <div>
                  <h3 className="font-bold text-xl text-sky-300">Capacitación Docente</h3>
                  <p className="mt-2 text-white/95">Instrucción diferenciada, Diseño Universal, manejo de aula, agrupaciones heterodoxas, gamificación y uso de IA como herramienta.</p>
                  <div className="mt-3"><PriceRow clp={30000} /></div>
                  <a href="/teaching" className="inline-block mt-3 text-sky-300 hover:underline">Ver más →</a>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-4">
                <GraduationCap className="h-8 w-8 text-sky-300" />
                <div>
                  <h3 className="font-bold text-xl text-sky-300">Clases Bilingües</h3>
                  <p className="mt-2 text-white/95">Inmersión total en un ambiente bilingüe para un aprendizaje más rápido.</p>
                  <div className="mt-3"><PriceRow clp={20000} /></div>
                  <a href="/english" className="inline-block mt-3 text-sky-300 hover:underline">Ver más →</a>
                </div>
              </div>
            </Card>
          </div>

          {/* Nota de descuentos */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/90">
            <Tag className="w-4 h-4" />
            <span>Descuentos para grupos: consulta valores por tamaño de grupo y frecuencia.</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
