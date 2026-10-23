import useInView from '../../hooks/useInView.js'
import styles from './RollingNumber.module.css'

const DIGITS = '0123456789'.split('')

// A number whose digits roll into place like an odometer when scrolled into view.
export default function RollingNumber({ value, className = '' }) {
  const [ref, inView] = useInView(0.4)

  return (
    <span ref={ref} className={`${styles.number} ${className}`} aria-label={String(value)}>
      {String(value)
        .split('')
        .map((char, i) =>
          DIGITS.includes(char) ? (
            <span key={i} className={styles.column} aria-hidden="true">
              <span
                className={styles.strip}
                style={{ transform: `translateY(${inView ? -Number(char) * 10 : 0}%)`, transitionDelay: `${i * 90}ms` }}
              >
                {DIGITS.map((digit) => (
                  <span key={digit}>{digit}</span>
                ))}
              </span>
            </span>
          ) : (
            <span key={i} aria-hidden="true">
              {char}
            </span>
          ),
        )}
    </span>
  )
}
