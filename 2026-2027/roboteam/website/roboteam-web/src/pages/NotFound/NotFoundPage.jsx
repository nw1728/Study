import Button from '../../components/Button/Button.jsx'
import Stars from '../../components/Stars/Stars.jsx'
import usePageTitle from '../../hooks/usePageTitle.js'
import styles from './NotFoundPage.module.css'

// Shown for any address that doesn't exist, in the style of the mission log.
export default function NotFoundPage() {
  usePageTitle('Page not found')

  return (
    <section className={styles.page}>
      <Stars />
      <div className={`wrap ${styles.content}`}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Signal lost.</h1>
        <div className={styles.log}>
          <p>
            <span>SOL 404</span> &gt; locate page
          </p>
          <p className={styles.reply}>no such place on this planet …</p>
        </div>
        <Button href="/">Back to base</Button>
      </div>
    </section>
  )
}
