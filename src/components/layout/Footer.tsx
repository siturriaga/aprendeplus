import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border/60 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2">
          <p className="text-xl font-semibold text-primary">Aprende+</p>
          <p className="mt-4 max-w-sm text-sm text-muted">{t("footer.description")}</p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-semibold text-base">{t("nav.courses")}</p>
          <ul className="space-y-2 text-muted">
            <li>
              <Link to="/courses" className="transition hover:text-primary">
                {t("home.ctaCourses")}
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="transition hover:text-primary">
                {t("nav.pricing")}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition hover:text-primary">
                {t("nav.contact")}
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-semibold text-base">Recursos</p>
          <ul className="space-y-2 text-muted">
            <li>
              <Link to="/blog" className="transition hover:text-primary">
                {t("nav.blog")}
              </Link>
            </li>
            <li>
              <a href="/admin" className="transition hover:text-primary">
                CMS
              </a>
            </li>
            <li>
              <a href="mailto:hola@aprendemas.cl" className="transition hover:text-primary">
                hola@aprendemas.cl
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 bg-surface py-4">
        <p className="mx-auto max-w-6xl px-6 text-xs text-muted">
          © {new Date().getFullYear()} Aprende+. {t("footer.rights")}.
        </p>
      </div>
    </footer>
  );
};
