import { useState } from 'react'
import ListItem from './ListItem.jsx'
import { groupedOrder, neighbourInGroup } from './grouping.js'
import styles from './ListEditor.module.css'

/** Swaps the items at `from` and `to`, without changing the original array. */
function swapped(items, from, to) {
  const copy = [...items]
  ;[copy[from], copy[to]] = [copy[to], copy[from]]
  return copy
}

/** Moves the item at `from` to `to`, without changing the original array. */
function moved(items, from, to) {
  const copy = [...items]
  const [item] = copy.splice(from, 1)
  copy.splice(to, 0, item)
  return copy
}

export default function ListEditor({ type, items, errors, refs = {}, onChange }) {
  const [openIndex, setOpenIndex] = useState(0)

  // A type can ask to be *shown* in groups while staying one flat list on
  // disk: members under their subteam. The choices come from that other type.
  const groupBy = type.groupBy
  const options = groupBy ? (refs[groupBy.from] ?? []) : []

  function update(index, item) {
    const next = items.map((existing, i) => (i === index ? item : existing))
    if (!groupBy || item[groupBy.field] === items[index][groupBy.field]) {
      return onChange(next)
    }

    // Changing which group someone is in moves them to the end of it, so they
    // appear where you just sent them rather than somewhere in the middle.
    const group = groupedOrder(next, groupBy, options).find(
      (candidate) => candidate.key === (item[groupBy.field] || null),
    )
    const to = group?.indexes.at(-1) ?? next.length - 1
    onChange(moved(next, index, to))
    setOpenIndex(to)
  }

  function add(groupKey) {
    // A new item starts in the group whose own Add button was pressed.
    const blank = groupBy && groupKey ? { [groupBy.field]: groupKey } : {}
    onChange([...items, blank])
    setOpenIndex(items.length)
  }

  function remove(index) {
    const label = type.itemLabel(items[index]) || 'this item'
    if (!confirm(`Remove ${label}? This can be undone until you save.`)) return
    onChange(items.filter((_, i) => i !== index))
  }

  function move(index, by) {
    // Inside a group, up and down mean "past the others in this group".
    if (groupBy) {
      const to = neighbourInGroup(items, groupBy, index, by)
      if (to === null) return
      onChange(swapped(items, index, to))
      setOpenIndex(to)
      return
    }

    const to = index + by
    if (to < 0 || to >= items.length) return
    onChange(moved(items, index, to))
    setOpenIndex(to)
  }

  /** The props every row needs, wherever it is drawn. */
  function rowProps(index, first, last) {
    return {
      type,
      item: items[index],
      open: openIndex === index,
      errors: errors?.[index],
      refs,
      first,
      last,
      onToggle: () => setOpenIndex(openIndex === index ? -1 : index),
      onChange: (next) => update(index, next),
      onMove: (by) => move(index, by),
      onRemove: () => remove(index),
    }
  }

  if (groupBy) {
    const groups = groupedOrder(items, groupBy, options)

    return (
      <div className={styles.list}>
        {groups.map((group) => (
          <section key={group.key ?? 'none'} className={styles.group}>
            <h2 className={styles.groupName}>
              {group.label}
              <span className={styles.count}>{group.indexes.length}</span>
            </h2>

            {group.indexes.map((index, at) => (
              <ListItem
                key={items[index].id ?? `new-${index}`}
                {...rowProps(index, at === 0, at === group.indexes.length - 1)}
              />
            ))}

            <button type="button" className={styles.addSmall} onClick={() => add(group.key)}>
              + Add to {group.label.toLowerCase()}
            </button>
          </section>
        ))}
      </div>
    )
  }

  return (
    <div className={styles.list}>
      {items.length === 0 && (
        <p className={styles.empty}>Nothing here yet. Add the first one below.</p>
      )}

      {items.map((item, index) => (
        <ListItem
          key={item.id ?? item.slug ?? `new-${index}`}
          {...rowProps(index, index === 0, index === items.length - 1)}
        />
      ))}

      <button type="button" className={styles.add} onClick={() => add(null)}>
        + Add {type.label.replace(/s$/, '').toLowerCase()}
      </button>
    </div>
  )
}
