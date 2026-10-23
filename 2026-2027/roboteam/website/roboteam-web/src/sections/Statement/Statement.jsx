import Reveal from '../../components/Reveal/Reveal.jsx'
import styles from './Statement.module.css'

// Big lines that appear one by one. Wrap a word in <em> to make it purple.
export default function Statement() {
  return (
    <section className={styles.statement}>
      <div className="wrap">
        <Reveal from="left" className={styles.line}>Designed by students.</Reveal>
        <Reveal from="right" order={1} className={styles.line}>
          Built at <em>Future Factory</em>.
        </Reveal>
        <Reveal order={2} className={`${styles.line} ${styles.soft}`}>
          Bound for Mars.
        </Reveal>
      </div>
    </section>
  )
}
