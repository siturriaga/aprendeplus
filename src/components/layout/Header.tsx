import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button } from "../atoms/Button";

const navItems: Array<{ to: string; labelKey: `nav.${string}` }> = [
  { to: "/", labelKey: "nav.home" },
  { to: "/courses", labelKey: "nav.courses" },
  { to: "/pricing", labelKey: "nav.pricing" },
  { to: "/about", labelKey: "nav.about" },
  { to: "/blog", labelKey: "nav.blog" },
  { to: "/contact", labelKey: "nav.contact" }
];

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const toggleLanguage = () => {
    const nextLang = i18n.language === "es" ? "en" : "es";
    void i18n.changeLanguage(nextLang);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-surface/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="text-xl font-bold text-primary">
          Aprende+
        </NavLink>
        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition hover:text-primary ${isActive ? "text-primary" : "text-muted"}`
              }
            >
              {t(item.labelKey)}
            </NavLink>
          ))}
          <Button intent="ghost" size="sm" onClick={toggleLanguage}>
            {t("common.language")}
          </Button>
        </div>
        <button
          className="md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>
      {open ? (
        <div className="border-t border-border/60 bg-surface px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `transition hover:text-primary ${isActive ? "text-primary" : "text-muted"}`
                }
              >
                {t(item.labelKey)}
              </NavLink>
            ))}
            <Button intent="ghost" size="sm" onClick={toggleLanguage}>
              {t("common.language")}
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
};
