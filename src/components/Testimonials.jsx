import React from 'react'
import { TESTIMONIALS } from '../constants/data'
import { useInView } from '../hooks/useInView'
import styles from './Testimonials.module.css'

function Stars({ count = 5 }) {
  return (
    <div className={styles.stars} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} aria-hidden="true">★</span>
      ))}
    </div>
  )
}

function TestimonialCard({ name, location, avatar, rating, text, trip, savings, index }) {
  const { ref, inView } = useInView({ threshold: 0.15 })

  return (
    <blockquote
      ref={ref}
      className={`${styles.card} ${inView ? styles.cardVisible : ''}`}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      {/* Quote mark */}
      <div className={styles.quoteMark} aria-hidden="true">"</div>

      <Stars count={rating} />

      <p className={styles.text}>{text}</p>

      <div className={styles.footer}>
        <div className={styles.avatarWrap}>
          <div className={styles.avatar} aria-hidden="true">{avatar}</div>
          <div>
            <div className={styles.name}>{name}</div>
            <div className={styles.location}>📍 {location}</div>
          </div>
        </div>
        <div className={styles.tripInfo}>
          <div className={styles.trip}>{trip}</div>
          <div className={styles.savings}>{savings}</div>
        </div>
      </div>
    </blockquote>
  )
}

export default function Testimonials() {
  const { ref: titleRef, inView: titleInView } = useInView()

  return (
    <section className={styles.section} id="testimonials">
      <div className="container">
        <div ref={titleRef} className={`${styles.header} ${titleInView ? styles.headerVisible : ''}`}>
          <div className="section-tag">💬 TRAVELLER STORIES</div>
          <h2 className={`font-display ${styles.title}`}>
            Real trips, <span className="text-gradient">real love.</span>
          </h2>
          <p className="text-muted" style={{ fontSize: '17px', lineHeight: 1.65 }}>
            Over 2.4 million AI-planned trips and counting. Here&apos;s what some of
            our travellers have to say.
          </p>
        </div>

        <div className={styles.grid}>
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} {...t} index={i} />
          ))}
        </div>

        {/* Aggregate stat strip */}
        <div className={styles.statsStrip}>
          {[
            { num: '2.4 M+',  label: 'Trips planned' },
            { num: '₹8,200',  label: 'Avg savings per trip' },
            { num: '98 %',    label: 'Would recommend' },
            { num: '4.9 / 5', label: 'App store rating' },
          ].map(({ num, label }) => (
            <div key={label} className={styles.statItem}>
              <div className={styles.statNum}>{num}</div>
              <div className={styles.statLabel}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
