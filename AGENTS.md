<!-- AGENTS.md (markdown) -->

# AGENTS.md

Guidance for AI coding tools working in a **full checkout** of this repo
(Cursor, Windsurf, Claude Code, Aider, …). Human contributors: read
[CONTRIBUTING.md](CONTRIBUTING.md) — it has the task-by-task guide.

> This file is **not** seen by browser-based design tools (Claude Design
> etc.), which pull in only the flat `site/` directory plus
> `.claude/CLAUDE.md`. Instructions for that environment live in
> [`.claude/CLAUDE.md`](.claude/CLAUDE.md) and the header comment of
> [`site/components.js`](site/components.js).

## What this repo is

The [Vertex Order](https://vertex-order.github.io) org landing page — a
single page linking out to every franchise list, plus a shared FAQ. It's
the lightest of the Vertex Order repos: no series data, no platform icons,
no floating nav — just franchise link lists and two components pulled from
kit.

`site/data/{games,movies,books}.js` each assign a plain `window.*_FRANCHISES`
array — `{ title, href?, by?, firstPublished? }`, `href` omitted for a
placeholder entry. Schema: `schemas/franchise-list.schema.json` (own to
this repo, not vendored — kit has no equivalent). `site/data/site.js` →
`window.SITE_CONFIG`, schema `schemas/site.schema.json` (also own to this
repo — a much smaller shape than kit's list-repo `SITE_CONFIG`).
`site/data/faq.js` holds the FAQ copy (`window.FAQ_ITEMS`), schema
`schemas/faq.schema.json` (vendored from kit — this repo's FAQ_ITEMS
happens to match kit's list-repo shape exactly). `site/page.dc.html`
renders all of it and is the
entry page, same convention as every other Vertex Order repo —
`bundle-components.py` (vendored from kit) detects it by content (any
`*.dc.html` that references `components.js`), not by name, so nothing here
is repo-specific.

## The one rule that bites

`site/components.js` is a **generated build artifact** — it inlines every
sibling `site/*.dc.html` component (all except the entry page,
`page.dc.html`: currently `FAQ.dc.html` and `ThemeToggle.dc.html`, both
vendored). If either changes, regenerate it:

```sh
just bundle-components   # or: just build  /  python3 scripts/bundle-components.py
```

The pre-commit hook in `.githooks/` also does this (run `just install-hooks`
once per clone), and CI
([`check-generated.yml`](.github/workflows/check-generated.yml)) fails any PR
where it's out of date. Never hand-edit `components.js`.

`page.dc.html` loads `components.js` **only over `file://`** — the fallback
for opening the page straight off disk, where `fetch()` of sibling
`*.dc.html` is blocked. Over http(s) (`just serve`, Pages, any preview) the
runtime fetches each `*.dc.html` live, so a stale bundle never changes what
renders there — it only needs regenerating to keep the committed file
diff-clean and CI green.

## What's editable vs vendored

| Editable (owned here) | Vendored from kit — don't hand-edit |
| --- | --- |
| `site/page.dc.html` (copy, links, franchise cards) | `site/FAQ.dc.html`, `site/ThemeToggle.dc.html` |
| `site/data/{games,movies,books,faq}.js` | `site/components.js` (generated — `just bundle-components`) |
| `NOTICE.md` | `site/support.js`, `site/_ds/` |
| | every `scripts/*.py`, `svgo.config.mjs`, `justfile` |
| | `.editorconfig`, `.gitattributes`, `.claude/settings.json`, `CODE_OF_CONDUCT.md` |
| | `.githooks/pre-commit`, most of `.github/` (see `sync.toml`) |

## Cross-repo sync

This repo owns nothing another repo pulls — it's a leaf. It vendors a
**slice** of [`vertex-order/kit`](https://github.com/vertex-order/kit)'s
build substrate: the DC runtime (`support.js`), Nocturne (`_ds/`), the FAQ
and theme-toggle components, every script, and the CI/editor config with no
legitimate reason to differ per repo. Unlike the franchise-list repos, it
does **not** pull the platform-icon micro-kit, the series/media components,
or the floating-nav components — this page has no platforms and no series
data. [`sync.toml`](sync.toml) is the manifest.

Not vendored, even though this repo needs its own: `.github/ISSUE_TEMPLATE/*`
and `.github/PULL_REQUEST_TEMPLATE.md` — each necessarily carries this
repo's own Discussions URL, so a byte-identical vendor is impossible by
construction. Seeded from kit's copies once, then maintained locally.

`just sync` pulls the subscribed files at the pinned `ref`. `just sync-check`
(and `.github/workflows/check-vendored.yml` on every PR) fails if a vendored
file has drifted. `just sync-update kit` repins to kit's current HEAD.

**Never edit a vendored file here** — change it in kit, then `just sync-update kit`.
Three guards back that up:

1. **A header comment**, where the file format allows one — `Owned by
   vertex-order/kit — edit here. Vendored elsewhere via sync.toml; don't edit
   the copy there.`
2. **Pre-commit guard** — `sync.py --check-staged` (wired into
   `.githooks/pre-commit`) refuses to commit a staged vendored file that no
   longer matches its source.
3. **CI** — `check-vendored.yml` runs the same check on every PR and on push
   to `main`.

**A change to `FAQ.dc.html` or `ThemeToggle.dc.html`** always lands in kit
first (it ships to every consumer), then `just sync-update kit` here.

## Build / preview / deploy

- No bundler, no Node for the site. Open `site/page.dc.html` off disk,
  or `just serve` to preview the way CI deploys.
- Push to `main` = deploy (GitHub Actions runs `just build`, publishes
  `build/` to Pages; `build/page.dc.html` is renamed to `index.html`).
- Recipes: see [`justfile`](justfile).
