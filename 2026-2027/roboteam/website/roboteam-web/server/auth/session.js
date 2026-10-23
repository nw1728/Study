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

export function createSession(res, { email, name }, config, { now = Date.now() } = {}) {
  const payload = Buffer.from(
    JSON.stringify({ email, name, expiresAt: now + EIGHT_HOURS_MS }),
  ).toString('base64url')

  res.setHeader(
    'Set-Cookie',
    serialise(COOKIE_NAME, `${payload}.${sign(payload, config.sessionSecret)}`, {
      maxAgeSeconds: Math.round(EIGHT_HOURS_MS / 1000),
      isProduction: config.isProduction,
    }),
  )
}

export function readSession(req, config) {
  const cookie = readCookie(req, COOKIE_NAME)
  if (!cookie) return null

  const separator = cookie.lastIndexOf('.')
  if (separator <= 0 || separator === cookie.length - 1) return null

  const payload = cookie.slice(0, separator)
  const signature = cookie.slice(separator + 1)
  if (!signatureMatches(sign(payload, config.sessionSecret), signature)) return null

  let session
  try {
    session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
  } catch {
    return null
  }

  if (!session?.email || typeof session.expiresAt !== 'number') return null
  if (session.expiresAt <= Date.now()) return null

  return { email: session.email, name: session.name, expiresAt: session.expiresAt }
}

export function clearSession(res, config) {
  res.setHeader(
    'Set-Cookie',
    serialise(COOKIE_NAME, '', { maxAgeSeconds: 0, isProduction: config.isProduction }),
  )
}
