import Reveal from '../../components/Reveal/Reveal.jsx'
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx'
import SubteamCard from '../../components/SubteamCard/SubteamCard.jsx'
import Button from '../../components/Button/Button.jsx'
import { useMembers } from '../../content/useMembers.js'
import styles from './Team.module.css'

export default function Team() {
  const { subteams } = useMembers()

  return (
    <section id="team">
      <div className="wrap">
        <SectionHeader
          label="Our team"
          title={`${subteams.length} subteams, one rover.`}
          lead="Meet the people who make RoboTeam Twente work."
        />
        <div className={styles.grid}>
          {subteams.map((subteam, i) => (
            <Reveal key={subteam.name} order={i % 3}>
              <SubteamCard number={i + 1} {...subteam} />
            </Reveal>
          ))}
        </div>
        <Reveal className={styles.more}>
          <Button href="/past-teams" variant="ghost">
            Meet the past teams
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
