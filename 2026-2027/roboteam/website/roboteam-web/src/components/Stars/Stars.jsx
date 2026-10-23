import styles from './Stars.module.css'

// Fixed "random" star positions (same on every render): a simple hash of the star's number.
const scatter = (n) => {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x)
}
const stars = Array.from({ length: 90 }, (_, i) => ({
  x: scatter(i + 1) * 1000,
  y: scatter(i + 101) * 700,
  r: i % 7 === 0 ? 1.8 : 1,
}))

// Background stars. They drift a little slower than the scroll, for depth.
export default function Stars() {
  return (
    <svg data-stars className={styles.stars} viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {stars.map(({ x, y, r }) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
      ))}
    </svg>
  )
}
