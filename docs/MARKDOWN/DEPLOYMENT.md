# DEPLOYMENT

> Version: 1.0  
> Project: Parish Starter  
> Last Updated: 2026-08-07

---

# Overview

This document describes how Parish Starter is built, deployed and maintained in a production environment.

The deployment process is designed to be simple, automated and reliable.

---

# Deployment Goals

The deployment process should be:

- automated;
- repeatable;
- secure;
- easy to maintain;
- easy to reproduce.

Deployments should require as little manual work as possible.

---

# Infrastructure

The project uses the following services:

| Purpose | Service |
|---------|---------|
| Source Control | GitHub |
| Hosting | Cloudflare Pages |
| DNS | Cloudflare |
| SSL | Cloudflare |
| CMS | Directus |

---

# Deployment Flow

The deployment process follows this workflow.

```
Developer

↓

Git Commit

↓

GitHub

↓

Cloudflare Pages

↓

Build

↓

Production Website
```

Every change merged into the main branch automatically triggers a new deployment.

---

# Build Process

The build process should:

- install project dependencies;
- build the Astro application;
- optimize assets;
- generate static pages;
- publish the production build.

Build failures should prevent deployment.

---

# Environment Variables

Sensitive configuration should never be stored inside the repository.

Environment variables should be used for:

- Directus URL
- Directus API Token
- Analytics keys (if used)
- Other external service credentials

Production and development environments should use separate configurations.

---

# Domains

The website should support:

- primary production domain;
- optional staging domain;
- local development environment.

HTTPS should always be enabled.

---

# Media

Images should be optimized before deployment.

Uploaded media should remain independent from the frontend application.

---

# Monitoring

Basic monitoring should include:

- deployment status;
- build logs;
- application availability.

Additional monitoring may be added as the project grows.

---

# Backup Strategy

The project should regularly back up:

- Directus database;
- uploaded media;
- source code.

Backup procedures should be tested periodically.

---

# Rollback

If a deployment fails or introduces critical issues, the previous working version should be restored as quickly as possible.

Deployment should support simple rollback without rebuilding the entire project.

---

# Local Development

Developers should be able to run the project locally with minimal setup.

A local environment should closely match the production environment whenever possible.

---

# Future Improvements

Possible future enhancements include:

- staging environment;
- preview deployments;
- automated testing before deployment;
- deployment notifications.

These improvements should integrate into the existing workflow without increasing unnecessary complexity.

---

# Related Documents

- ARCHITECTURE.md
- API.md
- CMS.md
- SECURITY.md

---

# Changelog

| Version | Date | Description |
|----------|------------|------------------------------|
| 1.0 | 2026-08-07 | Initial version |