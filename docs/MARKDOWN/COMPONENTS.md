# COMPONENTS

> Version: 1.0  
> Project: Parish Starter  
> Last Updated: 2026-08-07

---

# Overview

This document describes the reusable UI components used throughout the Parish Starter project.

The goal is to establish a consistent component library that can be reused across all pages.

Components should remain small, focused and easy to maintain.

---

# Component Categories

The application is divided into several groups of reusable components.

- Layout
- Navigation
- Content
- UI
- Interactive
- Forms

---

# Layout Components

## MainLayout

The default layout used by all pages.

Responsible for:

- page structure
- navigation
- footer
- SEO metadata

---

## PageHeader

Displays the page title and optional introduction.

---

## Section

Reusable content section with consistent spacing.

---

## Container

Centers page content and limits its maximum width.

---

# Navigation Components

## Navbar

Primary website navigation.

Should remain simple and responsive.

---

## Footer

Contains:

- parish information
- quick links
- copyright
- social media

---

## Breadcrumbs

Displays the current page location.

Used only where it improves navigation.

---

# Content Components

## Hero

Large introductory section displayed on selected pages.

---

## AnnouncementCard

Displays a single parish announcement.

---

## EventCard

Displays a parish event summary.

---

## GalleryCard

Represents a photo gallery.

---

## PriestCard

Displays information about a priest.

---

## ParishGroupCard

Displays information about a parish group.

---

## MassSchedule

Displays Mass intentions in a clear and readable format.

---

# UI Components

## Button

Reusable button component.

Supports primary and secondary actions.

---

## Card

Basic content container used throughout the website.

---

## Badge

Displays short labels or statuses.

---

## Divider

Simple visual separator.

---

## Alert

Displays informational messages.

---

# Interactive Components

These components use Vue.

## EventCalendar

Displays parish events in a calendar view.

---

## Gallery

Interactive image gallery with lightbox.

---

## Search

Searches announcements, pages and events.

---

## ContactForm

Handles contact form submission.

---

# Component Rules

All components should:

- have a single responsibility;
- be reusable;
- avoid duplicated logic;
- support accessibility;
- remain responsive.

---

# Naming Convention

Components should use PascalCase.

Examples:

```
Navbar
Hero
AnnouncementCard
GalleryCard
MassSchedule
```

Component filenames should match component names.

---

# Styling

Components should use Tailwind CSS.

Custom CSS should only be used when necessary.

Visual consistency is defined in DESIGN.md.

---

# Future Components

Possible additions include:

- LivestreamPlayer
- CemeteryMap
- FAQ
- Timeline
- DonationBanner

These components should follow the same design principles.

---

# Related Documents

- ARCHITECTURE.md
- DESIGN.md
- CONTENT_MODEL.md

---

# Changelog

| Version | Date | Description |
|----------|------------|------------------------------|
| 1.0 | 2026-08-07 | Initial version |
## IntentionCalendar

The mass intentions page uses a Vue island with week/month navigation and complete weekly text from weekly_intentions. Weeks run Monday through Sunday and appear in every month they overlap. Calendar selection focuses the weekly heading; published weeks are marked across all seven dates. Data arrives through the server service, with no browser Directus calls. Today uses Europe/Warsaw and date arithmetic uses UTC. A noscript list preserves access without JavaScript.

