# Design direction

**Evolution, not replacement.** The owner likes the current identity, so v4 keeps it and fixes what weakened it.

## Kept
- **Palette** — neutral charcoal (`#0a0a0a`), warm off-white text, amber accent (`--accent-rgb: 233 162 59`). No purple anywhere. Every colour is a token in `app/globals.css`; changing `--accent-rgb` re-themes the site.
- **Type** — Space Grotesk (display), Inter (text), JetBrains Mono (labels); Arabic: Lalezar (display, one weight, never synthetic bold) + Alexandria (text). Arabic gets `letter-spacing: 0` and no uppercase.
- **Signature moments** — AS monogram intro, scroll-scrubbed portrait, horizontal principles track, 3D amber orb (lazy, reduced-motion aware), tilt on project covers.

## Refined
- **Intro** — now 0.8–1.6 s and the page is already rendered underneath; it lifts immediately for reduced-motion users and doesn't replay when you navigate back to the home page.
- **Project covers** — one consistent composition per product: brand backdrop, logo, the real live landing page in a browser frame, the real mobile UI in a phone. EN and AR variants, so Arabic visitors see the Arabic product.
- **Case studies** — "Inside the product" gallery with real app screens; phone captures are framed as phones.
- **Muted text** raised to 5:1 contrast; touch targets ≥ 24 px; scrubbed text starts at a readable opacity.
- **Copy** — product-builder voice ("Building GlooFloo & Rawaylo", "Have a product in mind…"), never "open to work".

## Light theme (added 11 Nov 2026, owner request)
- **Switch** — the community "sky-toggle" (day sky with clouds ⇄ night sky with stars), ported from styled-components to a CSS module (`components/ui/sky-toggle.*`) so no CSS-in-JS runtime ships; a real `role="switch"` checkbox, keyboard-focusable, reduced-motion aware.
- **Tokens** — `html[data-theme="light"]` in `app/globals.css`: paper `#f6f2ea`, ink `#17150f`, muted `#4f4a42` / `#6b655b`, deeper amber `#8f5208` (≥ 4.5:1 on paper and on amber chips). Every hairline/tint uses `rgb(var(--ink-rgb) / α)`, so one token flips them all.
- **Hero** — the portrait sequence is shot on a dark set, so the hero stays a dark stage in both themes (`.stage-dark` re-scopes the dark tokens) and fades into the paper page below.
- **Covers** — light variants composed from the products' own light themes (gloofloo.com, rawaylo.com in light mode, GlooFloo app light); `.theme-dark-only` / `.theme-light-only` swap them without loading the hidden one.
- **No flash** — an inline `<head>` script applies the saved theme before first paint; `?theme=light` in a link opens (and remembers) the light theme. Dark stays the default identity.

## Decided against
- **A backend / CMS** — content changes a few times a year; typed data files in `constants/` are simpler, versioned and reviewable. Contact stays on WhatsApp / email, so there is no form to protect.
- **AI-generated imagery** — every product image is a real capture; covers are compositions of real screens, not generated pictures.
