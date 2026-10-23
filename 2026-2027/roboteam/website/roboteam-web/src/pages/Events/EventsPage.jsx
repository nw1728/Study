import PageHero from '../../components/PageHero/PageHero.jsx'
import Reveal from '../../components/Reveal/Reveal.jsx'
import Button from '../../components/Button/Button.jsx'
import usePageTitle from '../../hooks/usePageTitle.js'
import { useContent } from '../../content/useContent.js'
import { socials } from '../../data/socials.js'
import styles from './EventsPage.module.css'

const instagram = socials.find((social) => social.label === 'Instagram')

export default function EventsPage() {
  const events = useContent('events')
  usePageTitle('Events')

  return (
    <>
      <PageHero
        label="Events"
        title="Come see us."
        lead="Competitions, workshops, fairs and demos: here's where you can meet the team and the rover."
      />
      <section>
        <div className="wrap">
          {events.length === 0 ? (
            <Reveal className={styles.empty}>
              <p>No upcoming events right now.</p>
              <Button href={instagram.href} variant="ghost">
                Follow us on Instagram
              </Button>
            </Reveal>
          ) : (
            <div className={styles.list}>
              {events.map((event) => (
                <Reveal as="article" key={event.id} className={styles.event}>
                  <div className={styles.date}>
                    <b>{event.day}</b>
                    <span>{event.month}</span>
                  </div>
                  <div className={styles.body}>
                    <h2>{event.title}</h2>
                    <p className={styles.meta}>
                      {event.place} · {event.time}
                    </p>
                    <p className={styles.description}>{event.description}</p>
                    {event.registerUrl && (
                      <div className={styles.register}>
                        <Button href={event.registerUrl}>Register</Button>
                      </div>
                    )}
                  </div>
                  {event.image && <img src={event.image} alt="" className={styles.image} loading="lazy" />}
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
