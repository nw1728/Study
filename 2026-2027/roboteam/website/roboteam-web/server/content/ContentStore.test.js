import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { ContentStore } from './ContentStore.js'

const DEFAULTS = { events: [{ id: 'default-event', title: 'Default' }] }

/** A store on a throwaway directory, plus that directory. */
async function aStore() {
  const storageDir = await fs.mkdtemp(path.join(os.tmpdir(), 'rtt-store-'))
  return { store: new ContentStore({ storageDir, defaults: DEFAULTS }), storageDir }
}

test('read returns the default when no file exists', async () => {
  const { store } = await aStore()
  assert.deepEqual(await store.read('events'), DEFAULTS.events)
})

test('read returns the default when the file is corrupt JSON', async () => {
  const { store, storageDir } = await aStore()
  await fs.mkdir(path.join(storageDir, 'content'), { recursive: true })
  await fs.writeFile(path.join(storageDir, 'content', 'events.json'), '{oops')
  assert.deepEqual(await store.read('events'), DEFAULTS.events)
})

test('read returns the default when the file is valid JSON of the wrong shape', async () => {
  // Hand-editing these files is an expected workflow, and `{}` where a list
  // belongs used to reach a component's .map and unmount the whole site.
  const { store, storageDir } = await aStore()
  await fs.mkdir(path.join(storageDir, 'content'), { recursive: true })
  await fs.writeFile(path.join(storageDir, 'content', 'events.json'), '{}')
  assert.deepEqual(await store.read('events'), DEFAULTS.events)
})

test('write then read returns the written value', async () => {
  const { store } = await aStore()
  const value = [{ id: 'a', title: 'A' }]
  await store.write('events', value, 'ethan@roboteamtwente.nl')
  assert.deepEqual(await store.read('events'), value)
})

test('write records savedAt and savedBy in meta', async () => {
  const { store } = await aStore()
  await store.write('events', [], 'ethan@roboteamtwente.nl')
  const meta = await store.meta('events')
  assert.equal(meta.savedBy, 'ethan@roboteamtwente.nl')
  assert.ok(!Number.isNaN(Date.parse(meta.savedAt)))
})

test('write copies the previous version into history', async () => {
  const { store } = await aStore()
  await store.write('events', [{ id: 'first', title: 'First' }], 'a@roboteamtwente.nl')
  await store.write('events', [{ id: 'second', title: 'Second' }], 'b@roboteamtwente.nl')
  const history = await store.listHistory('events')
  assert.equal(history.length, 1)
  assert.equal(history[0].savedBy, 'a@roboteamtwente.nl')
})

test('the first write makes no history entry', async () => {
  const { store } = await aStore()
  await store.write('events', [], 'ethan@roboteamtwente.nl')
  assert.deepEqual(await store.listHistory('events'), [])
})

test('history keeps at most 30 versions', async () => {
  const { store } = await aStore()
  for (let i = 0; i < 32; i++) {
    await store.write('events', [{ id: `e${i}`, title: `E${i}` }], 'ethan@roboteamtwente.nl')
  }
  assert.equal((await store.listHistory('events')).length, 30)
})

test('restore brings an earlier value back', async () => {
  const { store } = await aStore()
  const first = [{ id: 'first', title: 'First' }]
  await store.write('events', first, 'a@roboteamtwente.nl')
  await store.write('events', [{ id: 'second', title: 'Second' }], 'b@roboteamtwente.nl')
  const [oldest] = await store.listHistory('events')
  await store.restore('events', oldest.version, 'c@roboteamtwente.nl')
  assert.deepEqual(await store.read('events'), first)
})

test('restore itself is a write, so it is undoable', async () => {
  const { store } = await aStore()
  await store.write('events', [{ id: 'first', title: 'First' }], 'a@roboteamtwente.nl')
  await store.write('events', [{ id: 'second', title: 'Second' }], 'b@roboteamtwente.nl')
  const before = await store.listHistory('events')
  const [oldest] = before
  await store.restore('events', oldest.version, 'c@roboteamtwente.nl')
  assert.equal((await store.listHistory('events')).length, before.length + 1)
})

test('write leaves no temp file behind', async () => {
  const { store, storageDir } = await aStore()
  await store.write('events', [], 'ethan@roboteamtwente.nl')
  const files = await fs.readdir(path.join(storageDir, 'content'))
  assert.equal(files.some((name) => name.includes('.tmp')), false)
})

test('a failed write leaves the previous file intact', async () => {
  const { store } = await aStore()
  const good = [{ id: 'good', title: 'Good' }]
  await store.write('events', good, 'ethan@roboteamtwente.nl')
  await assert.rejects(() => store.write('events', [{ nope: 1n }], 'ethan@roboteamtwente.nl'))
  assert.deepEqual(await store.read('events'), good)
})

test('readAll covers every known content type', async () => {
  const { store } = await aStore()
  assert.deepEqual(Object.keys(await store.readAll()), ['events'])
})
