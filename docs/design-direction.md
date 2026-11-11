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

## Decided against
- **Light theme** — the identity is built on a dark stage (portrait sequence, amber glow, 3D orb). A light theme would need a second art direction for each of those; low value for the cost.
- **A backend / CMS** — content changes a few times a year; typed data files in `constants/` are simpler, versioned and reviewable. Contact stays on WhatsApp / email, so there is no form to protect.
- **AI-generated imagery** — every product image is a real capture; covers are compositions of real screens, not generated pictures.
