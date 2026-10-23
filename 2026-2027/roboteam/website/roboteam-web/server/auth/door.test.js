import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import express from 'express'
import { loadConfig } from '../config.js'
import { UserStore } from '../users/UserStore.js'
import { mountDoor, requireLogin } from './door.js'

const OWNER = 'e.bastian@roboteamtwente.nl'

function aConfig(overrides = {}) {
  return loadConfig({
    PORT: '3000',
    PUBLIC_URL: 'http://localhost:3000',
    AUTH_MODE: 'dev',
    ALLOWED_DOMAIN: 'roboteamtwente.nl',
    OWNER_EMAIL: OWNER,
    SESSION_SECRET: 'x'.repeat(32),
    NODE_ENV: 'development',
    ...overrides,
  })
}

/** A running app with the door mounted and one protected route. Closes itself. */
async function anApp(t, { config = aConfig(), seedUsers = true } = {}) {
  const storageDir = await fs.mkdtemp(path.join(os.tmpdir(), 'rtt-door-'))
  const users = new UserStore({
    storageDir,
    allowedDomain: config.allowedDomain,
    ownerEmail: config.ownerEmail,
  })
  if (seedUsers) await users.ensureFirstOwner()

  const app = express()
  mountDoor(app, { config, users })
  app.get('/protected', requireLogin({ config, users }), (req, res) => res.json({ user: req.user }))

  const server = app.listen(0)
  await new Promise((resolve) => server.once('listening', resolve))
  t.after(() => new Promise((resolve) => server.close(resolve)))

  return { base: `http://localhost:${server.address().port}`, users, storageDir }
}

/** Logs in through the dev door and returns the cookie to send back. */
async function signIn(base, email = OWNER) {
  const response = await fetch(`${base}/auth/dev`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'http://localhost:3000' },
    body: JSON.stringify({ email, role: 'owner' }),
    redirect: 'manual',
  })
  const cookie = (response.headers.getSetCookie?.() ?? [])[0]?.split(';')[0]
  return { response, cookie }
}

test('GET /auth/dev serves the form in dev mode', async (t) => {
  const { base } = await anApp(t)
  const response = await fetch(`${base}/auth/dev`)
  assert.equal(response.status, 200)
  const html = await response.text()
  assert.match(html, /Development login/i)
})

test('POST /auth/dev with a team email sets a session cookie', async (t) => {
  const { base } = await anApp(t)
  const { response, cookie } = await signIn(base)
  assert.ok(response.status < 400, `status ${response.status}`)
  assert.match(cookie ?? '', /^rtt_session=/)
})

test('POST /auth/dev refuses an email off the allowed domain', async (t) => {
  const { base } = await anApp(t)
  const { response, cookie } = await signIn(base, 'someone@gmail.com')
  assert.equal(response.status, 403)
  assert.equal(cookie, undefined)
})

test('POST /auth/dev refuses an email not on the access list', async (t) => {
  const { base } = await anApp(t)
  const { response, cookie } = await signIn(base, 'stranger@roboteamtwente.nl')
  assert.equal(response.status, 403)
  assert.equal(cookie, undefined)
  assert.match(await response.text(), /owner/i)
})

test('the dev routes are absent when AUTH_MODE=google', async (t) => {
  const config = aConfig({
    AUTH_MODE: 'google',
    GOOGLE_CLIENT_ID: 'id',
    GOOGLE_CLIENT_SECRET: 'secret',
  })
  const { base } = await anApp(t, { config })
  assert.equal((await fetch(`${base}/auth/dev`)).status, 404)
})

test('requireLogin refuses a request with no cookie', async (t) => {
  const { base } = await anApp(t)
  assert.equal((await fetch(`${base}/protected`)).status, 401)
})

test('requireLogin admits a valid session', async (t) => {
  const { base } = await anApp(t)
  const { cookie } = await signIn(base)
  const response = await fetch(`${base}/protected`, { headers: { cookie } })
  assert.equal(response.status, 200)
  assert.equal((await response.json()).user.email, OWNER)
})

test('requireLogin refuses a user removed from the list after login', async (t) => {
  const { base, storageDir } = await anApp(t)
  const { cookie } = await signIn(base)
  await fs.writeFile(path.join(storageDir, 'users.json'), '[]')
  assert.equal((await fetch(`${base}/protected`, { headers: { cookie } })).status, 401)
})

test('requireLogin re-reads the role on every request', async (t) => {
  const { base, storageDir } = await anApp(t)
  const { cookie } = await signIn(base)
  await fs.writeFile(
    path.join(storageDir, 'users.json'),
    JSON.stringify([{ email: OWNER, role: 'editor' }]),
  )
  const response = await fetch(`${base}/protected`, { headers: { cookie } })
  assert.equal((await response.json()).user.role, 'editor')
})

test('POST /auth/logout clears the cookie', async (t) => {
  const { base } = await anApp(t)
  const { cookie } = await signIn(base)
  const response = await fetch(`${base}/auth/logout`, {
    method: 'POST',
    headers: { cookie, origin: 'http://localhost:3000' },
    redirect: 'manual',
  })
  assert.ok(response.status < 400)
  assert.match((response.headers.getSetCookie?.() ?? []).join(''), /Max-Age=0/)
})
