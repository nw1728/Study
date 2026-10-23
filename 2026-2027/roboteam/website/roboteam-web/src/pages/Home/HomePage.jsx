import usePageTitle from '../../hooks/usePageTitle.js'
import ScrollStory from '../../sections/ScrollStory/ScrollStory.jsx'
import Statement from '../../sections/Statement/Statement.jsx'
import Stats from '../../sections/Stats/Stats.jsx'
import About from '../../sections/About/About.jsx'
import Achievements from '../../sections/Achievements/Achievements.jsx'
import Team from '../../sections/Team/Team.jsx'
import Events from '../../sections/Events/Events.jsx'
import Alumni from '../../sections/Alumni/Alumni.jsx'
import Partners from '../../sections/Partners/Partners.jsx'
import News from '../../sections/News/News.jsx'
import Join from '../../sections/Join/Join.jsx'
import Contact from '../../sections/Contact/Contact.jsx'

// The front page, top to bottom. To reorder or remove a section, edit this list.
export default function HomePage() {
  usePageTitle(null)

  return (
    <>
      <ScrollStory />
      <Statement />
      <Stats />
      <About />
      <Achievements />
      <Team />
      <Events />
      <Alumni />
      <Partners />
      <News />
      <Join />
      <Contact />
    </>
  )
}
