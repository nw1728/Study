# Admin phase 2: the rest of the content

Date: 2026-10-24
Status: **built**, 2026-10-24. Plan: `../plans/2026-10-24-admin-phase-2.md`
Follows: `2026-10-23-admin-design.md` (the original plan) and `../plans/2026-10-24-admin-phase-1.md` (built)

## Intent

Phase 1 proved the machine on one content type: edit an event in `/admin`, and the live site changes. This phase puts **the rest of the website** behind that same admin, so the team can keep the site current without anyone touching code.

The thing that actually drives this: **people join and leave the team roughly every three months** (Ethan). Keeping the team page right is not a once-a-year job, it is the most frequent editing the site will ever see. So member editing is the centre of this phase, and everything about it is judged by how it feels during a quarterly changeover.

Education comes second: Ethan wants to add, remove **and change** activities and the tabs they sit in, without waiting for a developer.

## Goals

1. **A Members page**: one flat list of everyone on the team, each person carrying the subteam they belong to. Adding, removing or moving a person is one action.
2. **Real image upload**: choose a file from your computer, see a preview, done — the way adding a profile picture works anywhere else. No typing paths.
3. **Education fully editable**: the activity tabs themselves, the activities inside them, and the two blocks of intro text.
4. Every remaining content type editable: `subteams`, `partners`, `achievements`, `stats`, `alumni`, `news`, `socials`, `contact`, `pastTeams`, `join`.
5. Adding a further content type stays **one description file**, and that promise is enforced by the code rather than hoped for.
6. The public site looks exactly as it does today. This phase changes who can edit, not what visitors see.

## Non-goals

- Rich text or markdown. Fields stay plain text.
- Drafts or scheduled publishing. Save means live; history is the safety net.
- The history and restore **panel** (phase 1 already writes the history files; the UI to browse them is still later).
- The Team access page (add/remove people, change roles). Still its own piece.
- `navigation` and `story` stay in code: the first is tied to the sections that exist, the second to how the scroll story is animated.
- Reordering by drag. Up/down buttons, which work with a keyboard.

## Anti-goals (it fails if…)

- A quarterly changeover takes longer through the admin than editing the file by hand would.
- Adding a description file for a new type can blank the public site. **This is currently possible** — see "Foundation" below.
- An editor has to know what a path like `/images/members/erik-rusnak.jpg` means.
- Uploading a file can put anything executable on the server, or let someone overwrite another file.
- Splitting subteams and members changes how `/team/<slug>` looks.

---

## Foundation: four things to fix first

A fresh review of phase 1 found that the "just add one description file" promise is not yet safe, and that two phase‑1 defects would be triggered **by this very phase**. These are small, and they come first.

1. **The production guard rests entirely on `NODE_ENV`.** Everything — the dev-door refusal, the `Secure` cookie flag, the localhost Origin bypass — hangs off that one string being set, and only `npm start` sets it. A systemd unit that runs `node server/index.js` directly (the natural thing to write, since systemd does its own restarts) would mount the development login on the public domain, with the first owner's email printed in `.env.example` for anyone to guess.
   **Fix:** a second, positive lock. If `authMode === 'dev'`, `PUBLIC_URL`'s hostname must be `localhost` or `127.0.0.1`, or the server refuses to start. Any real deployment has to change `PUBLIC_URL` anyway, because it is both the Origin check and the Google redirect base.

2. **`validate.js` fails open on a field type it doesn't know.** Unknown types skip the string check and reach `value.trim()`. The moment `list-of-text` exists — this phase, task 2 — every legitimate save of one crashes with a 500 instead of validating.
   **Fix:** invert it. An unrecognised `field.type` is a loud error, not a pass. Each type gets its own check-and-clean pair so nothing is ever guessed.

3. **A stored file with valid JSON but the wrong shape blanks the whole site.** `ContentStore.read` only rescues files that fail to parse. `{}` where a list belongs passes through, `useContent` returns it, `.map` throws, and with no error boundary anywhere React unmounts everything — a white page on *every* route, not just the one. Hand-editing those files is an expected workflow.
   **Fix:** validate on read as well as on write, falling back to the built-in defaults; **and** an error boundary around the app, so no content shape can ever take the site down.

4. **The defaults are hand-maintained in two files** (`server/content/seed.js` and `src/content/defaults.js`). Add a description file, forget one of them, and you get the blank site from (3) — triggered by exactly the workflow this phase promises.
   **Fix:** one shared defaults file both sides import, plus a check at boot that every known content type has a default, failing loudly if not.

Two smaller ones, newly reachable now that non-coders can edit: `/events` renders `{place} · {time}` unguarded, so clearing the Time box leaves a dangling separator on the public page (`EventCard` already does this correctly — mirror it); and `Events.jsx` keys its list by `title`, which is now user-editable and not unique, so two events with the same name scramble the reveal animations. Use `id`.

---

## The shape of the data

### Members come out of subteams

Today one file holds both: each subteam has a `members` array inside it. That nests the thing that changes every three months inside the thing that almost never changes.

**It splits into two content types:**

```js
// subteams: rarely changes
{ slug, name, description, longDescription, image }

// members: changes every quarter
{ name, role, photo, subteam }   // subteam holds a subteam's slug
```

The site joins them back together when it renders, so `/team/mechanical` and the front-page team section look exactly as they do now. The join happens in one small place (`src/content/useMembers.js`), not in every component.

**Order.** Members are stored as one flat list, and that order is kept. The Members editor *displays* them grouped under their subteam headings — so you see the structure — and the up/down buttons move a person within their own group. Changing someone's subteam dropdown moves them to the end of that group. That way the team lead stays first without anyone having to think about a global ordering.

**Why a flat list rather than editing people inside each subteam:** during a changeover you want to see all 28 people at once, spot who is missing, and move someone between subteams by changing one dropdown rather than deleting them from one page and retyping them on another, photo path and all. Ethan chose this with the trade laid out.

### Education

Three levels, and all of it editable:

```js
// educationPage (a single item, not a list)
{ intro, note }

// activityGroups (a list, each with a nested list)
{ id, label, activities: [ { title, level, duration, capacity, language, text, points: [string], tagline } ] }
```

`points` is a list of plain text. `activities` is a list of items nested inside a list item. Both need the new field types below.

### Everything else

| Type | Kind | Needs |
|---|---|---|
| `partners` | list of plain strings | `list-of-text` |
| `achievements`, `stats`, `alumni`, `socials` | flat lists | nothing new |
| `news` | flat list + `pages` | `list-of-text`, `image` |
| `pastTeams` | flat list + `members` | `list-of-text`, `image` |
| `contact` | single item + `address` lines | `single` kind, `list-of-text` |
| `join` | single item, several nested lists | `single` kind, `list-of-text`, `items` |

---

## New field types

Four, and they are what makes the rest fall out:

- **`list-of-text`** — a list of plain strings. A row per entry, add/remove/reorder, no field names. For `partners`, `points`, `pastTeams.members`, `news.pages`, address lines.
- **`items`** — a list of objects with their own fields, nested inside one item. For `activities` inside a group, `steps` inside `join`. It reuses the existing `ItemForm`, one level deeper.
- **`image`** — see below. Replaces today's plain text box.
- **`reference`** — a dropdown whose options come from another content type. `member.subteam` lists the subteams by name and stores the slug. It is what keeps the two halves joined: you cannot type a subteam that doesn't exist, and renaming a subteam doesn't orphan anybody.

The `single` kind (one item instead of a list) was already in the original spec but never built; `contact`, `join` and `educationPage` need it.

---

## Image upload

What Ethan asked for: the way uploading a profile picture works anywhere else.

**In the admin:** the field shows the current picture, or an empty frame. A button opens the file picker; you can also drop a file on it. The picture appears immediately, with "Replace" and "Remove" under it. Nobody sees or types a path.

**On the server:** `POST /api/uploads` (login required), using `multer`.
- **jpg, png and webp only, decided by sniffing the file's own first bytes, not by trusting its name or the browser's content type.** A `.jpg` that is really something else is refused.
- **No SVG**, which can carry scripts, as the original spec already ruled.
- Max 5 MB.
- The stored filename is **random and generated by us** (`crypto.randomUUID()` plus the extension we decided from sniffing), so an upload can never overwrite an existing file or carry a path in its name.
- Written to `server/storage/uploads/` and served read-only at `/uploads/:file`, with `Content-Type` set from what we sniffed and `Content-Disposition: attachment` on anything unexpected.
- Rate-limited per session.

**Old and new pictures live side by side.** The photos already in the repo stay at `/images/...`; uploads land at `/uploads/...`. The image field accepts both, so nothing has to be migrated, and `validate.js` keeps limiting image values to those two prefixes or an http(s) link.

**Trap worth naming:** uploads live in `server/storage/`, which is not in git. A team photo added through the admin exists only on the office machine. Backing up means copying that folder — the repo alone is no longer the whole site. This goes in the deployment notes.

---

## Build order

0. **Foundation** — the four fixes above, plus the two small public-page ones. Tests first; they are mostly guards, so each is a test that fails loudly today.
1. **`list-of-text` and the `single` kind.** Prove both on `partners` (a bare list of strings) and `contact` (a single item with address lines). Two types done, two field types earned.
2. **Image upload** — the route, the sniffing, the `image` field with preview. Prove it on `alumni`, which has one photo per person and only five other fields.
3. **`reference` + the subteam/member split.** `subteams` and `members` as two types, the join on the public side, the Members page grouped by subteam. **This is the deliverable that matters most** — stop and use it for a pretend changeover before going on.
4. **The easy ones:** `achievements`, `stats`, `socials`, `news`, `pastTeams`.
5. **`items`**, proven on `join` (steps, waiting lists).
6. **Education:** `educationPage` as a single type, then `activityGroups` with nested activities and their points.
7. A pass over the whole admin at 390px, and a run through the quarterly changeover start to finish.

Each step leaves the site working and every earlier step still true.

## Testing

- Server, with `node:test` as in phase 1: the new field types (good and bad values for each), upload sniffing (a renamed file is refused, an SVG is refused, an oversized file is refused, two uploads never collide), the boot guards from Foundation, and validate-on-read falling back.
- The public join: a member whose subteam no longer exists must not break the team page; a subteam with no members must render.
- By hand in the browser, desktop and 390px, after each step — and for step 3, an actual pretend changeover: add two people, remove one, move one between subteams, and check `/team/<slug>` and the front page.

## Calls I made (Ethan can override)

- **Members stored as one flat list, displayed grouped.** The alternative kept them nested inside subteams, which is less work to build but makes a changeover three to six clicks per person instead of one.
- **`reference` as a real field type** rather than a free-text subteam box, so a typo can't orphan someone.
- **Image upload pulled forward** from the original phase 3 into this phase. Adding a member without being able to add their photo is the step that would annoy Ethan most, and it is the main thing this phase is for.
- **File type decided by sniffing**, not by the name or the browser's claim.
- **`navigation` and `story` stay in code.**
- **Education's two loose text blocks become a `single` type** rather than being left hard-coded.

## Answers from Ethan (2026-10-24)

1. **A leaver's photo file stays in `server/storage/uploads/`.** Nothing is deleted when a member is removed. Two entries can safely point at the same file, and an accidental removal is undoable by hand. The folder may collect unused files; tidying up is a later chore, not part of this phase.
2. **`pastTeams` members stay plain text**, one line of names per generation, exactly as they are now. No turning them into real member entries, now or as a follow-up.
3. **Missing photos are flagged in the Members list**, not warned about loudly. A small marker on the rows of people with no photo (five today), so the gaps are visible during a changeover. No banner, no blocking the save.

All open questions on this spec are answered.
