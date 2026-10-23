import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/*
 * After switching pages: start at the top, or scroll to the section in the address
 * (e.g. "/#team"). The section may not exist yet right after a page switch, so it retries briefly.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    let tries = 0
    let frame
    const findSection = () => {
      const section = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (section) section.scrollIntoView()
      else if (tries++ < 30) frame = requestAnimationFrame(findSection)
    }
    findSection()
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}
