import { useState } from "react";
import { useTranslation } from "react-i18next";

import { SEO } from "../components/atoms/SEO";

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-white">
      <SEO title={t("nav.contact") ?? "Contacto"} description={t("contact.subtitle") ?? undefined} />
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16 lg:flex-row">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-semibold text-base">{t("contact.title")}</h1>
          <p className="text-lg text-muted">{t("contact.subtitle")}</p>
          <div className="space-y-3 text-sm text-muted">
            <p className="font-semibold text-base">hola@aprendemas.cl</p>
            <p>Av. Providencia 1208, Santiago, Chile</p>
            <p>+56 9 1234 5678</p>
          </div>
        </div>
        <form
          className="flex-1 space-y-5 rounded-3xl border border-border bg-surface p-8 shadow-subtle"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          name="contact"
          onSubmit={() => setSubmitted(true)}
        >
          <input type="hidden" name="form-name" value="contact" />
          <p className="hidden">
            <label>
              No completar: <input name="bot-field" />
            </label>
          </p>
          <div className="space-y-2">
            <label className="text-sm font-medium text-base" htmlFor="name">
              {t("contact.form.name")}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-full border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-base" htmlFor="email">
              {t("contact.form.email")}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-full border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-base" htmlFor="organization">
              {t("contact.form.organization")}
            </label>
            <input
              id="organization"
              name="organization"
              type="text"
              className="w-full rounded-full border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-base" htmlFor="message">
              {t("contact.form.message")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full rounded-3xl border border-border bg-white px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow-subtle transition hover:bg-primary/90"
          >
            {t("contact.form.submit")}
          </button>
          {submitted ? (
            <p className="text-sm text-primary">{t("contact.form.success")}</p>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
