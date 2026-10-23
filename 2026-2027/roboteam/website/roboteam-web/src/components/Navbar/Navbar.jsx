import Button from '../Button/Button.jsx'
import { navLinks } from '../../data/navigation.js'
import logoIcon from '../../assets/images/whitefg_purplebg_small.png'
import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={`wrap ${styles.inner}`}>
        <a href="#home" className={styles.brand}>
          <img src={logoIcon} alt="" className={styles.icon} />
          RoboTeam <span>Twente</span>
        </a>
        <div className={styles.links}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <Button href="#join" small>
          Join us
        </Button>
      </div>
    </nav>
  )
}
