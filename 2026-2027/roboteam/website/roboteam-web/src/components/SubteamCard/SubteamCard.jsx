import { Link } from 'react-router-dom'
import styles from './SubteamCard.module.css'

// A subteam on the front page. Clicking it opens the subteam's page with its members.
export default function SubteamCard({ number, slug, name, description, members }) {
  return (
    <Link to={`/team/${slug}`} className={styles.card}>
      <span className={styles.number}>{String(number).padStart(2, '0')}</span>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
      <span className={styles.more}>
        {members.length} {members.length === 1 ? 'member' : 'members'} →
      </span>
    </Link>
  )
}
