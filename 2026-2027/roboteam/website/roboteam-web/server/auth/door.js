// Which login door is mounted, and the guard that protects everything behind it.
//
// The door is the ONLY part that knows whether login went through Google or
// through the development form. Everything downstream — the session cookie, the
// access list, the roles — works the same either way. Swapping in Google on
// Monday means filling in google.js and adding its branch here.
import { mountDevDoor } from './devDoor.js'
import { clearSession, readSession } from './session.js'

export function mountDoor(app, { config, users }) {
  // Logging out means the same thing whichever door let you in.
  app.post('/auth/logout', (req, res) => {
    clearSession(res, config)
    res.json({ ok: true })
  })

  if (config.authMode === 'dev') {
    // Registered only in this branch, so under AUTH_MODE=google the development
    // door is a plain 404: not a route that exists and says no, but no route.
    mountDevDoor(app, { config, users })
    return
  }

  app.get('/auth/google', (req, res) => {
    res.status(501).json({
      error:
        'The Google door is not built yet. It arrives with the OAuth client on 2026-10-26; ' +
        'until then run with AUTH_MODE=dev.',
    })
  })
}

/**
 * Blocks anything that changes data. The role is looked up here, on every
 * request, rather than read from the cookie — so removing someone from the
 * access list locks them out at once, even with a valid cookie in hand.
 */
export function requireLogin({ config, users }) {
  return async (req, res, next) => {
    const session = readSession(req, config)
    if (!session) return res.status(401).json({ error: 'not logged in' })

    const user = await users.find(session.email)
    if (!user) return res.status(401).json({ error: 'no access' })

    req.user = { email: user.email, name: session.name, role: user.role }
    next()
  }
}
