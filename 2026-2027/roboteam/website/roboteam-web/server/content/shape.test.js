import assert from 'node:assert/strict'
import test from 'node:test'
import { isWellShaped } from './shape.js'

test('a list of items is well shaped', () => {
  assert.equal(isWellShaped('events', []), true)
  assert.equal(isWellShaped('events', [{ title: 'Science Day' }]), true)
})

test('an object where a list belongs is not', () => {
  // The exact shape that used to blank every page of the site.
  assert.equal(isWellShaped('events', {}), false)
})

test('a list of things that are not items is not', () => {
  assert.equal(isWellShaped('events', [1, 2]), false)
  assert.equal(isWellShaped('events', [[]]), false)
  assert.equal(isWellShaped('events', [null]), false)
})

test('null and a string are never well shaped', () => {
  assert.equal(isWellShaped('events', null), false)
  assert.equal(isWellShaped('events', 'events'), false)
})

test('an unknown content type is never well shaped', () => {
  assert.equal(isWellShaped('fnord', []), false)
})
