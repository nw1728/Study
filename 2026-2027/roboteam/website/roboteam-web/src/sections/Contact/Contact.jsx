import Reveal from '../../components/Reveal/Reveal.jsx'
import { contact } from '../../data/contact.js'
import logo from '../../assets/images/purplefg_nobackground.png'
import styles from './Contact.module.css'

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className="wrap">
        <div className={styles.header}>
          <div>
            <Reveal className={styles.label}>Contact</Reveal>
            <Reveal as="h2" order={1} className={styles.title}>
              Let's talk.
            </Reveal>
          </div>
          <Reveal from="right" order={2}>
            <img src={logo} alt="RoboTeam Twente" className={styles.logo} />
          </Reveal>
        </div>
        <div className={styles.columns}>
          <Reveal>
            <small>Email</small>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </Reveal>
          <Reveal order={1}>
            <small>Phone</small>
            <a href={`tel:${contact.phone.replaceAll(' ', '')}`}>{contact.phone}</a>
          </Reveal>
          <Reveal order={2}>
            <small>Visit</small>
            <address>
              {contact.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
