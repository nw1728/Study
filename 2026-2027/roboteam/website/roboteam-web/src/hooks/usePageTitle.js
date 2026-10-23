import { useEffect } from 'react'

// Sets the browser tab title, e.g. usePageTitle('Join us') → "Join us · RoboTeam Twente".
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · RoboTeam Twente` : 'RoboTeam Twente'
  }, [title])
}
