# maximized.site

Business website for **Maximized** — an IT consulting and agent-first software
development company based in Scottsdale, AZ, owned and primarily engineered by
**Max Daylight**.

Two practices:

- **IT & Infrastructure Consulting** — virtualization, Windows and cloud
  administration, automation, security, identity, and PKI.
- **Agent-First Software Development** — custom software built with AI agents as
  first-class collaborators, plus LLM/AI integration and AI-assisted delivery.

Live site: [https://maximized.site](https://maximized.site)

## Stack

- Vanilla **HTML5 + CSS3 + JavaScript** — no framework, no build step.
- Fonts loaded via the [Fontshare](https://www.fontshare.com/) CDN
  (Cabinet Grotesk + Satoshi).
- Hosted on **GitHub Pages** with a custom domain (`CNAME` → `maximized.site`).
- Dark navy + electric teal theme with a manual light/dark toggle.

## Project structure

```
.
├── .cursor/                # Cursor AI rules + prompt templates
├── .github/workflows/      # GitHub Actions Pages deployment
├── assets/
│   ├── css/                # tokens, base, layout, components, utilities
│   ├── js/                 # theme, nav, animations, utils (all defer-loaded)
│   ├── images/             # site images (headshot, etc.)
│   └── fonts/              # local font files (if any)
├── components/             # reference HTML templates (head/header/footer)
├── index.html              # homepage
├── services.html           # services (two pillars)
├── about.html              # about the company + owner + capabilities
├── work.html               # selected work + public repositories
├── portfolio.html          # redirect stub -> work.html (legacy URL)
├── contact.html            # contact form (Formspree) + email fallback
├── 404.html                # custom not-found page
├── CNAME                    # custom domain (do not modify)
├── robots.txt              # crawl directives
└── sitemap.xml             # page index for search engines
```

## Local preview

No build step is required — open `index.html` directly, or serve the folder
with any static file server. For example, using Python (no extra installs):

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`. Using a server (rather than `file://`) is
recommended so that root-relative paths in `404.html` resolve correctly.

> Any dev tooling added later (e.g. `live-server`, a `package.json`, or a
> `Makefile`) is for convenience only and is **not** required to serve the site.

## Deployment

Pushes to `main` are deployed to GitHub Pages by
`.github/workflows/pages.yml` using `actions/upload-pages-artifact` and
`actions/deploy-pages`.

## Configuration notes

- **Contact form:** `contact.html` posts to the
  [Formspree](https://formspree.io/) endpoint in the form `action`. It works as
  a plain POST without JavaScript, and `assets/js/contact.js` progressively
  enhances it with an Ajax submit plus inline success/error states. A `mailto:`
  fallback is also provided.
- **No storage APIs:** the site never uses `localStorage`/`sessionStorage`;
  the theme preference is held in memory only.

## License & usage

**All Rights Reserved. Copyright (c) 2026 Maximized.**

This repository is published **for demonstration and portfolio review purposes
only**. No permission is granted to use, copy, modify, distribute, or create
derivative works from any part of it without prior written permission. See
[`LICENSE`](./LICENSE).
