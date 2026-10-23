import { Fragment } from 'react'
import useInView from '../../hooks/useInView.js'
import styles from './WordRise.module.css'

/*
 * A headline whose words slide up into place one after another.
 * Without `shown` it plays when scrolled into view; with `shown` the parent decides (e.g. the scroll story).
 */
export default function WordRise({ text, as: Tag = 'span', shown, className = '' }) {
  const [ref, inView] = useInView()
  const visible = shown ?? inView

  return (
    <Tag ref={ref} className={`${className} ${visible ? styles.shown : ''}`} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          <span className={styles.word} aria-hidden="true">
            <span className={styles.inner} style={{ '--i': i }}>
              {word}
            </span>
          </span>
        </Fragment>
      ))}
    </Tag>
  )
}
