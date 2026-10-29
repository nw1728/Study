import { between, easeInOut, easeOut } from '../../lib/timeline.js'
import { petAvailable } from '../../lib/petAvailable.js'
import {
  CRATER_AT,
  NARROW_SCREEN,
  PIVOTS,
  PLANET,
  ROCKS,
  ROCK_HEIGHT,
  ROVER_ANCHOR,
  ROVER_SCALE,
  SAMPLE_BOX,
  SCOOP_TIP,
  WHEELS,
  WHEEL_RADIUS,
} from './rover/geometry.js'

/*
 * The choreography of the scroll story. update(progress) puts every part of the drawing
 * in the right state for that moment. All timings are progress ranges [start, end].
 * Plain JavaScript: it writes straight onto the SVG, no React re-render per frame.
 */

// Build: when each part draws itself
const DRAW = {
  planet: [0.06, 0.2],
  chassis: [0.1, 0.17],
  wheels: [0.13, 0.21],
  suspension: [0.17, 0.24],
  mast: [0.2, 0.26],
  arm: [0.23, 0.29],
}
const GHOST_FADE = [0.05, 0.24]

// Drive: the planet turns under the rover until the crater is in front of the arm
const DRIVE = [0.3, 0.56]
const ARM_REACH_DEGREES = 7 // how far ahead of the rover (along the surface) the scoop lands
const DRIVE_DEGREES = CRATER_AT - ARM_REACH_DEGREES

// Science: reach into the crater, scoop, drop soil into the sample box
const REACH = [0.6, 0.66]
const SCOOP = [0.66, 0.7]
const SAMPLES_FLY = [0.7, 0.77]
const STOW = [0.77, 0.8]
const ARM_POSE = { shoulder: 50, elbow: -16, wrist: 35 } // degrees at full reach

// Mission: zoom out to see the whole planet, look at the visitor, then drive off and become the pet
const ZOOM = [0.8, 0.9]
const ZOOM_SCALE = NARROW_SCREEN ? 0.12 : 0.17 // phones see less of the scene, so the planet shrinks more
const ZOOM_CENTER_Y = NARROW_SCREEN ? 395 : 470
const LOOK = [0.82, 0.86]
const LEAVE = [0.9, 0.97]
const LEAVE_DEGREES = 75
const HANDOFF = 0.95 // past this, the small rover pet takes over
const STAGE_LEAVING = 0.8 // once the stage's bottom edge is above 80% of the screen, the pet drives home

// Mood symbols, like the rover pet
const MOODS = [
  { range: [0.55, 0.62], symbol: '?' }, // looking at the crater
  { range: [0.76, 0.84], symbol: '♥' }, // got the sample
]

const toRadians = (deg) => (deg * Math.PI) / 180
const toDegrees = (rad) => (rad * 180) / Math.PI

export default class StoryDirector {
  constructor(section) {
    const q = (selector) => section.querySelector(selector)
    this.section = section
    this.rover = q('[data-rover]')
    this.parts = {}
    for (const name of Object.keys(DRAW)) {
      this.parts[name] = [...section.querySelectorAll(`[data-rover] [data-part="${name}"]`)]
    }
    this.parts.planet = [q('[data-part="planet"]')]
    this.joints = {}
    for (const el of this.rover.querySelectorAll('[data-joint]')) this.joints[el.dataset.joint] = el
    this.wheels = [...this.rover.querySelectorAll('[data-spin]')]
    this.samples = [...this.rover.querySelectorAll('[data-sample]')]
    this.bubble = q('[data-bubble]')
    this.ghost = q('[data-ghost]')
    this.planetSpin = q('[data-planet-spin]')
    this.scene = q('[data-scene]')
    this.orbit = q('[data-orbit]')
    this.stars = q('[data-stars]')
    this.orbitDot = q('[data-orbit-dot]')
    this.handedOff = null
    // the pet tells us when it has driven back onto the planet, so our rover can reappear
    this.onPetHome = () => {
      if (this.handedOff === false) this.rover.style.opacity = 1
    }
    window.addEventListener('rover-home', this.onPetHome)
  }

  update(p) {
    this.build(p)
    const turned = this.drive(p)
    this.science(p)
    const orbited = this.mission(p)

    // wheels turn by however far the rover has travelled over the surface
    const travelled = (toRadians(turned + orbited) * PLANET.r) / ROVER_SCALE
    const spin = toDegrees(travelled / WHEEL_RADIUS)
    this.wheels.forEach((wheel) => this.rotate(wheel, spin))

    this.stars.style.transform = `translate3d(0, ${-p * 60}px, 0)`
    this.orbitDot.style.transform = `rotate(${p * 360}deg)`
  }

  // reduced motion: the finished drawing, standing still
  showStatic() {
    for (const els of Object.values(this.parts)) els.forEach((el) => el.style.setProperty('--drawn', 1))
    this.ghost.style.opacity = 0
  }

  build(p) {
    for (const [name, [start, end]] of Object.entries(DRAW)) {
      const drawn = easeOut(between(p, start, end))
      this.parts[name].forEach((el) => el.style.setProperty('--drawn', drawn))
    }
    this.ghost.style.opacity = 0.6 * (1 - between(p, ...GHOST_FADE))
  }

  // returns how many degrees the planet has turned
  drive(p) {
    const turned = easeInOut(between(p, ...DRIVE)) * DRIVE_DEGREES
    this.rotate(this.planetSpin, -turned, `${PLANET.cx} ${PLANET.cy}`)

    // how high each wheel is lifted by a rock passing underneath
    const rocksX = ROCKS.map((rock) => {
      const alongSurface = toRadians(rock - turned) * PLANET.r
      return ROVER_ANCHOR[0] + alongSurface / ROVER_SCALE
    })
    const height = ROCK_HEIGHT / ROVER_SCALE
    const liftAt = (wheelX) =>
      Math.max(
        ...rocksX.map((rockX) => {
          const d = (rockX - wheelX) / 42
          return Math.abs(d) < 1 ? height * (1 - d * d) : 0
        }),
      )
    const lifts = { front: liftAt(WHEELS.front), rear: liftAt(WHEELS.rear) }
    this.tiltSuspension(lifts)

    const bumping = lifts.front + lifts.rear > 2
    const mood = MOODS.find(({ range }) => p >= range[0] && p <= range[1])
    this.bubble.textContent = bumping ? '!' : (mood?.symbol ?? '')
    return turned
  }

  // rocker: a lifted wheel tips the leg that carries both wheels, the body stays level
  tiltSuspension({ front, rear }) {
    const rocker = -toDegrees(Math.atan2(front - rear, WHEELS.front - PIVOTS.rocker[0]))
    this.rotate(this.joints.rocker, rocker)
  }

  science(p) {
    const stowed = 1 - easeInOut(between(p, ...STOW))
    const out = easeInOut(between(p, ...REACH)) * stowed
    const scoop = easeInOut(between(p, ...SCOOP)) * stowed
    this.rotate(this.joints.shoulder, ARM_POSE.shoulder * out)
    this.rotate(this.joints.elbow, ARM_POSE.elbow * out)
    this.rotate(this.joints.wrist, ARM_POSE.wrist * scoop)

    // soil dots arc from the scoop up into the sample box, one after another
    const [sx, sy] = SCOOP_TIP
    const [bx, by] = SAMPLE_BOX
    this.samples.forEach((dot, i) => {
      const t = easeInOut(between(between(p, ...SAMPLES_FLY), i * 0.12, 0.5 + i * 0.12))
      dot.setAttribute('cx', sx + (bx - sx) * t)
      dot.setAttribute('cy', sy + (by - sy) * t - Math.sin(t * Math.PI) * 70)
      dot.style.opacity = t > 0 && t < 1 ? 1 : 0
    })
  }

  // returns how many degrees the rover has driven around the planet
  mission(p) {
    const { cx, cy } = PLANET
    const zoom = easeInOut(between(p, ...ZOOM))
    const scale = 1 + (ZOOM_SCALE - 1) * zoom
    const centerY = cy + (ZOOM_CENTER_Y - cy) * zoom
    this.scene.setAttribute('transform', `translate(${cx} ${centerY}) scale(${scale}) translate(${-cx} ${-cy})`)

    const look = easeInOut(between(p, ...LOOK))
    this.rotate(this.joints.head, -14 * look)
    this.joints.head.dataset.looking = look > 0.5 // lights up the lenses (see StoryRover.module.css)

    const orbited = easeInOut(between(p, ...LEAVE)) * LEAVE_DEGREES
    this.rotate(this.orbit, orbited, `${cx} ${cy}`)
    // the pet only lives on the planet: scrolling on to the rest of the page sends it home
    const onStage = this.section.getBoundingClientRect().bottom > window.innerHeight * STAGE_LEAVING
    this.handOff(p >= HANDOFF && onStage)
    return orbited
  }

  // Tell the rover pet (components/RoverPet) whether it's out, and where the story rover is.
  // Going out, our rover hides at once. Coming back, it stays hidden until the pet has driven
  // home ('rover-home'); `home` lets the pet follow the planet while the page scrolls.
  handOff(toPet) {
    if (!petAvailable || toPet === this.handedOff) return // no pet (e.g. phones): the rover stays
    const firstCall = this.handedOff === null
    this.handedOff = toPet
    if (toPet || firstCall) this.rover.style.opacity = toPet ? 0 : 1
    const home = () => this.roverCenter()
    window.dispatchEvent(new CustomEvent('rover-handoff', { detail: { toPet, ...home(), home } }))
  }

  roverCenter() {
    const box = this.rover.getBoundingClientRect()
    return { x: box.left + box.width / 2, y: box.top + box.height / 2 }
  }

  // leaving the page (e.g. clicking to /events): no planet there, so the pet just disappears
  release() {
    window.removeEventListener('rover-home', this.onPetHome)
    if (petAvailable) window.dispatchEvent(new CustomEvent('rover-handoff', { detail: { toPet: false } }))
  }

  rotate(el, degrees, pivot = el.dataset.pivot) {
    el.setAttribute('transform', `rotate(${degrees} ${pivot})`)
  }
}
