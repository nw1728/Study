---
title: Current Progress
tags: [roboteam-web, progress]
updated: 2026-10-29
last_device: "1770np (mac)"
---

# 📍 Current Progress: continue from here

Back to [[00 Index]] · History: [[Session Log]]

> [!important] For Claude on any device
> Read this **first**. At the end of each session, **overwrite** it (history goes in [[Session Log]]).

## Latest (2026-10-29)
- **Google login is built** (`server/auth/google.js`, tests in `google.test.js`) and this laptop's
  `server/.env` is on `AUTH_MODE=google`. The redirect to Google is checked. **Waiting on Ethan's
  real login test:** his account gets in, a personal Gmail and an off-list team account are refused.
  The other laptop still needs the two GOOGLE_ values in its own `server/.env` (copy them over by hand, never through git).
- **The rover pet only lives on the planet now.** Scroll past the story and it drives back onto
  the planet and the story rover takes over again; no pet on other pages. The two-way protocol:
  `rover-handoff` (StoryDirector → pet, now with a `home()` position getter) and `rover-home`
  (pet → StoryDirector, when it has arrived). The trip is capped at 2.5 s (`MAX_TRIP_HOME`).
- **Four wheels:** both rover drawings show two wheels (side view) on one rocker; story text says four.
- **Spotted, not fixed:** the planet outline has a gap at its top-left (left of the rover / under the flag). It was there before the wheel change.
- **"Skip to about ↓" button** on the story stage (`ScrollStory/SkipStory.jsx`, text in `data/story.js`).
- **Admin login on a new laptop:** `server/.env` is not in git. Copy `server/.env.example`, fill
  `SESSION_SECRET`, run `npm install`, then `npm run dev:server` + `npm run dev`, and open
  `/admin.html`. Each laptop has its own `server/storage/`.
- Not committed yet.

## State on 2026-10-24

**The whole website is editable at `/admin` without touching code, and a save shows up on the
live site immediately — no rebuild.** Admin phases 1 and 2 are both finished.

The public site looks exactly as it did. This work changed who can edit it, not what a visitor
sees. Last commit: `npm test` 156 pass, `npm run lint` clean, `npm run build` clean.

- Spec: `docs/superpowers/specs/2026-10-24-admin-phase-2-design.md` (built)
- Plan: `docs/superpowers/plans/2026-10-24-admin-phase-2.md` (all 13 tasks ticked)
- For humans: the **"Editing the site without a developer"** section in `README.md`.

### What is editable
Events · subteams · members · news · results · the front-page numbers · partners · alumni ·
past teams · social links · the education text and its activity tabs · the join page ·
open positions · contact. Fifteen types, each described by one file in `shared/contentTypes/`.

**Members are the centre of it.** They live in one flat list, each carrying the slug of their
subteam, and the editor shows them grouped per subteam with counts, an Add button per group,
up/down within a group, and a dropdown that moves someone between subteams in one go. Anyone
without a photo carries a quiet `no photo` note. A member whose subteam was renamed is gathered
under "No subteam" instead of disappearing. A pretend changeover (add two people, save once)
took about a second of clicking and was live on `/team/electrical` on reload.

**Pictures are uploaded**, never typed as paths: a frame with a preview, Choose/Replace/Remove,
and drag-and-drop. What a file really is comes from its first bytes, so a `.jpg` that is
something else is refused; no SVG; 5 MB; the stored name is a random uuid we pick.

## ⚠️ Two things to do before this goes on a real domain
1. **`AUTH_MODE=google`.** The admin currently uses the development login, which lets any
   address on the access list in without a password. It cannot reach a real domain — the server
   refuses to start if `dev` meets `NODE_ENV=production` *or* a non-localhost `PUBLIC_URL` — so
   switching is what makes the admin real. **The team manager creates the OAuth client.**
2. **Back up `server/storage/`.** It holds the content, the version history, the uploaded
   pictures and the access list, and it is **not in git**. The repo alone is no longer the whole
   site: if the office machine dies, every edit and every uploaded photo since deployment is gone.

## ▶️ Continue with
Ask Ethan which of these he wants next — none is started:

1. ~~The Google login door~~ built 2026-10-29; only the real-domain redirect URI is left (see Deployment).
2. **The history and restore panel.** Every save already writes a version to
   `server/storage/history/` and keeps the last 30; there is no UI to browse or restore them yet.
3. **The team access page** — add and remove people, change owner/editor — so Ethan is not the
   only one who can let someone in.
4. **Partner logos.** A partner is now `{ name, logo, url }`, but no logo files exist yet: all 18
   still show as names until someone uploads them. The websites are empty too — **don't invent
   them**, ask the team.
5. **Deployment itself**: the office server, HTTPS via Caddy, the SPA fallback.

### Traps worth knowing first
- Vite's proxy rewrites the Host header to 3000 unless `changeOrigin: false`. The `/auth` proxy in
  `vite.config.js` has it off, so the Google login returns to 5173. Without it you land on
  "Cannot GET /admin" on port 3000.
- The admin shares the site's `global.css`, where every `<section>` has 120px of padding. Any
  `<section>` inside the admin needs `padding: 0`.
- A grid item will not shrink below its content without `min-width: 0` — that is what made the
  whole admin 1440px wide on a phone.
- Never declare a React component inside another component's body: it is a new type on every
  render and the box you are typing in loses focus. That is why `ListItem.jsx` is its own file.
- `src/data/*.js` stays the built-in content. Never delete a data file when its type becomes
  editable: it is the fallback when the content server is unreachable, which is how `npm run dev`
  works on its own. A new type needs its default added to `shared/contentDefaults.js`, and the
  server refuses to start if you forget.
- The error shape on the wire is flat — `{ index, field, message }` — with nested fields
  carrying their path in the name, e.g. `steps[1].title`.

## Also waiting
- Content the team should check before launch → [[Open Questions]].
