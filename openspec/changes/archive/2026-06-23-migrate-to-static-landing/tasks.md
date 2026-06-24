## 1. Preserve prototype source

- [x] 1.1 Extract the complete bilingual `T` dictionary (ES + EN) from `QcFinancial Landing.dc.html` verbatim
- [x] 1.2 Extract the `genMC()` Monte-Carlo generator (params: W=1200, H=640, N=26, steps=60, seed=137731) verbatim
- [x] 1.3 Decide and record where the design spec (current `README.md`) will be preserved long-term

## 2. Page scaffold and structure

- [x] 2.1 Create `index.html` with `<html lang="es">` and the eight sections in order (nav, hero, trust, features, workflow, markets, install CTA, footer)
- [x] 2.2 Write Spanish copy directly into the markup, tagging translatable nodes with `data-i18n` keys matching the `T` dictionary
- [x] 2.3 Wire all external links (docs, GitHub, PyPI, Streamlit demo, LinkedIn, Medium)
- [x] 2.4 Reference the brand mark from `brand/` assets (no live-font dependency for ℚℂ)

## 3. Styling

- [x] 3.1 Create `styles.css` implementing the design tokens from `README.md` (colors, typography scale, spacing, radii, shadows)
- [x] 3.2 Implement all section layouts at desktop width (max 1200px, 32px padding)
- [x] 3.3 Translate prototype `style-hover` attributes into `:hover` rules
- [x] 3.4 Set up the font pipeline (IBM Plex Sans/Mono; STIX handled via brand assets)
- [x] 3.5 Add responsive breakpoints (collapse feature/workflow/markets/footer grids)

## 4. Behavior (app.js)

- [x] 4.1 Implement the ES/EN toggle that swaps `data-i18n` text from the `T` dictionary in place
- [x] 4.2 On toggle, update `<html lang>`, document `<title>`, and meta description to the selected language
- [x] 4.3 Persist the selected language in `localStorage` and re-apply it on load (Spanish default when none stored)
- [x] 4.4 Implement copy-to-clipboard for both install pills with the ~1600ms confirmation label
- [x] 4.5 Render the Monte-Carlo hero background from `genMC()` (or a static SVG export)
- [x] 4.6 Implement the mobile navigation control (hamburger/drawer)

## 5. SEO and metadata

- [x] 5.1 Add Spanish `<title>`, meta description, and canonical (`https://qcfinancial.github.io/`)
- [x] 5.2 Add OpenGraph + Twitter Card tags with absolute `og:image` = `brand/png/social-card.png`, width 1200 / height 630, locale `es_CL`, card `summary_large_image`
- [x] 5.3 Add JSON-LD structured data describing the project
- [x] 5.4 Wire favicons per the `README.md` head snippet
- [x] 5.5 Add `robots.txt` and `sitemap.xml`

## 6. Hosting cutover

- [x] 6.1 Add `.nojekyll`
- [x] 6.2 Verify the site locally over HTTP (clipboard + asset paths)
- [x] 6.3 Remove MkDocs artifacts: `mkdocs.yml`, `docs/`, `.github/workflows/ci.yml`
- [x] 6.4 Remove obsolete files: `README_old.md`, `QcFinancial Landing.dc.html`; repurpose `README.md` into a normal repo README
- [ ] 6.5 (Manual) Switch GitHub Pages source from `gh-pages` to `main` / root in repo settings
- [ ] 6.6 Verify the published site and validate social previews + structured data
