# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

The public landing page for **qcfinancial** — an open-source Python library (C++ core) for valuation and risk of linear interest-rate & FX derivatives, with strong Chilean-market support (ICP CLP, CLF/UF, Cámara) plus developed markets (SOFR, OIS, IRS, XCCY, FX forwards). It is a **static, build-less, bilingual (ES default / EN) single page** deployed via **Cloudflare Pages**. The canonical URL is `https://qcfinancial.cl/` (apex custom domain); `https://www.qcfinancial.cl/` redirects to it. The site was formerly on GitHub Pages — `https://qcfinancial.github.io/` **no longer serves it** (don't reintroduce that URL for the site; it now 404s).

The documentation lives in a **separate** site at `https://qcfinancial.github.io/qcfinancial-docs` — this repo only links out to it.

## Stack & layout

Plain HTML/CSS/vanilla JS — **no framework, no build step, no package manager.**

- `index.html` — page markup. Spanish copy ships **inline**; every translatable node carries a `data-i18n="<key>"` attribute.
- `styles.css` — design tokens (CSS custom properties), section layouts, `:hover` states, responsive breakpoints, mobile-nav styles.
- `app.js` — all behavior, wrapped in one IIFE. Holds the bilingual `T` dictionary and `genMC()` (both copied **verbatim** from the original prototype — preserve them if editing).
- `brand/` — logo/favicon/social-card assets (SVG / PNG / ICO). The ℚℂ mark is rendered from these assets, never a web font.
- `robots.txt`, `sitemap.xml` — crawl directives (both reference the canonical `https://qcfinancial.cl/`).
- `.nojekyll` — inert leftover from GitHub Pages (stopped Jekyll processing). Harmless on Cloudflare Pages; no longer functional.
- `CNAME` — single line `qcfinancial.cl`; inert leftover from GitHub Pages. On Cloudflare Pages the custom domain is bound in the Pages dashboard, not by this file, so it's just a served static file now. Safe to delete, but harmless.
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
- **`og:image` must stay an absolute URL** (`https://qcfinancial.cl/brand/png/social-card.png`) — social crawlers fetch it externally, so it must point at a host that actually serves the site (the apex, not the dead github.io). The `canonical`, `og:url`, JSON-LD `url`, `sitemap.xml`, and `robots.txt` sitemap line all use `https://qcfinancial.cl/` for the same reason. The social card is 1200×630.
- **Adding/translating a string:** add the key to *both* `en` and `es` in the `T` object in `app.js`, write the Spanish text into the markup, and tag the node with `data-i18n="<key>"`.

## Hosting

**Cloudflare Pages** deploys the site via **Git integration**: the Pages project (`qcfinancial-github-io`, on `qcfinancial-github-io.pages.dev`) is connected to this GitHub repo and auto-builds on every push to `main`. There's no build step and no CI config in the repo — Cloudflare serves the repo root as-is; pushing to `main` publishes.

**Custom domain & DNS.** DNS is hosted on **Cloudflare** (NIC Chile is only the registrar, with its nameservers delegated to Cloudflare). The custom domains are bound in the Pages project's **Custom domains** tab (not via the repo `CNAME` file). The two live records:

- `qcfinancial.cl` — `CNAME` → `qcfinancial-github-io.pages.dev`, **Proxied (orange cloud)**.
- `www.qcfinancial.cl` — `CNAME` → `qcfinancial-github-io.pages.dev`, **Proxied**, with a Cloudflare Redirect Rule sending `www` → apex.

For Cloudflare Pages the records **must be Proxied** (orange) — this is the opposite of the old GitHub-Pages rule, where records had to be grey-cloud/DNS-only or GitHub's cert flow broke. TLS is Cloudflare-managed (SSL/TLS mode "Full").

Legacy GitHub-Pages DNS (four `A` + four `AAAA` on the apex → GitHub IPs, the `www` `CNAME` → `qcfinancial.github.io`, the `_github-pages-challenge-qcfinancial` TXT, and any `localhost` MX / `"expired"` TXT placeholders) is obsolete and should be removed.

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
