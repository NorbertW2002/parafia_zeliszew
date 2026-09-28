# CONTENT MODEL

> Version: 1.0  
> Project: Parish Starter  
> Last Updated: 2026-08-07

---

# Overview

This document defines the content types used throughout the Parish Starter project.

Its purpose is to establish a clear and consistent content structure before implementation.

The content model is independent of the CMS implementation and represents the logical structure of the website.

---

# Content Sources

The project uses two content sources.

## Markdown

Used for pages that rarely change.

Examples:

- Parish history
- Sacraments
- Parish office
- Contact
- Patron
- Privacy policy

---

## Directus

Used for content that is updated regularly.

Examples:

- Announcements
- Events
- Galleries
- Mass intentions
- Homepage content

---

# Content Types

## Page

Represents a static page.

Typical examples:

- History
- Contact
- Parish Office
- Sacraments

A page contains:

- title
- slug
- content
- optional featured image
- SEO metadata

---

## Announcement

Represents parish announcements published on a regular basis.

An announcement contains:

- title
- publication date
- content
- optional attachments

Announcements are ordered by publication date.

Older announcements remain available in the archive.

---

## Event

Represents an upcoming parish event.

Examples:

- Retreat
- Pilgrimage
- Parish feast
- Charity event
- Concert

Each event contains:

- title
- description
- start date
- optional end date
- location
- optional featured image

---

## Mass Intention

Represents a single Mass intention.

Each entry contains:

- date
- time
- intention
- optional celebrant

Mass intentions should be grouped by date.

---

## Gallery

Represents a collection of photographs.

Each gallery contains:

- title
- description
- publication date
- photographs

Galleries should be displayed in reverse chronological order.

---

## Priest

Represents a member of the parish clergy.

Typical information:

- name
- role
- photograph
- short biography
- contact information (optional)

---

## Parish Group

Represents one parish community or ministry.

Examples:

- Altar Servers
- Choir
- Caritas
- Rosary Group

Each group contains:

- name
- description
- meeting schedule
- contact person (optional)

---

# Shared Content Rules

All content should:

- use meaningful titles;
- avoid duplicated information;
- be easy to understand;
- support SEO;
- remain accessible.

---

# Images

Images may be attached to:

- pages;
- announcements;
- events;
- galleries;
- priests;
- parish groups.

Each image should include alternative text whenever appropriate.

---

# Attachments

Attachments may be used for:

- announcements;
- events;
- downloadable documents.

Supported examples include:

- PDF files
- Word documents

Avoid uploading unnecessary large files.

---

# SEO Metadata

Content types intended to be indexed by search engines should support:

- page title;
- meta description;
- slug;
- featured image.

SEO implementation is described in **SEO.md**.

---

# Future Extensions

The content model should allow adding new content types without changing the overall architecture.

Possible future additions include:

- Livestream
- Cemetery
- Parish Bulletin
- FAQ
- Online Forms

---

# Related Documents

- ARCHITECTURE.md
- CMS.md
- API.md
- SEO.md

---

# Changelog

| Version | Date | Description |
|----------|------------|------------------------------|
| 1.0 | 2026-08-07 | Initial version |
## Sacraments CMS extension (2026-09-16)

The `/sakramenty` page keeps its introduction and seven baseline sections in Markdown. Published `sacraments` records optionally override individual sections at build time through `src/services/sacraments.ts`. Plain-text fields are validated and rendered with escaping. Missing, invalid, draft or archived records fall back to Markdown; archiving an override does not hide the baseline sacrament. This is an intentional CMS-editable extension to the static content model. Collection fields, access policies, seed drafts and publishing instructions are in `DIRECTUS_SETUP.md`.

## Contact and history CMS extension (2026-09-16)

At the user's request, `parish_pages` provides published plain-text overrides for the contact and history Markdown pages. `src/services/parish-pages.ts` validates CMS values and falls back to local content. Contact data is shared by the contact page, homepage and footer; empty office hours reuse `homepage.office_hours`. Seed JSON and access/publishing instructions are in DIRECTUS_SETUP.md. This extends the original Markdown-only policy for these two pages while preserving static generation.

## Priest service years

Priests support optional integer fields year_started and year_ended in Directus. The frontend displays a service-year range, or 'od' / 'do' for a single year. Entries are ordered by start year descending (end year if the start is unknown); undated entries appear last. The clergy page uses an accessible responsive timeline.


## Weekly mass intentions (2026-09-28)

weekly_intentions replaces individual mass_intentions on the website. Fields: id (UUID), status (draft/published/archived), week_start (unique Monday date), content (plain multiline text pasted from Word). Sunday is derived. Only valid published weeks are rendered. Legacy records are retained in Directus but no longer feed the website.
