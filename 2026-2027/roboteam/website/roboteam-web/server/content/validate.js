// Checks content against its description before it is allowed onto disk.
// Every error is collected, so the admin page can show them all at once
// instead of one per save.
import { getContentType } from '../../shared/contentTypes/index.js'
import { cleanFields, fieldMessage, isBlankValue, isFieldBlank } from './fieldTypes.js'

/**
 * The errors of one field, as `{ field, message }` pairs.
 *
 * A field holding other fields reports one error per nested box, with its
 * path in the name — `steps[0].title` — so the admin can show each message
 * next to the box it belongs to. The shape on the wire stays flat.
 */
function fieldErrors(field, value) {
  if (field.type !== 'items' || isFieldBlank(field, value) || !Array.isArray(value)) {
    const message = fieldMessage(field, value)
    return message ? [{ field: field.name, message }] : []
  }

  const errors = []
  value.forEach((row, index) => {
    if (row === null || typeof row !== 'object' || Array.isArray(row)) {
      errors.push({ field: `${field.name}[${index}]`, message: 'Each one must be a set of fields' })
      return
    }
    for (const sub of field.fields) {
      const message = fieldMessage(sub, row[sub.name])
      if (message) errors.push({ field: `${field.name}[${index}].${sub.name}`, message })
    }
  })
  return errors
}

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
      for (const error of fieldErrors(field, item[field.name])) {
        errors.push({ index, ...error })
      }
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
