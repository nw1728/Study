import Reveal from '../../components/Reveal/Reveal.jsx'
import SectionHeader from '../../components/SectionHeader/SectionHeader.jsx'
import { news } from '../../data/news.js'
import styles from './News.module.css'

export default function News() {
  const [latest] = news
  if (!latest) return null

  return (
    <section id="news">
      <div className="wrap">
        <SectionHeader label="Latest news" title="From the team." />
        <Reveal as="a" from="right" href={latest.href} target="_blank" rel="noreferrer" className={styles.card}>
          <img src={latest.image} alt="" className={styles.image} />
          <div className={styles.body}>
            <time>{latest.date}</time>
            <h3>{latest.title}</h3>
            <p>{latest.summary}</p>
            <span className={styles.more}>Read more →</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
