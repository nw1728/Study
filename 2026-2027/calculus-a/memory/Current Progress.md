---
title: Current Progress
tags: [calculus-a, progress]
updated: 2026-10-07
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

> [!important] Format Ethan asked for on 2026-10-06 — **keep using it**
> **Per materi, one at a time, with exercises at every materi, and mixed Bahasa Indonesia.**
> The loop that works: **1 materi → explain → 5–6 exercises → he answers → correct each one → next materi.** Do not dump several materi at once, and do not continue past the exercises in the same message.
> Indonesian is not decoration — he engages visibly more with it. Use *panah, panjang, arah, sejajar, tegak lurus, titik, bidang, garis, jarak, pusat, utang, selisih, pembilang, penyebut, turunan*.
> Confirmed again on 2026-10-07: Materi 5 ran on this format and passed.

> [!tip] Syncing is now one command
> `gsync` commits every repo in its config with an AI-written message, rebases onto upstream and pushes. Run it at the end of a session instead of hand-writing commits — **only when Ethan asks.** `gsync -n` shows what it would do without touching anything.

## Last session
- **Date:** 2026-10-07
- **Type:** L04 **Materi 5 — dot product** (slides 8–9) taught and passed, then **Materi 6 — projection** taught; Ethan asked for a visualizer mid-materi and one was built
- **What happened:**
  - **Materi 5 taught and passed: 6 right, 1 half, 1 trap** (8 answer-parts). Full teaching text in [[L04 Walkthrough (Gogo Gaga)]], answers in [[Exercise Log]], new error patterns in [[Common Mistakes]].
  - **All three promises from the previous handover were paid:** the one-line perpendicular test $\mathbf u\cdot\mathbf v=0$, the "vector = length AND direction" framing (dot product = the tool that *measures direction*), and the type trap (**two arrows in, one NUMBER out**).
  - Derived $\cos\theta=\frac{\mathbf u\cdot\mathbf v}{\lvert\mathbf u\rvert\lvert\mathbf v\rvert}$ in full from the **law of cosines + $\mathbf u\cdot\mathbf u=\lvert\mathbf u\rvert^2$**, and verified the key step numerically (both sides $15.380$). The push-a-box analogy ($W=\mathbf F\cdot\mathbf d$) carried it.
  - **Ex 5.2 (half):** perfect to $k^2=4$, then only $k=2$ came back. $k=-2$ is equally valid (priced: it also gives exactly $90^\circ$).
  - **Ex 5.4 (the trap):** he said all five expressions were meaningful; only three are. **But he asked the question that explains it** — *"apakah `*` dan `.` itu sama?"* — so the root cause was notation doubt, not carelessness.
  - **Ex 5.6b was the high point:** he derived $\mathbf u\cdot\mathbf u=\lvert\mathbf u\rvert^2$ himself from the arithmetic **and trusted it** (the behaviour missing back in Ex 1.5).
  - He asked to **save** after the corrections, then asked to continue, so **Materi 6 (projection) was taught in full** — including the derivation from "parallel to $\mathbf v$" + "remainder perpendicular to $\mathbf v$", the $\lvert\mathbf v\rvert^2$-is-two-$\lvert\mathbf v\rvert$s explanation, and three worked examples. **Latihan 6.1–6.6 were set and are still unanswered.**
  - **He then said he did not understand the shadow idea and asked for an HTML visualizer** — so one was built and published (see Tools below). **This is the first time he has asked for a tool himself**; previous ones were offered. Worth noting: when a geometric idea does not land in text, he will now ask for a picture rather than go quiet.
  - **KDE Connect re-offered, still not taken up.** He can only send **final answers** (handwriting lives in Samsung Notes on his tab). Reverse-engineering from numbers keeps working, so it is not blocking.

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
| **L04 Materi 5** dot product, angles, orthogonality | ✅ **lulus** (6.5/8) |
| **L04 Materi 6** projection | 🟡 **taught 2026-10-07 + visualizer built; Latihan 6.1–6.6 AWAITING HIS ANSWERS** |
| L04 Materi 7 cross product, area, determinants | ⬜ |
| L04 Materi 8 lines & planes, distances, angles | ⬜ |

**Open exercise set, awaiting his answers:** Materi 6, **Latihan 6.1–6.6** — (6.1) proj of $\langle4,1,-2\rangle$ on $\langle2,-1,2\rangle$; (6.2) scalar component of $\langle1,2,2\rangle$ on $\langle-2,-2,-1\rangle$ + direction; (6.3) $\langle5,0,0\rangle$ on $\langle3,4,0\rangle$ + the "can a shadow beat the pole?" check; (6.4) is $\text{proj}_{\mathbf v}\mathbf u=\text{proj}_{\mathbf u}\mathbf v$?; (6.5) type check, 4 expressions; (6.6) the perpendicular and parallel edge cases. **Answers are in `html-visualization/vector-projection.html` only as live computation — do not hand them over before his attempt.**

**Last exercise marked:** Materi 5, Latihan 5.6 — $\mathbf u=\langle2,-3,6\rangle$ → $\mathbf u\cdot\mathbf u=49$, so $\lvert\mathbf u\rvert=7$ without touching the magnitude formula ✓

**Set for Ethan, still unanswered (older, from L02/L03):**
1. $f(x)=x^2-4x+1$ on $[0,5]$ — absolute max/min (set 2026-09-26). *Answer: max $f(5)=6$, min $f(2)=-3$ — do not reveal before his attempt.*
2. $\int_1^4\frac{x^2+x}{x^{3/2}}dx$ — split-then-Power-Rule (open since 2026-09-16). *Answer $\frac{20}3$.*
3. $\int_0^2x\sqrt{x^2+1}\,dx$ — substitution, cold re-test (set 2026-09-17). *Answer $\frac{5\sqrt5-1}3$, never revealed.*

## ▶️ Continue with
1. **Mark Latihan 6.1–6.6** when Ethan sends them (all verified numerically already; see [[Exercise Log]] for the key). Watch specifically for: the $\lvert\mathbf v\rvert$ vs $\lvert\mathbf v\rvert^2$ swap in 6.1/6.3, a missing sign in 6.2, and whether the type habit from 5.4 finally holds in 6.5.
2. **Materi 7 — cross product (slides 11–17), the longest one.** The $\mathbf j$ minus sign is the killer; make him write the zero $\mathbf j$ component explicitly. Then Materi 8 (lines & planes) — **re-test the $\pm$ habit there**.
3. *(reference, already delivered)* **Materi 6 — vector projection (slide 10).** Short: one slide, one main formula. Plan already written at the end of [[L04 Walkthrough (Gogo Gaga)]]:
   $$\text{proj}_{\mathbf v}\mathbf u=\frac{\mathbf u\cdot\mathbf v}{\lvert\mathbf v\rvert^2}\mathbf v\qquad\text{scalar component}=\frac{\mathbf u\cdot\mathbf v}{\lvert\mathbf v\rvert}$$
   - **Open by cashing in his own Ex 5.6b discovery:** $\lvert\mathbf v\rvert^2=\mathbf v\cdot\mathbf v$, so the projection formula has **no square roots at all**. He found that property himself — start there so the formula feels like his.
   - **Flag the main trap up front:** $\lvert\mathbf v\rvert^2$ in the *vector* formula vs $\lvert\mathbf v\rvert$ in the *scalar* one. Mnemonic given in the plan: *"arrow answer needs the squared denominator, number answer needs the plain one."*
   - **Make the type check explicit** — projection returns an **ARROW**, scalar component returns a **NUMBER**. After Ex 5.4 this cannot be left implicit.
   - Slide 10's worked example is ready: $\mathbf u=6\mathbf i+3\mathbf j+2\mathbf k$ onto $\mathbf v=\mathbf i-2\mathbf j-2\mathbf k$ → $-\frac49\mathbf i+\frac89\mathbf j+\frac89\mathbf k$, scalar component $-\frac43$ (negative → obtuse).
4. Re-offer **KDE Connect** so he can send handwritten working.
5. The three old open problems above.
6. **Leftovers from L03:** integration by parts, trig integrals, improper integrals ($p$-test), more area between curves.
7. **Leftovers from L02:** related rates, optimization word problems, second-derivative test, concavity/inflection.
8. L03 live lecture notes are still an empty section in [[L03 Integration]].

## Watch out for (right now)
- **The negative solution evaporating.** This is *the* live leak, and its shape changed on 2026-10-07 — which is progress. His **sign arithmetic is fixed** (Ex 5.1 had two minus-times-minus, both right; Materi 3, 4 and 5 all at zero sign errors). What leaks now is **completeness**: he stops at one root when there are two ($k^2=4\to$ only $k=2$).
  - He **owns** the rule (Ex 1.3, Ex 4.5, both unprompted) but has it bound to the wrong trigger: *"there are $\lvert\cdot\rvert$ bars"* instead of *"a square is being opened"*. Same rule, since $\sqrt{k^2}=\lvert k\rvert$.
  - **Drill:** every time $(\cdot)^2=\text{number}$ appears, write $\pm$ **first**, then look for a reason to discard the negative. **Re-test this in Materi 8** (point-to-plane distance carries an absolute value).
- **Type discipline is NOT yet automatic.** Ex 5.4 showed it fails under a notation he is unsure about. Materi 6 produces an arrow *and* a number from near-identical formulas, and Materi 7 produces an arrow where Materi 5 produced a number — state the type out loud at every step.
- **Notation ambiguity is a real blocker for him, not an excuse.** The textbook uses the **same dot** for scalar multiplication and the dot product. He needs the operand rule repeated: *the symbol does not tell you the operation, the operands do.* Same for $\lvert\cdot\rvert$ (magnitude vs absolute value).
- **Measuring from the origin instead of from the given point** (the Ex 1.3 error) — still due to come back in Materi 8 (point on a line, point on a plane).
- **Doing unasked extra work** (he expanded a sphere equation nobody asked him to expand and lost the constant). Tell him to stop at the form the question wants.
- **Stating the conclusion the question asked for.** Ex 5.5: he wrote $\cos120^\circ=-\frac12$ when the question asked for $\theta$. Right reasoning, incomplete answer — costs marks in an exam.
- Still weak from earlier lectures: algebra simplification, trig minus signs, forgetting the inner derivative, skipping the domain, $+C$.

## What is going well (say this to him, he responds to it)
- **Sign arithmetic is fixed.** Materi 1: one sign error. Materi 2: three. Materi 3, 4, **and 5: zero.**
- **He derives rules himself AND is starting to trust them.** Ex 1.5 he derived the right-angle test but would not believe it; Ex 5.6b he derived $\mathbf u\cdot\mathbf u=\lvert\mathbf u\rvert^2$ and **stated it as fact**. That is an attitude change, not just a skill gain.
- **He uses the shortcut he was taught instead of the long route.** Ex 5.1b: answered "obtuse" from the sign alone and never touched the ugly magnitudes ($5.3852$, $5.9161$).
- **He keeps surds unevaluated** until the end (Ex 5.3), so $\sqrt2\cdot\sqrt2$ collapses cleanly to $2$ and the answer comes out exact.
- **He asks about notation when unsure** (Ex 3.6, Ex 5.4). Reward this every single time — it is the cheapest error class to fix, and in Ex 5.4 his question diagnosed his own mistake.
- He **reports impossible results instead of hiding them** (Ex 2.5, the negative radius).
- Lessons **transfer between materi** without reminders (1.3 → 4.5; 3.6 → 4.4).

## Open questions from Ethan
- *(none open — the `*` vs `.` question was answered in full on 2026-10-07; the operand rule is recorded in [[Common Mistakes]] and in [[L04 Walkthrough (Gogo Gaga)]])*

## Tools built for this course
- 🔵 [Interactive unit circle](https://claude.ai/artifact/VL1xCLnf4rfz58ezkdLZeG) — drag the angle, read off $\cos\theta$, $\sin\theta$ (2026-09-16). Local copy: `html-visualization/unit-circle.html`. **He used it twice on 2026-10-07** to recognise $\frac1{\sqrt2}\to45^\circ$ and $-\frac12\to120^\circ$ — it is paying off.
- 🟢 `html-visualization/extrema-and-integral-checks.html` — peaks, valleys and the four integral checks (2026-09-26). Open it in a browser; needs internet for the rendered math.
- 🟣 [Bayangan Vektor](https://claude.ai/artifact/Ff6iJ5L3aBUcUx4PXTukF6) — **built 2026-10-07, on Ethan's request**, because he said he did not understand the shadow idea. Drag the tips of $\mathbf u$ and $\mathbf v$; everything updates live: $\mathbf u\cdot\mathbf v$, $\mathbf v\cdot\mathbf v$, $c$, the projection arrow, its length, the scalar component, $\theta$ and the angle type. Local copy: `html-visualization/vector-projection.html`. Three deliberate teaching devices:
  - **`sisa · v` shown live and never leaving zero** no matter how he drags — that is step 2 of the derivation happening in front of him.
  - A **"rumus salah" ghost arrow** using $\lvert\mathbf v\rvert$ instead of $\lvert\mathbf v\rvert^2$, which visibly becomes longer than $\mathbf u$ itself — a shadow longer than the pole.
  - A **3D tab** that shows the computation step by step and draws the picture *in the plane spanned by $\mathbf u$ and $\mathbf v$*, to make "3D is the same picture, just tilted" literal.
  - **Latihan 6.1–6.6 are deliberately NOT presets** (same policy as the 2026-09-26 tool). The 2D tab instead has three *challenges* that make him discover the perpendicular and parallel cases by dragging, so Ex 6.6 stays his to answer.
- 💡 *Idea, not built yet:* an interactive page for **Materi 7** — two arrows plus the cross product vector, the right-hand rule and the parallelogram area. The right-hand rule is the hardest thing in Lecture 4 to convey in text.
