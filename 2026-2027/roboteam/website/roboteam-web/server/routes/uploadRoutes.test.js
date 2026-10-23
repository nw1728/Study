import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { createApp } from '../app.js'
import { loadConfig } from '../config.js'
import { ContentStore } from '../content/ContentStore.js'
import { UploadStore } from '../uploads/UploadStore.js'
import { UserStore } from '../users/UserStore.js'

const OWNER = 'e.bastian@roboteamtwente.nl'
const ORIGIN = 'http://localhost:3000'
const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x01, 0x02])

async function anApp(t) {
  const storageDir = await fs.mkdtemp(path.join(os.tmpdir(), 'rtt-upload-api-'))
  const config = loadConfig({
    PORT: '3000',
    PUBLIC_URL: ORIGIN,
    AUTH_MODE: 'dev',
    ALLOWED_DOMAIN: 'roboteamtwente.nl',
    OWNER_EMAIL: OWNER,
    SESSION_SECRET: 'x'.repeat(32),
    STORAGE_DIR: storageDir,
    NODE_ENV: 'development',
  })
  const store = new ContentStore({ storageDir, defaults: {} })
  const uploads = new UploadStore({ storageDir })
  const users = new UserStore({ storageDir, allowedDomain: config.allowedDomain, ownerEmail: OWNER })
  await users.ensureFirstOwner()

  const server = createApp({ config, store, users, uploads }).listen(0)
  await new Promise((resolve) => server.once('listening', resolve))
  t.after(() => new Promise((resolve) => server.close(resolve)))

  const base = `http://localhost:${server.address().port}`
  const signIn = await fetch(`${base}/auth/dev`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json', origin: ORIGIN },
    body: JSON.stringify({ email: OWNER }),
  })
  const cookie = (signIn.headers.getSetCookie?.() ?? [])[0]?.split(';')[0]
  return { base, cookie, storageDir }
}

function upload(base, bytes, { cookie, name = 'photo.jpg', type = 'image/jpeg' } = {}) {
  const body = new FormData()
  body.set('file', new Blob([bytes], { type }), name)
  return fetch(`${base}/api/uploads`, {
    method: 'POST',
    headers: { origin: ORIGIN, ...(cookie ? { cookie } : {}) },
    body,
  })
}

test('uploading needs a login', async (t) => {
  const { base } = await anApp(t)
  assert.equal((await upload(base, PNG)).status, 401)
})

test('a PNG is stored and then served back as a PNG', async (t) => {
  const { base, cookie } = await anApp(t)
  const response = await upload(base, PNG, { cookie })
  assert.equal(response.status, 200)

  const { path: stored } = await response.json()
  assert.match(stored, /^\/uploads\//)

  const served = await fetch(`${base}${stored}`)
  assert.equal(served.status, 200)
  assert.equal(served.headers.get('content-type'), 'image/png')
  assert.deepEqual(Buffer.from(await served.arrayBuffer()), PNG)
})

test('the name the browser sent is ignored: ours is random', async (t) => {
  const { base, cookie } = await anApp(t)
  const response = await upload(base, PNG, { cookie, name: '../../users.json' })
  const { path: stored } = await response.json()
  assert.match(stored, /^\/uploads\/[0-9a-f-]{36}\.png$/)
})

test('a text file called photo.jpg is refused, and nothing is written', async (t) => {
  const { base, cookie, storageDir } = await anApp(t)
  const response = await upload(base, Buffer.from('definitely not a picture'), { cookie })
  assert.equal(response.status, 415)
  assert.match((await response.json()).error, /JPG, PNG or WEBP/)
  await assert.rejects(fs.readdir(path.join(storageDir, 'uploads')))
})

test('an SVG is refused however it is labelled', async (t) => {
  const { base, cookie } = await anApp(t)
  const svg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><script>x</script></svg>')
  const response = await upload(base, svg, { cookie, name: 'logo.svg', type: 'image/svg+xml' })
  assert.equal(response.status, 415)
})

test('a picture larger than 5 MB is refused', async (t) => {
  const { base, cookie } = await anApp(t)
  const huge = Buffer.concat([PNG, Buffer.alloc(6 * 1024 * 1024)])
  const response = await upload(base, huge, { cookie })
  assert.equal(response.status, 413)
  assert.match((await response.json()).error, /5 MB/)
})

test('two uploads of the same bytes get different paths', async (t) => {
  const { base, cookie } = await anApp(t)
  const a = await (await upload(base, PNG, { cookie })).json()
  const b = await (await upload(base, PNG, { cookie })).json()
  assert.notEqual(a.path, b.path)
})

test('asking for a file outside the uploads folder gets nothing', async (t) => {
  const { base } = await anApp(t)
  assert.equal((await fetch(`${base}/uploads/..%2Fusers.json`)).status, 404)
  assert.equal((await fetch(`${base}/uploads/nope.png`)).status, 404)
})
