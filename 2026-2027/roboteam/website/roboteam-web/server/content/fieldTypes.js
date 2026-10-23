// One entry per kind of form field: how to check a value, and what to store.
//
// This is the only place that knows what a field type means. validate.js looks
// the type up here, so a type nobody describes is a loud error rather than a
// value that slips through unchecked — and a new field type is one entry.
//
//   check(field, value) -> a message to show the editor, or null when it's fine
//   clean(field, value) -> exactly what goes on disk
//   blank(value)        -> optional: what "empty" means for this type

const URL_SCHEMES = ['http:', 'https:']
// Where an image may point: a file we serve ourselves, or an outside link.
const IMAGE_PREFIXES = ['/images/', '/uploads/']

/**
 * Whether a value counts as "not filled in".
 *
 * Only a string can be blank. Anything else is a type problem, not an empty
 * one, and the field's own check reports it as such. Note that 0 is a value.
 */
export function isBlankValue(value) {
  if (value === undefined || value === null) return true
  return typeof value === 'string' && value.trim() === ''
}

/** Shared by every field whose value is a line or a block of text. */
function checkText(field, value) {
  if (typeof value !== 'string') return `${field.label} must be text`
  if (field.max !== undefined && value.length > field.max) {
    return `${field.label} must be at most ${field.max} characters`
  }
  return null
}

const text = {
  check: checkText,
  clean: (field, value) => value.trim(),
}

export const fieldTypes = {
  text,
  textarea: text,
  url: {
    check(field, value) {
      const message = checkText(field, value)
      if (message) return message
      try {
        if (!URL_SCHEMES.includes(new URL(value).protocol)) {
          return `${field.label} must start with http:// or https://`
        }
      } catch {
        return `${field.label} must be a valid link`
      }
      return null
    },
    clean: text.clean,
  },
  image: {
    check(field, value) {
      const message = checkText(field, value)
      if (message) return message
      if (IMAGE_PREFIXES.some((prefix) => value.startsWith(prefix))) return null
      try {
        if (URL_SCHEMES.includes(new URL(value).protocol)) return null
      } catch {
        // falls through to the message below
      }
      return `${field.label} must be a path like ${IMAGE_PREFIXES[0]}photo.jpg, or an http(s) link`
    },
    clean: text.clean,
  },
  select: {
    check(field, value) {
      const message = checkText(field, value)
      if (message) return message
      return field.options.includes(value)
        ? null
        : `${field.label} must be one of: ${field.options.join(', ')}`
    },
    clean: text.clean,
  },
  number: {
    check(field, value) {
      const number = Number(value)
      if (typeof value === 'boolean' || !Number.isFinite(number)) {
        return `${field.label} must be a number`
      }
      if (field.min !== undefined && number < field.min) {
        return `${field.label} must be at least ${field.min}`
      }
      if (field.max !== undefined && number > field.max) {
        return `${field.label} must be at most ${field.max}`
      }
      return null
    },
    clean: (field, value) => Number(value),
  },
}

/**
 * The entry for a field type, or undefined.
 *
 * Only our own keys: a type name comes out of a description file, and
 * 'constructor' must not resolve to anything.
 */
export function getFieldType(name) {
  return Object.hasOwn(fieldTypes, name) ? fieldTypes[name] : undefined
}

/** Whether a value counts as empty for this particular field. */
export function isFieldBlank(field, value) {
  const type = getFieldType(field.type)
  return type?.blank ? type.blank(value) : isBlankValue(value)
}

/**
 * Checks one field of one item: the required rule, then the type's own check.
 * Returns a message to show the editor, or null when the value is fine.
 *
 * It lives here rather than in validate.js so that a field type holding other
 * fields inside it can reuse it without the two files importing each other.
 */
export function fieldMessage(field, value) {
  const type = getFieldType(field.type)
  // A field type nobody describes is a mistake in a description file, and it
  // must stop here loudly. Guessing — treating it as text — is how an
  // unchecked value reaches the page that renders it.
  if (!type) return `${field.label}: unknown field type "${field.type}"`

  if (isFieldBlank(field, value)) {
    return field.required ? `${field.label} is required` : null
  }

  return type.check(field, value)
}

/** Keeps only the fields the description knows about, so nothing extra is stored. */
export function cleanFields(fields, item) {
  const cleaned = {}
  for (const field of fields) {
    const value = item[field.name]
    if (isFieldBlank(field, value)) continue
    // Store the checked value, not the raw input: a number as a number,
    // text trimmed.
    cleaned[field.name] = getFieldType(field.type).clean(field, value)
  }
  return cleaned
}
