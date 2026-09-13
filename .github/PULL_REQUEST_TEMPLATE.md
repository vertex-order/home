<!-- PULL_REQUEST_TEMPLATE.md (markdown) -->

## What & why

<!-- What does this change, and what's it for? -->

## Discussed in

<!-- REQUIRED: link the Discussion or issue where this change was raised and
     agreed. Open a Discussion first if there isn't one — PRs without a prior
     thread may be closed unreviewed. -->

-

## Checklist

- [ ] Links the Discussion or issue where this was agreed (above)
- [ ] Previewed locally (`site/page.dc.html` off disk, or `just serve`)
- [ ] Ran `just bundle-components` and committed `site/components.js` (if `FAQ.dc.html` or `ThemeToggle.dc.html` changed — these are vendored, so edit them in kit instead, then `just sync-update kit`)
- [ ] Commits signed off (`git commit -s`); contribution licensed per [CONTRIBUTING.md](../CONTRIBUTING.md#licensing)
