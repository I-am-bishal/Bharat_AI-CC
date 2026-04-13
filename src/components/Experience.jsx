import React from 'react'
import { AI_INSIGHTS, BADGES } from '../constants/data'
import { useInView } from '../hooks/useInView'
import styles from './Experience.module.css'

// ── Insight card ──────────────────────────────────────────────────
function InsightCard({ icon, title, body, alert, index }) {
  const { ref, inView } = useInView({ threshold: 0.1 })
  return (
    <div
      ref={ref}
      className={`${styles.insightCard} ${inView ? styles.insightVisible : ''}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={styles.insightIcon}>{icon}</div>
      <h3 className={styles.insightTitle}>{title}</h3>
      <p className={styles.insightBody}>{body}</p>
      {alert && (
        <div className={`${styles.alert} ${alert.type === 'ok' ? styles.alertOk : styles.alertWarn}`}>
          {alert.text}
        </div>
      )}
    </div>
  )
}

// ── Badge card ────────────────────────────────────────────────────
function BadgeCard({ icon, name, desc, xpReward }) {
  return (
    <div className={styles.badgeCard}>
      <div className={styles.badgeIcon}>{icon}</div>
      <div className={styles.badgeName}>{name}</div>
      <div className={styles.badgeDesc}>{desc}</div>
      <div className={styles.badgeXP}>+{xpReward} XP</div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────
export default function Experience() {
  const { ref: insightRef, inView: insightInView } = useInView()
  const { ref: gamifyRef,  inView: gamifyInView  } = useInView()

  return (
    <>
      {/* ── AI Prediction Engine ── */}
      <section className={`${styles.section} ${styles.insightSection}`} id="insights">
        <div className="container">
          <div ref={insightRef} className={`${styles.sectionHead} ${insightInView ? styles.headVisible : ''}`}>
            <div className="section-tag">🔮 AI PREDICTION ENGINE</div>
            <h2 className={`font-display ${styles.title}`}>
              Smart insights,{' '}
              <span className="text-gradient">always ahead.</span>
            </h2>
            <p className="text-muted" style={{ fontSize: '17px', lineHeight: 1.65 }}>
              Our AI monitors prices, crowds, and weather 24/7 so you always
              travel at the perfect moment — never overpay, never over-crowd.
            </p>
          </div>

          <div className={styles.insightGrid}>
            {AI_INSIGHTS.map((item, i) => (
              <InsightCard key={item.id} {...item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Gamification ── */}
      <section className={`${styles.section} ${styles.gamifySection}`} id="gamify">
        <div className="container">
          <div ref={gamifyRef} className={`${styles.sectionHead} ${gamifyInView ? styles.headVisible : ''}`}>
            <div className="section-tag">🎮 TRAVEL REWARDS</div>
            <h2 className={`font-display ${styles.title}`}>
              Level up your{' '}
              <span className="text-gradient">explorer journey.</span>
            </h2>
            <p className="text-muted" style={{ fontSize: '17px', lineHeight: 1.65 }}>
              Earn XP, unlock badges, and climb leaderboards the more you explore
              India. Exclusive discounts unlock at every new level.
            </p>
          </div>

          {/* Badge grid */}
          <div className={styles.badgeGrid}>
            {BADGES.map((b) => (
              <BadgeCard key={b.id} {...b} />
            ))}
          </div>

          {/* XP progress bar */}
          <div className={styles.xpWrap}>
            <div className={styles.xpHeader}>
              <span className={styles.xpLabel}>Your Explorer XP</span>
              <span className={styles.xpLevel}>
                <span className="text-teal">Level 7</span>
                {' · '}3,250 / 5,000 XP
              </span>
            </div>
            <div className={styles.xpTrack} role="progressbar" aria-valuenow={65} aria-valuemax={100} aria-label="XP progress">
              <div className={styles.xpFill} style={{ width: '65%' }} />
            </div>
            <div className={styles.xpMilestones}>
              {['Level 6', 'Level 7', 'Level 8'].map((l, i) => (
                <span key={l} className={`${styles.milestone} ${i === 1 ? styles.milestoneCurrent : ''}`}>
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
