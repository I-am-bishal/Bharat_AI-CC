import React, { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const NAV_LINKS = [
  { label: 'AI Builder', href: '#planner'      },
  { label: 'Explore',    href: '#destinations'  },
  { label: 'Insights',   href: '#insights'      },
  { label: 'Rewards',    href: '#gamify'        },
  { label: 'Reviews',    href: '#testimonials'  },
]

export default function Navbar({ onChatClick }) {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Detect scroll position
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight active nav link via IntersectionObserver
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Close mobile menu on link click
  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`} role="banner">
      {/* Logo */}
      <a href="#hero" className={styles.logo} onClick={(e) => handleNavClick(e, '#hero')}>
        <span className={styles.logoIcon} aria-hidden="true">⚡</span>
        BharatAI
      </a>

      {/* Desktop nav links */}
      <nav className={styles.links} aria-label="Main navigation">
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className={`${styles.link} ${activeSection === href ? styles.linkActive : ''}`}
            onClick={(e) => handleNavClick(e, href)}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* CTA */}
      <div className={styles.actions}>
        <button
          className={`btn btn-primary ${styles.ctaBtn}`}
          onClick={onChatClick}
          aria-label="Talk to Aryan AI"
        >
          Talk to AI →
        </button>

        {/* Mobile hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className={styles.drawer} role="dialog" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={styles.drawerLink}
              onClick={(e) => handleNavClick(e, href)}
            >
              {label}
            </a>
          ))}
          <button className="btn btn-primary" onClick={() => { setMenuOpen(false); onChatClick?.() }}>
            Talk to AI →
          </button>
        </div>
      )}
    </header>
  )
}
