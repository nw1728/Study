import { useEffect, useState } from 'react'

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Animates a number from 0 to `end` once `start` becomes true.
export default function useCountUp(end, start, duration = 1200) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start || prefersReducedMotion) return
    const startTime = performance.now()
    let frame
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(end * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [end, start, duration])

  return prefersReducedMotion ? end : value
}
