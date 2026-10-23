/**
 * Makes the stable id an item is known by, from its title.
 *
 * Ids are generated rather than typed: they end up in links and in the stored
 * file, and asking a non-coder to invent a unique one is asking for trouble.
 */
export function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** The slug of `text`, with a number added if the list already uses it. */
export function uniqueSlug(text, takenIds) {
  const base = slugify(text) || 'item'
  if (!takenIds.includes(base)) return base

  let n = 2
  while (takenIds.includes(`${base}-${n}`)) n += 1
  return `${base}-${n}`
}
