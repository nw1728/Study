// Small helpers for scroll animations. Progress values always run from 0 to 1.

export const clamp01 = (value) => Math.min(1, Math.max(0, value))

// How far `progress` is between `start` and `end`: 0 before start, 1 after end.
export const between = (progress, start, end) => clamp01((progress - start) / (end - start))

export const easeOut = (t) => 1 - Math.pow(1 - t, 3)
export const easeIn = (t) => t * t * t
export const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
