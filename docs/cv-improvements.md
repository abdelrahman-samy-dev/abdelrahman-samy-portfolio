# CV improvements — 11 Nov 2026

Source of truth: `E:\04-10-2026\Abdelrahman_Samy_CV\v2\cv.data.json` (outside this repo). `node build.mjs` there renders both PDFs, re-reads them and fails if any heading, job, date, bullet or link is missing, or if a page limit is exceeded. Published copies live in `public/cv/`; `public/resume.pdf` is the designed CV so old links keep working.

| File | Purpose |
|---|---|
| `Abdelrahman-Samy-Ali-CV.pdf` | Designed, one A4 page, portfolio colours (charcoal + amber), sidebar for skills/education |
| `Abdelrahman-Samy-Ali-CV-ATS.pdf` | Single column, standard headings (Summary / Skills / Experience / Projects / Education), no tables or icons, 2 pages |
| `CV_Text.md` | Plain text for FlowCV / LinkedIn |

## Corrections implemented
- LinkedIn fixed to `linkedin.com/in/abdelrahman-samy-ali` (was `/in/abdelrahman-samy-dev`).
- Headline: **Software Engineer — Full-Stack & Mobile Product Engineering**.
- Rawaylo: now "live since November 2026", described as what it is today (AI call center for restaurants in Egypt).
- Yamama role: added the November 2026 GlooFloo web redesign, the MCP server (OAuth 2.1), revenue/growth flows (manual InstaPay/wallet payments, required phone, funnel events).
- Skills regrouped into Languages / Frontend / Backend / Mobile / AI / Payments & security / Engineering practice; added Three.js, Odoo (Python modules), MCP, 2FA.
- Fonts are now embedded as real font files; the v1 PDF used Type 3 fonts, which ATS parsers often misread. **Stop sending the v1 PDF.**
- Arabic «تراتيل» extracts as real Arabic text (Readex Pro face).

## Verified information (from the owner or project records)
Yamama Software Aug 2026 – Present; VClasses Oct 2025 – Jul 2026; freelance Sep 2023 – Sep 2025; internship Mar – Aug 2024; B.Sc. Helwan 2017 – 2021; GlooFloo and Rawaylo work and their live status; contact details and links. No certifications listed, at the owner's request.

## ATS validation (text extraction with pdfjs)
57 / 57 checks pass: name, headline, email, phone, location, 3 profile URLs, every heading, every job title/company/date and bullet in reverse-chronological order, both projects with links, education. 11 clickable links in each PDF. Metadata: Title and Author set; no tool names. This is structural compatibility, not a score — no ATS vendor publishes one.

## Missing / unverifiable — left out on purpose
- Metrics for GlooFloo or Rawaylo (users, revenue, performance): none verified.
- Team size and exact title wording at Yamama beyond "Software Engineer".
- A city for Yamama Software.

## Recommended future additions
- A measured outcome for GlooFloo or Rawaylo once one exists (e.g. paying workspaces, call minutes handled).
- The GlooFloo mobile app's store links after the v1.0 release.
- Arabic CV version if applying to Arabic-language tenders.
