// Checks content against its description before it is allowed onto disk.
// Every error is collected, so the admin page can show them all at once
// instead of one per save.
import { getContentType } from '../../shared/contentTypes/index.js'
import { cleanFields, fieldMessage, isBlankValue } from './fieldTypes.js'

function refuse(message) {
  return { ok: false, errors: [{ index: null, field: null, message }] }
}

export function validateContent(typeId, value) {
  const type = getContentType(typeId)
  if (!type) return refuse(`Unknown content type: ${typeId}`)

  if (type.kind === 'list' && !Array.isArray(value)) {
    return refuse(`${type.label} must be a list`)
  }

  // One item rather than a list: contact, join, the education intro.
  if (type.kind === 'single' && Array.isArray(value)) {
    return refuse(`${type.label} is one item, not a list`)
  }

  const items = type.kind === 'list' ? value : [value]
  const errors = []
  const seenIds = new Set()

  items.forEach((item, index) => {
    if (item === null || typeof item !== 'object' || Array.isArray(item)) {
      errors.push({ index, field: null, message: 'Each item must be a set of fields' })
      return
    }

    for (const field of type.fields) {
      const message = fieldMessage(field, item[field.name])
      if (message) errors.push({ index, field: field.name, message })
    }

    if (!isBlankValue(item.id)) {
      if (seenIds.has(item.id)) {
        errors.push({ index, field: 'id', message: `Two items share the id "${item.id}"` })
      }
      seenIds.add(item.id)
    }
  })

  if (errors.length > 0) return { ok: false, errors }

  const cleaned = items.map((item) => cleanFields(type.fields, item))
  return { ok: true, value: type.kind === 'list' ? cleaned : cleaned[0] }
}
