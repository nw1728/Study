// Every editable content type, described once. The server and the admin page
// both read these, so adding a new kind of content means adding a file here
// and nothing else.
import alumni from './alumni.js'
import contact from './contact.js'
import events from './events.js'
import partners from './partners.js'

// The order here is the order of the admin's sidebar.
export const contentTypes = {
  [events.id]: events,
  [partners.id]: partners,
  [alumni.id]: alumni,
  [contact.id]: contact,
}

export const contentTypeIds = Object.keys(contentTypes)

export function getContentType(id) {
  // Only our own keys: a type id arrives from a URL, so 'constructor' and
  // friends must not resolve to anything.
  return Object.hasOwn(contentTypes, id) ? contentTypes[id] : undefined
}
