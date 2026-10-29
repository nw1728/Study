import planRoute from './planRoute.js'

/*
 * The rover's "mind": where it wants to go, how it drives there, and how it feels.
 * Plain JavaScript, no React. RoverPet.jsx feeds it mouse events and draws the result.
 *
 * It drives like a car: it has a heading, steers toward its goal with a limited turning rate,
 * speeds up and brakes. Text on the page is solid; if it can't get where you clicked, it gets sad.
 */

// driving
const MAX_SPEED = 6 // px per frame when sent by a click
const WANDER_SPEED = 2 // px per frame when wandering closer to the cursor
const ACCELERATION = 0.2
const BRAKING = 0.5
const TURN_RATE = 0.08 // radians per frame at full speed
const TURN_IN_PLACE = 0.035 // like real Mars rovers, it can slowly turn on the spot
const ARRIVE_DISTANCE = 6
const WAYPOINT_DISTANCE = 20 // px; close enough to a corner of the route to head for the next one
const HOME_DISTANCE = 16 // px; close enough to the story rover to count as back on the planet
const NOTHING_SOLID = { hits: () => false } // driving home, it goes straight over text

// obstacles
const RADIUS = 14 // the rover's size for collisions
const LOOK_AHEAD = 22 // px; how far ahead it checks for text
const DETOUR_ANGLES = [0.4, 0.8, 1.2, 1.6, 2.1, 2.6] // radians it tries turning to get around text

// behaviour
const STAY_WITHIN = 240 // px: if the cursor is further than this, it wanders closer
const GIVE_UP_AFTER = 1500 // ms without getting closer to a click before it's "stuck"
const SLEEP_AFTER = 12000 // ms without any mouse activity

// moods it picks at random while waiting, with how long each lasts (ms)
const RANDOM_MOODS = [
  { mood: 'happy', duration: 2200 },
  { mood: 'sad', duration: 2600 },
  { mood: 'dance', duration: 3200 },
  { mood: 'curious', duration: 2000 },
]

const random = (min, max) => min + Math.random() * (max - min)
const clamp = (value, limit) => Math.max(-limit, Math.min(limit, value))
// smallest signed difference between two angles
const angleDiff = (a, b) => Math.atan2(Math.sin(a - b), Math.cos(a - b))

export default class RoverBrain {
  constructor(x, y, now) {
    this.x = x
    this.y = y
    this.heading = 0 // radians, 0 = facing right
    this.speed = 0
    this.mouse = null
    this.target = null // set by a click
    this.home = null // set while driving back to the planet in the scroll story
    this.route = [] // points to drive through to reach the target, planned around text
    this.reachable = true
    this.routeVersion = -1
    this.closestSoFar = Infinity // distance to the click, for noticing when it's stuck
    this.lastProgress = now
    this.wandering = false
    this.wanderPausedUntil = 0
    this.detourSide = 1
    this.mood = 'idle'
    this.moodUntil = Infinity
    this.lastActivity = now
    this.nextRandomMood = now + random(4000, 8000)
  }

  get facingLeft() {
    return Math.cos(this.heading) < 0
  }

  setMood(mood, now, duration = Infinity) {
    this.mood = mood
    this.moodUntil = now + duration
  }

  onMouseMove(x, y, now) {
    this.mouse = { x, y }
    this.lastActivity = now
    if (this.mood === 'sleepy' || this.mood === 'lonely') this.setMood('curious', now, 1500)
  }

  onMouseLeave(now) {
    this.mouse = null
    this.setMood('lonely', now)
  }

  // jump straight to a spot (used when the story rover hands over to the pet)
  teleport(x, y, facingLeft) {
    this.x = x
    this.y = y
    this.heading = facingLeft ? Math.PI : 0
    this.speed = 0
    this.target = null
  }

  // head back to the story rover's spot on the planet; called every frame, as the planet scrolls
  goHome(x, y) {
    this.home = { x, y }
    this.target = null
  }

  stayOut() {
    this.home = null
  }

  onClick(x, y, now) {
    if (this.home) return // on its way home: clicks don't call it back
    this.target = { x, y }
    this.routeVersion = -1 // plan a new route
    this.closestSoFar = Infinity
    this.lastProgress = now
    this.lastActivity = now
    this.setMood('idle', now)
  }

  // Called every frame. Returns its speed and whether it just arrived at a click.
  update(now, obstacles) {
    if (this.home) return this.driveHome()
    let arrived = false
    if (this.target && this.routeVersion !== obstacles.version) this.planRoute(obstacles)
    const goal = this.pickGoal(now)

    if (goal) {
      const dist = Math.hypot(goal.x - this.x, goal.y - this.y)
      const end = this.route.at(-1) ?? goal
      const distLeft = this.target ? Math.hypot(end.x - this.x, end.y - this.y) : dist
      if (this.target && distLeft < ARRIVE_DISTANCE) {
        this.target = null
        this.speed = 0
        if (this.reachable) {
          arrived = true
          this.setMood('happy', now, 1600)
        } else {
          this.setMood('sad', now, 2600) // got as close as it could, but the spot is inside text
        }
      } else {
        this.drive(goal, distLeft, this.target ? MAX_SPEED : WANDER_SPEED, obstacles)
        this.checkProgress(this.target ? this.routeLengthLeft() : dist, now)
      }
    } else {
      this.speed = Math.max(0, this.speed - BRAKING)
    }

    if (this.speed > 0.3 && this.mood !== 'happy' && this.mood !== 'sad') this.setMood('idle', now)
    if (!goal && this.speed < 0.3) {
      this.updateMood(now)
      this.park()
    }

    return { speed: this.speed, arrived }
  }

  driveHome() {
    const dist = Math.hypot(this.home.x - this.x, this.home.y - this.y)
    this.drive(this.home, dist, MAX_SPEED, NOTHING_SOLID)
    return { speed: this.speed, arrived: false, atHome: dist < HOME_DISTANCE }
  }

  planRoute(obstacles) {
    const { points, reachable } = planRoute(this, this.target, (x, y) => obstacles.hits(x, y, RADIUS + 2))
    this.route = points
    this.reachable = reachable
    this.routeVersion = obstacles.version
  }

  // a click wins (following the planned route); otherwise wander toward the cursor when it's far away
  pickGoal(now) {
    if (this.target) {
      if (this.route.length > 1 && Math.hypot(this.route[0].x - this.x, this.route[0].y - this.y) < WAYPOINT_DISTANCE) {
        this.route.shift()
      }
      return this.route[0]
    }
    if (!this.mouse || now < this.wanderPausedUntil) return null
    const dist = Math.hypot(this.mouse.x - this.x, this.mouse.y - this.y)
    if (dist > STAY_WITHIN) this.wandering = true
    if (dist < STAY_WITHIN * 0.6) this.wandering = false
    return this.wandering ? this.mouse : null
  }

  drive(goal, dist, maxSpeed, obstacles) {
    // if text scrolled on top of the rover, let it drive out freely
    const trapped = obstacles.hits(this.x, this.y, RADIUS)
    const wanted = Math.atan2(goal.y - this.y, goal.x - this.x)
    const direction = trapped ? wanted : this.findWayAround(wanted, obstacles)

    // steer: faster = sharper turns possible, like a car; slow down for big turns
    const turnNeeded = angleDiff(direction, this.heading)
    const maxTurn = TURN_IN_PLACE + TURN_RATE * (this.speed / MAX_SPEED)
    this.heading += clamp(turnNeeded, maxTurn)
    this.heading = Math.atan2(Math.sin(this.heading), Math.cos(this.heading)) // keep it within ±180°

    let targetSpeed = Math.min(maxSpeed, 0.5 + dist * 0.06)
    if (Math.abs(turnNeeded) > 1.2) targetSpeed *= 0.3
    this.speed += Math.max(-BRAKING, Math.min(ACCELERATION, targetSpeed - this.speed))

    const stepX = Math.cos(this.heading) * this.speed
    const stepY = Math.sin(this.heading) * this.speed
    const free = (x, y) => trapped || !obstacles.hits(x, y, RADIUS)

    if (free(this.x + stepX, this.y + stepY)) {
      this.x += stepX
      this.y += stepY
    } else if (free(this.x + stepX, this.y)) {
      this.x += stepX // bumped: scrape along the text sideways
      this.speed *= 0.6
    } else if (free(this.x, this.y + stepY)) {
      this.y += stepY
      this.speed *= 0.6
    } else {
      this.speed = 0 // head-on into text
    }
  }

  // straight ahead if clear; otherwise the smallest turn that clears the text
  findWayAround(wanted, obstacles) {
    const isClear = (angle) =>
      [0.15, 0.5, 1].every(
        (part) =>
          !obstacles.hits(
            this.x + Math.cos(angle) * LOOK_AHEAD * part,
            this.y + Math.sin(angle) * LOOK_AHEAD * part,
            RADIUS,
          ),
      )

    if (isClear(wanted)) return wanted
    for (const offset of DETOUR_ANGLES) {
      // keep trying the same side first so it doesn't wobble left-right
      for (const side of [this.detourSide, -this.detourSide]) {
        const angle = wanted + offset * side
        if (isClear(angle)) {
          this.detourSide = side
          return angle
        }
      }
    }
    return wanted
  }

  // how far it still has to drive along the route
  routeLengthLeft() {
    let length = 0
    let from = this
    for (const point of this.route) {
      length += Math.hypot(point.x - from.x, point.y - from.y)
      from = point
    }
    return length
  }

  // stuck = the distance left isn't shrinking for a while
  checkProgress(dist, now) {
    if (!this.target) {
      if (this.speed < 0.1) this.wanderPausedUntil = now + 3000
      return
    }
    if (dist < this.closestSoFar - 4) {
      this.closestSoFar = dist
      this.lastProgress = now
    } else if (now - this.lastProgress > GIVE_UP_AFTER) {
      this.target = null
      this.setMood('sad', now, 2600)
    }
  }

  // when standing still, settle level (or turn to face the cursor when curious)
  park() {
    let level = this.facingLeft ? Math.PI : 0
    if (this.mood === 'curious' && this.mouse) level = this.mouse.x < this.x ? Math.PI : 0
    this.heading += clamp(angleDiff(level, this.heading), 0.05)
  }

  updateMood(now) {
    if (this.mood === 'lonely') return

    if (now - this.lastActivity > SLEEP_AFTER) {
      this.setMood('sleepy', now)
      return
    }
    if (now > this.moodUntil) this.setMood('idle', now)

    if (this.mood === 'idle' && now > this.nextRandomMood) {
      const pick = RANDOM_MOODS[Math.floor(Math.random() * RANDOM_MOODS.length)]
      this.setMood(pick.mood, now, pick.duration)
      this.nextRandomMood = now + pick.duration + random(4000, 9000)
    }
  }
}
