import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "shiftsouq",
    title: "ShiftSouq",
    description:
      "A full-stack bilingual e-commerce platform with Supabase PostgreSQL, RLS security, Paymob payment integration, and dynamic admin dashboard.",
    category: "web",
    thumbnail: "/images/projects/shiftsouq.jpeg",
    tags: ["Next.js 16", "React 19", "Supabase", "Paymob", "Tailwind v4", "Zustand", "Zod"],
    github: "https://github.com/abdelrahman-samy-dev/shiftsouq-ecommerce",
    liveUrl: "https://shiftsouq.vercel.app",
    featured: true,
    year: 2025,
    overview:
      "ShiftSouq is a complete bilingual (Arabic/English, full RTL support) e-commerce platform built from the ground up with Next.js 16, React 19, and Supabase. It features a dynamic admin dashboard for product and inventory management, and handles real payments via Paymob.",
    challenge:
      "Building a production-ready e-commerce platform that supports full Arabic/English bilingual UI with RTL layout, secure payment processing with webhook verification, and real-time inventory management — all as a solo developer.",
    solution:
      "Used Supabase PostgreSQL with Row Level Security (RLS) for data protection, integrated Paymob payment gateway supporting Credit Card and Mobile Wallet with HMAC webhook verification, and built a complete checkout flow with Zod form validation. Zustand handles client-side state with zero boilerplate.",
    architecture:
      "Next.js 16 App Router with React 19, Supabase for database + auth + storage, Paymob for payments, Zustand for state, Zod for validation, and Tailwind CSS v4 for styling. Full RTL support via next-intl with dynamic locale switching.",
    techStack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL", "Paymob", "Zustand", "Zod", "Tailwind CSS v4"],
    performance: [
      "Row Level Security (RLS) for database-level authorization",
      "HMAC webhook verification for payment security",
      "Optimized image delivery via Supabase Storage",
      "Zod schema validation on all form inputs",
    ],
    engineeringDecisions: [
      "Chose Supabase over custom backend for rapid development with built-in auth, storage, and RLS",
      "Paymob over Stripe for Egyptian market support (Credit Card + Mobile Wallet)",
      "Zustand over Redux for simpler state management with zero boilerplate in a mid-size app",
      "Zod for runtime type validation ensuring data integrity from forms to database",
    ],
    lessonsLearned: [
      "RTL layout requires more than just CSS direction — component logic and UX patterns differ significantly",
      "Payment webhook verification is critical — HMAC signing prevents fraudulent order confirmations",
      "Supabase RLS is powerful but requires careful policy design to avoid data leaks",
    ],
    screenshots: [],
  },
  {
    slug: "islamic-pwa",
    title: "Taratil — Islamic PWA",
    description:
      "A full-featured Islamic PWA with Quran reader (600 pages), smart audio sync engine, Azkar counters, and offline-first architecture — zero framework bundle size.",
    category: "web",
    thumbnail: "/images/projects/taratil.jpeg",
    tags: ["Vanilla JS (ES6+)", "HTML5", "CSS3", "Service Workers", "PWA"],
    github: "https://github.com/abdelrahman-samy-dev/taratil-quran",
    liveUrl: "https://taratil-quran.vercel.app",
    featured: true,
    year: 2024,
    overview:
      "Taratil is a Progressive Web App built with pure vanilla JavaScript — no frameworks. It features a 600-page Quran reader with smart audio synchronization, Azkar (daily supplications) with counters, and a complete offline-first architecture that works on iOS, Android, and Desktop.",
    challenge:
      "Building a feature-rich application with complex audio synchronization and 600+ pages of content that works offline — all without any JavaScript framework, achieving maximum performance with zero bundle overhead.",
    solution:
      "Implemented custom Stale-While-Revalidate caching strategy via Service Workers for offline-first behavior. Built a smart audio sync engine that tracks reading position. Used haptic feedback APIs for physical interaction on mobile. The app is installable on all platforms via PWA standards.",
    architecture:
      "Pure ES6+ JavaScript with modular architecture, HTML5 for semantics, CSS3 for layout and animations, Service Workers for caching/offline, and Web Manifest for installability. No build tools, no transpilers — ship what you write.",
    techStack: ["JavaScript (ES6+)", "HTML5", "CSS3", "Service Workers", "PWA", "Web Audio API"],
    performance: [
      "Zero framework bundle — pure vanilla JS",
      "90+ Lighthouse performance score",
      "Offline-first with Stale-While-Revalidate caching",
      "Installable on iOS, Android, and Desktop",
    ],
    engineeringDecisions: [
      "Vanilla JS over React/Next.js — the app doesn't need a virtual DOM; raw performance matters more for 600 pages of content",
      "Custom caching strategy over Workbox for precise control over what gets cached and when",
      "Haptic feedback for physical interaction — small touch that makes the app feel native",
    ],
    lessonsLearned: [
      "You don't always need a framework — vanilla JS is incredibly fast when you understand the DOM",
      "Service Worker lifecycle is complex — testing cache invalidation across versions is essential",
      "PWA installability varies wildly across iOS Safari and Chrome — test on real devices",
    ],
    screenshots: [],
  },
  {
    slug: "iphone15-landing",
    title: "iPhone 15 Showcase",
    description:
      "A stunning, Apple-inspired premium landing page showcasing the iPhone 15 with smooth scroll animations, dark-themed interface, and performance-optimized rendering.",
    category: "web",
    thumbnail: "/images/projects/iphone15-landing.png",
    tags: ["React 18", "Vite", "JavaScript (ES6+)", "CSS3"],
    github: "https://github.com/abdelrahman-samy-dev/iphone15-landing-page",
    liveUrl: "https://iphone15-landing-page-umber.vercel.app/",
    featured: true,
    year: 2024,
    overview:
      "A premium, Apple-inspired landing page that captures the elegance of the iPhone 15 Pro. Built with React and Vite, it delivers a smooth, interactive experience with scroll-triggered animations, a dark cinematic theme, and crisp high-quality visuals — all optimized for blazing-fast performance across every device.",
    challenge:
      "Recreating Apple's signature premium design language and smooth interactions on the web while keeping the bundle lightweight, responsive across all viewports, and performant without relying on heavy animation libraries.",
    solution:
      "Built a component-based architecture with React 18 and Vite for instant HMR and optimized builds. Used pure CSS3 transitions and scroll-triggered animations for a silky-smooth experience. Implemented a mobile-first responsive approach with carefully crafted micro-interactions and a dark color palette that mirrors Apple's own product pages.",
    architecture:
      "React 18 with Vite for fast builds and HMR, modular component structure (Hero, Features, Header, Footer), CSS3 for styling and animations. Deployed on Vercel with edge caching.",
    techStack: ["React 18", "JavaScript (ES6+)", "Vite", "CSS3", "ESLint"],
    performance: [
      "Lightning-fast loading powered by Vite's tree-shaking and code splitting",
      "Pure CSS animations — zero JavaScript animation overhead",
      "Optimized image assets for crisp visuals without bloat",
      "Cross-browser compatible across Chrome, Firefox, Safari, and Edge",
    ],
    engineeringDecisions: [
      "Vite over CRA for drastically faster dev server and optimized production builds",
      "Pure CSS transitions over GSAP/Framer Motion — the animations are simple enough that a library would be overkill",
      "Component-based modular architecture for clean separation of concerns and reusability",
    ],
    lessonsLearned: [
      "Apple's design philosophy is deceptively simple — achieving that level of polish requires obsessive attention to spacing, typography, and timing",
      "Dark-themed interfaces need careful contrast management to maintain accessibility",
      "Scroll-triggered CSS animations can rival JS libraries when used thoughtfully",
    ],
    screenshots: [],
  },
  {
    slug: "brainwave-ai",
    title: "Brainwave AI",
    description:
      "A modern AI-powered UI/UX website with parallax effects, bento grid layouts, stylish gradients, and smooth animations — built with React and Tailwind CSS.",
    category: "web",
    thumbnail: "/images/projects/brainwave.jpeg",
    tags: ["React 18", "Vite", "Tailwind CSS", "React Just Parallax"],
    github: "https://github.com/abdelrahman-samy-dev/brainwave",
    liveUrl: "https://brainwave-xi-gray.vercel.app/",
    featured: true,
    year: 2024,
    overview:
      "Brainwave is a cutting-edge AI-powered website showcasing modern UI/UX principles. Built with React.js, Vite, and Tailwind CSS, it features a sleek dark interface with seamless parallax animations, bento grid layouts, pricing sections, roadmaps, and an exceptional user experience across all devices.",
    challenge:
      "Building a visually stunning, AI-themed website with complex UI geometry, parallax effects, and smooth animations while maintaining fast performance and a clean, maintainable component architecture.",
    solution:
      "Used React 18 with a modular component architecture for reusability. Implemented React Just Parallax for immersive mouse-driven effects, Tailwind CSS for intricate shapes (circular displays, grid lines, side lines), and stylish gradients for a premium dark-themed aesthetic. Achieved fast loading via Vite's optimization and code splitting.",
    architecture:
      "React 18 with Vite for fast builds and HMR, Tailwind CSS for utility-first styling, React Router DOM for navigation, React Just Parallax for scroll/mouse effects, and Scroll Lock for controlled scroll behavior. Deployed on Vercel.",
    techStack: ["React 18", "JavaScript (ES6+)", "Vite", "Tailwind CSS", "React Just Parallax", "React Router DOM"],
    performance: [
      "Lightning-fast builds and HMR powered by Vite",
      "Optimized parallax animations that don't impact scrolling performance",
      "Minimal bundle size with tree-shaking and code splitting",
      "Cross-browser compatible across Chrome, Firefox, Safari, and Edge",
    ],
    engineeringDecisions: [
      "Vite over CRA for drastically faster dev server and optimized production builds",
      "Tailwind CSS for rapid utility-first styling — perfect for complex UI geometry like circular displays and grid lines",
      "React Just Parallax over heavier libraries for lightweight, mouse-driven parallax effects",
      "Component-based modular architecture (Hero, Benefits, Services, Pricing, Roadmap) for clean separation of concerns",
    ],
    lessonsLearned: [
      "Complex UI geometry with CSS requires creative thinking — Tailwind's arbitrary values make it achievable without custom CSS",
      "Dark-themed interfaces need careful contrast and gradient management to feel premium, not just dark",
      "Parallax effects should enhance the experience, not distract — subtlety is key to maintaining usability",
    ],
    screenshots: [],
  },
  {
    slug: "clean-template",
    title: "Clean Template",
    description:
      "A clean and modern multi-section website template built with pure HTML5 and CSS3 — fully responsive, no JavaScript, and ready for customization.",
    category: "web",
    thumbnail: "/images/projects/clean-template.jpeg",
    tags: ["HTML5", "CSS3", "Normalize.css", "Font Awesome"],
    github: "https://github.com/abdelrahman-samy-dev/html-css-clean-template",
    liveUrl: "https://abdelrahman-samy-dev.github.io/html-css-clean-template/",
    featured: true,
    year: 2024,
    overview:
      "A clean, modern multi-section website template built entirely with HTML5 and CSS3. Features a Hero section, Services, About, Portfolio gallery, Team profiles, Testimonials, Contact form, and Footer — all fully responsive with smooth CSS animations and zero JavaScript dependency.",
    challenge:
      "Creating a professional, feature-rich multi-section website with smooth animations, responsive layouts, and modern design — all without writing a single line of JavaScript.",
    solution:
      "Leveraged CSS3 Flexbox and Grid for complex responsive layouts, CSS custom properties for easy theming, Normalize.css for cross-browser consistency, and Font Awesome for professional iconography. Every animation and interaction is handled purely through CSS transitions and transforms.",
    architecture:
      "Pure HTML5 semantic markup with organized CSS3. Normalize.css for browser consistency, Font Awesome for icons. No build tools, no preprocessors — clean and simple.",
    techStack: ["HTML5", "CSS3", "Normalize.css", "Font Awesome"],
    performance: [
      "Zero JavaScript — instant interactivity with pure CSS",
      "Lightweight and fast-loading across all devices",
      "Cross-browser compatible with Normalize.css",
      "Fully responsive from 320px mobile to desktop",
    ],
    engineeringDecisions: [
      "Pure HTML/CSS over frameworks — proves mastery of fundamentals without dependencies",
      "CSS Flexbox + Grid over float-based layouts for cleaner, more maintainable responsive design",
      "Normalize.css over a full reset for consistent cross-browser styling without losing useful defaults",
    ],
    lessonsLearned: [
      "Strong HTML/CSS fundamentals are the foundation of everything — frameworks come and go, but the basics remain",
      "CSS Grid and Flexbox together can handle virtually any layout without JavaScript",
      "Semantic HTML isn't just for SEO — it makes the code more readable and maintainable",
    ],
    screenshots: [],
  },
  {
    slug: "modern-panel",
    title: "Modern Dashboard Panel",
    description:
      "A clean, modern, and fully responsive admin dashboard template built with pure HTML5 and CSS3, featuring a sleek UI and responsive grid layout.",
    category: "web",
    thumbnail: "/images/projects/modern-panel.jpeg",
    tags: ["HTML5", "CSS3", "Responsive", "Font Awesome"],
    github: "https://github.com/abdelrahman-samy-dev/modern-panel",
    liveUrl: "https://abdelrahman-samy-dev.github.io/modern-panel/",
    featured: true,
    year: 2024,
    overview:
      "A clean, modern, and fully responsive admin dashboard template built entirely with pure HTML5 and CSS3. Features a fixed sidebar navigation, top header bar, statistics cards, and a fully fluid layout that adapts seamlessly to desktop, tablet, and mobile devices without a single line of JavaScript.",
    challenge:
      "Building a complex admin dashboard layout with collapsible sidebars, flexible grids, and fluid typography that works across all screen sizes while strictly limiting the tech stack to pure HTML and CSS.",
    solution:
      "Utilized modern CSS Grid for the macro layout and Flexbox for micro-components. Implemented a mobile-first approach using media queries for a responsive sidebar that stacks on smaller screens. Used CSS variables for consistent theming and a maintainable color palette.",
    architecture:
      "Semantic HTML5 structure paired with modern CSS3 styling. Relies heavily on CSS variables, Grid, and Flexbox for layout management. No preprocessors, no JS frameworks — built for maximum performance and portability.",
    techStack: ["HTML5", "CSS3", "Font Awesome", "Google Fonts"],
    performance: [
      "Zero JavaScript overhead — blazing fast load times",
      "Optimized DOM structure with semantic HTML5",
      "Efficient CSS selection and minimal paint operations",
      "Fully fluid responsiveness across all viewports",
    ],
    engineeringDecisions: [
      "Pure HTML/CSS to demonstrate deep understanding of layout engines and CSS capabilities without JS fallbacks",
      "CSS Grid + Flexbox combination to handle both 2D page layouts and 1D component alignments efficiently",
      "Extensive use of CSS variables to allow easy theming for light/dark mode implementations in the future",
    ],
    lessonsLearned: [
      "Complex dashboard layouts can be surprisingly elegant and performant using only modern CSS",
      "Designing a truly responsive sidebar without JS requires creative use of CSS media queries and structural planning",
      "Semantic markup makes styling significantly easier and results in much cleaner CSS architecture",
    ],
    screenshots: [],
  },
];
