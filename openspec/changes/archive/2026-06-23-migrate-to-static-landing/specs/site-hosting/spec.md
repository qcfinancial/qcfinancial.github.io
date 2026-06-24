## ADDED Requirements

### Requirement: Build-less static hosting on GitHub Pages
The site SHALL be served by GitHub Pages directly from the `main` branch root as static files, with no build step. The repository SHALL contain a `.nojekyll` file so Pages serves files as-is without Jekyll processing.

#### Scenario: Static files served directly
- **WHEN** GitHub Pages is configured to serve `main` / root and changes are pushed to `main`
- **THEN** the published site reflects the committed static files with no build pipeline involved
- **AND** the presence of `.nojekyll` prevents Jekyll from altering or omitting files

### Requirement: MkDocs deployment removed
The repository SHALL NOT contain the MkDocs site or its deployment automation. `mkdocs.yml`, the `docs/` content folder, and the `mkdocs gh-deploy` GitHub Actions workflow SHALL be removed.

#### Scenario: No MkDocs artifacts remain
- **WHEN** the repository is inspected after the change
- **THEN** `mkdocs.yml`, `docs/`, and `.github/workflows/ci.yml` are absent and nothing triggers a MkDocs deploy

### Requirement: Preserve prototype source before removal
Before obsolete files are deleted, the verbatim bilingual `T` translation strings and the `genMC()` generator from `QcFinancial Landing.dc.html` SHALL be carried into the production source (`app.js`) or otherwise preserved, so no copy or generator logic is lost.

#### Scenario: Strings and generator survive cleanup
- **WHEN** the prototype and obsolete files are removed
- **THEN** the complete ES and EN strings and the Monte-Carlo generator still exist in the shipped source
