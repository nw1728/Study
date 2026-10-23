/*
 * Route planning for the rover: finds a way around text to where you clicked.
 * The screen is split into a grid; cells touching text are walls. A* search finds the shortest
 * path, then it's straightened so the rover drives smooth lines instead of a staircase.
 * If the click is unreachable (e.g. right on a word), it routes to the closest spot it can reach.
 */

const CELL = 16 // px per grid cell

export default function planRoute(start, goal, isBlocked) {
  const cols = Math.ceil(window.innerWidth / CELL)
  const rows = Math.ceil(window.innerHeight / CELL)
  const cellOf = (p) => {
    const col = Math.min(cols - 1, Math.max(0, Math.floor(p.x / CELL)))
    const row = Math.min(rows - 1, Math.max(0, Math.floor(p.y / CELL)))
    return row * cols + col
  }
  const centerOf = (i) => ({ x: (i % cols) * CELL + CELL / 2, y: Math.floor(i / cols) * CELL + CELL / 2 })

  const wallCache = new Map()
  const isWall = (i) => {
    if (!wallCache.has(i)) {
      const c = centerOf(i)
      wallCache.set(i, isBlocked(c.x, c.y))
    }
    return wallCache.get(i)
  }

  const startCell = cellOf(start)
  const goalCell = cellOf(goal)
  const goalCenter = centerOf(goalCell)
  const guess = (i) => {
    const c = centerOf(i)
    return Math.hypot(c.x - goalCenter.x, c.y - goalCenter.y) / CELL
  }

  const cost = new Float64Array(cols * rows).fill(Infinity)
  const cameFrom = new Int32Array(cols * rows).fill(-1)
  const done = new Uint8Array(cols * rows)
  const open = new MinHeap()
  cost[startCell] = 0
  open.push(guess(startCell), startCell)
  let closest = startCell

  while (open.size > 0) {
    const current = open.pop()
    if (done[current]) continue
    done[current] = 1
    if (guess(current) < guess(closest)) closest = current
    if (current === goalCell) break

    const col = current % cols
    const row = Math.floor(current / cols)
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue
        const c = col + dc
        const r = row + dr
        if (c < 0 || r < 0 || c >= cols || r >= rows) continue
        const next = r * cols + c
        if (done[next] || isWall(next)) continue
        // no cutting diagonally past the corner of text
        if (dr !== 0 && dc !== 0 && (isWall(row * cols + c) || isWall(r * cols + col))) continue
        const newCost = cost[current] + (dr !== 0 && dc !== 0 ? Math.SQRT2 : 1)
        if (newCost < cost[next]) {
          cost[next] = newCost
          cameFrom[next] = current
          open.push(newCost + guess(next), next)
        }
      }
    }
  }

  const reachable = closest === goalCell
  const cells = []
  for (let i = closest; i !== -1 && i !== startCell; i = cameFrom[i]) cells.unshift(i)
  const points = cells.map(centerOf)
  if (reachable) points[points.length - 1] = { x: goal.x, y: goal.y }
  if (points.length === 0) points.push(reachable ? { x: goal.x, y: goal.y } : { x: start.x, y: start.y })

  return { points: straighten(start, points, isBlocked), reachable }
}

// drop in-between points wherever the rover can drive straight past them
function straighten(start, points, isBlocked) {
  const result = []
  let from = start
  let i = 0
  while (i < points.length) {
    let furthest = i
    for (let j = points.length - 1; j > i; j--) {
      if (lineIsClear(from, points[j], isBlocked)) {
        furthest = j
        break
      }
    }
    result.push(points[furthest])
    from = points[furthest]
    i = furthest + 1
  }
  return result
}

function lineIsClear(a, b, isBlocked) {
  const steps = Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / 6)
  for (let s = 1; s < steps; s++) {
    const t = s / steps
    if (isBlocked(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t)) return false
  }
  return true
}

// smallest-first queue for A*
class MinHeap {
  constructor() {
    this.items = []
  }

  get size() {
    return this.items.length
  }

  push(priority, value) {
    const items = this.items
    items.push({ priority, value })
    let i = items.length - 1
    while (i > 0) {
      const parent = (i - 1) >> 1
      if (items[parent].priority <= items[i].priority) break
      ;[items[parent], items[i]] = [items[i], items[parent]]
      i = parent
    }
  }

  pop() {
    const items = this.items
    const top = items[0]
    const last = items.pop()
    if (items.length > 0) {
      items[0] = last
      let i = 0
      for (;;) {
        const left = i * 2 + 1
        const right = left + 1
        let smallest = i
        if (left < items.length && items[left].priority < items[smallest].priority) smallest = left
        if (right < items.length && items[right].priority < items[smallest].priority) smallest = right
        if (smallest === i) break
        ;[items[smallest], items[i]] = [items[i], items[smallest]]
        i = smallest
      }
    }
    return top.value
  }
}
