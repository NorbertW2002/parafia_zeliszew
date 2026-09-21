# DESIGN

> Version: 1.0  
> Project: Parish Starter  
> Last Updated: 2026-08-07

---

# Overview

This document defines the visual identity and design principles of the Parish Starter project.

The goal is to create a website that feels modern, elegant and welcoming while respecting the character of a Catholic parish.

The interface should prioritize readability, simplicity and accessibility over visual effects.

---

# Design Goals

The design should be:

- Clean
- Elegant
- Timeless
- Accessible
- Responsive
- Easy to navigate
- Consistent

Every design decision should support these goals.

---

# Visual Style

The website should communicate calmness and trust.

Avoid visual clutter and unnecessary decorations.

The design should feel:

- modern without being trendy;
- elegant without being luxurious;
- minimal without feeling empty.

Large amounts of whitespace are encouraged to improve readability.

---

# Color Palette

The project uses a small and consistent color palette.

## Primary Color

A deep navy blue used for:

- navigation
- headings
- primary buttons
- links

---

## Secondary Color

A warm gold used only as an accent.

Typical usage:

- icons
- highlights
- decorative elements

---

## Neutral Colors

Neutral colors should be used for:

- backgrounds
- borders
- secondary text

Avoid using strong colors unless they communicate meaning.

---

## Semantic Colors

Semantic colors should only indicate status.

Examples:

- Success
- Warning
- Error
- Information

---

# Typography

Typography should prioritize readability.

The project uses:

- a clean sans-serif font for interface elements;
- a serif font for headings and longer page titles.

Headings should clearly establish hierarchy.

Paragraphs should remain easy to read on all devices.

---

# Layout

The layout follows a simple content-first approach.

General rules:

- generous spacing;
- limited content width;
- consistent alignment;
- predictable page structure.

Pages should not feel crowded.

---

# Navigation

Navigation should remain simple.

The main navigation should contain only the most important sections.

Dropdown menus should be avoided unless necessary.

Users should reach any important page in no more than three clicks.

---

# Components

Every UI component should follow the same visual language.

Components should appear:

- consistent;
- predictable;
- lightweight.

Avoid creating multiple visual variations unless there is a clear reason.

---

# Images

Images should represent real parish life whenever possible.

Preferred content:

- church building;
- liturgy;
- parish events;
- community;
- architecture.

Avoid generic stock photography.

Images should always include meaningful alternative text.

---

# Icons

Icons should support content rather than replace it.

Use a single icon library consistently throughout the project.

Icons should remain simple and easily recognizable.

---

# Forms

Forms should be easy to complete.

Requirements:

- clear labels;
- visible validation;
- keyboard accessibility;
- large interactive elements.

Only request information that is actually necessary.

---

# Responsive Design

The project follows a Mobile First approach.

Every page should work correctly on:

- phones;
- tablets;
- laptops;
- desktop computers.

Layouts should adapt naturally to different screen sizes.

---

# Accessibility

Accessibility is a core design principle.

The interface should:

- provide sufficient contrast;
- support keyboard navigation;
- use semantic HTML;
- maintain a clear heading structure;
- provide visible focus indicators.

Accessibility should never be treated as an optional feature.

---

# Animations

Animations should be subtle and purposeful.

Use animation only when it improves usability.

Avoid decorative animations that distract users.

The interface should remain usable when reduced motion is enabled.

---

# Future Customization

Each parish should be able to customize:

- logo;
- primary color;
- photographs;
- contact information.

The overall visual identity should remain consistent across different installations.

---

# Related Documents

- ARCHITECTURE.md
- COMPONENTS.md
- CONTENT_MODEL.md
- SEO.md

---

# Changelog

| Version | Date | Description |
|----------|------------|------------------------------|
| 1.0 | 2026-08-07 | Initial version |
## UX refinements (2026-09-16)

Keep the navy/gold palette and real parish photography. Use compact spacing on phones, a shorter hero, prominent Mass times, readable 17px article text with visible list markers, and reduced card decoration. The full navigation starts at 1280px; smaller screens use a bounded menu. Sacrament navigation collapses on mobile. Contact provides phone and directions actions. Upcoming events exclude expired events as of build time; schedule regular rebuilds so date-based lists stay current without CMS edits.
