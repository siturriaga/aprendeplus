import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { SEO } from "../components/atoms/SEO";
import { getFaqEntries } from "../lib/content";

const PricingPage: React.FC = () => {
  const { t } = useTranslation();
  const faqs = useMemo(() => getFaqEntries(), []);
  const tiers = t("pricing.tiers", { returnObjects: true }) as Array<{
    name: string;
    price: string;
    description: string;
    features: string[];
  }>;

  return (
    <div className="space-y-20 bg-white pb-20">
      <SEO title={t("nav.pricing") ?? "Planes"} description={t("pricing.subtitle") ?? undefined} />
      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <h1 className="text-4xl font-semibold text-base">{t("pricing.title")}</h1>
        <p className="mt-6 text-lg text-muted">{t("pricing.subtitle")}</p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <article
            key={tier.name}
            className="flex flex-col gap-6 rounded-3xl border border-border bg-surface p-8 shadow-subtle"
          >
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">{tier.name}</p>
              <p className="text-4xl font-semibold text-base">CLP {tier.price}</p>
              <p className="text-sm text-muted">{tier.description}</p>
            </div>
            <ul className="space-y-3 text-sm text-base">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href="https://cal.com/aprende-plus"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white transition hover:bg-primary/90"
            >
              {t("home.ctaContact")}
            </a>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-4xl px-6">
        <h2 className="text-3xl font-semibold text-base">{t("pricing.faqTitle")}</h2>
        <div className="mt-8 space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-2xl border border-border bg-white p-6">
              <summary className="cursor-pointer text-lg font-semibold text-base">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
