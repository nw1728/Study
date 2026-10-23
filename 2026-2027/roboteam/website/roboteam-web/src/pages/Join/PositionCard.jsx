import styles from './JoinPage.module.css'

// One open position. Click to unfold the full description.
export default function PositionCard({ title, team, summary, text }) {
  return (
    <details className={styles.position}>
      <summary>
        <span className={styles.positionTeam}>{team}</span>
        <h3>{title}</h3>
        <p>{summary}</p>
        <span className={styles.toggle} aria-hidden="true" />
      </summary>
      <div className={styles.positionText}>
        {text.map((paragraph) => (
          <p key={paragraph.slice(0, 30)}>{paragraph}</p>
        ))}
      </div>
    </details>
  )
}
