// The access list: who may use the admin at all. Having a team Google account
// is not enough, you must also be on this list.
//
// Phase 1 is read-only beyond creating the first owner. Adding and removing
// people arrives with the Team access page.
import fs from 'node:fs/promises'
import path from 'node:path'

export class UserStore {
  constructor({ storageDir, allowedDomain, ownerEmail }) {
    this.file = path.join(storageDir, 'users.json')
    this.allowedDomain = allowedDomain
    this.ownerEmail = ownerEmail
  }

  /** Creates the list with Ethan as the only owner, but only if it isn't there yet. */
  async ensureFirstOwner() {
    if (await this.#exists()) return

    await fs.mkdir(path.dirname(this.file), { recursive: true })
    await fs.writeFile(
      this.file,
      JSON.stringify(
        [
          {
            email: this.ownerEmail.toLowerCase(),
            role: 'owner',
            addedBy: 'first start',
            addedAt: new Date().toISOString(),
          },
        ],
        null,
        2,
      ),
    )
  }

  async #exists() {
    try {
      await fs.access(this.file)
      return true
    } catch {
      return false
    }
  }

  async list() {
    try {
      const users = JSON.parse(await fs.readFile(this.file, 'utf8'))
      return Array.isArray(users) ? users : []
    } catch (error) {
      if (error.code !== 'ENOENT') {
        // A broken list must lock everyone out, not crash the server.
        console.warn(`[users] ignoring unreadable users.json: ${error.message}`)
      }
      return []
    }
  }

  async find(email) {
    if (typeof email !== 'string') return null
    const wanted = email.trim().toLowerCase()
    const users = await this.list()
    return users.find((user) => String(user.email).toLowerCase() === wanted) ?? null
  }
}
