import styles from './Sidebar.module.css'

export default function Sidebar({ types, activeId, onPick }) {
  return (
    <nav className={styles.sidebar}>
      <ul className={styles.list}>
        {types.map((type) => (
          <li key={type.id}>
            <button
              type="button"
              className={`${styles.entry} ${type.id === activeId ? styles.active : ''}`}
              onClick={() => onPick(type.id)}
              aria-current={type.id === activeId ? 'page' : undefined}
            >
              {type.label}
            </button>
          </li>
        ))}
      </ul>

      <a className={styles.site} href="/">
        View site ↗
      </a>
    </nav>
  )
}
