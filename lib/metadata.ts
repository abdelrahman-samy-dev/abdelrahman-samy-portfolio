import type { Metadata } from "next";
import { localePath, type Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

const siteConfig = {
  name: "Abdelrahman Samy Ali",
  url: "https://abdelrahman-samy-portfolio.vercel.app",
  creator: "Abdelrahman Samy Ali",
};

/** hreflang links for a path that exists in both languages */
export function languageAlternates(locale: Locale, path = "/") {
  return {
    canonical: localePath(locale, path),
    languages: {
      en: localePath("en", path),
      ar: localePath("ar", path),
      "x-default": localePath("en", path),
    },
  };
}

export function generateSiteMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).meta;
  return {
    title: {
      default: t.title,
      template: `%s | ${locale === "ar" ? "عبدالرحمن سامي علي" : siteConfig.name}`,
    },
    description: t.description,
    metadataBase: new URL(siteConfig.url),
    creator: siteConfig.creator,
    authors: [{ name: siteConfig.creator }],
    alternates: languageAlternates(locale),
    keywords: [
      "Software Engineer",
      "Full-Stack Developer",
      "Mobile Developer",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Flutter",
      "GlooFloo",
      "Rawaylo",
      "Cairo",
      "Egypt",
      "مهندس برمجيات",
    ],
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_EG",
      url: localePath(locale),
      title: t.title,
      description: t.description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export { siteConfig };
