import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "yamama",
    role: "Software Engineer",
    company: "Yamama Software",
    companyUrl: "https://yamamasoftware.com",
    startDate: "Aug 2026",
    description:
      "Full-stack and mobile engineer on GlooFloo, an AI-powered project and portfolio management SaaS, and on Rawaylo, an AI customer-service platform in development.",
    achievements: [
      "Deliver GlooFloo features end to end across the React / TanStack web app and the Hono + PostgreSQL API — database migrations, API, UI and tests — in a team with QA and DevOps",
      "Built AI assistant features: tool calling over the product's own actions, Claude model routing by task, a monthly AI budget guard, and credit charging based on the actions actually performed",
      "Building the GlooFloo Flutter app for iOS and Android with web feature parity: Kanban board, Gantt timeline, calendar, files, AI assistant, push notifications and store subscriptions",
      "Work on Rawaylo (in development): conversation inbox with human handoff, workspace billing, a voice-agent pipeline for Egyptian Arabic, and a restaurant edition built on Odoo",
      "Support the product and sales side: requirement documents, the client presentation deck and demo videos, pricing and cost analysis, and technical input for enterprise proposals",
    ],
    techStack: ["TypeScript", "React 19", "TanStack", "Hono", "PostgreSQL", "Flutter", "Claude API", "Docker"],
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
      "Integrated TanStack Query 5 + Redux for the API data layer; reached 90+ Lighthouse scores and ~40% faster load times",
      "Implemented full Arabic/English bilingual support with next-intl and RTL layout handling",
      "Worked with the backend team on REST API contracts; daily standups, sprint planning, and code reviews",
    ],
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS v4", "TanStack Query", "Redux", "next-intl"],
  },
  {
    id: "freelance",
    role: "Freelance Frontend Developer",
    company: "Self-Employed",
    location: "Remote",
    startDate: "Sep 2023",
    endDate: "Sep 2025",
    description:
      "Delivered 10+ client projects — e-commerce platforms, 3D web experiences, landing pages — with most clients coming back for more work.",
    achievements: [
      "Delivered 10+ production projects including e-commerce platforms, 3D web experiences, and landing pages",
      "Around 80% of clients came back with repeat work",
      "Built full-stack Next.js solutions with authentication (NextAuth.js, JWT, OAuth), payments (Stripe, Paymob), and CI/CD on Vercel",
      "Implemented responsive, pixel-perfect UIs from Figma designs with a performance-first approach",
    ],
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Stripe"],
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
