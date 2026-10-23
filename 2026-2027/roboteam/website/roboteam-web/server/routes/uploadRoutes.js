// Uploading a picture, and serving the pictures that were uploaded.
//
// Reading is public — the site shows them to visitors. Uploading needs a
// login, and the file has to prove what it is: the name and the browser's
// content type are both ignored.
import express from 'express'
import multer from 'multer'
import { sniffImage } from '../uploads/sniffImage.js'

const MAX_BYTES = 5 * 1024 * 1024
const ALLOWED = 'JPG, PNG or WEBP'

// Enough for a whole team's photos in one sitting, far too little to fill a
// disk with. Counted per person, in memory: a restart forgives everyone.
const PER_HOUR = 60
const HOUR = 60 * 60 * 1000

/** Counts uploads per person per hour. */
function rateLimiter() {
  const seen = new Map()

  return (email) => {
    const now = Date.now()
    const recent = (seen.get(email) ?? []).filter((at) => now - at < HOUR)
    if (recent.length >= PER_HOUR) return false
    recent.push(now)
    seen.set(email, recent)
    return true
  }
}

export function uploadRoutes({ uploads, requireLoggedIn }) {
  const router = express.Router()
  // In memory, not on disk: nothing is written until we know what it is.
  const receive = multer({ storage: multer.memoryStorage(), limits: { fileSize: MAX_BYTES, files: 1 } })
  const allow = rateLimiter()

  router.post('/uploads', requireLoggedIn, (req, res) => {
    if (!allow(req.user.email)) {
      return res.status(429).json({ error: 'That is a lot of pictures at once. Try again later.' })
    }

    receive.single('file')(req, res, (error) => {
      if (error) {
        const tooBig = error.code === 'LIMIT_FILE_SIZE'
        return res.status(tooBig ? 413 : 400).json({
          error: tooBig ? 'That picture is larger than 5 MB.' : 'That upload could not be read.',
        })
      }

      if (!req.file) return res.status(400).json({ error: 'No picture was sent.' })

      // The bytes decide, not the name and not the browser.
      const kind = sniffImage(req.file.buffer)
      if (!kind) {
        return res.status(415).json({ error: `That file is not a picture we can use. Use ${ALLOWED}.` })
      }

      uploads
        .save(req.file.buffer, kind.ext)
        .then((saved) => res.json({ path: saved.path }))
        .catch(() => res.status(500).json({ error: 'The picture could not be stored.' }))
    })
  })

  return router
}

/** Serves what was uploaded. Separate, because this part is public. */
export function uploadFileRoutes({ uploads }) {
  const router = express.Router()

  router.get('/uploads/:file', async (req, res) => {
    const bytes = await uploads.read(req.params.file)
    if (!bytes) return res.status(404).end()

    // Sniffed again on the way out: the type we send is the type it is.
    const kind = sniffImage(bytes)
    if (!kind) return res.status(404).end()

    res.type(kind.mime)
    // The name is random and a file is never replaced, so it can be kept.
    res.set('cache-control', 'public, max-age=31536000, immutable')
    res.send(bytes)
  })

  return router
}
