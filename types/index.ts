// ============================================
// Type Definitions — Portfolio
// ============================================

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: "web" | "mobile" | "open-source" | "design";
  /** Short label shown under the title, e.g. "SaaS · Web, API & Mobile" */
  label?: string;
  /**
   * Production state. "in-development" shows a badge; "archived" keeps the
   * record in the repo but hides it from the site, the sitemap and the routes.
   */
  status?: "live" | "in-development" | "archived";
  /** My role on the project, for team / company work */
  role?: string;
  thumbnail: string;
  /** Cover for the Arabic site, when the image has text in it */
  thumbnailAr?: string;
  /** Optional phone screenshot shown in a device frame next to the main image */
  mobileShot?: string;
  tags: string[];
  github?: string;
  liveUrl?: string;
  featured: boolean;
  year: number;
  // Case study fields
  overview: string;
  challenge: string;
  solution: string;
  architecture: string;
  techStack: string[];
  performance: string[];
  engineeringDecisions: string[];
  lessonsLearned: string[];
  screenshots: string[];
}

/** Translatable text of a project; everything else (links, images, stack) is shared */
export type ProjectCopy = Pick<
  Project,
  | "title"
  | "description"
  | "label"
  | "role"
  | "overview"
  | "challenge"
  | "solution"
  | "architecture"
  | "performance"
  | "engineeringDecisions"
  | "lessonsLearned"
>;

/** Translatable text of an experience entry */
export type ExperienceCopy = Pick<
  Experience,
  "role" | "company" | "location" | "startDate" | "endDate" | "description" | "achievements"
>;

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements: string[];
  techStack: string[];
}

export interface Skill {
  name: string;
  logo: string;
  invert?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  shortcut?: string;
}

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  action: string;
  shortcut?: string;
  category: "navigation" | "external" | "action";
}


