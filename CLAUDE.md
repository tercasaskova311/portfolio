# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal data-science portfolio site (Jekyll, hosted on GitHub Pages at the custom domain in `CNAME` / `url` in `_config.yml`). It was forked from the **academicpages** template, but now uses the **Minimal Mistakes** theme via `remote_theme: mmistakes/minimal-mistakes@4.24.0`. Much of the academicpages scaffolding (publications/talks generators, talkmap, sample comments, `_drafts`) is leftover and not part of the live site's navigation.

There are no tests or linters. "Building" means running Jekyll.

## Commands

```bash
bundle install
bundle exec jekyll serve -l -H localhost     # local dev at http://localhost:4000 with livereload
# or via Docker:
docker compose up                            # serves on port 4000, watches files
```

- `_config.yml` changes require restarting `jekyll serve`.
- `npm run build:js` minifies JS into `assets/js/main.min.js` (rarely needed; the theme's JS comes from the remote theme).
- `scripts/update_cv_json.sh` regenerates `_data/cv.json` from `_pages/cv.md` (only matters for the `/cv-json/` page; the nav links to the markdown `/cv/`).

## Architecture

- **Theme layering:** Layouts/includes/sass come from the remote Minimal Mistakes theme; any file with the same path in `_layouts/`, `_includes/`, or `_sass/` locally overrides it. Some layouts used by pages (e.g. `collection` for `/portfolio/` and `/blog/`) exist only in the remote theme. Site-wide style customisations (burgundy masthead, etc.) live in `assets/css/main.scss`, which imports the theme's sass and then overrides. Files ending in `.off` are disabled.
- **Content:**
  - `_portfolio/*.md` — project pages (collection, permalink `/portfolio/:name/` unless overridden in front matter). Use `collection: portfolio`, `date`, `excerpt`, `tags`, `header.teaser`, `classes: wide`. Listed on `_pages/portfolio.md` sorted by date descending, so `date` controls ordering.
  - `_posts/YYYY-MM-DD-slug.md` — blog posts, listed by `_pages/blog.md`.
  - `_pages/` — standalone pages (about, cv, gallery, contact, …). `index.md` is the homepage.
  - `_data/navigation.yml` — top nav menu. `_config.yml` `author:` block drives the sidebar profile.
  - Images go in `images/` (some older references use `assets/images/`); downloadable files (CV PDF) in `files/`.
- **Front-matter defaults** in `_config.yml` set `layout: single` for posts, pages, and portfolio items; posts get author profile, read time, share and related.
- `.github/workflows/scrape_talks.yml` is an inherited academicpages workflow for the talkmap; it only triggers on `talks/**` / `talkmap.ipynb` changes.
