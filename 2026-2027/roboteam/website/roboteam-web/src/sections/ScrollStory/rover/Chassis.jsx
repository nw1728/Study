import { SAMPLE_BOX } from './geometry.js'
import styles from './StoryRover.module.css'

// The body: main box, deck, panel lines, sample box and antenna.
export default function Chassis() {
  const [bx, by] = SAMPLE_BOX
  return (
    <g data-part="chassis">
      <path
        className={styles.line}
        pathLength="1"
        d="M170 232 V196 Q170 182 184 182 H406 Q420 182 420 196 V232 Z"
      />
      <path className={styles.line} pathLength="1" d="M184 196 H406 M250 196 V232 M330 196 V232" />
      <path
        className={`${styles.line} ${styles.accent}`}
        pathLength="1"
        d={`M${bx - 28} 182 V${by - 8} H${bx + 28} V182 M${bx - 28} ${by} H${bx + 28}`}
      />
      <path className={styles.line} pathLength="1" d="M262 182 L276 120 M260 118 Q276 100 294 120" />
    </g>
  )
}
