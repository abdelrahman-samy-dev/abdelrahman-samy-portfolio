# Performance report — 11 Nov 2026

Lighthouse 12.6.1, local production build (`next build && next start`), Chrome headless. **Mobile** = Lighthouse default (simulated slow 4G, 4× CPU slowdown, Moto G Power viewport); **desktop** = `--preset=desktop`. Lab numbers, not field Core Web Vitals.

## Before (main @ 274ad3a) → after (this branch)

| Page | Form | Perf | A11y | BP | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| `/ar` | mobile | 71 → **85** | 92 → **100** | 100 | 100 | 9.0 s → **4.2 s** | 160 → 80 ms | 0.002 → 0.012 |
| `/` | mobile | — → **86** | — → **100** | 100 | 100 | — → **4.1 s** | 70 ms | 0.006 |
| `/work/gloofloo` | mobile | 85 → **94** | 96 → **100** | 100 | 100 | 4.4 → **3.1 s** | 50 → 30 ms | 0 |
| `/ar/work/rawaylo` | mobile | — → **87** | — → **100** | 100 | 100 | **3.9 s** | 50 ms | 0.001 |
| `/` | desktop | — → **99** | **100** | 100 | 100 | **0.8 s** | 0 ms | 0.001 |
| `/ar` | desktop | 98 → **99** | 96 → **100** | 100 | 100 | 1.0 → **0.8 s** | 0 ms | 0.013 |
| `/work/gloofloo` | desktop | 99 → **100** | 96 → **100** | 100 | 100 | 0.9 → **0.7 s** | 0 ms | 0 |
| `/ar/work/rawaylo` | desktop | — → **100** | **100** | 100 | 100 | **0.7 s** | 0 ms | 0.013 |

("—" = the English home baseline wasn't captured: a shell path-conversion bug in the first run.)

**Observed (unthrottled) LCP on the same runs: 0.31 s home, 0.37 s case study.** The 4 s mobile figure is Lighthouse's slow-4G model of downloading the ~300 KB of JavaScript and ~110 KB of fonts that start before first paint.

## What changed
1. **Intro no longer gates content.** The page renders under the curtain; the curtain lifts once the first frame is in (0.8–1.6 s), instantly with reduced motion. Before, the page stayed `visibility: hidden` until all 96 frames had downloaded (up to 2.6 s cap, far longer on slow links).
2. **Hero frames stream after `load`**, six at a time, first frame at `fetchpriority=high`; phones fetch every second frame (≈ 0.65 MB instead of 1.3 MB).
3. **LCP elements paint immediately:** hero name/intro and case-study header/cover animate with `transform` only (no `opacity: 0` start); the case-study cover uses `loading="eager"` + `fetchPriority="high"` (Next 16 deprecates `priority`).
4. **Fonts:** JetBrains Mono no longer preloaded; English pages no longer download an Arabic web font for the one «العربية» word in the language switch.
5. **Images:** covers 73–80 KB WebP at 1800 px; screens 22–85 KB; archived projects' images are no longer requested.
6. Accessibility fixes (contrast, 24 px targets, accessible names) — see `qa-report.md`.

## Not reached / next steps
- **Mobile Performance 95+ on the home page is not met (85–86).** The remaining cost is library JavaScript (React/Next runtime, Motion, GSAP + ScrollTrigger, Lenis). The next measurable step would be replacing the GSAP horizontal track with CSS scroll-driven animations and lazy-hydrating below-the-fold sections; both change behaviour the owner likes, so they were left for a decision.
- Field data (CrUX) will only exist once the site has real traffic.

Reproduce: `npm run build && npx next start -p 3011`, then run Lighthouse against `/`, `/ar`, `/work/gloofloo`, `/ar/work/rawaylo`.
