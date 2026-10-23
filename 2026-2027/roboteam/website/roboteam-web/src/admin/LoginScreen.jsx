import styles from './LoginScreen.module.css'

/**
 * One button. Which door it opens comes from the server, so this screen does
 * not know or care whether login goes through Google or the development form.
 */
export default function LoginScreen({ authMode }) {
  const isDev = authMode === 'dev'

  return (
    <main className={styles.screen}>
      <div className={styles.card}>
        <p className={styles.label}>RoboTeam Twente</p>
        <h1 className={styles.title}>Admin</h1>
        <p className={styles.text}>
          Sign in with your team account to change what's on the website.
        </p>

        <a className={styles.button} href={isDev ? '/auth/dev' : '/auth/google'}>
          {isDev ? 'Continue (development login)' : 'Sign in with Google'}
        </a>

        {isDev && (
          <p className={styles.warning}>
            This server is running the development login. It does not exist in production.
          </p>
        )}

        <a className={styles.back} href="/">
          Back to the site
        </a>
      </div>
    </main>
  )
}
