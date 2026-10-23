import { useEffect, useState } from 'react'
import ContentEditor from './ContentEditor.jsx'
import LoginScreen from './LoginScreen.jsx'
import NoAccessScreen from './NoAccessScreen.jsx'
import Sidebar from './Sidebar.jsx'
import { getMe, logout } from './api.js'
import { contentTypes } from '../../shared/contentTypes/index.js'
import styles from './AdminApp.module.css'

const TYPES = Object.values(contentTypes)

/**
 * Asks the server who's logged in, then shows one of three things: the login
 * screen, the "no access" screen, or the editor.
 *
 * It never decides any of this itself — the server is the only authority on
 * who may be here, and this page just draws the answer.
 */
export default function AdminApp() {
  const [me, setMe] = useState(null)
  const [activeId, setActiveId] = useState(TYPES[0].id)

  useEffect(() => {
    getMe().then(setMe)
  }, [])

  async function signOut() {
    await logout()
    window.location.href = '/admin'
  }

  // A door that refused someone sends them back here saying so.
  const refused = new URLSearchParams(window.location.search).get('error') === 'no-access'

  if (!me) return <main className={styles.loading}>Loading…</main>
  if (refused) return <NoAccessScreen />
  if (!me.user) return <LoginScreen authMode={me.authMode} />

  return (
    <div className={styles.shell}>
      <header className={styles.top}>
        <a className={styles.brand} href="/admin">
          RoboTeam Twente <span className={styles.brandNote}>admin</span>
        </a>
        <div className={styles.who}>
          {me.authMode === 'dev' && <span className={styles.devFlag}>development login</span>}
          <span className={styles.email}>{me.user.email}</span>
          <button type="button" className={styles.signOut} onClick={signOut}>
            Sign out
          </button>
        </div>
      </header>

      <div className={styles.body}>
        <Sidebar types={TYPES} activeId={activeId} onPick={setActiveId} />
        <main className={styles.main}>
          <ContentEditor type={contentTypes[activeId]} />
        </main>
      </div>
    </div>
  )
}
