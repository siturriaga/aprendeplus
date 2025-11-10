import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { SEO } from "../components/atoms/SEO";
import { getTeamMembers } from "../lib/content";

const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  const team = useMemo(() => getTeamMembers(), []);
  const pillars = t("about.pillars", { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  return (
    <div className="space-y-20 pb-20">
      <SEO title={t("nav.about") ?? "Nosotros"} description={t("about.intro") ?? undefined} />
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="animate-fade-in-up text-4xl font-semibold text-base">{t("about.title")}</h1>
        <p className="mt-6 animate-fade-in-up text-lg text-muted" style={{ animationDelay: "0.1s" }}>
          {t("about.intro")}
        </p>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-semibold text-base">{t("about.pillarsTitle")}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="rounded-3xl border border-border bg-surface p-8 shadow-subtle">
                <h3 className="text-xl font-semibold text-base">{pillar.title}</h3>
                <p className="mt-4 text-sm text-muted">{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-semibold text-base">{t("about.teamTitle")}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {team.map((member) => (
            <article key={member.name} className="rounded-3xl border border-border bg-white p-6 text-center shadow-subtle">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="mx-auto h-32 w-32 rounded-full object-cover"
                  loading="lazy"
                />
              ) : null}
              <h3 className="mt-6 text-xl font-semibold text-base">{member.name}</h3>
              <p className="text-sm font-medium text-primary">{member.role}</p>
              <p className="mt-3 text-sm text-muted">{member.bio}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
