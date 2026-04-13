import { useState, useCallback } from 'react'
import { AI_SYSTEM_PROMPT } from '../constants/data'

/**
 * useChat — manages conversation state and Anthropic API calls.
 * Returns messages, loading state, sendMessage, and clearChat.
 */
export function useChat(initialGreeting) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: initialGreeting },
  ])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendMessage = useCallback(async (userText) => {
    if (!userText.trim() || loading) return

    const userMsg = { role: 'user', content: userText }
    const updatedHistory = [...messages, userMsg]

    setMessages(updatedHistory)
    setLoading(true)
    setError(null)

    // Build payload — only send role+content pairs to API
    const apiMessages = updatedHistory.map(({ role, content }) => ({ role, content }))

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 500,
          system: AI_SYSTEM_PROMPT,
          messages: apiMessages.slice(-12), // keep last 12 turns (6 exchanges)
        }),
      })

      if (!response.ok) throw new Error(`API error ${response.status}`)

      const data = await response.json()
      const reply = data.content?.[0]?.text ?? 'Sorry, I hit a snag. Try again in a moment!'

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      console.error('BharatAI chat error:', err)
      setError('Connection issue — please try again.')
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Oops! Looks like I lost my signal for a moment 📡 Please try again.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }, [messages, loading])

  const clearChat = useCallback(() => {
    setMessages([{ role: 'assistant', content: initialGreeting }])
    setError(null)
  }, [initialGreeting])

  return { messages, loading, error, sendMessage, clearChat }
}
