# seo-metadata Specification

## Purpose

Discoverability plumbing for the landing page — document metadata, social preview tags, structured data, sitemap, and robots directives.

## Requirements

### Requirement: Document metadata for the Spanish page
The page `<head>` SHALL include a Spanish `<title>`, a Spanish `<meta name="description">`, and a `<link rel="canonical">` pointing at `https://qcfinancial.github.io/`.

#### Scenario: Crawler reads document metadata
- **WHEN** a search crawler fetches the page
- **THEN** it finds a Spanish title, a Spanish description, and a canonical URL of the site root

### Requirement: Social preview tags
The page SHALL include OpenGraph and Twitter Card tags so shared links render a branded preview. `og:image` (and the Twitter image) SHALL be the absolute URL `https://qcfinancial.github.io/brand/png/social-card.png`, accompanied by `og:image:width` = 1200 and `og:image:height` = 630, plus `og:title`, `og:description`, `og:url`, `og:type`, and `og:locale` = `es_CL` (or equivalent Spanish locale). The Twitter card SHALL be `summary_large_image`.

#### Scenario: Link shared on a social platform
- **WHEN** the site URL is shared on a platform that reads OpenGraph tags
- **THEN** the preview shows the 1200×630 social card image with the Spanish title and description

### Requirement: Structured data
The page SHALL include a JSON-LD block describing the project (e.g. `SoftwareApplication` or `SoftwareSourceCode`) with at least its name, description, and code repository / download URLs.

#### Scenario: Structured data present and valid
- **WHEN** the page is parsed for structured data
- **THEN** a valid JSON-LD object describing the qcfinancial project is found

### Requirement: Crawl directives
The site SHALL include a `robots.txt` that allows crawling and references the sitemap, and a `sitemap.xml` listing the site root.

#### Scenario: Crawler discovers the sitemap
- **WHEN** a crawler fetches `/robots.txt`
- **THEN** crawling is permitted and the response points to `/sitemap.xml`, which lists the site root URL
