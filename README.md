# Fika Design Co. — Website

Marketing site for Fika Design Co., built with **Next.js (App Router)**.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
```

## Structure

- `app/` — routes (one folder per page) + `layout.jsx`, `sitemap.js`, `robots.js`.
  Each `page.jsx` is a server component that exports SEO `metadata` and renders a
  component from `components/`.
- `components/` — UI components (ported from the original static site; all `"use client"`).
- `lib/seo.js` — shared per-page metadata builder (canonical + Open Graph + Twitter).
- `assets/` — global CSS (design tokens, type scale, site styles), imported in `layout.jsx`.
- `public/` — static images (logos, avatars, `og-cover.png`, Skouta screenshot).

## SEO

- Per-route `<title>`, description, canonical, Open Graph, and Twitter tags.
- `Organization` JSON-LD on the homepage.
- `sitemap.xml` and `robots.txt` are generated at build (`app/sitemap.js`, `app/robots.js`).
- Old `.html` URLs 301-redirect to the clean paths (see `next.config.mjs`).

## Contact form

The contact form posts to a Server Action (`app/actions/contact.js`) that emails the
studio via [Resend](https://resend.com). Configure the env vars in `.env.example`
(set them in Vercel for production). Without a key, the form degrades to a
"email us directly" message.

## Analytics

- Vercel Web Analytics (`@vercel/analytics`).
- PostHog (`components/PostHogProvider.jsx`), EU Cloud, pageviews on route change.
