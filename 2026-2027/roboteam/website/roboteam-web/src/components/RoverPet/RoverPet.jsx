import { useEffect, useRef } from 'react'
import Rover from './Rover.jsx'
import RoverBrain from './RoverBrain.js'
import TextObstacles from './TextObstacles.js'
import { petAvailable } from '../../lib/petAvailable.js'
import styles from './RoverPet.module.css'

const WHEEL_RADIUS = 6
const SIZE = { width: 56, height: 42 }

// Little symbol shown above the rover for each mood
const BUBBLES = {
  idle: '',
  happy: '♥',
  sad: '…',
  dance: '♪',
  curious: '?',
  sleepy: 'z z',
  lonely: '…?',
}

/*
 * A mini Mars rover that lives on the page like a pet.
 * Click anywhere and it drives there like a little car, steering around text.
 * Otherwise it stays near the cursor and does its own thing.
 * RoverBrain.js decides what it does, TextObstacles.js finds the text, and this file draws it.
 * While the scroll story at the top is playing, the pet waits offstage: the story's rover
 * "hands over" to it at the end (the 'rover-handoff' event from StoryDirector.js).
 * Only on devices with a mouse, and never for people who prefer reduced motion.
 */
export default function RoverPet() {
  const ref = useRef(null)

  useEffect(() => {
    if (!petAvailable) return

    const el = ref.current
    const bubble = el.querySelector(`.${styles.bubble}`)
    const body = el.querySelector(`.${styles.flipper}`)
    const wheels = el.querySelectorAll('[data-wheel]')
    const obstacles = new TextObstacles()
    const brain = new RoverBrain(80, window.innerHeight - 40, performance.now())
    let shownMood = null
    let wheelAngle = 0
    let frame

    const onMove = (e) => brain.onMouseMove(e.clientX, e.clientY, performance.now())
    const onLeaveWindow = (e) => {
      if (!e.relatedTarget) brain.onMouseLeave(performance.now())
    }
    const onClick = (e) => brain.onClick(e.clientX, e.clientY, performance.now())
    const onGrabEnd = () => el.classList.remove(styles.grabbing)
    const onPageMoved = () => obstacles.markDirty()

    let storyHasSpoken = false
    const onHandoff = (e) => {
      storyHasSpoken = true
      const { toPet, x, y } = e.detail
      const now = performance.now()
      if (toPet) {
        brain.teleport(x, y, false)
        brain.setMood('happy', now, 1800)
        if (brain.mouse) brain.onClick(brain.mouse.x, brain.mouse.y, now) // come say hi
        el.classList.add(styles.active)
      } else {
        el.classList.remove(styles.active)
      }
    }
    // if the page didn't open on the story (e.g. a link to #contact), just show the pet
    const showIfNoStory = setTimeout(() => {
      if (!storyHasSpoken) el.classList.add(styles.active)
    }, 600)

    const grab = () => {
      // remove + re-add so the grab animation restarts every time
      el.classList.remove(styles.grabbing)
      void el.offsetWidth
      el.classList.add(styles.grabbing)
    }

    const tick = (now) => {
      obstacles.refreshIfNeeded(now)
      const { speed, arrived } = brain.update(now, obstacles)
      if (arrived) grab()

      if (brain.mood !== shownMood) {
        el.dataset.mood = brain.mood // RoverPet.module.css animates each mood
        bubble.textContent = BUBBLES[brain.mood]
        shownMood = brain.mood
      }
      // tilt the body to the driving direction; mirror it when going left so it never drives upside down
      const degrees = (brain.heading * 180) / Math.PI
      const tilt = brain.facingLeft ? degrees - 180 : degrees
      body.style.transform = `rotate(${tilt}deg) scaleX(${brain.facingLeft ? -1 : 1})`

      wheelAngle += (speed / (2 * Math.PI * WHEEL_RADIUS)) * 360
      wheels.forEach((wheel) => {
        wheel.setAttribute('transform', `rotate(${wheelAngle} ${wheel.dataset.wheel} 40)`)
      })

      // (x, y) is the middle of the rover
      el.style.transform = `translate3d(${brain.x - SIZE.width / 2}px, ${brain.y - SIZE.height / 2}px, 0)`
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('rover-handoff', onHandoff)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onClick)
    document.addEventListener('mouseout', onLeaveWindow)
    el.addEventListener('animationend', onGrabEnd)
    window.addEventListener('scroll', onPageMoved, { passive: true })
    window.addEventListener('resize', onPageMoved)
    frame = requestAnimationFrame(tick)

    return () => {
      clearTimeout(showIfNoStory)
      window.removeEventListener('rover-handoff', onHandoff)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onClick)
      document.removeEventListener('mouseout', onLeaveWindow)
      el.removeEventListener('animationend', onGrabEnd)
      window.removeEventListener('scroll', onPageMoved)
      window.removeEventListener('resize', onPageMoved)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={ref} className={styles.pet}>
      <span className={styles.bubble} />
      <div className={styles.mover}>
        <div className={styles.flipper}>
          <Rover />
        </div>
      </div>
    </div>
  )
}
