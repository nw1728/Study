import ItemForm from './ItemForm.jsx'
import styles from './ListEditor.module.css'

/**
 * One row of a list: the name, the up/down/remove buttons, and the form when
 * it is open.
 *
 * Its own file rather than a helper inside ListEditor, because a component
 * declared inside another one is a new component type on every render — the
 * box you are typing in would lose focus with each keystroke.
 */
export default function ListItem({
  type,
  item,
  open,
  errors,
  refs,
  first,
  last,
  onToggle,
  onChange,
  onMove,
  onRemove,
}) {
  const flag = type.itemFlag?.(item)
  const name = type.itemLabel(item) || 'item'

  return (
    <article className={styles.item}>
      <div className={styles.head}>
        <button type="button" className={styles.toggle} aria-expanded={open} onClick={onToggle}>
          <span className={styles.caret} aria-hidden="true">
            {open ? '▾' : '▸'}
          </span>
          <span className={styles.name}>
            {type.itemLabel(item) || <em className={styles.untitled}>Untitled</em>}
          </span>
          {errors && <span className={styles.flag}>needs attention</span>}
          {/* Not an error: a quiet note that something is still missing. */}
          {!errors && flag && <span className={styles.note}>{flag}</span>}
        </button>

        <div className={styles.actions}>
          {/* Buttons, not drag handles: these work with a keyboard too. */}
          <button type="button" onClick={() => onMove(-1)} disabled={first} aria-label={`Move ${name} up`}>
            ↑
          </button>
          <button type="button" onClick={() => onMove(1)} disabled={last} aria-label={`Move ${name} down`}>
            ↓
          </button>
          <button
            type="button"
            className={styles.remove}
            onClick={onRemove}
            aria-label={`Remove ${name}`}
          >
            ✕
          </button>
        </div>
      </div>

      {open && (
        <ItemForm type={type} item={item} errors={errors} refs={refs} onChange={onChange} />
      )}
    </article>
  )
}
