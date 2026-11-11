# Portfolio audit — 11 Nov 2026

State of `main` (`274ad3a`) before the v4 pass, checked in a real browser (Playwright, 320–1920 px, EN + AR) and with Lighthouse on a local production build.

## Strengths — kept
- A recognisable identity: dark charcoal, warm amber accent, big Space Grotesk / Lalezar display type, the cinematic scroll portrait, the AS monogram intro.
- Already bilingual: `app/[lang]` routes, English at `/`, Arabic at `/ar`, `lang`/`dir` on `<html>`, Arabic copy written in MSA, Lalezar + Alexandria for Arabic.
- Static generation for every page; images in WebP; three.js only in a lazy chunk.
- Case-study pages per project with challenge / solution / architecture / decisions.

## Problems found
| Area | Problem | Fixed in v4 |
|---|---|---|
| Content | LinkedIn URL wrong everywhere (`/in/abdelrahman-samy-dev`) | ✅ single `constants/profile.ts`, real URL |
| Content | Rawaylo shown as "in development"; it has been live since ~9 Nov 2026 | ✅ status, copy, links |
| Content | GlooFloo visuals showed the pre-November UI | ✅ new covers + app screens from the shipped identity |
| Positioning | "a role", "Open to Remote", "Download CV" read as job-seeking | ✅ product/collaboration wording |
| Curation | Four small 2024 exercises (two tutorial clones, two HTML/CSS templates) diluted the work section | ✅ archived (kept in data) |
| Performance | Intro overlay hid the page until frames loaded → mobile LCP 9.0 s, Perf 71 | ✅ see `performance-report.md` |
| Accessibility | Scrubbed "About" words started at 15 % opacity (contrast 1.4:1); muted text 4.3:1; 6 px dot buttons; language link name ≠ visible text | ✅ a11y 100 |
| CV | One FlowCV-style PDF only, wrong LinkedIn, no ATS version | ✅ visual + ATS PDFs from one JSON source |
| QA | No automated tests | ✅ Playwright suite (`npm run test:e2e`) |

## Technical debt still present (not changed on purpose)
- Pre-existing React-compiler lint findings in `CustomCursor`, `CommandPalette`, `DeveloperMode`, `AnimationProvider`, `Navigation` (`setState` in effects). They work; rewriting them carries risk for no user-visible gain.
- `TechStack` uses `<img>` for 22 tiny logos (lint warning). Deliberate: they are 1–8 KB files, `next/image` would add work without benefit.
- The scroll-scrubbed hero sequence is 96 WebP frames (1.3 MB desktop, half on phones). It is the signature of the site, so it stays; it now streams after the page loads.
