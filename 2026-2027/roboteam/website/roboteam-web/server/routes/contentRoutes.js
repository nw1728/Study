// Reading content is public: the site itself needs it on every page load.
// Changing it needs a login.
import express from 'express'
import { validateContent } from '../content/validate.js'
import { getContentType } from '../../shared/contentTypes/index.js'

/**
 * Turns the :type in the URL into a known content type, or answers 404.
 *
 * This is the only place a type id is trusted. The id becomes a filename, so an
 * unchecked one would let a caller write anywhere on disk — it is matched
 * against the descriptions we ship and never passed to a path as it arrived.
 */
function resolveType(req, res, next) {
  const type = getContentType(req.params.type)
  if (!type) return res.status(404).json({ error: `Unknown content type: ${req.params.type}` })
  req.contentType = type
  next()
}

export function contentRoutes({ store, requireLoggedIn }) {
  const router = express.Router()

  router.get('/content', async (req, res) => {
    res.json(await store.readAll())
  })

  router.get('/content/:type', resolveType, async (req, res) => {
    res.json(await store.read(req.contentType.id))
  })

  router.get('/content/:type/meta', resolveType, requireLoggedIn, async (req, res) => {
    res.json((await store.meta(req.contentType.id)) ?? { savedAt: null, savedBy: null })
  })

  router.put('/content/:type', resolveType, requireLoggedIn, async (req, res) => {
    // Checked before anything touches disk, so a bad save can never reach the
    // public site — it is refused with the errors next to their fields.
    const result = validateContent(req.contentType.id, req.body)
    if (!result.ok) return res.status(422).json({ errors: result.errors })

    const meta = await store.write(req.contentType.id, result.value, req.user.email)
    res.json({ ok: true, ...meta })
  })

  return router
}
