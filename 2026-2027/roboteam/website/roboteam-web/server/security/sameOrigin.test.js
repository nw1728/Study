import assert from 'node:assert/strict'
import test from 'node:test'
import { sameOrigin } from './sameOrigin.js'

const LIVE = { publicUrl: 'https://roboteamtwente.nl', isProduction: true }
const DEV = { publicUrl: 'http://localhost:3000', isProduction: false }

/** Runs the middleware and reports what it did. */
function run(config, { method = 'PUT', origin } = {}) {
  const req = { method, get: (name) => (name.toLowerCase() === 'origin' ? origin : undefined) }
  let status = null
  const res = { status: (code) => ((status = code), res), json: () => res }
  let passed = false
  sameOrigin(config)(req, res, () => (passed = true))
  return { passed, status }
}

test('lets a save from our own site through', () => {
  assert.equal(run(LIVE, { origin: 'https://roboteamtwente.nl' }).passed, true)
})

test('refuses a save from another site', () => {
  assert.equal(run(LIVE, { origin: 'https://evil.example' }).status, 403)
})

test('refuses another site in development too', () => {
  assert.equal(run(DEV, { origin: 'https://evil.example' }).status, 403)
})

test('lets reads through whatever the origin', () => {
  assert.equal(run(LIVE, { method: 'GET', origin: 'https://evil.example' }).passed, true)
})

test('lets a request with no Origin through', () => {
  assert.equal(run(LIVE, { origin: undefined }).passed, true)
})

test('accepts the Vite dev server in development', () => {
  // `npm run dev` serves the site on 5173 and proxies to the server on 3000,
  // so the browser's Origin is 5173 while PUBLIC_URL is 3000.
  assert.equal(run(DEV, { origin: 'http://localhost:5173' }).passed, true)
  assert.equal(run(DEV, { origin: 'http://127.0.0.1:5173' }).passed, true)
})

test('does NOT accept localhost in production', () => {
  assert.equal(run(LIVE, { origin: 'http://localhost:5173' }).status, 403)
})
