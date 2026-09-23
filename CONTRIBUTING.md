<!-- CONTRIBUTING.md (markdown) -->

# Contributing

Everything you need is on this page. No Claude Design account, no Node, no
build tooling — the site is plain HTML/CSS/JS under [`site/`](site/). Clone,
edit, preview in a browser, open a PR.

- [What this repo is](#what-this-repo-is)
- [Quick start](#quick-start)
- [Add or update a franchise link](#add-or-update-a-franchise-link)
- [Edit the FAQ](#edit-the-faq)
- [Edit page copy](#edit-page-copy)
- [Restyle](#restyle)
- [Cross-repo sync](#cross-repo-sync)
- [Preview locally](#preview-locally)
- [Open a PR](#open-a-pr)
- [Licensing](#licensing)
- [Appendix: repo layout](#appendix-repo-layout)
- [Appendix: deploy internals](#appendix-deploy-internals)

## What this repo is

The [Vertex Order](https://order.vertexprojects.org) org landing page — one
page linking out to every game, movie/TV, and book franchise list this org
maintains, plus a shared FAQ. It's the lightest of the Vertex Order repos:
no series data, no platform icons, just link lists.

The entry page is **`site/page.dc.html`**, same convention as every other
Vertex Order repo.

## Quick start

```sh
git clone https://github.com/vertex-order/vertex-order.github.io
cd vertex-order.github.io
# open site/page.dc.html in a browser — done, no build step
```

Optional: install [`just`](https://github.com/casey/just) for the
`just serve` / `just build` shortcuts, and run `just install-hooks` once to
wire up the pre-commit hook (regenerates `site/components.js` when a
component changes). Neither is required to contribute.

## Add or update a franchise link

Edit the relevant array in `site/data/`:

- [`site/data/games.js`](site/data/games.js) — `window.GAME_FRANCHISES`
- [`site/data/movies.js`](site/data/movies.js) — `window.MOVIE_FRANCHISES`
- [`site/data/books.js`](site/data/books.js) — `window.BOOK_FRANCHISES`

Each entry is `{ title, href?, by?, firstPublished? }`. Omit `href` for a
franchise that doesn't have a list yet — it renders as a dimmed, unlinked
placeholder card instead of a link, and sorts after the linked entries.
`by` and `firstPublished` are optional and render as a small byline (e.g.
"by Square Enix · 1987"). Reload the page — data-only edits need no rebuild.

## Edit the FAQ

The FAQ component (`site/FAQ.dc.html`) is **vendored from kit** — don't
edit it here (see [Cross-repo sync](#cross-repo-sync)). The copy itself is
data: [`site/data/faq.js`](site/data/faq.js) (`window.FAQ_ITEMS`), one item
per `{ q, a }`, where `a` is an array of paragraphs — a plain string, or
`{ parts: [...] }` where each part is `{ text }`, `{ em: text }` (italic),
or `{ text, url }` (a link).

## Edit page copy

Title, intro, franchise section headings, footer:
[`site/page.dc.html`](site/page.dc.html). It is readable HTML with
`{{ expression }}` template bindings, evaluated at runtime by `support.js`.
The `.dc.html` naming is just the format Claude Design imports/exports — you
don't need the tool to edit it.

## Restyle

Colours, fonts, spacing and radii are CSS custom properties at the top of
[`site/_ds/nocturne-dd511f00-0314-498c-83ef-49f001a371b0/styles.css`](site/_ds/nocturne-dd511f00-0314-498c-83ef-49f001a371b0/styles.css)
(vendored — don't hand-edit; start a
[discussion](https://github.com/vertex-order/vertex-order.github.io/discussions)
if a token needs to change, it's shared by every Vertex Order site). The
light-mode palette override lives in the `<style>` block of `page.dc.html`
itself — this repo is the only one with a light theme tuned locally rather
than inherited, since it has no series-specific image filters to keep in
step with it.

## Cross-repo sync

This repo owns nothing another repo pulls — it's a leaf, vendoring a slice
of [`vertex-order/kit`](https://github.com/vertex-order/kit)'s build
substrate: the DC runtime, Nocturne (`_ds/`), the FAQ and theme-toggle
components, every script, `justfile`, and CI/editor config with no reason
to differ per repo. Unlike the franchise-list repos, it skips the
platform-icon micro-kit and the series/media/floating-nav components — this
page doesn't need them. [`sync.toml`](sync.toml) is the manifest.

Not vendored, on purpose: `.github/ISSUE_TEMPLATE/*` and
`.github/PULL_REQUEST_TEMPLATE.md` — both necessarily carry this repo's own
Discussions URL, so they can never be byte-identical to kit's copy — seeded
from it once, then kept locally.

- `just sync` — pull the vendored files at the pinned `ref`.
- `just sync-check` — what CI runs
  ([`check-vendored.yml`](.github/workflows/check-vendored.yml)); fails on drift.
- `just sync-update kit` — repin to kit's current HEAD, then pull.

Never hand-edit a vendored file. To change `FAQ.dc.html` or
`ThemeToggle.dc.html`, change it in `kit`, then `just sync-update kit` here.

Three things stop a hand edit from landing: an `Owned by vertex-order/kit —
edit here` header comment on the file itself, a pre-commit guard
(`sync.py --check-staged`) that refuses to commit a vendored file that no
longer matches its source, and the same check in CI.

## Preview locally

Simplest — open [`site/page.dc.html`](site/page.dc.html) directly in a
browser (`file://`). `components.js` makes that work with no server. Off
disk the page depends on `components.js` being current, so run
`just bundle-components` after editing `FAQ.dc.html` or `ThemeToggle.dc.html`
(after syncing a kit-side change in).

To preview the way it deploys — and so component edits load live without a
regen — serve `site/` over http:

```sh
cd site && python -m http.server 8000
# http://localhost:8000/page.dc.html
```

Any static server works (`npx serve`, VS Code Live Server, …). With `just`:
`just serve` runs the exact copy-and-rename step CI uses
(`site/` → `build/`, `page.dc.html` → `index.html`), so you preview the
real deploy output.

## Open a PR

1. Raise it in [Discussions](https://github.com/vertex-order/vertex-order.github.io/discussions)
   first and agree the change there. PRs without a linked Discussion (or
   issue) may be closed unreviewed.
2. Fork, branch off `main`.
3. Make your edit under `site/`.
4. Preview locally.
5. Sign off each commit — `git commit -s` (see [Licensing](#licensing)).
6. PR against `main`, linking the Discussion. **Merging deploys
   automatically** — no manual export step, ever.

## Licensing

Everything in this repo is [MIT](LICENSE) — what you contribute, and what
ships out. See [`NOTICE.md`](NOTICE.md) for the third-party parts (the
vendored DC runtime and Nocturne design system).

Sign off every commit with `git commit -s`. It adds a `Signed-off-by` line
certifying you wrote the change, or otherwise have the right to submit it
under MIT — the
[Developer Certificate of Origin](https://developercertificate.org/).

Questions and proposals go in
[Discussions](https://github.com/vertex-order/vertex-order.github.io/discussions);
issues are for collaborators.

## Appendix: repo layout

Owned here (edit these):

```
site/
├── page.dc.html          entry page: copy, franchise cards, render/logic
└── data/
    ├── games.js           window.GAME_FRANCHISES
    ├── movies.js          window.MOVIE_FRANCHISES
    ├── books.js           window.BOOK_FRANCHISES
    └── faq.js             window.FAQ_ITEMS
sync.toml                  cross-repo file-sync manifest
```

`.github/ISSUE_TEMPLATE/*`, `.github/PULL_REQUEST_TEMPLATE.md` — kept
locally (repo-specific Discussions URL), seeded from kit's copies.

Vendored from [`vertex-order/kit`](https://github.com/vertex-order/kit) via
`just sync` — **don't hand-edit** (see [Cross-repo sync](#cross-repo-sync)):

```
site/support.js, site/_ds/,
site/FAQ.dc.html, site/ThemeToggle.dc.html,
scripts/bundle-components.py, scripts/sync.py,
scripts/{normalize-svg,strip-c2pa,trim-svg}.py, svgo.config.mjs,
justfile, .editorconfig, .gitattributes, .claude/settings.json,
CODE_OF_CONDUCT.md, .githooks/pre-commit,
.github/workflows/{static,check-generated,check-vendored}.yml,
.github/dependabot.yml
```

Generated (`just bundle-components`): `site/components.js`.

## Appendix: deploy internals

Every push to `main` runs
[`.github/workflows/static.yml`](.github/workflows/static.yml):

1. Checks out the repo.
2. Installs `just`, runs `just build` — regenerates `components.js`, copies
   `site/` into a gitignored `build/`, renames `build/page.dc.html` to
   `build/index.html` (GitHub Pages needs a root `index.html`; every other
   path in the file is already relative). Same recipe you can run locally.
3. Uploads `build/` as the Pages artifact and deploys it.

No bundler, no dependencies, no manual "export". Merging a PR to `main` is
the deploy.

**Verify a deploy:** the **Actions** tab, or the environment URL under
**Settings → Pages**.

**First-time setup** (if not already done): **Settings → Pages → Build and
deployment → Source** must be **GitHub Actions**, not "Deploy from a
branch".
