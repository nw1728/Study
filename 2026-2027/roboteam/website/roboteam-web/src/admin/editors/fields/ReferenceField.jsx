import FieldShell from './FieldShell.jsx'
import styles from './fields.module.css'

/**
 * A pick from another content type: which subteam someone is in.
 *
 * A dropdown rather than a box, so a subteam that doesn't exist cannot be
 * typed — and renaming a subteam never orphans anybody, because what is
 * stored is its address, not its name.
 */
export default function ReferenceField({ field, value, error, options = [], onChange }) {
  // What is stored but no longer offered: a subteam that has been removed.
  const missing = value && !options.some((option) => option.value === value)

  return (
    <FieldShell field={field} error={error}>
      <select
        className={`${styles.select} ${error || missing ? styles.invalid : ''}`}
        value={value ?? ''}
        aria-invalid={error ? 'true' : undefined}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">—</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        {missing && <option value={value}>{value} (no longer exists)</option>}
      </select>
    </FieldShell>
  )
}
