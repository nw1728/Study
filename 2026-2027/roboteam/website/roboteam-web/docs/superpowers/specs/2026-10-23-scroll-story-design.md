# Scroll story and scroll effects: design

Date: 2026-10-23
Status: draft, waiting for Ethan's approval

## Intent

The front page works but feels like a list of sections that fade in. Ethan saw droneteamtwente.nl and liked how its scroll *tells a story*: the hero stays pinned while a wireframe drone gets built, tilts its motors and drops water as you scroll. We want the same kind of feeling for RoboTeam Twente, built around **our Mars rover** and drawn as a **2D line drawing** (Ethan's choice, so no 3D model or Three.js).

We take ideas from the Drone Team site, never its code, text or exact look. The result should look like RoboTeam: dark purple, minimal, rover-themed, matching the palette in `src/styles/tokens.css`.

## Goals

1. A **scroll-story hero**: a large line drawing of the rover that draws itself and acts out four chapters as you scroll.
2. **Rising words**: headline words slide up into place one after another.
3. A **results accordion** with rolling year digits, replacing the current achievements list.
4. A **monospace font** for small labels and data, for a technical, blueprint feel.
5. Later (phase 2): a **pinned history timeline** from the RoboCup soccer robots to the Mars rover.

## Non-goals

- No 3D, Three.js, or video.
- No animation libraries (GSAP, Lenis, etc.). The Drone Team site shows plain code is enough, and it keeps the bundle small.
- No changes to the content structure (`src/data/*`) beyond the new data files listed below.
- No admin backend work. That's a separate project.

## Anti-goals (it fails if…)

- Scrolling feels heavy, laggy or "hijacked". The page must scroll normally; animations follow the scroll and never fight it.
- The rover drawing looks like clip-art. It should look like a clean technical line drawing.
- The code becomes one huge file. Every part must stay a small file with one job (Ethan's "one object per file" rule).
- People with "reduce motion" on, or phone users, get a broken or empty hero.

## Constraints

- React 19 + Vite, plain JS, CSS Modules: the same as the rest of the project.
- Works in both light and dark mode, using only the colour variables in `tokens.css`.
- The rover pet stays. It must not break (see "Rover pet" below).
- Fonts come from Google Fonts: Saira (body), Aldrich (headlines), JetBrains Mono (labels and log). See `src/styles/tokens.css`.

---

## Part 1: the scroll-story hero

### How it feels, chapter by chapter

The hero section is about **4 screens tall**. Inside it, a full-screen **stage** stays pinned (`position: sticky`) while you scroll through it. Scroll position becomes one number, `progress`, from 0 (top) to 1 (bottom), and everything on stage reacts to it.

| Progress | Chapter | Rover (right side of stage) | Text (left side) |
|---|---|---|---|
| 0.00–0.10 | **Intro** | Faint dotted outline of the rover | "RoboTeam / Twente" title + tagline + buttons (the current hero content) |
| 0.10–0.35 | **01 Build** | Lines draw themselves part by part: chassis → wheels → rocker-bogie legs → mast → arm. Thin dimension lines with mono labels appear ("6 wheels", "rocker-bogie") | "Designed by students." chapter text |
| 0.35–0.60 | **02 Drive** | A terrain line slides beneath it, wheels turn, and one side of the rocker-bogie tilts up as it rolls over a rock | Text about driving over rough terrain |
| 0.60–0.85 | **03 Science** | The arm unfolds, reaches the ground and takes a sample. A few dots (soil) rise into the sample box. A callout circle with a mono label appears | Text about the science task |
| 0.85–1.00 | **04 Mission** | The mast camera turns toward the viewer and the rover drives off to the right | "Next up: ERC 2026" + Join button, then the page continues |

**Chapter text is placeholder for now** and lives in `data/story.js`, so the team can rewrite it without touching code. The facts used must match the current site: ERC tasks are autonomous navigation, terrain traversal, sample collection and environmental analysis.

**Chapter bar:** at the top right of the stage sits `01 Build · 02 Drive · 03 Science · 04 Mission`. The current chapter is highlighted, and a thin line under the bar fills with `progress`. Clicking a chapter scrolls smoothly to it.

**Background:** faint contour lines (like a terrain map) and a few dots, drifting slightly slower than the scroll for depth. Colours: rover strokes in `--lavender` with a few accent strokes in `--brand-bright`. In light mode the same variables give purple-on-white.

### How the drawing works

- The rover is one inline SVG made of separate parts. Every stroke uses `pathLength="1"` so "how much is drawn" is simply a number from 0 to 1 (`stroke-dashoffset: 1 - drawn`).
- Moving parts (wheels, bogie, arm joints, mast) are `<g>` groups that rotate around their joints, the same technique as the rover pet.
- Each frame, one function turns `progress` into "how drawn is each part, and at what angle is each joint". It writes those values straight onto the SVG (no React re-render per frame).

### Files (one job per file)

```
src/
├── hooks/
│   └── useScrollProgress.js      Section → smoothed 0..1 progress. Calls back every frame
│                                 while the section is on screen; idle otherwise.
├── lib/
│   └── timeline.js               Tiny helpers: between(p, start, end) → 0..1, easing curves.
├── data/
│   └── story.js                  The chapters: number, title, text, fact, progress range.
└── sections/ScrollStory/         Replaces sections/Hero/
    ├── ScrollStory.jsx           Layout: tall section, pinned stage, puts the pieces together.
    ├── ScrollStory.module.css
    ├── StoryDirector.js          Plain JS class: update(progress) → sets every part's drawing
    │                             amount and joint angle. All the choreography lives here.
    ├── ChapterNav.jsx            "01 Build · 02 Drive …" bar with the progress line.
    ├── ChapterText.jsx           One chapter's text block (uses WordRise).
    ├── Terrain.jsx               Background contour lines + ground line.
    └── rover/                    The big line drawing, one file per part
        ├── StoryRover.jsx        Puts the parts together in one <svg>.
        ├── Chassis.jsx
        ├── Wheel.jsx
        ├── RockerBogie.jsx
        ├── Mast.jsx
        ├── Arm.jsx
        └── Annotations.jsx       Dimension lines and mono labels.
```

### Behaviour details

- **Smoothing:** `progress` eases toward the real scroll position (like the Drone Team site), so motion glides instead of stepping.
- **Performance:** animation runs only while the section is on screen (IntersectionObserver), and only transforms, opacity and stroke-dashoffset change. Nothing that triggers layout.
- **Phones (narrow screens):** the stage stacks the rover above the text, and the section is about 3 screens tall instead of 4.
- **Reduced motion:** nothing is pinned. The rover shows fully drawn, and the four chapters appear as normal blocks of text one after another.
- **Rover pet:** the pet treats text as obstacles. Chapter text that is invisible (opacity 0) must not count, so `TextObstacles.js` will skip elements whose opacity is near 0.
- **The current Statement section** ("Designed by students. Built at Future Factory. Bound for Mars.") stays right after the story. Ethan likes it.

---

## Part 2: shared effects (phase 1)

### WordRise (`components/WordRise/`)

Splits a headline into words. Each word sits in a box with `overflow: hidden` and slides up from below, staggered. It can be triggered two ways:
- **on view** (like `Reveal`), for normal sections
- **by progress**, inside the scroll story (the chapter decides how far along it is)

Used on: section titles, Statement lines, chapter titles.

### Monospace labels

Add **JetBrains Mono** (Google Fonts) as `--font-mono` in `tokens.css`. It's used for the chapter bar, labels like "WHO WE ARE", dimension labels on the drawing, and the years in the results table.

### Results accordion (rebuild `sections/Achievements/`)

A table with the columns Year · Competition · Result. Clicking a row opens a short note (new optional `note` field in `data/achievements.js`). When the section scrolls into view, the year digits roll up into place like an odometer (`components/RollingNumber/`). The ERC 2026 intro text stays above it.

---

## Part 3: history timeline (phase 2, later)

`sections/History/` + `data/history.js`. Each generation's text scrolls on the left while its photo stays pinned on the right and swaps as you pass. Under the photo sits a small year ruler with a marker that slides. The story goes from the RoboCup soccer robots to the Mars rover.

**Needs from the team:** one photo per robot generation, plus name, years and one line about each. It's blocked until those exist, so it isn't part of the first build.

---

## Build order

1. `useScrollProgress`, `timeline.js`, the mono font.
2. `WordRise`, used on existing headlines (quick visible win).
3. The scroll story: drawing first (static), then the Build chapter, then Drive, Science, Mission.
4. The results accordion + `RollingNumber`.
5. Reduced-motion and phone layouts, light-mode check, rover-pet obstacle fix.
6. (Later) History timeline once the photos exist.

## Calls I made (Ethan can override)

- The scroll story **replaces** the current Hero; the title and buttons become its intro.
- The four chapters are **Build, Drive, Science, Mission**.
- The section is **4 screens tall** on desktop and 3 on phones.
- **JetBrains Mono** for the mono font.
- The partner section stays a grid (no scrolling marquee).

## Left to the builder

- The exact shapes of the rover drawing, as long as it reads clearly as a six-wheel rocker-bogie rover with a mast and an arm.
- The exact progress numbers per chapter, tuned by eye.
- Easing curves and stagger timings.
