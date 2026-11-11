import type { NavItem, CommandItem } from "@/types";
import { profile, mailto } from "@/constants/profile";

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Tech Stack", href: "#tech-stack" },
  { label: "Contact", href: "#contact" },
];

export const commandItems: CommandItem[] = [
  { id: "home", label: "Home", action: "#hero", category: "navigation", shortcut: "H" },
  { id: "about", label: "About", action: "#about", category: "navigation", shortcut: "A" },
  { id: "experience", label: "Experience", action: "#experience", category: "navigation" },
  { id: "work", label: "Selected Work", action: "#work", category: "navigation", shortcut: "W" },
  { id: "tech", label: "Tech Stack", action: "#tech-stack", category: "navigation" },
  { id: "contact", label: "Contact", action: "#contact", category: "navigation", shortcut: "C" },
  { id: "github", label: "GitHub", description: "View source code", action: profile.github, category: "external" },
  { id: "linkedin", label: "LinkedIn", description: "Professional profile", action: profile.linkedin, category: "external" },
  { id: "resume", label: "CV", description: "View CV (PDF)", action: profile.cv.visual, category: "external" },
  { id: "resume-ats", label: "CV (ATS)", description: "Plain-text CV for application systems", action: profile.cv.ats, category: "external" },
  { id: "gloofloo", label: "GlooFloo", description: "Live product — gloofloo.com", action: "https://gloofloo.com", category: "external" },
  { id: "rawaylo", label: "Rawaylo", description: "Live product — rawaylo.com", action: "https://rawaylo.com", category: "external" },
  { id: "email", label: "Send Email", description: profile.email, action: mailto, category: "action" },
];
