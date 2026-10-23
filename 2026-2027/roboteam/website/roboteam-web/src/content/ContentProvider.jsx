import { useEffect, useState } from 'react'
import { ContentContext } from './ContentContext.js'
import { defaults } from './defaults.js'

/**
 * Fetches all content once, and shares it with every section.
 *
 * Until it arrives — and for good, if it never does — the built-in defaults are
 * used, so nothing ever has to wait or render empty.
 */
export default function ContentProvider({ children }) {
  const [content, setContent] = useState(defaults)

  useEffect(() => {
    let cancelled = false

    fetch('/api/content')
      .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
      .then((live) => {
        if (!cancelled) setContent({ ...defaults, ...live })
      })
      .catch(() => {
        // Expected whenever the content server isn't running. The defaults are
        // already showing, so there is nothing to recover from.
        console.info('[content] using built-in content (the content server is not reachable)')
      })

    return () => {
      cancelled = true
    }
  }, [])

  return <ContentContext value={content}>{children}</ContentContext>
}
