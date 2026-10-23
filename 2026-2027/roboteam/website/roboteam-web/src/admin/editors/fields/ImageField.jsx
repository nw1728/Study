import { useRef, useState } from 'react'
import FieldShell from './FieldShell.jsx'
import { uploadImage } from '../../api.js'
import styles from './ImageField.module.css'

/**
 * A picture: choose one or drop it on the frame, see it straight away.
 *
 * Nobody types a path. What is stored is the path the server answers with,
 * and the pictures already in the repo (/images/…) keep working untouched.
 */
export default function ImageField({ field, value, error, onChange }) {
  const input = useRef(null)
  const [busy, setBusy] = useState(false)
  const [problem, setProblem] = useState(null)
  const [over, setOver] = useState(false)

  async function take(file) {
    if (!file) return
    setBusy(true)
    setProblem(null)
    const result = await uploadImage(file)
    setBusy(false)
    if (!result.ok) {
      setProblem(result.message)
      return
    }
    onChange(result.path)
  }

  return (
    <FieldShell field={field} error={error ?? problem}>
      <div
        className={`${styles.frame} ${over ? styles.over : ''} ${error || problem ? styles.invalid : ''}`}
        onDragOver={(event) => {
          event.preventDefault()
          setOver(true)
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(event) => {
          event.preventDefault()
          setOver(false)
          take(event.dataTransfer.files[0])
        }}
      >
        {value ? (
          <img src={value} alt="" className={styles.preview} />
        ) : (
          <span className={styles.empty}>{busy ? 'Uploading…' : 'No picture yet'}</span>
        )}
        {busy && value && <span className={styles.busy}>Uploading…</span>}
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.choose} onClick={() => input.current.click()} disabled={busy}>
          {value ? 'Replace' : 'Choose picture'}
        </button>
        {value && (
          <button type="button" className={styles.remove} onClick={() => onChange('')} disabled={busy}>
            Remove
          </button>
        )}
        <span className={styles.hint}>or drop one here · JPG, PNG, WEBP · up to 5 MB</span>
      </div>

      <input
        ref={input}
        className={styles.file}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={(event) => {
          take(event.target.files[0])
          // So choosing the same file twice in a row still counts.
          event.target.value = ''
        }}
      />
    </FieldShell>
  )
}
