import FieldShell from './FieldShell.jsx'
import styles from './fields.module.css'

export default function NumberField({ field, value, error, onChange }) {
  return (
    <FieldShell field={field} error={error}>
      <input
        className={`${styles.input} ${error ? styles.invalid : ''}`}
        type="number"
        value={value ?? ''}
        min={field.min}
        max={field.max}
        aria-invalid={error ? 'true' : undefined}
        // Kept as text while typing so clearing the box doesn't become 0.
        onChange={(event) => onChange(event.target.value === '' ? '' : Number(event.target.value))}
      />
    </FieldShell>
  )
}
