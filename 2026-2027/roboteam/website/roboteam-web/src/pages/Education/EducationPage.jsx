import { useState } from 'react'
import PageHero from '../../components/PageHero/PageHero.jsx'
import Reveal from '../../components/Reveal/Reveal.jsx'
import Button from '../../components/Button/Button.jsx'
import ActivityCard from './ActivityCard.jsx'
import usePageTitle from '../../hooks/usePageTitle.js'
import { useContent } from '../../content/useContent.js'
import styles from './EducationPage.module.css'

export default function EducationPage() {
  const contact = useContent('contact')
  const { intro: educationIntro, note: educationNote } = useContent('educationPage')
  const activityGroups = useContent('activityGroups')
  usePageTitle('Education')
  // The first tab is the one that opens; a tab that is renamed away falls
  // back to the first rather than showing nothing.
  const [activeId, setActiveId] = useState(null)
  const activeGroup = activityGroups.find((group) => group.id === activeId) ?? activityGroups[0]

  return (
    <>
      <PageHero label="Education" title="Robotics workshops & teambuilding." lead={educationIntro}>
        <Button href={`mailto:${contact.educationEmail}`}>Book a workshop</Button>
      </PageHero>

      <section>
        <div className="wrap">
          <div className={styles.tabs} role="tablist" aria-label="Kinds of activities">
            {activityGroups.map((group) => (
              <button
                key={group.id}
                type="button"
                role="tab"
                aria-selected={group.id === activeGroup?.id}
                className={group.id === activeGroup?.id ? styles.activeTab : ''}
                onClick={() => setActiveId(group.id)}
              >
                {group.label}
                <span>{group.activities?.length ?? 0}</span>
              </button>
            ))}
          </div>
          {/* key: re-mount on tab change so the cards fade in again */}
          <div key={activeGroup?.id} className={styles.grid} role="tabpanel">
            {(activeGroup?.activities ?? []).map((activity, i) => (
              <Reveal key={activity.title} order={i}>
                <ActivityCard {...activity} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.contact}>
        <div className="wrap">
          <Reveal as="h2" className={styles.contactTitle}>
            Interested in a workshop or event?
          </Reveal>
          <Reveal as="p" order={1} className={styles.contactText}>
            Contact our Educational Manager for more information.
          </Reveal>
          <Reveal order={2}>
            <Button href={`mailto:${contact.educationEmail}`}>{contact.educationEmail}</Button>
          </Reveal>
          <Reveal as="p" order={3} className={styles.note}>
            {educationNote}
          </Reveal>
        </div>
      </section>
    </>
  )
}
