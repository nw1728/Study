import { WHEEL_RADIUS as R, WHEEL_Y } from './geometry.js'
import styles from './StoryRover.module.css'

// One wheel: rim, hub, spokes and tread marks. The [data-spin] group is what turns.
export default function Wheel({ x }) {
  const spokes = [0, 60, 120].map((deg) => {
    const a = (deg * Math.PI) / 180
    const dx = Math.cos(a)
    const dy = Math.sin(a)
    return `M${x - dx * 20} ${WHEEL_Y - dy * 20} L${x + dx * 20} ${WHEEL_Y + dy * 20}`
  })
  const treads = Array.from({ length: 12 }, (_, i) => {
    const a = (i * 30 * Math.PI) / 180
    return `M${x + Math.cos(a) * R} ${WHEEL_Y + Math.sin(a) * R} L${x + Math.cos(a) * (R + 4)} ${WHEEL_Y + Math.sin(a) * (R + 4)}`
  })

  return (
    <g data-part="wheels">
      <g data-spin data-pivot={`${x} ${WHEEL_Y}`}>
        <path className={styles.line} pathLength="1" d={`M${x - R} ${WHEEL_Y} a${R} ${R} 0 1 0 ${R * 2} 0 a${R} ${R} 0 1 0 ${-R * 2} 0`} />
        <path className={styles.line} pathLength="1" d={`M${x - 7} ${WHEEL_Y} a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0`} />
        <path className={styles.line} pathLength="1" d={spokes.join(' ')} />
        <path className={styles.line} pathLength="1" d={treads.join(' ')} />
      </g>
    </g>
  )
}
