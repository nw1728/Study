import { PIVOTS } from './geometry.js'
import styles from './StoryRover.module.css'

// Camera mast with the "head" that turns to look at you in the last chapter.
export default function Mast() {
  const [hx, hy] = PIVOTS.head
  return (
    <g data-part="mast">
      <path className={styles.line} pathLength="1" d={`M${hx} 182 V${hy + 8}`} />
      <g data-joint="head" data-pivot={`${hx} ${hy}`}>
        <path
          className={styles.line}
          pathLength="1"
          d="M176 70 H226 Q232 70 232 76 V94 Q232 100 226 100 H176 Q170 100 170 94 V76 Q170 70 176 70 Z"
        />
        <circle className={`${styles.line} ${styles.lens}`} pathLength="1" cx="190" cy="85" r="6" />
        <circle className={`${styles.line} ${styles.lens}`} pathLength="1" cx="214" cy="85" r="6" />
      </g>
    </g>
  )
}
