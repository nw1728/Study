// The cheap test a stored file has to pass before the site is handed it.
//
// ContentStore already rescues a file that fails to parse. This catches the
// other half: JSON that parses but has the wrong shape. `{}` where a list
// belongs used to travel all the way to a component's .map and throw, which
// unmounts React — a white page on every route, not just the one.
//
// It deliberately checks the shape only, never the fields. A hand-edited file
// with one title too long should still show; only a value of the wrong kind
// falls back to the defaults.
import { getContentType } from '../../shared/contentTypes/index.js'

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export function isWellShaped(typeId, value) {
  const type = getContentType(typeId)
  if (!type) return false

  switch (type.kind) {
    case 'single':
      return isPlainObject(value)
    default:
      // 'list'
      return Array.isArray(value) && value.every(isPlainObject)
  }
}
