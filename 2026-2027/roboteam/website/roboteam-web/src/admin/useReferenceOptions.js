import { useEffect, useState } from 'react'
import { getContent } from './api.js'

/** Which other types a description points at: reference fields, and grouping. */
function referencedTypes(type) {
  const fromFields = (type.fields ?? [])
    .filter((field) => field.type === 'reference')
    .map((field) => field.refType)
  return [...new Set([...fromFields, type.groupBy?.from].filter(Boolean))]
}

/**
 * The choices for every dropdown that points at another content type, e.g.
 * the subteams a member can belong to: `{ subteams: [{ value, label }] }`.
 *
 * Fetched here rather than in the field itself, so one list is loaded once
 * however many members are on screen.
 */
export function useReferenceOptions(type) {
  const [options, setOptions] = useState({})

  useEffect(() => {
    let cancelled = false

    Promise.all(
      referencedTypes(type).map(async (id) => {
        const items = await getContent(id)
        const field = (type.fields ?? []).find((candidate) => candidate.refType === id)
        const value = field?.refValue ?? type.groupBy?.value ?? 'id'
        const label = field?.refLabel ?? type.groupBy?.label ?? 'name'
        return [id, items.map((item) => ({ value: item[value], label: item[label] }))]
      }),
    )
      .then((entries) => {
        if (!cancelled) setOptions(Object.fromEntries(entries))
      })
      .catch(() => {
        // A dropdown with no choices is better than a page that won't load;
        // the field says so itself.
      })

    return () => {
      cancelled = true
    }
  }, [type])

  return options
}
