import styles from './MemberCard.module.css'

const initials = (name) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')

// A team member: photo (or their initials if there's no photo), name and role.
export default function MemberCard({ name, role, photo }) {
  return (
    <article className={styles.card}>
      {photo ? (
        <img src={photo} alt={name} className={styles.photo} loading="lazy" />
      ) : (
        <div className={styles.initials} aria-hidden="true">
          {initials(name)}
        </div>
      )}
      <h3 className={styles.name}>{name}</h3>
      {role && <p className={styles.role}>{role}</p>}
    </article>
  )
}
