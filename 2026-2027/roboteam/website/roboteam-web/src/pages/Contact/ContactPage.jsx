import PageHero from '../../components/PageHero/PageHero.jsx'
import Reveal from '../../components/Reveal/Reveal.jsx'
import SmartLink from '../../components/SmartLink/SmartLink.jsx'
import usePageTitle from '../../hooks/usePageTitle.js'
import { useContent } from '../../content/useContent.js'
import styles from './ContactPage.module.css'

/**
 * The four cards, from whatever contact details are filled in. Each one is
 * left out when its detail is empty, so clearing the phone number in the
 * admin removes the card instead of leaving "tel:" behind.
 */
function cardsFrom(contact) {
  const address = (contact.address ?? []).join(', ')
  return [
    contact.email && {
      label: 'General',
      value: contact.email,
      href: `mailto:${contact.email}`,
      note: 'Questions, partnerships, press',
    },
    contact.educationEmail && {
      label: 'Workshops',
      value: contact.educationEmail,
      href: `mailto:${contact.educationEmail}`,
      note: 'Book a workshop, demo or tour',
    },
    contact.phone && {
      label: 'Phone',
      value: contact.phone,
      href: `tel:${contact.phone.replaceAll(' ', '')}`,
    },
    address && {
      label: 'Visit',
      value: address,
      href: contact.mapsUrl,
      note: contact.mapsUrl && 'Open in Google Maps →',
    },
  ].filter(Boolean)
}

export default function ContactPage() {
  const cards = cardsFrom(useContent('contact'))
  const socials = useContent('socials')
  usePageTitle('Contact')

  return (
    <>
      <PageHero
        label="Contact"
        title="Let's talk."
        lead="Want to partner with us, book a workshop, or just see the rover? Get in touch, or drop by Future Factory."
      />
      <section>
        <div className="wrap">
          <div className={styles.grid}>
            {cards.map((card, i) => (
              <Reveal key={card.label} order={i}>
                <SmartLink href={card.href} className={styles.card}>
                  <span className={styles.label}>{card.label}</span>
                  <b>{card.value}</b>
                  {card.note && <span className={styles.note}>{card.note}</span>}
                </SmartLink>
              </Reveal>
            ))}
          </div>

          <Reveal className={styles.socials}>
            <span className={styles.label}>Follow the team</span>
            <div>
              {socials.map((social) => (
                <SmartLink key={social.href} href={social.href} className={styles.social}>
                  {social.label}
                </SmartLink>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
