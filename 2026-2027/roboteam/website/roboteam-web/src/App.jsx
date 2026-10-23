import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import RoverCursor from './components/RoverCursor/RoverCursor.jsx'
import Hero from './sections/Hero/Hero.jsx'
import Statement from './sections/Statement/Statement.jsx'
import Stats from './sections/Stats/Stats.jsx'
import About from './sections/About/About.jsx'
import Achievements from './sections/Achievements/Achievements.jsx'
import Team from './sections/Team/Team.jsx'
import Events from './sections/Events/Events.jsx'
import Alumni from './sections/Alumni/Alumni.jsx'
import Partners from './sections/Partners/Partners.jsx'
import News from './sections/News/News.jsx'
import Join from './sections/Join/Join.jsx'
import Contact from './sections/Contact/Contact.jsx'

// The front page, top to bottom. To reorder or remove a section, edit this list.
export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
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
      </main>
      <Footer />
      <RoverCursor />
    </>
  )
}
