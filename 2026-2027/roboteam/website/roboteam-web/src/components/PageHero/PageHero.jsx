import Reveal from '../Reveal/Reveal.jsx'
import WordRise from '../WordRise/WordRise.jsx'
import Stars from '../Stars/Stars.jsx'
import styles from './PageHero.module.css'

// The opening of every sub-page: small label, big title, intro text, optional buttons.
export default function PageHero({ label, title, lead, children }) {
  return (
    <header className={styles.hero}>
      <Stars />
      <div className={`wrap ${styles.content}`}>
        <Reveal className={styles.label}>{label}</Reveal>
        <WordRise as="h1" text={title} className={styles.title} />
        {lead && (
          <Reveal as="p" order={2} className={styles.lead}>
            {lead}
          </Reveal>
        )}
        {children && (
          <Reveal order={3} className={styles.actions}>
            {children}
          </Reveal>
        )}
      </div>
    </header>
  )
}
