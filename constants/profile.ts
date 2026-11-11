/**
 * Single source for contact details, profile links and CV files.
 * Every component, the JSON-LD and the command palette read from here.
 */
export const profile = {
  name: "Abdelrahman Samy Ali",
  email: "abdelrahman.samy.dev@outlook.com",
  phone: "+20 114 139 3811",
  whatsapp: "https://wa.me/201141393811",
  linkedin: "https://www.linkedin.com/in/abdelrahman-samy-ali/",
  github: "https://github.com/abdelrahman-samy-dev",
  site: "https://abdelrahman-samy-portfolio.vercel.app",
  cv: {
    /** Designed one-page CV — what the site's "View CV" opens */
    visual: "/cv/Abdelrahman-Samy-Ali-CV.pdf",
    /** Plain single-column CV for applicant-tracking systems */
    ats: "/cv/Abdelrahman-Samy-Ali-CV-ATS.pdf",
  },
} as const;

export const mailto = `mailto:${profile.email}`;
