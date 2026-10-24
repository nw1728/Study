// Every editable content type, described once. The server and the admin page
// both read these, so adding a new kind of content means adding a file here
// and nothing else.
import achievements from './achievements.js'
import activityGroups from './activityGroups.js'
import alumni from './alumni.js'
import contact from './contact.js'
import educationPage from './educationPage.js'
import events from './events.js'
import join from './join.js'
import members from './members.js'
import news from './news.js'
import partners from './partners.js'
import pastTeams from './pastTeams.js'
import positions from './positions.js'
import socials from './socials.js'
import stats from './stats.js'
import subteams from './subteams.js'

// The order here is the order of the admin's sidebar.
export const contentTypes = {
  [events.id]: events,
  [subteams.id]: subteams,
  [members.id]: members,
  [news.id]: news,
  [achievements.id]: achievements,
  [stats.id]: stats,
  [partners.id]: partners,
  [alumni.id]: alumni,
  [pastTeams.id]: pastTeams,
  [socials.id]: socials,
  [educationPage.id]: educationPage,
  [activityGroups.id]: activityGroups,
  [join.id]: join,
  [positions.id]: positions,
  [contact.id]: contact,
}

export const contentTypeIds = Object.keys(contentTypes)

export function getContentType(id) {
  // Only our own keys: a type id arrives from a URL, so 'constructor' and
  // friends must not resolve to anything.
  return Object.hasOwn(contentTypes, id) ? contentTypes[id] : undefined
}
