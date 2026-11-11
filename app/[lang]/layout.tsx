import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { fontVariables, arabicFontVariables } from "@/lib/fonts";
import { generateSiteMetadata, siteConfig } from "@/lib/metadata";
import { dirOf, isLocale, locales } from "@/lib/i18n";
import LocaleProvider from "@/providers/LocaleProvider";
import LenisProvider from "@/providers/LenisProvider";
import AnimationProvider from "@/providers/AnimationProvider";
import Navigation from "@/components/layout/Navigation";
import LanguageSwitch from "@/components/layout/LanguageSwitch";
import ScrollProgress from "@/components/layout/ScrollProgress";
import CustomCursor from "@/components/layout/CustomCursor";
import CommandPalette from "@/components/shared/CommandPalette";
import DeveloperMode from "@/components/shared/DeveloperMode";
import Footer from "@/components/layout/Footer";
import { profile, mailto } from "@/constants/profile";
import "../globals.css";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? generateSiteMetadata(lang) : {};
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Abdelrahman Samy Ali",
  alternateName: "عبدالرحمن سامي علي",
  jobTitle: "Software Engineer",
  worksFor: { "@type": "Organization", name: "Yamama Software", url: "https://yamamasoftware.com" },
  url: siteConfig.url,
  email: mailto,
  address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: ["Software Engineering", "TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Flutter", "AI integration"],
};

export default async function RootLayout({ children, params }: LayoutProps) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} dir={dirOf(lang)} className={`${fontVariables} ${arabicFontVariables} antialiased`}>
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <LocaleProvider locale={lang}>
          <AnimationProvider>
            <LenisProvider>
              <ScrollProgress />
              <LanguageSwitch />
              <Navigation />
              <main className="flex-1">{children}</main>
              <Footer />
              <CustomCursor />
              <CommandPalette />
              <DeveloperMode />
              {/* Noise overlay for texture */}
              <div className="noise-overlay" aria-hidden="true" />
            </LenisProvider>
          </AnimationProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
