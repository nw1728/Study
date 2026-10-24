import assert from 'node:assert/strict'
import test from 'node:test'
import { groupedOrder, neighbourInGroup } from './grouping.js'

const groupBy = { field: 'subteam', from: 'subteams', emptyLabel: 'No subteam' }
const options = [
  { value: 'management', label: 'Management' },
  { value: 'mechanical', label: 'Mechanical' },
]
const items = [
  { name: 'Marijn', subteam: 'management' },
  { name: 'Myrto', subteam: 'mechanical' },
  { name: 'Zodi', subteam: 'management' },
  { name: 'Erik', subteam: 'mechanical' },
]

test('items are grouped in the order the groups are listed', () => {
  const groups = groupedOrder(items, groupBy, options)
  assert.deepEqual(
    groups.map((group) => [group.label, group.indexes]),
    [
      ['Management', [0, 2]],
      ['Mechanical', [1, 3]],
    ],
  )
})

test('a group with nobody in it is still shown', () => {
  const groups = groupedOrder([], groupBy, options)
  assert.deepEqual(groups.map((group) => group.indexes), [[], []])
})

test('someone whose group no longer exists lands in a last group', () => {
  const orphan = [...items, { name: 'Lost', subteam: 'a-subteam-that-was-renamed' }]
  const groups = groupedOrder(orphan, groupBy, options)
  const last = groups.at(-1)
  assert.equal(last.label, 'No subteam')
  assert.deepEqual(last.indexes, [4])
})

test('someone with no group at all lands there too', () => {
  const groups = groupedOrder([{ name: 'New' }], groupBy, options)
  assert.deepEqual(groups.at(-1).indexes, [0])
})

test('moving down swaps with the next one in the same group', () => {
  // Marijn (0) and Zodi (2) are both in management: down from 0 is 2, not 1.
  assert.equal(neighbourInGroup(items, groupBy, 0, 1), 2)
})

test('moving up swaps with the previous one in the same group', () => {
  assert.equal(neighbourInGroup(items, groupBy, 3, -1), 1)
})

test('moving past the end of a group does nothing', () => {
  assert.equal(neighbourInGroup(items, groupBy, 2, 1), null)
  assert.equal(neighbourInGroup(items, groupBy, 0, -1), null)
})
