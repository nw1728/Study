import SmartLink from '../SmartLink/SmartLink.jsx'
import styles from './Button.module.css'

// A pill-shaped link. variant="primary" is filled purple, variant="ghost" is outlined.
export default function Button({ href, variant = 'primary', small = false, children }) {
  return (
    <SmartLink href={href} className={`${styles.button} ${styles[variant]} ${small ? styles.small : ''}`}>
      {children}
    </SmartLink>
  )
}
