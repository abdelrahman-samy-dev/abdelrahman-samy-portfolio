import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/metadata";
import { projects } from "@/constants/projects";
import { localePath } from "@/lib/i18n";

const url = (path: string) => `${siteConfig.url}${path === "/" ? "" : path}`;

/** Each page in both languages, with hreflang alternates */
function entry(path: string, priority: number): MetadataRoute.Sitemap[number] {
  return {
    url: url(localePath("en", path)),
    priority,
    alternates: { languages: { en: url(localePath("en", path)), ar: url(localePath("ar", path)) } },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [entry("/", 1), ...projects.map((p) => entry(`/work/${p.slug}`, p.featured ? 0.8 : 0.5))];
  // Arabic URLs listed too, with the same alternates
  return pages.flatMap((p) => [p, { ...p, url: p.alternates!.languages!.ar as string }]);
}
