import { logout } from './api.js'
import styles from './LoginScreen.module.css'

/** Shown to someone with a valid team account who isn't on the access list. */
export default function NoAccessScreen({ email }) {
  async function tryAnotherAccount() {
    await logout()
    window.location.reload()
  }

  return (
    <main className={styles.screen}>
      <div className={styles.card}>
        <p className={styles.label}>RoboTeam Twente</p>
        <h1 className={styles.title}>No access</h1>
        <p className={styles.text}>
          This account doesn't have access yet. Ask an owner to add you.
        </p>
        {email && <p className={styles.label}>{email}</p>}
        <button className={styles.button} type="button" onClick={tryAnotherAccount}>
          Try another account
        </button>
        <a className={styles.back} href="/">
          Back to the site
        </a>
      </div>
    </main>
  )
}
