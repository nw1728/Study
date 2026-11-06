var pigloCal = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // ../../../../../../tmp/tmp.6N8Q1DT2My/entry.ts
  var entry_exports = {};
  __export(entry_exports, {
    FINGERS: () => FINGERS,
    REST: () => REST,
    calibrationSteps: () => calibrationSteps,
    getCalSource: () => getCalSource,
    pigloFrame: () => pigloFrame,
    pigloHold: () => pigloHold,
    pigloLerpPose: () => pigloLerpPose,
    setCalSource: () => setCalSource,
    setCalibrationState: () => setCalibrationState,
    setVisible: () => setVisible
  });

  // ../../../../../../tmp/tmp.6N8Q1DT2My/lib/hand-model.ts
  var PALM_V = [
    [0, -1, 0],
    [0.75, -1, 0],
    [0.75, -0.25, 0],
    [0, -0.25, 0]
  ];
  var PALM_E = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0]
  ];
  var FINGER_NAMES = ["thumb", "idx", "mid", "ring", "pnky"];
  var FINGER_ROOTS = [
    [-0.25, -0.625, 0],
    // thumb (intentionally disconnected from palm left edge)
    [0, -0.25, 0],
    // index
    [0.25, -0.25, 0],
    // middle
    [0.5, -0.25, 0],
    // ring
    [0.75, -0.25, 0]
    // little
  ];
  var FINGER_DIRS = [
    [-0.4, 0.92, 0],
    // thumb: slightly left, mostly up
    [-0.1, 1, 0],
    [0, 1, 0],
    [0.1, 1, 0],
    [0.2, 0.98, 0]
  ];
  var FINGER_LEN = 0.5;
  var AR = 0.05;
  var add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  var sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  var scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
  var cross = (a, b) => [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
  var lerp3 = (a, b, u) => add(a, scale(sub(b, a), u));
  function normalize(a) {
    const n = Math.hypot(a[0], a[1], a[2]);
    return n > 1e-9 ? scale(a, 1 / n) : [0, 0, 0];
  }
  var IDENTITY_QUAT = { w: 1, x: 0, y: 0, z: 0 };
  function quatFromAxisAngle(axis, deg) {
    const [x, y, z] = normalize(axis);
    const h = deg * Math.PI / 360;
    const s = Math.sin(h);
    return { w: Math.cos(h), x: x * s, y: y * s, z: z * s };
  }
  function quatSlerp(a, b, u) {
    let d = a.w * b.w + a.x * b.x + a.y * b.y + a.z * b.z;
    let bb = b;
    if (d < 0) {
      d = -d;
      bb = { w: -b.w, x: -b.x, y: -b.y, z: -b.z };
    }
    if (d > 0.9995) {
      const q = {
        w: a.w + (bb.w - a.w) * u,
        x: a.x + (bb.x - a.x) * u,
        y: a.y + (bb.y - a.y) * u,
        z: a.z + (bb.z - a.z) * u
      };
      const n = Math.hypot(q.w, q.x, q.y, q.z);
      return { w: q.w / n, x: q.x / n, y: q.y / n, z: q.z / n };
    }
    const th = Math.acos(d);
    const sa = Math.sin((1 - u) * th) / Math.sin(th);
    const sb = Math.sin(u * th) / Math.sin(th);
    return { w: a.w * sa + bb.w * sb, x: a.x * sa + bb.x * sb, y: a.y * sa + bb.y * sb, z: a.z * sa + bb.z * sb };
  }
  function quatRotate(q, v) {
    return applyMatrix(quatToMatrix(q), v);
  }
  function quatToMatrix(q) {
    const { w, x, y, z } = q;
    const m = new Float32Array(9);
    m[0] = 1 - 2 * (y * y + z * z);
    m[1] = 2 * (x * y - w * z);
    m[2] = 2 * (x * z + w * y);
    m[3] = 2 * (x * y + w * z);
    m[4] = 1 - 2 * (x * x + z * z);
    m[5] = 2 * (y * z - w * x);
    m[6] = 2 * (x * z - w * y);
    m[7] = 2 * (y * z + w * x);
    m[8] = 1 - 2 * (x * x + y * y);
    return m;
  }
  function applyMatrix(m, v) {
    return [
      m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
      m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
      m[6] * v[0] + m[7] * v[1] + m[8] * v[2]
    ];
  }
  function yRotMatrix(a) {
    const c = Math.cos(a), s = Math.sin(a);
    const m = new Float32Array(9);
    m[0] = c;
    m[1] = 0;
    m[2] = s;
    m[3] = 0;
    m[4] = 1;
    m[5] = 0;
    m[6] = -s;
    m[7] = 0;
    m[8] = c;
    return m;
  }
  function xRotMatrix(a) {
    const c = Math.cos(a), s = Math.sin(a);
    const m = new Float32Array(9);
    m[0] = 1;
    m[1] = 0;
    m[2] = 0;
    m[3] = 0;
    m[4] = c;
    m[5] = -s;
    m[6] = 0;
    m[7] = s;
    m[8] = c;
    return m;
  }
  function mulMatrices(a, b) {
    const m = new Float32Array(9);
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 3; c++)
        for (let k = 0; k < 3; k++)
          m[r * 3 + c] += a[r * 3 + k] * b[k * 3 + c];
    return m;
  }
  function project(v, cx, cy, sc) {
    const fov = 3.5, depth = v[2] + fov;
    if (depth <= 0) return [cx + v[0] * sc, cy - v[1] * sc];
    const f = fov / depth;
    return [cx + v[0] * sc * f, cy - v[1] * sc * f];
  }

  // ../../../../../../tmp/tmp.6N8Q1DT2My/lib/calibration.ts
  var FINGERS = ["thumb", "index", "middle", "ring", "little"];
  var THUMB = 0;
  var ORDER = [1, 2, 3, 4, 0];
  var PAD_ROUNDS = 5;
  var TURNS = 2;
  var PAD_SWEEPS = 2;
  var FORWARD_LIFTS = 2;
  var SIDE_VIEW = [1.05, -0.3];
  var PALM_VIEW = [2.55, -0.25];
  var FLAT = IDENTITY_QUAT;
  var SIDE = quatFromAxisAngle([0, 1, 0], 90);
  var FORWARD = quatFromAxisAngle([1, 0, 0], 90);
  var REST = {
    palm: FLAT,
    curl: [0, 0, 0, 0, 0],
    spread: [0, 0, 0, 0, 0],
    lift: 0,
    sweep: 0,
    pad: 0,
    padFinger: 1,
    padStraight: false
  };
  var at = (base, p) => ({ ...base, ...p });
  function bend(base, f, curl, spread = 0) {
    const c = [...base.curl], s = [...base.spread];
    c[f] = curl;
    s[f] = spread;
    return { ...base, curl: c, spread: s };
  }
  var seg = (to, move, hold, label) => ({ to, move, hold, label });
  var arc = (from, to, point, segs, arrows = "both", push = 1.22) => ({ from, to, point, arrows, segs, push });
  var go = (from, to, label, point, push = 1.22) => ({
    label,
    start: from,
    segs: [seg(from, 0, 0.5), seg(to, 1.4, 0.7), seg(from, 1.1, 0)],
    arcs: [arc(from, to, point, [1], "end", push)]
  });
  var still = (pose, hold) => ({ label: "hold still", start: pose, segs: [seg(pose, 0, 1)], arcs: [], hold });
  var SETTLE_S = 0.5;
  var GRAVITY_S = 0.75;
  var RANGE_S = 1;
  function outAndBack(rest, out, label, point, push = 1.25) {
    return [go(rest, out, label, point, push), still(out, SETTLE_S), go(out, rest, "back to rest", point, push), still(rest, SETTLE_S)];
  }
  var MOUNT_HOLD = "with the thumb pressed lightly against the side of the index";
  function mountHold(enabled) {
    const thumb = enabled[THUMB];
    const anyLong = enabled.some((on, i) => on && i !== THUMB);
    if (thumb && anyLong) return `with the fingers straight and the thumb pressed lightly against the side of the index`;
    return thumb ? MOUNT_HOLD : "with the fingers straight";
  }
  function towardThumb(f) {
    return ["", "toward the thumb", "toward the index finger", "toward the middle finger", "toward the ring finger"][f];
  }
  function awayFromThumb(f) {
    return ["", "toward the middle finger", "toward the ring finger", "toward the little finger", "away from the hand"][f];
  }
  function gravitySteps(enabled) {
    const hold = mountHold(enabled);
    const sideTo = at(REST, { palm: SIDE });
    return [
      {
        id: "gravity-a",
        finger: null,
        group: "gravity",
        short: "flat",
        title: "gravity \xB7 pose A",
        total: 0,
        instruction: () => `Hand flat, hold still ${hold}.`,
        progress: () => "",
        warning: "",
        anim: () => ({ phases: [still(REST, GRAVITY_S)] })
      },
      {
        id: "gravity-b",
        finger: null,
        group: "gravity",
        short: "side",
        title: "gravity \xB7 pose B",
        total: 0,
        instruction: () => `Turn the hand on its side, thumb up, and hold still ${hold}. Then return it flat and hold still.`,
        progress: () => "",
        warning: `Pose B rejected, index moved relative to palm (4.2 deg). Return to flat and retry ${hold}.`,
        anim: () => {
          const p = { palm: [-0.05, -0.625, 0] };
          return {
            phases: [
              go(REST, sideTo, "turn on its side, thumb up", p, 1.4),
              still(sideTo, GRAVITY_S),
              go(sideTo, REST, "back flat", p, 1.4),
              still(REST, SETTLE_S)
            ]
          };
        }
      }
    ];
  }
  function longFingerSteps(f) {
    const name = FINGERS[f];
    const fist = bend(REST, f, 100);
    const spreadA = 16, rangeA = 28;
    const plus = (a) => bend(REST, f, 0, a);
    return [
      {
        id: `${name}-hinge`,
        finger: f,
        group: name,
        short: "curl",
        title: `${name} \xB7 hinge`,
        total: 0,
        instruction: () => `Slowly curl the ${name} finger from straight to a full fist and back 2-3 times, then hold still.`,
        progress: () => "",
        warning: `${name} hinge cal: curl too wobbly (14.3 deg off-axis). Keep the finger from moving sideways and curl again.`,
        anim: () => ({
          phases: [
            {
              label: "curl to a fist and back, 2-3 times",
              start: REST,
              segs: [seg(REST, 0, 0.8), seg(fist, 1.8, 0.4, "curl to a fist"), seg(REST, 1.8, 0, "straighten")],
              arcs: [arc(REST, fist, { tip: f }, [1, 2])]
            },
            still(REST, SETTLE_S)
          ],
          view: SIDE_VIEW
        })
      },
      {
        id: `${name}-spread`,
        finger: f,
        group: name,
        short: "spread",
        title: `${name} \xB7 spread axis`,
        total: 0,
        instruction: () => `Hand flat, spread the ${name} finger ${towardThumb(f)} and back, then ${awayFromThumb(f)} and back, twice, then hold still.`,
        progress: () => "",
        warning: `${name} spread cal: the spread axis is 23.4 deg off the palm normal (max 20). Keep the hand flat and spread again.`,
        anim: () => ({
          phases: [
            {
              label: "spread both ways and back, twice",
              start: REST,
              segs: [
                seg(REST, 0, 0.6),
                seg(plus(spreadA), 0.9, 0.2, towardThumb(f)),
                seg(REST, 0.9, 0.3, "back"),
                seg(plus(-spreadA), 0.9, 0.2, awayFromThumb(f)),
                seg(REST, 0.9, 0, "back")
              ],
              arcs: [arc(plus(spreadA), plus(-spreadA), { tip: f }, [1, 2, 3, 4])]
            },
            still(REST, SETTLE_S)
          ]
        })
      },
      {
        id: `${name}-range`,
        finger: f,
        group: name,
        short: "range",
        title: `${name} \xB7 spread range`,
        total: 0,
        instruction: () => `Hand flat, finger straight: spread it as far as it goes by itself (no other hand) ${towardThumb(f)}, then ${awayFromThumb(f)}, then relax it straight and hold still.`,
        progress: () => "",
        warning: "",
        anim: () => ({
          phases: [
            go(REST, plus(rangeA), `as far as it goes ${towardThumb(f)}`, { tip: f }),
            go(REST, plus(-rangeA), `as far as it goes ${awayFromThumb(f)}`, { tip: f }),
            go(plus(-rangeA), REST, "relax it straight", { tip: f }),
            still(REST, RANGE_S)
          ]
        })
      }
    ];
  }
  var PAD_NAMES = ["index", "middle", "ring", "little"];
  function padStep(straight) {
    const per = PAD_ROUNDS * PAD_NAMES.length;
    const posture = straight ? "straight" : "touching";
    const fwd = at(REST, { palm: FORWARD });
    return {
      id: `thumb-pads-${posture}`,
      finger: THUMB,
      group: "thumb",
      short: `pads \xB7 ${posture}`,
      title: `thumb \xB7 pads, ${posture}`,
      total: per,
      instruction: (n) => {
        const pad = PAD_NAMES[n % 4];
        return straight ? `Keep the palm forward and the fingers straight. Lay the thumb tip on the ${pad} pad as when sliding along them, about 1 s, back to rest, hold 2 s; then the next pad. Index to little, ${PAD_ROUNDS} times.` : `Keep the palm forward. Curl the ${pad} finger to meet the thumb tip, about 1 s, back to rest, hold 2 s; then the next pad. Index to little, ${PAD_ROUNDS} times. Each pad is taken once you are back at rest.`;
      },
      progress: (n) => `${PAD_NAMES[n % 4]} pad \xB7 round ${Math.floor(n / 4) + 1}/${PAD_ROUNDS} \xB7 ${n}/${per}`,
      warning: `Thumb cal: the pads can't be told apart (75% named right with their round left out, need 90%; middle and ring mixed up most). Touch the pads again, touching first: index pad, back to rest, then middle, ring, little; ${PAD_ROUNDS} times.`,
      anim: (n) => {
        const p = n % 4;
        const f = 1 + p;
        const touch = straight ? at(fwd, { pad: 1, padFinger: f, padStraight: true }) : at(bend(fwd, f, 115 + 10 * p), { pad: 1, padFinger: f, padStraight: false });
        return {
          phases: [
            go(fwd, touch, `the ${PAD_NAMES[p]} pad, about 1 s`, { tip: THUMB }, 1),
            go(touch, fwd, "back to rest", { tip: THUMB }, 1),
            still(fwd, SETTLE_S)
          ],
          view: PALM_VIEW
        };
      }
    };
  }
  function thumbSteps() {
    const lifted = at(REST, { lift: 45 });
    const l = at(REST, { sweep: -60 });
    const fwd = at(REST, { palm: FORWARD });
    const padSweep = at(REST, { sweep: 50 });
    const liftedFwd = at(fwd, { lift: 45 });
    return [
      {
        id: "thumb-lift",
        finger: THUMB,
        group: "thumb",
        short: "lift",
        title: "thumb \xB7 lift",
        total: 3,
        instruction: () => `Hand flat, thumb at rest ${MOUNT_HOLD}. Slowly lift the thumb straight up away from the palm as far as is comfortable, hold 2 s, back to rest, hold 2 s. 3 times.`,
        progress: (n) => `lift ${n}/3`,
        warning: `Thumb cal: the lifts didn't go far enough (need 20 deg). Lift higher, 3 times again.`,
        anim: () => ({
          phases: outAndBack(REST, lifted, "lift away from the palm", { tip: THUMB }),
          view: [-0.6, -0.35]
        })
      },
      {
        id: "thumb-l",
        finger: THUMB,
        group: "thumb",
        short: "L",
        title: "thumb \xB7 L",
        total: 3,
        instruction: () => `Hand flat, slowly swing the thumb out sideways away from the fingers, hold 2 s, back to rest, hold 2 s. 3 times.`,
        progress: (n) => `L ${n}/3`,
        warning: "",
        anim: () => ({ phases: outAndBack(REST, l, "swing out sideways", { tip: THUMB }) })
      },
      {
        id: "thumb-pad-sweep",
        finger: THUMB,
        group: "thumb",
        short: "sweep",
        title: "thumb \xB7 sweep to the pads",
        total: PAD_SWEEPS,
        instruction: () => `Hand flat, slowly swing the thumb across the palm toward the little finger, hold 2 s, back to rest, hold 2 s. ${PAD_SWEEPS} times.`,
        progress: (n) => `sweep ${n}/${PAD_SWEEPS}`,
        warning: "",
        anim: () => ({ phases: outAndBack(REST, padSweep, "across the palm", { tip: THUMB }) })
      },
      {
        id: "thumb-turn",
        finger: THUMB,
        group: "thumb",
        short: "turn",
        title: "thumb \xB7 palm turns",
        total: TURNS,
        instruction: (n) => `Keep the thumb at rest and turn the palm to face forward, fingers up, hold 2 s, back flat, hold 2 s; ${TURNS} times, then keep it forward.` + (n === TURNS - 1 ? " Last one: stay forward." : ""),
        progress: (n) => `turn ${n}/${TURNS}`,
        warning: "",
        anim: () => ({
          phases: [
            go(REST, fwd, "palm forward, fingers up", { palm: [0.25, 0.25, 0] }, 1.12),
            still(fwd, SETTLE_S),
            go(fwd, REST, "back flat", { palm: [0.25, 0.25, 0] }, 1.12),
            still(REST, SETTLE_S)
          ],
          view: SIDE_VIEW
        })
      },
      {
        id: "thumb-lift-forward",
        finger: THUMB,
        group: "thumb",
        short: "lift fwd",
        title: "thumb \xB7 lift, palm forward",
        total: FORWARD_LIFTS,
        instruction: () => `Keep the palm forward and slowly lift the thumb away from the palm, hold 2 s, back to rest, hold 2 s. ${FORWARD_LIFTS} times.`,
        progress: (n) => `lift ${n}/${FORWARD_LIFTS}`,
        warning: "",
        anim: () => ({
          phases: outAndBack(fwd, liftedFwd, "lift away from the palm", { tip: THUMB }),
          view: PALM_VIEW
        })
      },
      padStep(false),
      padStep(true)
    ];
  }
  var CAL_STATE_ID = 11;
  var CAL_WARNING_ID = 12;
  var CAL_PHASE_ID = 13;
  var WIRE_STEPS = [
    "gravity-a",
    "gravity-b",
    "hinge",
    "spread",
    "range",
    "thumb-lift",
    "thumb-l",
    "thumb-pad-sweep",
    "thumb-turn",
    "thumb-lift-forward",
    "thumb-pads-touching",
    "thumb-pads-straight",
    "done"
  ];
  function wireStepId(step, finger) {
    const id = WIRE_STEPS[step];
    if (!id) return null;
    return step >= 2 && step <= 4 ? `${FINGERS[finger]}-${id}` : id;
  }
  function wireWarning(kind, a, b, enabled) {
    const hold = mountHold(enabled);
    switch (kind) {
      case 1:
        return `Pose B rejected, ${FINGERS[Math.round(b)]} moved relative to palm (${a.toFixed(1)} deg). Return to flat and retry ${hold}.`;
      case 2:
        return `Hinge cal: curl too wobbly (${a.toFixed(1)} deg off-axis). Keep the finger from moving sideways and curl again.`;
      case 3:
        return `Spread cal: the spread axis is ${a.toFixed(1)} deg off the palm normal (max ${b.toFixed(0)}). Keep the hand flat and spread again.`;
      case 4:
        return `Spread cal: too wobbly (${a.toFixed(1)} deg off-axis). Keep the finger straight and spread again.`;
      case 5:
        return `Thumb cal: the lifts didn't go far enough (need 20 deg). Lift higher, 3 times again.`;
      case 6: {
        const pair = Math.round(b);
        const mixed = pair >= 0 ? `; ${PAD_NAMES[pair >> 2]} and ${PAD_NAMES[pair & 3]} mixed up most` : "";
        return `Thumb cal: the pads can't be told apart (${a.toFixed(0)}% named right with their round left out${mixed}). Touch the pads again, touching first: index pad, back to rest, then middle, ring, little; ${PAD_ROUNDS} times.`;
      }
      default:
        return null;
    }
  }
  function calibrationSteps(enabled) {
    const steps2 = gravitySteps(enabled);
    for (const f of ORDER) {
      if (!enabled[f]) continue;
      steps2.push(...f === THUMB ? thumbSteps() : longFingerSteps(f));
    }
    steps2.push({
      id: "done",
      finger: null,
      group: "done",
      short: "done",
      title: "calibrated",
      total: 0,
      instruction: () => "Every finger is done. Tracking.",
      progress: () => "",
      warning: "",
      anim: () => ({ phases: [{ label: "", start: REST, segs: [seg(REST, 0, 3)], arcs: [] }] })
    });
    return steps2;
  }

  // ../../../../../../tmp/tmp.6N8Q1DT2My/lib/hand-pose.ts
  var THUMB2 = 0;
  var Z = [0, 0, 1];
  var THUMB_REST = normalize([0.38, 0.9, -0.3]);
  var THUMB_CONE = normalize([0, -0.2, -0.98]);
  var THUMB_REST_DOT_CONE = THUMB_REST[0] * THUMB_CONE[0] + THUMB_REST[1] * THUMB_CONE[1] + THUMB_REST[2] * THUMB_CONE[2];
  var THUMB_LIFT_AXIS = normalize(cross(THUMB_REST, THUMB_CONE));
  function longFingerBone(f, curl, spread) {
    const root = FINGER_ROOTS[f];
    const d0 = normalize(FINGER_DIRS[f]);
    const hinge = normalize(cross(Z, d0));
    const curled = quatRotate(quatFromAxisAngle(hinge, curl), d0);
    const dir = quatRotate(quatFromAxisAngle(Z, spread), curled);
    return { root, tip: add(root, scale(dir, FINGER_LEN)) };
  }
  function thumbBone(lift, sweep) {
    const root = FINGER_ROOTS[THUMB2];
    const lifted = quatRotate(quatFromAxisAngle(THUMB_LIFT_AXIS, lift), THUMB_REST);
    const dir = quatRotate(quatFromAxisAngle(THUMB_CONE, sweep), lifted);
    return { root, tip: add(root, scale(dir, FINGER_LEN)) };
  }

  // ../../../../../../tmp/tmp.6N8Q1DT2My/lib/cal-viz.ts
  var canvas = document.getElementById("cal-canvas");
  var ctx = canvas.getContext("2d");
  var GREEN = "#6fa883";
  var ACTIVE_COLOR = "#d5dbe4";
  var HAND_COLOR = "#8b96a8";
  var OFF_COLOR = "#39404c";
  var PALM_CENTER = [0.375, -0.625, 0];
  var HAND_MIDDLE = [0.375, -0.375, 0];
  var FLOOR_Z = -0.85;
  var DEFAULT_YAW = 0.35;
  var DEFAULT_PITCH = -0.55;
  var Z2 = [0, 0, 1];
  var PAD_BULGE = [0, 0, -0.12];
  function lerpPose(a, b, u) {
    const l = (x, y) => x + (y - x) * u;
    const onB = b.pad > 0;
    return {
      palm: quatSlerp(a.palm, b.palm, u),
      curl: a.curl.map((c, i) => l(c, b.curl[i])),
      spread: a.spread.map((s, i) => l(s, b.spread[i])),
      lift: l(a.lift, b.lift),
      sweep: l(a.sweep, b.sweep),
      pad: l(a.pad, b.pad),
      padFinger: onB ? b.padFinger : a.padFinger,
      padStraight: onB ? b.padStraight : a.padStraight
    };
  }
  function bones(p) {
    const out = [];
    for (let f = 1; f < 5; f++) out[f] = longFingerBone(f, p.curl[f], p.spread[f]);
    const t02 = FINGER_ROOTS[THUMB2];
    const free = thumbBone(p.lift, p.sweep).tip;
    if (p.pad <= 0) {
      out[THUMB2] = { root: t02, tip: free };
      return out;
    }
    const fb = out[p.padFinger];
    const target = p.padStraight ? add(lerp3(fb.root, fb.tip, 0.55), [0, 0, -0.04]) : fb.tip;
    const away = sub(t02, target);
    const reach = Math.hypot(...away);
    const base = reach > FINGER_LEN ? add(target, scale(normalize(away), FINGER_LEN)) : t02;
    const root = lerp3(t02, base, p.pad);
    const tip = add(lerp3(free, target, p.pad), scale(PAD_BULGE, Math.sin(Math.PI * p.pad)));
    out[THUMB2] = { root, tip };
    return out;
  }
  var toWorld = (p, v) => quatRotate(p.palm, sub(v, PALM_CENTER));
  var ease = (u) => u * u * (3 - 2 * u);
  function frameAt(phase, t) {
    const total = phase.segs.reduce((s, g) => s + g.move + g.hold, 0);
    let tt = total > 0 ? t % total : 0;
    let from = phase.start;
    for (let i = 0; i < phase.segs.length; i++) {
      const g = phase.segs[i];
      if (tt < g.move) return { pose: lerpPose(from, g.to, ease(tt / g.move)), seg: i, moving: true };
      tt -= g.move;
      if (tt < g.hold) return { pose: g.to, seg: i, moving: false };
      tt -= g.hold;
      from = g.to;
    }
    return { pose: from, seg: phase.segs.length - 1, moving: false };
  }
  var BLEND_S = 0.35;
  function arcPoints(a, n = 40) {
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const p = lerpPose(a.from, a.to, i / n);
      if ("tip" in a.point) {
        const b = bones(p)[a.point.tip];
        const root = toWorld(p, b.root), tip = toWorld(p, b.tip);
        pts.push(add(root, scale(sub(tip, root), a.push)));
      } else {
        pts.push(scale(toWorld(p, a.point.palm), a.push));
      }
    }
    return pts;
  }
  var state = null;
  var readHold = () => ({ held: 0, target: 0 });
  var lastPose = null;
  var blendFrom = null;
  var t0 = performance.now();
  var raf = 0;
  var visible = false;
  var yaw = DEFAULT_YAW;
  var pitch = DEFAULT_PITCH;
  var goalYaw = DEFAULT_YAW;
  var goalPitch = DEFAULT_PITCH;
  var orbited = false;
  function viewMatrix() {
    const w2s = new Float32Array([1, 0, 0, 0, 0, 1, 0, 1, 0]);
    return mulMatrices(xRotMatrix(pitch), mulMatrices(yRotMatrix(yaw), w2s));
  }
  function resize() {
    const r = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { w: r.width, h: r.height };
  }
  function line(a, b) {
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.stroke();
  }
  function arrowhead(tip, from, size) {
    const dx = tip[0] - from[0], dy = tip[1] - from[1];
    const n = Math.hypot(dx, dy);
    if (n < 1e-6) return;
    const ux = dx / n, uy = dy / n;
    ctx.beginPath();
    ctx.moveTo(tip[0] + ux * size * 0.4, tip[1] + uy * size * 0.4);
    ctx.lineTo(tip[0] - ux * size + uy * size * 0.55, tip[1] - uy * size - ux * size * 0.55);
    ctx.lineTo(tip[0] - ux * size - uy * size * 0.55, tip[1] - uy * size + ux * size * 0.55);
    ctx.closePath();
    ctx.fill();
  }
  function draw(t) {
    const { w, h } = resize();
    ctx.clearRect(0, 0, w, h);
    if (!state) return;
    const sc = Math.min(w, h) * 0.52;
    const cx = w / 2, cy = h / 2;
    const fr = frameAt(state.phase, t);
    const pose = blendFrom && t < BLEND_S ? lerpPose(blendFrom, fr.pose, ease(t / BLEND_S)) : fr.pose;
    lastPose = pose;
    const V = viewMatrix();
    const target = toWorld(pose, HAND_MIDDLE);
    const P = (v) => project(applyMatrix(V, sub(v, target)), cx, cy, sc);
    ctx.strokeStyle = "#15181d";
    ctx.lineWidth = 1;
    for (let i = -4; i <= 4; i++) {
      const k = i * 0.25;
      line(P([k, -1, FLOOR_Z]), P([k, 1, FLOOR_Z]));
      line(P([-1, k, FLOOR_Z]), P([1, k, FLOOR_Z]));
    }
    for (const a of state.phase.arcs) {
      const on = a.segs.includes(fr.seg);
      const pts = arcPoints(a).map(P);
      ctx.globalAlpha = on ? 1 : 0.4;
      ctx.strokeStyle = GREEN;
      ctx.fillStyle = GREEN;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (const p of pts.slice(1)) ctx.lineTo(p[0], p[1]);
      ctx.stroke();
      const n = pts.length;
      arrowhead(pts[n - 1], pts[n - 3], 7);
      if (a.arrows === "both") arrowhead(pts[0], pts[2], 7);
      ctx.globalAlpha = 1;
    }
    const palm2d = PALM_V.map((v) => P(toWorld(pose, v)));
    ctx.fillStyle = "rgba(130,130,130,0.05)";
    ctx.beginPath();
    palm2d.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]));
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = HAND_COLOR;
    ctx.lineWidth = 1;
    for (const [a, b] of PALM_E) line(palm2d[a], palm2d[b]);
    const bs = bones(pose);
    const normal = quatRotate(pose.palm, Z2);
    ctx.font = '9px "Plex Mono", ui-monospace, monospace';
    for (let f = 0; f < 5; f++) {
      const on = state.enabled[f];
      const active = state.active === f;
      const color = active ? ACTIVE_COLOR : on ? HAND_COLOR : OFF_COLOR;
      const root = toWorld(pose, bs[f].root), tip = toWorld(pose, bs[f].tip);
      const dir = normalize(sub(tip, root));
      let perp = cross(dir, normal);
      if (Math.hypot(...perp) < 0.2) perp = cross(dir, [0, 0, 1]);
      perp = normalize(perp);
      const base = sub(tip, scale(dir, AR));
      ctx.strokeStyle = color;
      ctx.lineWidth = active ? 1.8 : 1;
      if (f === THUMB2) {
        ctx.globalAlpha = 0.45;
        line(P(toWorld(pose, PALM_V[0])), P(root));
        ctx.globalAlpha = 1;
      }
      const tip2 = P(tip);
      line(P(root), tip2);
      line(tip2, P(add(base, scale(perp, AR))));
      line(tip2, P(sub(base, scale(perp, AR))));
      ctx.fillStyle = active ? ACTIVE_COLOR : on ? "#5d6675" : "#232834";
      ctx.fillText(FINGER_NAMES[f], tip2[0] + 5, tip2[1] + 3);
    }
    const phase = state.phase;
    ctx.font = '11px "Plex Mono", ui-monospace, monospace';
    ctx.textAlign = "center";
    if (phase.hold !== void 0) {
      const { held, target: target2 } = readHold();
      const u = target2 > 0 ? Math.min(1, held / target2) : 0;
      ctx.fillStyle = held > 0 ? ACTIVE_COLOR : "#aab3c0";
      ctx.fillText(`${phase.label} \xB7 ${held.toFixed(1)} s`, w / 2, h - 22);
      const bw = 120;
      ctx.fillStyle = "#2a3140";
      ctx.fillRect(w / 2 - bw / 2, h - 14, bw, 3);
      ctx.fillStyle = u >= 1 ? GREEN : "#aab3c0";
      ctx.fillRect(w / 2 - bw / 2, h - 14, bw * u, 3);
    } else {
      const move = fr.moving ? phase.segs[fr.seg].label : void 0;
      if (move) {
        ctx.fillStyle = GREEN;
        ctx.fillText(move, w / 2, h - 38);
      }
      if (phase.label) {
        ctx.fillStyle = phase.segs.some((g) => g.label) ? "#aab3c0" : GREEN;
        ctx.fillText(phase.label, w / 2, h - 18);
      }
    }
    ctx.textAlign = "start";
  }
  function tick(now) {
    if (!visible) {
      raf = 0;
      return;
    }
    if (!orbited && !dragging) {
      yaw += (goalYaw - yaw) * 0.08;
      pitch += (goalPitch - pitch) * 0.08;
    }
    draw((now - t0) / 1e3);
    raf = requestAnimationFrame(tick);
  }
  function ensureRunning() {
    if (visible && !raf) raf = requestAnimationFrame(tick);
  }
  function showPhase(phase, view, enabled, active) {
    state = { phase, enabled, active };
    blendFrom = lastPose;
    t0 = performance.now();
    const [y, p] = view ?? [DEFAULT_YAW, DEFAULT_PITCH];
    if (y !== goalYaw || p !== goalPitch) orbited = false;
    [goalYaw, goalPitch] = [y, p];
    ensureRunning();
  }
  function setHoldReading(read) {
    readHold = read;
  }
  function setVisible(v) {
    visible = v;
    ensureRunning();
  }
  var dragging = false;
  var lastX = 0;
  var lastY = 0;
  canvas.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    dragging = true;
    orbited = true;
    lastX = e.clientX;
    lastY = e.clientY;
    canvas.style.cursor = "grabbing";
  });
  window.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    yaw -= (e.clientX - lastX) * 0.01;
    pitch -= (e.clientY - lastY) * 0.01;
    pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));
    lastX = e.clientX;
    lastY = e.clientY;
  });
  window.addEventListener("mouseup", () => {
    if (dragging) {
      dragging = false;
      canvas.style.cursor = "grab";
    }
  });
  canvas.addEventListener("dblclick", () => {
    orbited = false;
  });
  function pigloFrame() {
    if (!state) return null;
    const fr = frameAt(state.phase, (performance.now() - t0) / 1e3);
    return {
      pose: fr.pose,
      seg: fr.seg,
      moving: fr.moving,
      phase: state.phase,
      enabled: state.enabled,
      active: state.active,
      /* The angle this step is best watched from, which steps set themselves --
         a side-on gravity turn is unreadable from the back of the hand. */
      view: [goalYaw, goalPitch]
    };
  }
  function pigloHold() {
    return readHold();
  }
  function pigloLerpPose(a, b, u) {
    return lerpPose(a, b, u);
  }

  // ../../../../../../tmp/tmp.6N8Q1DT2My/lib/log-stream.ts
  var listeners = /* @__PURE__ */ new Set();
  var es = null;
  function subscribeLogs(listener) {
    listeners.add(listener);
    if (!es) {
      es = new EventSource("/api/logs/events");
      es.onmessage = (ev) => {
        try {
          const entries = JSON.parse(ev.data);
          for (const l of listeners) l(entries);
        } catch {
        }
      };
    }
    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        es?.close();
        es = null;
      }
    };
  }

  // ../../../../../../tmp/tmp.6N8Q1DT2My/lib/calibration-panel.ts
  var titleEl = document.getElementById("cal-title");
  var progressEl = document.getElementById("cal-progress");
  var sourceEl = document.getElementById("cal-source");
  var instructionEl = document.getElementById("cal-instruction");
  var warningEl = document.getElementById("cal-warning");
  var stepsEl = document.getElementById("cal-steps");
  var phasesEl = document.getElementById("cal-phases");
  var mockBarEl = document.getElementById("cal-mock");
  var mockFingersEl = document.getElementById("cal-mock-fingers");
  var MODE_KEY = "cal-source";
  function getCalSource() {
    return localStorage.getItem(MODE_KEY) === "glove" ? "glove" : "mock";
  }
  function setCalSource(m) {
    localStorage.setItem(MODE_KEY, m);
    state2 = { ...state2, source: m, stepId: "gravity-a", count: 0, phase: 0, warning: null };
    lastReportMs = 0;
    gloveHold = { s: 0, target: 0, atMs: 0 };
    syncGloveFeed();
    render();
  }
  var state2 = {
    enabled: [true, true, true, true, true],
    stepId: "gravity-a",
    count: 0,
    phase: 0,
    warning: null,
    source: getCalSource()
  };
  var steps = calibrationSteps(state2.enabled);
  var shown = { stepId: "", count: -1, phase: -1, enabled: "" };
  function setCalibrationState(next) {
    if (next.source !== getCalSource()) return;
    if (next.stepId !== state2.stepId || next.count !== state2.count || next.phase !== state2.phase) mockStillSince = performance.now();
    state2 = next;
    render();
  }
  function currentIndex() {
    const i = steps.findIndex((s) => s.id === state2.stepId);
    return i >= 0 ? i : 0;
  }
  function renderSteps(cur) {
    stepsEl.innerHTML = "";
    let group = "";
    steps.forEach((s, i) => {
      if (s.group !== group) {
        group = s.group;
        const g = document.createElement("span");
        g.textContent = group;
        g.className = "uppercase tracking-wider";
        g.style.cssText = `color:${i <= cur ? "#6e6862" : "#cfc8bd"};margin-left:${i ? "6px" : "0"};`;
        stepsEl.appendChild(g);
      }
      const chip = document.createElement("span");
      const done = i < cur, now = i === cur;
      chip.textContent = done ? `\u2713 ${s.short}` : s.short;
      chip.style.cssText = `padding:1px 6px;border:1px solid ${now ? "#27459a" : "#cfc8bd"};color:${now ? "#27459a" : done ? "#4a7c59" : "#6e6862"};cursor:${state2.source === "mock" ? "pointer" : "default"};user-select:none;`;
      if (state2.source === "mock") {
        chip.addEventListener("click", () => mockGo(i));
      }
      stepsEl.appendChild(chip);
    });
  }
  function renderPhases(step, phases, cur) {
    phasesEl.innerHTML = "";
    phasesEl.style.display = phases.length > 1 ? "" : "none";
    phases.forEach((p, i) => {
      if (i) {
        const sep = document.createElement("span");
        sep.textContent = "\u2192";
        sep.style.color = "#cfc8bd";
        phasesEl.appendChild(sep);
      }
      const el = document.createElement("span");
      const done = i < cur, now = i === cur;
      el.textContent = done ? `\u2713 ${p.label}` : p.label;
      el.style.color = now ? "#27459a" : done ? "#4a7c59" : "#6e6862";
      if (now) el.style.fontWeight = "600";
      phasesEl.appendChild(el);
    });
    if (step.total > 0) {
      const r = document.createElement("span");
      r.textContent = "\u21BA";
      r.title = `then again, ${step.total} in all`;
      r.style.color = "#6e6862";
      phasesEl.appendChild(r);
    }
  }
  function render() {
    steps = calibrationSteps(state2.enabled);
    const cur = currentIndex();
    const step = steps[cur];
    const count = Math.min(state2.count, Math.max(0, step.total - 1));
    const anim = step.anim(count);
    const phase = Math.min(state2.phase, anim.phases.length - 1);
    titleEl.textContent = step.title;
    progressEl.textContent = step.progress(count);
    renderSource();
    mockBarEl.style.display = state2.source === "mock" ? "" : "none";
    instructionEl.textContent = step.instruction(count);
    warningEl.style.display = state2.warning ? "" : "none";
    warningEl.textContent = state2.warning ? `\u26A0 ${state2.warning}` : "";
    renderSteps(cur);
    renderPhases(step, anim.phases, phase);
    const enabledKey = state2.enabled.join();
    const restart = shown.stepId !== step.id || shown.enabled !== enabledKey || shown.count !== count || shown.phase !== phase;
    if (restart) showPhase(anim.phases[phase], anim.view, state2.enabled, step.finger);
    shown = { stepId: step.id, count, phase, enabled: enabledKey };
    renderMockFingers();
  }
  function renderSource() {
    const live = Date.now() - lastReportMs < REPORT_TIMEOUT_MS;
    sourceEl.textContent = state2.source === "mock" ? "mock" : live ? "glove" : "glove \xB7 waiting for report";
  }
  var REPORT_TIMEOUT_MS = 2e3;
  var HOLD_EXTRAPOLATE_S = 0.3;
  var lastReportMs = 0;
  var unsubscribeGlove = null;
  var shownReport = "";
  var gloveHold = { s: 0, target: 0, atMs: 0 };
  var rawPhase = { key: "", phase: -1 };
  function onGloveEntries(entries) {
    let { enabled, stepId, count, phase, warning } = state2;
    let reported = false;
    for (const { payload: p } of entries) {
      if (p.kind !== "vector_data") continue;
      if (p.nameId === CAL_STATE_ID) {
        enabled = FINGERS.map((_, f) => (p.z >> 8 + f & 1) === 1);
        count = p.z & 255;
        stepId = wireStepId(p.x, p.y) ?? stepId;
        reported = true;
      } else if (p.nameId === CAL_WARNING_ID) {
        warning = wireWarning(p.x, p.y / 10, p.z / 10, enabled);
        reported = true;
      } else if (p.nameId === CAL_PHASE_ID) {
        const key = `${stepId}|${count}`;
        if (key !== rawPhase.key) phase = p.x;
        else if (p.x === rawPhase.phase) phase = p.x;
        rawPhase = { key, phase: p.x };
        gloveHold = { s: p.y / 100, target: p.z / 100, atMs: performance.now() };
        reported = true;
      }
    }
    if (!reported) return;
    lastReportMs = Date.now();
    const report = JSON.stringify([enabled, stepId, count, phase, warning]);
    if (report === shownReport) return;
    shownReport = report;
    setCalibrationState({ enabled, stepId, count, phase, warning, source: "glove" });
  }
  function currentPhase() {
    const step = steps[currentIndex()];
    const phases = step.anim(Math.min(state2.count, Math.max(0, step.total - 1))).phases;
    return phases[Math.min(state2.phase, phases.length - 1)];
  }
  setHoldReading(() => {
    const target = currentPhase().hold ?? 0;
    if (state2.source === "mock") {
      return { held: mockStill ? (performance.now() - mockStillSince) / 1e3 : 0, target };
    }
    const { s, atMs } = gloveHold;
    const since = Math.min(HOLD_EXTRAPOLATE_S, (performance.now() - atMs) / 1e3);
    return { held: s > 0 ? s + since : 0, target: gloveHold.target > 0 ? gloveHold.target : target };
  });
  function syncGloveFeed() {
    shownReport = "";
    if (getCalSource() === "glove") {
      unsubscribeGlove ?? (unsubscribeGlove = subscribeLogs(onGloveEntries));
    } else {
      unsubscribeGlove?.();
      unsubscribeGlove = null;
    }
  }
  setInterval(renderSource, 1e3);
  var mockStill = false;
  var mockStillSince = performance.now();
  var mockStillEl = document.getElementById("cal-mock-still");
  function mockGo(i) {
    const s = steps[Math.max(0, Math.min(steps.length - 1, i))];
    setCalibrationState({ ...state2, stepId: s.id, count: 0, phase: 0, warning: null });
  }
  function mockDone() {
    const step = steps[currentIndex()];
    const n = step.anim(Math.min(state2.count, Math.max(0, step.total - 1))).phases.length;
    if (state2.phase + 1 < n) {
      setCalibrationState({ ...state2, phase: state2.phase + 1 });
    } else if (step.total > 0 && state2.count + 1 < step.total) {
      setCalibrationState({ ...state2, count: state2.count + 1, phase: 0 });
    } else {
      mockGo(currentIndex() + 1);
    }
  }
  function setMockStill(on) {
    mockStill = on;
    mockStillSince = performance.now();
    mockStillEl.classList.toggle("active", on);
  }
  setInterval(() => {
    if (state2.source !== "mock" || !mockStill) return;
    const target = currentPhase().hold;
    if (target !== void 0 && (performance.now() - mockStillSince) / 1e3 >= target + 0.3) mockDone();
  }, 100);
  function renderMockFingers() {
    mockFingersEl.innerHTML = "";
    FINGERS.forEach((name, f) => {
      const b = document.createElement("button");
      b.className = `tui-btn text-xs${state2.enabled[f] ? " active" : ""}`;
      b.textContent = name;
      b.addEventListener("click", () => {
        const enabled = [...state2.enabled];
        enabled[f] = !enabled[f];
        if (!enabled.some(Boolean)) return;
        const next = calibrationSteps(enabled);
        const stepId = next.some((s) => s.id === state2.stepId) ? state2.stepId : "gravity-a";
        const same = stepId === state2.stepId;
        setCalibrationState({ ...state2, enabled, stepId, count: same ? state2.count : 0, phase: same ? state2.phase : 0 });
      });
      mockFingersEl.appendChild(b);
    });
  }
  document.getElementById("cal-mock-prev").addEventListener("click", () => mockGo(currentIndex() - 1));
  document.getElementById("cal-mock-next").addEventListener("click", () => mockGo(currentIndex() + 1));
  document.getElementById("cal-mock-count").addEventListener("click", () => {
    const step = steps[currentIndex()];
    if (step.total === 0 || state2.count + 1 >= step.total) {
      mockGo(currentIndex() + 1);
      return;
    }
    setCalibrationState({ ...state2, count: state2.count + 1, phase: 0 });
  });
  document.getElementById("cal-mock-done").addEventListener("click", mockDone);
  mockStillEl.addEventListener("click", () => setMockStill(!mockStill));
  document.getElementById("cal-mock-reject").addEventListener("click", () => {
    const step = steps[currentIndex()];
    setCalibrationState({ ...state2, warning: state2.warning ? null : step.warning || null });
  });
  document.addEventListener("tabchange", (e) => setVisible(e.detail === "calibration"));
  syncGloveFeed();
  render();
  return __toCommonJS(entry_exports);
})();
