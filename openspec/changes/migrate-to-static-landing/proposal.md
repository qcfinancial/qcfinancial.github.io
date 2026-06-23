## Why

This repo currently builds a MkDocs Material documentation site, but the documentation now lives elsewhere (`qcfinancial.github.io/qcfinancial-docs`). The root domain `qcfinancial.github.io` should instead serve a polished, bilingual (ES/EN) marketing landing page — the design for which is already fully specified in `README.md` and prototyped in `QcFinancial Landing.dc.html`, with production brand assets ready in `brand/`. We want to ship that landing page with no build system and keep hosting on GitHub Pages.

## What Changes

- **BREAKING**: Remove the MkDocs site entirely — delete `mkdocs.yml`, the `docs/` folder, and the `mkdocs gh-deploy` workflow at `.github/workflows/ci.yml`.
- **BREAKING**: Change GitHub Pages to serve **statically from the `main` branch root** instead of from an Action-built `gh-pages` branch. (Manual repo-settings change; see Impact.)
- Add a hand-authored static landing page: `index.html` + `styles.css` + `app.js`, built from the `README.md` spec and the `.dc.html` prototype, using the `brand/` assets. No framework, no build step.
- Bilingual ES/EN content with an in-page toggle: **Spanish ships in the markup** (default + indexed language); JavaScript swaps visible strings to English in place.
- Full SEO `<head>` plumbing for the Spanish page: title, meta description, canonical, OpenGraph (using `brand/png/social-card.png`), Twitter card, JSON-LD, plus `sitemap.xml` and `robots.txt`.
- Add `.nojekyll` so GitHub Pages serves files as-is.
- Repurpose `README.md` into a normal repo README; preserve the verbatim ES/EN `T` strings and `genMC()` source from the prototype before they are lost. Remove the obsolete `README_old.md`.

## Capabilities

### New Capabilities
- `landing-page`: The marketing page itself — section structure, layout, brand lockup, the Monte-Carlo hero, the copy-to-clipboard install pill, hover states, and responsive/mobile navigation.
- `language-toggle`: Bilingual ES/EN content driven by an in-page toggle, with Spanish as the default and source-of-truth language.
- `seo-metadata`: Discoverability plumbing — document metadata, social preview tags, structured data, sitemap, and robots directives.
- `site-hosting`: Build-less static hosting on GitHub Pages served from the `main` branch root, replacing the MkDocs deployment pipeline.

### Modified Capabilities
<!-- None — no existing OpenSpec specs to modify. -->

## Impact

- **Removed files/systems**: `mkdocs.yml`, `docs/`, `.github/workflows/ci.yml`, `README_old.md`, and the `gh-pages` deployment branch.
- **New files**: `index.html`, `styles.css`, `app.js`, `.nojekyll`, `sitemap.xml`, `robots.txt`; new README content.
- **Assets**: reuses existing `brand/` SVG/PNG/ICO assets and the new `brand/png/social-card.png` (1200×630).
- **Manual operations** (not code): switch GitHub Pages source from `gh-pages` to `main` / root in repo Settings → Pages. Until this is flipped, the new page will not be served.
- **External links to keep consistent**: docs (`qcfinancial.github.io/qcfinancial-docs`), GitHub, PyPI, Streamlit demo, LinkedIn, Medium.
- **Risk**: the deploy-source switch is the cutover point; the live site changes from docs to landing page the moment Pages is repointed.
