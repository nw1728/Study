// Where the rover's parts and joints sit in the drawing (SVG units, viewBox 640 × 380).
// The drawing files and StoryDirector.js both read from here, so they always agree.

export const GROUND_Y = 340
export const WHEEL_RADIUS = 26
export const WHEEL_Y = GROUND_Y - WHEEL_RADIUS

export const WHEELS = { rear: 150, middle: 290, front: 430 } // x positions

export const PIVOTS = {
  rocker: [300, 232], // where the suspension hangs from the body
  bogie: [220, 262], // the smaller arm carrying the rear and middle wheels
  head: [200, 92], // camera head on the mast
  shoulder: [420, 200],
  elbow: [490, 140],
  wrist: [540, 215],
}

export const SAMPLE_BOX = [380, 168] // where soil samples are dropped
export const SCOOP_TIP = [513, 322] // where the scoop is when it touches the ground

// ---- the scene around the rover (SVG units, viewBox 1000 × 700) ----
export const PLANET = { cx: 500, cy: 1400, r: 900 } // a big circle; only its top shows at first
export const ROVER_SCALE = 0.5 // the rover drawing is scaled down to sit on the planet
export const ROVER_ANCHOR = [290, GROUND_Y] // the point of the drawing that stands on the planet's top

// Where things sit on the planet's surface, in degrees clockwise from the top (where the rover starts).
export const ROCKS = [14, 22]
export const ROCK_HEIGHT = 12
export const CRATER_AT = 41
export const FLAG_AT = -9 // a little Future Factory flag where the journey starts

// Phones get a closer crop of the scene (see StoryScene.jsx) and a smaller zoom-out at the end.
export const NARROW_SCREEN = window.matchMedia('(max-width: 800px)').matches
