import Reveal from '../../components/Reveal/Reveal.jsx'
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx'
import Button from '../../components/Button/Button.jsx'
import { partners } from '../../data/partners.js'
import styles from './Partners.module.css'

export default function Partners() {
  return (
    <section id="partners">
      <div className="wrap">
        <SectionHeader label="Partners" title="Made possible by." />
        <Reveal className={styles.grid}>
          {partners.map((name) => (
            <div key={name} className={styles.partner}>
              {name}
            </div>
          ))}
        </Reveal>
        <Reveal className={styles.cta}>
          <Button href="#contact" variant="ghost">
            Become a partner
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
