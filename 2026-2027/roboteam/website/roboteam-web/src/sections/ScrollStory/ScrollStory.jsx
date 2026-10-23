import { useEffect, useRef, useState } from 'react'
import useScrollProgress from '../../hooks/useScrollProgress.js'
import { phases, phaseAt, logLinesAt, missionLog } from '../../data/story.js'
import StoryDirector from './StoryDirector.js'
import StoryIntro from './StoryIntro.jsx'
import PhaseText from './PhaseText.jsx'
import MissionLog from './MissionLog.jsx'
import SolCounter from './SolCounter.jsx'
import Stars from '../../components/Stars/Stars.jsx'
import StoryScene from './rover/StoryScene.jsx'
import styles from './ScrollStory.module.css'

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/*
 * The top of the page: a tall section with a pinned stage. As you scroll, the rover draws itself,
 * drives over a small planet, takes a sample, and finally drives off to become the rover pet.
 * StoryDirector.js does the animation; data/story.js holds the text; this file lays it out.
 */
export default function ScrollStory() {
  const sectionRef = useRef(null)
  const director = useRef(null)
  const [phase, setPhase] = useState(-1) // -1 = intro
  const [logCount, setLogCount] = useState(1)

  useEffect(() => {
    const storyDirector = new StoryDirector(sectionRef.current)
    director.current = storyDirector
    if (reducedMotion) storyDirector.showStatic()
    return () => storyDirector.release()
  }, [])

  useScrollProgress(
    sectionRef,
    (progress) => {
      director.current?.update(progress)
      setPhase(phaseAt(progress))
      setLogCount(logLinesAt(progress))
    },
    { enabled: !reducedMotion },
  )

  return (
    <section id="home" ref={sectionRef} className={`${styles.story} ${reducedMotion ? styles.static : ''}`}>
      <div className={styles.stage}>
        <Stars />
        <div className={styles.scene}>
          <StoryScene />
        </div>
        <div className={styles.headlines}>
          <StoryIntro shown={phase === -1} />
          {!reducedMotion &&
            phases.map((item, i) => <PhaseText key={item.id} phase={item} shown={phase === i} />)}
        </div>
        <MissionLog count={reducedMotion ? missionLog.length : logCount} />
        <SolCounter count={logCount} />
      </div>
      {reducedMotion && (
        <div className={`wrap ${styles.staticList}`}>
          {phases.map((item) => (
            <PhaseText key={item.id} phase={item} shown />
          ))}
        </div>
      )}
    </section>
  )
}
