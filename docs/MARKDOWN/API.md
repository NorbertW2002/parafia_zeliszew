# API

> Version: 1.0  
> Project: Parish Starter  
> Last Updated: 2026-08-07

---

# Overview

This document describes how the frontend communicates with external data sources.

Parish Starter follows a simple architecture where Astro is responsible for rendering pages, while Directus provides dynamic content through its REST API.

The API layer should remain lightweight, predictable and easy to extend.

---

# Data Sources

The application uses two sources of content.

## Markdown

Static content stored inside the project repository.

Examples:

- Parish history
- Sacraments
- Contact
- Parish office

Markdown content is loaded directly by Astro.

---

## Directus

Dynamic content managed through the Directus API.

Examples:

- Announcements
- Events
- Galleries
- Mass intentions
- Priests

---

# Communication Flow

```
Markdown ─┐
           │
           ├── Astro ──► Static Website
           │
Directus ──┘
```

Astro is responsible for combining both content sources into a single website.

---

# API Responsibilities

The API layer is responsible for:

- retrieving content;
- handling errors;
- transforming responses into application models;
- keeping the frontend independent from Directus.

Business logic should never be placed inside page components.

---

# Service Layer

Communication with Directus should be centralized inside the `services` directory.

Example:

```
src/
└── services/
    ├── announcements.ts
    ├── events.ts
    ├── gallery.ts
    ├── priests.ts
    └── mass-intentions.ts
```

Each service is responsible for one content type.

---

# Data Models

Every API response should be mapped to a TypeScript interface.

Application components should work with application models rather than raw API responses.

This keeps the frontend independent from future CMS changes.

---

# Error Handling

API requests should gracefully handle:

- unavailable CMS;
- missing content;
- invalid responses;
- empty collections.

The website should continue to function whenever possible.

---

# Caching

Static pages are generated during the build process.

Dynamic requests should be minimized.

Whenever possible, content should be cached rather than requested repeatedly.

Caching strategy will be adjusted according to future project requirements.

---

# Images

Image URLs are provided by Directus.

The frontend is responsible for displaying responsive and optimized images.

Images should always include alternative text when available.

---

# Security

The frontend should never expose sensitive information.

Only public content should be requested.

Authentication tokens and private endpoints must never be included in the client-side application.

Security guidelines are described in SECURITY.md.

---

# Future Extensions

The API layer should support future integrations such as:

- livestream services;
- Google Maps;
- calendar synchronization;
- online forms.

New integrations should remain isolated from the rest of the application.

---

# Related Documents

- ARCHITECTURE.md
- CONTENT_MODEL.md
- CMS.md
- SECURITY.md

---

# Changelog

| Version | Date | Description |
|----------|------------|------------------------------|
| 1.0 | 2026-08-07 | Initial version |
## Sacraments CMS extension (2026-09-16)

The `/sakramenty` page keeps its introduction and seven baseline sections in Markdown. Published `sacraments` records optionally override individual sections at build time through `src/services/sacraments.ts`. Plain-text fields are validated and rendered with escaping. Missing, invalid, draft or archived records fall back to Markdown; archiving an override does not hide the baseline sacrament. This is an intentional CMS-editable extension to the static content model. Collection fields, access policies, seed drafts and publishing instructions are in `DIRECTUS_SETUP.md`.

## Contact and history CMS extension (2026-09-16)

At the user's request, `parish_pages` provides published plain-text overrides for the contact and history Markdown pages. `src/services/parish-pages.ts` validates CMS values and falls back to local content. Contact data is shared by the contact page, homepage and footer; empty office hours reuse `homepage.office_hours`. Seed JSON and access/publishing instructions are in DIRECTUS_SETUP.md. This extends the original Markdown-only policy for these two pages while preserving static generation.
