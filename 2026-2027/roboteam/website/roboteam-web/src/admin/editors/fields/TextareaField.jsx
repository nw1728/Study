import FieldShell from './FieldShell.jsx'
import styles from './fields.module.css'

export default function TextareaField({ field, value, error, onChange }) {
  return (
    <FieldShell field={field} error={error}>
      <textarea
        className={`${styles.textarea} ${error ? styles.invalid : ''}`}
        value={value ?? ''}
        placeholder={field.placeholder ?? ''}
        aria-invalid={error ? 'true' : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
    </FieldShell>
  )
}
