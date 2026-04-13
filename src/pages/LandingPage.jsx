import React, { useRef, useCallback } from 'react'

import Navbar       from '../components/Navbar'
import Hero         from '../components/Hero'
import Destinations from '../components/Destinations'
import AIPlanner    from '../components/AIPlanner'
import Experience   from '../components/Experience'
import AIChat       from '../components/AIChat'
import Testimonials from '../components/Testimonials'
import CTA          from '../components/CTA'
import Footer       from '../components/Footer'

/**
 * LandingPage
 *
 * Acts as the single source of truth for cross-section interactions:
 *  - Smooth-scrolling shortcuts passed down as props
 *  - Chat ref lets any section programmatically send a message to the AI
 */
export default function LandingPage() {
  const chatRef = useRef(null)

  // ── Scroll helpers ──────────────────────────────────────────────
  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const scrollToPlanner = useCallback(() => scrollTo('planner'),    [scrollTo])
  const scrollToChat    = useCallback(() => scrollTo('ai-chat'),    [scrollTo])

  // ── Ask the AI a pre-filled question from another section ───────
  const askAI = useCallback((prompt) => {
    chatRef.current?.ask(prompt)
    scrollToChat()
  }, [scrollToChat])

  return (
    <>
      {/* Persistent navigation */}
      <Navbar onChatClick={scrollToChat} />

      <main id="main-content">
        {/* 1. Hero — 3D globe + primary CTAs */}
        <Hero
          onPlanClick={scrollToPlanner}
          onChatClick={scrollToChat}
        />

        {/* 2. Interactive AI Trip Builder */}
        <AIPlanner onOpenChat={askAI} />

        {/* 3. Destination grid with filtering */}
        <Destinations onChatWith={askAI} />

        {/* 4. AI Insights + Gamification */}
        <Experience />

        {/* 5. Live Claude-powered chat */}
        <AIChat ref={chatRef} />

        {/* 6. Social proof */}
        <Testimonials />

        {/* 7. Final conversion CTA + email waitlist */}
        <CTA
          onPlanClick={scrollToPlanner}
          onChatClick={scrollToChat}
        />
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
