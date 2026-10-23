import { PIVOTS } from './geometry.js'
import styles from './StoryRover.module.css'

// Robotic arm: shoulder → upper arm → elbow → forearm → wrist → scoop. Each joint can rotate.
export default function Arm() {
  const [sx, sy] = PIVOTS.shoulder
  const [ex, ey] = PIVOTS.elbow
  const [wx, wy] = PIVOTS.wrist
  return (
    <g data-part="arm">
      <g data-joint="shoulder" data-pivot={`${sx} ${sy}`}>
        <path className={styles.line} pathLength="1" d={`M${sx} ${sy} L${ex} ${ey}`} />
        <g data-joint="elbow" data-pivot={`${ex} ${ey}`}>
          <path className={styles.line} pathLength="1" d={`M${ex} ${ey} L${wx} ${wy}`} />
          <g data-joint="wrist" data-pivot={`${wx} ${wy}`}>
            <path
              className={`${styles.line} ${styles.accent}`}
              pathLength="1"
              d={`M${wx} ${wy} L${wx + 2} ${wy + 12} M${wx - 10} ${wy + 12} Q${wx + 2} ${wy + 30} ${wx + 18} ${wy + 16} Z`}
            />
          </g>
          <circle className={`${styles.line} ${styles.joint}`} pathLength="1" cx={wx} cy={wy} r="4" />
        </g>
        <circle className={`${styles.line} ${styles.joint}`} pathLength="1" cx={ex} cy={ey} r="5" />
      </g>
      <circle className={`${styles.line} ${styles.joint}`} pathLength="1" cx={sx} cy={sy} r="6" />
    </g>
  )
}
