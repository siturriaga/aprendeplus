import { ArrowRight, Sparkles } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { SEO } from "../components/atoms/SEO";
import { CourseCard } from "../components/organisms/CourseCard";
import { getCourses } from "../lib/content";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const courses = useMemo(() => getCourses().slice(0, 3), []);
  const benefits = t("home.benefits", { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;
  const testimonials = t("home.testimonials", { returnObjects: true }) as Array<{
    quote: string;
    name: string;
    role: string;
  }>;

  return (
    <div className="space-y-24 pb-20">
      <SEO title={t("nav.home") ?? "Inicio"} />
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-surface to-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-20 md:flex-row md:items-center">
          <div className="flex-1 space-y-6 animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" /> Aprende+
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-base md:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="max-w-2xl text-lg text-muted">{t("hero.subtitle")}</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/courses" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow-subtle transition hover:bg-primary/90">
                {t("hero.ctaPrimary")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-base font-semibold text-primary transition hover:border-primary hover:bg-primary/10"
              >
                {t("hero.ctaSecondary")}
              </Link>
            </div>
          </div>
          <div className="flex-1 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="rounded-3xl border border-border bg-white p-8 shadow-subtle">
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("home.benefitsTitle")}
              </p>
              <ul className="mt-6 space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit.title} className="rounded-2xl border border-border/70 p-4">
                    <p className="text-base font-semibold text-base">{benefit.title}</p>
                    <p className="mt-2 text-sm text-muted">{benefit.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-base">{t("home.featuredCoursesTitle")}</h2>
          <Link to="/courses" className="text-sm font-semibold text-primary">
            {t("home.ctaCourses")}
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-semibold text-base">{t("home.testimonialsTitle")}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <blockquote
                key={testimonial.name}
                className="rounded-3xl border border-border bg-surface p-8 text-base"
              >
                <p className="text-lg font-medium text-base">“{testimonial.quote}”</p>
                <footer className="mt-6 text-sm text-muted">
                  <p className="font-semibold text-base">{testimonial.name}</p>
                  <p>{testimonial.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl rounded-3xl border border-border bg-primary/5 px-6 py-16 text-center">
        <h2 className="text-3xl font-semibold text-base">{t("contact.title")}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted">{t("contact.subtitle")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow-subtle transition hover:bg-primary/90"
          >
            {t("home.ctaContact")}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-base font-semibold text-primary transition hover:border-primary hover:bg-primary/10"
          >
            {t("hero.ctaSecondary")}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
