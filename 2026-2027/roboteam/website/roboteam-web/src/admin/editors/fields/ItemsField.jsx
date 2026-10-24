import FieldShell from './FieldShell.jsx'
import ItemForm from '../ItemForm.jsx'
import styles from './ItemsField.module.css'

/** Moves the row at `from` to `to`, without changing the original array. */
function moved(rows, from, to) {
  const copy = [...rows]
  const [row] = copy.splice(from, 1)
  copy.splice(to, 0, row)
  return copy
}

/**
 * The errors belonging to one nested row, with the path taken off the front.
 *
 * The server reports them flat — `steps[0].title` — so this turns them back
 * into the `{ title: '…' }` shape an ItemForm expects.
 */
function errorsForRow(errors, name, index) {
  if (!errors) return undefined
  const prefix = `${name}[${index}].`
  const mine = Object.entries(errors).filter(([key]) => key.startsWith(prefix))
  if (mine.length === 0) return undefined
  return Object.fromEntries(mine.map(([key, message]) => [key.slice(prefix.length), message]))
}

/**
 * A list of items with their own fields, inside one item: the ways in on the
 * join page, the activities inside an education tab.
 *
 * Always open, never folded — a nested row holds two or three boxes, and
 * hiding them behind another click would be worse than showing them.
 */
export default function ItemsField({ field, value, errors, refs, onChange }) {
  const rows = Array.isArray(value) ? value : []
  const label = (row, index) => field.itemLabel?.(row) || `${index + 1}`

  function move(index, by) {
    const to = index + by
    if (to < 0 || to >= rows.length) return
    onChange(moved(rows, index, to))
  }

  function remove(index) {
    if (!confirm(`Remove ${label(rows[index], index)}? This can be undone until you save.`)) return
    onChange(rows.filter((_, i) => i !== index))
  }

  return (
    <FieldShell field={field}>
      <div className={styles.rows}>
        {rows.map((row, index) => (
          // Nested rows have no id of their own; their position is what they are.
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className={styles.row}>
            <div className={styles.bar}>
              <span className={styles.name}>{label(row, index)}</span>
              <div className={styles.actions}>
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  aria-label={`Move ${label(row, index)} up`}
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === rows.length - 1}
                  aria-label={`Move ${label(row, index)} down`}
                >
                  ↓
                </button>
                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => remove(index)}
                  aria-label={`Remove ${label(row, index)}`}
                >
                  ✕
                </button>
              </div>
            </div>

            <ItemForm
              type={field}
              item={row}
              errors={errorsForRow(errors, field.name, index)}
              refs={refs}
              onChange={(next) => onChange(rows.map((old, i) => (i === index ? next : old)))}
            />
          </div>
        ))}

        <button type="button" className={styles.add} onClick={() => onChange([...rows, {}])}>
          + Add {field.addLabel ?? field.label.replace(/s$/, '').toLowerCase()}
        </button>
      </div>
    </FieldShell>
  )
}
