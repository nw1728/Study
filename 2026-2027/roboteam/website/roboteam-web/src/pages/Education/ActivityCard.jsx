import styles from './EducationPage.module.css'

// One workshop, demo or teambuilding activity.
export default function ActivityCard({ title, level, duration, capacity, language, text, points, tagline }) {
  const facts = [
    ['Duration', duration],
    ['Group', capacity],
    ['Language', language],
  ].filter(([, value]) => value)

  return (
    <article className={styles.card}>
      {level && <span className={styles.level}>{level}</span>}
      <h3>{title}</h3>
      <dl className={styles.facts}>
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p className={styles.text}>{text}</p>
      <ul className={styles.points}>
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <p className={styles.tagline}>{tagline}</p>
    </article>
  )
}
