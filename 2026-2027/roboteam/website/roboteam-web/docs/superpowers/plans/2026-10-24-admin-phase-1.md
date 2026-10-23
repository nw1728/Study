# Admin Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Edit the `events` list in `/admin` and see the change on the live front page, with no rebuild — the whole admin machine proved end to end on one content type.

**Architecture:** One Express server serves the built site, a read-only public content API, and a login-protected write API. Content lives as JSON files in `server/storage/`, seeded on first start from today's `src/data/*.js`, which stay in the repo as fallback defaults so the site never goes blank. The login door is swappable: `AUTH_MODE=dev` mounts a development door now, `AUTH_MODE=google` mounts the real one on Monday 2026-10-26 with no change to anything behind it.

**Tech Stack:** Node 22+ (v25.9.0 on this machine), ESM throughout (`"type": "module"`), Express 5, Vite 8 multi-page build, React 19, CSS Modules, `node:test` runner, `node:crypto` for cookie signing. No new frontend libraries in this phase.

**Spec:** `docs/superpowers/specs/2026-10-23-admin-design.md`

## Scope

This plan covers build-order steps 1–4 of the spec, **for the `events` content type only**. That is the whole machine end to end: description file → validation → storage → API → door → public site → admin UI.

Deliberately **not** in this plan, each a later plan of its own:
- The other ten content types (one description file each, no new code)
- Image upload and the image field (spec step 5)
- History panel and restore **UI** — the history *files* are written in Task 2, only the panel is deferred (spec step 6)
- Team access page: add/remove people, change roles (spec step 7)
- Google OAuth door (spec step 8, Monday 2026-10-26)
- Caddy, systemd, office deployment (spec step 9)
- **Login rate limiting** (spec, "Protection for anything that changes data"). It belongs with the Google door: a limit on the dev door protects nothing, since the dev door never reaches production. The `Origin` check and `SameSite=Lax` **are** in this phase (Task 7).

## Global Constraints

- Node.js 22+, plain JavaScript, ESM (`import`/`export`), no TypeScript.
- One job per file, small folders, a `.module.css` beside each `.jsx` (project rule, `CLAUDE.md`).
- Colours only from `src/styles/tokens.css`. Purple **text** uses `--lavender`, never `--brand` (contrast 1.7 on dark).
- Fonts: Aldrich = headlines, Saira = body, JetBrains Mono = labels. Already loaded in `index.html`; `admin.html` must load the same three.
- `AUTH_MODE` has **no default**. Unset stops the server. `AUTH_MODE=dev` with `NODE_ENV=production` stops the server.
- `server/storage/` is never committed. It is the live data on the office machine.
- Content type ids are whitelisted against `shared/contentTypes/index.js`. A `:type` from a URL never reaches a filesystem path unchecked.
- Uploads: no SVG (can carry scripts). Not in this phase, but the rule stands.
- `npm run lint` (oxlint) and `npm run build` must pass before any task is called done.

## Review Focus

Five things the spec implies but no task's own tests would otherwise exercise. Each has its test pinned to the task that owns the code.

1. **`:type` from the URL as a file path.** `PUT /api/content/..%2F..%2Fusers` must be refused before it touches disk — whitelist against `contentTypes`, never `path.join` a raw param. → Task 7.
2. **Server down or unreachable.** The public site must show the `src/data` defaults, not a blank page or a spinner forever. → Task 8.
3. **Corrupt or hand-edited JSON in `server/storage/`.** `ContentStore.read` must not crash the server; a bad file reads as the built-in default and is reported, not thrown. → Task 2.
4. **A tampered, truncated or expired session cookie.** Must be refused as "not logged in", never crash the signature check. → Task 5.
5. **Two people saving the same type at once.** Last write silently wins today. Phase 1 must at least not interleave two writes into one corrupt file — the atomic temp-and-rename in Task 2 covers the file; the lost-update warning goes in the admin as "last saved by X at HH:MM" so a clobber is visible. → Task 2 and Task 10.

---

### Task 1: Content type description and validation

**Files:**
- Create: `shared/contentTypes/events.js`, `shared/contentTypes/index.js`
- Create: `server/content/validate.js`
- Test: `server/content/validate.test.js`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `shared/contentTypes/index.js` → `export const contentTypes` (object keyed by id), `export function getContentType(id)` → the description or `undefined`, `export const contentTypeIds` (array of strings).
  - A description: `{ id, label, kind: 'list' | 'single', itemLabel: (item) => string, fields: Field[] }`.
  - A field: `{ name, label, type, required?, max?, min?, options?, placeholder?, generated? }`. Types in this phase: `text`, `textarea`, `number`, `select`, `url`.
  - `server/content/validate.js` → `export function validateContent(typeId, value)` → `{ ok: true, value }` or `{ ok: false, errors }`, where each error is `{ index, field, message }` and `index` is `null` for whole-list errors.

- [ ] **Step 1: Write the failing tests**

```js
// server/content/validate.test.js
test('accepts the current events data', …)            // the two real items from src/data/events.js
test('rejects a missing required title', …)           // errors[0] == { index: 0, field: 'title', message: /required/ }
test('rejects a day outside 1–31', …)                 // day: 32 → field 'day'
test('rejects a month outside the twelve options', …) // month: 'OKT' → field 'month'
test('rejects a title over 80 characters', …)
test('rejects a registerUrl that is not http(s)', …)  // 'javascript:alert(1)' → field 'registerUrl'
test('rejects a duplicate id', …)                     // two items, same id → { index: 1, field: 'id' }
test('rejects a non-array for a list type', …)        // index null
test('accepts an empty list', …)                      // deleting every event is allowed
test('rejects an unknown content type', …)            // validateContent('nope', []) → ok false
test('strips fields not in the description', …)       // { title, evil: 1 } → value has no 'evil'
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test server/content/validate.test.js`
Expected: FAIL, cannot find module `./validate.js`

- [ ] **Step 3: Write `shared/contentTypes/events.js`**

`kind: 'list'`, `itemLabel: (e) => e.title`. Fields, matching today's `src/data/events.js` and its consumers (`EventCard.jsx`, `EventsPage.jsx`):

| name | type | rules |
|---|---|---|
| `id` | `text` | required, `generated: true` (slug, made by the admin from the title, unique in the list) |
| `day` | `number` | required, min 1, max 31 |
| `month` | `select` | required, options `JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC` |
| `title` | `text` | required, max 80 |
| `place` | `text` | required |
| `time` | `text` | placeholder `11:00 – 17:00` |
| `note` | `text` | — |
| `description` | `textarea` | — |
| `image` | `text` | — (becomes type `image` in the uploads phase) |
| `registerUrl` | `url` | — |

- [ ] **Step 4: Write `shared/contentTypes/index.js`**

Exports `contentTypes`, `contentTypeIds`, `getContentType(id)`. In this phase it holds `events` alone.

- [ ] **Step 5: Implement `validateContent(typeId, value)` in `server/content/validate.js`**

Unknown `typeId` → `{ ok: false }`. For `kind: 'list'`, a non-array is one whole-list error. Each item is checked field by field and **rebuilt from the description**, so unknown keys are dropped rather than stored. `url` accepts only `http:` and `https:` via `new URL()`. `id` is checked for a non-empty slug and uniqueness across the list. Collect every error; never stop at the first.

- [ ] **Step 6: Run the tests to verify they pass**

Run: `node --test server/content/validate.test.js`
Expected: PASS, 11 tests

- [ ] **Step 7: Commit**

```bash
git add shared/contentTypes server/content
git commit -m "feat(admin): content type descriptions and validation"
```

---

### Task 2: ContentStore — safe writes, history, fallback

**Files:**
- Create: `server/content/ContentStore.js`
- Test: `server/content/ContentStore.test.js`

**Interfaces:**
- Consumes: `validateContent` (Task 1), `contentTypeIds` (Task 1).
- Produces: `class ContentStore { constructor({ storageDir, defaults }) }` with
  - `async read(typeId)` → the stored value, or `defaults[typeId]` if the file is missing **or unreadable/corrupt**
  - `async write(typeId, value, author)` → `{ savedAt, savedBy }`; copies the current file into history first, then writes atomically
  - `async readAll()` → `{ [typeId]: value }` for every id in `contentTypeIds`
  - `async meta(typeId)` → `{ savedAt, savedBy } | null`
  - `async listHistory(typeId)` → `[{ version, savedAt, savedBy }]`, newest first
  - `async restore(typeId, version, author)` → same shape as `write`
  - `defaults` is injected, not imported, so tests need no `src/data`.

- [ ] **Step 1: Write the failing tests**

Each test gets a fresh `fs.mkdtemp` directory.

```js
test('read returns the default when no file exists', …)
test('read returns the default when the file is corrupt JSON', …)   // write '{oops' first; must not throw
test('write then read returns the written value', …)
test('write records savedAt and savedBy in meta', …)
test('write copies the previous version into history', …)           // listHistory length 1 after the 2nd write
test('the first write makes no history entry', …)                   // nothing to preserve yet
test('history keeps at most 30 versions', …)                        // 32 writes → listHistory length 30
test('restore brings an earlier value back', …)
test('restore itself is a write, so it is undoable', …)             // history grows
test('write leaves no temp file behind', …)
test('a failed write leaves the previous file intact', …)           // value that JSON.stringify throws on (BigInt)
test('readAll covers every known content type', …)
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test server/content/ContentStore.test.js`
Expected: FAIL, cannot find module `./ContentStore.js`

- [ ] **Step 3: Implement `ContentStore`**

Layout under `storageDir`: `content/<type>.json`, `history/<type>/<ISO timestamp with ':' replaced by '-'>_<author>.json`, and the saved-by/saved-at pair alongside the content as `content/<type>.meta.json`.

The atomic write is the part the signature does not determine: serialise first, write to `<file>.<random>.tmp` in the **same directory**, `fsync`, then `fs.rename` over the target. Rename within a directory is atomic, so a crash never leaves half a file. If serialising throws, nothing is written and the temp file is removed.

Corrupt JSON on read is caught, logged with `console.warn`, and falls back to the default — a bad file must never take the server down.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test server/content/ContentStore.test.js`
Expected: PASS, 12 tests

- [ ] **Step 5: Commit**

```bash
git add server/content
git commit -m "feat(admin): ContentStore with atomic writes and history"
```

---

### Task 3: UserStore — the access list

**Files:**
- Create: `server/users/UserStore.js`
- Test: `server/users/UserStore.test.js`

**Interfaces:**
- Consumes: nothing.
- Produces: `class UserStore { constructor({ storageDir, allowedDomain, ownerEmail }) }` with
  - `async ensureFirstOwner()` → creates `users.json` with `ownerEmail` as the single owner, only if the file does not exist
  - `async find(email)` → `{ email, role, addedBy, addedAt } | null` (email compared lower-case)
  - `async list()` → every entry
  - Phase 1 is read-only beyond `ensureFirstOwner`. Add/remove/role changes come with the Team access page.

- [ ] **Step 1: Write the failing tests**

```js
test('ensureFirstOwner creates the file with one owner', …)
test('ensureFirstOwner does not overwrite an existing list', …)   // second call keeps edits
test('find is case-insensitive', …)                               // 'E.Bastian@…' finds the owner
test('find returns null for someone not on the list', …)
test('find returns null when the list file is corrupt', …)        // must not throw
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test server/users/UserStore.test.js`
Expected: FAIL, cannot find module `./UserStore.js`

- [ ] **Step 3: Implement `UserStore`**

Stored as `storageDir/users.json`: `[{ email, role, addedBy, addedAt }]`. Emails are stored and compared lower-case.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test server/users/UserStore.test.js`
Expected: PASS, 5 tests

- [ ] **Step 5: Commit**

```bash
git add server/users
git commit -m "feat(admin): access list store"
```

---

### Task 4: Config, and the guard that refuses to boot

**Files:**
- Create: `server/config.js`, `server/.env.example`
- Modify: `.gitignore` (add `server/.env` and `server/storage/`)
- Test: `server/config.test.js`

**Interfaces:**
- Consumes: nothing.
- Produces: `export function loadConfig(env = process.env)` → a frozen object `{ port, publicUrl, authMode, allowedDomain, ownerEmail, sessionSecret, storageDir, isProduction }`. Throws an `Error` whose message names the offending setting. Taking `env` as an argument is what makes it testable without touching the real environment.

- [ ] **Step 1: Write the failing tests**

```js
test('loads a complete dev environment', …)
test('throws when AUTH_MODE is unset', …)                       // no default: /AUTH_MODE/
test('throws when AUTH_MODE is neither dev nor google', …)
test('throws when AUTH_MODE=dev and NODE_ENV=production', …)    // THE guard: /production/
test('allows AUTH_MODE=google with NODE_ENV=production', …)
test('throws when SESSION_SECRET is missing', …)
test('throws when SESSION_SECRET is shorter than 32 characters', …)
test('throws when OWNER_EMAIL is not on the allowed domain', …)
test('throws when GOOGLE_CLIENT_ID is missing and AUTH_MODE=google', …)
test('does not require the Google settings when AUTH_MODE=dev', …)
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test server/config.test.js`
Expected: FAIL, cannot find module `./config.js`

- [ ] **Step 3: Implement `loadConfig(env)`**

Reads `.env` through `node:util`'s built-in `process.loadEnvFile` when present, so `dotenv` is not needed. Every missing or malformed setting throws immediately at start rather than failing on the first request.

- [ ] **Step 4: Write `server/.env.example`** with every setting and a one-line comment each, exactly the list in the spec's Settings section plus `AUTH_MODE=dev` and `NODE_ENV=development`.

- [ ] **Step 5: Run the tests to verify they pass**

Run: `node --test server/config.test.js`
Expected: PASS, 10 tests

- [ ] **Step 6: Commit**

```bash
git add server/config.js server/config.test.js server/.env.example .gitignore
git commit -m "feat(admin): config with a boot guard against the dev door in production"
```

---

### Task 5: The session cookie

**Files:**
- Create: `server/auth/session.js`
- Test: `server/auth/session.test.js`

**Interfaces:**
- Consumes: config's `sessionSecret`, `isProduction`.
- Produces:
  - `export function createSession(res, { email, name }, config)` — sets cookie `rtt_session`, `HttpOnly`, `SameSite=Lax`, `Path=/`, `Secure` only when `config.isProduction`, `Max-Age` 8 hours
  - `export function readSession(req, config)` → `{ email, name, expiresAt } | null`
  - `export function clearSession(res, config)`
  - Cookie format: `base64url(JSON payload) + '.' + base64url(HMAC-SHA256)`. **No role in the cookie** — the role is looked up per request, so access changes take effect at once.

- [ ] **Step 1: Write the failing tests**

Fake `req`/`res` objects: `{ headers: { cookie } }` and a `res` collecting `setHeader` calls.

```js
test('a session round-trips through the cookie', …)
test('the cookie is HttpOnly, SameSite=Lax and Path=/', …)
test('Secure is set in production and absent in development', …)
test('a tampered payload is refused', …)             // flip a byte → null
test('a cookie signed with another secret is refused', …)
test('a cookie with no signature is refused', …)      // 'abc' → null, no throw
test('an empty or garbage cookie header is refused', …) // '', '...', '%%%' → null, no throw
test('an expired session is refused', …)
test('the cookie never contains the role', …)
test('clearSession expires the cookie', …)            // Max-Age=0
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test server/auth/session.test.js`
Expected: FAIL, cannot find module `./session.js`

- [ ] **Step 3: Implement `session.js`**

`crypto.createHmac('sha256', secret)`. Compare with `crypto.timingSafeEqual`, which throws on a length mismatch — guard the length first so a truncated cookie returns `null` instead of crashing. Parse the payload inside a `try`.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test server/auth/session.test.js`
Expected: PASS, 10 tests

- [ ] **Step 5: Commit**

```bash
git add server/auth
git commit -m "feat(admin): signed session cookie"
```

---

### Task 6: The swappable door, and the development one

**Files:**
- Create: `server/auth/door.js`, `server/auth/devDoor.js`, `server/auth/requireLogin.js`
- Test: `server/auth/door.test.js`

**Interfaces:**
- Consumes: `createSession`/`readSession`/`clearSession` (Task 5), `UserStore` (Task 3), config (Task 4).
- Produces:
  - `export function mountDoor(app, { config, users })` — mounts the dev door when `config.authMode === 'dev'`; on `'google'` it throws `Error('the Google door is not built yet')` until Monday's task replaces it.
  - `export function requireLogin({ users })` → Express middleware; sets `req.user = { email, name, role }` or answers `401 { error: 'not logged in' }`. **Looks the role up on every request.** A user removed from the list is refused immediately, even with a valid cookie.
  - Dev door routes: `GET /auth/dev` (a plain form: email box + owner/editor picker), `POST /auth/dev` (checks the domain and the access list, then `createSession`), `POST /auth/logout`.

- [ ] **Step 1: Write the failing tests**

Start a real app on an ephemeral port and use `fetch`.

```js
test('GET /auth/dev serves the form in dev mode', …)
test('POST /auth/dev with a team email sets a session cookie', …)
test('POST /auth/dev refuses an email off the allowed domain', …)   // gmail.com → 403, no cookie
test('POST /auth/dev refuses an email not on the access list', …)   // 403, body mentions asking an owner
test('the dev routes are absent when AUTH_MODE=google', …)          // GET /auth/dev → 404
test('requireLogin refuses a request with no cookie', …)            // 401
test('requireLogin admits a valid session', …)
test('requireLogin refuses a user removed from the list after login', …) // valid cookie, user deleted → 401
test('requireLogin re-reads the role on every request', …)          // editor → owner without a new login
test('POST /auth/logout clears the cookie', …)
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test server/auth/door.test.js`
Expected: FAIL, cannot find module `./door.js`

- [ ] **Step 3: Implement `devDoor.js`, `door.js` and `requireLogin.js`**

The dev form is plain server-rendered HTML — it is thrown away on Monday, so it gets no React and no CSS module. It must carry a visible red banner reading **"Development login — this door does not exist in production."**

`mountDoor` registers the dev routes **only** inside the `authMode === 'dev'` branch, so in `google` mode the path does not exist at all rather than existing and refusing.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `node --test server/auth/door.test.js`
Expected: PASS, 10 tests

- [ ] **Step 5: Commit**

```bash
git add server/auth
git commit -m "feat(admin): swappable login door with a development implementation"
```

---

### Task 7: The server — routes, seeding, and a running process

**Files:**
- Create: `server/app.js`, `server/index.js`, `server/routes/contentRoutes.js`, `server/content/seed.js`, `server/security/sameOrigin.js`
- Modify: `package.json` (add `express`; add the `dev:server`, `start` and `test` scripts)
- Test: `server/routes/contentRoutes.test.js`

**Interfaces:**
- Consumes: everything from Tasks 1–6.
- Produces:
  - `export function createApp({ config, store, users })` → an Express app, **not** listening. Tests make their own; `server/index.js` is the only place that calls `listen`.
  - `export async function loadDefaults()` in `seed.js` → `{ events: [...] }` by importing `src/data/*.js`, used as `ContentStore`'s `defaults`.
  - `export function sameOrigin(config)` → middleware refusing a changing request whose `Origin` is not `config.publicUrl` (`403`).
  - Routes this phase: `GET /api/content`, `GET /api/content/:type`, `PUT /api/content/:type`, `GET /api/me`.
  - `GET /api/me` → `{ user: { email, name, role } | null, authMode }`. The `authMode` is what lets the admin's login screen label its own button without knowing which door is mounted.

- [ ] **Step 1: Write the failing tests**

```js
test('GET /api/content returns every type', …)                      // no login needed
test('GET /api/content/events returns the seeded events', …)        // matches src/data on a fresh storage dir
test('PUT /api/content/events without a cookie is refused', …)      // 401, file unchanged on disk
test('PUT /api/content/events with a session saves and shows up in GET', …)
test('PUT with a missing title answers 422 with field errors', …)   // body.errors[0].field === 'title'
test('PUT with an unknown type answers 404', …)
test('PUT /api/content/..%2F..%2Fusers does not escape the content folder', …) // 404; users.json untouched
test('PUT with a cross-site Origin is refused', …)                  // 403
test('PUT records the logged-in user as savedBy', …)
test('GET /api/me reports nobody when logged out, and the role when logged in', …)
test('GET /api/me reports the active authMode', …)   // 'dev' here; the login screen reads it
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `node --test server/routes/contentRoutes.test.js`
Expected: FAIL, cannot find module `../app.js`

- [ ] **Step 3: Install Express and implement the routes**

```bash
npm install express
```

Every route resolves `:type` through `getContentType(req.params.type)` and answers `404` when it is unknown — **the type id never reaches `path.join` unchecked**. `PUT` runs `validateContent` first and answers `422 { errors }` on failure, so a bad save can never reach disk.

- [ ] **Step 4: Write `server/index.js`**

Loads config (which may throw and stop the process), seeds, calls `users.ensureFirstOwner()`, then listens. In `dev` auth mode it prints a banner naming the mode. In production it serves `dist/` with an SPA fallback: every unmatched GET answers `index.html`, except paths starting `/api`, `/auth` or `/uploads`, and `/admin` answers `admin.html`.

- [ ] **Step 5: Add the scripts to `package.json`**

`"dev:server": "node --watch server/index.js"`, `"start": "NODE_ENV=production node server/index.js"`, `"test": "node --test server/"`.

- [ ] **Step 6: Run the whole server suite**

Run: `npm test`
Expected: PASS, all suites from Tasks 1–7

- [ ] **Step 7: Commit**

```bash
git add server package.json package-lock.json
git commit -m "feat(admin): content API behind the login door"
```

---

### Task 8: The public site reads from the API

**Files:**
- Create: `src/content/ContentProvider.jsx`, `src/content/useContent.js`
- Modify: `src/main.jsx`, `src/sections/Events/Events.jsx:5`, `src/pages/Events/EventsPage.jsx:5`, `vite.config.js`
- Test: by hand in the browser (this is React with no test setup in the project today; adding one is out of scope for this phase)

**Interfaces:**
- Consumes: `GET /api/content`.
- Produces:
  - `<ContentProvider>` — fetches `/api/content` **once** on mount, holds `{ content, loaded }`
  - `export function useContent(typeId)` → the live list, or the imported `src/data` default until the fetch lands or if it fails. **It never returns `undefined`**, so no section needs a loading branch.
  - Defaults are imported statically from `src/data/*.js`, keeping them in the bundle as the fallback.

- [ ] **Step 1: Add the dev proxy to `vite.config.js`**

`server.proxy` sends `/api`, `/auth` and `/uploads` to `http://localhost:3000`, so `npm run dev` on :5173 talks to the server on :3000.

- [ ] **Step 2: Implement `ContentProvider.jsx` and `useContent.js`**

The fetch failing is the **expected** path when nobody started the server — catch it, keep the defaults, and do not log an error louder than `console.info`.

- [ ] **Step 3: Wrap the app**

In `src/main.jsx`, put `<ContentProvider>` inside `<BrowserRouter>` and around `<App />`.

- [ ] **Step 4: Switch the two Events consumers**

Replace `import { events } from '../../data/events.js'` with `const events = useContent('events')` in both files. Nothing else in either file changes.

- [ ] **Step 5: Verify the site is unchanged with the server off**

Run `npm run dev` alone. Check `/` and `/events` at 1440px and at 390px. Expected: identical to before, no console errors beyond React DevTools.

- [ ] **Step 6: Verify the site follows the server with it on**

Run `npm run dev:server` too. Edit `server/storage/content/events.json` by hand, reload: the front page and `/events` show the change. Stop the server, reload: the page falls back to the `src/data` defaults and still renders.

- [ ] **Step 7: Lint, build, commit**

```bash
npm run lint && npm run build
git add src/content src/main.jsx src/sections/Events src/pages/Events vite.config.js
git commit -m "feat(admin): public site reads content from the API with defaults as fallback"
```

---

### Task 9: The admin shell and the login screen

**Files:**
- Create: `admin.html`, `src/admin/main.jsx`, `src/admin/AdminApp.jsx`, `src/admin/api.js`, `src/admin/LoginScreen.jsx`, `src/admin/NoAccessScreen.jsx`, and a `.module.css` beside each component
- Modify: `vite.config.js` (multi-page input)

**Interfaces:**
- Consumes: `GET /api/me`, `POST /auth/logout`, the dev door at `GET /auth/dev`.
- Produces: `src/admin/api.js` as the one place that talks to the server —
  `getMe()`, `getContent(typeId)`, `putContent(typeId, value)`, `logout()`.
  `putContent` resolves `{ ok: true, savedAt, savedBy }` or `{ ok: false, errors }` on a 422, and throws only on a network failure.

- [ ] **Step 1: Add the multi-page build to `vite.config.js`**

`build.rollupOptions.input` = `{ main: 'index.html', admin: 'admin.html' }`. In dev the admin is at `http://localhost:5173/admin.html`; in production the server maps `/admin` to it.

- [ ] **Step 2: Write `admin.html`**

A copy of `index.html`'s head — same three Google Fonts, same favicons, same theme-before-paint script — with `<title>RoboTeam Twente · Admin</title>` and `src/admin/main.jsx` as the module.

- [ ] **Step 3: Implement `api.js`, `AdminApp.jsx`, `LoginScreen.jsx`, `NoAccessScreen.jsx`**

`AdminApp` calls `getMe()` on mount and shows one of three things: `LoginScreen` when nobody is logged in, `NoAccessScreen` when the server said the account has no access, or the editor when someone is.

`LoginScreen` is one button. Its label and target come from the `authMode` that `/api/me` reports (Task 7): "Continue (development login)" → `/auth/dev`, or "Sign in with Google" → `/auth/google`. **Only the button's label and href change on Monday**, and both come from the server.

`NoAccessScreen` reads "This account doesn't have access yet. Ask an owner to add you," with a "Try another account" button that logs out.

- [ ] **Step 4: Verify in the browser**

With both servers running, open `http://localhost:5173/admin.html`. Expected: the login screen in the site's own style, the dev door's red banner on `/auth/dev`, and a return to the admin as a logged-in user.

- [ ] **Step 5: Lint, build, commit**

```bash
npm run lint && npm run build
git add admin.html src/admin vite.config.js
git commit -m "feat(admin): admin shell and login screen"
```

---

### Task 10: The events editor

**Files:**
- Create: `src/admin/Sidebar.jsx`, `src/admin/ContentEditor.jsx`, `src/admin/editors/ListEditor.jsx`, `src/admin/editors/ItemForm.jsx`, `src/admin/editors/fields/TextField.jsx`, `NumberField.jsx`, `SelectField.jsx`, `TextareaField.jsx`, and a `.module.css` beside each
- Modify: `src/admin/AdminApp.jsx`

**Interfaces:**
- Consumes: `contentTypes` (Task 1), `api.js` (Task 9).
- Produces: forms built **from the description file**, so the other ten content types need no new component.
  - `<ListEditor type={description} value={items} onChange={fn} errors={errors} />`
  - `<ItemForm type={description} item={item} onChange={fn} errors={errorsForThisItem} />`
  - Each field component takes `{ field, value, error, onChange }`.

- [ ] **Step 1: Build the sidebar and the editor frame**

One entry per content type (only Events in this phase), a dot marking unsaved changes, and a "View site ↗" link at the bottom. The header shows the signed-in email, a logout control, and `Last saved by … · 23 Oct 15:20` from the meta — this is what makes a colleague's save visible (Review Focus 5).

- [ ] **Step 2: Build `ListEditor`**

Items fold open and closed, showing `itemLabel(item)` when closed. Add, remove (with a confirm), and reorder with **up/down buttons** — keyboard-reachable, and no drag-and-drop library in this phase. A new item gets its `id` slugged from the title on save, made unique in the list, because `id` is a `generated` field and never gets a form box.

- [ ] **Step 3: Build `ItemForm` and the four field components**

`ItemForm` reads `description.fields` and renders one component per `type`, skipping `generated` fields. A field with an `error` shows the server's message beneath it and gets `aria-invalid`.

- [ ] **Step 4: Wire save and errors**

Save sends the whole list. A `422` paints each error next to its field and the save does not clear the unsaved-changes dot. Leaving with unsaved changes asks first (`beforeunload`).

- [ ] **Step 5: Verify the whole loop end to end**

With both servers running: change an event title in the admin, save, then reload the front page and `/events` — the new title is there, with no rebuild. Then try a save with the title emptied: expected `422`, the message under the Title box, and `server/storage/content/events.json` unchanged on disk.

- [ ] **Step 6: Check the admin at 1440px and at 390px**

The spec calls phones a bonus, not a requirement — but it must not be broken enough to be unusable, and there must be no sideways scroll.

- [ ] **Step 7: Lint, build, commit**

```bash
npm run lint && npm run build
git add src/admin
git commit -m "feat(admin): events editor with validation errors"
```

---

## Done when

- `npm test` passes every server suite.
- `npm run lint` and `npm run build` pass.
- Editing an event in `/admin` changes `/` and `/events` with no rebuild.
- Stopping the server leaves the public site working on the `src/data` defaults.
- `AUTH_MODE=dev NODE_ENV=production node server/index.js` **refuses to start**.
- `AUTH_MODE=google` makes `/auth/dev` a 404.

## Monday, when the OAuth client exists

Only this changes: write `server/auth/google.js` with `openid-client`, add the `google` branch in `mountDoor`, fill four values in `server/.env`, set `AUTH_MODE=google`. The admin page, the editors, the API, the storage and the access list are untouched. The redirect URIs to give the team manager are `http://localhost:3000/auth/google/callback` and `https://<site domain>/auth/google/callback`, and the consent screen must be **Internal**.
