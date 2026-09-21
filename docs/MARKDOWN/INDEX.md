# Parish Starter Documentation

Welcome to the official documentation for **Parish Starter**.

Parish Starter is a modern, fast and maintainable website starter designed for Polish Catholic parishes. The project focuses on simplicity, accessibility, excellent performance and long-term maintainability.

The website is built using a **Static First** approach. Most content is rendered during the build process, while interactive elements are enhanced with Vue only where necessary.

---

# Documentation Overview

| Document         | Description                                              |
| ---------------- | -------------------------------------------------------- |
| ARCHITECTURE.md  | Overall application architecture and technical decisions |
| DESIGN.md        | Design system and UI guidelines                          |
| CONTENT_MODEL.md | Data models used by the application                      |
| CMS.md           | Directus configuration and content management            |
| COMPONENTS.md    | Component library documentation                          |
| API.md           | Communication with Directus                              |
| DEPLOYMENT.md    | Deployment and hosting                                   |
| SECURITY.md      | Security guidelines                                      |
| SEO.md           | SEO strategy                                             |
| ROADMAP.md       | Planned features and future development                  |

---

# Project Goals

The project has several primary goals:

* Build an extremely fast website.
* Minimize JavaScript sent to the browser.
* Achieve excellent SEO.
* Meet WCAG AA accessibility requirements.
* Make content editing simple for parish staff.
* Separate content from application logic.
* Provide a reusable starter for multiple parishes.
* Follow modern web development best practices.

---

# Technology Stack

## Frontend

* Astro
* Vue 3
* TypeScript
* Tailwind CSS

## Content

* Markdown
* Directus CMS

## Infrastructure

* GitHub
* Cloudflare Pages
* Cloudflare Workers
* Cloudflare Images

---

# Architecture Principles

The project follows several fundamental principles:

* Static First
* Component Driven Development
* Mobile First
* Accessibility First
* SEO First
* Content Separation
* Reusable Components
* Progressive Enhancement
* Minimal JavaScript
* Type Safety

---

# Project Structure

```text
docs/
src/
public/
content/
```

Each directory has a single responsibility and should remain organized as the project grows.

---

# Content Strategy

Content is divided into two categories.

## Markdown

Used for content that rarely changes.

Examples:

* Parish history
* Sacraments
* Parish office
* Contact
* Patron
* Parish groups

## Directus

Used for dynamic content.

Examples:

* Announcements
* Events
* Galleries
* Mass intentions
* News
* Homepage highlights

---

# Development Workflow

```text
Developer

↓

GitHub

↓

Cloudflare Pages

↓

Production
```

Every push to the main branch automatically deploys a new version of the website.

---

# Documentation Rules

Every document in this repository should:

* have a clearly defined purpose;
* describe only one area of responsibility;
* reference related documentation where appropriate;
* include practical examples whenever possible;
* document important architectural decisions;
* remain up to date as the project evolves.

---

# Version

Current documentation version: **1.0**
