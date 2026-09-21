# SECURITY

> Version: 1.0  
> Project: Parish Starter  
> Last Updated: 2026-08-07

---

# Overview

This document defines the basic security principles of the Parish Starter project.

The goal is to protect both the website and its content while keeping the project simple and easy to maintain.

Security should be considered throughout development rather than added as an afterthought.

---

# Security Goals

The project should be:

- secure by default;
- easy to maintain;
- regularly updated;
- resistant to common attacks.

Whenever possible, security should rely on proven platform features instead of custom implementations.

---

# HTTPS

The production website must always be served over HTTPS.

All traffic should be encrypted.

---

# Authentication

Public visitors do not require authentication.

Only content editors access the Directus administration panel.

Authentication is handled entirely by Directus.

The frontend should never implement its own authentication system.

---

# Authorization

User permissions are managed in Directus.

Roles should follow the principle of least privilege.

Editors should only have access to the content they need to manage.

---

# API Security

Only public content should be accessible from the frontend.

Sensitive credentials must never be exposed in client-side code.

API tokens should be stored as environment variables.

---

# Forms

All forms should validate user input.

Validation should include:

- required fields;
- email format;
- maximum input length.

The frontend should never trust user input.

---

# Spam Protection

Public forms should include protection against automated spam.

Possible solutions include:

- Cloudflare Turnstile;
- rate limiting;
- server-side validation.

The chosen solution should minimize inconvenience for legitimate users.

---

# File Uploads

Uploaded files should:

- use supported file formats;
- have reasonable size limits;
- be scanned or validated when appropriate.

Executable files should never be accepted.

---

# Dependencies

Project dependencies should be updated regularly.

Unused dependencies should be removed.

Only actively maintained libraries should be used.

---

# Backups

Regular backups should include:

- Directus database;
- uploaded media;
- project source code.

Backup procedures should be verified periodically.

---

# Logging

Errors should be logged for troubleshooting purposes.

Sensitive information should never be included in logs.

---

# Privacy

The project should collect only the data necessary to provide its functionality.

Personal data should be handled in accordance with applicable regulations.

---

# Future Improvements

Possible future enhancements include:

- two-factor authentication for administrators;
- security monitoring;
- automated dependency scanning.

These features should only be introduced if they provide clear value to the project.

---

# Related Documents

- ARCHITECTURE.md
- CMS.md
- API.md
- DEPLOYMENT.md

---

# Changelog

| Version | Date | Description |
|----------|------------|------------------------------|
| 1.0 | 2026-08-07 | Initial version |