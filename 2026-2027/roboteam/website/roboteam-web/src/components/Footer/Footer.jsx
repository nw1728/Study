import SmartLink from '../SmartLink/SmartLink.jsx'
import { navLinks, footerLinks } from '../../data/navigation.js'
import { socials } from '../../data/socials.js'
import logo from '../../assets/images/whitefg_purplebg.png'
import styles from './Footer.module.css'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.columns}`}>
        <div>
          <img src={logo} alt="RoboTeam Twente" className={styles.logo} />
          <p>Innovate and inspire in the fields of robotics and AI.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            {[...navLinks, ...footerLinks].map((link) => (
              <li key={link.href}>
                <SmartLink href={link.href}>{link.label}</SmartLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Follow</h4>
          <ul>
            {socials.map((social) => (
              <li key={social.href}>
                <SmartLink href={social.href}>{social.label}</SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`wrap ${styles.bottom}`}>
        © {year} RoboTeam Twente. All rights reserved.
      </div>
    </footer>
  )
}
