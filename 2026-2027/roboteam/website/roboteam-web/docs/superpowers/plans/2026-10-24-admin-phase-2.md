# Admin Phase 2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Put the whole website behind the admin — members, education and every remaining content type — with real image upload, so a quarterly team changeover needs no developer.

**Architecture:** Phase 1's machine stays exactly as it is: one description file per content type in `shared/contentTypes/`, validated server-side, stored as JSON, read by the public site through `useContent`. This phase widens it in four ways — new field types (`list-of-text`, `items`, `image`, `reference`), two new kinds beside `list` (`single`, `textList`), an upload route, and one generic grouping feature in `ListEditor` — and then adds the description files. Members come out of `subteams` into their own flat type, rejoined on the public side in one place.

**Tech Stack:** Node 22 + Express 5, `node:test`, React 19 + Vite 8, CSS Modules, plain JavaScript. One new dependency: `multer` (file upload parsing).

**Spec:** `docs/superpowers/specs/2026-10-24-admin-phase-2-design.md`

## Global Constraints

- **One object per file.** A component is a folder-mate of its own `.module.css`; logic is a plain `.js` module. No file does two jobs.
- **Content lives in `src/data/*.js`** and is the single source of the built-in defaults. Never duplicate default content into a second file.
- **Adding a content type must stay one description file** in `shared/contentTypes/` plus its data file. Nothing else may need editing.
- **Colours only from `src/styles/tokens.css`.** For purple text use `--lavender`, never `--brand`.
- **The public site must look exactly as it does today.** This phase changes who can edit, not what a visitor sees.
- **Uploads:** jpg, png, webp only, decided by sniffing the file's first bytes; no SVG; max 5 MB; stored filename is `crypto.randomUUID()` + the extension we decided ourselves.
- **Image values stay limited** to `/images/`, `/uploads/` or an `http(s)` link (`validate.js`).
- **No drag-and-drop reordering.** Up/down buttons, which work with a keyboard.
- **Plain text fields only.** No rich text, no markdown.
- `npm run lint`, `npm test` and `npm run build` must all pass at the end of every task.

## Review Focus

Five things the spec implies, that no obvious happy-path test covers, and that would bite a real editor. Each has a test in the task that owns the code.

1. **A member pointing at a subteam that no longer exists** must still render the team pages (the subteam was renamed or deleted while they were in it) — Task 9.
2. **A subteam with no members at all** must render `/team/<slug>` rather than crashing on `members.length` — Task 9.
3. **An upload whose name says `.jpg` but whose bytes are something else** must be refused, and two uploads of the same file must never land on the same path — Task 7.
4. **A `list-of-text` with blank rows in the middle** (an editor added three rows and filled two) must save without storing empty strings — Task 6.
5. **A stored content file whose JSON is valid but whose shape is wrong** (`{}` where a list belongs) must fall back to the defaults and never blank the site — Task 4.

---

## Where this stands (2026-10-24)

**Tasks 1–10 are built and committed on `main`;** tasks 11, 12 and 13 are not started.
At the last commit: `npm test` 147 pass, `npm run lint` clean, `npm run build` clean.

What changed from the plan as written, and why:

- **`partners` is a list of items, not a bare list of strings.** Ethan asked mid-build for a logo
  and a website link per partner, so it became `{ id, name, logo, url }`. A cell shows the logo
  when there is one and the name when there isn't. No logo files are in the repo — they are
  uploaded. Because nothing else needed it, the **`textList` kind was dropped**: the
  `list-of-text` *field* (address lines, bullet points, member names) is what survives, and
  `single` is proven on `contact`.
- **`list-of-text` takes `of: 'text' | 'image'`,** so a newsletter's pages are uploaded rather
  than typed.
- **`ListItem.jsx` was split out of `ListEditor`** — a component declared inside another is a new
  type on every render, and the box you are typing in loses focus.
- **Served uploads also carry `nosniff`, a sandbox CSP and `Content-Disposition`** after a
  security review flagged polyglot files (valid picture and valid HTML at once).
- **`npm test` now covers `shared/` and `src/` too**, not only `server/`.

Pick up at Task 11.

---

## File Structure

**New shared files**
- `shared/contentDefaults.js` — the one defaults map, imported by both sides.
- `shared/contentTypes/*.js` — one description per type: `partners`, `contact`, `alumni`, `subteams`, `members`, `achievements`, `stats`, `socials`, `news`, `pastTeams`, `join`, `positions`, `educationPage`, `activityGroups`.

**New server files**
- `server/content/fieldTypes.js` — one check/clean pair per field type. The registry `validate.js` consults.
- `server/content/shape.js` — the cheap shape test used when reading a file.
- `server/uploads/sniffImage.js` — magic-byte sniffing.
- `server/uploads/UploadStore.js` — writes an accepted buffer under a generated name.
- `server/routes/uploadRoutes.js` — `POST /api/uploads`, plus serving `/uploads/:file`.

**New admin files**
- `src/admin/editors/fields/ImageField.jsx` + `TextListField.jsx` + `ReferenceField.jsx` + `ItemsField.jsx`
- `src/admin/useReferenceOptions.js` — fetches the types a description refers to.
- `src/admin/editors/grouping.js` — group order and in-group moves for `ListEditor`.

**New public files**
- `src/content/useMembers.js` — the subteam/member join, in one place.
- `src/components/ErrorBoundary/ErrorBoundary.jsx` + `.module.css`
- `src/data/members.js` — the flat member list.

**Modified**
- `server/config.js` (dev door lock), `server/content/validate.js` (registry), `server/content/ContentStore.js` (validate on read), `server/content/seed.js` + `src/content/defaults.js` (become shims over `shared/contentDefaults.js`), `server/app.js` + `server/index.js` (upload routes), `src/admin/ContentEditor.jsx` (kinds + refs), `src/admin/editors/ListEditor.jsx` (grouping, flags), `src/admin/editors/ItemForm.jsx` (new field components), `src/data/subteams.js` (members removed), `src/data/education.js` + `src/data/join.js` (shape), and the public pages that read those.

---

## ✅ Task 1 (done): One defaults map, checked at boot

The defaults are hand-maintained in `server/content/seed.js` and `src/content/defaults.js`. Forget one and a new type has no fallback, which is the blank site of Foundation fix 3.

**Files:**
- Create: `shared/contentDefaults.js`, `shared/contentDefaults.test.js`
- Modify: `server/content/seed.js`, `src/content/defaults.js`

**Interfaces:**
- Produces: `contentDefaults` (object keyed by type id), `assertDefaultsComplete(defaults)` (throws naming the missing ids). `loadDefaults()` keeps its current signature and now returns `contentDefaults` after asserting.

- [x] **Step 1: Write the failing test** in `shared/contentDefaults.test.js`

```js
test('every content type has a default', () => {
  for (const id of contentTypeIds) assert.ok(contentDefaults[id] !== undefined, `no default for ${id}`)
})

test('assertDefaultsComplete names what is missing', () => {
  assert.throws(() => assertDefaultsComplete({}), /events/)
})
```

- [x] **Step 2: Run `npm test` and watch it fail** — expected: cannot find module `shared/contentDefaults.js`.

- [x] **Step 3: Create `shared/contentDefaults.js`** exporting `contentDefaults` (for now: `{ events }` imported from `src/data/events.js`) and `assertDefaultsComplete(defaults)`, which collects the ids in `contentTypeIds` that are `undefined` in `defaults` and throws one error listing them.

- [x] **Step 4: Make both old files shims.** `server/content/seed.js`: `loadDefaults()` calls `assertDefaultsComplete(contentDefaults)` then returns it. `src/content/defaults.js`: `export const defaults = contentDefaults`. Neither file imports from `src/data/` any more — that import now lives only in `shared/contentDefaults.js`.

- [x] **Step 5: Run `npm test` — all pass. Run `npm run lint`.**

- [x] **Step 6: Commit**

```bash
git add shared/ server/content/seed.js src/content/defaults.js
git commit -m "refactor(admin): one shared defaults map, checked at boot"
```

---

## ✅ Task 2 (done): The development door cannot be mounted on a real address

`AUTH_MODE=dev` is refused only when `NODE_ENV=production`, and only `npm start` sets that. A systemd unit running `node server/index.js` would mount the development login on the public domain.

**Files:**
- Modify: `server/config.js`, `server/config.test.js`, `server/.env.example`

**Interfaces:**
- Consumes: nothing. Produces: no new exports; `loadConfig` gains one refusal.

- [x] **Step 1: Write the failing tests** in `server/config.test.js`

```js
test('AUTH_MODE=dev refuses a non-local PUBLIC_URL', () => {
  assert.throws(() => loadConfig(env({ AUTH_MODE: 'dev', PUBLIC_URL: 'https://roboteamtwente.nl' })), /localhost/)
})

test('AUTH_MODE=dev allows 127.0.0.1', () => {
  assert.ok(loadConfig(env({ AUTH_MODE: 'dev', PUBLIC_URL: 'http://127.0.0.1:3000' })))
})

test('AUTH_MODE=google allows a real PUBLIC_URL', () => { /* no throw */ })
```

Use the existing helper in that file for a complete env; if there is none, follow the shape the neighbouring tests already use.

- [x] **Step 2: Run `npm test` and watch the first fail.**

- [x] **Step 3: Add the lock to `loadConfig`,** next to the existing production refusal: when `authMode === 'dev'`, parse `PUBLIC_URL` and throw unless its hostname is `localhost` or `127.0.0.1`. The message must say that the development door only runs locally and that `AUTH_MODE=google` is what a deployment uses.

- [x] **Step 4: Run `npm test` — all pass.**

- [x] **Step 5: Say so in `server/.env.example`** — one line under `AUTH_MODE` noting that `dev` additionally requires a localhost `PUBLIC_URL`, so the door cannot be mounted on a real address even without `NODE_ENV`.

- [x] **Step 6: Commit**

```bash
git add server/config.js server/config.test.js server/.env.example
git commit -m "fix(admin): dev login door only runs on localhost"
```

---

## ✅ Task 3 (done): A field type nobody knows is an error, not a pass

`checkField`'s `default:` branch treats an unknown `field.type` as text and calls `value.trim()`. The moment `list-of-text` exists, every legitimate save of one becomes a 500.

**Files:**
- Create: `server/content/fieldTypes.js`, `server/content/fieldTypes.test.js`
- Modify: `server/content/validate.js`, `server/content/validate.test.js`

**Interfaces:**
- Produces: `fieldTypes` — a map from type name to `{ check(field, value), clean(field, value) }` — and `getFieldType(name)`, returning `undefined` for an unknown name. `check` returns a message string or `null`; `clean` returns the value to store. Later tasks add entries here and nowhere else.

- [x] **Step 1: Write the failing tests.** In `fieldTypes.test.js`, one `check` pair per existing type (`text`, `textarea`, `select`, `number`, `url`, `image`) — a good value gives `null`, a bad one gives a message — plus:

```js
test('an unknown field type is not a field type', () => {
  assert.equal(getFieldType('fnord'), undefined)
})
```

In `validate.test.js`:

```js
test('a description with an unknown field type is refused loudly', () => {
  const result = validateContent('events', [{ /* … */ }], { fields: [{ name: 'x', label: 'X', type: 'fnord' }] })
  assert.equal(result.ok, false)
  assert.match(result.errors[0].message, /fnord/)
})
```

If injecting a description is awkward, test it through a real type whose description you temporarily extend inside the test — the point is that an unknown type produces an error with the type name in it, never a stored value.

- [x] **Step 2: Run `npm test` and watch them fail.**

- [x] **Step 3: Create `server/content/fieldTypes.js`** by moving each branch of `checkField` into its own entry, and give each entry the `clean` that belongs with it (`number` → `Number(value)`, the textual ones → `value.trim()`).

- [x] **Step 4: Rewrite `validate.js` to consult the registry:** `checkField` looks the type up, and an unknown one returns `` `${field.label}: unknown field type "${field.type}"` ``. `cleanItem` uses the same entry's `clean`. The blank-and-required logic stays in `validate.js`, as every type shares it.

- [x] **Step 5: Run `npm test` — all pass, including the phase 1 validate tests unchanged. Run `npm run lint`.**

- [x] **Step 6: Commit**

```bash
git add server/content/
git commit -m "fix(admin): unknown field types are refused, not guessed"
```

---

## ✅ Task 4 (done): A wrong-shaped file cannot blank the site

`ContentStore.read` rescues a file that fails to parse, but `{}` where a list belongs passes straight through to `.map` in a component, and with no error boundary React unmounts the whole site — on every route.

**Files:**
- Create: `server/content/shape.js`, `server/content/shape.test.js`, `src/components/ErrorBoundary/ErrorBoundary.jsx`, `src/components/ErrorBoundary/ErrorBoundary.module.css`
- Modify: `server/content/ContentStore.js`, `server/content/ContentStore.test.js`, `src/main.jsx`

**Interfaces:**
- Consumes: `getContentType` from `shared/contentTypes/index.js`.
- Produces: `isWellShaped(typeId, value)` → boolean. A `list` must be an array of plain objects; `textList` an array of strings; `single` a plain non-array object. It deliberately does **not** check fields: a hand edit with one too-long title should still show, only a value of the wrong *kind* falls back.

- [x] **Step 1: Write the failing tests** in `shape.test.js` (`[]` and a list of objects are well-shaped for `events`; `{}`, `null`, `[1,2]`, `[[]]` are not) and in `ContentStore.test.js`:

```js
test('a stored file of the wrong shape falls back to the defaults', async () => {
  await writeFile(path.join(dir, 'content/events.json'), '{}')
  assert.deepEqual(await store.read('events'), defaults.events)
})
```

- [x] **Step 2: Run `npm test` and watch the ContentStore test fail** (it returns `{}` today).

- [x] **Step 3: Create `shape.js`,** then in `ContentStore.read` fall back to `this.defaults[typeId]` when a parsed value is not well-shaped, with a `console.warn` naming the file — the same voice as the existing unreadable-file warning.

- [x] **Step 4: Run `npm test` — all pass.**

- [x] **Step 5: Write `ErrorBoundary.jsx`** — a class component with `getDerivedStateFromError` and `componentDidCatch` (which logs). Its fallback is one quiet centred panel using the tokens: the team name, "Something went wrong on this page.", and a link to `/`. No stack trace.

- [x] **Step 6: Wrap `<App />` in `src/main.jsx`** with `ErrorBoundary`, inside `BrowserRouter` and `ContentProvider` so the fallback can still link onwards.

- [x] **Step 7: Verify by hand.** With the server running, put `{}` into `server/storage/content/events.json`, load `/` and `/events`: both render the built-in events, and the server logs the warning. Restore the file afterwards.

- [x] **Step 8: Commit**

```bash
git add server/content/ src/components/ErrorBoundary/ src/main.jsx
git commit -m "fix(admin): wrong-shaped content falls back, error boundary catches the rest"
```

---

## ✅ Task 5 (done): The two public pages an editor can now break

`/events` renders `{place} · {time}` unguarded, so clearing Time leaves a dangling separator; `Events.jsx` keys its list by `title`, which is now editable and not unique.

**Files:**
- Modify: `src/pages/Events/EventsPage.jsx`, `src/sections/Events/Events.jsx`

- [x] **Step 1: Join the meta parts the way `EventCard` already does** — `[event.place, event.time, event.note].filter(Boolean).join(' · ')` — and render nothing when the result is empty.

- [x] **Step 2: Key the front-page list by `event.id`** instead of `event.title`.

- [x] **Step 3: Verify by hand.** In `/admin`, clear an event's Time, save, reload `/events`: the line reads "Enschede" with no trailing dot. Give two events the same title: the front page reveals both.

- [x] **Step 4: Commit**

```bash
git add src/pages/Events/EventsPage.jsx src/sections/Events/Events.jsx
git commit -m "fix(events): guard the meta line and key by id"
```

---

## ✅ Task 6 (done): `list-of-text`, the `textList` kind and the `single` kind — proven on partners and contact

Two field/kind mechanisms earned on the two simplest types. `partners` is a bare list of strings (`textList`); `contact` is one item with a list of address lines (`single` + `list-of-text`).

**Files:**
- Create: `shared/contentTypes/partners.js`, `shared/contentTypes/contact.js`, `src/admin/editors/fields/TextListField.jsx`
- Modify: `server/content/fieldTypes.js`, `server/content/validate.js`, `server/content/shape.js`, `shared/contentTypes/index.js`, `shared/contentDefaults.js`, `src/admin/editors/ItemForm.jsx`, `src/admin/ContentEditor.jsx`, `src/sections/Partners/Partners.jsx`, `src/pages/Contact/ContactPage.jsx`, `src/sections/Contact/Contact.jsx`, `src/pages/Education/EducationPage.jsx`
- Test: `server/content/fieldTypes.test.js`, `server/content/validate.test.js`, `server/routes/contentRoutes.test.js`

**Interfaces:**
- Produces: field type `list-of-text`, with `of: 'text' | 'image'` (default `text`) deciding what each row is checked and rendered as; kind `textList` (the stored value is an array of strings); kind `single` (the stored value is one object).
- `TextListField({ field, value, error, onChange })` — rows with add / remove / up / down, one unlabelled box per row.

- [x] **Step 1: Write the failing tests.**

```js
// fieldTypes.test.js
test('list-of-text wants a list', () => assert.match(check({type:'list-of-text'}, 'nope'), /list/))
test('list-of-text rejects a non-string row', () => assert.match(check({type:'list-of-text'}, ['a', 2]), /text/))
test('list-of-text drops blank rows when cleaning', () =>
  assert.deepEqual(clean({type:'list-of-text'}, ['a', '  ', ' b ']), ['a', 'b']))
test('list-of-text with of:image checks every row as an image', () =>
  assert.match(check({type:'list-of-text', of:'image'}, ['/images/a.jpg', 'javascript:x']), /path/))
test('an empty list-of-text is blank, so required applies', () => /* [] and [''] count as blank */)

// validate.test.js
test('a textList type stores an array of strings', () => {
  const result = validateContent('partners', ['Demcon', ' Saxion '])
  assert.deepEqual(result.value, ['Demcon', 'Saxion'])
})
test('a textList type refuses an object', () => assert.equal(validateContent('partners', {}).ok, false))
test('a single type stores one object', () => {
  const result = validateContent('contact', { email: 'info@roboteamtwente.nl', address: ['a'] })
  assert.equal(Array.isArray(result.value), false)
})
test('a single type refuses a list', () => assert.equal(validateContent('contact', []).ok, false))
```

- [x] **Step 2: Run `npm test` and watch them fail.**

- [x] **Step 3: Add the `list-of-text` entry to `fieldTypes.js`.** `check` refuses a non-array and reports the first bad row as `` `${field.label}: row ${n} must be …` ``, delegating each row to the entry named by `field.of ?? 'text'`. `clean` trims every row and drops the blank ones. Blankness: an empty array, or an array whose rows are all blank, counts as blank so `required` can speak.

- [x] **Step 4: Teach `validate.js` the two kinds.** `textList`: the value must be an array; check and clean it as one `list-of-text` field built from `type.field` (the description's single field) rather than per-item. `single`: as today's non-list branch, but refuse an array explicitly. Extend `shape.js` to match.

- [x] **Step 5: Run `npm test` — the field and validate tests pass.**

- [x] **Step 6: Write the two description files.** `partners`: `{ id: 'partners', label: 'Partners', kind: 'textList', field: { name: 'name', label: 'Partner name', type: 'text', required: true } }`. `contact`: `kind: 'single'`, fields `email` (text, required), `educationEmail` (text), `phone` (text), `address` (`list-of-text`, required), `mapsUrl` (url). Register both in `shared/contentTypes/index.js` and add their data to `shared/contentDefaults.js`.

- [x] **Step 7: Write `TextListField.jsx`,** reusing `FieldShell` for the label and error, and the `ListEditor.module.css` button idiom for the row controls (a new `.module.css` beside it, not a shared one). Each row is a `TextField`-style box when `of` is text; it renders nothing clever — Task 8 swaps in the image row.

- [x] **Step 8: Make `ContentEditor` kind-aware.** `list` → `ListEditor` as today; `textList` → one `TextListField` holding the whole value; `single` → one `ItemForm` with the value as its item, and `withGeneratedIds` skipped (there is no list to make ids unique within). Register `list-of-text` in `ItemForm`'s `COMPONENTS` map.

- [x] **Step 9: Add the API test** in `contentRoutes.test.js`: `PUT /api/content/partners` with `['A','B']` answers 200 and the file on disk is that array; `PUT /api/content/contact` with a missing `email` answers 422 with `field: 'email'`.

- [x] **Step 10: Switch the public consumers to `useContent`** — `Partners.jsx` (`useContent('partners')`), `Contact.jsx`, `ContactPage.jsx` and `EducationPage.jsx`'s contact import. Delete no data file: `src/data/partners.js` and `contact.js` remain the defaults.

- [x] **Step 11: Verify by hand, desktop and 390px.** In `/admin`: add a partner, reorder two, save, reload `/` — the new name is in the partner row. Edit the address lines on Contact, save, reload `/contact`.

- [x] **Step 12: Run `npm test`, `npm run lint`, `npm run build`. Commit**

```bash
git add shared/ server/content/ src/admin/ src/sections/Partners/ src/sections/Contact/ src/pages/Contact/ src/pages/Education/
git commit -m "feat(admin): list-of-text, textList and single kinds; partners and contact editable"
```

---

## ✅ Task 7 (done): The upload route

**Files:**
- Create: `server/uploads/sniffImage.js`, `server/uploads/sniffImage.test.js`, `server/uploads/UploadStore.js`, `server/uploads/UploadStore.test.js`, `server/routes/uploadRoutes.js`, `server/routes/uploadRoutes.test.js`
- Modify: `server/app.js`, `server/config.js`, `package.json`

**Interfaces:**
- Produces: `sniffImage(buffer)` → `{ ext: 'jpg'|'png'|'webp', mime }` or `null`; `new UploadStore({ storageDir })` with `save(buffer, ext)` → `{ path: '/uploads/<uuid>.<ext>' }` and `fileFor(name)` → an absolute path or `null`; `uploadRoutes({ uploads, requireLoggedIn })` → a router mounting `POST /api/uploads` and `GET /uploads/:file`.
- `POST /api/uploads` answers `{ path }` on success, 415 with `{ error }` for a type we refuse, 413 for too large, 401 when not logged in, 429 when rate-limited.

- [x] **Step 1: `npm install multer`** and confirm it lands in `dependencies`.

- [x] **Step 2: Write the failing tests.**

```js
// sniffImage.test.js
test('a JPEG is a jpg', () => assert.equal(sniffImage(Buffer.from([0xff,0xd8,0xff,0xe0,0,0])).ext, 'jpg'))
test('a PNG is a png', () => /* 89 50 4e 47 0d 0a 1a 0a */)
test('a WEBP is a webp', () => /* "RIFF" + 4 bytes + "WEBP" */)
test('an SVG is refused however it is named', () => assert.equal(sniffImage(Buffer.from('<svg xmlns=')), null))
test('a text file renamed .jpg is refused', () => assert.equal(sniffImage(Buffer.from('not an image')), null))
test('a truncated header is refused, not read past', () => assert.equal(sniffImage(Buffer.from([0xff])), null))

// UploadStore.test.js
test('two saves of identical bytes get different names', async () => {
  const a = await store.save(png, 'png'); const b = await store.save(png, 'png')
  assert.notEqual(a.path, b.path)
})
test('fileFor refuses a name that walks out of the folder', () => assert.equal(store.fileFor('../users.json'), null))

// uploadRoutes.test.js
test('an upload needs a login', /* 401 */)
test('a logged-in png upload answers a /uploads/ path and is then served', /* 200, then GET returns image/png */)
test('a renamed text file is refused with 415', /* and nothing is written */)
test('a 6 MB file is refused with 413', /* multer limit */)
```

- [x] **Step 3: Run `npm test` and watch them fail.**

- [x] **Step 4: Write `sniffImage.js`** — compare the leading bytes against the three signatures, checking the buffer is long enough first. WEBP is `RIFF` at 0 and `WEBP` at 8.

- [x] **Step 5: Write `UploadStore.js`** — `save` writes to `<storageDir>/uploads/<crypto.randomUUID()>.<ext>`, creating the folder; `fileFor` refuses any name where `path.basename(name) !== name` and returns `null` when the file is absent.

- [x] **Step 6: Write `uploadRoutes.js`** — `multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024, files: 1 } })`, then `requireLoggedIn`, then sniff `req.file.buffer` and refuse with 415 naming the three types we take. `GET /uploads/:file` sends the file with the `Content-Type` from the sniff of the stored bytes and `Cache-Control: public, max-age=31536000, immutable` — the name is random, so a file never changes under a path. Rate limit in one small in-memory map: at most 60 uploads per hour per email, answered 429 with a plain message. Translate multer's `LIMIT_FILE_SIZE` into a 413 with a message that says 5 MB.

- [x] **Step 7: Wire it in `server/app.js`** (an `uploads` argument beside `store` and `users`) and construct the `UploadStore` in `server/index.js`. Confirm `index.js`'s SPA fallback already excludes `/uploads` — it does; do not change that regex.

- [x] **Step 8: Run `npm test` — all pass. Run `npm run lint`.**

- [x] **Step 9: Commit**

```bash
git add package.json package-lock.json server/
git commit -m "feat(admin): image upload route with magic-byte sniffing"
```

---

## ✅ Task 8 (done): The image field, proven on alumni

**Files:**
- Create: `shared/contentTypes/alumni.js`, `src/admin/editors/fields/ImageField.jsx`, `src/admin/editors/fields/ImageField.module.css`
- Modify: `src/admin/api.js`, `src/admin/editors/ItemForm.jsx`, `src/admin/editors/fields/TextListField.jsx`, `shared/contentTypes/index.js`, `shared/contentDefaults.js`, `src/sections/Alumni/Alumni.jsx`

**Interfaces:**
- Consumes: `POST /api/uploads` from Task 7.
- Produces: `uploadImage(file)` in `api.js` → `{ ok: true, path }` or `{ ok: false, message }`; `ImageField({ field, value, error, onChange })`.

- [x] **Step 1: Write `uploadImage(file)`** in `api.js`: a `FormData` POST with no `content-type` header of its own (the browser must set the boundary), mapping 415 / 413 / 429 / 401 to the server's own message so the field can show it.

- [x] **Step 2: Write `ImageField.jsx`** — the current picture in a framed `<img>` or an empty frame; a "Choose picture" button opening a hidden `<input type="file" accept="image/jpeg,image/png,image/webp">`; drop handling on the frame (`onDragOver` preventing default, `onDrop` taking `event.dataTransfer.files[0]`); "Replace" and "Remove" under a filled frame; an "Uploading…" state; the server's message shown in the field's own error line on refusal. `onChange` is called with the returned path. **No path is ever shown or typed.**

- [x] **Step 3: Register `image` in `ItemForm`'s `COMPONENTS` map** and make `TextListField` use `ImageField` per row when `field.of === 'image'`.

- [x] **Step 4: Write `shared/contentTypes/alumni.js`** — `kind: 'list'`, `itemLabel: (a) => a.name`, fields: `id` (generated), `name` (text, required), `year` (text), `role` (text), `photo` (image), `quote` (textarea). Register it and add its default.

- [x] **Step 5: Switch `Alumni.jsx` to `useContent('alumni')`.**

- [x] **Step 6: Verify by hand, desktop and 390px.** Upload a real jpg to an alumnus: the preview appears, Save succeeds, `/` shows the photo, and the file is in `server/storage/uploads/`. Try a `.txt` renamed to `.jpg`: the field says which types are allowed and nothing is stored. Remove the picture: the field empties and the site falls back to initials.

- [x] **Step 7: Run `npm test`, `npm run lint`, `npm run build`. Commit**

```bash
git add shared/ src/admin/ src/sections/Alumni/
git commit -m "feat(admin): image field with upload and preview; alumni editable"
```

---

## ✅ Task 9 (done): `reference`, the subteam/member split, and the Members page

The deliverable that matters most. Members come out of `subteams` into their own flat type and are rejoined when rendering; the Members editor shows them grouped under subteam headings, moves within a group, and flags anyone with no photo.

**Files:**
- Create: `shared/contentTypes/subteams.js`, `shared/contentTypes/members.js`, `src/data/members.js`, `src/admin/editors/fields/ReferenceField.jsx`, `src/admin/useReferenceOptions.js`, `src/admin/editors/grouping.js`, `src/admin/editors/grouping.test.js`, `src/content/useMembers.js`
- Modify: `server/content/fieldTypes.js`, `src/data/subteams.js`, `src/admin/editors/ListEditor.jsx`, `src/admin/editors/ListEditor.module.css`, `src/admin/editors/generateIds.js`, `src/admin/editors/ItemForm.jsx`, `src/admin/ContentEditor.jsx`, `src/sections/Team/Team.jsx`, `src/pages/Subteam/SubteamPage.jsx`, `shared/contentTypes/index.js`, `shared/contentDefaults.js`
- Test: `server/content/fieldTypes.test.js`, `src/admin/editors/grouping.test.js`

**Interfaces:**
- Produces: field type `reference` with `{ refType, refValue = 'slug', refLabel = 'name' }`; `useMembers()` → `subteams` with a `members` array on each, in stored order; `useReferenceOptions(type)` → `{ [refType]: [{ value, label }] }`; `groupedOrder(items, groupBy, options)` → the display order as `[{ key, label, indexes }]`, and `neighbourInGroup(items, groupBy, index, by)` → the index to swap with, or `null`.
- A member is `{ id, name, role, photo, subteam }`, where `subteam` holds a subteam's `slug`.

- [x] **Step 1: Split the data file.** `src/data/members.js` exports one flat `members` array in today's reading order (management first, then mechanical, …), each entry `{ id, name, role, photo, subteam }` with `id` the slug of the name — and where a name repeats (Nikolaos Diamantopoulos is in both management and embedded) the second gets `-2`, exactly as `uniqueSlug` would. `src/data/subteams.js` keeps everything except `members`. Copy the values across; invent nothing.

- [x] **Step 2: Write the failing tests.**

```js
// fieldTypes.test.js
test('a reference must be text', () => assert.match(check({type:'reference', refType:'subteams'}, 7), /text/))
test('a reference that is a plain slug is accepted', () => assert.equal(check({type:'reference', refType:'subteams'}, 'mechanical'), null))

// grouping.test.js
test('members are displayed grouped in subteam order', /* groupedOrder returns one entry per subteam, each with the indexes of its members */)
test('a member whose subteam is unknown lands in a last group', /* key: null, label: 'No subteam' */)
test('moving down swaps with the next member of the same subteam', /* neighbourInGroup skips over other groups */)
test('moving down at the end of a group does nothing', /* returns null */)
```

- [x] **Step 3: Run `npm test` and watch them fail.**

- [x] **Step 4: Add the `reference` entry to `fieldTypes.js`** — checked as a non-empty string, cleaned by trimming. It deliberately does not verify the target exists: `validate.js` cannot read other content, the dropdown prevents typos, and the public join tolerates an unknown slug (Step 9).

- [x] **Step 5: Write the two description files.** `subteams`: `kind: 'list'`, `itemLabel: (s) => s.name`, fields `slug` (text, required, generated from the name), `name` (text, required), `description` (textarea, required), `longDescription` (textarea, required), `image` (image). `members`: `kind: 'list'`, `itemLabel: (m) => m.name`, fields `id` (generated), `name` (text, required), `role` (text, required), `photo` (image), `subteam` (`reference` to `subteams`, required), plus two description-level hints the editor reads generically:

```js
groupBy: { field: 'subteam', from: 'subteams', label: 'name', value: 'slug', emptyLabel: 'No subteam' },
itemFlag: (member) => (member.photo ? null : 'no photo'),
```

`subteams.slug` is generated, so `withGeneratedIds` must fill a field named `slug` as well as one named `id` — give the description `idField: 'slug'` and have `generateIds.js` honour it, defaulting to `id`.

- [x] **Step 6: Write `grouping.js`** from the tests, and `useReferenceOptions.js` — it collects every `refType` in the description plus `groupBy.from`, fetches each once with `getContent`, and maps them to `{ value, label }` using `refValue`/`refLabel`.

- [x] **Step 7: Write `ReferenceField.jsx`** — a `<select>` over the options with an em-dash empty choice, the same shape as `SelectField`. Register `reference` in `ItemForm`'s map, and thread the options from `ContentEditor` → `ListEditor` → `ItemForm` → field as a `refs` prop.

- [x] **Step 8: Teach `ListEditor` grouping and flags.** With `type.groupBy`, render a small heading per group (the subteam name, and how many are in it) and the items of that group under it; up/down call `neighbourInGroup`; a new item is added into the group whose heading's "+ Add" was pressed, with that group's value pre-filled; changing the reference moves the item to the end of its new group (`onChange` with the item spliced out and pushed after the last member of the target group). With `type.itemFlag`, show the returned label as a quiet chip next to the item's name — distinct from the red `needs attention` flag, because no photo is not an error.

- [x] **Step 9: Write `src/content/useMembers.js`** — reads both types through `useContent` and returns the subteams each with their members, keeping stored order; a member whose `subteam` matches nothing is left out of every subteam (and the hook also returns `orphans` so nothing is silently lost). Point `Team.jsx` and `SubteamPage.jsx` at it, and make `SubteamPage` handle an empty `members` array ("No members listed yet." instead of the heading maths).

- [x] **Step 10: Run `npm test` — all pass. Verify the two Review Focus cases by hand:** set a member's `subteam` to a slug that doesn't exist (edit the JSON) → `/team/*` and `/` still render; empty one subteam entirely → its page renders with the empty line.

- [x] **Step 11: The pretend changeover, desktop and 390px.** In `/admin` → Members: add two people with photos, remove one, move one between subteams with the dropdown, reorder a team lead to the top of their group. Save. Reload `/` and `/team/<slug>` for both affected subteams: the counts, the order and the photos are right, and the five people with no photo carry the flag in the list.

- [x] **Step 12: Run `npm run lint`, `npm run build`. Commit**

```bash
git add shared/ server/content/ src/admin/ src/content/ src/data/ src/sections/Team/ src/pages/Subteam/
git commit -m "feat(admin): members as their own content type, grouped editor, reference field"
```

---

## ✅ Task 10 (done): The straightforward types

`achievements`, `stats`, `socials`, `news`, `pastTeams` — no new machinery, five description files and five consumers switched over.

**Files:**
- Create: `shared/contentTypes/achievements.js`, `stats.js`, `socials.js`, `news.js`, `pastTeams.js`
- Modify: `shared/contentTypes/index.js`, `shared/contentDefaults.js`, `src/sections/Achievements/Achievements.jsx`, `src/sections/Stats/Stats.jsx`, `src/sections/News/News.jsx`, `src/pages/News/NewsPage.jsx`, `src/pages/NewsArticle/NewsArticlePage.jsx`, `src/pages/PastTeams/PastTeamsPage.jsx`, `src/components/Footer/Footer.jsx`, `src/pages/Events/EventsPage.jsx`, `src/pages/Contact/ContactPage.jsx`
- Test: `server/routes/contentRoutes.test.js`

**Interfaces:**
- Consumes: everything from Tasks 6–8. Produces: five more entries in `contentTypes`.

- [x] **Step 1: Write the descriptions.**
  - `achievements`: `year` (number, required, min 1900, max 2100), `result` (text, required), `competition` (text, required), `note` (textarea); `id` generated from the competition and year.
  - `stats`: `value` (number, required), `label` (text, required); `id` generated from the label.
  - `socials`: `label` (text, required), `href` (url, required); `id` generated from the label.
  - `news`: `id` (number, required, min 1, label "Page number — the address /news/<id>", **not** generated, because `/news/3` is a live address), `date` (text, required), `title` (text, required), `author` (text), `summary` (textarea, required), `image` (image), `pages` (`list-of-text` with `of: 'image'`).
  - `pastTeams`: `years` (text, required), `generation` (number, required), `photo` (image), `story` (textarea), `members` (`list-of-text`) — plain names, as Ethan decided; `id` generated from the years.

- [x] **Step 2: Register all five and add their defaults.** `assertDefaultsComplete` is what catches a miss; it runs at boot.

- [x] **Step 3: Switch the consumers to `useContent`.** `socials` has four consumers (Footer, Contact page, Events page, Education page) — all four, and the `instagram` constant in `EventsPage.jsx` must move inside the component, since it now depends on live content.

- [x] **Step 4: Add the API test:** `PUT /api/content/news` with two items sharing `id: 3` answers 422 naming the duplicate; a `pages` row that is not an image path answers 422.

- [x] **Step 5: Verify by hand, desktop and 390px.** Edit one item of each type in `/admin`, save, reload the page that shows it: the results table, the counters on the front page, a social link in the footer, `/news` and `/news/3`, `/past-teams`.

- [x] **Step 6: Run `npm test`, `npm run lint`, `npm run build`. Commit**

```bash
git add shared/ server/ src/
git commit -m "feat(admin): achievements, stats, socials, news and past teams editable"
```

---

## Task 11: `items` — nested lists, proven on join and positions

**Files:**
- Create: `shared/contentTypes/join.js`, `shared/contentTypes/positions.js`, `src/admin/editors/fields/ItemsField.jsx`, `src/admin/editors/fields/ItemsField.module.css`
- Modify: `server/content/fieldTypes.js`, `server/content/validate.js`, `src/admin/editors/ItemForm.jsx`, `src/data/join.js`, `src/pages/Join/JoinPage.jsx`, `shared/contentTypes/index.js`, `shared/contentDefaults.js`
- Test: `server/content/fieldTypes.test.js`, `server/content/validate.test.js`

**Interfaces:**
- Produces: field type `items` with its own `fields` array and `itemLabel`. Nested errors are reported on the wire as `field: '<name>[<i>].<subfield>'`, so the error shape stays flat; `ItemsField` filters the item's error map by that prefix.

- [ ] **Step 1: Write the failing tests.**

```js
// fieldTypes.test.js
test('items wants a list of objects', () => assert.match(check(stepsField, [1]), /fields/))
test('items checks each row against its own fields', () => assert.match(check(stepsField, [{}]), /Title is required/))
test('items cleans every row and drops unknown keys', () =>
  assert.deepEqual(clean(stepsField, [{ title: ' a ', text: 'b', junk: 1 }]), [{ title: 'a', text: 'b' }]))

// validate.test.js
test('a nested error is reported with its path', () => {
  const result = validateContent('join', { /* steps: [{ text: 'x' }] … */ })
  assert.equal(result.errors.some((e) => e.field === 'steps[0].title'), true)
})
```

- [ ] **Step 2: Run `npm test` and watch them fail.**

- [ ] **Step 3: Add the `items` entry to `fieldTypes.js`,** reusing the per-field check/clean the registry already provides, one level down. `check` returns the first row's message prefixed with its row number; the per-field paths come from `validate.js` (Step 4) so the admin can place them.

- [ ] **Step 4: Make `validate.js` descend into `items`** when collecting errors, pushing `{ index, field: \`${field.name}[${i}].${sub.name}\`, message }`, and use the registry's `clean` for the stored value.

- [ ] **Step 5: Flatten `applyEmail` in `src/data/join.js`** into `applyEmailTo`, `applyEmailSubject`, `applyEmailBody`, and update `JoinPage.jsx` to read the three. (A nested one-off object is not worth a fifth field type; three plain boxes are clearer to an editor anyway.)

- [ ] **Step 6: Write the descriptions.** `join`: `kind: 'single'`, fields `intro` (textarea, required), `benefits` (`list-of-text`, required), `cities` (`list-of-text`), `steps` (`items`: `title` text required, `text` textarea required), `requirements` (textarea, required), `callbackDay` (text), `applyEmailTo` (text, required), `applyEmailSubject` (text), `applyEmailBody` (textarea), `waitingLists` (`items`: `label` text required, `href` url required). `positions`: `kind: 'list'`, `itemLabel: (p) => p.title`, fields `id` (generated), `title` (text, required), `team` (`reference` to `subteams` with `refValue: 'name'`), `summary` (textarea, required), `text` (`list-of-text`, required — one row per paragraph).

- [ ] **Step 7: Write `ItemsField.jsx`** — a nested `ListEditor`-shaped block: add / remove / up / down and an `ItemForm` per row, visibly indented and quieter than a top-level item so the nesting reads. It must not import `ListEditor` if that means a circular import; a small nested list of its own is fine and clearer.

- [ ] **Step 8: Register `items` in `ItemForm`'s map and switch `JoinPage.jsx` to `useContent('join')` and `useContent('positions')`.**

- [ ] **Step 9: Run `npm test`. Verify by hand, desktop and 390px:** add a benefit, reorder two steps, add a waiting list, add a position with three paragraphs; save; reload `/join`.

- [ ] **Step 10: Run `npm run lint`, `npm run build`. Commit**

```bash
git add shared/ server/content/ src/admin/ src/data/join.js src/pages/Join/
git commit -m "feat(admin): nested items field; join page and positions editable"
```

---

## Task 12: Education

**Files:**
- Create: `shared/contentTypes/educationPage.js`, `shared/contentTypes/activityGroups.js`
- Modify: `src/data/education.js`, `src/pages/Education/EducationPage.jsx`, `shared/contentTypes/index.js`, `shared/contentDefaults.js`

**Interfaces:**
- Consumes: `single` (Task 6), `items` and `list-of-text` (Tasks 6, 11).

- [ ] **Step 1: Reshape `src/data/education.js`** — replace the two loose exports `educationIntro` and `educationNote` with one `educationPage = { intro, note }`, keeping `activityGroups` as it is, and update `EducationPage.jsx` to read both through `useContent`.

- [ ] **Step 2: Write `educationPage.js`** — `kind: 'single'`, fields `intro` (textarea, required), `note` (textarea).

- [ ] **Step 3: Write `activityGroups.js`** — `kind: 'list'`, `itemLabel: (g) => g.label`, fields `id` (generated from the label), `label` (text, required), `activities` (`items`: `title` text required, `level` text, `duration` text, `capacity` text, `language` text, `text` textarea required, `points` `list-of-text`, `tagline` text).

- [ ] **Step 4: Register both and add their defaults.**

- [ ] **Step 5: Verify by hand, desktop and 390px.** In `/admin`: change the intro; rename a tab; add an activity to Demonstrations with three bullet points; move an activity up; remove one. Save, reload `/education`: the tabs, the cards and the bullets all follow, and the tab switching still works.

- [ ] **Step 6: Run `npm test`, `npm run lint`, `npm run build`. Commit**

```bash
git add shared/ src/data/education.js src/pages/Education/
git commit -m "feat(admin): education page and activity tabs editable"
```

---

## Task 13: The whole thing, end to end

**Files:**
- Modify: `README.md`, `memory/Current Progress.md`, `memory/Session Log.md`, `memory/Decisions.md`, `docs/superpowers/specs/2026-10-24-admin-phase-2-design.md` (status line)

- [ ] **Step 1: Every type, at 390px.** Walk the sidebar top to bottom in a 390px window: every editor is usable, nothing scrolls sideways, every button is reachable with a thumb.

- [ ] **Step 2: The changeover, start to finish, timed.** From a clean login: add three members with uploaded photos, move two between subteams, remove two, fix a role, save once. It must be faster and calmer than editing `subteams.js` by hand — the anti-goal this phase is judged by. Note anything that felt slow.

- [ ] **Step 3: Prove the promise.** Add a throwaway description file for a type with no data file at all, start the server, and confirm it refuses to start naming the missing default (Task 1's assert) rather than blanking the site. Delete the throwaway file.

- [ ] **Step 4: `npm test`, `npm run lint`, `npm run build` — all three clean,** with the output in hand before anything is called done.

- [ ] **Step 5: Write the deployment note** in `README.md`: `server/storage/` holds the content *and* the uploads and is not in git, so a backup means copying that folder; the repo alone is no longer the whole site.

- [ ] **Step 6: Update the memory files** — overwrite `memory/Current Progress.md`, add a few lines to the top of `memory/Session Log.md`, and mark the spec as built.

- [ ] **Step 7: Commit**

```bash
git add README.md memory/ docs/
git commit -m "docs(admin): phase 2 built — deployment and backup notes"
```

---

## Notes for whoever implements this

- **Nothing here needs a new public-facing design.** If a page looks different afterwards, something is wrong.
- **`src/data/*.js` stays the defaults.** Never delete a data file when its type becomes editable — the site falls back to it when the server is unreachable, which is how `npm run dev` works alone.
- **The error shape on the wire is flat** — `{ index, field, message }` — and nested fields encode their path in `field`. Do not nest the error object.
- **The Playwright tab can throttle to 1–3 fps.** That is the tab, not the site: close and reopen the browser before judging speed.
