---
title: Current Progress
tags: [calculus-a, progress]
updated: 2026-09-26
last_device: "Arch laptop (nw1728)"
---

# 📍 Current Progress — continue from here

Back to [[00 Index]] · History: [[Session Log]]

> [!important] For Claude on any device
> Read this file **first**. At the end of each session, **overwrite** it with the latest state (don't append — history goes in [[Session Log]]).

> [!warning] Formatting — read before you answer anything
> Ethan reads the chat in a **terminal**, so `$...$` LaTeX does **not** render and he literally cannot read it.
> In chat, write plain text: `a/b`, `s^(-3/2)`, `sqrt(2)`, `integral from 1 to sqrt(2) of (s^2 + sqrt(s))/s^2 ds`.
> LaTeX is fine (and wanted) **inside these Obsidian notes**. See [[Teaching Playbook]].

> [!important] Explain in "gogo gaga" mode
> Ethan asked for this on **2026-09-18**: explain everything as if he is a complete beginner who has never seen the notation — name the wrong instinct first, restate every formula in plain words, one idea per step, and show the numbers when a variant is wrong. It is the **default** register now. Recipe: [[Teaching Playbook]].

> [!tip] Syncing is now one command
> `gsync` commits every repo in its config with an AI-written message, rebases onto upstream and pushes. Run it at the end of a session instead of hand-writing commits. `gsync -n` shows what it would do without touching anything.

## Last session
- **Date:** 2026-09-26
- **Type:** Concept refresher (extrema vocabulary + integral checking), then tool-building and a notes backfill
- **What happened:**
  - Untangled **critical point / local max / local min / absolute max / min** with the hiking analogy: $f'$ is *steepness*, not height, and a critical point is a **suspect, not a verdict**. Covered the Extreme Value Theorem and the First Derivative Test ($+\to-$ max, $-\to+$ min, no flip → neither).
  - Worked $f(x)=x^3-3x$ on $[-1.5,3]$: candidates $-1.5,-1,1,3$ → **abs max $18$ at the endpoint $x=3$**, abs min $-2$ at $x=1$. Verified against a 700 001-point scan. The local max at $x=-1$ (height 2) loses badly — that is the endpoint lesson.
  - Four ways to check an integral: differentiate back (the king), eyeball the area, squeeze between $m(b-a)$ and $M(b-a)$, sign sanity.
  - Built **`html-visualization/extrema-and-integral-checks.html`** — an interactive page (drag the tangent point, drag the interval endpoints, live sign chart + candidate table; integral tool with Riemann slices, squeeze bounds and the "slope of $F$ on top of $f$" check). All examples come from our own sessions.
  - **Backfilled five sessions of notes** (09-17 → 09-26) that had never been written down.

## Where we are now
| Area | Status |
|---|---|
| L01 Functions, limits, continuity | ✅ done |
| L02 Differentiation | ✅ done + 30+ exercises |
| L02 extrema vocabulary | ✅ re-taught 2026-09-26, with an interactive page |
| L03 Integration — note from slides | ✅ written |
| L03 live lecture notes | ⬜ **still empty** |
| L03 practice — FTC II | ✅ Ex 17, Ex 23 |
| L03 practice — FTC I | ✅ Ex 47, plus the outer-power example |
| L03 practice — substitution (indefinite) | ✅ Ex 14, Ex 17, Ex 29, Ex 35, Ex 65 |
| L03 practice — substitution (definite, converted limits) | ✅ Ex 31, Ex 41 |
| L03 practice — area between curves | 🟡 one worked (the $2x^2$ / $x^4-2x^2$ problem) |
| L03 — integration by parts, trig integrals, improper integrals | ⬜ not started |
| L04 Vectors and 3D geometry | 🟡 note written from slides, **no practice yet** |

**Last exercise worked:** $f(x)=x^3-3x$ on $[-1.5,3]$ → max 18, min −2 (see [[Exercise Log]])

**Set for Ethan, still unanswered:**
1. $f(x)=x^2-4x+1$ on $[0,5]$ — absolute max/min (set 2026-09-26). *Answer: max $f(5)=6$, min $f(2)=-3$ — do not reveal before his attempt.*
2. $\int_1^4\frac{x^2+x}{x^{3/2}}dx$ — split-then-Power-Rule (open since 2026-09-16). *Answer $\frac{20}3$; it is behind a click in the HTML page.*
3. $\int_0^2x\sqrt{x^2+1}\,dx$ — substitution, cold re-test (set 2026-09-17). *Answer $\frac{5\sqrt5-1}3$, never revealed.*

## ▶️ Continue with
1. Check the three problems above — ask for his attempt first, hints before solutions.
2. **Integration by parts** (including twice round), then trig integrals.
3. **Improper integrals** — Type I and II, the $p$-test.
4. More area between curves, now that one is worked.
5. **Lecture 4 practice** — vectors, dot/cross product, lines and planes. Nothing done yet.
6. **Leftovers from L02:** related rates, optimization word problems, second-derivative test, concavity and inflection points.
7. Lecture 3 live notes are still an empty section in [[L03 Integration]].

## Watch out for (right now)
- **Endpoints.** Mistake #1: hunting absolute extremes and listing only the critical points.
- **Critical ≠ extreme.** Always do the sign flip. $x^3$ at $0$ is the counterexample.
- **Picking the technique.** Ask him first: *"is there something **inside** something?"* Yes → substitution. No, a fraction → split it, then Power Rule. Product of unrelated things → by parts.
- **The extra factor in a substitution is $du$**, not decoration (the Ex 14 detour).
- Converted limits stay converted — never go back to $x$ afterwards (Ex 31).
- Constants factored out must come back (Ex 41: the leading 4).
- Area between curves is always **top − bottom**; test a point first (2026-09-24).
- Still weak from L02: algebra simplification, spotting inner/outer layers, trig minus signs, $+C$.

## Open questions from Ethan
- *(none open)*

## Tools built for this course
- 🔵 [Interactive unit circle](https://claude.ai/artifact/VL1xCLnf4rfz58ezkdLZeG) — drag the angle, read off $\cos\theta$, $\sin\theta$ (2026-09-16). Local copy: `html-visualization/unit-circle.html`.
- 🟢 `html-visualization/extrema-and-integral-checks.html` — peaks, valleys and the four integral checks (2026-09-26). Open it in a browser; needs internet for the rendered math.
