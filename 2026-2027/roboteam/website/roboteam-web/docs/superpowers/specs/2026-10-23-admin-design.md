# Admin mode: design

Date: 2026-10-23
Status: draft, waiting for Ethan's approval

## Intent

Team members should be able to change the website's content (events, partners, subteams, news, results and so on) **without touching code**. They log in with their own `@roboteamtwente.nl` Google account, edit through simple forms, and the live site updates.

**Access is by invitation only** (Ethan's decision). Having a team account isn't enough: you must also be on the access list. At the start the list holds only `e.bastian@roboteamtwente.nl` (Ethan), who can add other people. **There is no password login anywhere.** Google login is the only way in.

The site will run on **a small server in the RoboTeam office** (Ethan's decision). Login uses **OAuth2 with the team's Google Workspace accounts** (Ethan's decision). The domain's mail runs on Google (MX records point to `aspmx.l.google.com`), so this means "Sign in with Google", limited to the `roboteamtwente.nl` domain.

## Goals

1. `/admin`: a login page with one button, "Sign in with Google". Only verified `@roboteamtwente.nl` accounts **that are on the access list** get in.
2. An editor for every content list that lives in `src/data/` today: add, edit, remove and reorder items, then save.
3. Image upload for things that have pictures (news, alumni, later partner logos).
4. Saved changes show on the public site right away, with no rebuild or redeploy.
5. Every save records **who** changed it and **when**, and earlier versions can be restored (an undo for mistakes).
6. A **Team access** page where owners add or remove people. There are two roles: **owner** (edits content and manages access) and **editor** (edits content).
7. The same "one job per file" structure as the rest of the project.

## Non-goals (for now)

- Editing text that's written inside components (About, Statement, Join). That comes in a later phase, by moving that text into data files first.
- Finer permissions (e.g. "may only edit events"). There are just two roles: owner and editor.
- Rich text or markdown editing. Fields are plain text.
- Drafts or scheduled publishing. Save means live.
- A mobile-first admin. It must work on a laptop; phones are a bonus.

## Anti-goals (it fails if…)

- Someone who isn't on the access list can log in, even with a valid team account, or anyone can change content without logging in.
- Any password-based login exists. Google is the only way in.
- The access list can end up with no owner, locking everyone out of user management.
- One bad save can break the public site. Content is checked before it's saved, and the site falls back to built-in defaults if content can't load.
- The code becomes a big tangle. Adding a new kind of content should mean writing **one small description file**, not new forms and new API routes.

## Constraints

- Node.js (22 is installed), plain JavaScript, same style as the frontend.
- It runs on one small office machine: no external database server and no cloud services beyond Google login.
- Google only allows OAuth redirect addresses on **https**, or on `localhost` for development. The production site therefore needs HTTPS.

---

## How it fits together

```
 Visitor ──► office server ──► public site (built Vite files)
                 │                 └─ fetches  GET /api/content  (public, read-only)
                 │
 Team member ──► /admin ──► "Sign in with Google" ──► Google (roboteamtwente.nl only)
                 │                                         │
                 │◄──────────── back with proof of who ◄───┘
                 │   server checks: email verified + domain = roboteamtwente.nl
                 │   sets a login cookie (8 hours)
                 └─ admin page edits ──► PUT /api/content/:type  (login required)
                                        ──► saved as JSON file + history copy
```

**Status (2026-10-23): on hold. The sub-pages were built first.** The server must answer every page address (`/join`, `/team/:slug`, …) with `index.html` so the React router can show the right page.

**One server process** does everything: serves the built site, the admin page, the API and the Google login. In the office it sits behind **Caddy**, a small web server that gets HTTPS certificates automatically.

### Where content is stored

Content is stored as **plain JSON files, one per content type**: `server/storage/content/events.json`, `partners.json`, and so on.
- At this size (a dozen short lists) a database would only add complexity. JSON files are readable, easy to back up (copy the folder), and match the one-file-per-thing rule.
- Each save first copies the current file to `server/storage/history/events/2026-10-23T15-20-01_ethan.json` (the last 30 versions are kept), then writes the new file safely (write to a temp file, then rename, so a crash never leaves half a file).
- Uploaded images go to `server/storage/uploads/`, with random filenames.
- `server/storage/` is **not** in git. It's the live data on the office machine.
- On the very first start, the server fills `content/` from the current `src/data/*.js` files, so nothing is lost.

### Content types: described once, used twice

Every editable list gets **one description file** in `shared/contentTypes/`:

```js
// shared/contentTypes/events.js
export default {
  id: 'events',
  label: 'Events',
  kind: 'list', // a list of items ('list') or a single item ('single', e.g. contact)
  itemLabel: (event) => event.title,
  fields: [
    { name: 'day', label: 'Day', type: 'number', required: true, min: 1, max: 31 },
    { name: 'month', label: 'Month', type: 'select', options: ['JAN', 'FEB', /* … */ 'DEC'], required: true },
    { name: 'title', label: 'Title', type: 'text', required: true, max: 80 },
    { name: 'place', label: 'Place', type: 'text', required: true },
    { name: 'time', label: 'Time', type: 'text', placeholder: '11:00' },
    { name: 'note', label: 'Extra note', type: 'text' },
  ],
}
```

- The **server** reads these to check every save (required fields, lengths, number ranges, allowed options, image paths), and rejects anything else.
- The **admin page** reads the same files to build the forms automatically.
- Adding a new kind of content = add one description file + use it on the site. No new routes, no new form code.

Field types: `text`, `textarea`, `number`, `select`, `url`, `email`, `image`, `list-of-text` (e.g. the address lines).

Content types for phase 1 (matching today's `src/data/`): `events`, `partners`, `subteams`, `achievements`, `stats`, `news`, `alumni`, `contact`, `socials`, `story-phases`, `mission-log`. `navigation` stays in code, because it's tied to the sections.

---

## Login: Google OAuth2 (OpenID Connect)

- Library: **`openid-client`**, the certified standard library for this. We don't write the protocol by hand.
- Flow: authorization code with PKCE.
  1. `GET /auth/google` creates a random `state` and code verifier (kept in a short-lived cookie) and redirects to Google with `hd=roboteamtwente.nl`, which pre-selects the team domain on Google's screen.
  2. `GET /auth/google/callback` exchanges the code with Google and checks the ID token. Then **the server itself checks** `email_verified === true` **and** `hd === 'roboteamtwente.nl'`. The `hd` hint in step 1 is only cosmetic, so this check is the real lock.
  3. **The access list check:** the email must be in `server/storage/users.json`. Otherwise the login is refused with "Ask an owner to give you access", and no cookie is set.
  4. It sets a session cookie: signed with `SESSION_SECRET`, `HttpOnly`, `Secure`, `SameSite=Lax`, expires after 8 hours. The cookie holds only the email, name and expiry. **The role is looked up again on every request**, so removing someone or changing their role takes effect immediately, not after 8 hours.
- `POST /auth/logout` clears the cookie. `GET /api/me` tells the admin page who's logged in.
- **Google Cloud setup (one time):** create an OAuth client in Google Cloud Console under the RoboTeam Workspace and set the consent screen to **"Internal"**. Then Google itself only lets accounts from the organisation sign in, which is a second lock on top of the server check. The redirect URIs are `http://localhost:3000/auth/google/callback` (development) and `https://<site domain>/auth/google/callback` (office).

## Access list

- Stored in `server/storage/users.json`: `[{ email, role: 'owner' | 'editor', addedBy, addedAt }]`.
- **First start:** if the file doesn't exist, the server creates it with one owner, read from `OWNER_EMAIL` in the config (`e.bastian@roboteamtwente.nl`).
- Owners can:
  - **add** people by email (must end in `@roboteamtwente.nl`)
  - **change** someone's role
  - **remove** someone
- Safety rules, enforced by the server (not just hidden buttons):
  - You can't remove yourself or demote yourself. Another owner has to do it.
  - The last owner can't be removed or demoted.
- Every change to the list is logged in `server/storage/history/users/`, recording who, what and when.
- Added people don't need to do anything special. Next time they click "Sign in with Google", they get in.

## API

| Method | Path | Login | What |
|---|---|---|---|
| GET | `/api/content` | no | All content in one go (small; the public site needs it all) |
| GET | `/api/content/:type` | no | One content type |
| PUT | `/api/content/:type` | **yes** | Replace a type's content (checked against its description) |
| GET | `/api/content/:type/history` | **yes** | List of earlier versions (when, who) |
| POST | `/api/content/:type/restore/:version` | **yes** | Bring an earlier version back |
| POST | `/api/uploads` | **yes** | Upload one image (jpg/png/webp, max 5 MB; **no SVG**, since SVG can carry scripts) |
| GET | `/uploads/:file` | no | Uploaded images |
| GET | `/auth/google`, `/auth/google/callback` | no | Login flow |
| POST | `/auth/logout` | no | Log out |
| GET | `/api/me` | no | Who's logged in, and their role (or nobody) |
| GET | `/api/users` | **owner** | The access list |
| POST | `/api/users` | **owner** | Add a person `{ email, role }` |
| PATCH | `/api/users/:email` | **owner** | Change a role |
| DELETE | `/api/users/:email` | **owner** | Remove a person |

Protection for anything that changes data:
- It needs the login cookie.
- The request must be JSON (or a multipart upload).
- The `Origin` header must match the site. Together with `SameSite=Lax`, this blocks cross-site form tricks (CSRF).
- Simple rate limits: login attempts and uploads per minute.

---

## The public site: reading content

- New hook `src/content/useContent.js`: `const events = useContent('events')`.
- On page load the site fetches `/api/content` once and shares it with every section.
- **Fallback:** the current `src/data/*.js` files stay in the repo as built-in defaults. If the API can't be reached, the site shows those, so it never goes blank. This also means `npm run dev` works without the server running.
- Sections change from `import { events } from '../../data/events.js'` to `useContent('events')`. It's a small change per section.

## The admin page

A **separate page** (`admin.html` → `src/admin/`), so normal visitors never download admin code. Vite builds it next to the main site. Same look: dark, purple accents, Aldrich and Saira fonts, light/dark toggle.

```
┌───────────────────────────────────────────────────────────────┐
│ RoboTeam Twente · admin          ethan@roboteamtwente.nl  ⎋  │
├──────────────┬────────────────────────────────────────────────┤
│ Events     ● │  Events                        [History] [Save]│
│ Partners     │  ┌──────────────────────────────────────────┐  │
│ Subteams     │  │ ⠿ Science Day TU Delft          ▾  ✕     │  │
│ Results      │  │   Day [25]  Month [OCT ▾]               │  │
│ News         │  │   Title [Science Day TU Delft        ]  │  │
│ Alumni       │  │   Place [TU Delft Science Centre     ]  │  │
│ Stats        │  ├──────────────────────────────────────────┤  │
│ Story        │  │ ⠿ Space Tech Expo Bremen        ▸  ✕     │  │
│ Mission log  │  └──────────────────────────────────────────┘  │
│ Contact      │  [+ Add event]                                 │
│ Socials      │  Last saved by ethan@… · 23 Oct 15:20          │
├──────────────┴────────────────────────────────────────────────┤
│ View site ↗                                                   │
└───────────────────────────────────────────────────────────────┘
```

- **Sidebar:** one entry per content type. A dot marks unsaved changes.
- **List editor:** items fold open and closed. Drag the handle ⠿ to reorder (or use up/down buttons, so it works with a keyboard too). ✕ removes an item, after a confirm.
- **Save** sends the whole list. Errors from the server show next to the right field.
- **Leaving with unsaved changes** asks first.
- **History:** a side panel listing earlier versions (when and who), each with a Restore button.
- **Image field:** shows a preview, with buttons to upload or replace. It stores the `/uploads/…` path.
- **Team access** (only shown to owners, at the bottom of the sidebar): a table of email · role · added by · remove. Above it is an "Add person" row with an email box (`…@roboteamtwente.nl`) and a role picker.
- **Refused login:** a page saying "This account doesn't have access yet. Ask an owner to add you", plus a "Try another account" button.

---

## Files (one job per file)

```
roboteam-web/
├── admin.html                      Entry page for the admin app
├── shared/contentTypes/            ONE file per content type (fields, labels)
│   ├── index.js                    The list of all types
│   ├── events.js  partners.js  subteams.js  achievements.js  stats.js  news.js
│   └── alumni.js  contact.js  socials.js  storyPhases.js  missionLog.js
├── server/
│   ├── index.js                    Starts the server
│   ├── app.js                      Wires routes and middleware together
│   ├── config.js                   Reads settings from .env, refuses to start if any are missing
│   ├── .env.example                Every setting with an explanation
│   ├── auth/
│   │   ├── google.js               Google OpenID Connect client
│   │   ├── session.js              Signed login cookie: create / read / clear
│   │   ├── requireLogin.js         Blocks requests without a valid login (re-checks the access list)
│   │   └── requireOwner.js         Blocks non-owners (for Team access)
│   ├── users/
│   │   └── UserStore.js            Access list: read, add, change role, remove, safety rules (a class)
│   ├── content/
│   │   ├── ContentStore.js         Read/write JSON files, history, restore (a class)
│   │   ├── validate.js             Checks content against its description file
│   │   └── seed.js                 First start: copy src/data defaults into storage
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── contentRoutes.js
│   │   ├── uploadRoutes.js
│   │   └── userRoutes.js
│   ├── security/
│   │   ├── sameOrigin.js           Origin check for changes (CSRF)
│   │   └── rateLimit.js
│   └── storage/                    (not in git) content/, history/, uploads/
├── src/
│   ├── content/
│   │   ├── ContentProvider.jsx     Fetches /api/content once, shares it
│   │   └── useContent.js           useContent('events') → the list (or the default)
│   └── admin/
│       ├── main.jsx  AdminApp.jsx
│       ├── api.js                  All calls to the server in one place
│       ├── LoginScreen.jsx
│       ├── Sidebar.jsx
│       ├── ContentEditor.jsx       Title bar, save, unsaved-changes handling
│       ├── HistoryPanel.jsx
│       ├── TeamAccessPage.jsx      Owners only: add / remove people, change roles
│       ├── NoAccessScreen.jsx      "Ask an owner to add you"
│       ├── editors/
│       │   ├── ListEditor.jsx      Add / remove / reorder / fold items
│       │   ├── ItemForm.jsx        One item's fields, from the description file
│       │   └── fields/             One file per field type
│       │       TextField.jsx  NumberField.jsx  SelectField.jsx  ImageField.jsx  TextListField.jsx
│       └── admin.module.css …
└── deploy/
    ├── Caddyfile                   HTTPS + forwards to the Node server
    ├── roboteam-web.service        systemd: start on boot, restart on crash
    └── README.md                   Step-by-step setup on the office machine
```

**New packages:**
- Server: `express`, `openid-client`, `multer` (uploads), `dotenv`. The session cookie is signed with Node's built-in crypto, so no package is needed for that.
- Admin page: `@dnd-kit/sortable` (drag to reorder).

**Scripts:**
- `npm run dev`: the site and admin with Vite, with `/api`, `/auth` and `/uploads` forwarded to the server.
- `npm run dev:server`: the server, restarting on file changes.
- `npm start`: production (the server serves the built `dist/`).

## Settings (`server/.env`)

```
PORT=3000
PUBLIC_URL=https://roboteamtwente.nl         # used for the Google redirect and the Origin check
GOOGLE_CLIENT_ID=…
GOOGLE_CLIENT_SECRET=…
ALLOWED_DOMAIN=roboteamtwente.nl
OWNER_EMAIL=e.bastian@roboteamtwente.nl       # first owner, only used when the access list doesn't exist yet
SESSION_SECRET=…                              # long random string
STORAGE_DIR=./server/storage
```

## Build order

1. `shared/contentTypes/` + `ContentStore` + `validate`, with tests for validation and safe writing.
2. Server API (read and write), with the login check stubbed out. Seed from `src/data`.
3. Public site switches to `useContent()` with fallbacks. The site must look exactly the same as before.
4. Google login (needs the OAuth client from Google Cloud).
5. Admin page: login screen → sidebar → list editor → fields → save → errors.
6. Images: upload route and the image field.
7. History and restore.
8. Team access: UserStore + routes + the Team access page.
9. Deployment files plus a step-by-step guide for the office machine.

## Testing

- **Server:** the built-in `node:test` runner (no extra package). Covers validation (good and bad items for each type), ContentStore (safe write, history trimming, restore), login checks (wrong domain, unverified email, not on the list, no cookie → refused), and UserStore rules (can't remove yourself, can't remove the last owner, only domain emails can be added, removing someone locks them out immediately).
- **Manually in the browser:** log in with a team account, edit an event, check it on the site. Try a non-team Google account (must be refused), a team account that isn't on the list (must be refused), and a save with a missing title (must show an error).

## Calls I made (Ethan can override)

- **JSON files instead of a database.**
- **Express** for the server, because it's the best-known Node server, so it's easiest for future team members.
- **Two roles,** owner and editor. Ethan starts as the only owner.
- **Roles are checked on every request,** so access changes apply immediately.
- **Login lasts 8 hours.**
- **Saving publishes immediately,** with no drafts. History and restore are the safety net.
- **The admin is a separate page** at `/admin`, not part of the public page's code.
- **Caddy** for HTTPS in the office.
- **No SVG uploads.**

## Open questions (Ethan / team)

1. **Public access and HTTPS:** will `roboteamtwente.nl` point to the office server, and can it be reached from outside, through port forwarding or a tunnel like Cloudflare Tunnel? Who manages the domain's DNS? Building and testing work on `localhost` without this; going live needs it.
2. **Google Cloud access:** can someone with RoboTeam Workspace access create the OAuth client? It's a 10-minute task, and I'll write the steps.
3. **Replacing the current site:** the current roboteamtwente.nl also has an admin and an API. This plan replaces both. Is that okay, or does anything on the old one need to keep working (events registration, news articles at `/news/3`, and so on)?
