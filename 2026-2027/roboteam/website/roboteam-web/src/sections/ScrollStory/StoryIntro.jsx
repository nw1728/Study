import Button from '../../components/Button/Button.jsx'
import WordRise from '../../components/WordRise/WordRise.jsx'
import styles from './ScrollStory.module.css'

// What you see before scrolling: the team name, tagline and buttons.
export default function StoryIntro({ shown }) {
  return (
    <div className={`${styles.headline} ${shown ? styles.shown : ''}`}>
      <p className={styles.introLabel}>University of Twente · Saxion · Future Factory</p>
      <h1 className={styles.introTitle}>
        <WordRise text="RoboTeam" shown={shown} />{' '}
        <WordRise text="Twente" shown={shown} className={styles.thin} />
      </h1>
      <p className={styles.text}>
        Innovate and inspire in the fields of robotics and AI. We're building a Mars rover for the European Rover
        Challenge.
      </p>
      <div className={styles.buttons}>
        <Button href="#about">Learn more</Button>
        <Button href="/join" variant="ghost">
          Join us
        </Button>
      </div>
    </div>
  )
}
