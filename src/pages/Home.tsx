import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Languages, School, Tag, Mail, Users, GraduationCap } from "lucide-react";
import emailjs from "@emailjs/browser";
import { CurrencyContext } from "../App";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Card: React.FC<React.PropsWithChildren> = ({ children }) => (
  <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} className="p-8 rounded-3xl card-glass">
    {children}
  </motion.div>
);

const usePrice = () => {
  const { currency, rate } = useContext(CurrencyContext);
  return (clp: number) =>
    currency === "CLP" ? `CLP $${clp.toLocaleString("es-CL")}` : `USD $${(clp / rate).toFixed(2)}`;
};

const PriceRow: React.FC<{ clp: number }> = ({ clp }) => {
  const conv = usePrice();
  return <p className="text-2xl font-extrabold text-yellow-400">{conv(clp)} <span className="text-sm text-gray-300 font-normal">por clase</span></p>;
};

export default function Home() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<string | null>(null);

  const handleContactSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    setSending(true);
    setSent(null);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { to_email: "adaprendemas@outlook.com", sender_name: name, sender_email: email, message, form: "Contacto (Sitio)" },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "form-name": "contact", name, email, message }).toString(),
      });
      setSent("¡Mensaje enviado! Te responderemos pronto.");
      form.reset();
    } catch {
      setSent("No se pudo enviar. Intenta nuevamente.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* Gradient hero (no photo) */}
      <section className="relative hero-bg min-h-[60vh] flex items-center">
        <div className="relative z-10 w-full text-center">
          <motion.div variants={fadeUp} initial="initial" animate="animate" className="max-w-4xl mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white">
              <span className="text-yellow-400">Cursos de Historia y Filosofía.</span><br />
              <span className="text-sky-300">Clases de Inglés de Calidad.</span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-200">
              Clases personalizadas, flexibles y con materiales digitales incluidos.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <a href="/english" className="btn-gradient">Quiero clases</a>
              <a href="#programas" className="btn-outline">Ver programas</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Credenciales */}
      <section className="py-10 bg-slate-900/50 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid gap-6 md:grid-cols-3 text-center">
          <Card>
            <GraduationCap className="h-8 w-8 text-yellow-400 mx-auto" />
            <p className="mt-2 text-white/95 font-semibold">Profesionales en EE. UU. con Bachelor, Master y PhD</p>
          </Card>
          <Card>
            <Users className="h-8 w-8 text-yellow-400 mx-auto" />
            <p className="mt-2 text-white/95 font-semibold">20+ años de experiencia docente</p>
          </Card>
          <Card>
            <Users className="h-8 w-8 text-yellow-400 mx-auto" />
            <p className="mt-2 text-white/95 font-semibold">1500+ estudiantes enseñados</p>
          </Card>
        </div>
      </section>

      {/* Programas y precios */}
      <section id="programas" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2 variants={fadeUp} initial="initial" whileInView="animate" viewport={{ once: true }} className="text-5xl font-extrabold text-yellow-400 text-center">
            Programas y precios
          </motion.h2>
          <p className="mt-6 text-lg text-gray-200 text-center max-w-3xl mx-auto">
            Mínimo de <span className="font-semibold text-sky-300">2 clases por semana</span>. <span className="font-semibold text-sky-300">Descuentos para grupos</span>.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <Card>
              <div className="flex items-start gap-4">
                <Languages className="h-8 w-8 text-sky-300" />
                <div>
                  <h3 className="font-bold text-xl text-sky-300">Inglés A1–C1</h3>
                  <p className="mt-2 text-white/95">Conversación y gramática. Incluye <strong>prueba de nivel</strong>.</p>
                  <PriceRow clp={20000} />
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a href="/english" className="text-sky-300 hover:underline">Ver más →</a>
                    <a href="/english-test" className="text-yellow-400 hover:underline">Hacer prueba →</a>
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-start gap-4">
                <BookOpen className="h-8 w-8 text-sky-300" />
                <div>
                  <h3 className="font-bold text-xl text-sky-300">Historia y Filosofía</h3>
                  <p className="mt-2 text-white/95">Historia latinoamericana/europea e intelectual; filosofía clásica y moderna.</p>
                  <PriceRow clp={25000} />
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a href="/history" className="text-sky-300 hover:underline">Historia →</a>
                    <a href="/philosophy" className="text-sky-300 hover:underline">Filosofía →</a>
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <div className="flex items-start gap-4">
                <School className="h-8 w-8 text-sky-300" />
                <div>
                  <h3 className="font-bold text-xl text-sky-300">Capacitación Docente</h3>
                  <p className="mt-2 text-white/95">Instrucción diferenciada, DUA, manejo de aula, gamificación y uso de IA.</p>
                  <PriceRow clp={30000} />
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a href="/teaching" className="text-sky-300 hover:underline">Ver más →</a>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/90">
            <Tag className="w-4 h-4" />
            <span>Descuentos para grupos según tamaño y frecuencia.</span>
          </div>
        </div>
      </section>

      {/* Sobre nosotros */}
      <section id="sobre" className="py-24 bg-slate-900/40 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-extrabold text-yellow-400">Sobre nosotros</h2>
          <p className="mt-6 text-lg text-gray-200">
            Somos educadores basados en EE. UU., con grados de Bachelor, Master y PhD.
            Más de 20 años de experiencia y especialización en nuestras áreas.
          </p>
          <p className="mt-6 text-lg text-gray-200">
            Nuestra filosofía: inclusión, pensamiento crítico y aprendizaje activo; colaboración, equidad y uso ético de la IA para potenciar el aprendizaje.
          </p>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-yellow-400 text-center">Contáctanos</h2>
          <p className="mt-4 text-lg text-gray-300 text-center">¿Preguntas? Escríbenos y te respondemos.</p>
          <form name="contact" data-netlify="true" onSubmit={handleContactSubmit} className="mt-8 space-y-4">
            <input type="hidden" name="form-name" value="contact" />
            <input className="w-full px-4 py-3 rounded-xl border bg-white/95 text-slate-950 placeholder:text-gray-500" placeholder="Nombre" name="name" required />
            <input className="w-full px-4 py-3 rounded-xl border bg-white/95 text-slate-950 placeholder:text-gray-500" type="email" placeholder="Correo" name="email" required />
            <textarea className="w-full px-4 py-3 rounded-xl border bg-white/95 text-slate-950 placeholder:text-gray-500" rows={4} placeholder="Tu mensaje" name="message" required />
            <button type="submit" className="btn-gradient flex items-center gap-2">
              <Mail className="h-5 w-5" /> {sending ? "Enviando..." : "Enviar"}
            </button>
            {sent && <p className="text-sky-300 text-sm mt-2">{sent}</p>}
          </form>
        </div>
      </section>
    </>
  );
}
