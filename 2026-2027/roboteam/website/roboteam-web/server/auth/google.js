// The real login door: "Sign in with Google", for the team's own accounts only.
//
// The protocol (OpenID Connect, authorization code with PKCE) is done by the
// openid-client library; this file only decides who gets in. Three locks:
//   1. the consent screen in Google Cloud is "Internal", so Google itself only
//      lets roboteamtwente.nl accounts through;
//   2. this file checks the answer again: a verified email, from the team's
//      Google Workspace (the `hd` claim), on the team's domain;
//   3. the address must be on the access list (users.json).
// Only then does it set the same session cookie the development door sets.
import * as openidClient from 'openid-client'
import { createSession, expiredCookie, readSignedCookie, signedCookie } from './session.js'

const GOOGLE = new URL('https://accounts.google.com')
const LOGIN_COOKIE = 'rtt_login' // the one-time values of a login that is under way
const TEN_MINUTES_MS = 10 * 60 * 1000
const LOCAL_HOSTS = ['localhost', '127.0.0.1']

/**
 * Where to send someone once Google is done with them. In production that is
 * simply /admin. While developing, the admin page is served by Vite (5173) and
 * not by this server (3000), and Google always comes back to 3000 — so go back
 * to the address the login was started from.
 */
function adminAddress(req, config) {
  const host = req.get('host') ?? ''
  if (!config.isProduction && LOCAL_HOSTS.includes(host.split(':')[0])) return `http://${host}/admin`
  return '/admin'
}

/** True only for a verified address from the team's own Google Workspace. */
function isTeamAccount(claims, allowedDomain) {
  const email = String(claims.email ?? '').toLowerCase()
  return (
    claims.email_verified === true &&
    String(claims.hd ?? '').toLowerCase() === allowedDomain &&
    email.endsWith(`@${allowedDomain}`)
  )
}

export function mountGoogleDoor(app, { config, users, oidc = openidClient }) {
  const redirectUri = `${config.publicUrl}/auth/google/callback`

  // Google's addresses and keys, fetched on the first login rather than at
  // start, so the server still starts when the internet is down.
  let google = null
  const googleSettings = async () =>
    (google ??= await oidc.discovery(GOOGLE, config.googleClientId, config.googleClientSecret))

  app.get('/auth/google', async (req, res) => {
    const settings = await googleSettings()
    const verifier = oidc.randomPKCECodeVerifier()
    const state = oidc.randomState()

    const url = oidc.buildAuthorizationUrl(settings, {
      redirect_uri: redirectUri,
      scope: 'openid email profile',
      code_challenge: await oidc.calculatePKCECodeChallenge(verifier),
      code_challenge_method: 'S256',
      state,
      // Only pre-selects the team account on Google's screen. It locks nothing:
      // the real check is isTeamAccount() in the callback.
      hd: config.allowedDomain,
      prompt: 'select_account',
    })

    res.setHeader(
      'Set-Cookie',
      signedCookie(LOGIN_COOKIE, { state, verifier, returnTo: adminAddress(req, config) }, {
        maxAgeMs: TEN_MINUTES_MS,
        config,
      }),
    )
    res.redirect(url.href)
  })

  app.get('/auth/google/callback', async (req, res) => {
    const login = readSignedCookie(req, LOGIN_COOKIE, config)
    if (!login) {
      return res
        .status(400)
        .type('text')
        .send('This login took too long or was started somewhere else. Go back to the admin page and try again.')
    }

    const finish = (address) => {
      res.append('Set-Cookie', expiredCookie(LOGIN_COOKIE, config))
      res.redirect(address)
    }

    // Pressed "Cancel" on Google's screen: back to the login button.
    if (req.query.error) return finish(login.returnTo)

    let claims
    try {
      const tokens = await oidc.authorizationCodeGrant(
        await googleSettings(),
        new URL(req.originalUrl, config.publicUrl),
        { pkceCodeVerifier: login.verifier, expectedState: login.state },
      )
      claims = tokens.claims()
    } catch {
      // A wrong state, a reused code, a bad signature: never let it through.
      return finish(`${login.returnTo}?error=no-access`)
    }

    const user = isTeamAccount(claims, config.allowedDomain)
      ? await users.find(String(claims.email).toLowerCase())
      : null
    if (!user) return finish(`${login.returnTo}?error=no-access`)

    createSession(res, { email: user.email, name: claims.name ?? user.email.split('@')[0] }, config)
    finish(login.returnTo)
  })
}
