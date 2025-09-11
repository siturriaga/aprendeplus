import React, { useContext, useState, useRef } from "react";
import { motion } from "framer-motion";
import { BookOpen, Languages, School, Tag, Mail, Users, GraduationCap } from "lucide-react";
import emailjs from "@emailjs/browser";
import { CurrencyContext } from "../App";
import { fadeUp } from "../utils";

const Card: React.FC<React.PropsWithChildren> = ({ children }) => (
  <motion.div
    variants={fadeUp}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    className="p-8 rounded-3xl card-glass"
  >
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
  return (
    <p className="text-2xl font-extrabold text-yellow-400">
      {conv(clp)} <span className="text-sm text-gray-300 font-normal">por clase</span>
    </p>
  );
};

const Home: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (formRef.current) {
        await emailjs.sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          formRef.current,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        alert("¡Mensaje enviado con éxito! Te contactaremos a la brevedad.");
        formRef.current.reset();
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section id="hero" className="hero-bg min-h-[90vh] flex items-center">
        {/* ... Hero content ... */}
      </section>

      {/* Programas */}
      <section id="programas" className="py-24">
        {/* ... Programas content ... */}
      </section>

      {/* Opiniones */}
      <section id="opiniones" className="py-24 bg-blue-900/30">
        {/* ... Opiniones content ... */}
      </section>

      {/* Precios */}
      <section id="precios" className="py-24">
        {/* ... Precios content ... */}
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-yellow-400 text-center">Contáctanos</h2>
          <p className="mt-4 text-lg text-gray-300 text-center">¿Preguntas? Escríbenos y te respondemos.</p>
          <form ref={formRef} onSubmit={handleContactSubmit} className="mt-8 space-y-4">
            <input className="w-full px-4 py-3 rounded-xl border bg-white/95 text-slate-950 placeholder:text-gray-500" placeholder="Nombre" name="name" required />
            <input className="w-full px-4 py-3 rounded-xl border bg-white/95 text-slate-950 placeholder:text-gray-500" type="email" placeholder="Correo" name="email" required />
            <textarea className="w-full px-4 py-3 rounded-xl border bg-white/95 text-slate-950 placeholder:text-gray-500" rows={4} placeholder="Tu mensaje" name="message" required />
            <button type="submit" disabled={isSubmitting} className="btn-gradient flex items-center gap-2">
              {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
              <Mail className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Home;
