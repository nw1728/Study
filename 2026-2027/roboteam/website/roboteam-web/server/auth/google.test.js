import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import express from 'express'
import { loadConfig } from '../config.js'
import { UserStore } from '../users/UserStore.js'
import { requireLogin } from './door.js'
import { mountGoogleDoor } from './google.js'

const OWNER = 'e.bastian@roboteamtwente.nl'

const config = loadConfig({
  PORT: '3000',
  PUBLIC_URL: 'http://localhost:3000',
  AUTH_MODE: 'google',
  ALLOWED_DOMAIN: 'roboteamtwente.nl',
  OWNER_EMAIL: OWNER,
  SESSION_SECRET: 'x'.repeat(32),
  NODE_ENV: 'development',
  GOOGLE_CLIENT_ID: 'client-id',
  GOOGLE_CLIENT_SECRET: 'client-secret',
})

/**
 * Stands in for openid-client, so the tests never talk to Google. `claims` is
 * what Google "says" about whoever logged in; `grantFails` plays a forged or
 * replayed callback.
 */
function fakeGoogle({ claims, grantFails = false }) {
  return {
    discovery: async () => ({}),
    randomPKCECodeVerifier: () => 'verifier',
    randomState: () => 'state',
    calculatePKCECodeChallenge: async () => 'challenge',
    buildAuthorizationUrl: (settings, params) =>
      new URL(`https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams(params)}`),
    authorizationCodeGrant: async (settings, url, checks) => {
      assert.equal(checks.expectedState, 'state')
      assert.equal(checks.pkceCodeVerifier, 'verifier')
      if (grantFails) throw new Error('state mismatch')
      return { claims: () => claims }
    },
  }
}

const teamClaims = (overrides = {}) => ({
  email: OWNER,
  email_verified: true,
  hd: 'roboteamtwente.nl',
  name: 'Ethan',
  ...overrides,
})

async function anApp(t, google) {
  const storageDir = await fs.mkdtemp(path.join(os.tmpdir(), 'rtt-google-'))
  const users = new UserStore({ storageDir, allowedDomain: config.allowedDomain, ownerEmail: config.ownerEmail })
  await users.ensureFirstOwner()

  const app = express()
  mountGoogleDoor(app, { config, users, oidc: google })
  app.get('/protected', requireLogin({ config, users }), (req, res) => res.json({ user: req.user }))

  const server = app.listen(0)
  await new Promise((resolve) => server.once('listening', resolve))
  t.after(() => new Promise((resolve) => server.close(resolve)))
  return `http://localhost:${server.address().port}`
}

const cookiesOf = (response) => (response.headers.getSetCookie?.() ?? []).map((c) => c.split(';')[0])

/** Clicks "Sign in with Google", then comes back from Google. Returns the final answer. */
async function logIn(base) {
  const start = await fetch(`${base}/auth/google`, { redirect: 'manual' })
  const [loginCookie] = cookiesOf(start)
  const back = await fetch(`${base}/auth/google/callback?code=abc&state=state`, {
    headers: { cookie: loginCookie },
    redirect: 'manual',
  })
  const session = cookiesOf(back).find((c) => c.startsWith('rtt_session='))
  return { start, back, session }
}

test('the button sends you to Google with the team domain pre-selected', async (t) => {
  const base = await anApp(t, fakeGoogle({ claims: teamClaims() }))
  const { start } = await logIn(base)
  assert.equal(start.status, 302)
  const url = new URL(start.headers.get('location'))
  assert.equal(url.hostname, 'accounts.google.com')
  assert.equal(url.searchParams.get('hd'), 'roboteamtwente.nl')
  assert.equal(url.searchParams.get('redirect_uri'), 'http://localhost:3000/auth/google/callback')
  assert.equal(url.searchParams.get('code_challenge_method'), 'S256')
})

test('a verified team account on the access list gets in', async (t) => {
  const base = await anApp(t, fakeGoogle({ claims: teamClaims() }))
  const { back, session } = await logIn(base)
  assert.ok(session, 'no session cookie')
  assert.match(back.headers.get('location'), /\/admin$/)
  const me = await fetch(`${base}/protected`, { headers: { cookie: session } })
  assert.equal((await me.json()).user.email, OWNER)
})

test('a personal Gmail account is refused', async (t) => {
  const base = await anApp(t, fakeGoogle({ claims: teamClaims({ email: 'ethan@gmail.com', hd: undefined }) }))
  const { back, session } = await logIn(base)
  assert.equal(session, undefined)
  assert.match(back.headers.get('location'), /error=no-access/)
})

test('a team address that Google has not verified is refused', async (t) => {
  const base = await anApp(t, fakeGoogle({ claims: teamClaims({ email_verified: false }) }))
  const { session } = await logIn(base)
  assert.equal(session, undefined)
})

test('a team-looking address from outside the team Workspace is refused', async (t) => {
  const base = await anApp(t, fakeGoogle({ claims: teamClaims({ hd: undefined }) }))
  const { session } = await logIn(base)
  assert.equal(session, undefined)
})

test('a team account that is not on the access list is refused', async (t) => {
  const base = await anApp(t, fakeGoogle({ claims: teamClaims({ email: 'stranger@roboteamtwente.nl' }) }))
  const { back, session } = await logIn(base)
  assert.equal(session, undefined)
  assert.match(back.headers.get('location'), /error=no-access/)
})

test('a forged or replayed callback is refused', async (t) => {
  const base = await anApp(t, fakeGoogle({ claims: teamClaims(), grantFails: true }))
  const { session } = await logIn(base)
  assert.equal(session, undefined)
})

test('coming back without the login cookie is refused', async (t) => {
  const base = await anApp(t, fakeGoogle({ claims: teamClaims() }))
  const back = await fetch(`${base}/auth/google/callback?code=abc&state=state`, { redirect: 'manual' })
  assert.equal(back.status, 400)
  assert.equal(cookiesOf(back).length, 0)
})
