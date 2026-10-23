import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button/Button.jsx'
import SmartLink from '../SmartLink/SmartLink.jsx'
import ThemeToggle from '../ThemeToggle/ThemeToggle.jsx'
import { navLinks } from '../../data/navigation.js'
import logoIcon from '../../assets/images/whitefg_purplebg_small.png'
import styles from './Navbar.module.css'

// Top bar on every page. On phones the links fold into a menu button.
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={styles.nav}>
      <div className={`wrap ${styles.inner}`}>
        <Link to="/" className={styles.brand} onClick={closeMenu}>
          <img src={logoIcon} alt="" className={styles.icon} />
          RoboTeam <span>Twente</span>
        </Link>
        <div className={styles.links}>
          {navLinks.map((link) => (
            <SmartLink key={link.href} href={link.href}>
              {link.label}
            </SmartLink>
          ))}
        </div>
        <div className={styles.actions}>
          <ThemeToggle />
          <Button href="/join" small>
            Join us
          </Button>
          <button
            type="button"
            className={`${styles.menuButton} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <SmartLink key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </SmartLink>
          ))}
        </div>
      )}
    </nav>
  )
}
