import { useEffect, useRef } from 'react'
import Rover from './Rover.jsx'
import styles from './RoverCursor.module.css'

const FOLLOW_SPEED = 0.12 // 0..1, higher = rover catches up faster
const OFFSET = { x: 12, y: 16 } // where the rover sits relative to the mouse
const WHEEL_RADIUS = 6

/*
 * A mini Mars rover that drives after the mouse.
 * - Wheels spin with the distance driven, and it turns to face where it's going.
 * - Hovering a link or button raises the arm; clicking makes the arm reach down and grab.
 * Only on devices with a mouse, and never for people who prefer reduced motion.
 */
export default function RoverCursor() {
  const ref = useRef(null)

  useEffect(() => {
    const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!hasMouse || reducedMotion) return

    const el = ref.current
    const wheels = el.querySelectorAll('[data-wheel]')
    const mouse = { x: -100, y: -100 }
    const rover = { x: -100, y: -100 }
    let wheelAngle = 0
    let frame

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      el.classList.add(styles.active)
      el.classList.toggle(styles.pointing, Boolean(e.target.closest('a, button')))
    }
    const onLeaveWindow = (e) => {
      if (!e.relatedTarget) el.classList.remove(styles.active)
    }
    const onClick = () => {
      // remove + re-add so the grab animation restarts on every click
      el.classList.remove(styles.grabbing)
      void el.offsetWidth
      el.classList.add(styles.grabbing)
    }
    const onGrabEnd = () => el.classList.remove(styles.grabbing)

    const tick = () => {
      const dx = (mouse.x - rover.x) * FOLLOW_SPEED
      rover.x += dx
      rover.y += (mouse.y - rover.y) * FOLLOW_SPEED

      if (Math.abs(dx) > 0.3) el.classList.toggle(styles.facingLeft, dx < 0)
      wheelAngle += (Math.abs(dx) / (2 * Math.PI * WHEEL_RADIUS)) * 360
      wheels.forEach((wheel) => {
        wheel.setAttribute('transform', `rotate(${wheelAngle} ${wheel.dataset.wheel} 40)`)
      })

      el.style.transform = `translate3d(${rover.x + OFFSET.x}px, ${rover.y + OFFSET.y}px, 0)`
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onClick)
    document.addEventListener('mouseout', onLeaveWindow)
    el.addEventListener('animationend', onGrabEnd)
    frame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onClick)
      document.removeEventListener('mouseout', onLeaveWindow)
      el.removeEventListener('animationend', onGrabEnd)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={ref} className={styles.cursor}>
      <div className={styles.flipper}>
        <Rover />
      </div>
    </div>
  )
}
