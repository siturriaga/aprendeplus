import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { SEO } from "../components/atoms/SEO";

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-4xl px-6 py-24 text-center">
      <SEO title="Página no encontrada" />
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">404</p>
      <h1 className="mt-4 text-4xl font-semibold text-base">Parece que esta página se perdió.</h1>
      <p className="mt-4 text-muted">{t("common.noResults")}</p>
      <div className="mt-8 flex justify-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow-subtle transition hover:bg-primary/90"
        >
          <ArrowLeft className="h-4 w-4" /> {t("common.back")}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
