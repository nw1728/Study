// Starts the server. The only file that listens on a port.
import fs from 'node:fs'
import path from 'node:path'
import express from 'express'
import { createApp } from './app.js'
import { loadConfig, loadEnvFile } from './config.js'
import { ContentStore } from './content/ContentStore.js'
import { loadDefaults } from './content/seed.js'
import { UserStore } from './users/UserStore.js'

const ROOT = path.resolve(import.meta.dirname, '..')

loadEnvFile()

// A bad setting stops us here, with a message naming it, rather than on the
// first request. In particular: AUTH_MODE=dev can never meet production.
const config = loadConfig()

const defaults = await loadDefaults()
const store = new ContentStore({ storageDir: config.storageDir, defaults })
const users = new UserStore({
  storageDir: config.storageDir,
  allowedDomain: config.allowedDomain,
  ownerEmail: config.ownerEmail,
})
await users.ensureFirstOwner()

const app = createApp({ config, store, users })

if (config.isProduction) {
  const dist = path.join(ROOT, 'dist')
  if (!fs.existsSync(dist)) {
    throw new Error(`No built site at ${dist}. Run "npm run build" first.`)
  }

  app.use(express.static(dist, { index: false }))
  app.get('/admin{/*path}', (req, res) => res.sendFile(path.join(dist, 'admin.html')))

  // Single-page fallback: every other address is answered with index.html so
  // React Router can show the right page. Without this, /join breaks on refresh.
  app.use((req, res, next) => {
    if (req.method !== 'GET') return next()
    if (/^\/(api|auth|uploads)\b/.test(req.path)) return next()
    res.sendFile(path.join(dist, 'index.html'))
  })
}

app.listen(config.port, () => {
  console.log(`RoboTeam site server on http://localhost:${config.port}`)
  console.log(`  content: ${config.storageDir}`)
  if (config.authMode === 'dev') {
    console.log('')
    console.log('  ############################################################')
    console.log('  #  AUTH_MODE=dev — the DEVELOPMENT login door is mounted.  #')
    console.log('  #  Anyone who can reach this server can sign in as any     #')
    console.log(`  #  @${config.allowedDomain} address on the access list.`.padEnd(60) + '#')
    console.log('  #  Set AUTH_MODE=google before this goes anywhere real.    #')
    console.log('  ############################################################')
    console.log('')
  }
})
