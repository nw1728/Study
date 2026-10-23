import { missionLog } from '../../data/story.js'
import styles from './ScrollStory.module.css'

// Bottom-right: the current mission day (sol), with a dot circling a tiny planet as you scroll.
export default function SolCounter({ count }) {
  const sol = missionLog[Math.max(0, count - 1)].sol

  return (
    <div className={styles.solCounter} aria-hidden="true">
      <svg viewBox="0 0 40 40" className={styles.orbit}>
        <circle cx="20" cy="20" r="8" />
        <g data-orbit-dot className={styles.orbitDot}>
          <circle cx="20" cy="4" r="2.5" />
        </g>
      </svg>
      <div>
        <small>SOL</small>
        <b>{String(sol).padStart(3, '0')}</b>
      </div>
    </div>
  )
}
