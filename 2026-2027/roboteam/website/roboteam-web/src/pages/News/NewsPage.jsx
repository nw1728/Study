import { Link } from 'react-router-dom'
import PageHero from '../../components/PageHero/PageHero.jsx'
import Reveal from '../../components/Reveal/Reveal.jsx'
import usePageTitle from '../../hooks/usePageTitle.js'
import { news } from '../../data/news.js'
import styles from './NewsPage.module.css'

export default function NewsPage() {
  usePageTitle('News')

  return (
    <>
      <PageHero label="News" title="From the team." lead="Updates, newsletters and stories from RoboTeam Twente." />
      <section>
        <div className={`wrap ${styles.grid}`}>
          {news.map((article, i) => (
            <Reveal as={Link} key={article.id} to={`/news/${article.id}`} order={i % 3} className={styles.card}>
              <img src={article.image} alt="" className={styles.image} loading="lazy" />
              <div className={styles.body}>
                <time>{article.date}</time>
                <h2>{article.title}</h2>
                <p>{article.summary}</p>
                <span className={styles.more}>Read more →</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
