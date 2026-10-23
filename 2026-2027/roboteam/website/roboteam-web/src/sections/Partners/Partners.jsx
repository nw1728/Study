import Reveal from '../../components/Reveal/Reveal.jsx'
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx'
import Button from '../../components/Button/Button.jsx'
import SmartLink from '../../components/SmartLink/SmartLink.jsx'
import { useContent } from '../../content/useContent.js'
import styles from './Partners.module.css'

/** The logo if there is one, the name if there isn't. */
function Cell({ partner }) {
  if (!partner.logo) return partner.name
  return <img src={partner.logo} alt={partner.name} className={styles.logo} loading="lazy" />
}

export default function Partners() {
  const partners = useContent('partners')

  return (
    <section id="partners">
      <div className="wrap">
        <SectionHeader label="Partners" title="Made possible by." />
        <Reveal className={styles.grid}>
          {partners.map((partner) =>
            // A cell is only a link when someone filled in a website.
            partner.url ? (
              <SmartLink key={partner.id} href={partner.url} className={styles.partner}>
                <Cell partner={partner} />
              </SmartLink>
            ) : (
              <div key={partner.id} className={styles.partner}>
                <Cell partner={partner} />
              </div>
            ),
          )}
        </Reveal>
        <Reveal className={styles.cta}>
          <Button href="/contact" variant="ghost">
            Become a partner
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
