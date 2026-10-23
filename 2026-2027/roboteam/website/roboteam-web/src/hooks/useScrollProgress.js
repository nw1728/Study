import { useEffect, useRef } from 'react'
import { clamp01 } from '../lib/timeline.js'

/*
 * Calls onProgress(progress) every frame while the section is on screen.
 * progress goes from 0 (section top reaches the top of the screen) to 1 (its bottom reaches the bottom),
 * and is smoothed so animations glide instead of jumping with each scroll tick.
 */
export default function useScrollProgress(ref, onProgress, { enabled = true, smoothing = 9 } = {}) {
  const callback = useRef(onProgress)

  useEffect(() => {
    callback.current = onProgress
  })

  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    let current = null
    let frame = null
    let lastTime = 0

    const scrollTarget = () => {
      const scrollable = Math.max(1, el.offsetHeight - window.innerHeight)
      return clamp01(-el.getBoundingClientRect().top / scrollable)
    }

    const tick = (now) => {
      const seconds = Math.min((now - lastTime) / 1000, 0.1)
      lastTime = now
      const target = scrollTarget()
      current = current === null ? target : current + (target - current) * (1 - Math.exp(-seconds * smoothing))
      if (Math.abs(target - current) < 0.0001) current = target
      callback.current(current)
      frame = requestAnimationFrame(tick)
    }

    // only animate while the section is visible
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && frame === null) {
        lastTime = performance.now()
        frame = requestAnimationFrame(tick)
      } else if (!entry.isIntersecting && frame !== null) {
        cancelAnimationFrame(frame)
        frame = null
        current = scrollTarget()
        callback.current(current)
      }
    })
    observer.observe(el)

    return () => {
      observer.disconnect()
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [ref, enabled, smoothing])
}
