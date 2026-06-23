# Handoff: qcfinancial Marketing Landing Page

## Overview
A single-page marketing site for **qcfinancial** — an open-source Python library with a C++ core for valuation and risk of linear interest-rate & FX derivatives (strong Chilean-market support: ICP CLP, CLF/UF, Cámara; plus developed markets: SOFR, OIS, IRS, XCCY, FX forwards). It replaces the current MkDocs landing. The page is **bilingual (EN/ES)** with an in-page toggle, and links out to the docs site, the GitHub repo, the PyPI page, and the Streamlit demo app.

## About the Design Files
The file in this bundle — `QcFinancial Landing.dc.html` — is a **design reference created in HTML**, a prototype showing the intended look and behavior. It is **not production code to copy directly**. The `.dc.html` format uses a custom runtime (`{{ }}` template holes, a `Component` logic class, `<helmet>`, `style-hover` attrs) that does **not** belong in a real codebase.

The task is to **recreate this design in the target environment** using its established patterns and libraries (e.g. Next.js/React + Tailwind, Astro, Vue, or plain HTML/CSS — pick what fits the project). Translate `style-hover="…"` to `:hover` rules, `{{ t.x }}` holes to a real i18n strategy, and the logic class to real component code.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, and interactions are specified below — recreate the UI pixel-accurately, then adapt to the codebase's conventions.

## Page Structure (top → bottom)
Single column, centered content, **max-width 1200px**, horizontal padding **32px**. Sections in order:

1. **Sticky nav**
2. **Hero** (full-bleed dark, Monte Carlo animated background)
3. **Trust strip**
4. **Features** (2×2 grid)
5. **Workflow** (dark band, 4 steps)
6. **Markets** (2 cards)
7. **Install CTA** (rounded dark panel)
8. **Footer**

---

## Sections in detail

### 1. Nav (sticky)
- `position: sticky; top: 0; z-index: 50`. Background `rgba(255,255,255,0.85)` + `backdrop-filter: saturate(160%) blur(12px)`. Bottom border `1px solid #e7ecf4`.
- Inner: max-width 1200px, padding `16px 32px`, flex row, `align-items:center`, `gap:32px`.
- **Logo (left):** flex row, `gap:11px`. A 40×40 rounded square (`border-radius:11px`, `background:#0b1d42`, `box-shadow:0 8px 20px -10px rgba(11,29,66,0.55)`) containing the glyphs **`ℚℂ`** set in **STIX Two Math** (21px, color `#f5f1e6`, `letter-spacing:0.02em`). Next to it, the word **`financial`** in **STIX Two Text italic** (500, 22px, color `#0b1d42`). See **Logo** section below — the mark is the blackboard-bold ℚ (rationals) + ℂ (complex), NOT a generic serif.
- **Right cluster:** flex, `gap:14px`.
  - Text links (`gap:26px`, 14.5px, weight 500, color `#44567a`, hover `#0c2a66`): Features, Markets, Workflow, Docs. **Docs links to the external docs site.** The other three are in-page anchors (`#features`, `#markets`, `#workflow`).
  - **EN/ES segmented toggle:** bordered pill (`1px solid #d7deea`, `border-radius:8px`, overflow hidden), two buttons in IBM Plex Mono 12px/600. Active button: `background:#0c2a66; color:#fff`. Inactive: `background:#fff; color:#7585a0`.
  - **GitHub button:** `background:#0c2a66; color:#fff`, 14px/500, padding `9px 16px`, `border-radius:9px`, hover `#0a224f`. GitHub mark icon (16px) + label. Links to `https://github.com/qcfinancial/qcfinancial`.

### 2. Hero
- Background gradient: `linear-gradient(135deg, #081a40 0%, #0c2a66 52%, #0a2257 100%)`. `position:relative; overflow:hidden`.
- **Monte Carlo background:** an SVG (`viewBox 0 0 1200 640`, `preserveAspectRatio="xMidYMid slice"`, absolute, full size) of ~26 simulated interest-rate paths plus a mean path. Generated procedurally (see **Monte Carlo background** below). Purely decorative.
- **Readability overlay:** absolute full-size `linear-gradient(90deg, rgba(8,21,56,0.94) 0%, rgba(8,21,56,0.78) 42%, rgba(8,21,56,0.32) 70%, rgba(8,21,56,0.08) 100%)` — darkens the left where text sits.
- **MC caption** (bottom-right, absolute, `bottom:24px; right:30px`): pill `background:rgba(10,28,72,0.45)`, `border:1px solid rgba(122,240,228,0.22)`, `border-radius:999px`, `backdrop-filter:blur(4px)`, padding `6px 12px`. A 18×2 teal bar (`#8af3e7`) + caption text (`t.mcLabel`) in IBM Plex Mono 11px, color `#9fbbe8`.
- **Content:** max-width 1200px, padding `110px 32px 118px`. Inner block max-width 624px, enters with `qcFade 0.7s ease`.
  - **Eyebrow pill:** `t.eyebrow` (e.g. "OPEN SOURCE · C++ CORE · PYTHON API"), IBM Plex Mono 12px/600, `letter-spacing:0.5px`, color `#7ef0e4`, `background:rgba(34,211,197,0.12)`, `border:1px solid rgba(34,211,197,0.32)`, `border-radius:999px`, padding `6px 12px`. Leading 6px teal dot (`#22d3c5`).
  - **H1** (`t.heroTitle`): 56px, `line-height:1.04`, `letter-spacing:-1.7px`, weight 600, color `#fff`, `text-wrap:balance`, `margin-top:22px`.
  - **Sub** (`t.heroSub`): 19px, `line-height:1.55`, color `#c1d4f1`, max-width 528px, `text-wrap:pretty`, `margin-top:24px`.
  - **CTA row** (`margin-top:34px`, flex, `gap:14px`, wrap):
    - Primary "Read the docs" (`t.ctaDocs`) → **docs site**. `background:#fff; color:#0c2a66`, 15.5px/600, padding `13px 22px`, `border-radius:11px`, hover `background:#eaf0fb; translateY(-1px)`. Trailing arrow icon.
    - Secondary "Try the demo app" (`t.ctaDemo`) → `https://qcf-demo-app.streamlit.app`. `background:rgba(255,255,255,0.06); color:#fff`, `border:1px solid rgba(255,255,255,0.28)`, hover `border-color:#fff; background:rgba(255,255,255,0.12)`.
  - **Install pill** (`margin-top:30px`): bordered group (`1px solid rgba(255,255,255,0.18)`, `border-radius:10px`, `background:rgba(255,255,255,0.05)`). Mono 14px text `$ pip install qcfinancial` (the `$` colored `#7ef0e4`) + a **copy button** (left border divider, `background:rgba(255,255,255,0.08)`, hover `rgba(255,255,255,0.16)`). Clicking copies `pip install qcfinancial` to clipboard and the label flips `copy` → `copied!`/`¡copiado!` for 1600ms.

### 3. Trust strip
- `border-top` & `border-bottom: 1px solid #eef1f7`, `background:#fafbfd`.
- Inner padding `22px 32px`, flex, wrap, `gap:14px 48px`, centered.
- 4 items, each flex row `gap:10px`, 14px/500, color `#44567a`, with a teal-stroke (`#0e8f8a`) 17px icon: `t.trust1` In production since 2017 (clock), `t.trust2` C++ computational core (code brackets), `t.trust3` Windows · macOS · Linux (monitor), `t.trust4` Python 3.10+ (lightning).

### 4. Features
- max-width 1200px, padding `96px 32px 40px`.
- **Header block** (max-width 640px): eyebrow `t.featEyebrow` (Mono 12px/600, `letter-spacing:1px`, uppercase, color `#0e8f8a`); H2 `t.featTitle` (38px, `line-height:1.1`, `letter-spacing:-1px`, 600, `#0b1b34`); sub `t.featSub` (17.5px, `#475677`).
- **Grid:** `grid-template-columns: repeat(2,1fr); gap:20px; margin-top:44px`.
- **Card:** `border:1px solid #e7ecf4; border-radius:18px; padding:30px; background:#fff; transition:all .2s`. Hover: `border-color:#c5d2e8; box-shadow:0 18px 40px -26px rgba(12,42,102,0.3); transform:translateY(-2px)`.
  - Icon chip: 46×46, `border-radius:12px`, `background:#eef4ff`, icon color `#0c2a66` (23px stroke icon).
  - H3 (20px/600, `letter-spacing:-0.3px`, `#0b1b34`, `margin-top:18px`); body (15.5px, `line-height:1.6`, color `#516183`, `margin-top:10px`).
  - Cards: f1 C++ core (lightning icon), f2 clean Python API (code icon), f3 Chilean market (map-pin icon), f4 production-proven (shield-check icon). Copy in `t.f1Title/f1Body … f4Title/f4Body`.

### 5. Workflow (dark band)
- `background:#0b2454`, `margin-top:60px`. Inner padding `84px 32px`.
- Header (max-width 640px): eyebrow `t.wfEyebrow` Mono 12px/600 uppercase color `#5ce0d4`; H2 `t.wfTitle` 38px white; sub `t.wfSub` 17.5px color `#aac0e6`.
- **Grid:** `repeat(4,1fr); gap:16px; margin-top:48px`.
- **Step card:** `background:#102e63; border:1px solid #1d4486; border-radius:16px; padding:24px`. Number (`01`–`04`) Mono 12px/600 color `#5ce0d4`; H3 17.5px/600 white `margin-top:14px`; body 14px color `#9fb6df` `margin-top:8px`. Steps: 01 Fundamental objects, 02 Cashflows, 03 Build operations, 04 Valuation & sensitivity. Copy in `t.wf1Title/Body … wf4`.

### 6. Markets
- max-width 1200px, padding `96px 32px`.
- Header (max-width 640px): eyebrow `t.mktEyebrow` color `#0e8f8a`; H2 `t.mktTitle`; sub `t.mktSub`. Same header type scale as Features.
- **Grid:** `1fr 1fr; gap:22px; margin-top:44px`.
- **Card:** `border:1px solid #e7ecf4; border-radius:20px; padding:32px; background:linear-gradient(180deg,#fbfcfe 0%,#f5f8fc 100%)`.
  - Header row (`gap:12px`): a region badge + H3 (21px/600, `letter-spacing:-0.3px`, `#0b1b34`).
  - Body 15px color `#516183`.
  - **Tag chips:** flex wrap `gap:8px`, Mono 12.5px, padding `6px 11px`, `border-radius:7px`.
  - **Chile card:** badge `CL` (38×28, `border-radius:6px`, `background:#0c2a66`, white). Chips navy: `background:#eaf0fb; border:1px solid #d7e3f7; color:#0c2a66`. Chips: Swap ICP CLP, Swap ICP CLF, Swap Cámara, Forward CLP/USD, UF / CLF, ICP Index. Copy `t.mktChile` / `t.mktChileBody`.
  - **Developed card:** badge `G10` (`background:#0e8f8a`, white). Chips teal: `background:#e7f6f4; border:1px solid #c9ece8; color:#0e7c77`. Chips: SOFR Curve, OIS, IRS, Cross-Currency, FX Forwards, Basis Swaps. Copy `t.mktDev` / `t.mktDevBody`.

### 7. Install CTA
- max-width 1200px, `margin:0 auto 96px`, padding `0 32px`.
- Panel: `background:linear-gradient(135deg,#0c2a66 0%,#0a1f4d 100%); border-radius:26px; padding:64px 56px; text-align:center; position:relative; overflow:hidden`.
- Dotted texture overlay: absolute, `opacity:0.5`, `background-image:radial-gradient(circle at 1px 1px, rgba(255,255,255,0.07) 1px, transparent 0); background-size:26px 26px`.
- H2 `t.ctaTitle` 38px white; sub `t.ctaSub` 18px color `#aac0e6` max-width 520px centered.
- **Install pill** (`margin-top:30px`): `border:1px solid #2a4d8f; border-radius:12px; background:#0a2150`. Mono 16px text (`$` colored `#5ce0d4`) + copy button (`background:#11337a`, hover `#16409a`). Same copy behavior as hero.
- Button row (`margin-top:28px`, centered, wrap): "Read the docs" (white, → docs site) + "View on GitHub" (`t.ctaGithub`, transparent, `border:1px solid #3a5da0`, hover `border-color:#fff`, → GitHub).

### 8. Footer
- `border-top:1px solid #eef1f7; background:#fafbfd`.
- Top grid: max-width 1200px, padding `56px 32px 36px`, `grid-template-columns:1.5fr 1fr 1fr 1fr; gap:40px`.
  - **Col 1 (brand):** logo (36×36 mark + `financial` italic 20px), tagline `t.footTag` (14px color `#67768f` max-width 280px), social row (`gap:12px`, icons color `#67768f` hover `#0c2a66`): GitHub, LinkedIn (`https://www.linkedin.com/in/alvaro-diaz-v-1bb95328/`), Medium (`https://medium.com/@efaa-adiazv`).
  - **Col 2 Product** (`t.footProduct`): Features, Markets, Workflow (links 14.5px color `#516183` hover `#0c2a66`).
  - **Col 3 Resources** (`t.footResources`): Docs (→ docs site), Demo app (`t.footDemo` → Streamlit), PyPI (`https://pypi.org/project/qcfinancial/`), GitHub.
  - **Col 4 Project** (`t.footProject`): a `Q` chip (26×26, `border-radius:7px`, `background:#0b1b34`, white Mono) + `t.footQcode` ("A Qcode project").
- Sub-bar: `border-top:1px solid #eef1f7`, padding `20px 32px`, flex space-between, 13px color `#8593aa`: left `© 2017–2026 Álvaro Díaz Valenzuela`; right `t.footMade` ("Built for quants") in Mono.

---

## Logo
The mark is the **blackboard-bold math symbols ℚ (rationals) + ℂ (complex)** — NOT an inline serif Q/C. The glyphs are from **STIX Two Math**; the wordmark **"financial"** is **STIX Two Text italic**. When "financial" is present, ℚ and ℂ are set tight (`ℚℂ`, no space). Standalone icon/favicon uses `ℚℂ` on the navy chip (`#0b1d42`), glyph color cream `#f5f1e6`.

**Ship the real assets in `brand/` — do NOT render the mark from a live web font.** The fontsource STIX Two Math subset does not include U+211A/U+2102, so the live prototype actually falls back to the viewer's *system serif* for ℚℂ (fragile, machine-dependent). The files in `brand/` are the true STIX Two Math outlines **converted to vector paths**, so they render identically everywhere with no font dependency.

### `brand/` contents
Vector (use these in the build):
- `logo-horizontal.svg` — ℚℂ + *financial*, navy `#0b1d42`, transparent. Primary lockup.
- `logo-horizontal-reversed.svg` — same, cream `#f5f1e6`, transparent. For dark backgrounds.
- `logo-mark.svg` / `logo-mark-reversed.svg` — ℚℂ only (navy / cream), transparent.
- `icon.svg` — app icon: navy rounded-square (radius 22.7%) + cream ℚℂ centered.
- `favicon.svg` — same artwork as `icon.svg`, for `<link rel="icon" type="image/svg+xml">`.

Raster (`brand/png/`) — fallbacks / platform requirements:
- `logo-horizontal.png` (1600w, navy, transparent), `logo-horizontal-reversed.png` (cream, transparent), `logo-horizontal-on-navy.png` (cream on navy, convenience).
- `logo-mark.png` / `logo-mark-reversed.png` (700w, transparent).
- `icon-1024.png`, `icon-512.png`, `icon-192.png` (PWA/Android), `apple-touch-icon.png` (180), `favicon-48/32/16.png`.

`brand/favicon.ico` — multi-resolution (16/32/48) ICO for legacy `/favicon.ico`.

### Favicon wiring (head)
```html
<link rel="icon" type="image/svg+xml" href="/brand/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/brand/png/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/brand/png/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/brand/png/apple-touch-icon.png">
<link rel="icon" href="/brand/favicon.ico" sizes="any"><!-- legacy -->
```
For PWA, reference `icon-192.png` and `icon-512.png` in the web manifest. **Colors:** logo navy `#0b1d42`, cream `#f5f1e6`; the in-nav wordmark on the live site uses navy logo chip with the same cream glyph.

## Interactions & Behavior
- **Language toggle (EN/ES):** all visible copy comes from a translation dictionary keyed by language. Toggling swaps every string instantly (no reload). Default language is configurable (the prototype exposes a `defaultLang` prop, default `es`; current runtime initial state is `en` — pick `es` as the site default per project decisions). **Recreate with the codebase's i18n approach** (e.g. next-intl, vue-i18n, or a simple context). The full EN + ES strings are in the prototype's logic class `T` object — copy them verbatim.
- **Copy-to-clipboard:** both install pills (hero + CTA) copy `pip install qcfinancial` via `navigator.clipboard.writeText`. Label flips to `copied!` / `¡copiado!` for 1600ms, then reverts.
- **Hover states:** nav links, buttons, and feature cards have hover treatments (specified inline above). Recreate as `:hover` CSS.
- **Entrance animations** (keyframes, all `ease`):
  - `qcFade` (0.7s): hero content — opacity 0→1, `translateY(10px)`→0.
  - `qcMC` (~1.5s, staggered 0–0.9s per path): each MC path fades opacity 0→1; mean path fades in at 1s delay over 1.6s.
  - Other keyframes exist in the file (`qcDraw`, `qcFloat`, `qcRise`, `qcDot`) but are **unused** in the current layout — ignore.
- **Responsive:** the prototype is desktop-first at 1200px. Add breakpoints in the build: collapse the 2×2 features and 4-up workflow to 1–2 columns, the markets 2-up to 1 column, and the footer 4-up to 2 columns / stacked on mobile. Provide a mobile nav (the prototype's `[data-nav-links]` slot is empty — design a hamburger/drawer).

## Monte Carlo background (hero)
Decorative SVG generated in JS (`genMC()` in the logic class). Reproduce or replace with any equivalent generator. Parameters: `W=1200, H=640`, `N=26` paths, `steps=60`. Seeded LCG RNG (`seed=137731`) for deterministic output; Box–Muller gaussian. Start `x0=-30 → x1=1230`, `y0=H*0.64`. Per path: `drift = -1.05 - rand()*0.75`, `vol = 9.5 + rand()*5`, clamped to `[28, H-20]`. Path colors cycle `['#3ad6c8','#5a8fe0','#2f9fd6','#46b0dd']`; ~15% of paths "emphasized" (width 2.2, opacity 0.5) vs normal (width 1.1, opacity 0.16–0.36). A **mean path** (average of all paths per step) is drawn in `#8af3e7`, width 2.6, opacity 0.92. The full source is in the prototype — copy it directly if reusing. It is purely decorative; a static SVG export is an acceptable substitute if a generator is overkill.

## State Management
- `lang`: `'en' | 'es'` — drives all copy. Init from a `defaultLang` setting; persist to localStorage/cookie if desired.
- `copied`: boolean — transient, drives both copy-button labels; auto-resets after 1600ms.

## Design Tokens

### Colors
| Token | Hex | Use |
|---|---|---|
| Ink | `#0b1b34` | Primary heading text |
| Body | `#475677` / `#516183` | Body copy |
| Muted | `#44567a` / `#67768f` / `#8593aa` | Nav, footer, captions |
| Navy | `#0c2a66` | Primary brand / buttons |
| Deep navy | `#081a40` / `#0a1f4d` / `#0a2257` | Hero & CTA gradients |
| Workflow navy | `#0b2454` | Workflow band bg |
| Workflow card | `#102e63` / border `#1d4486` | Workflow step cards |
| Logo navy | `#0b1d42` | Logo chip |
| Cream | `#f5f1e6` | Logo glyph |
| Teal accent | `#22d3c5` | Hero dot / accents |
| Teal (dark) | `#0e8f8a` / `#0e7c77` | Light-section eyebrows, trust icons, G10 |
| Teal (light) | `#5ce0d4` / `#7ef0e4` / `#8af3e7` | Dark-section accents, MC mean |
| Page bg | `#ffffff`; strip bg `#fafbfd` / `#f6f8fb` | Backgrounds |
| Border | `#e7ecf4` / `#eef1f7` / `#d7deea` | Hairlines |
| Chip navy | bg `#eaf0fb` border `#d7e3f7` | Chile tags |
| Chip teal | bg `#e7f6f4` border `#c9ece8` | Developed tags |
| Icon chip | `#eef4ff` | Feature icon bg |

### Typography
- **IBM Plex Sans** (weights 300/400/500/600/700) — UI & headings.
- **IBM Plex Mono** (400/500/600) — code, labels, data, eyebrows, badges.
- **STIX Two Math** — logo glyphs `ℚℂ`. **STIX Two Text italic** (500) — wordmark "financial".
- Scale: H1 56px / H2 38px / H3 20–21px (cards), 17.5px (workflow) / body 15–19px / labels 11–14px. Heading letter-spacing −1px to −1.7px; line-height 1.04 (H1) to 1.6 (body).

### Spacing & radii
- Content max-width **1200px**, horizontal padding **32px**.
- Section vertical padding ~84–110px; hero `110/118`.
- Radii: pills 999px; buttons 9–11px; cards 16–20px; CTA panel 26px; logo chip 10–11px; chips/badges 6–7px.
- Shadows: card hover `0 18px 40px -26px rgba(12,42,102,0.3)`; logo chip `0 8px 20px -10px rgba(11,29,66,0.55)`.

## Assets
- **Fonts:** Google Fonts (IBM Plex Sans + Mono); `@fontsource/stix-two-math@5` and `@fontsource/stix-two-text@5/500-italic` via jsDelivr in the prototype. In the build, self-host or use the project's font pipeline.
- **Icons:** inline SVGs (Feather/Lucide-style 24px stroke icons + GitHub/LinkedIn/Medium brand marks). Swap for the codebase's icon set.
- **Logo & favicon:** shipped as real assets in `brand/` (vector SVG + PNG + `.ico`) — see the **Logo** section. No live-font dependency.
- **No images.** The hero "graphic" is the generated MC SVG.

## External links (wire these up)
- Docs site — nav "Docs", hero/CTA "Read the docs", footer "Docs" (the prototype points at `QcFinancial Docs.dc.html`; **repoint to the live docs site URL**).
- GitHub: `https://github.com/qcfinancial/qcfinancial`
- Demo: `https://qcf-demo-app.streamlit.app`
- PyPI: `https://pypi.org/project/qcfinancial/`
- LinkedIn: `https://www.linkedin.com/in/alvaro-diaz-v-1bb95328/`
- Medium: `https://medium.com/@efaa-adiazv`

## Files in this bundle
- `QcFinancial Landing.dc.html` — the prototype. The full bilingual copy (EN + ES) lives in the `T` dictionary inside its `<script data-dc-script>` logic class — copy strings verbatim. The MC generator is `genMC()`. Ignore the `.dc.html` runtime mechanics (`{{ }}`, `<helmet>`, `style-hover`, `<sc-for>`) — they are prototype-only.
- `brand/` — production logo + favicon assets (vector SVG, PNG, `.ico`). See the **Logo** section for the full manifest and favicon wiring.
