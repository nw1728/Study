---
title: Session Log
tags: [calculus-a, sessions]
updated: 2026-10-06
---

# 🗓️ Session Log

Back to [[00 Index]] · Newest first

## 2026-10-06 — Lecture 4 taught per materi, in Bahasa Indonesia (Claude Code)
- **Format change, mid-session, at Ethan's request.** He first asked for all 24 slides of Lecture 4 explained one by one. I started and got through slides 1–22, then he interrupted: *"bisa ga per materi, satu-satu, dan ada latihan di tiap materi, dan dicampur bahasa Indonesia?"* Switched immediately. **This is now the standing format** — recorded in [[Current Progress]] and [[Teaching Playbook]].
- Split Lecture 4 into **8 materi**; full teaching walkthrough written to [[L04 Walkthrough (Gogo Gaga)]]. **Materi 1–4 done, all passed.** 22 exercises, all in [[Exercise Log]].
- **Materi 1 — 3D coords + distance.** Framing that landed: *"3D itu bukan 2D yang lebih susah, 3D itu 2D PLUS SATU ANGKA."* Derived the distance formula as **Pythagoras twice** (floor diagonal, then height) and showed why the first square root gets eaten. Right-hand rule done physically with his own hand.
  - **Ex 1.3 was the teaching moment:** $S(1,1,1)$ to $T(1,1,k)$ with distance 5. He answered $k=6$ or $-6$; the truth is $k=6$ or $k=-4$, because the distance is $\lvert k-1\rvert$, not $\lvert k\rvert$. **He measured from the origin instead of from $S$.** Priced it — $k=-6$ gives distance $7$.
  - **Ex 1.5:** he derived the right-angle test himself ($a^2+b^2-c^2=0$) but said he could not prove it. Confirmed his rule is exactly right and added the missing condition: **$c$ must be the longest side** (counter-demo with $c=4$ giving $18\neq0$).
- **Materi 2 — spheres + completing the square.** Three of five exercises leaked, and all three leaks had **one cause**: when a linear coefficient is **negative**, his sign flip disappears (it forces a minus times minus, his oldest weak spot). Positive coefficients were always fine — that contrast is what made the diagnosis clean.
  - Replaced the error-prone route with a **one-line formula**: $x_0=-\frac{\text{coef}}2$, $\text{debt}=x_0^2$, $a^2=-(\text{const})+\sum\text{debt}$. Verified against all three worked spheres including the fractional slide-4 one.
  - **Ex 2.1 lesson was not arithmetic:** his linear terms were all correct; he lost the constant only because he **expanded an equation nobody asked him to expand**. Told him standard form is the complete, lower-risk answer.
  - **Ex 2.5 was a deliberate trap** ($a^2=-4$, no sphere exists). His number was off ($-6$, from paying a debt of $\frac b2$ instead of $(\frac b2)^2$) **but he reported the impossible negative radius instead of quietly fixing it to look normal — which was the actual test, and he passed.** Taught the trichotomy: $a^2>0$ sphere, $a^2=0$ a single point, $a^2<0$ nothing at all.
- **Materi 3 — vectors. 6/6, zero sign errors** (including $3-(-1)=4$, the minus-minus that cost him twice an hour earlier). Core framing: *"titik itu TEMPAT, vektor itu PERJALANAN"*, and the free-vector idea.
  - **Ex 3.4 wording fix:** he justified two vectors being equal with *"vektor itu jaraknya, terlepas dari letaknya"*. Second half right, first half dangerous. Priced it: $\langle3,4,0\rangle$, $\langle5,0,0\rangle$, $\langle0,0,-5\rangle$ all have length 5 but are three different vectors. Fixed to **"equal iff every component matches"**. Flagged why it matters: Materi 5 asks him to distinguish arrows of equal length and different direction.
  - **Ex 3.6 — he asked about notation himself** (*"$\lvert w\rvert10$, bener ga sih simbolnya gitu?"*). It is wrong: $\lvert w\rvert$ is already a number. Gave the type rule — **before writing $=$, check both sides are the same type** — and the elegant answer $2\mathbf w$, since the stretch factor is $\frac{10}{\lvert w\rvert}=2$.
- **Materi 4 — vector operations. 6/6.** The easy materi, used mainly to install the **parallel idea** $\mathbf u=k\mathbf v$ (needed for slides 14 and 22) and to drill the type-check habit via Ex 4.4, which he got all four of, reasoning explicitly by type. **Ex 4.5 showed transfer** — he produced both $c=4$ and $c=-4$ unprompted, carrying the Ex 1.3 absolute-value lesson across three materi. Only gap: Ex 4.3 asked same-or-opposite direction and he answered only the $k$; added that $k<0$ means **opposite** direction, and that $\mathbf u\times\mathbf v=\mathbf0$ will not distinguish $0^\circ$ from $180^\circ$ either.
- **Constraint discovered:** Ethan can only send **final answers**. His working is handwritten in Samsung Notes on his tab and he has no transfer path to the laptop. Reverse-engineering his errors from the numbers alone worked well (the Materi 2 diagnosis came entirely from that), so it is not blocking. **Offered to set up KDE Connect** on the Arch laptop so he can send photos — he has not taken it up, re-offer next session.
- He stopped after Materi 4 to rest and asked for everything to be saved. **Next session starts at Materi 5 (dot product)**, where three promises are already outstanding — see [[Current Progress]].

## 2026-09-26 — Extrema vocabulary + integral checking, then an interactive page (Claude Code)
- **Part 1 — the vocabulary tangle.** Sorted out critical point vs local vs absolute max/min using a hiking analogy ($f'$ = steepness, not height; a critical point is a *suspect*, not a verdict). Covered the Extreme Value Theorem and the First Derivative Test.
- Worked $f(x)=x^3-3x$ on $[-1.5,3]$ in full: candidates $-1.5,-1,1,3$ → **abs max $18$ at the endpoint $x=3$**, abs min $-2$ at $x=1$. Verified with a 700 001-point scan. The punchline: the only real hilltop ($x=-1$, height 2) loses to an endpoint.
- **Part 2 — checking integrals.** Four methods: differentiate back (the king), eyeball the area, squeeze between $m(b-a)$ and $M(b-a)$, sign sanity.
- **Built `html-visualization/extrema-and-integral-checks.html`** — interactive: drag a point along the curve to feel the tangent slope, drag the endpoints and watch the absolute max jump between a hilltop and an endpoint, live sign chart and candidate table; plus an integral tool with Riemann slices, squeeze bounds and a "slope of $F$ drawn on top of $f$" check, running on Ex 35, Ex 17, Ex 31 and Ex 41. All worked examples from our own sessions, gogo gaga register, real rendered math (KaTeX).
- **Backfilled the notes** for 09-17 → 09-26, which had been left behind by five sessions.
- Set for Ethan: $f(x)=x^2-4x+1$ on $[0,5]$ (kept deliberately out of the interactive tool so the graph doesn't spoil it).

## 2026-09-24 — Area between curves (Claude Code)
- Total shaded area between $y=2x^2$ and $y=x^4-2x^2$. Intersections from $x^4-4x^2=0$ → $x=0,\pm2$; parabola on top across $[-2,2]$.
- $\int_{-2}^{2}(4x^2-x^4)dx=\frac{128}{15}\approx8.5333$, two symmetric lobes of $\frac{64}{15}$ each. Simpson with 2 000 000 panels agrees to 10 dp.
- Priced the wrong routes so the gap is visible: $\lvert x^4-2x^2\rvert$ as area → $5.150$; parabola minus that → $5.516$.

## 2026-09-21 — Substitution drill, four exercises (Claude Code)
- **Ex 29** $\int\sqrt x\sin(x^{3/2}+1)dx=-\frac23\cos(x^{3/2}+1)+C$ — first substitution with a fractional-power inside.
- **Ex 65** $\int\frac{dy}{(\arctan y)(1+y^2)}=\ln\lvert\arctan y\rvert+C$ — taught the **"derivative on top, thing on the bottom → $\ln\lvert\text{thing}\rvert$"** pattern.
- **Ex 31** $\int_2^4\frac{dx}{x(\ln x)^2}=\frac1{2\ln2}\approx0.7213$ — Theorem 7, definite substitution with converted limits.
- **Ex 41** $\int_0^1\frac{4\,ds}{\sqrt{4-s^2}}=\frac{2\pi}3\approx2.0944$ — recognising the arcsin standard form, $a=2$.
- Every answer verified numerically, and each seductive wrong variant computed next to it.
- Lecture 4 slides (vectors, 3D geometry) were added to the repo this day; notes written from the slides, no practice yet.

## 2026-09-19 — More substitution + FTC I (Claude Code)
- **FTC I with an outer power:** $y=\left[\int_0^x(t^3+1)^{10}dt\right]^3$ → $\frac{dy}{dx}=3\big[I(x)\big]^2(x^3+1)^{10}$; verified numerically at four points.
- **Ex 14** $\int\frac{\cos^2(1/x)}{x^2}dx=-\frac1{2x}-\frac{\sin(2/x)}4+C$ — needed the power-reduction identity first. Long detour on whether the printed factor was $\frac1x$ or $\frac1{x^2}$; resolved with the rule **"the extra factor must be exactly $du$"**.
- **Ex 17** $\int\sqrt{3-2s}\,ds=-\frac13(3-2s)^{3/2}+C$ — linear inside, so the ÷$a$ shortcut is legal here; the two minus signs cancelling is the step that goes wrong when rushed.

## 2026-09-17 — First substitution + FTC Part I (Claude Code)
- **Ex 35** $\int_0^1xe^{x^2}dx=\frac{e-1}2\approx0.8591409142$ — the introduction to substitution. Key warning recorded: the ÷$a$ shortcut needs a **linear** inside, and $e^{x^2}$ alone has no elementary antiderivative, so the lone $x$ out front is what makes the problem possible at all.
- **Ex 47** $y=\int_{\sqrt x}^{0}\sin(t^2)dt$ → $\frac{dy}{dx}=-\frac{\sin x}{2\sqrt x}$ — variable in the **lower** limit, so flip with $\int_b^a=-\int_a^b$ first, then FTC I + Chain Rule.
- Ethan asked for the worked solution instead of attempting the scaffolded setup — flagged then for a cold re-test, still open.

## 2026-09-16 — First Lecture 3 practice: FTC II (Claude Code)
- **Ex 17** $\int_0^{\pi/8}\sin2x\,dx=\frac{2-\sqrt2}{4}\approx0.1464$. Started with hints; Ethan got stuck, so switched to direct instruction on the reverse Chain Rule for $\sin(ax)$.
- Long detour on **where $\cos0$ and $\cos\frac\pi4$ come from** — derived the unit circle from scratch (cos = $x$-coordinate, sin = $y$-coordinate) instead of memorising a table. Built an interactive unit-circle tool: https://claude.ai/artifact/VL1xCLnf4rfz58ezkdLZeG
- **Ex 23** $\int_1^{\sqrt2}\frac{s^2+\sqrt s}{s^2}ds=\sqrt2-2^{3/4}+1\approx0.732421$ (verified numerically). Ethan assumed Chain Rule; the real technique is **splitting the fraction** then the Power Rule. Added the *"is there something inside something?"* test to [[Teaching Playbook]] and [[Integration Rules]].
- **Format lesson:** Ethan reads the chat in a terminal, so LaTeX does not render and he could not read the explanation. Rewrote it in plain text. Recorded in [[Student Profile]] and [[Teaching Playbook]] — **no `$...$` in chat from now on**.
- Lecture 3 live notes are still empty; the practice happened without them.

## 2026-09-14 — Setup + Lecture 3 (Claude Code)
- Read both handovers and all three slide decks.
- Built this Obsidian memory: index, profile, playbook, lecture notes L01–L03, reference sheets, exercise log, mistakes.
- Re-checked all handover answers. Found one mix-up: tangent for $\frac{x}{x-2}$ at $(3,3)$ is $y=-2x+9$.
- Lecture 3 (Integration) today → live notes go in [[L03 Integration#📝 Live lecture notes — 2026-09-14]].
- Added `calculus-a/CLAUDE.md`, a cross-device handover that Claude Code loads automatically, for the second laptop. It includes the start/end-of-session routine and the PDF extraction script.

## 2026-09-14 — Lecture 2 exercises (previous tutor, web chat)
- 30+ exercises: multi-layer Chain Rule, implicit differentiation, Ex 88 table, logs/inverse trig, extrema, L'Hôpital, first antiderivatives.
- Fixed: "multiply masuk", critical points of fractions, $\frac{dr}{d\theta}$ vs $\frac{d\theta}{d\theta}$, fractional exponents, L'Hôpital vs Quotient Rule.
- Full record: [[Ethan_Calculus_A_Continuation_Sept2026]]

## 2026-09-09 — Lecture 2 theory (previous tutor, web chat)
- All differentiation rules, tangent lines, horizontal tangents, implicit, inverse, L'Hôpital, antiderivative basics.
- Full record: [[Ethan_Calculus_A_Handover_Sept2026]]
