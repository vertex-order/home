<!-- docs/section-placement.md (markdown) -->

# Which section a franchise lands in

> **Guidance, not a hard rule.** These are judgment calls, not a spec.
> An AI editing this repo should follow them as the default and not
> deviate without a human explicitly saying so in the prompt — but if it
> thinks a case warrants breaking from them, it should ask the human
> first rather than either blindly applying the rule or silently
> deviating.

## The axis

- Place by **where people primarily consume it today**, not where it
  originated. Origin only matters for `by` (`docs/attribution.md`), not
  for which section.
  - Final Fantasy → Games (films/anime/novels exist but aren't
    independently consumed — they fold into the Games entry's own
    list).
  - Jurassic Park → Movies & TV (novel origin, but the film audience
    dwarfs it).
  - Men in Black → Movies & TV (comic origin, same reasoning).

## Default: one entry, one section

- Fold every medium the franchise touches into one entry's own list, as
  long as it stays navigable (a handful of books next to a handful of
  films isn't unwieldy).

## Before splitting, try a pointer instead

- A pointer = a one-line, no-data link in a section the franchise
  *isn't* filed under, pointing back to its one real entry (e.g. under
  Movies & TV: "Harry Potter → see Books").
- No `by`, no order, nothing to keep in sync, doesn't count toward
  "is this unwieldy."
- Default lean whenever a combined entry has a large audience in a
  section it's not filed under — covers most cases that might tempt a
  duplicate entry, especially a "help wanted" placeholder with no list
  built yet.

## When an actual split is justified

Split into `Title (Games)` / `Title (Screen)` / `Title (Books)` —
separate entries, separate order-lists, separate sections — only when:

1. **Unwieldy size.** One medium has too many entries to fold in
   (Batman/Spider-Man `(Screen)` — comics back-catalog is huge and
   intentionally out of scope).
2. **Independent audiences, independent stories.** The mediums aren't
   adaptations of each other — people experience them separately, not
   as substitutes (Star Wars: games/films/Legends novels, each a large
   self-contained catalog; D&D `(Games)`: games are a limited offshoot
   of the tabletop/novel original).

Both require independence of catalogs, not just "both audiences are
large" — that alone is a pointer case, not a split case.

## Book-origin, screen-dominant audience: the tiebreaker

- If the screen version **adapts** the books (~1:1, same story) →
  that's a substitute relationship, not independent audiences. Combine,
  file under whichever medium sets the canonical order (usually books).
  - Harry Potter, The Hunger Games → stay in Books, combined.
- If screen and books are **independent stories** sharing only a
  character/title → treat like Star Wars, split.
  - James Bond → split. 40+ continuation novels and 25+ films share
    little beyond the character. `James Bond (Screen)` in Movies & TV;
    books intentionally not listed at all.

## Franchise name vs. its umbrella name

- Prefer whichever name a scanning fan actually recognizes over the
  technically-correct umbrella name (same logic as `by`).
  - "Wizarding World" is the official umbrella; "Harry Potter" is what
    everyone searches. Keep **Harry Potter** plain — no recognition
    problem to solve, so no need for a combined name.
  - A combined form (`X (Umbrella)`) is only worth it when the umbrella
    name itself carries real independent recognition.
