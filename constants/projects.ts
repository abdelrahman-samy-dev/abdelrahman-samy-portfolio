import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "gloofloo",
    title: "GlooFloo",
    description:
      "An AI-powered project and portfolio management SaaS — Gantt planning, portfolios, risks, resources and procurement in one bilingual (Arabic/English) workspace, on the web and on iOS/Android.",
    category: "web",
    label: "SaaS · Web, API & Mobile",
    status: "live",
    role: "Software Engineer at Yamama Software — full-stack on the web app and API, building the Flutter mobile app",
    thumbnail: "/images/projects/gloofloo-en.webp",
    thumbnailAr: "/images/projects/gloofloo-ar.webp",
    tags: ["React 19", "TanStack", "Hono", "PostgreSQL", "Flutter", "Claude API"],
    liveUrl: "https://gloofloo.com",
    featured: true,
    year: 2026,
    overview:
      "GlooFloo is Yamama Software's project management platform. Teams plan work on Gantt timelines and Kanban boards, track portfolios, budgets and earned value, manage risks, resources and procurement, and ask an AI assistant to draft plans and reports. It runs in Arabic and English with full right-to-left support, on the web and as a native mobile app.",
    challenge:
      "A multi-tenant product used by real companies: every workspace must stay isolated, everything must work in Arabic and English, and the AI assistant has to act on real data safely — charging credits fairly and staying inside a monthly AI budget. On top of that, the team needed a mobile app with the same features as the web, not a cut-down companion.",
    solution:
      "I work across the stack in a team with QA and DevOps: a feature goes from database migration to API to UI, with tests at each layer, through reviewed pull requests into staging. Workspaces are isolated with PostgreSQL row-level security. The assistant calls the product's own actions as tools; a deterministic backend layer charges credits for the actions it actually ran, and Claude models are routed by task under a budget guard. On mobile I'm building the Flutter app with an offline-first local database, push notifications and store subscriptions.",
    architecture:
      "Web: React 19 with TanStack Start, Router and Query, Tailwind CSS and Radix UI. API: Node.js with Hono, Drizzle ORM and PostgreSQL (row-level security, pgvector), Better Auth (SSO, passkeys), NATS JetStream for events, S3-compatible file storage, and an MCP server with OAuth. Mobile: Flutter with Riverpod, Drift and go_router, Firebase Cloud Messaging and RevenueCat. Tested with Vitest, Playwright, axe and Flutter integration tests; shipped with GitHub Actions and Docker.",
    techStack: ["TypeScript", "React 19", "TanStack Start", "Hono", "PostgreSQL", "Drizzle ORM", "Better Auth", "Flutter", "Riverpod", "Claude API", "Playwright", "Docker"],
    performance: [
      "Tenant isolation enforced inside the database with row-level security",
      "Full Arabic/English with right-to-left layouts and Hijri dates",
      "AI assistant with tool calling, per-task model routing and a monthly budget guard",
      "Mobile app that reads from a local database first, so screens open instantly",
    ],
    engineeringDecisions: [
      "The AI model never decides a charge — a deterministic backend layer charges credits from the actions the assistant actually performed",
      "Mobile billing goes through App Store / Google Play subscriptions (via RevenueCat), because the stores reject outside payment for digital goods",
      "The mobile app renders from a Drift database and the network fills it, so it keeps working on bad connections",
      "Push messages carry only IDs; the app fetches the content itself, so no workspace data passes through the push provider",
    ],
    lessonsLearned: [
      "In a multi-tenant product the database has to enforce isolation — application checks alone are not enough",
      "Small, reviewed pull requests into a staging branch let a fast-moving team ship without breaking each other",
      "Mobile parity means adapting each flow to the phone, not copying web screens one to one",
    ],
    screenshots: ["/images/projects/gloofloo-app.webp", "/images/projects/gloofloo-mobile.webp"],
  },
  {
    slug: "rawaylo",
    title: "Rawaylo",
    description:
      "An AI customer-service platform for Egyptian businesses: voice and chat agents that answer customers in Egyptian Arabic, hand over to staff when needed, and keep every conversation in one inbox. Currently in development.",
    category: "web",
    label: "AI Customer Service · SaaS",
    status: "in-development",
    role: "Software Engineer at Yamama Software — backend, dashboard and voice pipeline",
    thumbnail: "/images/projects/rawaylo-en.webp",
    thumbnailAr: "/images/projects/rawaylo-ar.webp",
    tags: ["Node.js", "Next.js", "Voice AI", "Claude / Gemini", "Odoo"],
    featured: true,
    year: 2026,
    overview:
      "Rawaylo (روايلو) lets a business put an AI agent on its website, chat channels and phone line. The agent answers from the business's own knowledge, takes requests and orders, and passes the conversation to a person when it should. The team sees every conversation, ticket and follow-up in one dashboard. A restaurant edition adds point of sale, a kitchen display and online ordering.",
    challenge:
      "A voice agent has to sound natural in Egyptian Arabic, answer fast, and still cost a business clearly less than the call-takers it supports — while handling customer data under Egypt's data-protection law.",
    solution:
      "I work on the backend and dashboard: the conversation inbox with human handoff, tickets and follow-ups, workspace billing on a credit ledger, and the voice pipeline. We compared the real cost per call minute of several speech-to-text, LLM and text-to-speech combinations and designed a lower-cost pipeline that is now being quality-tested on Egyptian calls. For restaurants we built on Odoo with our own modules for the kitchen display, out-of-stock items and delivery.",
    architecture:
      "Node.js (Express) API with Better Auth, a Next.js public site, and a modular dashboard. Voice: streaming speech-to-text, Claude / Gemini for the conversation, neural text-to-speech, and an Asterisk bridge for phone lines. Restaurant edition: Odoo with custom Python modules. Tested with Node's test runner and Playwright.",
    techStack: ["Node.js", "Express", "Better Auth", "Next.js", "Claude API", "Gemini", "Speech-to-Text / TTS", "Asterisk", "Odoo", "Playwright"],
    performance: [
      "AI agents on web chat, voice and phone, answering in Egyptian Arabic",
      "Human handoff with a shared inbox, tickets and follow-up tracking",
      "Usage-based billing on a credit ledger",
      "Restaurant edition: point of sale, kitchen display and online ordering",
    ],
    engineeringDecisions: [
      "Split voice into speech-to-text → LLM → text-to-speech, so each part is chosen on quality and price",
      "Built the restaurant edition on Odoo instead of from scratch — offline point of sale and Egyptian e-receipts already work there",
      "New features ship behind flags, so unfinished work never blocks a release",
    ],
    lessonsLearned: [
      "In voice AI, cost per minute shapes the product as much as quality does",
      "Test on real Egyptian calls before switching providers — published benchmarks don't transfer",
      "Legal and consent requirements shape the architecture from day one",
    ],
    screenshots: ["/images/projects/rawaylo-inbox.webp"],
  },
  {
    slug: "shiftsouq",
    title: "ShiftSouq",
    description:
      "A full-stack bilingual e-commerce platform with Supabase PostgreSQL, RLS security, Paymob payment integration, and dynamic admin dashboard.",
    category: "web",
    label: "E-commerce · Personal project",
    status: "live",
    thumbnail: "/images/projects/shiftsouq.webp",
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
    label: "Progressive Web App · Personal project",
    status: "live",
    thumbnail: "/images/projects/taratil.webp",
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
    thumbnail: "/images/projects/iphone15-landing.webp",
    tags: ["React 18", "Vite", "JavaScript (ES6+)", "CSS3"],
    github: "https://github.com/abdelrahman-samy-dev/iphone15-landing-page",
    liveUrl: "https://iphone15-landing-page-umber.vercel.app/",
    featured: false,
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
    thumbnail: "/images/projects/brainwave.webp",
    tags: ["React 18", "Vite", "Tailwind CSS", "React Just Parallax"],
    github: "https://github.com/abdelrahman-samy-dev/brainwave",
    liveUrl: "https://brainwave-xi-gray.vercel.app/",
    featured: false,
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
    thumbnail: "/images/projects/clean-template.webp",
    tags: ["HTML5", "CSS3", "Normalize.css", "Font Awesome"],
    github: "https://github.com/abdelrahman-samy-dev/html-css-clean-template",
    liveUrl: "https://abdelrahman-samy-dev.github.io/html-css-clean-template/",
    featured: false,
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
    thumbnail: "/images/projects/modern-panel.webp",
    tags: ["HTML5", "CSS3", "Responsive", "Font Awesome"],
    github: "https://github.com/abdelrahman-samy-dev/modern-panel",
    liveUrl: "https://abdelrahman-samy-dev.github.io/modern-panel/",
    featured: false,
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
