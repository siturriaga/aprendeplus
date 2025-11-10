import { ArrowLeft, CalendarDays, Feather } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { SEO } from "../components/atoms/SEO";
import { getBlogPostBySlug } from "../lib/content";

const wordsPerMinute = 180;

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const post = useMemo(() => (slug ? getBlogPostBySlug(slug) : undefined), [slug]);

  if (!post) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-20">
        <SEO title="Artículo no encontrado" />
        <div className="space-y-4 rounded-3xl border border-border bg-white p-10 text-center">
          <p className="text-2xl font-semibold text-base">No encontramos este artículo.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary">
            <ArrowLeft className="h-4 w-4" /> {t("common.back")}
          </Link>
        </div>
      </div>
    );
  }

  const formatter = new Intl.DateTimeFormat(i18n.language === "es" ? "es-CL" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  const readingTime = Math.max(1, Math.round(post.body.split(/\s+/).length / wordsPerMinute));

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <SEO title={post.title} description={post.body.slice(0, 160)} image={post.cover} />
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-primary">
        <ArrowLeft className="h-4 w-4" /> {t("common.back")}
      </Link>
      <header className="mt-6 space-y-6">
        <h1 className="text-4xl font-semibold text-base">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
          <span className="inline-flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            {t("blog.published")}: {formatter.format(new Date(post.date))}
          </span>
          <span className="inline-flex items-center gap-2">
            <Feather className="h-4 w-4" /> {post.author}
          </span>
          <span>
            {readingTime} {t("common.minutes")}
          </span>
        </div>
      </header>
      {post.cover ? (
        <img src={post.cover} alt={post.title} className="mt-10 w-full rounded-3xl object-cover shadow-subtle" loading="lazy" />
      ) : null}
      <div className="markdown mt-12">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
      </div>
    </article>
  );
};

export default BlogPostPage;
