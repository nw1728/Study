import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { UploadStore } from './UploadStore.js'

const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])

async function aStore() {
  const storageDir = await fs.mkdtemp(path.join(os.tmpdir(), 'rtt-uploads-'))
  return { store: new UploadStore({ storageDir }), storageDir }
}

test('save writes the file and answers the path the site uses', async () => {
  const { store, storageDir } = await aStore()
  const saved = await store.save(PNG, 'png')
  assert.match(saved.path, /^\/uploads\/[0-9a-f-]{36}\.png$/)
  assert.deepEqual(await fs.readFile(path.join(storageDir, 'uploads', saved.name)), PNG)
})

test('two saves of identical bytes never collide', async () => {
  const { store } = await aStore()
  const a = await store.save(PNG, 'png')
  const b = await store.save(PNG, 'png')
  assert.notEqual(a.path, b.path)
})

test('the stored name is ours, so it can carry no path', async () => {
  const { store } = await aStore()
  const saved = await store.save(PNG, 'png')
  assert.equal(path.basename(saved.name), saved.name)
})

test('fileFor refuses a name that walks out of the folder', async () => {
  const { store } = await aStore()
  assert.equal(store.fileFor('../users.json'), null)
  assert.equal(store.fileFor('a/b.png'), null)
  assert.equal(store.fileFor(''), null)
  assert.equal(store.fileFor(undefined), null)
})

test('read returns null for a file that is not there', async () => {
  const { store } = await aStore()
  assert.equal(await store.read('nope.png'), null)
})
