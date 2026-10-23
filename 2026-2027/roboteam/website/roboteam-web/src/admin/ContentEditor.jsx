import { useEffect, useState } from 'react'
import ItemForm from './editors/ItemForm.jsx'
import ListEditor from './editors/ListEditor.jsx'
import { withGeneratedIds } from './editors/generateIds.js'
import { getContent, getMeta, putContent } from './api.js'
import styles from './ContentEditor.module.css'

/** Turns the server's flat error list into errors[index][field]. */
function byItem(errors) {
  const byIndex = {}
  const general = []
  for (const error of errors) {
    if (error.index === null || error.field === null) {
      general.push(error.message)
      continue
    }
    byIndex[error.index] ??= {}
    byIndex[error.index][error.field] = error.message
  }
  return { byIndex, general }
}

function when(iso) {
  if (!iso) return null
  return new Date(iso).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function ContentEditor({ type }) {
  const [items, setItems] = useState(null)
  const [dirty, setDirty] = useState(false)
  const [errors, setErrors] = useState({ byIndex: {}, general: [] })
  const [meta, setMeta] = useState({ savedAt: null, savedBy: null })
  const [saving, setSaving] = useState(false)

  // AdminApp gives this component a key per content type, so switching type
  // remounts it with fresh state rather than clearing state in an effect.
  useEffect(() => {
    getContent(type.id).then(setItems)
    getMeta(type.id).then(setMeta)
  }, [type])

  // Nobody should lose ten minutes of typing to a stray tab close.
  useEffect(() => {
    if (!dirty) return
    const warn = (event) => event.preventDefault()
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  async function save() {
    setSaving(true)
    // Only a list has ids to fill in: a single item and a list of plain lines
    // have nothing to be known by.
    const toSave = type.kind === 'list' ? withGeneratedIds(type, items) : items
    const result = await putContent(type.id, toSave)
    setSaving(false)

    if (!result.ok) {
      setErrors(byItem(result.errors))
      return
    }

    setItems(toSave)
    setErrors({ byIndex: {}, general: [] })
    setDirty(false)
    setMeta({ savedAt: result.savedAt, savedBy: result.savedBy })
  }

  function change(next) {
    setItems(next)
    setDirty(true)
  }

  if (!items) return <p className={styles.loading}>Loading {type.label.toLowerCase()}…</p>

  return (
    <section className={styles.editor}>
      <header className={styles.head}>
        <h1 className={styles.title}>
          {type.label}
          {dirty && <span className={styles.dot} title="Unsaved changes" />}
        </h1>
        <button type="button" className={styles.save} onClick={save} disabled={!dirty || saving}>
          {saving ? 'Saving…' : 'Save'}
        </button>
      </header>

      {errors.general.length > 0 && (
        <div className={styles.problem}>
          {errors.general.map((message) => (
            <p key={message}>{message}</p>
          ))}
        </div>
      )}

      {type.kind === 'single' && (
        <ItemForm type={type} item={items} errors={errors.byIndex[0]} onChange={change} />
      )}

      {type.kind === 'list' && (
        <ListEditor type={type} items={items} errors={errors.byIndex} onChange={change} />
      )}

      <p className={styles.meta}>
        {meta.savedBy
          ? `Last saved by ${meta.savedBy} · ${when(meta.savedAt)}`
          : 'Not saved through the admin yet — showing what the site ships with.'}
      </p>
    </section>
  )
}
