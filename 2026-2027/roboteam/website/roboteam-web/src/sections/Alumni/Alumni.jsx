import Reveal from '../../components/Reveal/Reveal.jsx'
import { useContent } from '../../content/useContent.js'
import styles from './Alumni.module.css'

export default function Alumni() {
  const alumni = useContent('alumni')

  return (
    <section className={styles.alumni}>
      <div className="wrap">
        <Reveal className={styles.label}>Alumni</Reveal>
        {alumni.map((person) => (
          <figure key={person.id ?? person.name} className={styles.figure}>
            <Reveal as="blockquote" order={1} className={styles.quote}>
              “{person.quote}”
            </Reveal>
            <Reveal as="figcaption" order={2} className={styles.caption}>
              <img src={person.photo} alt={person.name} />
              {person.name}, {person.year} · {person.role}
            </Reveal>
          </figure>
        ))}
      </div>
    </section>
  )
}
