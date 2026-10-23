import assert from 'node:assert/strict'
import test from 'node:test'
import { loadConfig } from './config.js'

const SECRET = 'x'.repeat(32)

/** A complete development environment, which each test bends out of shape. */
function anEnv(overrides = {}) {
  return {
    PORT: '3000',
    PUBLIC_URL: 'http://localhost:3000',
    AUTH_MODE: 'dev',
    ALLOWED_DOMAIN: 'roboteamtwente.nl',
    OWNER_EMAIL: 'e.bastian@roboteamtwente.nl',
    SESSION_SECRET: SECRET,
    STORAGE_DIR: './server/storage',
    NODE_ENV: 'development',
    ...overrides,
  }
}

test('loads a complete dev environment', () => {
  const config = loadConfig(anEnv())
  assert.equal(config.authMode, 'dev')
  assert.equal(config.port, 3000)
  assert.equal(config.isProduction, false)
})

test('throws when AUTH_MODE is unset', () => {
  const env = anEnv()
  delete env.AUTH_MODE
  assert.throws(() => loadConfig(env), /AUTH_MODE/)
})

test('throws when AUTH_MODE is neither dev nor google', () => {
  assert.throws(() => loadConfig(anEnv({ AUTH_MODE: 'none' })), /AUTH_MODE/)
})

test('throws when AUTH_MODE=dev and NODE_ENV=production', () => {
  assert.throws(() => loadConfig(anEnv({ NODE_ENV: 'production' })), /production/)
})

test('allows AUTH_MODE=google with NODE_ENV=production', () => {
  const config = loadConfig(
    anEnv({
      NODE_ENV: 'production',
      AUTH_MODE: 'google',
      PUBLIC_URL: 'https://roboteamtwente.nl',
      GOOGLE_CLIENT_ID: 'id',
      GOOGLE_CLIENT_SECRET: 'secret',
    }),
  )
  assert.equal(config.isProduction, true)
  assert.equal(config.authMode, 'google')
})

test('throws when SESSION_SECRET is missing', () => {
  const env = anEnv()
  delete env.SESSION_SECRET
  assert.throws(() => loadConfig(env), /SESSION_SECRET/)
})

test('throws when SESSION_SECRET is shorter than 32 characters', () => {
  assert.throws(() => loadConfig(anEnv({ SESSION_SECRET: 'short' })), /SESSION_SECRET/)
})

test('throws when OWNER_EMAIL is not on the allowed domain', () => {
  assert.throws(() => loadConfig(anEnv({ OWNER_EMAIL: 'someone@gmail.com' })), /OWNER_EMAIL/)
})

test('throws when GOOGLE_CLIENT_ID is missing and AUTH_MODE=google', () => {
  assert.throws(
    () => loadConfig(anEnv({ AUTH_MODE: 'google', GOOGLE_CLIENT_SECRET: 'secret' })),
    /GOOGLE_CLIENT_ID/,
  )
})

test('does not require the Google settings when AUTH_MODE=dev', () => {
  assert.doesNotThrow(() => loadConfig(anEnv()))
})
