# QA report — 11 Nov 2026

## Automated
| Check | Result |
|---|---|
| `tsc --noEmit` | pass |
| `next build` | pass — 16 static pages (EN + AR home, 4 published case studies × 2 languages, icons, sitemap, robots, OG) |
| ESLint | 9 findings, all pre-existing on `main` (React-compiler `setState`-in-effect in cursor / palette / dev-mode / animation provider / nav mount, one `<img>` warning). None introduced by this branch. |
| Playwright `npm run test:e2e` | **40 passed, 2 skipped by design** (desktop-only shortcut on phone, touch-only check on desktop) on desktop Chrome and a Pixel 7 profile |

Playwright covers: EN/AR `lang` + `dir`, every section present, featured projects under localized titles, no console errors or failed local requests, no horizontal overflow at 320 / 375 / 768 / 1024 / 1440 px for five sections in both languages, language switch target and navigation, contact links equal `constants/profile.ts`, all 8 case-study routes return 200 with the right `h1` and a loaded cover, both CV PDFs + `/resume.pdf` served as PDF, sitemap / robots / `/en` → `/` redirect, Ctrl+K palette, touch screens show experience details, reduced motion skips the intro.

## Manual / visual (Playwright screenshots, reviewed)
- Desktop 1440 and iPhone 13: hero, featured work, contact, case-study gallery — EN and AR.
- Horizontal principles track: desktop pins and moves right-to-left in English, left-to-right in Arabic; the last card reaches the centre fully opaque; phones get a swipe row with snap and dots (touch-drag tested with CDP touch events).
- Covers: no customer data, no tender data; Arabic covers use the Arabic product UI.

## Accessibility
Lighthouse accessibility 100 on all eight measured runs. Fixed: scroll-scrubbed words start at 40 % opacity (large text ≥ 3:1), muted text raised to ~5:1, principle dots have 24 px targets, the language link's accessible name matches its visible text, section index labels no longer use 40 % opacity. Not covered by tools: a full screen-reader pass (NVDA/VoiceOver) and 200 % zoom review — recommended before publishing.

## Links checked (11 Nov 2026)
gloofloo.com, rawaylo.com, the 4 live demos, 6 GitHub repos, yamamasoftware.com: 200. LinkedIn answers 999 to scripts (its normal bot response); the URL was given by the owner. vclasses.com answers 403 to scripts and isn't linked from the page.

## Known limitations
- Mobile Lighthouse Performance on the home page is 85–86 (target 95); see `performance-report.md`.
- `rawaylo-inbox.webp` is from 22 Oct; the dashboard has changed since.
- Not tested on real iOS Safari or Firefox.
