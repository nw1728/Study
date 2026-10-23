import Reveal from '../Reveal/Reveal.jsx'
import styles from './SectionHeader.module.css'

// The small label + big title + optional intro text that opens most sections.
export default function SectionHeader({ label, title, lead, center = false }) {
  return (
    <header className={center ? styles.center : ''}>
      <Reveal className={styles.label}>{label}</Reveal>
      <Reveal as="h2" order={1} className={styles.title}>
        {title}
      </Reveal>
      {lead && (
        <Reveal as="p" order={2} className={styles.lead}>
          {lead}
        </Reveal>
      )}
    </header>
  )
}
