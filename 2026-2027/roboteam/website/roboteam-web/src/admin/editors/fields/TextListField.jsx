import FieldShell from './FieldShell.jsx'
import fieldStyles from './fields.module.css'
import styles from './TextListField.module.css'

/** Moves the row at `from` to `to`, without changing the original array. */
function moved(rows, from, to) {
  const copy = [...rows]
  const [row] = copy.splice(from, 1)
  copy.splice(to, 0, row)
  return copy
}

/**
 * A list of plain lines: partner names, address lines, bullet points.
 *
 * No field names and no folding — a row is one box. Empty rows are allowed
 * while typing and dropped when the server stores the list.
 */
export default function TextListField({ field, value, error, onChange }) {
  const rows = Array.isArray(value) ? value : []

  function set(index, text) {
    onChange(rows.map((row, i) => (i === index ? text : row)))
  }

  function move(index, by) {
    const to = index + by
    if (to < 0 || to >= rows.length) return
    onChange(moved(rows, index, to))
  }

  return (
    <FieldShell field={field} error={error}>
      <div className={styles.rows}>
        {rows.map((row, index) => (
          // The index is the identity here: these rows have nothing else, and
          // two partners can legitimately be typed the same for a moment.
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className={styles.row}>
            <input
              className={`${fieldStyles.input} ${error ? fieldStyles.invalid : ''}`}
              type="text"
              value={row ?? ''}
              placeholder={field.placeholder ?? ''}
              onChange={(event) => set(index, event.target.value)}
            />
            <div className={styles.actions}>
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                aria-label={`Move row ${index + 1} up`}
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === rows.length - 1}
                aria-label={`Move row ${index + 1} down`}
              >
                ↓
              </button>
              <button
                type="button"
                className={styles.remove}
                onClick={() => onChange(rows.filter((_, i) => i !== index))}
                aria-label={`Remove row ${index + 1}`}
              >
                ✕
              </button>
            </div>
          </div>
        ))}

        <button type="button" className={styles.add} onClick={() => onChange([...rows, ''])}>
          + Add row
        </button>
      </div>
    </FieldShell>
  )
}
