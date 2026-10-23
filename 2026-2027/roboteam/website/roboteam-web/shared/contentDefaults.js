// The content the site ships with, for every editable type, in one place.
//
// It does two jobs. On the very first start it fills the storage folder, so
// nothing written before the admin existed is lost. Afterwards it stays as the
// fallback: if a stored file is missing, unreadable or the wrong shape, the
// site shows this instead of nothing.
//
// The server and the public site both import this, so a new content type can
// never end up with a default on one side and none on the other.
import { events } from '../src/data/events.js'

export const contentDefaults = { events }

/**
 * Every described content type must have a default here. A type without one is
 * the blank-site bug: nothing to fall back to when its file goes missing.
 *
 * Called at boot, so forgetting a default stops the server with a message
 * naming it rather than showing an empty page to a visitor.
 *
 * The ids are passed in rather than imported: this file is part of the public
 * site's bundle, and the type descriptions are the admin's business only.
 */
export function assertDefaultsComplete(defaults, ids) {
  const missing = ids.filter((id) => defaults[id] === undefined)
  if (missing.length > 0) {
    throw new Error(
      `No built-in default for: ${missing.join(', ')}. ` +
        'Add the content to src/data/ and list it in shared/contentDefaults.js.',
    )
  }
}
