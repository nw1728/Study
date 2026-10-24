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

test('rejects a non-string for a text field', () => {
  const result = validateContent('events', [anEvent({ title: { evil: 1 } })])
  assert.equal(result.ok, false)
  assert.ok(errorFor(result, 'title'))
})

test('rejects an array for a text field', () => {
  const result = validateContent('events', [anEvent({ place: ['a', 'b'] })])
  assert.equal(result.ok, false)
  assert.ok(errorFor(result, 'place'))
})

test('rejects a non-string for a select field', () => {
  const result = validateContent('events', [anEvent({ month: { toString: 'OCT' } })])
  assert.equal(result.ok, false)
  assert.ok(errorFor(result, 'month'))
})

test('stores text trimmed', () => {
  const result = validateContent('events', [anEvent({ title: '  Science Day  ' })])
  assert.equal(result.ok, true)
  assert.equal(result.value[0].title, 'Science Day')
})

test('rejects an image path that is neither a site path nor a link', () => {
  const result = validateContent('events', [anEvent({ image: 'javascript:alert(1)' })])
  assert.equal(result.ok, false)
  assert.ok(errorFor(result, 'image'))
})

test('accepts an image path under /images/', () => {
  const result = validateContent('events', [anEvent({ image: '/images/events/expo.jpg' })])
  assert.equal(result.ok, true, JSON.stringify(result.errors))
})

test('a single type stores one item, not a list', () => {
  const result = validateContent('contact', {
    email: 'info@roboteamtwente.nl',
    address: ['Future Factory', ' Capitool 25 '],
    mapsUrl: 'https://maps.app.goo.gl/x',
  })
  assert.equal(result.ok, true)
  assert.equal(Array.isArray(result.value), false)
  assert.deepEqual(result.value.address, ['Future Factory', 'Capitool 25'])
})

test('a single type refuses a list', () => {
  const result = validateContent('contact', [])
  assert.equal(result.ok, false)
  assert.match(result.errors[0].message, /one item/)
})

test('a single type reports a missing required field by name', () => {
  const result = validateContent('contact', { address: ['Future Factory'] })
  assert.equal(result.ok, false)
  assert.equal(result.errors[0].field, 'email')
})

test('a required list-of-text that is empty is reported by name', () => {
  const result = validateContent('contact', { email: 'a@b.nl', address: [] })
  assert.equal(result.ok, false)
  assert.equal(result.errors[0].field, 'address')
  assert.match(result.errors[0].message, /required/)
})

test('a partner with a logo and a website is stored whole', () => {
  const result = validateContent('partners', [
    { id: 'demcon', name: 'Demcon', logo: '/uploads/abc.png', url: 'https://demcon.com' },
  ])
  assert.equal(result.ok, true)
  assert.deepEqual(result.value[0], {
    id: 'demcon',
    name: 'Demcon',
    logo: '/uploads/abc.png',
    url: 'https://demcon.com',
  })
})

test('a partner without a logo or website is fine', () => {
  const result = validateContent('partners', [{ id: 'saxion', name: 'Saxion' }])
  assert.equal(result.ok, true)
  assert.deepEqual(result.value[0], { id: 'saxion', name: 'Saxion' })
})

test('a partner logo may not be an arbitrary path', () => {
  const result = validateContent('partners', [{ id: 'a', name: 'A', logo: '/etc/passwd' }])
  assert.equal(result.ok, false)
  assert.equal(result.errors[0].field, 'logo')
})

test('a nested error is reported with its path', () => {
  const result = validateContent('join', {
    intro: 'x',
    benefits: ['a'],
    steps: [{ title: 'Apply', text: 'Do it' }, { text: 'No title here' }],
    requirements: 'y',
    applyEmailTo: 'info@roboteamtwente.nl',
  })
  assert.equal(result.ok, false)
  assert.equal(
    result.errors.some((error) => error.field === 'steps[1].title'),
    true,
  )
})

test('a join page with everything filled in is stored whole', () => {
  const result = validateContent('join', {
    intro: 'x',
    benefits: [' a ', ''],
    cities: ['Nagoya'],
    steps: [{ title: ' Apply ', text: 'Do it', junk: 1 }],
    requirements: 'y',
    applyEmailTo: 'info@roboteamtwente.nl',
    waitingLists: [{ label: '2026–2027', href: 'https://example.com' }],
  })
  assert.equal(result.ok, true)
  assert.deepEqual(result.value.benefits, ['a'])
  assert.deepEqual(result.value.steps, [{ title: 'Apply', text: 'Do it' }])
})
