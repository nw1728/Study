import styles from './RoverPet.module.css'

const WHEEL_XS = [14, 32, 50]

// The drawing of the mini Mars rover (side view). Moods are animated in RoverPet.module.css.
export default function Rover() {
  return (
    <svg viewBox="0 0 64 48" width="56" height="42" aria-hidden="true">
      {/* rocker-bogie legs */}
      <path d="M22 30 L14 40 M22 30 L32 40 M42 30 L50 40" className={styles.leg} />

      {WHEEL_XS.map((x) => (
        <g key={x} data-wheel={x}>
          <circle cx={x} cy={40} r={6} className={styles.wheel} />
          <path d={`M${x - 6} 40 H${x + 6} M${x} 34 V46`} className={styles.spokes} />
        </g>
      ))}

      <rect x="12" y="20" width="36" height="11" rx="3" className={styles.body} />

      {/* camera mast: the rover's "head" */}
      <g className={styles.mast}>
        <path d="M18 20 V11" className={styles.leg} />
        <rect x="12" y="5" width="12" height="6" rx="2" className={styles.body} />
        <circle cx="21" cy="8" r="1.5" className={styles.eye} />
      </g>

      {/* robotic arm: shoulder → elbow → gripper */}
      <g className={styles.shoulder}>
        <path d="M46 22 L56 14" className={styles.arm} />
        <g className={styles.elbow}>
          <path d="M56 14 L61 24" className={styles.arm} />
          <path d="M59 25 L58 28 M63 24 L64 27" className={styles.gripper} />
        </g>
      </g>
    </svg>
  )
}
