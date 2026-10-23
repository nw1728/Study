import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { createApp } from '../app.js'
import { loadConfig } from '../config.js'
import { ContentStore } from '../content/ContentStore.js'
import { UserStore } from '../users/UserStore.js'

const OWNER = 'e.bastian@roboteamtwente.nl'
const ORIGIN = 'http://localhost:3000'
const DEFAULTS = { events: [{ id: 'seeded', day: 1, month: 'JAN', title: 'Seeded', place: 'Here' }] }

function anEvent(overrides = {}) {
  return { id: 'new-event', day: 2, month: 'FEB', title: 'New', place: 'There', ...overrides }
}

async function anApp(t) {
  const storageDir = await fs.mkdtemp(path.join(os.tmpdir(), 'rtt-api-'))
  const config = loadConfig({
    PORT: '3000',
    PUBLIC_URL: ORIGIN,
    AUTH_MODE: 'dev',
    ALLOWED_DOMAIN: 'roboteamtwente.nl',
    OWNER_EMAIL: OWNER,
    SESSION_SECRET: 'x'.repeat(32),
    STORAGE_DIR: storageDir,
    NODE_ENV: 'development',
  })
  const store = new ContentStore({ storageDir, defaults: DEFAULTS })
  const users = new UserStore({ storageDir, allowedDomain: config.allowedDomain, ownerEmail: OWNER })
  await users.ensureFirstOwner()

  const server = createApp({ config, store, users }).listen(0)
  await new Promise((resolve) => server.once('listening', resolve))
  t.after(() => new Promise((resolve) => server.close(resolve)))

  const base = `http://localhost:${server.address().port}`
  const signIn = await fetch(`${base}/auth/dev`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json', origin: ORIGIN },
    body: JSON.stringify({ email: OWNER }),
  })
  const cookie = (signIn.headers.getSetCookie?.() ?? [])[0]?.split(';')[0]
  return { base, cookie, storageDir }
}

function put(base, type, body, { cookie, origin = ORIGIN } = {}) {
  return fetch(`${base}/api/content/${type}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json', ...(cookie ? { cookie } : {}), ...(origin ? { origin } : {}) },
    body: JSON.stringify(body),
  })
}

test('GET /api/content returns every type', async (t) => {
  const { base } = await anApp(t)
  const body = await (await fetch(`${base}/api/content`)).json()
  assert.deepEqual(Object.keys(body), ['events'])
})

test('GET /api/content/events returns the seeded events', async (t) => {
  const { base } = await anApp(t)
  const body = await (await fetch(`${base}/api/content/events`)).json()
  assert.deepEqual(body, DEFAULTS.events)
})

test('PUT /api/content/events without a cookie is refused', async (t) => {
  const { base } = await anApp(t)
  assert.equal((await put(base, 'events', [anEvent()])).status, 401)
  assert.deepEqual(await (await fetch(`${base}/api/content/events`)).json(), DEFAULTS.events)
})

test('PUT /api/content/events with a session saves and shows up in GET', async (t) => {
  const { base, cookie } = await anApp(t)
  assert.equal((await put(base, 'events', [anEvent()], { cookie })).status, 200)
  const body = await (await fetch(`${base}/api/content/events`)).json()
  assert.equal(body[0].title, 'New')
})

test('PUT with a missing title answers 422 with field errors', async (t) => {
  const { base, cookie } = await anApp(t)
  const response = await put(base, 'events', [anEvent({ title: '' })], { cookie })
  assert.equal(response.status, 422)
  assert.equal((await response.json()).errors[0].field, 'title')
})

test('PUT with an unknown type answers 404', async (t) => {
  const { base, cookie } = await anApp(t)
  assert.equal((await put(base, 'nope', [], { cookie })).status, 404)
})

test('PUT of a traversing type does not escape the content folder', async (t) => {
  const { base, cookie, storageDir } = await anApp(t)
  const before = await fs.readFile(path.join(storageDir, 'users.json'), 'utf8')
  for (const type of ['..%2F..%2Fusers', '..%2Fusers', '%2E%2E%2Fusers']) {
    const response = await put(base, type, [], { cookie })
    assert.ok([400, 404].includes(response.status), `${type} gave ${response.status}`)
  }
  assert.equal(await fs.readFile(path.join(storageDir, 'users.json'), 'utf8'), before)
})

test('PUT with a cross-site Origin is refused', async (t) => {
  const { base, cookie } = await anApp(t)
  const response = await put(base, 'events', [anEvent()], { cookie, origin: 'http://evil.example' })
  assert.equal(response.status, 403)
})

test('PUT records the logged-in user as savedBy', async (t) => {
  const { base, cookie } = await anApp(t)
  await put(base, 'events', [anEvent()], { cookie })
  const meta = await (await fetch(`${base}/api/content/events/meta`, { headers: { cookie } })).json()
  assert.equal(meta.savedBy, OWNER)
})

test('GET /api/me reports nobody when logged out, and the role when logged in', async (t) => {
  const { base, cookie } = await anApp(t)
  assert.equal((await (await fetch(`${base}/api/me`)).json()).user, null)
  const me = await (await fetch(`${base}/api/me`, { headers: { cookie } })).json()
  assert.equal(me.user.email, OWNER)
  assert.equal(me.user.role, 'owner')
})

test('GET /api/me reports the active authMode', async (t) => {
  const { base } = await anApp(t)
  assert.equal((await (await fetch(`${base}/api/me`)).json()).authMode, 'dev')
})
