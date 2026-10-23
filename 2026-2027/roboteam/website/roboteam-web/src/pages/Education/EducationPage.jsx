import { useState } from 'react'
import PageHero from '../../components/PageHero/PageHero.jsx'
import Reveal from '../../components/Reveal/Reveal.jsx'
import Button from '../../components/Button/Button.jsx'
import ActivityCard from './ActivityCard.jsx'
import usePageTitle from '../../hooks/usePageTitle.js'
import { activityGroups, educationIntro, educationNote } from '../../data/education.js'
import { useContent } from '../../content/useContent.js'
import styles from './EducationPage.module.css'

export default function EducationPage() {
  const contact = useContent('contact')
  usePageTitle('Education')
  const [activeId, setActiveId] = useState(activityGroups[0].id)
  const activeGroup = activityGroups.find((group) => group.id === activeId)

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
                aria-selected={group.id === activeId}
                className={group.id === activeId ? styles.activeTab : ''}
                onClick={() => setActiveId(group.id)}
              >
                {group.label}
                <span>{group.activities.length}</span>
              </button>
            ))}
          </div>
          {/* key: re-mount on tab change so the cards fade in again */}
          <div key={activeId} className={styles.grid} role="tabpanel">
            {activeGroup.activities.map((activity, i) => (
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
