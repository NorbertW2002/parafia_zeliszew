# SEO

> Version: 1.0
> Project: Parish Starter
> Last Updated: 2026-08-07

---

# Overview

This document defines the Search Engine Optimization (SEO) strategy for the Parish Starter project.

The primary goal is to ensure that parish information is easily discoverable through search engines while maintaining a fast, accessible and user-friendly website.

SEO should be considered throughout development rather than added after implementation.

---

# SEO Goals

The website should:

- be easily indexed by search engines;
- provide meaningful page titles;
- use semantic HTML;
- load quickly;
- be accessible to all users.

Good SEO should naturally result from good website structure and content.

---

# URL Structure

URLs should be:

- short;
- descriptive;
- readable;
- stable.

Since the website targets Polish users, URLs should be written in Polish.

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

Avoid unnecessary parameters in URLs whenever possible.

---

# Metadata

Every page should include:

- page title;
- meta description;
- canonical URL;
- Open Graph metadata.

Metadata should accurately describe the page content.

---

# Headings

Pages should use a logical heading hierarchy.

General rules:

- one H1 per page;
- H2 for main sections;
- H3 for subsections.

Heading levels should never be skipped.

---

# Content

Content should be:

- original;
- clear;
- well structured;
- easy to read.

Avoid duplicate content across multiple pages.

Regularly updated content improves search engine visibility.

Content should always prioritize usefulness for parish visitors over search engine optimization.

SEO should support users, not dictate the content.

---

# Images

Images should:

- include descriptive filenames;
- contain alternative text;
- be optimized for the web.

Large images should be resized before publication.

---

# Internal Linking

Pages should link naturally to related content.

Examples:

- announcements linking to events;
- events linking to galleries;
- sacrament pages linking to the parish office.

Internal links help users and search engines understand the website structure.

---

# Performance

Fast websites generally provide a better user experience.

The project should prioritize:

- static rendering;
- optimized images;
- minimal JavaScript;
- lazy loading where appropriate.

Performance targets are defined in ARCHITECTURE.md.

---

# Sitemap

The website should automatically generate an XML sitemap.

Only publicly accessible pages should be included.

---

# Robots

A robots.txt file should be generated automatically.

Administrative interfaces and private resources should not be indexed.

---

# Structured Data

Structured data should be used where appropriate.

Examples include:

- Organization
- Church
- Event
- BreadcrumbList

Structured data helps search engines better understand the website content.

---

# Social Sharing

Pages should include Open Graph metadata to improve sharing on social media.

When possible, pages should provide:

- title;
- description;
- featured image.

---

# Accessibility

Accessible websites often provide better SEO.

The project should:

- use semantic HTML;
- provide meaningful link text;
- include alternative text for images;
- maintain a logical document structure.

Accessibility and SEO should support each other.

---

# Monitoring

After deployment, website performance should be monitored using tools such as:

- Google Search Console;
- Google Analytics (optional);
- Lighthouse.

Monitoring helps identify opportunities for future improvements.

---

# Future Improvements

Possible future enhancements include:

- multilingual SEO;
- FAQ structured data;
- event-specific structured data;
- automatic social preview images.

These improvements should build upon the existing SEO strategy without increasing unnecessary complexity.

---

# Related Documents

- ARCHITECTURE.md
- DESIGN.md
- CONTENT_MODEL.md
- DEPLOYMENT.md

---

# Changelog

| Version | Date | Description |
|----------|------------|------------------------------|
| 1.0 | 2026-08-07 | Initial version |