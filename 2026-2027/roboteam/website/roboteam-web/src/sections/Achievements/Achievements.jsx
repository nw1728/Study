import Reveal from '../../components/Reveal/Reveal.jsx'
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx'
import { achievements } from '../../data/achievements.js'
import styles from './Achievements.module.css'

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
        <div className={styles.timeline}>
          {achievements.map((item, i) => (
            <Reveal key={item.year} from="left" order={i} className={styles.row}>
              <span className={styles.year}>{item.year}</span>
              <span className={styles.result}>{item.result}</span>
              <span className={styles.competition}>{item.competition}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
