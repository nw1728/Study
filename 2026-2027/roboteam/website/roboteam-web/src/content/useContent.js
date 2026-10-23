import { use } from 'react'
import { ContentContext } from './ContentContext.js'
import { defaults } from './defaults.js'

/**
 * The live content for one type, e.g. useContent('events').
 *
 * It never returns undefined: before the server answers, or if it never does,
 * you get the content built into the site. Sections need no loading branch.
 */
export function useContent(typeId) {
  const content = use(ContentContext)
  return content[typeId] ?? defaults[typeId]
}
