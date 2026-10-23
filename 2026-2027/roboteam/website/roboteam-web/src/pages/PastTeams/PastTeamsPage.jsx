import PageHero from '../../components/PageHero/PageHero.jsx'
import Reveal from '../../components/Reveal/Reveal.jsx'
import Button from '../../components/Button/Button.jsx'
import Alumni from '../../sections/Alumni/Alumni.jsx'
import usePageTitle from '../../hooks/usePageTitle.js'
import { pastTeams } from '../../data/pastTeams.js'
import styles from './PastTeamsPage.module.css'

export default function PastTeamsPage() {
  usePageTitle('Past teams')
  const currentGeneration = pastTeams[0].generation + 1

  return (
    <>
      <PageHero
        label="Past teams"
        title={`${currentGeneration} generations.`}
        lead="A new team takes over every year. From RoboCup soccer robots to a Mars rover: these are the people who built RoboTeam Twente."
      >
        <Button href="/#team" variant="ghost">
          Meet this year's team (#{currentGeneration})
        </Button>
      </PageHero>

      <section>
        <div className={`wrap ${styles.timeline}`}>
          {pastTeams.map((team) => (
            <Reveal as="article" key={team.years} className={styles.generation}>
              <div className={styles.marker}>
                <b>#{team.generation}</b>
                <span>{team.years}</span>
              </div>
              <div className={styles.content}>
                <img src={team.photo} alt={`RoboTeam Twente ${team.years}`} className={styles.photo} loading="lazy" />
                <p className={styles.story}>{team.story}</p>
                <details className={styles.members}>
                  <summary>Team members ({team.members.length})</summary>
                  <ul>
                    {team.members.map((name) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                </details>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Alumni />
    </>
  )
}
