import PageHero from '../../components/PageHero/PageHero.jsx'
import Reveal from '../../components/Reveal/Reveal.jsx'
import SmartLink from '../../components/SmartLink/SmartLink.jsx'
import usePageTitle from '../../hooks/usePageTitle.js'
import { contact } from '../../data/contact.js'
import { socials } from '../../data/socials.js'
import styles from './ContactPage.module.css'

const cards = [
  { label: 'General', value: contact.email, href: `mailto:${contact.email}`, note: 'Questions, partnerships, press' },
  { label: 'Workshops', value: contact.educationEmail, href: `mailto:${contact.educationEmail}`, note: 'Book a workshop, demo or tour' },
  { label: 'Phone', value: contact.phone, href: `tel:${contact.phone.replaceAll(' ', '')}` },
  { label: 'Visit', value: contact.address.join(', '), href: contact.mapsUrl, note: 'Open in Google Maps →' },
]

export default function ContactPage() {
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
