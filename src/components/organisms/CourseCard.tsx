import { BookOpen } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import type { Course } from "../../types/content";

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { t, i18n } = useTranslation();
  const levelLabels = t("courses.levels", { returnObjects: true }) as Record<Course["level"], string>;
  const levelLabel = levelLabels[course.level] ?? course.level;
  const priceFormatter = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language === "es" ? "es-CL" : "en-US", {
        style: "currency",
        currency: "CLP",
        maximumFractionDigits: 0
      }),
    [i18n.language]
  );

  return (
    <article className="flex h-full flex-col justify-between rounded-3xl border border-border bg-white p-6 shadow-subtle transition hover:-translate-y-1">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
          <BookOpen className="h-4 w-4" />
          <span>{levelLabel}</span>
        </div>
        <h3 className="text-xl font-semibold text-base">{course.title}</h3>
        <p className="text-sm text-muted">{course.summary}</p>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-muted">
          <p>
            {course.hoursPerWeek} {t("courses.weeklyHours")}
          </p>
          <p className="mt-2 text-base font-semibold text-primary">
            {priceFormatter.format(course.priceCLP)}
          </p>
        </div>
        <Link to={`/courses/${course.slug}`} className="font-semibold text-primary hover:underline">
          {t("courses.viewDetail")}
        </Link>
      </div>
    </article>
  );
};
