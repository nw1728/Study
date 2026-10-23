import assert from 'node:assert/strict'
import test from 'node:test'
import { events as realEvents } from '../../src/data/events.js'
import { validateContent } from './validate.js'

/** A valid event, as a starting point each test bends out of shape. */
function anEvent(overrides = {}) {
  return {
    id: 'science-day-tu-delft-2026',
    day: 25,
    month: 'OCT',
    title: 'Science Day TU Delft',
    place: 'TU Delft Science Centre',
    time: '11:00 – 17:00',
    ...overrides,
  }
}

/** The first error reported for a field, or undefined. */
function errorFor(result, field) {
  return result.errors.find((error) => error.field === field)
}

test('accepts the current events data', () => {
  const result = validateContent('events', realEvents)
  assert.equal(result.ok, true, JSON.stringify(result.errors))
  assert.equal(result.value.length, 2)
})

test('rejects a missing required title', () => {
  const result = validateContent('events', [anEvent({ title: '' })])
  assert.equal(result.ok, false)
  assert.deepEqual(
    { index: result.errors[0].index, field: result.errors[0].field },
    { index: 0, field: 'title' },
  )
  assert.match(result.errors[0].message, /required/i)
})

test('rejects a day outside 1-31', () => {
  const result = validateContent('events', [anEvent({ day: 32 })])
  assert.equal(result.ok, false)
  assert.ok(errorFor(result, 'day'))
})

test('rejects a month outside the twelve options', () => {
  const result = validateContent('events', [anEvent({ month: 'OKT' })])
  assert.equal(result.ok, false)
  assert.ok(errorFor(result, 'month'))
})

test('rejects a title over 80 characters', () => {
  const result = validateContent('events', [anEvent({ title: 'x'.repeat(81) })])
  assert.equal(result.ok, false)
  assert.ok(errorFor(result, 'title'))
})

test('rejects a registerUrl that is not http(s)', () => {
  const result = validateContent('events', [anEvent({ registerUrl: 'javascript:alert(1)' })])
  assert.equal(result.ok, false)
  assert.ok(errorFor(result, 'registerUrl'))
})

test('rejects a duplicate id', () => {
  const result = validateContent('events', [anEvent(), anEvent({ title: 'Another' })])
  assert.equal(result.ok, false)
  assert.deepEqual(
    { index: result.errors[0].index, field: result.errors[0].field },
    { index: 1, field: 'id' },
  )
})

test('rejects a non-array for a list type', () => {
  const result = validateContent('events', { not: 'a list' })
  assert.equal(result.ok, false)
  assert.equal(result.errors[0].index, null)
})

test('accepts an empty list', () => {
  const result = validateContent('events', [])
  assert.equal(result.ok, true)
  assert.deepEqual(result.value, [])
})

test('rejects an unknown content type', () => {
  const result = validateContent('nope', [])
  assert.equal(result.ok, false)
})

test('strips fields not in the description', () => {
  const result = validateContent('events', [anEvent({ evil: '<script>' })])
  assert.equal(result.ok, true)
  assert.equal('evil' in result.value[0], false)
})
