import { createContext } from 'react'
import { defaults } from './defaults.js'

// Shared by ContentProvider (which fills it) and useContent (which reads it).
// It lives in its own file so each of those stays a single export.
export const ContentContext = createContext(defaults)
