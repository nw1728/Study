/*
 * Finds where text is on screen so the rover can drive around it.
 * Uses the actual line boxes of the words (not whole paragraphs), in viewport coordinates.
 */

const TEXT_SELECTOR = 'h1, h2, h3, p, li, blockquote, figcaption, time, address, small, a, button'
const REFRESH_EVERY = 400 // ms; text also moves while it fades in

export default class TextObstacles {
  constructor() {
    this.rects = []
    this.dirty = true
    this.lastRefresh = 0
    this.version = 0 // goes up every refresh, so the rover knows to re-plan its route
  }

  // call when the page scrolls or resizes
  markDirty() {
    this.dirty = true
  }

  refreshIfNeeded(now) {
    if (!this.dirty && now - this.lastRefresh < REFRESH_EVERY) return
    this.rects = []
    const range = document.createRange()
    for (const el of document.querySelectorAll(TEXT_SELECTOR)) {
      const box = el.getBoundingClientRect()
      if (box.bottom < 0 || box.top > window.innerHeight) continue
      if (el.checkVisibility && !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue
      range.selectNodeContents(el)
      for (const r of range.getClientRects()) {
        if (r.width > 2 && r.height > 2) this.rects.push(r)
      }
    }
    this.dirty = false
    this.lastRefresh = now
    this.version++
  }

  // does a circle at (x, y) touch any text?
  hits(x, y, radius) {
    return this.rects.some(
      (r) => x + radius > r.left && x - radius < r.right && y + radius > r.top && y - radius < r.bottom,
    )
  }
}
