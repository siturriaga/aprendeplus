import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const DEFAULT_URL = "https://aprendemas.cl";
const DEFAULT_IMAGE = "/og-image.svg";

export const SEO: React.FC<SEOProps> = ({ title, description, image, url }) => {
  const { t, i18n } = useTranslation();
  const siteTitle = t("meta.defaultTitle");
  const computedTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDescription = description ?? t("meta.defaultDescription");
  const canonicalUrl = url ?? (typeof window !== "undefined" ? window.location.href : DEFAULT_URL);
  const imageUrl = image ?? `${DEFAULT_URL}${DEFAULT_IMAGE}`;

  return (
    <Helmet>
      <html lang={i18n.language} />
      <title>{computedTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={computedTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={computedTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};
