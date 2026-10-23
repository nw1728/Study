import useInView from '../../hooks/useInView.js'
import useCountUp from '../../hooks/useCountUp.js'
import { stats } from '../../data/stats.js'
import styles from './Stats.module.css'

function Stat({ value, label }) {
  const [ref, inView] = useInView(0.6)
  const shown = useCountUp(value, inView)

  return (
    <div ref={ref} className={styles.stat}>
      <b>{shown}</b>
      <span>{label}</span>
    </div>
  )
}

export default function Stats() {
  return (
    <section className={styles.stats}>
      <div className={`wrap ${styles.row}`}>
        {stats.map((stat) => (
          <Stat key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  )
}
