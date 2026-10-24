import { Link, useParams } from 'react-router-dom'
import Reveal from '../../components/Reveal/Reveal.jsx'
import WordRise from '../../components/WordRise/WordRise.jsx'
import usePageTitle from '../../hooks/usePageTitle.js'
import NotFoundPage from '../NotFound/NotFoundPage.jsx'
import { useContent } from '../../content/useContent.js'
import styles from './NewsArticlePage.module.css'

// One news article, e.g. /news/3. The newsletter's pages are shown top to bottom.
export default function NewsArticlePage() {
  const { id } = useParams()
  const news = useContent('news')
  const article = news.find((item) => String(item.id) === id)
  usePageTitle(article?.title ?? 'Not found')

  if (!article) return <NotFoundPage />

  return (
    <article className={`wrap ${styles.article}`}>
      <Link to="/news" className={styles.back}>
        ← All news
      </Link>
      <header className={styles.header}>
        <Reveal as="time" className={styles.date}>
          {article.date}
        </Reveal>
        <WordRise as="h1" text={article.title} className={styles.title} />
        <Reveal as="p" order={1} className={styles.author}>
          {article.author}
        </Reveal>
        <Reveal as="p" order={2} className={styles.summary}>
          {article.summary}
        </Reveal>
      </header>
      <div className={styles.pages}>
        {(article.pages ?? [article.image]).map((page, i, all) => (
          <Reveal as="figure" key={page}>
            <img src={page} alt={`${article.title}, page ${i + 1}`} loading={i === 0 ? 'eager' : 'lazy'} />
            {all.length > 1 && (
              <figcaption>
                Page {i + 1} of {all.length}
              </figcaption>
            )}
          </Reveal>
        ))}
      </div>
      <Link to="/news" className={styles.back}>
        ← All news
      </Link>
    </article>
  )
}
