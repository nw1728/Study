import FieldShell from './FieldShell.jsx'
import styles from './fields.module.css'

export default function SelectField({ field, value, error, onChange }) {
  return (
    <FieldShell field={field} error={error}>
      <select
        className={`${styles.select} ${error ? styles.invalid : ''}`}
        value={value ?? ''}
        aria-invalid={error ? 'true' : undefined}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">—</option>
        {field.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  )
}
