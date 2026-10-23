// What a file really is, decided by its first bytes.
//
// Never trust the name or the browser's content type: a .jpg that is really
// something else must be refused, because whatever we store here is served
// back to visitors. SVG is deliberately absent — it can carry scripts.

const SIGNATURES = [
  { ext: 'jpg', mime: 'image/jpeg', bytes: [0xff, 0xd8, 0xff] },
  { ext: 'png', mime: 'image/png', bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] },
]

function startsWith(buffer, bytes) {
  if (buffer.length < bytes.length) return false
  return bytes.every((byte, index) => buffer[index] === byte)
}

/** `{ ext, mime }` for a picture we are willing to serve, or null. */
export function sniffImage(buffer) {
  if (!Buffer.isBuffer(buffer)) return null

  for (const signature of SIGNATURES) {
    if (startsWith(buffer, signature.bytes)) {
      return { ext: signature.ext, mime: signature.mime }
    }
  }

  // WEBP is a RIFF container: "RIFF", four bytes of length, then "WEBP".
  if (buffer.length >= 12 && buffer.toString('ascii', 0, 4) === 'RIFF') {
    if (buffer.toString('ascii', 8, 12) === 'WEBP') return { ext: 'webp', mime: 'image/webp' }
  }

  return null
}
