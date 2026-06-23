## Context

`qcfinancial.github.io` currently serves a MkDocs Material site built by `.github/workflows/ci.yml` (`mkdocs gh-deploy --force`) into the `gh-pages` branch. The documentation has since moved to a separate location (`qcfinancial.github.io/qcfinancial-docs`), so the root domain should become a marketing landing page instead.

The landing-page design is already fully specified:
- `README.md` — a high-fidelity design handoff (tokens, section-by-section layout, interactions, external links).
- `QcFinancial Landing.dc.html` — a prototype in a custom `.dc.html` runtime. Its runtime mechanics (`{{ }}` holes, `Component`/`DCLogic` class, `<helmet>`, `style-hover`, `<sc-for>`) are prototype-only and must NOT be copied; but the bilingual `T` dictionary and the `genMC()` Monte-Carlo generator are to be copied verbatim.
- `brand/` — production logo/favicon assets (SVG, PNG, ICO) plus `brand/png/social-card.png` (1200×630).

Decisions in this design were settled in an exploration session with the maintainer (a quant, not a frontend developer).

## Goals / Non-Goals

**Goals:**
- Replace the docs site at the root domain with the specified bilingual landing page.
- No build system: hand-authored `index.html` + `styles.css` + `app.js` served as static files.
- Keep hosting on GitHub Pages.
- Spanish-default content that is properly indexable; English available via in-page toggle.
- Solid SEO and social-preview metadata for the Spanish page.

**Non-Goals:**
- No framework, bundler, transpiler, or package manager.
- No separate per-language URLs / `hreflang` pair (single-page, ES-indexed only — see Decisions).
- No changes to the separate documentation site.
- No new brand artwork beyond the already-delivered social card.

## Decisions

### Plain HTML/CSS/JS, no build
A single static page with a small amount of vanilla JS. Rationale: it is one marketing page with two pieces of dynamic state (language, copy-button feedback) and a decorative SVG generator — a framework or SSG would be pure overhead. *Alternatives considered:* Next.js/Astro/Vue (rejected as overkill); these were the open options in `README.md`.

### Approach A — HTML is the i18n source of truth
Spanish strings live in the markup; translatable elements carry a `data-i18n` key; `app.js` walks those nodes and replaces text from the `T` dictionary on toggle. *Alternative:* render the whole DOM from the `T` object in JS (mirrors the prototype's `Component`). Rejected because it leaves the served HTML empty, which is bad for SEO and no-JS rendering.

### Spanish default + single page = ES-only SEO (Option 1)
The page ships ES in markup and JS-swaps to EN in place; there is one URL and one indexed language (Spanish). *Alternative considered:* two static pages (`/` ES, `/en/` EN) with `hreflang` for full bilingual SEO. Rejected because, with no build system, it means maintaining duplicate markup by hand — reintroducing exactly the duplication an SSG exists to remove. qcfinancial's distinctive, rankable niche (Chilean-market derivatives: ICP CLP, Cámara, CLF/UF) is Spanish-language; English discovery realistically comes from PyPI/GitHub/word-of-mouth, so the English SEO that Option 2 buys is low value.

### Toggle also updates `<html lang>`, title, and meta
When switching language, JS updates the document language attribute and the title/description so the document stays honest for browsers, translation tools, and accessibility — cheap to do and avoids a Spanish `lang` on English content.

### Persist language preference in localStorage
The selected language is stored in `localStorage` and re-applied on the next visit; with no stored value, the page stays on its Spanish default. Since Spanish ships in the markup, a stored English preference is applied client-side just after load. *Alternative considered:* always boot to Spanish with no memory (prototype behavior) — rejected so returning English-speaking visitors aren't forced to re-toggle. SEO is unaffected because crawlers receive the Spanish markup regardless, and the canonical/indexed language stays Spanish.

### Pages served from `main` root + `.nojekyll`
Deleting the Action means Pages must be repointed from the Action-built `gh-pages` branch to `main`/root (a manual repo-settings change). `.nojekyll` prevents Jekyll from processing/omitting files (notably anything beginning with `_`).

## Risks / Trade-offs

- **English is not indexed** → Accepted per the Option 1 decision; English remains a visitor-facing convenience, not a search surface.
- **Cutover timing** → The live site flips from docs to landing page the moment Pages is repointed to `main`. Mitigation: land all files on `main` first, verify locally, then flip the Pages source as the deliberate go-live step.
- **Losing prototype content during cleanup** → The verbatim `T` strings and `genMC()` exist only in the `.dc.html` and the handoff. Mitigation: port them into `app.js` (and preserve the spec) BEFORE deleting `QcFinancial Landing.dc.html` / repurposing `README.md`.
- **Mobile nav has no reference design** → The prototype is desktop-only and leaves the mobile nav slot empty. Mitigation: design a simple hamburger/drawer; treat as real (not transcription) work.
- **Clipboard API needs a secure context** → `navigator.clipboard` requires HTTPS; GitHub Pages is HTTPS, so this is fine in production but may need a fallback when testing over `file://`.
- **`og:image` must be absolute** → Social crawlers fetch it externally; use the full `https://qcfinancial.github.io/brand/png/social-card.png` URL, not a relative path.

## Migration Plan

1. Author the static page (`index.html`, `styles.css`, `app.js`) and SEO files (`sitemap.xml`, `robots.txt`, `.nojekyll`) on `main`, porting `T` and `genMC()` from the prototype.
2. Verify locally (serve the folder over HTTP, not `file://`, so the clipboard and asset paths behave).
3. Remove MkDocs artifacts (`mkdocs.yml`, `docs/`, `.github/workflows/ci.yml`) and obsolete files (`README_old.md`, the `.dc.html` prototype), and repurpose `README.md`.
4. **Go-live (manual):** in repo Settings → Pages, switch the source from the `gh-pages` branch to `main` / root. Optionally delete the now-unused `gh-pages` branch afterward.
5. Verify the published site and validate social previews / structured data.

**Rollback:** the previous docs site remains recoverable from git history and the `gh-pages` branch; re-pointing Pages back restores it.

## Open Questions

- Final mobile-nav interaction (hamburger drawer vs. simpler collapse)?
- Where should the design spec (`README.md` contents) and verbatim `T` strings live long-term — inline in `app.js`, or a preserved doc under `openspec/`?
