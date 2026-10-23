import { Link, useParams } from 'react-router-dom'
import PageHero from '../../components/PageHero/PageHero.jsx'
import Reveal from '../../components/Reveal/Reveal.jsx'
import MemberCard from '../../components/MemberCard/MemberCard.jsx'
import usePageTitle from '../../hooks/usePageTitle.js'
import NotFoundPage from '../NotFound/NotFoundPage.jsx'
import { subteams } from '../../data/subteams.js'
import styles from './SubteamPage.module.css'

// One subteam and its members, e.g. /team/mechanical.
export default function SubteamPage() {
  const { slug } = useParams()
  const index = subteams.findIndex((team) => team.slug === slug)
  const subteam = subteams[index]
  usePageTitle(subteam?.name ?? 'Not found')

  if (!subteam) return <NotFoundPage />

  // previous / next subteam, wrapping around the list
  const previous = subteams[(index - 1 + subteams.length) % subteams.length]
  const next = subteams[(index + 1) % subteams.length]

  return (
    <>
      <PageHero label={`Subteam ${String(index + 1).padStart(2, '0')} / ${subteams.length}`} title={subteam.name} lead={subteam.longDescription} />

      <section className={styles.photoSection}>
        <div className="wrap">
          <Reveal as="img" src={subteam.image} alt={`The ${subteam.name} subteam`} className={styles.photo} />
        </div>
      </section>

      <section>
        <div className="wrap">
          <Reveal as="h2" className={styles.heading}>
            {subteam.members.length === 1 ? 'The member' : `The ${subteam.members.length} members`}
          </Reveal>
          <div className={styles.grid}>
            {subteam.members.map((member, i) => (
              <Reveal key={member.name} order={i % 4}>
                <MemberCard {...member} />
              </Reveal>
            ))}
          </div>

          <nav className={styles.pager} aria-label="Other subteams">
            <Link to={`/team/${previous.slug}`}>
              <span>← Previous</span>
              {previous.name}
            </Link>
            <Link to="/#team" className={styles.all}>
              All subteams
            </Link>
            <Link to={`/team/${next.slug}`} className={styles.next}>
              <span>Next →</span>
              {next.name}
            </Link>
          </nav>
        </div>
      </section>
    </>
  )
}
