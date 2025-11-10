import { ArrowLeft, CalendarClock } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { SEO } from "../components/atoms/SEO";
import { getCourseBySlug } from "../lib/content";
import type { Course } from "../types/content";

const CourseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const course = useMemo(() => (slug ? getCourseBySlug(slug) : undefined), [slug]);

  if (!course) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-20">
        <SEO title="Curso no encontrado" />
        <div className="space-y-4 rounded-3xl border border-border bg-white p-10 text-center">
          <p className="text-2xl font-semibold text-base">No encontramos este curso.</p>
          <Link to="/courses" className="inline-flex items-center gap-2 text-primary">
            <ArrowLeft className="h-4 w-4" /> {t("common.back")}
          </Link>
        </div>
      </div>
    );
  }

  const levelLabels = t("courses.levels", { returnObjects: true }) as Record<Course["level"], string>;
  const levelLabel = levelLabels[course.level] ?? course.level;
  const priceFormatter = new Intl.NumberFormat(i18n.language === "es" ? "es-CL" : "en-US", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  });

  return (
    <article className="mx-auto max-w-5xl px-6 py-16">
      <SEO title={course.title} description={course.summary} image={course.image} />
      <Link to="/courses" className="inline-flex items-center gap-2 text-sm text-primary">
        <ArrowLeft className="h-4 w-4" /> {t("common.back")}
      </Link>
      <header className="mt-6 space-y-6">
        <h1 className="text-4xl font-semibold text-base">{course.title}</h1>
        <p className="text-lg text-muted">{course.summary}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
          <span className="rounded-full bg-primary/10 px-4 py-2 font-semibold text-primary">{levelLabel}</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2">
            <CalendarClock className="h-4 w-4" />
            {course.hoursPerWeek} {t("courses.weeklyHours")}
          </span>
          <span className="rounded-full border border-primary px-4 py-2 font-semibold text-primary">
            {priceFormatter.format(course.priceCLP)}
          </span>
        </div>
      </header>

      {course.image ? (
        <img
          src={course.image}
          alt={course.title}
          className="mt-10 h-80 w-full rounded-3xl object-cover shadow-subtle"
          loading="lazy"
        />
      ) : null}

      <section className="mt-12 space-y-10">
        <div className="markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{course.body}</ReactMarkdown>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-base">{t("courses.syllabusTitle")}</h2>
          <ul className="mt-6 space-y-4">
            {course.syllabus.map((module) => (
              <li key={module.title} className="rounded-2xl border border-border bg-white p-6 shadow-subtle">
                <p className="text-lg font-semibold text-base">{module.title}</p>
                <p className="mt-2 text-sm text-muted">{module.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow-subtle transition hover:bg-primary/90"
        >
          {t("courses.enrollCta")}
        </Link>
        <a
          href="mailto:hola@aprendemas.cl"
          className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-6 py-3 text-base font-semibold text-primary transition hover:border-primary hover:bg-primary/10"
        >
          hola@aprendemas.cl
        </a>
      </div>
    </article>
  );
};

export default CourseDetailPage;
