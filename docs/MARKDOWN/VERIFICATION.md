# Verification checklist

Run `npm run check` and `npm run build` before every release.

- Test every public route on mobile, tablet, and desktop widths.
- Navigate the navbar, search, event calendar, gallery lightbox, and all links using only a keyboard.
- Confirm visible focus, Escape-to-close and arrow navigation in the gallery, and reduced-motion behavior.
- Build with missing Directus variables and with an unavailable CMS; all pages must show their empty states and still build.
- Check descriptive image text, one H1 per page, logical heading levels, page metadata, robots output, sitemap output, and event structured data.
- Run Lighthouse on the homepage, an information page, an announcement, and a gallery page before deployment.
