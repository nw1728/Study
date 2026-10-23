// Where uploaded pictures live, and the only thing that names them.
//
// The name is ours, never the uploader's: a random id plus the extension we
// decided by sniffing. That way an upload can neither overwrite an existing
// file nor carry a path in its name.
import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'

export class UploadStore {
  constructor({ storageDir }) {
    this.dir = path.join(storageDir, 'uploads')
  }

  /** Writes the bytes under a fresh name and returns the path the site uses. */
  async save(buffer, ext) {
    await fs.mkdir(this.dir, { recursive: true })
    const name = `${crypto.randomUUID()}.${ext}`
    await fs.writeFile(path.join(this.dir, name), buffer)
    return { name, path: `/uploads/${name}` }
  }

  /**
   * The file on disk for a name out of a URL, or null.
   *
   * A name that is not a plain filename never gets near the filesystem, so
   * /uploads/../users.json cannot be asked for.
   */
  fileFor(name) {
    if (typeof name !== 'string' || name === '' || path.basename(name) !== name) return null
    return path.join(this.dir, name)
  }

  async read(name) {
    const file = this.fileFor(name)
    if (!file) return null
    try {
      return await fs.readFile(file)
    } catch {
      return null
    }
  }
}
