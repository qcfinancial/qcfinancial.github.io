## ADDED Requirements

### Requirement: Spanish is the default, source-of-truth language
The landing page SHALL ship its visible copy in Spanish directly in the HTML markup, and the document SHALL declare `<html lang="es">` on load. English text SHALL exist only as data applied by JavaScript, not in the served markup.

#### Scenario: Page served without JavaScript
- **WHEN** the page is fetched with JavaScript disabled (e.g. a crawler)
- **THEN** all visible copy is present in Spanish in the HTML and the document language is `es`

### Requirement: In-page ES/EN toggle
The page SHALL provide an EN/ES segmented toggle that swaps every translatable string in place without a page reload, using a translation dictionary keyed by language (the verbatim `T` strings from the prototype). Translatable elements SHALL be marked in the markup (e.g. via a `data-i18n` key) so the toggle can replace their text.

#### Scenario: User switches to English
- **WHEN** a user selects EN on the toggle
- **THEN** every marked string is replaced with its English value from the dictionary
- **AND** the active toggle segment reflects the selected language

#### Scenario: User switches back to Spanish
- **WHEN** a user selects ES after viewing English
- **THEN** every marked string reverts to its Spanish value

### Requirement: Toggle updates document language and metadata
When the language changes, the page SHALL update `<html lang>` to match the selected language, and SHALL update the document `<title>` and meta description to the selected language's values.

#### Scenario: Document language follows the toggle
- **WHEN** a user switches the toggle to English
- **THEN** `<html lang>` becomes `en` and the document title/description reflect the English copy

### Requirement: Persist language preference
The page SHALL persist the user's selected language in `localStorage`. On subsequent visits, if a stored preference exists, the page SHALL apply it after load; if none exists, the page SHALL remain in its Spanish default. Because Spanish ships in the markup, applying a stored English preference happens client-side after the initial render.

#### Scenario: Returning visitor who chose English
- **WHEN** a user who previously selected English loads the page again
- **THEN** the stored preference is read from `localStorage` and the page is switched to English after load

#### Scenario: First-time visitor
- **WHEN** a user with no stored preference loads the page
- **THEN** the page stays in Spanish (the default) and no language switch is applied

#### Scenario: Selecting a language stores it
- **WHEN** a user selects a language on the toggle
- **THEN** that choice is written to `localStorage` for future visits
