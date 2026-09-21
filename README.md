# Parish Starter

Static-first Astro starter for Polish Catholic parishes. Read the project documentation in `docs/MARKDOWN` before making changes.

## Local development

1. Copy `.env.example` to `.env` and configure Directus only when it is available.
2. Run `npm install`.
3. Run `npm run dev`.

`npm run build` performs type checking and creates the static production build. Without Directus configuration, the site builds with safe empty states for CMS content.

## Deployment

Connect the repository to Cloudflare Pages with `npm run build` and output directory `dist`. Configure `SITE_URL`, `DIRECTUS_URL`, and the optional `DIRECTUS_API_TOKEN` in Cloudflare Pages—not in the repository. Follow `docs/MARKDOWN/DIRECTUS_SETUP.md` to create the CMS and its publish deploy hook.
