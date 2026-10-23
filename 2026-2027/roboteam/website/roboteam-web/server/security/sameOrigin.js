// Blocks saves that come from another website.
//
// Together with the cookie's SameSite=Lax, this is what stops a page somewhere
// else from quietly making your browser change our content while you're logged in.
const CHANGING_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE']
const LOCAL_HOSTS = ['localhost', '127.0.0.1']

/**
 * While developing, `npm run dev` serves the site from Vite on port 5173 and
 * forwards /api to this server on 3000, so the browser's Origin is 5173 while
 * PUBLIC_URL says 3000. Accepting any local address closes that gap.
 *
 * Only outside production, where nothing is reached over localhost anyway.
 */
function isLocalDevOrigin(origin, config) {
  if (config.isProduction) return false
  try {
    const { hostname, protocol } = new URL(origin)
    return protocol === 'http:' && LOCAL_HOSTS.includes(hostname)
  } catch {
    return false
  }
}

export function sameOrigin(config) {
  return (req, res, next) => {
    if (!CHANGING_METHODS.includes(req.method)) return next()

    const origin = req.get('origin')
    // A request with no Origin isn't a browser form post from another site;
    // it's curl, or a same-origin navigation. SameSite=Lax covers that case.
    if (!origin) return next()

    if (isLocalDevOrigin(origin, config)) return next()

    if (origin.replace(/\/$/, '') !== config.publicUrl) {
      return res.status(403).json({ error: 'request came from another site' })
    }
    next()
  }
}
