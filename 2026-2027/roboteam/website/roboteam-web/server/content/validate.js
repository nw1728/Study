// Checks content against its description before it is allowed onto disk.
// Every error is collected, so the admin page can show them all at once
// instead of one per save.
import { getContentType } from '../../shared/contentTypes/index.js'

const URL_SCHEMES = ['http:', 'https:']
const TEXTUAL = ['text', 'textarea', 'select', 'url', 'image']
// Where an image may point: a file we serve ourselves, or an outside link.
const IMAGE_PREFIXES = ['/images/', '/uploads/']

function isBlank(value) {
  if (value === undefined || value === null) return true
  // Only a string can be blank. Anything else is a type problem, not an empty one,
  // and checkField reports it as such.
  return typeof value === 'string' && value.trim() === ''
}

/** Checks one field of one item. Returns a message, or null when it's fine. */
function checkField(field, value) {
  if (isBlank(value)) {
    return field.required ? `${field.label} is required` : null
  }

  // A text field holding an object or an array would be stored as-is and then
  // crash the page that renders it, so the type is checked before anything else.
  if (TEXTUAL.includes(field.type) && typeof value !== 'string') {
    return `${field.label} must be text`
  }

  switch (field.type) {
    case 'number': {
      const number = Number(value)
      if (!Number.isFinite(number)) return `${field.label} must be a number`
      if (field.min !== undefined && number < field.min)
        return `${field.label} must be at least ${field.min}`
      if (field.max !== undefined && number > field.max)
        return `${field.label} must be at most ${field.max}`
      return null
    }
    case 'select':
      return field.options.includes(value)
        ? null
        : `${field.label} must be one of: ${field.options.join(', ')}`
    case 'url':
      try {
        if (!URL_SCHEMES.includes(new URL(value).protocol)) {
          return `${field.label} must start with http:// or https://`
        }
      } catch {
        return `${field.label} must be a valid link`
      }
      return null
    case 'image': {
      if (IMAGE_PREFIXES.some((prefix) => value.startsWith(prefix))) return null
      try {
        if (URL_SCHEMES.includes(new URL(value).protocol)) return null
      } catch {
        // falls through to the message below
      }
      return `${field.label} must be a path like ${IMAGE_PREFIXES[0]}photo.jpg, or an http(s) link`
    }
    default: {
      // text and textarea
      if (field.max !== undefined && String(value).length > field.max) {
        return `${field.label} must be at most ${field.max} characters`
      }
      return null
    }
  }
}

/** Keeps only the fields the description knows about, so nothing extra is stored. */
function cleanItem(fields, item) {
  const cleaned = {}
  for (const field of fields) {
    const value = item[field.name]
    if (isBlank(value)) continue
    // Store the checked value, not the raw input: a number as a number, text trimmed.
    cleaned[field.name] = field.type === 'number' ? Number(value) : value.trim()
  }
  return cleaned
}

export function validateContent(typeId, value) {
  const type = getContentType(typeId)
  if (!type) {
    return { ok: false, errors: [{ index: null, field: null, message: `Unknown content type: ${typeId}` }] }
  }

  const items = type.kind === 'list' ? value : [value]
  if (type.kind === 'list' && !Array.isArray(value)) {
    return { ok: false, errors: [{ index: null, field: null, message: `${type.label} must be a list` }] }
  }

  const errors = []
  const seenIds = new Set()

  items.forEach((item, index) => {
    if (item === null || typeof item !== 'object' || Array.isArray(item)) {
      errors.push({ index, field: null, message: 'Each item must be a set of fields' })
      return
    }

    for (const field of type.fields) {
      const message = checkField(field, item[field.name])
      if (message) errors.push({ index, field: field.name, message })
    }

    if (!isBlank(item.id)) {
      if (seenIds.has(item.id)) {
        errors.push({ index, field: 'id', message: `Two items share the id "${item.id}"` })
      }
      seenIds.add(item.id)
    }
  })

  if (errors.length > 0) return { ok: false, errors }

  const cleaned = items.map((item) => cleanItem(type.fields, item))
  return { ok: true, value: type.kind === 'list' ? cleaned : cleaned[0] }
}
