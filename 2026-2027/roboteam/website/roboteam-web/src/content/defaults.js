// The content that ships inside the site itself.
//
// It is what you see when the content server isn't running (so `npm run dev`
// works on its own) and what the site falls back to if the server can't be
// reached, so a page is never blank.
import { events } from '../data/events.js'

export const defaults = { events }
