# CMS

> Version: 1.0  
> Project: Parish Starter  
> Last Updated: 2026-08-07

---

# Overview

This document describes how content is managed within the Parish Starter project.

The project uses **Directus** as a headless CMS to separate content management from the frontend application.

Editors manage content through Directus, while Astro is responsible for presenting it on the website.

---

# Goals

The CMS should be:

- easy to use;
- easy to maintain;
- secure;
- flexible;
- independent from the frontend.

The editor should be able to update website content without modifying the application code.

---

# Content Organization

The CMS stores only content that changes regularly.

Static pages remain in Markdown files and are version-controlled with the source code.

Examples of CMS-managed content:

- Announcements
- Events
- Galleries
- Mass Intentions
- Homepage highlights

---

# Collections

The following collections are planned.

## Announcements

Weekly parish announcements.

---

## Events

Upcoming parish events.

---

## Galleries

Photo galleries from parish life.

---

## Mass Intentions

Mass intention schedule.

---

## Priests

Information about parish clergy.

---

## Parish Groups

Parish communities and ministries.

---

# Media Library

Images and downloadable files are stored in the Directus media library.

Uploaded files should:

- have meaningful filenames;
- be optimized before upload;
- include alternative text where appropriate.

---

# User Roles

The CMS should support different permission levels.

## Administrator

Full access.

Responsible for:

- configuration;
- users;
- permissions;
- content management.

---

## Editor

Can create and edit content.

Cannot modify CMS configuration.

---

## Contributor

Can create draft content.

Publishing requires approval from an editor or administrator.

---

# Publishing Workflow

The publishing process should remain simple.

Typical workflow:

Draft

↓

Review

↓

Published

↓

Archived

---

# Content Rules

Editors should follow several basic rules.

Content should:

- use clear titles;
- avoid duplicated information;
- use meaningful images;
- remain easy to read.

---

# Image Guidelines

Images should:

- represent real parish life;
- be properly cropped;
- have good quality;
- include descriptive alternative text.

Large files should be optimized before publishing.

---

# Backups

Regular backups of the CMS database and uploaded files should be performed.

Backup procedures are described in DEPLOYMENT.md.

---

# Future Extensions

Possible future CMS features include:

- multilingual content;
- scheduled publishing;
- reusable content blocks;
- approval workflows.

These features should not require changes to the overall project architecture.

---

# Related Documents

- CONTENT_MODEL.md
- API.md
- DEPLOYMENT.md
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
