// Blocks saves that come from another website.
//
// Together with the cookie's SameSite=Lax, this is what stops a page somewhere
// else from quietly making your browser change our content while you're logged in.
const CHANGING_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE']

export function sameOrigin(config) {
  return (req, res, next) => {
    if (!CHANGING_METHODS.includes(req.method)) return next()

    const origin = req.get('origin')
    // A request with no Origin isn't a browser form post from another site;
    // it's curl, or a same-origin navigation. SameSite=Lax covers that case.
    if (!origin) return next()

    if (origin.replace(/\/$/, '') !== config.publicUrl) {
      return res.status(403).json({ error: 'request came from another site' })
    }
    next()
  }
}
