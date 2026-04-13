import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { useChat } from '../hooks/useChat'
import { QUICK_QUESTIONS } from '../constants/data'
import styles from './AIChat.module.css'

const GREETING = `Namaste! 🙏 I'm Aryan, your AI travel companion for India. I can plan complete itineraries, suggest hidden gems, predict the best travel windows, compare destinations, and help you book the perfect trip.

What kind of Indian adventure are you dreaming of?`

// ── Typing indicator ──────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className={`${styles.message} ${styles.messageAI}`} aria-live="polite" aria-label="Aryan is typing">
      <div className={styles.typingDots}>
        <span className={`${styles.dot} dot-1`} />
        <span className={`${styles.dot} dot-2`} />
        <span className={`${styles.dot} dot-3`} />
      </div>
    </div>
  )
}

// ── Single message bubble ─────────────────────────────────────────
function MessageBubble({ role, content }) {
  const isAI = role === 'assistant'
  return (
    <div
      className={`${styles.message} ${isAI ? styles.messageAI : styles.messageUser}`}
      role="article"
      aria-label={isAI ? 'Aryan AI response' : 'Your message'}
    >
      {content}
    </div>
  )
}

// ── AIChat — exported with forwardRef so parent can call .ask() ───
const AIChat = forwardRef(function AIChat(_, ref) {
  const { messages, loading, sendMessage, clearChat } = useChat(GREETING)
  const inputRef   = useRef(null)
  const messagesRef = useRef(null)

  // Expose .ask(prompt) to parent via ref
  useImperativeHandle(ref, () => ({
    ask(prompt) {
      sendMessage(prompt)
      inputRef.current?.focus()
    },
  }))

  // Auto-scroll to latest message
  useEffect(() => {
    const el = messagesRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, loading])

  const handleSend = () => {
    const val = inputRef.current?.value.trim()
    if (!val) return
    sendMessage(val)
    inputRef.current.value = ''
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <section className={styles.section} id="ai-chat">
      <div className="container">
        {/* Section header */}
        <div className={styles.header}>
          <div className="section-tag">🤖 AI TRAVEL COMPANION</div>
          <h2 className={`font-display ${styles.title}`}>
            Ask your <span className="text-gradient">AI travel expert</span>
            <br />anything about India.
          </h2>
          <p className="text-muted" style={{ fontSize: '17px', lineHeight: 1.65 }}>
            Powered by Claude — plan trips, compare destinations, get hidden-gem
            recommendations, and book. All in one conversation.
          </p>
        </div>

        {/* Chat box */}
        <div className={styles.chatBox} role="region" aria-label="AI Travel Chat">
          {/* Chat header bar */}
          <div className={styles.chatHeader}>
            <div className={styles.aiAvatar} aria-hidden="true">🤖</div>
            <div className={styles.aiMeta}>
              <div className={styles.aiName}>Aryan — AI Travel Expert</div>
              <div className={styles.aiStatus}>
                <div className="pulse-dot" />
                Online · Knows every corner of India
              </div>
            </div>
            <button
              className={`btn btn-ghost ${styles.clearBtn}`}
              onClick={clearChat}
              aria-label="Clear conversation"
              title="Clear chat"
            >
              ↺ Reset
            </button>
          </div>

          {/* Message list */}
          <div
            ref={messagesRef}
            className={styles.messages}
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((msg, i) => (
              <MessageBubble key={i} role={msg.role} content={msg.content} />
            ))}
            {loading && <TypingIndicator />}
          </div>

          {/* Quick question chips */}
          <div className={styles.quickRow} aria-label="Quick questions">
            {QUICK_QUESTIONS.map((q) => (
              <button
                key={q}
                className={styles.quickBtn}
                onClick={() => { sendMessage(q); inputRef.current?.focus() }}
                disabled={loading}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input row */}
          <div className={styles.inputRow}>
            <input
              ref={inputRef}
              className={styles.input}
              placeholder="Ask about any destination, budget, or itinerary…"
              onKeyDown={handleKeyDown}
              disabled={loading}
              aria-label="Chat message input"
              maxLength={500}
            />
            <button
              className={styles.sendBtn}
              onClick={handleSend}
              disabled={loading}
              aria-label="Send message"
            >
              {loading ? <span className={styles.sendSpinner} /> : '➤'}
            </button>
          </div>
        </div>

        {/* Trust note */}
        <p className={styles.trustNote}>
          🔒 Conversations are private. AI responses are suggestions — always verify
          bookings directly with providers.
        </p>
      </div>
    </section>
  )
})

export default AIChat
