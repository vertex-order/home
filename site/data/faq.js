// FAQ content for the page's FAQ section. Each item's `a` is an array of paragraphs: a plain
// string, or {parts:[...]} where each part is {text}, {em}, or {text, url} for a link.
// Every entry needs a stable, hand-picked `id` (kebab-case) — it becomes the question's
// #faq-<id> pilcrow anchor, so never derive it from the question text or array index.
// schema: faq.schema.json
window.FAQ_ITEMS = [
  {
    id: "contribute-list",
    q: "Interested in contributing to, updating, or starting a new franchise order list?",
    a: [
      { parts: [
        { text: "This is a serious commitment — we don't want half-finished pages live. Building a new list can easily take 10+ hours, and some, like Final Fantasy, have taken over 100. If you're still interested, or want to help with an existing list, head to that list's discussion page, or the " },
        { text: "organization discussion page", url: window.SITE_CONFIG.discussionsUrl },
        { text: " if we don't have a list for it yet. The placeholders are just suggestions; we'd welcome others too." },
      ] },
    ],
  },
  {
    id: "fan-art",
    q: "Have fan art you want to share with our community?",
    a: [
      { parts: [
        { text: "We're always looking for simple small " },
        { em: "original" },
        { text: " fan art to go alongside entries in the lists (with full in-place attribution), or for behind the cards on this page (footer attribution), and rotate through multiples when we can. Hand-drawn or digitally painted (Photoshop, tablet, etc.) work is welcome, but we'd prefer to avoid AI-generated art for now. Head to that list's discussion page, or the " },
        { text: "organization discussion page", url: window.SITE_CONFIG.discussionsUrl },
        { text: ", to tell us about your work." },
      ] },
      { parts: [
        { text: "So we can display it freely, we only accept " },
        { text: "CC-BY", url: "https://creativecommons.org/licenses/by/4.0/deed.en" },
        { text: " licensed work. Let us know if something is being displayed in error." },
      ] },
    ],
  },
];
