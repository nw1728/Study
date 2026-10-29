import { PIVOTS, WHEELS, WHEEL_Y } from './geometry.js'
import styles from './StoryRover.module.css'

// The rocker: one leg hanging from the body, carrying the rear and front wheel.
export default function Suspension() {
  const [px, py] = PIVOTS.rocker
  const d = `M${px} ${py} L${WHEELS.rear} ${WHEEL_Y} M${px} ${py} L${WHEELS.front} ${WHEEL_Y}`

  return (
    <g data-part="suspension">
      <path className={styles.line} pathLength="1" d={d} />
      <circle className={`${styles.line} ${styles.joint}`} pathLength="1" cx={px} cy={py} r="5" />
    </g>
  )
}
