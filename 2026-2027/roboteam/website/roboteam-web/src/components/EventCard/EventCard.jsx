import styles from './EventCard.module.css'

export default function EventCard({ day, month, title, place, time, note }) {
  const details = [place, time, note].filter(Boolean).join(' · ')

  return (
    <article className={styles.card}>
      <div className={styles.date}>
        <b>{day}</b>
        <span>{month}</span>
      </div>
      <div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.details}>{details}</p>
      </div>
    </article>
  )
}
