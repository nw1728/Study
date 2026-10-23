import styles from './SubteamCard.module.css'

export default function SubteamCard({ number, name, description }) {
  return (
    <article className={styles.card}>
      <span className={styles.number}>{String(number).padStart(2, '0')}</span>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
    </article>
  )
}
