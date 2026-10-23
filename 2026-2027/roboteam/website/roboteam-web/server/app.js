// Wires the routes and middleware together. It does NOT listen: index.js does
// that, so tests can start as many apps as they like on their own ports.
import express from 'express'
import { mountDoor, requireLogin } from './auth/door.js'
import { readSession } from './auth/session.js'
import { contentRoutes } from './routes/contentRoutes.js'
import { sameOrigin } from './security/sameOrigin.js'

export function createApp({ config, store, users }) {
  const app = express()
  app.disable('x-powered-by')

  app.use(sameOrigin(config))
  app.use(express.json({ limit: '1mb' }))

  mountDoor(app, { config, users })

  const requireLoggedIn = requireLogin({ config, users })

  // Who is logged in, and which door is mounted. The admin's login screen reads
  // authMode to label its own button, so it needs no knowledge of the door.
  app.get('/api/me', async (req, res) => {
    const session = readSession(req, config)
    const user = session ? await users.find(session.email) : null
    res.json({
      user: user ? { email: user.email, name: session.name, role: user.role } : null,
      authMode: config.authMode,
    })
  })

  app.use('/api', contentRoutes({ store, requireLoggedIn }))

  return app
}
