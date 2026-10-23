import Reveal from '../../components/Reveal/Reveal.jsx'
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx'
import RollingNumber from '../../components/RollingNumber/RollingNumber.jsx'
import { achievements } from '../../data/achievements.js'
import styles from './Achievements.module.css'

// A row opens to show more when the achievement has a `note` in data/achievements.js.
function ResultRow({ year, result, competition, note }) {
  const cells = (
    <>
      <RollingNumber value={year} className={styles.year} />
      <span className={styles.result}>{result}</span>
      <span className={styles.competition}>{competition}</span>
      {note && <span className={styles.toggle} aria-hidden="true" />}
    </>
  )

  if (!note) return <div className={styles.row}>{cells}</div>
  return (
    <details className={styles.details}>
      <summary className={styles.row}>{cells}</summary>
      <p className={styles.note}>{note}</p>
    </details>
  )
}

export default function Achievements() {
  return (
    <section id="competitions">
      <div className="wrap">
        <SectionHeader
          label="Competitions"
          title={
            <>
              Next up: <span>ERC 2026.</span>
            </>
          }
          lead="The European Rover Challenge: student teams design, build and operate Mars-like rovers through navigation, sample collection and autonomous operations."
        />
        <div className={styles.table}>
          <div className={`${styles.row} ${styles.head}`}>
            <span>Year</span>
            <span>Result</span>
            <span>Competition</span>
          </div>
          {achievements.map((item, i) => (
            <Reveal key={item.year} from="left" order={i}>
              <ResultRow {...item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
