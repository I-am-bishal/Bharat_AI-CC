import React, { useState } from 'react'
import { DESTINATIONS } from '../constants/data'
import { useInView } from '../hooks/useInView'
import styles from './Destinations.module.css'

const CATEGORIES = ['All', 'Beaches', 'Mountains', 'Heritage', 'Backwaters', 'Spiritual', 'Urban + Caves']

// ── Single destination card ───────────────────────────────────────
function DestCard({ destination, index, onExplore }) {
  const { ref, inView } = useInView({ threshold: 0.1 })
  const {
    name, state, emoji, category, tagline, description,
    bestTime, dailyCost, crowd, crowdLevel, rating, reviews,
    badge, gradient,
  } = destination

  // Crowd indicator colour
  const crowdColor =
    crowdLevel < 35 ? 'var(--color-teal)' :
    crowdLevel < 65 ? 'var(--color-gold)' :
                      'var(--color-flame)'

  return (
    <article
      ref={ref}
      className={`${styles.card} ${inView ? styles.visible : ''}`}
      style={{ animationDelay: `${index * 80}ms` }}
      onClick={() => onExplore(destination)}
      role="button"
      tabIndex={0}
      aria-label={`Explore ${name}`}
      onKeyDown={(e) => e.key === 'Enter' && onExplore(destination)}
    >
      {/* Image area */}
      <div className={styles.imgWrap} style={{ background: gradient }}>
        {badge && (
          <span className={`${styles.badge} ${styles[`badge--${badge.variant}`]}`}>
            {badge.label}
          </span>
        )}
        <span className={styles.emoji} aria-hidden="true">{emoji}</span>
        <div className={styles.imgOverlay} />
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.categoryRow}>
          <span className={styles.category}>{category}</span>
          <span className={styles.rating}>
            ★ {rating} <span className={styles.reviews}>({(reviews / 1000).toFixed(1)} k)</span>
          </span>
        </div>

        <h3 className={styles.name}>{name}</h3>
        <p className={styles.state}>📍 {state}</p>
        <p className={styles.tagline}>{tagline}</p>
        <p className={styles.desc}>{description}</p>

        {/* Meta row */}
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon}>🕐</span>
            <div>
              <div className={styles.metaLabel}>Best time</div>
              <div className={styles.metaValue}>{bestTime}</div>
            </div>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon}>💰</span>
            <div>
              <div className={styles.metaLabel}>From</div>
              <div className={styles.metaValue}>{dailyCost}/day</div>
            </div>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaIcon}>👥</span>
            <div>
              <div className={styles.metaLabel}>Crowds</div>
              <div className={styles.metaValue} style={{ color: crowdColor }}>{crowd}</div>
            </div>
          </div>
        </div>

        {/* Crowd bar */}
        <div className={styles.crowdBarWrap} aria-label={`Crowd level: ${crowdLevel}%`}>
          <div className={styles.crowdBar}>
            <div
              className={styles.crowdFill}
              style={{ width: `${crowdLevel}%`, background: crowdColor }}
            />
          </div>
        </div>

        <button className={`btn btn-ghost ${styles.exploreBtn}`} tabIndex={-1}>
          Explore destination →
        </button>
      </div>
    </article>
  )
}

// ── Section ───────────────────────────────────────────────────────
export default function Destinations({ onChatWith }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const { ref: titleRef, inView: titleInView } = useInView()

  const filtered =
    activeCategory === 'All'
      ? DESTINATIONS
      : DESTINATIONS.filter((d) => d.category === activeCategory)

  const handleExplore = (dest) => {
    onChatWith?.(dest.chatPrompt)
    // smooth-scroll to chat section
    document.getElementById('ai-chat')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={`${styles.section} gradient-mesh`} id="destinations">
      <div className="container">
        {/* Header */}
        <div ref={titleRef} className={`${styles.header} ${titleInView ? styles.headerVisible : ''}`}>
          <div className="section-tag">🌐 EXPLORE INDIA</div>
          <h2 className={`font-display ${styles.title}`}>
            Discover{' '}
            <span className="text-gradient">incredible destinations</span>
          </h2>
          <p className={`${styles.subtitle} text-muted`}>
            AI-analysed destinations with live crowd density, price predictions,
            and personalised highlights — updated every 24 hours.
          </p>
        </div>

        {/* Category filter */}
        <div className={styles.filters} role="tablist" aria-label="Filter destinations">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`${styles.filter} ${activeCategory === cat ? styles.filterActive : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {filtered.map((dest, i) => (
            <DestCard
              key={dest.id}
              destination={dest}
              index={i}
              onExplore={handleExplore}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
