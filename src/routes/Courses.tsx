import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { SEO } from "../components/atoms/SEO";
import { CourseCard } from "../components/organisms/CourseCard";
import { getCourses } from "../lib/content";
import type { Course } from "../types/content";

const levelOptions: Course["level"][] = ["Inicial", "Intermedio", "Avanzado"];

type LevelFilter = "all" | Course["level"];

const CoursesPage: React.FC = () => {
  const { t } = useTranslation();
  const [level, setLevel] = useState<LevelFilter>("all");
  const courses = useMemo(() => getCourses(), []);
  const levelLabels = t("courses.levels", { returnObjects: true }) as Record<Course["level"], string>;

  const filteredCourses = useMemo(
    () => courses.filter((course) => level === "all" || course.level === level),
    [courses, level]
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SEO title={t("nav.courses") ?? "Cursos"} />
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold text-base">{t("courses.title")}</h1>
          <p className="max-w-2xl text-muted">
            {t("hero.subtitle")}
          </p>
        </div>
        <label className="flex items-center gap-3 text-sm text-muted">
          <span className="font-medium text-base">{t("courses.filterLabel")}</span>
          <select
            value={level}
            onChange={(event) => setLevel(event.target.value as LevelFilter)}
            className="rounded-full border border-border bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">{t("courses.allLevels")}</option>
            {levelOptions.map((option) => (
              <option key={option} value={option}>
                {levelLabels[option] ?? option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {filteredCourses.length === 0 ? (
          <p className="col-span-full rounded-3xl border border-border bg-white p-10 text-center text-muted">
            {t("common.noResults")}
          </p>
        ) : (
          filteredCourses.map((course) => <CourseCard key={course.slug} course={course} />)
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
