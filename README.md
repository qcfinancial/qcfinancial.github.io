# qcfinancial.github.io

Source for the **qcfinancial** landing page, published at
<https://qcfinancial.github.io/>.

A static, bilingual (Spanish default / English) single page describing
[qcfinancial](https://github.com/qcfinancial/qcfinancial) — an open-source
Python library with a C++ core for valuation and risk of linear interest-rate
and FX derivatives.

## Stack

Plain HTML, CSS, and vanilla JavaScript — **no build step**.

| File | Purpose |
|------|---------|
| `index.html` | Page markup. Spanish copy ships inline; translatable nodes carry `data-i18n` keys. |
| `styles.css` | Design tokens, layout, hover states, responsive breakpoints, mobile nav. |
| `app.js` | ES/EN toggle, `localStorage` persistence, copy-to-clipboard, the Monte-Carlo hero, mobile drawer. Holds the bilingual `T` dictionary and `genMC()`. |
| `brand/` | Logo, favicon, and social-card assets (SVG / PNG / ICO). |
| `robots.txt`, `sitemap.xml`, `.nojekyll` | Crawl directives and Pages config. |
| `design/landing-spec.md` | The original high-fidelity design handoff (kept for reference). |

## Develop locally

Serve the folder over HTTP (not `file://`, so the clipboard API and absolute
asset paths behave):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Internationalization

Spanish is the default and ships in the HTML (so crawlers index Spanish).
English is applied client-side: `app.js` swaps every `data-i18n` node from the
`T` dictionary and updates `<html lang>`, the title, and the meta description.
The selected language is remembered in `localStorage`.

## Hosting

Served by GitHub Pages directly from the `main` branch root (no Action, no
build). `.nojekyll` keeps Pages from running Jekyll over the files.

The social preview card lives at `brand/png/social-card.png` (1200×630) and is
wired via the `og:image` / `twitter:image` tags in `index.html`.
