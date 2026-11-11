import { notFound } from "next/navigation";
import { getProject, publishedProjects } from "@/constants/content";
import { isLocale, locales } from "@/lib/i18n";
import { languageAlternates } from "@/lib/metadata";
import { getDictionary } from "@/lib/dictionaries";
import CaseStudyContent from "./CaseStudyContent";
import type { Metadata } from "next";

interface CaseStudyPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => publishedProjects.map((project) => ({ lang, slug: project.slug })));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const project = getProject(lang, slug);
  if (!project) return {};

  return {
    title: `${project.title} — ${getDictionary(lang).caseStudy.label}`,
    description: project.description,
    alternates: languageAlternates(lang, `/work/${slug}`),
    openGraph: { images: [project.thumbnail] },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { lang, slug } = await params;
  const project = isLocale(lang) ? getProject(lang, slug) : undefined;

  if (!project) {
    notFound();
  }

  return <CaseStudyContent project={project} />;
}
