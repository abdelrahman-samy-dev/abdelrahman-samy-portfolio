import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "yamama",
    role: "Software Developer",
    company: "Yamama Software",
    companyUrl: "https://yamamasoftware.com",
    startDate: "Aug 2026",
    description:
      "Full-stack and mobile developer on two live products: GlooFloo, an AI-powered planning and project management SaaS, and Rawaylo, an AI call center for restaurants.",
    achievements: [
      "Deliver GlooFloo features end to end across the React / TanStack web app and the Hono + PostgreSQL API — database migrations, multi-tenant row-level security, UI and tests — through reviewed pull requests, staging and production releases",
      "Built GlooFloo's AI layer: an assistant that runs product actions as tools, Claude model routing by task with a monthly budget guard, credit charging based on the actions actually performed, and an MCP server (OAuth 2.1) for AI clients such as Claude and ChatGPT",
      "Led the November 2026 redesign of the GlooFloo web app: new design system and typography, Arabic/English-only localisation, accessible custom controls and a lazy-loaded 3D hero — shipped to production",
      "Building the GlooFloo Flutter app for iOS and Android toward its v1.0 store release: Kanban board, Gantt timeline, calendar, files, AI assistant, push notifications and store subscriptions",
      "Rawaylo (live since November 2026): backend, dashboard and voice pipeline of an AI call center for restaurants — chat and browser-call ordering with Soniox and Claude, an inbox with human handoff, credit-ledger billing, and the restaurant system on Odoo",
      "Support the product and business side: requirement documents, pricing and cost analysis, client decks and product videos, and technical input for enterprise proposals",
    ],
    techStack: ["TypeScript", "React 19", "TanStack", "Hono", "PostgreSQL", "Flutter", "Claude API", "MCP", "Odoo"],
  },
  {
    id: "vclasses",
    role: "Frontend Developer",
    company: "VClasses",
    companyUrl: "https://vclasses.com",
    location: "Cairo, Egypt",
    startDate: "Oct 2025",
    endDate: "Jul 2026",
    description:
      "Built a Next.js 15 App Router multi-tenant educational platform with TypeScript, Tailwind CSS v4, and full Arabic/English bilingual support using next-intl.",
    achievements: [
      "Built a multi-tenant educational platform with Next.js 15 App Router, TypeScript, and Tailwind CSS v4",
      "Engineered ISR cache invalidation, multi-landing-page switching system, and CSS custom property theming from Figma designs",
      "Integrated TanStack Query 5 + Redux for the API data layer",
      "Implemented full Arabic/English bilingual support with next-intl and RTL layout handling",
      "Worked with the backend team on REST API contracts; daily standups, sprint planning, and code reviews",
    ],
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS v4", "TanStack Query", "Redux", "next-intl"],
  },
  {
    id: "freelance",
    role: "Freelance Frontend Developer (part-time)",
    company: "Self-Employed",
    location: "Remote",
    startDate: "Sep 2023",
    endDate: "Sep 2025",
    description:
      "Part-time client work alongside other roles: landing pages and small web apps with React and Next.js.",
    achievements: [
      "Built landing pages and small web apps for selected clients with React and Next.js, deployed on Vercel and Netlify",
      "Turned Figma designs into responsive interfaces",
    ],
    techStack: ["React", "Next.js", "Vercel", "Netlify"],
  },
  {
    id: "intern",
    role: "Frontend Developer Intern",
    company: "Digitalize for Business Services",
    location: "Cairo, Egypt",
    startDate: "Mar 2024",
    endDate: "Aug 2024",
    description:
      "Developed reusable React/TypeScript UI component library in a 5-person Agile team following company coding standards.",
    achievements: [
      "Developed a reusable React/TypeScript UI component library in a 5-person Agile team",
      "Contributed to architecture decisions, code reviews, and rendering performance improvements",
      "Followed company coding standards and Scrum: sprint planning, reviews, and retrospectives",
    ],
    techStack: ["React", "TypeScript", "CSS Modules", "Git", "Agile/Scrum"],
  },
];
