<div align="center">
  <h1>Abdelrahman Samy Ali — Portfolio v2</h1>
  <p><b>Creative Frontend Developer | Next.js & TypeScript</b></p>

  <p>
    <a href="https://abdelrahman-samy-portfolio.vercel.app/" target="_blank">
      <img src="https://img.shields.io/badge/Portfolio-View_Live-151515.svg?style=for-the-badge&logo=vercel&logoColor=white" alt="Portfolio">
    </a>
    <a href="https://linkedin.com/in/abdelrahman-samy-dev/" target="_blank">
      <img src="https://img.shields.io/badge/LinkedIn-Connect-0A66C2.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
    </a>
    <a href="mailto:abdelrahman.samy.dev@outlook.com">
      <img src="https://img.shields.io/badge/Email-Contact_Me-0078D4.svg?style=for-the-badge&logo=microsoftoutlook&logoColor=white" alt="Email">
    </a>
  </p>
</div>

<br />

## About

A modern, cinematic portfolio website built to showcase my work, engineering philosophy, and technical experience. Features a dark theme, scroll-driven frame animation hero, smooth scroll mechanics, GSAP-powered entrance animations, and a fully responsive bento-grid layout.

Designed and developed with a focus on **performance**, **UI/UX excellence**, and **clean architecture**.

---

## Tech Stack

<div align="center">
  <img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=black" alt="GSAP" />
  <img src="https://img.shields.io/badge/Lenis-000000?style=for-the-badge&logoColor=white" alt="Lenis" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</div>

---

## Key Features

| Feature | Description |
|---|---|
| **Cinematic Hero** | 96-frame scroll-driven animation sequence with a full-page preloader |
| **Smooth Scrolling** | Lenis-powered smooth scroll for a premium browsing experience |
| **Scroll Animations** | GSAP ScrollTrigger + Framer Motion hybrid animation system |
| **Command Palette** | Keyboard-navigable command menu (Ctrl+K) for quick navigation |
| **Bento Grid** | Modern layout architecture for Tech Stack and Projects sections |
| **Responsive** | Fluid typography and meticulously crafted layouts for all viewports |
| **Case Studies** | Dedicated project pages with architecture breakdowns and engineering decisions |

---

## Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── layout.tsx        # Root layout with providers
│   ├── page.tsx          # Home page
│   └── work/[slug]/      # Dynamic case study pages
├── components/
│   ├── layout/           # Navigation, Footer, ScrollProgress, CustomCursor
│   ├── sections/         # Hero, About, Experience, TechStack, Contact, etc.
│   └── shared/           # Preloader, CommandPalette, SectionHeader
├── animations/           # GSAP scroll animations and Framer Motion variants
├── constants/            # Static data (projects, skills, experience, navigation)
├── hooks/                # Custom hooks (magnetic effect, scroll direction, etc.)
├── providers/            # Lenis and Animation context providers
└── types/                # TypeScript interfaces
```

---

## Local Development

```bash
# Clone
git clone https://github.com/abdelrahman-samy-dev/abdelrahman-samy-portfolio.git

# Install
cd abdelrahman-samy-portfolio
npm install

# Dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in browser.

---

## Contact

- **Email:** abdelrahman.samy.dev@outlook.com
- **LinkedIn:** [abdelrahman-samy-dev](https://linkedin.com/in/abdelrahman-samy-dev/)
- **GitHub:** [@abdelrahman-samy-dev](https://github.com/abdelrahman-samy-dev)

---

<div align="center">
  <sub>Built with Next.js 15 & TypeScript by Abdelrahman Samy Ali.</sub>
</div>
