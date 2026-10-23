import { useEffect, useState } from 'react'
import LoginScreen from './LoginScreen.jsx'
import NoAccessScreen from './NoAccessScreen.jsx'
import { getMe } from './api.js'
import styles from './AdminApp.module.css'

/**
 * Asks the server who's logged in, then shows one of three things: the login
 * screen, the "no access" screen, or the editor.
 *
 * It never decides any of this itself — the server is the only authority on
 * who may be here, and this page just draws the answer.
 */
export default function AdminApp() {
  const [me, setMe] = useState(null)

  useEffect(() => {
    getMe().then(setMe)
  }, [])

  // A door that refused someone sends them back here saying so.
  const refused = new URLSearchParams(window.location.search).get('error') === 'no-access'

  if (!me) return <main className={styles.loading}>Loading…</main>
  if (refused) return <NoAccessScreen />
  if (!me.user) return <LoginScreen authMode={me.authMode} />

  return <main className={styles.loading}>Signed in as {me.user.email}</main>
}
