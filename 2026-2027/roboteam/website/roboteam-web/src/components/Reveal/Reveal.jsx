import useInView from '../../hooks/useInView.js'
import styles from './Reveal.module.css'

/*
 * Fades its content in when it scrolls into view (the Apple-style effect).
 * `from` picks the direction it slides in from: "below" (default), "left" or "right".
 * `order` staggers siblings: order={0} appears first, order={1} a moment later, and so on.
 * `as` picks the HTML tag, e.g. <Reveal as="h2">.
 */
export default function Reveal({ as: Tag = 'div', from = 'below', order = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView()
  const delay = Math.min(order * 0.1, 0.6)

  return (
    <Tag
      ref={ref}
      className={`${styles.reveal} ${styles[from]} ${inView ? styles.visible : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
