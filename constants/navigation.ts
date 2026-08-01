import type { NavItem, CommandItem, DockItem } from "@/types";

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
  { id: "github", label: "GitHub", description: "View source code", action: "https://github.com/abdelrahman-samy-dev", category: "external" },
  { id: "linkedin", label: "LinkedIn", description: "Professional profile", action: "https://linkedin.com/in/abdelrahman-samy-dev", category: "external" },
  { id: "resume", label: "Resume", description: "Download CV", action: "/resume.pdf", category: "external" },
  { id: "email", label: "Send Email", description: "abdelrahman.samy.dev@outlook.com", action: "mailto:abdelrahman.samy.dev@outlook.com", category: "action" },
];

export const dockItems: DockItem[] = [
  { label: "GitHub", href: "https://github.com/abdelrahman-samy-dev", icon: "FolderGit2", external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/abdelrahman-samy-dev", icon: "Link", external: true },
  { label: "Resume", href: "/resume.pdf", icon: "FileText", external: true },
  { label: "Email", href: "mailto:abdelrahman.samy.dev@outlook.com", icon: "Mail", external: false },
  { label: "Projects", href: "#work", icon: "FolderOpen", external: false },
];
