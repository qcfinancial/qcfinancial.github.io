# landing-page Specification

## Purpose

The marketing landing page itself — section structure, layout, brand lockup, the Monte-Carlo hero, the copy-to-clipboard install pill, hover states, and responsive/mobile navigation.

## Requirements

### Requirement: Single-page marketing layout
The landing page SHALL be a single static `index.html` presenting the sections defined in the `design/landing-spec.md` design spec, in order: sticky nav, hero, trust strip, features (2×2), workflow (4 steps), markets (2 cards), install CTA, and footer. Content SHALL be centered with a max content width of 1200px and 32px horizontal padding.

#### Scenario: All sections render in order
- **WHEN** the page is loaded in a desktop browser
- **THEN** the nav, hero, trust strip, features, workflow, markets, install CTA, and footer appear in that vertical order with the design tokens (colors, typography, spacing, radii) from the design spec

#### Scenario: External links are wired
- **WHEN** a user activates the Docs, GitHub, PyPI, or demo-app links
- **THEN** they navigate to the documented URLs (docs site, `github.com/qcfinancial/qcfinancial`, `pypi.org/project/qcfinancial/`, `qcf-demo-app.streamlit.app`) respectively

### Requirement: Brand lockup from shipped assets
The page SHALL render the ℚℂ + *financial* brand mark using the vector/raster assets in `brand/`, and SHALL NOT depend on a live web font for the ℚℂ glyphs.

#### Scenario: Logo renders without font dependency
- **WHEN** the page loads with web fonts blocked or unavailable
- **THEN** the ℚℂ + *financial* mark still renders correctly because it uses the `brand/` asset, not a runtime-loaded font

### Requirement: Monte-Carlo hero background
The hero SHALL display the decorative Monte-Carlo interest-rate-paths background reproduced from the prototype's `genMC()` generator (or an equivalent/static export), with the readability overlay that keeps hero text legible.

#### Scenario: Hero remains readable
- **WHEN** the hero renders with the Monte-Carlo background
- **THEN** the eyebrow, heading, subtitle, and CTAs remain legible over the darkened-left readability overlay

### Requirement: Copy-to-clipboard install pill
Each install pill (hero and install CTA) SHALL copy `pip install qcfinancial` to the clipboard when its copy button is activated, and SHALL show a transient confirmation label that reverts after roughly 1600ms.

#### Scenario: User copies the install command
- **WHEN** a user clicks the copy button on an install pill
- **THEN** `pip install qcfinancial` is written to the clipboard
- **AND** the button label changes to the confirmation text (`copied!` / `¡copiado!`) and reverts after ~1600ms

### Requirement: Responsive layout and mobile navigation
The page SHALL adapt below desktop widths: the features and workflow grids collapse toward 1–2 columns, the markets grid collapses to one column, and the footer grid reduces to fewer columns. A mobile navigation control (e.g. a hamburger menu) SHALL provide access to the nav links on small screens, since the prototype defines none.

#### Scenario: Narrow viewport
- **WHEN** the page is viewed at a typical mobile width
- **THEN** multi-column grids stack appropriately and the nav links are reachable through the mobile navigation control
