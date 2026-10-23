import assert from 'node:assert/strict'
import test from 'node:test'
import { clearSession, createSession, readSession } from './session.js'

const CONFIG = { sessionSecret: 'x'.repeat(32), isProduction: false }
const PRODUCTION = { ...CONFIG, isProduction: true }
const USER = { email: 'e.bastian@roboteamtwente.nl', name: 'Ethan' }

/** Collects what the server would send back. */
function aResponse() {
  const headers = {}
  return { headers, setHeader: (name, value) => (headers[name] = value) }
}

/** A request carrying the cookie a response just set. */
function requestCarrying(res) {
  const [pair] = String(res.headers['Set-Cookie']).split(';')
  return { headers: { cookie: pair } }
}

/** The raw cookie value a response set. */
function cookieValue(res) {
  return String(res.headers['Set-Cookie']).split(';')[0].split('=').slice(1).join('=')
}

test('a session round-trips through the cookie', () => {
  const res = aResponse()
  createSession(res, USER, CONFIG)
  const session = readSession(requestCarrying(res), CONFIG)
  assert.equal(session.email, USER.email)
  assert.equal(session.name, USER.name)
})

test('the cookie is HttpOnly, SameSite=Lax and Path=/', () => {
  const res = aResponse()
  createSession(res, USER, CONFIG)
  const header = String(res.headers['Set-Cookie'])
  assert.match(header, /HttpOnly/)
  assert.match(header, /SameSite=Lax/)
  assert.match(header, /Path=\//)
})

test('Secure is set in production and absent in development', () => {
  const dev = aResponse()
  createSession(dev, USER, CONFIG)
  assert.equal(/Secure/.test(String(dev.headers['Set-Cookie'])), false)

  const live = aResponse()
  createSession(live, USER, PRODUCTION)
  assert.match(String(live.headers['Set-Cookie']), /Secure/)
})

test('a tampered payload is refused', () => {
  const res = aResponse()
  createSession(res, USER, CONFIG)
  const [payload, signature] = cookieValue(res).split('.')
  const flipped = `${payload.slice(0, -1)}${payload.at(-1) === 'A' ? 'B' : 'A'}`
  const req = { headers: { cookie: `rtt_session=${flipped}.${signature}` } }
  assert.equal(readSession(req, CONFIG), null)
})

test('a cookie signed with another secret is refused', () => {
  const res = aResponse()
  createSession(res, USER, { ...CONFIG, sessionSecret: 'y'.repeat(32) })
  assert.equal(readSession(requestCarrying(res), CONFIG), null)
})

test('a cookie with no signature is refused', () => {
  assert.equal(readSession({ headers: { cookie: 'rtt_session=abc' } }, CONFIG), null)
})

test('an empty or garbage cookie header is refused', () => {
  for (const cookie of ['', '...', '%%%', 'rtt_session=', 'rtt_session=.', 'other=1']) {
    assert.equal(readSession({ headers: { cookie } }, CONFIG), null, `for "${cookie}"`)
  }
  assert.equal(readSession({ headers: {} }, CONFIG), null)
})

test('an expired session is refused', () => {
  const res = aResponse()
  createSession(res, USER, CONFIG, { now: Date.now() - 9 * 60 * 60 * 1000 })
  assert.equal(readSession(requestCarrying(res), CONFIG), null)
})

test('the cookie never contains the role', () => {
  const res = aResponse()
  createSession(res, { ...USER, role: 'owner' }, CONFIG)
  const payload = Buffer.from(cookieValue(res).split('.')[0], 'base64url').toString('utf8')
  assert.equal(payload.includes('owner'), false)
  assert.equal(payload.includes('role'), false)
})

test('clearSession expires the cookie', () => {
  const res = aResponse()
  clearSession(res, CONFIG)
  assert.match(String(res.headers['Set-Cookie']), /Max-Age=0/)
})
