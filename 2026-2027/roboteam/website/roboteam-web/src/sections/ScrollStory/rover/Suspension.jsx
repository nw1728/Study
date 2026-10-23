import { PIVOTS, WHEELS, WHEEL_Y } from './geometry.js'
import styles from './StoryRover.module.css'

// The rocker-bogie legs. kind="rocker" is the big leg, kind="bogie" the small one it carries.
export default function Suspension({ kind }) {
  const [px, py] = PIVOTS[kind]
  const d =
    kind === 'rocker'
      ? `M${px} ${py} L${WHEELS.front} ${WHEEL_Y} M${px} ${py} L${PIVOTS.bogie[0]} ${PIVOTS.bogie[1]}`
      : `M${px} ${py} L${WHEELS.rear} ${WHEEL_Y} M${px} ${py} L${WHEELS.middle} ${WHEEL_Y}`

  return (
    <g data-part="suspension">
      <path className={styles.line} pathLength="1" d={d} />
      <circle className={`${styles.line} ${styles.joint}`} pathLength="1" cx={px} cy={py} r="5" />
    </g>
  )
}
