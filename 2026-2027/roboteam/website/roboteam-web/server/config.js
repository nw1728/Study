// Every setting the server needs, checked at start. A missing or wrong setting
// stops the process here rather than failing on the first request.
import fs from 'node:fs'
import path from 'node:path'

const AUTH_MODES = ['dev', 'google']
const SECRET_MIN_LENGTH = 32
const LOCAL_HOSTS = ['localhost', '127.0.0.1']

/** True only for an address that nothing outside this machine can reach. */
function isLocalUrl(url) {
  try {
    return LOCAL_HOSTS.includes(new URL(url).hostname)
  } catch {
    return false
  }
}

/** Reads server/.env into process.env, if the file is there. */
export function loadEnvFile(file = path.join(import.meta.dirname, '.env')) {
  if (fs.existsSync(file)) process.loadEnvFile(file)
}

function required(env, name) {
  const value = env[name]
  if (!value || String(value).trim() === '') {
    throw new Error(`${name} is not set. Copy server/.env.example to server/.env and fill it in.`)
  }
  return String(value).trim()
}

export function loadConfig(env = process.env) {
  const isProduction = env.NODE_ENV === 'production'

  // No default on purpose: forgetting to set this must stop the server,
  // never quietly leave the development door open.
  const authMode = required(env, 'AUTH_MODE')
  if (!AUTH_MODES.includes(authMode)) {
    throw new Error(`AUTH_MODE must be one of: ${AUTH_MODES.join(', ')} (got "${authMode}")`)
  }

  const publicUrl = required(env, 'PUBLIC_URL').replace(/\/$/, '')

  // Two locks on the development door, because one was not enough.
  //
  // The first is NODE_ENV, and only `npm start` sets it: a systemd unit running
  // `node server/index.js` (the natural thing to write) would not.
  if (authMode === 'dev' && isProduction) {
    throw new Error(
      'AUTH_MODE=dev cannot run in production. The development login lets anyone in; ' +
        'set AUTH_MODE=google before deploying.',
    )
  }

  // The second is positive rather than negative: the development door only
  // exists on an address that is not reachable from outside this machine. Any
  // real deployment has to change PUBLIC_URL anyway, since it is both the
  // Origin check and the base of the Google redirect.
  if (authMode === 'dev' && !isLocalUrl(publicUrl)) {
    throw new Error(
      `AUTH_MODE=dev only runs locally, and PUBLIC_URL is "${publicUrl}". The development ` +
        'login lets anyone in, so it may not be mounted on a real address: use ' +
        'http://localhost:<port> here, or set AUTH_MODE=google.',
    )
  }

  const sessionSecret = required(env, 'SESSION_SECRET')
  if (sessionSecret.length < SECRET_MIN_LENGTH) {
    throw new Error(`SESSION_SECRET must be at least ${SECRET_MIN_LENGTH} characters long`)
  }

  const allowedDomain = required(env, 'ALLOWED_DOMAIN')
  const ownerEmail = required(env, 'OWNER_EMAIL')
  if (!ownerEmail.toLowerCase().endsWith(`@${allowedDomain.toLowerCase()}`)) {
    throw new Error(`OWNER_EMAIL must be an @${allowedDomain} address (got "${ownerEmail}")`)
  }

  const config = {
    port: Number(env.PORT ?? 3000),
    publicUrl,
    authMode,
    allowedDomain: allowedDomain.toLowerCase(),
    ownerEmail: ownerEmail.toLowerCase(),
    sessionSecret,
    storageDir: path.resolve(env.STORAGE_DIR ?? './server/storage'),
    isProduction,
    googleClientId: authMode === 'google' ? required(env, 'GOOGLE_CLIENT_ID') : null,
    googleClientSecret: authMode === 'google' ? required(env, 'GOOGLE_CLIENT_SECRET') : null,
  }

  if (!Number.isInteger(config.port) || config.port <= 0) {
    throw new Error(`PORT must be a whole number (got "${env.PORT}")`)
  }

  return Object.freeze(config)
}
