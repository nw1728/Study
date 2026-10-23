// The built-in defaults, as the server sees them.
//
// The content itself lives in shared/contentDefaults.js, which the public site
// imports too — one list, so a type can never have a default on one side only.
import { assertDefaultsComplete, contentDefaults } from '../../shared/contentDefaults.js'
import { contentTypeIds } from '../../shared/contentTypes/index.js'

export async function loadDefaults() {
  // Stops the server here, naming the type, rather than letting a visitor meet
  // a page with nothing to fall back to.
  assertDefaultsComplete(contentDefaults, contentTypeIds)
  return contentDefaults
}
