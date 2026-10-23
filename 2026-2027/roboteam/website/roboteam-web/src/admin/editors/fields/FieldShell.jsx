import styles from './fields.module.css'

/** The label, the error and the layout every field shares. */
export default function FieldShell({ field, error, children }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>
        {field.label}
        {field.required && <span className={styles.required}> *</span>}
      </span>
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </label>
  )
}
