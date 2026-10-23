import Reveal from '../../components/Reveal/Reveal.jsx'
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx'
import styles from './About.module.css'

const skills = [
  'Designing and integrating complex robotic systems',
  'Working in multidisciplinary engineering teams',
  'Managing large technical projects',
  'Engineering solutions for real-world challenges',
]

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <SectionHeader
          label="Who we are"
          title="A technical playground."
          lead="RoboTeam Twente is a multidisciplinary student team from the University of Twente and Saxion University of Applied Sciences. Students from many engineering disciplines design, build and program advanced robots, gaining hands-on experience beyond the regular curriculum."
        />
        <div className={styles.columns}>
          <Reveal from="left">
            <h3>Our current project</h3>
            <p>
              We're developing an advanced Mars rover for the international European Rover Challenge.
              University teams from around the world deploy their rovers in a simulated Martian
              environment, where they take on autonomous navigation, terrain traversal and
              environmental analysis.
            </p>
            <h3 className={styles.spaced}>Our history</h3>
            <p>
              Before turning to planetary robotics, we competed in RoboCup with autonomous soccer robots
              and travelled to competitions around the world. That same spirit now drives our work on
              robots for future space exploration.
            </p>
          </Reveal>
          <Reveal from="right" order={1}>
            <h3>What members learn</h3>
            <ul className={styles.skills}>
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
