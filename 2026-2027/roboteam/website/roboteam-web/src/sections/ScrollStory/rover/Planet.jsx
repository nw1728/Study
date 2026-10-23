import { CRATER_AT, FLAG_AT, PLANET, ROCKS, ROCK_HEIGHT } from './geometry.js'
import styles from './StoryRover.module.css'

const { cx, cy, r } = PLANET
const TOP = cy - r

const at = (degrees) => `rotate(${degrees} ${cx} ${cy})`

// craters and pebbles scattered over the planet, in fixed spots so every render matches
const craters = Array.from({ length: 22 }, (_, i) => ({
  angle: i * 16.4 + 30,
  depth: 50 + (i % 4) * 70,
  size: 6 + (i % 3) * 6,
}))
const pebbles = Array.from({ length: 60 }, (_, i) => i * 6 + 3)

// A small planet drawn in lines. The [data-planet-spin] group turns as the rover drives.
export default function Planet() {
  return (
    <g data-part="planet">
      <path
        className={styles.line}
        pathLength="1"
        d={`M${cx} ${TOP} a${r} ${r} 0 1 1 -0.01 0 Z`}
      />
      <g data-planet-spin>
        {ROCKS.map((angle) => (
          <path
            key={angle}
            transform={at(angle)}
            className={`${styles.line} ${styles.accent}`}
            pathLength="1"
            d={`M${cx - 16} ${TOP} Q${cx - 10} ${TOP - ROCK_HEIGHT} ${cx} ${TOP - ROCK_HEIGHT} Q${cx + 11} ${TOP - ROCK_HEIGHT + 1} ${cx + 16} ${TOP}`}
          />
        ))}
        <path
          transform={at(CRATER_AT)}
          className={styles.line}
          pathLength="1"
          d={`M${cx - 30} ${TOP} Q${cx - 24} ${TOP - 6} ${cx - 19} ${TOP + 1} Q${cx} ${TOP + 18} ${cx + 19} ${TOP + 1} Q${cx + 24} ${TOP - 6} ${cx + 30} ${TOP}`}
        />
        <g transform={at(FLAG_AT)}>
          <path className={styles.line} pathLength="1" d={`M${cx} ${TOP} V${TOP - 44} M${cx} ${TOP - 44} L${cx + 22} ${TOP - 37} L${cx} ${TOP - 30}`} />
          <text className={styles.flagText} x={cx + 4} y={TOP - 34}>
            FF
          </text>
        </g>
        {craters.map(({ angle, depth, size }) => (
          <path
            key={angle}
            transform={at(angle)}
            className={styles.line}
            pathLength="1"
            d={`M${cx - size} ${TOP + depth} a${size} ${size * 0.6} 0 1 0 ${size * 2} 0 a${size} ${size * 0.6} 0 1 0 ${-size * 2} 0`}
          />
        ))}
        {pebbles.map((angle) => (
          <path key={angle} transform={at(angle)} className={styles.line} pathLength="1" d={`M${cx - 3} ${TOP + 6} q3 -3 6 0`} />
        ))}
      </g>
    </g>
  )
}
