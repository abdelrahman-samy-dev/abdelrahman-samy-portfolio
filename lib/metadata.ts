import type { Metadata } from "next";

const siteConfig = {
  name: "Abdelrahman Samy Ali",
  title: "Abdelrahman Samy Ali — Frontend Developer",
  description:
    "Frontend Developer with 2+ years specializing in React.js, Next.js, and TypeScript. Building performant, accessible, and beautifully crafted web experiences.",
  url: "https://abdelrahman-samy-dev.vercel.app",
  locale: "en_US",
  creator: "Abdelrahman Samy Ali",
};

export function generateSiteMetadata(): Metadata {
  return {
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    metadataBase: new URL(siteConfig.url),
    creator: siteConfig.creator,
    authors: [{ name: siteConfig.creator }],
    keywords: [
      "Frontend Developer",
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Three.js",
      "Web Development",
      "Cairo",
      "Egypt",
      "Performance",
      "Accessibility",
    ],
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: siteConfig.url,
      title: siteConfig.title,
      description: siteConfig.description,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: siteConfig.description,
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
