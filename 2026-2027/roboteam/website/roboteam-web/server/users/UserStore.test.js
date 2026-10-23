import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { UserStore } from './UserStore.js'

const OWNER = 'e.bastian@roboteamtwente.nl'

async function aStore() {
  const storageDir = await fs.mkdtemp(path.join(os.tmpdir(), 'rtt-users-'))
  const store = new UserStore({
    storageDir,
    allowedDomain: 'roboteamtwente.nl',
    ownerEmail: OWNER,
  })
  return { store, storageDir }
}

test('ensureFirstOwner creates the file with one owner', async () => {
  const { store } = await aStore()
  await store.ensureFirstOwner()
  const users = await store.list()
  assert.equal(users.length, 1)
  assert.equal(users[0].email, OWNER)
  assert.equal(users[0].role, 'owner')
})

test('ensureFirstOwner does not overwrite an existing list', async () => {
  const { store, storageDir } = await aStore()
  await fs.writeFile(
    path.join(storageDir, 'users.json'),
    JSON.stringify([{ email: 'someone@roboteamtwente.nl', role: 'editor' }]),
  )
  await store.ensureFirstOwner()
  const users = await store.list()
  assert.equal(users.length, 1)
  assert.equal(users[0].email, 'someone@roboteamtwente.nl')
})

test('find is case-insensitive', async () => {
  const { store } = await aStore()
  await store.ensureFirstOwner()
  const found = await store.find('E.Bastian@RoboTeamTwente.nl')
  assert.equal(found.email, OWNER)
})

test('find returns null for someone not on the list', async () => {
  const { store } = await aStore()
  await store.ensureFirstOwner()
  assert.equal(await store.find('stranger@roboteamtwente.nl'), null)
})

test('find returns null when the list file is corrupt', async () => {
  const { store, storageDir } = await aStore()
  await fs.writeFile(path.join(storageDir, 'users.json'), '{broken')
  assert.equal(await store.find(OWNER), null)
})
