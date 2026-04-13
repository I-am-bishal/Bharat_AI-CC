import React, { useState, useMemo } from 'react'
import { TRAVEL_STYLES, ITINERARIES, COST_MULTIPLIERS, DESTINATIONS } from '../constants/data'
import { useInView } from '../hooks/useInView'
import styles from './AIPlanner.module.css'

const MIN_BUDGET  = 5_000
const MAX_BUDGET  = 300_000
const MIN_DAYS    = 2
const MAX_DAYS    = 30

function formatINR(n) {
  return '₹' + n.toLocaleString('en-IN')
}

// ── Cost breakdown helper ─────────────────────────────────────────
function buildBreakdown(budget, days, styleId) {
  const multiplier = COST_MULTIPLIERS[styleId] ?? 1
  const total      = Math.round(budget * multiplier * 0.95)
  const daily      = Math.round(total / days)

  return {
    total,
    daily,
    accommodation: Math.round(total * 0.38),
    transport:     Math.round(total * 0.28),
    food:          Math.round(total * 0.20),
    activities:    Math.round(total * 0.14),
  }
}

// ── Day-wise itinerary card ───────────────────────────────────────
function DayCard({ day, title, desc, index }) {
  return (
    <div className={styles.dayCard} style={{ animationDelay: `${index * 60}ms` }}>
      <div className={styles.dayNum}>D{day}</div>
      <div className={styles.dayInfo}>
        <div className={styles.dayTitle}>{title}</div>
        <div className={styles.dayDesc}>{desc}</div>
      </div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────
export default function AIPlanner({ onOpenChat }) {
  const [budget,      setBudget]      = useState(25_000)
  const [days,        setDays]        = useState(7)
  const [activeStyle, setActiveStyle] = useState(TRAVEL_STYLES[0].id)
  const [generated,   setGenerated]   = useState(false)

  const { ref: titleRef, inView: titleInView } = useInView()

  // Derive destination + itinerary from style
  const selectedStyle = TRAVEL_STYLES.find((s) => s.id === activeStyle) ?? TRAVEL_STYLES[0]
  const destination   = DESTINATIONS.find((d) => d.id === selectedStyle.dest) ?? DESTINATIONS[0]
  const itinerary     = (ITINERARIES[selectedStyle.dest] ?? []).slice(0, Math.min(days, 5))
  const breakdown     = useMemo(() => buildBreakdown(budget, days, activeStyle), [budget, days, activeStyle])

  const handleGenerate = () => {
    setGenerated(true)
    document.getElementById('planner-preview')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  const handleBook = () => {
    const prompt = `I want to book the ${destination.name} trip: ${days} days, budget ${formatINR(budget)}. Style: ${selectedStyle.label}. Help me finalise this plan.`
    onOpenChat?.(prompt)
    document.getElementById('ai-chat')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.section} id="planner">
      <div className="container">
        {/* Header */}
        <div ref={titleRef} className={`${styles.header} ${titleInView ? styles.headerVisible : ''}`}>
          <div className="section-tag">🧠 AI TRIP BUILDER</div>
          <h2 className={`font-display ${styles.title}`}>
            One click.{' '}
            <span className="text-gradient">Plan everything for you.</span>
          </h2>
          <p className={`text-muted ${styles.subtitle}`}>
            Set your budget and travel style. The AI picks the destination,
            hotels, transport, day-wise itinerary, and cost breakdown instantly.
          </p>
        </div>

        <div className={styles.grid}>
          {/* ── Controls ── */}
          <div className={styles.controls}>
            {/* Budget slider */}
            <div className={styles.controlGroup}>
              <label className={styles.controlLabel}>
                Budget
                <span className={styles.controlValue}>{formatINR(budget)}</span>
              </label>
              <input
                type="range"
                min={MIN_BUDGET}
                max={MAX_BUDGET}
                step={2500}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className={styles.slider}
                aria-label="Trip budget"
              />
              <div className={styles.sliderRange}>
                <span>{formatINR(MIN_BUDGET)}</span>
                <span>{formatINR(MAX_BUDGET)}</span>
              </div>
            </div>

            {/* Duration slider */}
            <div className={styles.controlGroup}>
              <label className={styles.controlLabel}>
                Duration
                <span className={styles.controlValue}>{days} {days === 1 ? 'day' : 'days'}</span>
              </label>
              <input
                type="range"
                min={MIN_DAYS}
                max={MAX_DAYS}
                step={1}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className={styles.slider}
                aria-label="Trip duration"
              />
              <div className={styles.sliderRange}>
                <span>{MIN_DAYS} days</span>
                <span>{MAX_DAYS} days</span>
              </div>
            </div>

            {/* Travel style tags */}
            <div className={styles.controlGroup}>
              <label className={styles.controlLabel}>Travel style</label>
              <div className={styles.tags} role="group" aria-label="Travel style options">
                {TRAVEL_STYLES.map((s) => (
                  <button
                    key={s.id}
                    className={`${styles.tag} ${activeStyle === s.id ? styles.tagActive : ''}`}
                    onClick={() => { setActiveStyle(s.id); setGenerated(false) }}
                    aria-pressed={activeStyle === s.id}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <button className={styles.generateBtn} onClick={handleGenerate}>
              ⚡ Generate My Perfect Trip
            </button>
          </div>

          {/* ── Preview panel ── */}
          <div className={`${styles.preview} ${generated ? styles.previewHighlight : ''}`} id="planner-preview">
            {/* Destination header */}
            <div className={styles.previewHeader}>
              <div className={styles.previewIcon}>{destination.emoji}</div>
              <div>
                <div className={styles.previewTitle}>{destination.name}</div>
                <div className={styles.previewSub}>
                  AI-curated · {days} days · {selectedStyle.label}
                </div>
              </div>
              <div className={styles.aiChip}>🤖 AI</div>
            </div>

            {/* Itinerary */}
            <div className={styles.itinerary}>
              {itinerary.map((item, i) => (
                <DayCard key={item.day} {...item} index={i} />
              ))}
              {days > itinerary.length && (
                <div className={styles.moreDays}>
                  + {days - itinerary.length} more AI-personalised days…
                </div>
              )}
            </div>

            {/* Cost breakdown */}
            <div className={styles.breakdown}>
              <div className={styles.breakdownTitle}>Cost breakdown</div>
              {[
                { label: 'Accommodation', value: breakdown.accommodation },
                { label: 'Transport',      value: breakdown.transport },
                { label: 'Food & dining',  value: breakdown.food },
                { label: 'Activities',     value: breakdown.activities },
              ].map(({ label, value }) => (
                <div key={label} className={styles.breakdownRow}>
                  <span className={styles.breakdownLabel}>{label}</span>
                  <span className={styles.breakdownValue}>{formatINR(value)}</span>
                </div>
              ))}
              <div className={`${styles.breakdownRow} ${styles.breakdownTotal}`}>
                <span>Estimated total</span>
                <span className={styles.totalValue}>{formatINR(breakdown.total)}</span>
              </div>
            </div>

            <button className={`btn btn-primary ${styles.bookBtn}`} onClick={handleBook}>
              Book this trip with AI →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
