import PageHero from '../../components/PageHero/PageHero.jsx'
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx'
import Reveal from '../../components/Reveal/Reveal.jsx'
import Button from '../../components/Button/Button.jsx'
import PositionCard from './PositionCard.jsx'
import usePageTitle from '../../hooks/usePageTitle.js'
import { useContent } from '../../content/useContent.js'
import styles from './JoinPage.module.css'

/**
 * The Apply button: a mail with the subject and body already written.
 *
 * encodeURIComponent, not URLSearchParams: the latter writes a space as "+",
 * which some mail clients show literally in the body.
 */
function applyLinkFor(join) {
  const subject = encodeURIComponent(join.applyEmailSubject ?? '')
  const body = encodeURIComponent(join.applyEmailBody ?? '')
  return `mailto:${join.applyEmailTo}?subject=${subject}&body=${body}`
}

export default function JoinPage() {
  const join = useContent('join')
  const positions = useContent('positions')
  const applyLink = applyLinkFor(join)
  usePageTitle('Join us')

  return (
    <>
      <PageHero label="Join us" title="Build the rover with us." lead={join.intro}>
        <Button href={applyLink}>Apply now</Button>
        <Button href="#positions" variant="ghost">
          See open positions
        </Button>
      </PageHero>

      <section className={styles.photoSection}>
        <div className="wrap">
          <Reveal as="figure" className={styles.photo}>
            <img src="/images/team-2025-2026.jpg" alt="The 2025–2026 RoboTeam Twente team" />
            <figcaption>The 2025–2026 team.</figcaption>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="wrap">
          <SectionHeader label="Why join" title="More than a student project." />
          <ul className={styles.benefits}>
            {join.benefits.map((benefit, i) => (
              <Reveal as="li" key={benefit} order={i % 2}>
                {benefit}
              </Reveal>
            ))}
          </ul>
          <Reveal className={styles.cities}>
            <span>Our robots have competed in</span>
            {join.cities.map((city) => (
              <b key={city}>{city}</b>
            ))}
          </Reveal>
        </div>
      </section>

      <section>
        <div className="wrap">
          <SectionHeader label="How to apply" title="Three ways in." lead={join.requirements} />
          <ol className={styles.steps}>
            {join.steps.map((step, i) => (
              <Reveal as="li" key={step.title} order={i}>
                <span className={styles.stepNumber}>{String(i + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className={styles.callback}>
            <span>Callback day</span>
            <b>{join.callbackDay}</b>
          </Reveal>
        </div>
      </section>

      <section id="positions">
        <div className="wrap">
          <SectionHeader label="Open positions" title={`${positions.length} roles open right now.`} />
          <div className={styles.positions}>
            {positions.map((position, i) => (
              <Reveal key={position.title} order={i}>
                <PositionCard {...position} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.apply}>
        <div className="wrap">
          <Reveal as="h2" className={styles.applyTitle}>
            Interested? <em>Apply now.</em>
          </Reveal>
          <Reveal as="p" order={1} className={styles.applyText}>
            Send us an email with your motivation and CV, or join the waiting list for a future team.
          </Reveal>
          <Reveal order={2} className={styles.applyButtons}>
            <Button href={applyLink}>Apply by email</Button>
            {join.waitingLists.map((list) => (
              <Button key={list.href} href={list.href} variant="ghost">
                {list.label}
              </Button>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  )
}
