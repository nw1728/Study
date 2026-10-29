// The login cookie. It is signed, not encrypted: anyone can read who it says
// they are, but nobody can change it without the secret.
//
// It holds the email, the name and when it runs out, and deliberately NOT the
// role. The role is looked up on every request, so removing someone or changing
// what they may do takes effect at once rather than in eight hours.
import crypto from 'node:crypto'

const COOKIE_NAME = 'rtt_session'
const EIGHT_HOURS_MS = 8 * 60 * 60 * 1000

function sign(payload, secret) {
  return crypto.createHmac('sha256', secret).update(payload).digest('base64url')
}

/** Constant-time compare that survives a wrong-length input instead of throwing. */
function signatureMatches(expected, given) {
  const a = Buffer.from(expected)
  const b = Buffer.from(given)
  if (a.length !== b.length) return false
  return crypto.timingSafeEqual(a, b)
}

function readCookie(req, name) {
  const header = req.headers?.cookie
  if (typeof header !== 'string' || header === '') return null

  for (const part of header.split(';')) {
    const index = part.indexOf('=')
    if (index === -1) continue
    if (part.slice(0, index).trim() !== name) continue
    return part.slice(index + 1).trim()
  }
  return null
}

function serialise(name, value, { maxAgeSeconds, isProduction }) {
  const parts = [
    `${name}=${value}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${maxAgeSeconds}`,
  ]
  // Secure would make the cookie unusable over plain http://localhost.
  if (isProduction) parts.push('Secure')
  return parts.join('; ')
}

/**
 * A signed cookie holding `data` as JSON, as the text of a Set-Cookie header.
 * The login cookie is one; the Google door's short-lived "login in progress"
 * cookie is another.
 */
export function signedCookie(name, data, { maxAgeMs, config }) {
  const payload = Buffer.from(JSON.stringify(data)).toString('base64url')
  return serialise(name, `${payload}.${sign(payload, config.sessionSecret)}`, {
    maxAgeSeconds: Math.round(maxAgeMs / 1000),
    isProduction: config.isProduction,
  })
}

/** The data in a signed cookie, or null if it is missing, broken or tampered with. */
export function readSignedCookie(req, name, config) {
  const cookie = readCookie(req, name)
  if (!cookie) return null

  const separator = cookie.lastIndexOf('.')
  if (separator <= 0 || separator === cookie.length - 1) return null

  const payload = cookie.slice(0, separator)
  const signature = cookie.slice(separator + 1)
  if (!signatureMatches(sign(payload, config.sessionSecret), signature)) return null

  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
  } catch {
    return null
  }
}

/** The Set-Cookie text that deletes a cookie. */
export function expiredCookie(name, config) {
  return serialise(name, '', { maxAgeSeconds: 0, isProduction: config.isProduction })
}

export function createSession(res, { email, name }, config, { now = Date.now() } = {}) {
  res.setHeader(
    'Set-Cookie',
    signedCookie(COOKIE_NAME, { email, name, expiresAt: now + EIGHT_HOURS_MS }, {
      maxAgeMs: EIGHT_HOURS_MS,
      config,
    }),
  )
}

export function readSession(req, config) {
  const session = readSignedCookie(req, COOKIE_NAME, config)
  if (!session?.email || typeof session.expiresAt !== 'number') return null
  if (session.expiresAt <= Date.now()) return null

  return { email: session.email, name: session.name, expiresAt: session.expiresAt }
}

export function clearSession(res, config) {
  res.setHeader('Set-Cookie', expiredCookie(COOKIE_NAME, config))
}
