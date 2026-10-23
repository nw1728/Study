// The development login. It exists so the admin can be built and tested before
// the team manager creates the Google OAuth client.
//
// It is thrown away when the Google door arrives, so it gets no React and no
// stylesheet: one plain page, server-rendered, with a banner nobody can miss.
//
// It is only ever mounted when AUTH_MODE=dev, and config.js refuses to start
// the server if that is combined with production.
import express from 'express'
import { createSession } from './session.js'

function escapeHtml(text) {
  return String(text).replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character],
  )
}

function page({ allowedDomain, message = '' }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Development login</title>
    <style>
      body { font-family: system-ui, sans-serif; background: #15121a; color: #eee;
             display: grid; place-items: center; min-height: 100vh; margin: 0; }
      form { width: min(26rem, 90vw); display: grid; gap: 0.75rem; }
      .banner { background: #7f1d1d; color: #fff; padding: 0.75rem 1rem; border-radius: 0.5rem;
                font-weight: 700; line-height: 1.4; }
      label { font-size: 0.85rem; opacity: 0.8; }
      input, select, button { font: inherit; padding: 0.6rem 0.7rem; border-radius: 0.5rem;
                              border: 1px solid #443b4d; background: #1e1a24; color: inherit; }
      button { background: #5a1c74; border-color: #5a1c74; cursor: pointer; font-weight: 600; }
      .error { color: #fca5a5; }
    </style>
  </head>
  <body>
    <form method="post" action="/auth/dev">
      <p class="banner">Development login — this door does not exist in production.</p>
      ${message ? `<p class="error">${escapeHtml(message)}</p>` : ''}
      <label for="email">Email (@${escapeHtml(allowedDomain)})</label>
      <input id="email" name="email" type="email" required autofocus
             placeholder="you@${escapeHtml(allowedDomain)}" />
      <label for="role">Sign in as</label>
      <select id="role" name="role">
        <option value="owner">owner</option>
        <option value="editor">editor</option>
      </select>
      <button type="submit">Continue</button>
    </form>
  </body>
</html>`
}

export function mountDevDoor(app, { config, users }) {
  app.get('/auth/dev', (req, res) => {
    res.type('html').send(page({ allowedDomain: config.allowedDomain }))
  })

  app.post('/auth/dev', express.urlencoded({ extended: false }), express.json(), async (req, res) => {
    const email = String(req.body?.email ?? '').trim().toLowerCase()
    const wantsHtml = req.accepts(['json', 'html']) === 'html'

    const refuse = (status, message) => {
      if (wantsHtml) {
        return res.status(status).type('html').send(page({ allowedDomain: config.allowedDomain, message }))
      }
      return res.status(status).json({ error: message })
    }

    if (!email.endsWith(`@${config.allowedDomain}`)) {
      return refuse(403, `Only @${config.allowedDomain} addresses can sign in.`)
    }

    // The same check the Google door makes: a team account is not enough,
    // you must be on the access list too.
    const user = await users.find(email)
    if (!user) {
      return refuse(403, "This account doesn't have access yet. Ask an owner to add you.")
    }

    createSession(res, { email: user.email, name: user.email.split('@')[0] }, config)
    return wantsHtml ? res.redirect('/admin') : res.json({ ok: true, email: user.email })
  })
}
