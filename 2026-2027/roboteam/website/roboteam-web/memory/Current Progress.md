---
title: Current Progress
tags: [roboteam-web, progress]
updated: 2026-10-24
last_device: "nw1728 (linux)"
---

# 📍 Current Progress: continue from here

Back to [[00 Index]] · History: [[Session Log]]

> [!important] For Claude on any device
> Read this **first**. At the end of each session, **overwrite** it (history goes in [[Session Log]]).

## State on 2026-10-24

**Admin phase 1 is built and phase 2 is 10 of 13 tasks done.** The site itself looks exactly as
it did — this work changed who can edit it, not what a visitor sees.

- Spec: `docs/superpowers/specs/2026-10-24-admin-phase-2-design.md` (all open questions answered)
- Plan: `docs/superpowers/plans/2026-10-24-admin-phase-2.md` ← **the next session works from this**
- Everything below is committed on `main`. `npm test` (147 pass), `npm run lint` and
  `npm run build` were all clean at the last commit.

### Done in phase 2 (tasks 1–10)
1. **One shared defaults map** (`shared/contentDefaults.js`), asserted at boot — a content type
   without a default now stops the server instead of blanking a page.
2. **The dev login door only runs on localhost.** `AUTH_MODE=dev` now also demands a localhost
   `PUBLIC_URL`, so forgetting `NODE_ENV=production` can no longer mount it on the real domain.
3. **Field types are a registry** (`server/content/fieldTypes.js`). An unknown type is a loud
   error, not a value treated as text.
4. **Wrong-shaped stored content falls back** to the built-in content, and `ErrorBoundary` wraps
   the whole app, so no content file can take the site down.
5. Two small public fixes: the `/events` meta line no longer leaves a dangling `·`, and the front
   page keys events by `id`.
6. **`list-of-text` rows** (add/remove/reorder) and **single-item types**. Contact is editable.
7. **Image upload**: `POST /api/uploads`, type decided by sniffing the first bytes, no SVG, 5 MB,
   random stored filename, 60/hour per person, served with `nosniff` + sandbox CSP.
8. **The picture field**: preview, Choose/Replace/Remove, drag and drop. Alumni editable.
9. **Members are their own content type** (the big one). Flat list, each carrying a subteam slug,
   joined back together in `src/content/useMembers.js`. The editor shows them grouped per subteam
   with counts, per-group Add, in-group up/down, a dropdown that moves someone between subteams,
   and a quiet `no photo` flag. A member whose subteam disappeared lands under "No subteam"
   instead of breaking anything.
10. **News, results, numbers, social links, past teams** editable.

**Ethan also asked for partner logos** (done): a partner is now `{ name, logo, url }`. A cell shows
the logo if there is one and the name if not, and links to the partner when a website is filled in.
No logo files are in the repo — they get uploaded through the admin, so **all 18 are still names**.

## ▶️ Continue with: phase 2, tasks 11–13

Work from `docs/superpowers/plans/2026-10-24-admin-phase-2.md`. Each task there has its own
files, tests and commit line.

- [ ] **Task 11 — the `items` field (nested lists), proven on join and positions.**
      A list of objects inside one item: `steps` and `waitingLists` on the join page, and the
      paragraphs of a position. Add the `items` entry to `fieldTypes.js` (it can reuse
      `fieldMessage`/`cleanFields`, which already live there for exactly this), report nested
      errors as `field: 'steps[0].title'` so the wire format stays flat, and write
      `ItemsField.jsx`. **Also flatten `applyEmail`** in `src/data/join.js` into
      `applyEmailTo` / `applyEmailSubject` / `applyEmailBody` and update `JoinPage.jsx`.
- [ ] **Task 12 — education.** Reshape `src/data/education.js` so the two loose exports become one
      `educationPage = { intro, note }`, then two description files: `educationPage` (single) and
      `activityGroups` (a list of tabs, each with nested `activities`, each with `points`).
- [ ] **Task 13 — the whole thing end to end.** Every editor at 390px; a real pretend changeover
      (add three people with photos, move two, remove two, save once); confirm the boot assert
      fires for a type with no default; `npm test` + `npm run lint` + `npm run build`; then the
      deployment note in `README.md` (**`server/storage/` holds the content *and* the uploads and
      is not in git — a backup means copying that folder**).

### Things to know before you start
- `npm run dev` (5173) and `npm run dev:server` (3000, `node --watch`) may still be running from
  the last session — check before starting more.
- The admin shares the site's `global.css`, where every `<section>` has 120px of padding. Any
  `<section>` inside the admin needs `padding: 0`.
- Don't define a React component inside another component's body (it remounts on every keystroke
  and the box you are typing in loses focus) — that is why `ListItem.jsx` is its own file.
- `src/data/*.js` stays the built-in content. Never delete a data file when its type becomes
  editable: it is the fallback when the content server is unreachable, which is how `npm run dev`
  works on its own.
- The error shape on the wire is flat: `{ index, field, message }`.

## Also waiting
- Things the team should check before launch → [[Open Questions]].
- Google OAuth client (the **team manager** creates it) to replace the development login door.
