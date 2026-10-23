import { uniqueSlug } from './slug.js'

/**
 * Fills in the generated ids just before saving, so a new item gets one and an
 * existing item keeps the id it is already known by.
 */
export function withGeneratedIds(type, items) {
  const taken = items.map((item) => item.id).filter(Boolean)
  return items.map((item) => {
    if (item.id) return item
    const id = uniqueSlug(type.itemLabel(item) ?? '', taken)
    taken.push(id)
    return { ...item, id }
  })
}
