---
title: Session Log
tags: [roboteam-web, log]
updated: 2026-10-29
---

# Session log (newest first)

Back to [[00 Index]]

## 2026-10-29 · 1770np (mac) — admin login on this laptop, pet stays on the planet, skip button
- This laptop had no `server/.env` and stale `node_modules` (express missing). Made `.env` from the example (dev login, new secret), `npm install`. Its `server/storage/` is fresh, so no edits from the other laptop.
- Rover pet now only lives on the planet: drives home when the stage scrolls away (`rover-home` event back to StoryDirector), no pet on other pages.
- "Skip to about ↓" button on the story stage (`SkipStory.jsx`, text in `data/story.js`).
- Rover is four-wheeled now: story rover and pet show two wheels on a single rocker (bogie removed), "six wheels" → "four wheels" in `data/story.js`.
- Checked in Playwright on desktop and at 390px; lint, build, 156 tests pass.

## 2026-10-24 · nw1728 (linux) — admin phase 2, finished (all 13 tasks)
- Answered the spec's three open questions (keep a leaver's photo file, past-team members stay
  plain text, flag photo-less members) → [[Decisions]]; wrote the 13-task plan.
- **Foundation first** (tasks 1–5): one shared defaults map asserted at boot; the dev login door
  now also refuses a non-localhost PUBLIC_URL; field types became a registry so an unknown one is
  a loud error instead of a 500; wrong-shaped stored content falls back and an ErrorBoundary
  catches the rest; the two small /events bugs an editor could now cause.
- **New machinery**: list-of-text rows, single-item types, image upload (magic-byte sniffing, no
  SVG, random filenames, nosniff + sandbox CSP), the picture field with preview and drop, and the
  reference dropdown.
- **Members split out of subteams** into one flat type, rejoined in `useMembers.js`. The editor
  groups them per subteam, moves within a group, moves between subteams with one dropdown, and
  flags anyone with no photo. A member whose subteam vanished lands under "No subteam".
- Editable now: events, subteams, members, news, results, numbers, partners, alumni, past teams,
  social links, contact. Partners gained a logo and a website link (Ethan asked mid-session).
- A background security review flagged polyglot uploads; fixed with nosniff + sandbox CSP headers.
- **Finished the same day (tasks 11–13):** the nested `items` field (join page, open positions,
  and the education activities inside their tabs), the education text and tabs, then the pass
  over everything.
- The 390px pass found the admin was **unusable on a phone** — the sidebar's list of types kept
  its content width and pushed the page to 1440px (a grid item needs `min-width: 0`). Fixed;
  all 15 editors now fit with no sideways scroll. The editor `<section>` had the site's 120px
  page padding too.
- Added a test that **every built-in default passes its own description** — it caught two data
  files with no ids. A default an editor cannot re-save unchanged is a trap.
- Rehearsed a changeover end to end (add two members → save once → live on `/team/electrical`)
  and proved the boot guard refuses to start for a type with no default.
- Wrote the admin and **backup** notes in `README.md`: `server/storage/` is not in git, so the
  repo alone is no longer the whole site.

## 2026-10-23 · NW1728s-MacBook-Air (one long session)
- Started from a fresh Vite + React template. Planned an "OOP-like" structure (one object per file).
- Palette from the logo purple; minimalist dark design; content scraped from the old roboteamtwente.nl (the team now does the **Mars rover / ERC**, not soccer).
- Built the front page; added Apple-style reveals, side slides, rising words, a count-up and a rolling-number results table.
- Rover pet: first a cursor follower, then click-to-drive with moods, then car-like driving with A* routes around text, sad when stuck.
- Light/dark mode; logos and favicons; fonts switched to Aldrich + Saira.
- Scroll story: v1 (Drone Team–like) was rejected as a copy → v2: tiny planet + mission log + handover to the pet. Fixed the phone layout.
- Planned the admin (Google login, invite-only, office server); **on hold**.
- Built all sub-pages with real content and photos from the old site; phone menu.
- Added `CLAUDE.md` + `memory/` so the other laptop can continue.
