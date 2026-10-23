// The built-in defaults: the same `src/data/*.js` files the site has always used.
//
// They do two jobs. On the very first start they fill the storage folder, so
// nothing written before the admin existed is lost. Afterwards they stay as the
// fallback: if a content file is missing or unreadable, the site shows these
// instead of nothing.
import { events } from '../../src/data/events.js'

export async function loadDefaults() {
  return { events }
}
