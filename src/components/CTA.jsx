import React, { useState } from 'react'
import { useInView } from '../hooks/useInView'
import styles from './CTA.module.css'

const FEATURES = [
  { icon: '🧠', label: 'AI Trip Planning'     },
  { icon: '💰', label: 'Price Predictions'    },
  { icon: '👥', label: 'Crowd Density AI'     },
  { icon: '🎮', label: 'Travel Rewards'       },
  { icon: '📱', label: 'Offline Itineraries'  },
  { icon: '🌦️', label: 'Weather Intelligence' },
]

export default function CTA({ onPlanClick, onChatClick }) {
  const { ref, inView } = useInView({ threshold: 0.2 })
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim()) return
    // In production: POST to your mailing list / waitlist API
    setSubmitted(true)
    setEmail('')
  }

  return (
    <section className={styles.section} id="cta">
      {/* Decorative glow orbs */}
      <div className={styles.orb1} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      <div className="container">
        <div
          ref={ref}
          className={`${styles.inner} ${inView ? styles.innerVisible : ''}`}
        >
          {/* Heading */}
          <div className={styles.badge}>
            <div className="pulse-dot" />
            START YOUR AI JOURNEY TODAY
          </div>

          <h2 className={`font-display ${styles.title}`}>
            The world is waiting.
            <br />
            <span className="text-gradient">India is calling.</span>
          </h2>

          <p className={`text-muted ${styles.subtitle}`}>
            Join 2.4 million travellers who let AI build their perfect Indian
            adventure. Free to start, no credit card required.
          </p>

          {/* Feature pills */}
          <div className={styles.features} aria-label="Platform features">
            {FEATURES.map(({ icon, label }) => (
              <div key={label} className={styles.featurePill}>
                <span aria-hidden="true">{icon}</span> {label}
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className={styles.buttons}>
            <button className="btn btn-primary" onClick={onPlanClick}>
              ⚡ Plan My Trip — It&apos;s Free
            </button>
            <button className="btn btn-outline" onClick={onChatClick}>
              🤖 Chat with Aryan AI
            </button>
          </div>

          {/* Email waitlist */}
          <div className={styles.waitlist}>
            <p className={styles.waitlistLabel}>
              Get notified when our mobile app launches →
            </p>
            {submitted ? (
              <div className={styles.waitlistSuccess}>
                🎉 You&apos;re on the list! We&apos;ll ping you at launch.
              </div>
            ) : (
              <form className={styles.emailForm} onSubmit={handleSubmit}>
                <input
                  type="email"
                  className={styles.emailInput}
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address for waitlist"
                />
                <button type="submit" className={`btn btn-primary ${styles.emailBtn}`}>
                  Notify me
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
