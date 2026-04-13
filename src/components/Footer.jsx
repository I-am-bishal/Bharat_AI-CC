import React from 'react'
import styles from './Footer.module.css'

const FOOTER_LINKS = {
  'Explore': ['Goa', 'Himachal Pradesh', 'Rajasthan', 'Kerala', 'Uttarakhand', 'Maharashtra'],
  'Platform': ['AI Trip Builder', 'Price Predictor', 'Crowd Insights', 'Weather AI', 'Travel Rewards'],
  'Company':  ['About BharatAI', 'Blog', 'Careers', 'Press Kit', 'Contact Us'],
  'Legal':    ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'],
}

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className="container">
        <div className={styles.top}>
          {/* Brand column */}
          <div className={styles.brand}>
            <div className={styles.logo}>⚡ BharatAI</div>
            <p className={styles.tagline}>
              The world&apos;s first AI-powered travel operating system for India.
              Built with love for every kind of traveller.
            </p>
            <div className={styles.socials} aria-label="Social media links">
              {['𝕏', 'in', 'ig', 'yt'].map((icon) => (
                <a key={icon} href="#" className={styles.socialIcon} aria-label={icon}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className={styles.column}>
              <h3 className={styles.columnTitle}>{category}</h3>
              <ul className={styles.linkList}>
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className={styles.footerLink}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} BharatAI Travel OS · Made with ❤️ in India
          </p>
          <div className={styles.bottomBadges}>
            <span className={styles.badge}>🔒 SSL Secured</span>
            <span className={styles.badge}>🇮🇳 India Focused</span>
            <span className={styles.badge}>🤖 AI Powered</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
