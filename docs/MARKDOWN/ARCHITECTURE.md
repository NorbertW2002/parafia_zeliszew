# ARCHITECTURE

> Version: 1.0  
> Project: Parish Starter  
> Last Updated: 2026-08-07

---

# Overview

Parish Starter is a modern website starter designed for Polish Catholic parishes.

The project focuses on simplicity, performance and long-term maintainability. It is intended to be easy to customize for different parishes without modifying the application architecture.

The website follows a **Static First** approach. Most pages are generated during the build process, while Vue is used only for features that require user interaction.

---

# Project Goals

The project has four primary goals:

- Fast loading times
- Easy content management
- Simple and maintainable codebase
- Excellent SEO and accessibility

Every architectural decision should support these goals.

---

# Technology Stack

| Layer | Technology |
|--------|------------|
| Frontend | Astro |
| Interactive Components | Vue 3 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Static Content | Markdown |
| Dynamic Content | Directus CMS |
| Hosting | Cloudflare Pages |
| Repository | GitHub |

---

# Architecture Principles

The project follows several simple principles.

## Static First

Pages should be statically generated whenever possible.

Only interactive functionality should require JavaScript.

---

## Content Separation

Application logic and content are completely separated.

Content comes from two sources:

- Markdown for static pages.
- Directus for frequently updated content.

---

## Component-Based Development

The user interface is built from small, reusable components.

Each component should have a single responsibility.

---

## Mobile First

Every page should be designed for mobile devices first and then adapted for larger screens.

---

## Accessibility

Accessibility should be considered during development rather than added later.

The website should comply with WCAG AA guidelines whenever possible.

---

# Content Strategy

## Markdown

Markdown is used for content that changes rarely.

Examples:

- Parish history
- Sacraments
- Contact page
- Parish office
- Patron information

---

## Directus

Directus is used for regularly updated content.

Examples:

- Announcements
- Events
- Galleries
- Mass intentions
- Homepage content

---

# Project Structure

```text
src/
│
├── components/
├── layouts/
├── pages/
├── content/
├── services/
├── types/
├── utils/
└── styles/
```

Every directory has a clearly defined purpose.

Business logic should never be mixed with presentation.

---

# Routing

Routes are created using Astro's file-based routing.

The website is intended for Polish users, therefore URLs should remain in Polish.

Examples:

```
/

kontakt

historia

sakramenty

ogloszenia

wydarzenia

galeria

intencje-mszalne
```

---

# Vue Usage

Vue should only be used when interaction improves the user experience.

Typical examples include:

- event calendar
- gallery lightbox
- search
- contact forms
- interactive maps

Static content should remain pure Astro.

---

# Styling

Tailwind CSS is the primary styling solution.

Custom CSS should be limited to global styles that cannot reasonably be expressed using Tailwind utilities.

The design system is described in **DESIGN.md**.

---

# Data Flow

The application has two content sources.

```
Markdown
        \
         \
          → Astro → Static Website
         /
Directus /
```

Astro combines all content during the build process and generates optimized static pages.

---

# Deployment

Deployment is fully automated.

```
Developer

↓

GitHub

↓

Cloudflare Pages

↓

Production
```

Each push to the main branch automatically publishes a new version of the website.

---

# Future Development

The architecture should make it easy to add new features without requiring significant changes.

Examples include:

- multilingual support
- livestream integration
- cemetery map
- parish groups
- online forms

These features should integrate naturally into the existing architecture.

---

# Development Philosophy

The project favors simple, maintainable solutions over complex architectures.

Every new feature should be evaluated against the following questions:

- Is it necessary?
- Does it improve the user experience?
- Can it be implemented using existing project patterns?
- Will it remain easy to maintain?

The project intentionally avoids unnecessary complexity.

# Related Documents

- DESIGN.md
- CONTENT_MODEL.md
- CMS.md
- COMPONENTS.md
- API.md
- DEPLOYMENT.md

---

# Changelog

| Version | Date | Description |
|----------|------------|------------------------------|
| 1.0 | 2026-08-07 | Initial version |
## Sacraments CMS extension (2026-09-16)

The `/sakramenty` page keeps its introduction and seven baseline sections in Markdown. Published `sacraments` records optionally override individual sections at build time through `src/services/sacraments.ts`. Plain-text fields are validated and rendered with escaping. Missing, invalid, draft or archived records fall back to Markdown; archiving an override does not hide the baseline sacrament. This is an intentional CMS-editable extension to the static content model. Collection fields, access policies, seed drafts and publishing instructions are in `DIRECTUS_SETUP.md`.

## Contact and history CMS extension (2026-09-16)

At the user's request, `parish_pages` provides published plain-text overrides for the contact and history Markdown pages. `src/services/parish-pages.ts` validates CMS values and falls back to local content. Contact data is shared by the contact page, homepage and footer; empty office hours reuse `homepage.office_hours`. Seed JSON and access/publishing instructions are in DIRECTUS_SETUP.md. This extends the original Markdown-only policy for these two pages while preserving static generation.
