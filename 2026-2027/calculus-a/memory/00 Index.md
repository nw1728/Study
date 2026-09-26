---
title: Calculus A — Memory Index
tags: [calculus-a, index]
updated: 2026-09-26
---

# 📚 Calculus A — Memory Index

> [!info] Course
> **Calculus A** · University of Twente · Lecturer: **Carlos Pérez Arancibia** (Mathematics of Computational Science, Dept. of Applied Mathematics)
> Slides live in `../lectures_slides/`. Math is written in LaTeX (`$...$`) — Obsidian renders it.
> ⚠️ **In chat, explain in plain text, not LaTeX** — Ethan reads the terminal. See [[Teaching Playbook]].

## 🧭 Start here
- 📍 [[Current Progress]] — **where the last session stopped and what to do next**
- [[Student Profile]] — who Ethan is, how he learns best
- [[Teaching Playbook]] — how the instructor (Claude) runs lectures and practice
- [[Session Log]] — what happened in each session, newest first

## 🎓 Lectures
| # | Date | Topic | Status | Note |
|---|------|-------|--------|------|
| 1 | 2026-09-01 | Functions, limits, continuity | ✅ done | [[L01 Functions Limits Continuity]] |
| 2 | 2026-09-07 | Differentiation | ✅ done + heavy practice | [[L02 Differentiation]] |
| 3 | 2026-09-14 | Integration | 🟡 theory noted; FTC I/II + substitution + one area problem practised (live notes still empty) | [[L03 Integration]] |
| 4 | 2026-09-21 | Vectors, products, 3D geometry (lines, planes) | 🟡 theory noted from slides, **no practice yet** | [[L04 Vectors and 3D Geometry]] |

## 📐 Reference sheets
- [[Derivative Rules]] — every derivative formula in one place
- [[Integration Rules]] — antiderivatives, techniques, improper integrals
- [[Verification Methods]] — how to check an answer before trusting it
- 🔵 [Interactive unit circle](https://claude.ai/artifact/VL1xCLnf4rfz58ezkdLZeG) — drag the angle, read off $\cos\theta$ and $\sin\theta$ (built 2026-09-16). Local copy: `html-visualization/unit-circle.html`
- 🟢 `html-visualization/extrema-and-integral-checks.html` — peaks, valleys and the four integral checks: drag the tangent point, drag the interval endpoints, live sign chart and candidate table, plus Riemann slices / squeeze bounds / differentiate-back on Ex 35, 17, 31, 41 (built 2026-09-26)

## ✍️ Practice
- [[Exercise Log]] — every exercise worked, with final answers
- [[Common Mistakes]] — Ethan's recurring errors and the fix for each

## 🗂️ Original handovers (from the previous tutor, kept unchanged)
- [[Ethan_Calculus_A_Handover_Sept2026]] — 2026-09-09, Lecture 2 theory session
- [[Ethan_Calculus_A_Continuation_Sept2026]] — 2026-09-14, Lecture 2 exercises 23–70+

> [!warning] Known error in the handovers
> The first handover lists the tangent to $g(x)=\frac{x}{x-2}$ at $(3,3)$ as $y=\frac16x+\frac53$. That is actually the tangent to $f(x)=\sqrt{x+1}$ at $(8,3)$. The correct tangent for $g$ is $y=-2x+9$ (slope $g'(3)=-2$). Corrected in [[Exercise Log]].

## 🎯 Next up
- [ ] **Set for Ethan (3 open):** $f(x)=x^2-4x+1$ on $[0,5]$ · $\int_1^4\frac{x^2+x}{x^{3/2}}dx$ · $\int_0^2x\sqrt{x^2+1}\,dx$ — ask for his attempt first
- [ ] Integration by parts (incl. twice), then trig integrals
- [ ] Improper integrals — Type I and II, the $p$-test
- [ ] More area between curves
- [ ] **Lecture 4 practice** — vectors, dot/cross product, lines and planes (nothing done yet)
- [ ] Lecture 3 live notes → [[L03 Integration]] (still empty)
- [ ] Still pending from L02: related rates, optimization word problems, 2nd-derivative test, concavity/inflection

## 🗺️ Folder map
```
memory/
├── 00 Index.md              ← you are here
├── Current Progress.md      ← read first on any device
├── Student Profile.md
├── Teaching Playbook.md
├── Lectures/                ← one note per lecture
├── Reference/               ← formula sheets
├── Practice/                ← exercise log + mistakes
├── Sessions/                ← session log
└── Ethan_Calculus_A_*.md    ← original handovers
```
