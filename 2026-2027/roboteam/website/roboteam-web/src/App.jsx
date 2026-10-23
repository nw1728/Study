import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import RoverPet from './components/RoverPet/RoverPet.jsx'
import ScrollManager from './components/ScrollManager/ScrollManager.jsx'
import HomePage from './pages/Home/HomePage.jsx'
import JoinPage from './pages/Join/JoinPage.jsx'
import EventsPage from './pages/Events/EventsPage.jsx'
import NewsPage from './pages/News/NewsPage.jsx'
import NewsArticlePage from './pages/NewsArticle/NewsArticlePage.jsx'
import EducationPage from './pages/Education/EducationPage.jsx'
import ContactPage from './pages/Contact/ContactPage.jsx'
import PastTeamsPage from './pages/PastTeams/PastTeamsPage.jsx'
import SubteamPage from './pages/Subteam/SubteamPage.jsx'
import NotFoundPage from './pages/NotFound/NotFoundPage.jsx'

// Every page of the site, by address. Navbar, footer and the rover pet are shared by all pages.
// The addresses match the previous website, so old links keep working.
export default function App() {
  return (
    <>
      <ScrollManager />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsArticlePage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/past-teams" element={<PastTeamsPage />} />
          <Route path="/team/:slug" element={<SubteamPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <RoverPet />
    </>
  )
}
