import type { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: "vclasses",
    role: "Frontend Developer",
    company: "VClasses",
    companyUrl: "https://vclasses.com",
    location: "Cairo, Egypt",
    startDate: "Oct 2025",
    description:
      "Building a Next.js 15 App Router multi-tenant educational platform with TypeScript, Tailwind CSS v4, and full Arabic/English bilingual support using next-intl.",
    achievements: [
      "Built a multi-tenant educational platform with Next.js 15 App Router, TypeScript, and Tailwind CSS v4",
      "Engineered ISR cache invalidation, multi-landing-page switching system, and CSS custom property theming from Figma designs",
      "Integrated TanStack Query 5 + Redux for API data layer; achieved 90+ Lighthouse scores and 40% improvement in load times",
      "Implemented full Arabic/English bilingual support with next-intl and RTL layout handling",
      "Collaborated with backend team on RESTful API contracts; participated in daily standups, sprint planning, and code reviews",
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
      "Delivered 10+ client projects — e-commerce platforms, 3D web experiences, landing pages — with 100% client satisfaction and 80% repeat rate.",
    achievements: [
      "Delivered 10+ production projects including e-commerce platforms, 3D web experiences, and landing pages",
      "Achieved 100% client satisfaction and 80% repeat rate across all projects",
      "Built full-stack Next.js solutions with authentication (NextAuth.js, JWT, OAuth), payment integration (Stripe, Paymob), and CI/CD on Vercel",
      "Implemented responsive, pixel-perfect UIs from Figma designs with performance-first approach",
    ],
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Stripe"],
  },
  {
    id: "intern",
    role: "Frontend Developer Intern",
    company: "Digitalize for Business Services",
    companyUrl: "https://digitalize.com",
    location: "Cairo, Egypt",
    startDate: "Mar 2024",
    endDate: "Aug 2024",
    description:
      "Developed reusable React/TypeScript UI component library in a 5-person Agile team following company coding standards.",
    achievements: [
      "Developed reusable React/TypeScript UI component library in a 5-person Agile team",
      "Contributed to architecture decisions, code reviews, and rendering performance improvements",
      "Followed company coding standards and Agile/Scrum methodology with sprint planning and retrospectives",
    ],
    techStack: ["React", "TypeScript", "CSS Modules", "Git", "Agile/Scrum"],
  },
];
