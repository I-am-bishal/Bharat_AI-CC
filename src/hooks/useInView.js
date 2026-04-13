import { useEffect, useRef, useState } from 'react'

/**
 * useInView — triggers when element enters the viewport.
 * @param {Object} options - IntersectionObserver options
 * @param {boolean} options.once - stop observing after first trigger (default: true)
 * @returns {{ ref, inView }}
 */
export function useInView({ threshold = 0.15, rootMargin = '0px', once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, inView }
}
