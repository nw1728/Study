import Reveal from '../../components/Reveal/Reveal.jsx'
import Button from '../../components/Button/Button.jsx'
import teamPhoto from '../../assets/images/hero.jpg'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.photo} style={{ backgroundImage: `url(${teamPhoto})` }} />
      <div className={styles.glow} />
      <div className={`wrap ${styles.content}`}>
        <Reveal className={styles.label}>University of Twente · Saxion · Future Factory</Reveal>
        <Reveal as="h1" order={1} className={styles.title}>
          <span className={styles.bold}>RoboTeam</span>
          <span className={styles.thin}>Twente</span>
        </Reveal>
        <Reveal as="p" order={2} className={styles.tagline}>
          Innovate and inspire in the fields of robotics and AI. We're building a Mars rover for the
          European Rover Challenge.
        </Reveal>
        <Reveal order={3} className={styles.buttons}>
          <Button href="#about">Learn more</Button>
          <Button href="#join" variant="ghost">
            Join us
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
