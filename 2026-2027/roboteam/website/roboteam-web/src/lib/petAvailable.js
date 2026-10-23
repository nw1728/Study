// Whether the rover pet runs on this device: it needs a mouse, and is skipped for people who prefer reduced motion.
// The scroll story checks this too, so it only hands its rover over when there's a pet to take it.
export const petAvailable =
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches
