import FieldShell from './FieldShell.jsx'
import styles from './fields.module.css'

export default function TextField({ field, value, error, onChange }) {
  return (
    <FieldShell field={field} error={error}>
      <input
        className={`${styles.input} ${error ? styles.invalid : ''}`}
        type={field.type === 'url' ? 'url' : 'text'}
        value={value ?? ''}
        placeholder={field.placeholder ?? ''}
        aria-invalid={error ? 'true' : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
    </FieldShell>
  )
}
