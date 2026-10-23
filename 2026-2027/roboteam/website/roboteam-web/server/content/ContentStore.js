// Reads and writes the content JSON files, keeping the last 30 versions of each.
// It has no opinion on what content means: the route validates before calling write.
import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { contentTypeIds } from '../../shared/contentTypes/index.js'
import { isWellShaped } from './shape.js'

const VERSIONS_KEPT = 30

/** Reads and parses a JSON file, or returns null if it's missing or unreadable. */
async function readJson(file) {
  try {
    return JSON.parse(await fs.readFile(file, 'utf8'))
  } catch (error) {
    if (error.code !== 'ENOENT') {
      // A hand-edited or half-written file must never take the server down.
      console.warn(`[content] ignoring unreadable ${path.basename(file)}: ${error.message}`)
    }
    return null
  }
}

export class ContentStore {
  constructor({ storageDir, defaults }) {
    this.contentDir = path.join(storageDir, 'content')
    this.historyDir = path.join(storageDir, 'history')
    this.defaults = defaults
  }

  #file(typeId) {
    return path.join(this.contentDir, `${typeId}.json`)
  }

  #metaFile(typeId) {
    return path.join(this.contentDir, `${typeId}.meta.json`)
  }

  /**
   * Writes a file so a crash can never leave half of one: serialise first, write
   * to a temp file in the same directory, flush it, then rename over the target.
   * A rename within a directory is atomic.
   */
  async #writeAtomic(file, value) {
    const text = JSON.stringify(value, null, 2)
    await fs.mkdir(path.dirname(file), { recursive: true })
    const temp = `${file}.${crypto.randomBytes(6).toString('hex')}.tmp`
    let handle
    try {
      handle = await fs.open(temp, 'w')
      await handle.writeFile(text, 'utf8')
      await handle.sync()
      await handle.close()
      handle = undefined
      await fs.rename(temp, file)
    } catch (error) {
      if (handle) await handle.close().catch(() => {})
      await fs.rm(temp, { force: true })
      throw error
    }
  }

  async read(typeId) {
    const stored = await readJson(this.#file(typeId))
    if (stored === null) return this.defaults[typeId]

    // Parsing is not enough: a file can be valid JSON and still be the wrong
    // kind of thing, and the site would carry that all the way to a .map.
    if (!isWellShaped(typeId, stored)) {
      console.warn(`[content] ${typeId}.json has the wrong shape; showing the built-in content`)
      return this.defaults[typeId]
    }

    return stored
  }

  async readAll() {
    const entries = await Promise.all(
      contentTypeIds.map(async (id) => [id, await this.read(id)]),
    )
    return Object.fromEntries(entries)
  }

  async meta(typeId) {
    return await readJson(this.#metaFile(typeId))
  }

  async write(typeId, value, author) {
    // Serialise before touching anything, so a value that can't be stored
    // fails here rather than halfway through replacing a good file.
    JSON.stringify(value)

    await this.#archiveCurrent(typeId)

    const savedAt = new Date().toISOString()
    await this.#writeAtomic(this.#file(typeId), value)
    await this.#writeAtomic(this.#metaFile(typeId), { savedAt, savedBy: author })
    return { savedAt, savedBy: author }
  }

  /** Copies the version on disk into history, if there is one. */
  async #archiveCurrent(typeId) {
    const current = await readJson(this.#file(typeId))
    if (current === null) return

    const meta = (await this.meta(typeId)) ?? {}
    const stamp = (meta.savedAt ?? new Date().toISOString()).replaceAll(':', '-')
    const folder = path.join(this.historyDir, typeId)
    await fs.mkdir(folder, { recursive: true })
    await this.#writeAtomic(path.join(folder, `${stamp}_${meta.savedBy ?? 'unknown'}.json`), {
      savedAt: meta.savedAt ?? null,
      savedBy: meta.savedBy ?? null,
      value: current,
    })
    await this.#trimHistory(typeId)
  }

  async #trimHistory(typeId) {
    const versions = await this.listHistory(typeId)
    for (const old of versions.slice(VERSIONS_KEPT)) {
      await fs.rm(path.join(this.historyDir, typeId, old.version), { force: true })
    }
  }

  /** Newest first. */
  async listHistory(typeId) {
    const folder = path.join(this.historyDir, typeId)
    let names
    try {
      names = await fs.readdir(folder)
    } catch {
      return []
    }

    const versions = await Promise.all(
      names
        .filter((name) => name.endsWith('.json'))
        .map(async (name) => {
          const entry = await readJson(path.join(folder, name))
          return { version: name, savedAt: entry?.savedAt ?? null, savedBy: entry?.savedBy ?? null }
        }),
    )
    return versions.sort((a, b) => b.version.localeCompare(a.version))
  }

  async restore(typeId, version, author) {
    // The version is a filename we listed ourselves; never let a caller's string
    // walk out of the history folder.
    if (path.basename(version) !== version) throw new Error(`Bad version: ${version}`)

    const entry = await readJson(path.join(this.historyDir, typeId, version))
    if (entry === null) throw new Error(`No such version: ${version}`)

    // A restore is just another write, so it lands in history too and can be undone.
    return await this.write(typeId, entry.value, author)
  }
}
