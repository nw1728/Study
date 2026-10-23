import Reveal from '../../components/Reveal/Reveal.jsx'
import Button from '../../components/Button/Button.jsx'
import styles from './Join.module.css'

export default function Join() {
  return (
    <section id="join" className={styles.join}>
      <div className={styles.glow} />
      <div className={`wrap ${styles.content}`}>
        <Reveal className={styles.label}>Want to join?</Reveal>
        <Reveal as="h2" order={1} className={styles.title}>
          Build the <em>rover</em>
          <br />
          with us.
        </Reveal>
        <Reveal as="p" order={2} className={styles.lead}>
          We're always looking for motivated students.
        </Reveal>
        <Reveal order={3}>
          <Button href="https://roboteamtwente.nl/join">Join us</Button>
        </Reveal>
      </div>
    </section>
  )
}
