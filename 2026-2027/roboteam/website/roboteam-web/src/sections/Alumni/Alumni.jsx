import Reveal from '../../components/Reveal/Reveal.jsx'
import { alumni } from '../../data/alumni.js'
import styles from './Alumni.module.css'

export default function Alumni() {
  return (
    <section className={styles.alumni}>
      <div className="wrap">
        <Reveal className={styles.label}>Alumni</Reveal>
        {alumni.map((person) => (
          <figure key={person.name} className={styles.figure}>
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
