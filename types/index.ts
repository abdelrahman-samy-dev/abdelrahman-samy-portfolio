// ============================================
// Type Definitions — Portfolio
// ============================================

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: "web" | "mobile" | "open-source" | "design";
  thumbnail: string;
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

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
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

export interface DockItem {
  label: string;
  href: string;
  icon: string;
  external?: boolean;
}
