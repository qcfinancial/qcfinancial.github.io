# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

The public landing page for **qcfinancial** — an open-source Python library (C++ core) for valuation and risk of linear interest-rate & FX derivatives, with strong Chilean-market support (ICP CLP, CLF/UF, Cámara) plus developed markets (SOFR, OIS, IRS, XCCY, FX forwards). It is a **static, build-less, bilingual (ES default / EN) single page** published to `https://qcfinancial.github.io/` via GitHub Pages.

The documentation lives in a **separate** site at `https://qcfinancial.github.io/qcfinancial-docs` — this repo only links out to it.

## Stack & layout

Plain HTML/CSS/vanilla JS — **no framework, no build step, no package manager.**

- `index.html` — page markup. Spanish copy ships **inline**; every translatable node carries a `data-i18n="<key>"` attribute.
- `styles.css` — design tokens (CSS custom properties), section layouts, `:hover` states, responsive breakpoints, mobile-nav styles.
- `app.js` — all behavior, wrapped in one IIFE. Holds the bilingual `T` dictionary and `genMC()` (both copied **verbatim** from the original prototype — preserve them if editing).
- `brand/` — logo/favicon/social-card assets (SVG / PNG / ICO). The ℚℂ mark is rendered from these assets, never a web font.
- `robots.txt`, `sitemap.xml`, `.nojekyll` — crawl directives + Pages config.
- `design/landing-spec.md` — the original high-fidelity design handoff; the source of truth for tokens, layout, and copy. Consult it before changing visual design.

## Develop / preview

No build. Serve the folder over HTTP (not `file://`, or the clipboard API and root-absolute `/brand/...` paths break):

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Architecture notes (the non-obvious parts)

- **i18n is "Approach A": HTML is the source of truth.** Spanish text is in the markup so crawlers index Spanish; English is **only** in the `T` dict in `app.js` and applied client-side. Consequence: English is *not* indexed — this is intentional (single URL, ES-only SEO). Don't "fix" it by adding English to the markup.
- **The toggle does more than swap text.** On language change `app.js` also updates `<html lang>`, the document `<title>`, and the meta description (from `DOC_META`), and persists the choice to `localStorage` (key `qcf-lang`). A returning EN visitor sees a brief flash of Spanish before the stored preference applies — inherent to Approach A.
- **Logo font-independence is deliberate.** The blackboard-bold ℚℂ glyphs (U+211A/U+2102) are missing from common web-font subsets, so they come from `brand/logo-mark-reversed.svg` inside the navy chip. Only the plain-Latin "financial" wordmark uses a web font (STIX Two Text italic). Keep ℚℂ as an asset.
- **`og:image` must stay an absolute URL** (`https://qcfinancial.github.io/brand/png/social-card.png`) — social crawlers fetch it externally. The social card is 1200×630.
- **Adding/translating a string:** add the key to *both* `en` and `es` in the `T` object in `app.js`, write the Spanish text into the markup, and tag the node with `data-i18n="<key>"`.

## Hosting

GitHub Pages serves directly from the `main` branch **root** (no Action, no `gh-pages` build). `.nojekyll` stops Jekyll from processing files. There is no CI; pushing to `main` publishes.

## Spec workflow

This repo uses OpenSpec (`openspec/`). The static-site migration was tracked as the change `migrate-to-static-landing`. Use the `openspec-*` / `opsx:*` skills for proposal/apply/archive workflows.

## Conventions

- Site copy is **bilingual ES/EN with Spanish as the default**; match the surrounding language when editing.
- Attribution: "© 2017–2026 Álvaro Díaz Valenzuela" / "A Qcode project".

## Key external links (keep consistent across the page)

- Docs: `https://qcfinancial.github.io/qcfinancial-docs`
- GitHub: `https://github.com/qcfinancial/qcfinancial`
- PyPI: `https://pypi.org/project/qcfinancial/`
- Demo (Streamlit): `https://qcf-demo-app.streamlit.app`
