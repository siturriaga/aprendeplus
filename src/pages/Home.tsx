import React, { useContext } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Languages,
  School,
  Users,
  Tag,
  Mail,
} from "lucide-react";
import { CurrencyContext } from "../App";

const Card: React.FC<React.PropsWithChildren> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="p-8 rounded-3xl card-glass shadow-xl"
  >
    {children}
  </motion.div>
);

const usePrice = () => {
  const { currency, rate } = useContext(CurrencyContext);
  const conv = (clp: number) =>
    currency === "CLP"
      ? `CLP $${clp.toLocaleString("es-CL")}`
      : `USD $${(clp / rate).toFixed(2)}`;
  return conv;
};

const PriceRow: React.FC<{ clp: number }> = ({ clp }) => {
  const conv = usePrice();
  return (
    <p className="text-2xl font-extrabold text-rose-400">
      {conv(clp)}{" "}
      <span className="text-sm text-gray-300 font-normal">por clase</span>
    </p>
  );
};

const Home: React.FC = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative hero-bg py-24 md:py-32 overflow-hidden min-h-[70vh] flex items-center">
        <div className="relative z-10 text-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto px-6"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              <span className="text-fuchsia-800">Cursos de Historia y Filosofía.</span>
              <br />
              <span className="text-rose-800">Clases de Inglés de Calidad.</span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-white/95 font-medium">
              Aprende más allá del aula. Clases flexibles, personalizadas y con materiales digitales incluidos.
            </p>
            <div className="mt-8 flex justify-center flex-wrap gap-4">
              <a href="/english" className="btn-gradient">
                Quiero clases
              </a>
              <a href="#programas" className="btn-outline">
                Ver programas
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Credenciales */}
      <section className="py-10 bg-slate-900/50 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid gap-6 md:grid-cols-3 text-center">
          <div className="flex flex-col items-center">
            <GraduationCap className="h-8 w-8 text-rose-400" />
            <p className="mt-2 text-white/95 font-semibold">
              Profesionales en EE. UU. con <span className="text-sky-300">Bachelor, Master y PhD</span>
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Users className="h-8 w-8 text-rose-400" />
            <p className="mt-2 text-white/95 font-semibold">
              <span className="text-sky-300">20+ años</span> de experiencia docente
            </p>
          </div>
          <div className="flex flex-col items-center">
            <Users className="h-8 w-8 text-rose-400" />
            <p className="mt-2 text-white/95 font-semibold">
              <span className="text-sky-300">1500+</span> estudiantes enseñados y acompañados
            </p>
          </div>
        </div>
      </section>

      {/* Programas y precios */}
      <section id="programas" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-extrabold text-rose-400 text-center"
          >
            Programas y precios
          </motion.h2>

          <p className="mt-6 text-lg text-gray-200 text-center max-w-3xl mx-auto">
            Cada curso requiere un mínimo de <span className="text-sky-300 font-semibold">2 clases por semana</span>. Ofrecemos <span className="text-sky-300 font-semibold">descuentos para grupos</span>.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {/* Inglés */}
            <Card>
              <div className="flex items-start gap-4">
                <Languages className="h-8 w-8 text-sky-300" />
                <div>
                  <h3 className="font-bold text-xl text-sky-300">Inglés A1–C1</h3>
                  <p className="mt-2 text-white/95">
                    Clases personalizadas para todos los niveles, con énfasis en conversación y gramática. Incluye <strong>prueba de nivel</strong>.
                  </p>
                  <PriceRow clp={20000} />
                  <a href="/english" className="inline-block mt-4 text-sky-300 hover:underline">
                    Ver más →
                  </a>{" "}
                  <a href="/english-test" className="inline-block mt-4 ml-3 text-rose-300 hover:underline">
                    Hacer prueba de nivel →
                  </a>
                </div>
              </div>
            </Card>

            {/* Historia y Filosofía */}
            <Card>
              <div className="flex items-start gap-4">
                <BookOpen className="h-8 w-8 text-sky-300" />
                <div>
                  <h3 className="font-bold text-xl text-sky-300">Historia y Filosofía</h3>
                  <p className="mt-2 text-white/95">
                    Explora la historia latinoamericana, europea e intelectual, junto con temas especiales de filosofía (metafísica, teoría crítica, presocráticos y pensadores posteriores).
                  </p>
                  <PriceRow clp={25000} />
                  <a href="/philosophy" className="inline-block mt-4 text-sky-300 hover:underline">
                    Ver más →
                  </a>
                </div>
              </div>
            </Card>

            {/* Capacitación Docente */}
            <Card>
              <div className="flex items-start gap-4">
                <School className="h-8 w-8 text-sky-300" />
                <div>
                  <h3 className="font-bold text-xl text-sky-300">Capacitación Docente</h3>
                  <p className="mt-2 text-white/95">
                    Aprende sobre instrucción diferenciada, diseño universal para el aprendizaje (DUA), manejo de aula, agrupamientos heterodoxos, gamificación y uso de IA en la enseñanza.
                  </p>
                  <PriceRow clp={30000} />
                  <a href="/teaching" className="inline-block mt-4 text-sky-300 hover:underline">
                    Ver más →
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Sobre nosotros */}
      <section id="sobre" className="py-24 bg-slate-900/40 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-extrabold text-fuchsia-400"
          >
            Sobre nosotros
          </motion.h2>
          <p className="mt-6 text-lg text-gray-200">
            Somos un grupo de educadores basados en los Estados Unidos, con títulos de <strong>Bachelor</strong>, <strong>Master</strong> y <strong>PhD</strong>. Tenemos más de <strong>20 años de experiencia</strong> y somos expertos en nuestras áreas.
          </p>
          <p className="mt-6 text-lg text-gray-200">
            Nuestra filosofía educativa se centra en la <span className="text-sky-300 font-semibold">inclusión, pensamiento crítico y aprendizaje activo</span>. Creemos en un aula donde la diversidad cultural y cognitiva es una fortaleza. Promovemos la colaboración, la equidad en el acceso al conocimiento, y el uso innovador de la tecnología y la inteligencia artificial como herramientas para potenciar el aprendizaje.
          </p>
        </div>
      </section>

      {/* Contáctanos */}
      <section id="contacto" className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-extrabold text-rose-400 text-center"
          >
            Contáctanos
          </motion.h2>
          <p className="mt-4 text-lg text-gray-300 text-center">
            ¿Tienes preguntas? Escríbenos y nos pondremos en contacto contigo.
          </p>
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            className="mt-8 space-y-4"
          >
            <input type="hidden" name="form-name" value="contact" />
            <input
              className="w-full px-4 py-3 rounded-xl border bg-white/95 text-slate-950 placeholder:text-gray-500"
              placeholder="Nombre"
              type="text"
              name="name"
              required
            />
            <input
              className="w-full px-4 py-3 rounded-xl border bg-white/95 text-slate-950 placeholder:text-gray-500"
              placeholder="Correo electrónico"
              type="email"
              name="email"
              required
            />
            <textarea
              className="w-full px-4 py-3 rounded-xl border bg-white/95 text-slate-950 placeholder:text-gray-500"
              rows={4}
              placeholder="Tu mensaje"
              name="message"
              required
            />
            <button type="submit" className="btn-gradient flex items-center gap-2">
              <Mail className="h-5 w-5" /> Enviar
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Home;
