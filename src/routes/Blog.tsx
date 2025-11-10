import { CalendarDays } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { SEO } from "../components/atoms/SEO";
import { getBlogPosts } from "../lib/content";

const wordsPerMinute = 180;

const BlogPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const posts = useMemo(() => getBlogPosts(), []);

  const formatter = new Intl.DateTimeFormat(i18n.language === "es" ? "es-CL" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <SEO title={t("nav.blog") ?? "Blog"} description={t("blog.title") ?? undefined} />
      <header className="max-w-3xl space-y-4">
        <h1 className="text-4xl font-semibold text-base">{t("blog.title")}</h1>
        <p className="text-lg text-muted">{t("hero.subtitle")}</p>
      </header>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {posts.map((post) => {
          const readingTime = Math.max(1, Math.round(post.body.split(/\s+/).length / wordsPerMinute));
          return (
            <article key={post.slug} className="flex flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-subtle">
              {post.cover ? (
                <img src={post.cover} alt={post.title} className="h-48 w-full object-cover" loading="lazy" />
              ) : null}
              <div className="flex flex-1 flex-col gap-4 p-6">
                <p className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary">
                  <CalendarDays className="h-4 w-4" />
                  <span>{formatter.format(new Date(post.date))}</span>
                </p>
                <h2 className="text-xl font-semibold text-base">{post.title}</h2>
                <p className="text-sm text-muted">{post.body.slice(0, 180)}...</p>
                <div className="mt-auto flex items-center justify-between text-xs text-muted">
                  <span>
                    {readingTime} {t("common.minutes")}
                  </span>
                  <Link to={`/blog/${post.slug}`} className="text-sm font-semibold text-primary">
                    {t("blog.readMore")}
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default BlogPage;
