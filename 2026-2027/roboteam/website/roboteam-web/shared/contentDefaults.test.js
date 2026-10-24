import assert from 'node:assert/strict'
import test from 'node:test'
import { assertDefaultsComplete, contentDefaults } from './contentDefaults.js'
import { contentTypeIds } from './contentTypes/index.js'

test('every content type has a default', () => {
  for (const id of contentTypeIds) {
    assert.ok(contentDefaults[id] !== undefined, `no default for ${id}`)
  }
})

test('assertDefaultsComplete names what is missing', () => {
  assert.throws(() => assertDefaultsComplete({}, contentTypeIds), /events/)
})

test('assertDefaultsComplete passes for the real defaults', () => {
  assert.doesNotThrow(() => assertDefaultsComplete(contentDefaults, contentTypeIds))
})

test('every default passes its own description', async () => {
  // What an editor meets the moment they open a type and press Save without
  // changing anything. A default that cannot be saved is a trap.
  const { validateContent } = await import('../server/content/validate.js')
  for (const id of contentTypeIds) {
    const result = validateContent(id, contentDefaults[id])
    assert.ok(result.ok, `${id}: ${JSON.stringify(result.errors?.slice(0, 2))}`)
  }
})
