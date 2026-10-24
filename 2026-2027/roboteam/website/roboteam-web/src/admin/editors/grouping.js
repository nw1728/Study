// Showing a flat list in groups, without storing it in groups.
//
// Members are one list on disk — that is what makes a changeover quick — but
// an editor wants to see them under their subteam. These two functions are
// the whole of that: which indexes belong under which heading, and which
// index an up/down button should swap with.

/** The group an item belongs to, or null when it belongs to none we know. */
function keyOf(item, groupBy, options) {
  const value = item[groupBy.field]
  return options.some((option) => option.value === value) ? value : null
}

/**
 * The display order: one entry per group, in the order the groups themselves
 * are listed, each with the indexes of its items in the stored list. A group
 * with nobody in it still appears, so you can add someone to it.
 *
 * Anyone whose group has gone — a renamed subteam — gathers in a last group
 * rather than disappearing from the editor.
 */
export function groupedOrder(items, groupBy, options) {
  const groups = options.map((option) => ({
    key: option.value,
    label: option.label,
    indexes: [],
  }))
  const orphans = { key: null, label: groupBy.emptyLabel ?? 'No group', indexes: [] }

  items.forEach((item, index) => {
    const key = keyOf(item, groupBy, options)
    const group = groups.find((candidate) => candidate.key === key) ?? orphans
    group.indexes.push(index)
  })

  return orphans.indexes.length > 0 ? [...groups, orphans] : groups
}

/**
 * The index to swap with when moving an item one step up or down *within its
 * own group*, or null when it is already at that end of its group.
 */
export function neighbourInGroup(items, groupBy, index, by) {
  const mine = items[index][groupBy.field] ?? null

  for (let at = index + by; at >= 0 && at < items.length; at += by) {
    if ((items[at][groupBy.field] ?? null) === mine) return at
  }
  return null
}
