# AGENTS.md

# Parish Starter

This document provides instructions for AI coding assistants (Codex, ChatGPT, Claude Code and similar tools) working on this repository.

Always follow these guidelines before generating or modifying code.

---

# Project Overview

Parish Starter is a modern website starter for Polish Catholic parishes.

The project emphasizes:

- simplicity;
- maintainability;
- accessibility;
- performance;
- clean architecture.

Avoid unnecessary complexity.

---

# Before Writing Code

Always read the relevant documentation inside the `docs/MARKDOWN` directory before implementing a feature.

Use these documents as the primary source of truth.

- ARCHITECTURE.md
- DESIGN.md
- CONTENT_MODEL.md
- CMS.md
- COMPONENTS.md
- API.md
- DEPLOYMENT.md
- SECURITY.md
- SEO.md
- ROADMAP.md

Never contradict the documented architecture.

---

# Implementation order

When building the application, implement features in the following order:

1. Project setup
2. Layouts
3. Shared UI components
4. Static pages
5. Directus integration
6. Dynamic content
7. Interactive Vue components
8. SEO improvements
9. Performance improvements
10. Deployment

# Technology Stack

Frontend

- Astro

Interactive Components

- Vue 3

Language

- TypeScript

Styling

- Tailwind CSS

Content

- Markdown
- Directus CMS

Hosting

- Cloudflare Pages

---

# General Principles

Prefer simple solutions.

Avoid unnecessary abstractions.

Do not overengineer.

Write readable code.

Write maintainable code.

Follow existing project conventions.

---

# Architecture Rules

Use Astro by default.

Only use Vue when interaction is required.

Never convert static pages into Vue components.

Prefer Static Site Generation.

Avoid client-side rendering unless necessary.

---

# Content

Static content belongs in Markdown.

Frequently updated content belongs in Directus.

Never hardcode parish content inside components.

---

# Components

Create reusable components.

Each component should have one responsibility.

Prefer composition over duplication.

Avoid deeply nested components.

Keep components small.

---

# Styling

Use Tailwind CSS.

Avoid custom CSS unless necessary.

Reuse existing utility classes.

Follow the design system.

Never introduce inconsistent spacing or colors.

---

# TypeScript

Always use TypeScript.

Avoid using:

- any

Prefer explicit interfaces.

Write strongly typed code.

---

# Accessibility

Every new component should support:

- keyboard navigation;
- semantic HTML;
- visible focus states;
- proper labels.

Accessibility is required.

---

# Performance

Prefer server rendering.

Avoid unnecessary JavaScript.

Lazy load images where appropriate.

Optimize assets.

Keep bundles small.

---

# File Organization

Place files according to their responsibility.

Example:

src/

components/

layouts/

pages/

services/

types/

utils/

Do not create new directories unless necessary.

---

# Naming

Use English names for:

- files;
- components;
- variables;
- functions;
- interfaces.

Use PascalCase for components.

Use camelCase for variables and functions.

Use kebab-case for route folders.

---

# URLs

The website is written in Polish.

Routes should remain in Polish.

Examples:

/kontakt

/historia

/ogloszenia

/wydarzenia

Never generate English URLs.

---

# API

Never access Directus directly from page components.

Use the service layer.

Business logic belongs inside services.

---

# Error Handling

Handle errors gracefully.

Never assume data always exists.

Provide sensible fallbacks.

---

# Dependencies

Before adding a new dependency, ask:

- Is it really necessary?
- Can this be implemented using existing tools?

Avoid dependency bloat.

---

# Code Style

Write self-explanatory code.

Prefer readability over cleverness.

Avoid premature optimization.

Remove unused code.

Do not duplicate logic.

---

# Comments

Use comments sparingly.

Code should explain itself.

Only comment complex business logic.

---

# Git

Write clear commit messages.

Examples:

feat: add announcements page

fix: improve gallery layout

refactor: simplify navigation

docs: update architecture

---

# Security

Never expose secrets.

Never hardcode credentials.

Validate user input.

Trust no external data.

---

# SEO

Use semantic HTML.

Maintain heading hierarchy.

Provide meaningful metadata.

Optimize images.

Use descriptive links.

---

# When Unsure

If multiple implementation options exist:

1. Choose the simplest solution.
2. Follow existing project patterns.
3. Keep the code maintainable.
4. Do not invent new architecture.

Consistency is more important than creativity.

