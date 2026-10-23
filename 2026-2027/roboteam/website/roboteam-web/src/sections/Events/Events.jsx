import Reveal from '../../components/Reveal/Reveal.jsx'
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx'
import EventCard from '../../components/EventCard/EventCard.jsx'
import Button from '../../components/Button/Button.jsx'
import { events } from '../../data/events.js'
import styles from './Events.module.css'

export default function Events() {
  if (events.length === 0) return null

  return (
    <section id="events">
      <div className="wrap">
        <SectionHeader label="Upcoming" title="Come see us." />
        <div className={styles.grid}>
          {events.map((event, i) => (
            <Reveal key={event.title} from={i % 2 === 0 ? 'left' : 'right'} order={i}>
              <EventCard {...event} />
            </Reveal>
          ))}
        </div>
        <Reveal className={styles.more}>
          <Button href="/events" variant="ghost">
            All event details
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
