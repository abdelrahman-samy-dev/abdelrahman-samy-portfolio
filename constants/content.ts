import type { Locale } from "@/lib/i18n";
import type { Experience, Project } from "@/types";
import { projects } from "@/constants/projects";
import { projectsAr } from "@/constants/projects.ar";
import { experiences } from "@/constants/experience";
import { experienceAr } from "@/constants/experience.ar";

/**
 * Arabic "و" (and) glued to a Latin word ("وReact") renders as an isolated
 * glyph that reads like a stray letter — give it a space ("و React").
 */
function spaceWaw<T>(value: T): T {
  if (typeof value === "string") return value.replace(/(^|[\s(«])و(?=[A-Za-z0-9])/g, "$1و ") as T;
  if (Array.isArray(value)) return value.map(spaceWaw) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, spaceWaw(v)])) as T;
  }
  return value;
}

/** Projects with their text in the requested language (English is the source) */
export function getProjects(locale: Locale): Project[] {
  if (locale === "en") return projects;
  return projects.map((p) => ({ ...p, ...spaceWaw(projectsAr[p.slug]), thumbnail: p.thumbnailAr ?? p.thumbnail }));
}

export function getProject(locale: Locale, slug: string): Project | undefined {
  return getProjects(locale).find((p) => p.slug === slug);
}

export function getExperiences(locale: Locale): Experience[] {
  if (locale === "en") return experiences;
  return experiences.map((e) => ({ ...e, ...spaceWaw(experienceAr[e.id]) }));
}
