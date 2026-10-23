import { useState } from 'react'
import ItemForm from './ItemForm.jsx'
import styles from './ListEditor.module.css'

/** Moves the item at `from` to `to`, without changing the original array. */
function moved(items, from, to) {
  const copy = [...items]
  const [item] = copy.splice(from, 1)
  copy.splice(to, 0, item)
  return copy
}

export default function ListEditor({ type, items, errors, onChange }) {
  const [openIndex, setOpenIndex] = useState(0)

  function update(index, item) {
    onChange(items.map((existing, i) => (i === index ? item : existing)))
  }

  function add() {
    onChange([...items, {}])
    setOpenIndex(items.length)
  }

  function remove(index) {
    const label = type.itemLabel(items[index]) || 'this item'
    if (!confirm(`Remove ${label}? This can be undone until you save.`)) return
    onChange(items.filter((_, i) => i !== index))
  }

  function move(index, by) {
    const to = index + by
    if (to < 0 || to >= items.length) return
    onChange(moved(items, index, to))
    setOpenIndex(to)
  }

  return (
    <div className={styles.list}>
      {items.length === 0 && (
        <p className={styles.empty}>Nothing here yet. Add the first one below.</p>
      )}

      {items.map((item, index) => {
        const open = openIndex === index
        const itemErrors = errors?.[index]
        return (
          <article key={item.id ?? `new-${index}`} className={styles.item}>
            <div className={styles.head}>
              <button
                type="button"
                className={styles.toggle}
                aria-expanded={open}
                onClick={() => setOpenIndex(open ? -1 : index)}
              >
                <span className={styles.caret} aria-hidden="true">
                  {open ? '▾' : '▸'}
                </span>
                <span className={styles.name}>
                  {type.itemLabel(item) || <em className={styles.untitled}>Untitled</em>}
                </span>
                {itemErrors && <span className={styles.flag}>needs attention</span>}
              </button>

              <div className={styles.actions}>
                {/* Buttons, not drag handles: these work with a keyboard too. */}
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  aria-label={`Move ${type.itemLabel(item) || 'item'} up`}
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === items.length - 1}
                  aria-label={`Move ${type.itemLabel(item) || 'item'} down`}
                >
                  ↓
                </button>
                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => remove(index)}
                  aria-label={`Remove ${type.itemLabel(item) || 'item'}`}
                >
                  ✕
                </button>
              </div>
            </div>

            {open && (
              <ItemForm
                type={type}
                item={item}
                errors={itemErrors}
                onChange={(next) => update(index, next)}
              />
            )}
          </article>
        )
      })}

      <button type="button" className={styles.add} onClick={add}>
        + Add {type.label.replace(/s$/, '').toLowerCase()}
      </button>
    </div>
  )
}
