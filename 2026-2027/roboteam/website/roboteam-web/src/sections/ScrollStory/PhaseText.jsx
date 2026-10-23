import WordRise from '../../components/WordRise/WordRise.jsx'
import Button from '../../components/Button/Button.jsx'
import styles from './ScrollStory.module.css'

// The big centered headline for one phase of the story. Only the current one is shown.
export default function PhaseText({ phase, shown }) {
  return (
    <div className={`${styles.headline} ${shown ? styles.shown : ''}`}>
      <WordRise as="h2" text={phase.title} shown={shown} className={styles.title} />
      <p className={styles.text}>{phase.text}</p>
      {phase.cta && (
        <div className={styles.buttons}>
          <Button href={phase.cta.href}>{phase.cta.label}</Button>
        </div>
      )}
    </div>
  )
}
