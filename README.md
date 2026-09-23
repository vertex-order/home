# vertex-order.github.io

The [Vertex Order](https://order.vertexprojects.org) org landing page — one
page linking out to every game, movie/TV, and book franchise list, plus a
shared FAQ.

[`site/data/games.js`](site/data/games.js),
[`site/data/movies.js`](site/data/movies.js), and
[`site/data/books.js`](site/data/books.js) are the single source of truth:
each assigns a plain `window.*_FRANCHISES` array (`{ title, href?, by?,
firstPublished? }` — omit `href` for a franchise that doesn't have a list
yet, and it renders as an unlinked placeholder). `site/data/faq.js` holds
the FAQ copy. [`site/page.dc.html`](site/page.dc.html) renders all of it.

Plain HTML / CSS / JS, no build step, no Node. Open
[`site/page.dc.html`](site/page.dc.html) straight off disk, or run
`just serve`. Every push to `main` deploys to GitHub Pages.

[MIT](LICENSE) — see [NOTICE.md](NOTICE.md) for the third-party parts.
Contributor guide: [CONTRIBUTING.md](CONTRIBUTING.md). Notes for AI coding
tools: [AGENTS.md](AGENTS.md) and [`.claude/CLAUDE.md`](.claude/CLAUDE.md).
