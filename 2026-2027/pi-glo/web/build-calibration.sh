#!/bin/sh
# Build static/calibration.js from the team repo's calibration sources.
#
# Why a build at all, when this project deliberately has none: the calibration
# model is ~1,600 lines of TypeScript that already exists in Saxion-SSP
# (ui/record/src/lib), and the glove's wire format is mirrored in three places
# that must stay in sync -- lib/ble/wire.hpp, lib/hand/cal_report.hpp, and
# calibration.ts / log-parser.ts, each of which says so in its own header. A
# hand-written fourth copy here would be the one nobody remembers to update,
# and it fails silently: wrong step, wrong phase, no error anywhere.
#
# So the rule the project actually cares about is kept: **the Pi needs no Node
# and no network.** This runs on a laptop, and static/calibration.js is
# committed and deployed exactly like static/vendor/three.min.js is.
#
# Re-run it whenever the team repo's calibration code changes.
#
#   ./build-calibration.sh [path-to-Saxion-SSP]
set -eu

HERE="$(cd "$(dirname "$0")" && pwd)"
SSP="${1:-${SAXION_SSP:-$HOME/Saxion-SSP}}"
SRC="$SSP/ui/record/src/lib"
ESBUILD="$SSP/ui/record/node_modules/.bin/esbuild"
OUT="$HERE/static/calibration.js"

[ -d "$SRC" ]     || { echo "no calibration sources at $SRC" >&2; exit 1; }
[ -x "$ESBUILD" ] || { echo "no esbuild at $ESBUILD (npm install in ui/record)" >&2; exit 1; }

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# ---------------------------------------------------------------- theming
# The team's panel is a dark terminal; this page is a pale instrument chassis
# with the viewport inset as a dark screen. The colours we have to change are
# written inline by the panel as it renders, so CSS cannot reach them -- an
# inline style wins. They are remapped here instead, on a copy of the sources,
# which keeps the team repo untouched.
#
# It has to be per file: #1db954 and #828282 appear in both, and mean different
# things. calibration-panel.ts paints the chrome, which sits on --paper, while
# cal-viz.ts paints the canvas, which sits on --screen. The same hex therefore
# maps to two different colours depending on which it is.
mkdir -p "$TMP/lib"
cp "$SRC"/*.ts "$TMP/lib/"

# chrome, on --paper #eae6df
sed -i \
  -e 's/#1db954/#27459a/g'  `# current step   -> --cobalt` \
  -e 's/#5f8f6d/#4a7c59/g'  `# finished step  -> --sage` \
  -e 's/#535353/#6e6862/g'  `# still to come  -> --muted` \
  -e 's/#3a3a3a/#cfc8bd/g'  `# separators     -> --rule` \
  -e 's/#2a2a2a/#cfc8bd/g'  `# chip border    -> --rule` \
  -e 's/#828282/#6e6862/g'  `# group label    -> --muted` \
  "$TMP/lib/calibration-panel.ts"

# canvas, on --screen #15181d, so everything here has to stay light
sed -i \
  -e 's/#1db954/#6fa883/g'  `# motion arcs    -> --sage, lifted to read on dark` \
  -e 's/#e0e0e0/#d5dbe4/g'  `# active bone    -> the screen caption white` \
  -e 's/#828282/#8b96a8/g'  `# hand wireframe -> the screen secondary` \
  -e 's/#9a9a9a/#aab3c0/g'  `# labels` \
  -e 's/#5a5a5a/#5d6675/g'  `# faint text     -> the screen hint colour` \
  -e 's/#353535/#39404c/g'  `# disabled finger` \
  -e 's/#2c2c2c/#232834/g'  `# grid` \
  -e 's/#2a2a2a/#2a3140/g'  `# hold-bar track` \
  -e 's/#171717/#15181d/g'  `# background     -> --screen exactly` \
  -e 's/ui-monospace, monospace/"Plex Mono", ui-monospace, monospace/g' \
  "$TMP/lib/cal-viz.ts"

# ---------------------------------------------------------------- 3-D hook
# This page draws the hand with the same three.js mannequin as the Hand tab,
# not cal-viz's wireframe, so it needs the *pose* rather than the drawing.
# frameAt() is pure, so the 2-D renderer can stay switched off entirely --
# setVisible(false) means it never starts a rAF and costs nothing -- while its
# timing and easing are still what drives the 3-D view. Re-deriving that here
# would be a second copy of the animation to keep in step.
cat >> "$TMP/lib/cal-viz.ts" <<'EOF'

/* --- added by pi-glo's build-calibration.sh, not in the team repo --- */

/** The pose the 2-D view would be drawing right now, or null before a phase. */
export function pigloFrame() {
  if (!state) return null;
  const fr = frameAt(state.phase, (performance.now() - t0) / 1000);
  return {
    pose: fr.pose, seg: fr.seg, moving: fr.moving,
    phase: state.phase, enabled: state.enabled, active: state.active,
    /* The angle this step is best watched from, which steps set themselves --
       a side-on gravity turn is unreadable from the back of the hand. */
    view: [goalYaw, goalPitch],
  };
}

/** How long the current hold has run, against how long it needs. */
export function pigloHold() { return readHold(); }

/** Pose interpolation, for tracing an arc through the motion. */
export function pigloLerpPose(a: Pose, b: Pose, u: number): Pose { return lerpPose(a, b, u); }
EOF

SRC="$TMP/lib"

# The entry lives here, not in the team repo: edits there land on a branch a
# teammate also works on. It re-exports only what index.html drives.
cat > "$TMP/entry.ts" <<'EOF'
export {
  getCalSource,
  setCalSource,
  setCalibrationState,
  type CalSource,
  type CalibrationState,
} from 'SRC/calibration-panel';

// The 2-D renderer stays off for good on this page: the three.js mannequin in
// index.html draws the hand instead. setVisible is still exported so that
// decision is reversible from one line.
export { setVisible } from 'SRC/cal-viz';

// What index.html drives the mannequin from.
export { pigloFrame, pigloHold, pigloLerpPose } from 'SRC/cal-viz';
export { FINGERS, REST, calibrationSteps } from 'SRC/calibration';
export type { Pose, Phase, Segment, ArcSpec, CalStep } from 'SRC/calibration';
EOF
sed -i "s|SRC/|$SRC/|g" "$TMP/entry.ts"

"$ESBUILD" "$TMP/entry.ts" \
  --bundle \
  --format=iife \
  --global-name=pigloCal \
  --target=es2020 \
  --platform=browser \
  --legal-comments=none \
  --outfile="$OUT"

printf '%s: %s bytes\n' "$OUT" "$(wc -c < "$OUT")"
