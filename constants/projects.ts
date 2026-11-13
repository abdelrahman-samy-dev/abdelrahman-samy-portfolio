import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "gloofloo",
    title: "GlooFloo",
    description:
      "An AI-powered planning and project management SaaS: turn a goal into a plan, then run it on Gantt timelines, Kanban boards and portfolios — in Arabic and English, on the web, on iOS/Android and from AI clients.",
    category: "web",
    label: "SaaS · Web, API & Mobile",
    status: "live",
    role: "Software Developer at Yamama Software — full-stack on the web app and API, led the November 2026 web redesign, building the Flutter mobile app",
    thumbnail: "/images/projects/gloofloo-cover-en.webp",
    thumbnailAr: "/images/projects/gloofloo-cover-ar.webp",
    thumbnailLight: "/images/projects/gloofloo-cover-en-light.webp",
    thumbnailArLight: "/images/projects/gloofloo-cover-ar-light.webp",
    tags: ["React 19", "TanStack", "Hono", "PostgreSQL", "Flutter", "Claude API", "MCP"],
    liveUrl: "https://gloofloo.com",
    featured: true,
    year: 2026,
    overview:
      "GlooFloo is Yamama Software's planning platform. A user describes a goal and the AI assistant drafts a plan with phases, tasks and dates; teams then run it on Gantt timelines and Kanban boards, track portfolios, budgets, risks and resources, and follow their day from a personal dashboard. It works in Arabic and English with full right-to-left support, on the web, as a Flutter mobile app, and from AI clients such as Claude and ChatGPT through an MCP connector.",
    challenge:
      "A multi-tenant product used by real companies: every workspace must stay isolated, everything must work in Arabic and English, and the AI assistant has to act on real data safely — charging credits fairly and staying inside a monthly AI budget. The team also needed a mobile app with the same features as the web, and in November 2026 a complete new visual identity for the web app without breaking a single workflow.",
    solution:
      "I work across the stack in a team with QA and DevOps: a feature goes from database migration to API to UI, with tests at each layer, through reviewed pull requests, staging and production releases. Workspaces are isolated with PostgreSQL row-level security. The assistant calls the product's own actions as tools; a deterministic backend layer charges credits for the actions it actually ran, and Claude models are routed by task under a budget guard. For the redesign I set the design system — Lalezar, Alexandria and Plus Jakarta Sans, black and lime tokens, accessible custom controls, a lazy-loaded 3D hero — and shipped it behind bundle-size, accessibility and responsive checks. On mobile I'm building the Flutter app with an offline-first local database, push notifications and store subscriptions.",
    architecture:
      "Web: React 19 with TanStack Start, Router and Query, Tailwind CSS and Radix UI, three.js loaded lazily. API: Node.js with Hono, Drizzle ORM and PostgreSQL (row-level security, pgvector), Better Auth (SSO, passkeys), NATS JetStream for events, S3-compatible file storage, and an MCP server with OAuth 2.1. Mobile: Flutter with Riverpod, Drift and go_router, Firebase Cloud Messaging and RevenueCat. Tested with Vitest, Playwright, axe and Flutter integration tests; shipped with GitHub Actions and Docker.",
    techStack: ["TypeScript", "React 19", "TanStack Start", "Hono", "PostgreSQL", "Drizzle ORM", "Better Auth", "Flutter", "Riverpod", "Claude API", "MCP", "Playwright", "Docker"],
    performance: [
      "Tenant isolation enforced inside the database with row-level security",
      "AI assistant with tool calling, per-task model routing and a monthly budget guard",
      "MCP connector (OAuth 2.1) so Claude, ChatGPT and Claude Code can read and update plans, with preview-then-apply for every change",
      "Arabic/English with right-to-left layouts and Hijri dates; the 2026 redesign shipped with 5,000+ tests green",
      "Mobile app that reads from a local database first, so screens open instantly",
    ],
    engineeringDecisions: [
      "The AI model never decides a charge — a deterministic backend layer charges credits from the actions the assistant actually performed",
      "Changes from AI clients are previewed first and applied second, and the apply tools are marked destructive so clients ask before running them",
      "Mobile billing goes through App Store / Google Play subscriptions (via RevenueCat), because the stores reject outside payment for digital goods",
      "Push messages carry only IDs; the app fetches the content itself, so no workspace data passes through the push provider",
    ],
    lessonsLearned: [
      "In a multi-tenant product the database has to enforce isolation — application checks alone are not enough",
      "A redesign is safe only when every screen keeps its tests: the look changed, the workflows did not",
      "Mobile parity means adapting each flow to the phone, not copying web screens one to one",
    ],
    screenshots: ["/images/projects/gloofloo-home.webp", "/images/projects/gloofloo-board.webp", "/images/projects/gloofloo-mobile.webp"],
  },
  {
    slug: "rawaylo",
    title: "Rawaylo",
    description:
      "An AI call center for restaurants in Egypt: an assistant answers customers on the restaurant's page by chat and by a call from the browser, takes the order from the real menu at the right price, and sends it on once the customer confirms.",
    category: "web",
    label: "AI Call Center · Restaurant SaaS",
    status: "live",
    role: "Software Developer at Yamama Software — backend, dashboard, voice pipeline and the Odoo restaurant system",
    thumbnail: "/images/projects/rawaylo-cover-en.webp",
    thumbnailAr: "/images/projects/rawaylo-cover-ar.webp",
    thumbnailLight: "/images/projects/rawaylo-cover-en-light.webp",
    thumbnailArLight: "/images/projects/rawaylo-cover-ar-light.webp",
    tags: ["Node.js", "Next.js", "Voice AI", "Claude", "Soniox", "Odoo"],
    liveUrl: "https://rawaylo.com",
    featured: true,
    year: 2026,
    overview:
      "Rawaylo (روايلو) gives each restaurant an AI assistant on its own page. Customers order by chat or by calling from the browser; the assistant answers in Egyptian Arabic or MSA, reads the live menu and prices, asks for missing details once, and places the order only after the customer agrees. Orders land in the restaurant's point-of-sale system, built on Odoo, with a kitchen display and delivery. Answering the restaurant's own phone line is the next step.",
    challenge:
      "A voice assistant has to sound natural in Egyptian Arabic, answer fast, take exact orders, and still cost a restaurant clearly less than the call-takers it supports — while handling customer data under Egypt's data-protection law.",
    solution:
      "I work on the backend, dashboard and voice pipeline: the conversation inbox with human handoff, credit-ledger billing, Google sign-in and the browser-call path. We measured the real cost per minute of several speech, LLM and text-to-speech combinations and moved to Soniox speech recognition with Claude for the conversation. The restaurant system runs on Odoo with our own modules for the kitchen display, out-of-stock items, delivery and provisioning a new restaurant.",
    architecture:
      "Node.js (Express) API with Better Auth, a Next.js public site with a three.js hero, and a modular dashboard. Voice: streaming Soniox speech recognition, Claude for the conversation and the order, and audio streamed to and from the browser. Restaurant system: Odoo with custom Python modules, provisioned per restaurant. Tested with Node's test runner and Playwright.",
    techStack: ["Node.js", "Express", "Better Auth", "Next.js", "Three.js", "Claude API", "Soniox", "Odoo", "Python", "Playwright"],
    performance: [
      "Ordering by chat and by browser call, in Egyptian Arabic or MSA",
      "Orders priced from the live menu and placed only after the customer confirms",
      "Conversation inbox with human handoff",
      "Restaurant system on Odoo: point of sale, kitchen display and delivery",
    ],
    engineeringDecisions: [
      "Split voice into speech recognition → LLM → speech, so each part is chosen on quality and cost per minute",
      "Built the restaurant system on Odoo instead of from scratch — an offline point of sale and Egyptian e-receipts already work there",
      "Assistant orders reach the register as drafts by default, so the cashier stays in control until the restaurant chooses to send them straight to the kitchen",
      "New features ship behind flags, so unfinished work never blocks a release",
    ],
    lessonsLearned: [
      "In voice AI, cost per minute shapes the product as much as quality does",
      "Test on real Egyptian speech before switching providers — published benchmarks don't transfer",
      "Legal and consent requirements shape the architecture from day one",
    ],
    screenshots: ["/images/projects/rawaylo-inbox.webp", "/images/projects/rawaylo-mobile.webp"],
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
      "An offline-first Quran PWA: the 604-page Mushaf with verse-synced audio for about 115 recitations, prayer times, Azkar, Tafsir and Hadith — rebuilt in 2026 with Vite, Preact and TypeScript.",
    category: "web",
    label: "Progressive Web App · Personal project",
    status: "live",
    thumbnail: "/images/projects/taratil.webp",
    tags: ["Vite", "Preact", "TypeScript", "Workbox", "PWA"],
    github: "https://github.com/abdelrahman-samy-dev/taratil-quran",
    liveUrl: "https://taratil-quran.vercel.app",
    featured: true,
    year: 2024,
    overview:
      "Taratil is my open-source Islamic Progressive Web App. It started in 2024 as a vanilla JavaScript app; in November 2026 I rebuilt it with Vite, Preact and strict TypeScript. It renders the 604-page Mushaf with the per-page QCF fonts, plays verse-synced audio for about 115 recitations, and adds prayer times calculated on the device, Azkar with counters, Tafsir and Hadith — installable on iOS, Android and desktop, and usable offline.",
    challenge:
      "Drawing a faithful page-by-page Mushaf and keeping the audio on the exact verse — across recitations whose timing data numbers verses differently — while the app keeps working offline and people on the old version upgrade without losing their saved progress.",
    solution:
      "A build script turns the Quran.com page layouts into one JSON file per page, drawn with that page's QCF font. Verse timings from mp3quran are aligned to the Mushaf's numbering, with an estimate as the fallback when a recitation's data doesn't match. A Workbox service worker precaches the app and caches data and audio at runtime, and a migration step moves the old version's settings and bookmarks into the new storage on first launch.",
    architecture:
      "Vite 8 and Preact 10 with signals and preact-iso routing, TypeScript in strict mode, and a Workbox (injectManifest) service worker. Prayer times are calculated on the device with the adhan library. The Quran data is prebuilt into static JSON; audio, Tafsir and Hadith come from public APIs.",
    techStack: ["Vite", "Preact", "TypeScript", "@preact/signals", "Workbox", "PWA", "Vitest", "Playwright"],
    performance: [
      "Lighthouse accessibility, SEO and best practices: 100",
      "162 unit tests and 11 Playwright end-to-end tests, including the upgrade from the old version",
      "Offline-first: the app is precached and data and audio are cached at runtime",
      "Installable on iOS, Android and desktop",
    ],
    engineeringDecisions: [
      "Preact over React — the same component model in a much smaller runtime, for an app people open on their phones",
      "Per-page QCF fonts instead of page images — sharp at any zoom, and each verse stays tappable for audio",
      "Kept the service worker at the same /sw.js URL, so apps installed from the old version update themselves",
    ],
    lessonsLearned: [
      "Check open data before trusting it — one API endpoint silently dropped verses, so the build script uses another one",
      "Timing data differs between recitations — design for mismatches instead of assuming one numbering",
      "Test the upgrade path, not only a fresh install — real users already have data on their phones",
    ],
    screenshots: [],
  },
  {
    slug: "iphone15-landing",
    title: "iPhone 15 Showcase",
    description:
      "A stunning, Apple-inspired premium landing page showcasing the iPhone 15 with smooth scroll animations, dark-themed interface, and performance-optimized rendering.",
    category: "web",
    status: "archived",
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
    status: "archived",
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
    status: "archived",
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
    status: "archived",
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
