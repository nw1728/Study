import { uniqueSlug } from './slug.js'

/**
 * Fills in the generated ids just before saving, so a new item gets one and an
 * existing item keeps the id it is already known by.
 *
 * Most types call it `id`; a subteam calls it `slug`, because it is the page
 * address. The description says which (`idField`).
 */
export function withGeneratedIds(type, items) {
  const key = type.idField ?? 'id'
  const taken = items.map((item) => item[key]).filter(Boolean)

  return items.map((item) => {
    if (item[key]) return item
    const id = uniqueSlug(type.itemLabel(item) ?? '', taken)
    taken.push(id)
    return { ...item, [key]: id }
  })
}
