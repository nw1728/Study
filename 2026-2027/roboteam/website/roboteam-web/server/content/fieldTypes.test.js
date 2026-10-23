import assert from 'node:assert/strict'
import test from 'node:test'
import { cleanFields, fieldMessage, getFieldType, isBlankValue } from './fieldTypes.js'

/** Checks one value against a field description, the way validate.js does. */
function check(field, value) {
  return getFieldType(field.type).check(field, value)
}

function clean(field, value) {
  return getFieldType(field.type).clean(field, value)
}

test('an unknown field type is not a field type', () => {
  assert.equal(getFieldType('fnord'), undefined)
})

test('text accepts a string and refuses anything else', () => {
  assert.equal(check({ type: 'text', label: 'Title' }, 'Science Day'), null)
  assert.match(check({ type: 'text', label: 'Title' }, { a: 1 }), /must be text/)
})

test('text honours max', () => {
  assert.match(check({ type: 'text', label: 'Title', max: 3 }, 'abcd'), /at most 3/)
})

test('text is cleaned by trimming', () => {
  assert.equal(clean({ type: 'text' }, '  Science Day '), 'Science Day')
})

test('number refuses what is not a number and honours min and max', () => {
  assert.match(check({ type: 'number', label: 'Day' }, 'soon'), /must be a number/)
  assert.match(check({ type: 'number', label: 'Day', min: 1 }, 0), /at least 1/)
  assert.match(check({ type: 'number', label: 'Day', max: 31 }, 32), /at most 31/)
  assert.equal(check({ type: 'number', label: 'Day', min: 1, max: 31 }, 14), null)
})

test('number is cleaned into a number', () => {
  assert.equal(clean({ type: 'number' }, '14'), 14)
})

test('select only accepts one of its options', () => {
  const field = { type: 'select', label: 'Month', options: ['JAN', 'FEB'] }
  assert.equal(check(field, 'FEB'), null)
  assert.match(check(field, 'SMARCH'), /must be one of/)
})

test('url wants http or https', () => {
  assert.equal(check({ type: 'url', label: 'Link' }, 'https://example.com'), null)
  assert.match(check({ type: 'url', label: 'Link' }, 'javascript:alert(1)'), /http/)
  assert.match(check({ type: 'url', label: 'Link' }, 'not a link'), /valid link/)
})

test('image wants one of our own folders or an http link', () => {
  const field = { type: 'image', label: 'Photo' }
  assert.equal(check(field, '/images/members/erik-rusnak.jpg'), null)
  assert.equal(check(field, '/uploads/abc.png'), null)
  assert.equal(check(field, 'https://example.com/a.jpg'), null)
  assert.match(check(field, '/etc/passwd'), /path like/)
  assert.match(check(field, 'javascript:alert(1)'), /path like/)
})

test('blankness is about empty strings, not about zero', () => {
  assert.equal(isBlankValue(''), true)
  assert.equal(isBlankValue('   '), true)
  assert.equal(isBlankValue(undefined), true)
  assert.equal(isBlankValue(null), true)
  assert.equal(isBlankValue(0), false)
})

test('a field type nobody describes is refused by name', () => {
  // The trap this replaced: an unknown type used to fall through to the text
  // branch and call value.trim(), so a list value crashed the save with a 500.
  const message = fieldMessage({ name: 'x', label: 'Points', type: 'fnord' }, ['a'])
  assert.match(message, /fnord/)
})

test('a required field that is missing says so', () => {
  assert.match(fieldMessage({ label: 'Title', type: 'text', required: true }, ''), /required/)
})

test('an optional field that is missing is fine', () => {
  assert.equal(fieldMessage({ label: 'Note', type: 'text' }, ''), null)
})

test('cleanFields keeps only described fields and drops the empty ones', () => {
  const fields = [
    { name: 'title', label: 'Title', type: 'text' },
    { name: 'day', label: 'Day', type: 'number' },
    { name: 'note', label: 'Note', type: 'text' },
  ]
  const cleaned = cleanFields(fields, { title: ' Science Day ', day: '14', note: '  ', junk: 'x' })
  assert.deepEqual(cleaned, { title: 'Science Day', day: 14 })
})
