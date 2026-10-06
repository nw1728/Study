---
title: Current Progress
tags: [calculus-a, progress]
updated: 2026-10-06
last_device: "Arch laptop (nw1728)"
---

# 📍 Current Progress — continue from here

Back to [[00 Index]] · History: [[Session Log]]

> [!important] For Claude on any device
> Read this file **first**. At the end of each session, **overwrite** it with the latest state (don't append — history goes in [[Session Log]]).

> [!warning] Formatting — read before you answer anything
> Ethan reads the chat in a **terminal**, so `$...$` LaTeX does **not** render and he literally cannot read it.
> In chat, write plain text: `a/b`, `s^(-3/2)`, `sqrt(2)`, `<3,4,-6>`, `u . v`, `u x v`.
> LaTeX is fine (and wanted) **inside these Obsidian notes**. See [[Teaching Playbook]].

> [!important] Explain in "gogo gaga" mode
> Ethan asked for this on **2026-09-18**: explain everything as if he is a complete beginner who has never seen the notation — name the wrong instinct first, restate every formula in plain words, one idea per step, and show the numbers when a variant is wrong. It is the **default** register now. Recipe: [[Teaching Playbook]].

> [!important] New format Ethan asked for on 2026-10-06 — **keep using it**
> **Per materi, one at a time, with exercises at every materi, and mixed Bahasa Indonesia.**
> He first asked for "all 24 slides one by one", then stopped me mid-answer and asked for this instead. The loop that works:
> **1 materi → explain → 5–6 exercises → he answers → correct each one → next materi.** Do not dump several materi at once.
> Indonesian is not decoration — he engages visibly more with it. Use *panah, panjang, arah, sejajar, tegak lurus, titik, bidang, garis, jarak, pusat, utang, selisih, pembilang, penyebut, turunan*.

> [!tip] Syncing is now one command
> `gsync` commits every repo in its config with an AI-written message, rebases onto upstream and pushes. Run it at the end of a session instead of hand-writing commits. `gsync -n` shows what it would do without touching anything.

## Last session
- **Date:** 2026-10-06
- **Type:** Lecture 4 taught **per materi** in Bahasa Indonesia (gogo gaga), with exercises at each materi
- **What happened:**
  - Ethan asked for all 24 slides explained one by one. I started, got through slides 1–22, and he **interrupted** to ask for a different format: **per materi, with exercises, mixed Indonesian**. Switched immediately — that is now the standing format.
  - Split Lecture 4 into **8 materi** (map lives in [[L04 Walkthrough (Gogo Gaga)]]). **Materi 1–4 are done and passed.**
  - **Materi 1** 3D coordinates + distance (Pythagoras twice, right-hand rule, the "3D = 2D + one term" framing).
  - **Materi 2** spheres + completing the square. Introduced a **one-line formula** that removed both of his error types: $x_0=-\frac{\text{coef}}2$, $\text{debt}=x_0^2$, $a^2=-(\text{const})+\sum\text{debt}$.
  - **Materi 3** vectors, component form, magnitude, $\mathbf i\mathbf j\mathbf k$, normalisation. **6/6.**
  - **Materi 4** vector operations, the parallel idea $\mathbf u=k\mathbf v$, the type-check habit. **6/6.**
  - **22 exercises** worked, all logged in [[Exercise Log]] with his answers and the corrections.
  - He can only send **final answers** — his handwriting lives in Samsung Notes on his tab and he has no transfer path to the laptop. Reverse-engineering his errors from the numbers worked fine, so this is not blocking. **Offered to set up KDE Connect** (Arch laptop ↔ Android tab) so he can send photos/PDFs and I can read his actual working — **he has not taken this up yet, offer again.**

## Where we are now
| Area | Status |
|---|---|
| L01 Functions, limits, continuity | ✅ done |
| L02 Differentiation | ✅ done + 30+ exercises |
| L02 extrema vocabulary | ✅ re-taught 2026-09-26, with an interactive page |
| L03 Integration — note from slides | ✅ written |
| L03 live lecture notes | ⬜ still empty |
| L03 practice — FTC I/II, substitution | ✅ Ex 14, 17, 23, 29, 31, 35, 41, 47, 65 |
| L03 practice — area between curves | 🟡 one worked |
| L03 — integration by parts, trig integrals, improper integrals | ⬜ not started |
| **L04 Materi 1** 3D coords + distance | ✅ **lulus** (4.5/5) |
| **L04 Materi 2** spheres + completing the square | ✅ **lulus** (2.5/5, concepts fine, sign arithmetic fixed) |
| **L04 Materi 3** vectors, components, magnitude | ✅ **lulus** (6/6) |
| **L04 Materi 4** vector operations | ✅ **lulus** (6/6) |
| **L04 Materi 5** dot product | ⬜ **START HERE** |
| L04 Materi 6 projection | ⬜ |
| L04 Materi 7 cross product, area, determinants | ⬜ |
| L04 Materi 8 lines & planes, distances, angles | ⬜ |

**Last exercise worked:** Materi 4, Latihan 4.6 — midpoint of $A(1,0,2)$, $B(3,2,-1)$ via vectors → $M(2,1,\frac12)$ ✓

**Set for Ethan, still unanswered (older, from L02/L03):**
1. $f(x)=x^2-4x+1$ on $[0,5]$ — absolute max/min (set 2026-09-26). *Answer: max $f(5)=6$, min $f(2)=-3$ — do not reveal before his attempt.*
2. $\int_1^4\frac{x^2+x}{x^{3/2}}dx$ — split-then-Power-Rule (open since 2026-09-16). *Answer $\frac{20}3$.*
3. $\int_0^2x\sqrt{x^2+1}\,dx$ — substitution, cold re-test (set 2026-09-17). *Answer $\frac{5\sqrt5-1}3$, never revealed.*

## ▶️ Continue with
1. **Materi 5 — dot product (slides 8–9).** Three promises already made to him that must be paid:
   - *"Materi 5 will make the perpendicular test a one-liner"* (promised in the Ex 1.5 correction) → $\mathbf u\cdot\mathbf v=0$
   - It needs the **"vector = length AND direction"** correction from Ex 3.4 — the dot product is the tool that *measures direction*, and it will not make sense under "vector = distance".
   - The **type-check habit** from Ex 4.4 gets tested immediately: **the dot product returns a NUMBER, not an arrow.** That is the biggest trap in Materi 5.
2. Then Materi 6 (projection — warn about $\lvert v\rvert^2$ vs $\lvert v\rvert$), Materi 7 (cross product, the longest one — the $\mathbf j$ minus sign is the killer), Materi 8 (lines & planes).
3. Re-offer **KDE Connect** so he can send handwritten work.
4. The three old open problems above.
5. **Leftovers from L03:** integration by parts, trig integrals, improper integrals ($p$-test), more area between curves.
6. **Leftovers from L02:** related rates, optimization word problems, second-derivative test, concavity/inflection.
7. L03 live lecture notes are still an empty section in [[L03 Integration]].

## Watch out for (right now)
- **Negative coefficients.** The single consistent leak: when a linear coefficient is negative, his sign flip vanishes (minus times minus). Positive coefficients are always fine. Make him write the double negative on paper.
- **Measuring from the origin instead of from the given point** (the Ex 1.3 error). This will come back in Materi 8 (point on a line, point on a plane) — watch for it there.
- **Doing unasked extra work.** He expanded a sphere equation nobody asked him to expand and lost the constant. Tell him to stop at the form the question wants.
- **Type discipline.** Materi 5–7 produce a number (dot) and an arrow (cross). He now has the habit from Ex 4.4 — reinforce it, do not assume it holds under pressure.
- **Absolute value → two answers.** He now does this unprompted (Ex 4.5). Good; keep it.
- Still weak from earlier lectures: algebra simplification, trig minus signs, forgetting the inner derivative, skipping the domain, $+C$.

## What is going well (say this to him, he responds to it)
- **Sign arithmetic is fixed.** Materi 1: one sign error. Materi 2: three. Materi 3 and 4: **zero**.
- He **derives rules himself** ($a^2+b^2-c^2=0$ in Ex 1.5) but does not trust them — confirm them explicitly and he locks them in.
- He **reports impossible results instead of hiding them** (Ex 2.5, the negative radius). That was the real test in that exercise and he passed it.
- He **asks about notation when unsure** (Ex 3.6). Reward this every time; it is the cheapest error class to fix.
- Lessons **transfer between materi** without reminders (1.3 → 4.5; 3.6 → 4.4).

## Open questions from Ethan
- *(none open — he stopped to rest after Materi 4)*

## Tools built for this course
- 🔵 [Interactive unit circle](https://claude.ai/artifact/VL1xCLnf4rfz58ezkdLZeG) — drag the angle, read off $\cos\theta$, $\sin\theta$ (2026-09-16). Local copy: `html-visualization/unit-circle.html`.
- 🟢 `html-visualization/extrema-and-integral-checks.html` — peaks, valleys and the four integral checks (2026-09-26). Open it in a browser; needs internet for the rendered math.
- 💡 *Idea, not built yet:* an interactive 3D vector page for Materi 5–7 (drag two arrows, watch the dot product, the angle and the cross product update live). Would suit Materi 7 especially — the right-hand rule is hard to convey in text.
