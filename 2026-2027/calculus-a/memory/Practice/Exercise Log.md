---
title: Exercise Log
tags: [calculus-a, practice]
updated: 2026-09-26
---

# ✍️ Exercise Log

Back to [[00 Index]] · Errors: [[Common Mistakes]]

Source for entries before 2026-09-14 (afternoon): the two original handovers. Answers were re-checked when the notes were created.

## Lecture 2
### Limit definition
| Problem | Technique | Answer |
|---|---|---|
| $f=\frac1{x+2}$ via $\lim_{z\to x}$ | common denominator → factor $(z-x)$ | $-\frac1{(x+2)^2}$ |
| $f=x^2-3x+4$ via $\lim_{z\to x}$ | $z^2-x^2=(z-x)(z+x)$ | $2x-3$ |
| Ex 23: $p=\sqrt{3-t}$ | Chain Rule | $-\frac1{2\sqrt{3-t}}$ |

### Tangent lines
| Problem | Answer |
|---|---|
| $f=x^2+1$ at $(2,5)$ | $y=4x-3$ |
| $g=\frac{x}{x-2}$ at $(3,3)$ | slope $-2$, $y=-2x+9$ ⚠️ *handover wrongly listed $\frac16x+\frac53$* |
| $f=\sqrt{x+1}$ at $(8,3)$ | slope $\frac16$, $y=\frac16x+\frac53$ |

### Rules practice
| Problem | Rule(s) | Answer |
|---|---|---|
| $y=x^3e^x$ | Product | $x^2e^x(3+x)$ |
| $r=\frac{e^s}{s}$ | Quotient | $\frac{e^s(s-1)}{s^2}$ |
| $w=\frac{1+3z}{3z}(3-z)$ | simplify: $\frac1z+\frac83-z$ | $-\frac1{z^2}-1$ |
| $p=\frac{\sin q+\cos q}{\cos q}$ | simplify: $\tan q+1$ | $\sec^2q$ |
| $y=\frac{\cos x}{1+\sin x}$ | Quotient + $\sin^2+\cos^2=1$ | $-\frac1{1+\sin x}$ |
| $y=x^2\sin x+2x\cos x-2\sin x$ | Product, cancel | $x^2\cos x$ |
| $y=5\cos^{-4}x$ | Chain | $\frac{20\sin x}{\cos^5x}$ |
| Ex 36: $y=(1+2x)e^{-2x}$ | Product + Chain | $-4xe^{-2x}$ |
| Ex 62: $y=\cos(5\sin\frac t3)$ | double Chain | $-\frac53\sin(5\sin\frac t3)\cos\frac t3$ |
| Horizontal tangents $y=x+2\cos x$ on $[0,2\pi]$ | $y'=0$ | $(\frac\pi6,\frac\pi6+\sqrt3)$, $(\frac{5\pi}6,\frac{5\pi}6-\sqrt3)$ |

### Given values: $u(1)=2,\ u'(1)=0,\ v(1)=5,\ v'(1)=-1$
$(uv)'=-2$ · $(u/v)'=\frac2{25}$ · $(v/u)'=-\frac12$ · $(7v-2u)'=-7$

### Ex 88 (table values, table not saved)
a $=1$ · b $=6$ · c $=1$ · d $=-\frac19$ · e $=-\frac{40}3$ · f $=-\frac13$ · g $=-\frac49$
*Lesson: write the rule first, then substitute.*

### Implicit & inverse
| Problem | Answer |
|---|---|
| $x^2+y^2=25$ | $-\frac xy$ |
| Implicit Ex 7: $y^2=\frac{x-1}{x+1}$ | $\frac1{y(x+1)^2}$ |
| Implicit Ex 19: $\sin(r\theta)=\frac12$ | $\frac{dr}{d\theta}=-\frac r\theta$ |
| Inverse Ex 9: $f(2)=4$, $f'(2)=\frac13$, find $(f^{-1})'(4)$ | $3$ |

### Logs & inverse trig
| Problem | Answer |
|---|---|
| Ex 21: $y=t(\ln t)^2$ | $(\ln t)^2+2\ln t$ |
| $y=\frac{\ln x}{1+\ln x}$ | $\frac1{x(1+\ln x)^2}$ |
| Ex 34: $y=\tan^{-1}(\ln x)$ | $\frac1{x(1+(\ln x)^2)}$ |

### Extrema
| Problem | Result |
|---|---|
| Ex 39: $f=\frac1x+\ln x$ on $[0.5,4]$ | $f'=\frac{x-1}{x^2}$; min $f(1)=1$, max $f(4)\approx1.636$ |
| Ex 60: $y=\sqrt{3+2x-x^2}$ | domain $[-1,3]$; abs max $(1,2)$; abs min $(-1,0)$, $(3,0)$ |
| Ex 64: $y=e^x-e^{-x}$ | $y'>0$ always → no extrema |
| Ex 32: $g=4\sqrt x-x^2+3$ | incr $(0,1)$, decr $(1,\infty)$, local max $(1,6)$ |
| Ex 33: $g=x\sqrt{8-x^2}$ | domain $[-2\sqrt2,2\sqrt2]$; min $(-2,-4)$, max $(2,4)$ |

### L'Hôpital
| Problem | Answer |
|---|---|
| Ex 17: $\lim_{\theta\to\pi/2}\frac{2\theta-\pi}{2\cos(2\pi-\theta)}$ | $-1$ |
| Ex 48: $\lim_{x\to0}\frac{(e^x-1)^2}{x\sin x}$ | $1$ (twice) |

### Antiderivatives
| Problem | Answer |
|---|---|
| Ex 13a: $\int-\pi\sin\pi x\,dx$ | $\cos\pi x+C$ |
| Ex 13b: $\int3\sin x\,dx$ | $-3\cos x+C$ |
| Ex 13c: $\int(\sin\pi x-3\sin3x)dx$ | $-\frac1\pi\cos\pi x+\cos3x+C$ |
| Ex 25: $\int(x+1)dx$ | $\frac{x^2}2+x+C$ |

## Lecture 3 — Integration (2026-09-16)

### Definite integrals with FTC II
| # | Problem | Technique | Answer | Numeric check |
|---|---|---|---|---|
| Ex 17 | $\int_0^{\pi/8}\sin 2x\,dx$ | reverse Chain Rule: $\int\sin(ax)dx=-\frac1a\cos(ax)$ | $\frac{2-\sqrt2}{4}$ | $\approx0.1464$ ✅ |
| Ex 23 | $\int_1^{\sqrt2}\frac{s^2+\sqrt s}{s^2}\,ds$ | **split the fraction**, then Power Rule | $\sqrt2-2^{3/4}+1$ | $\approx0.732421$ ✅ |
| Ex 35 | $\int_0^1 xe^{x^2}dx$ | **substitution** $u=x^2$ (first one) | $\frac{e-1}{2}$ | $\approx0.8591409142$ ✅ |

**Ex 17, full run:** antiderivative $F(x)=-\frac12\cos 2x$. $F(\pi/8)-F(0)=-\frac12\cos\frac\pi4+\frac12\cos 0=-\frac{\sqrt2}{4}+\frac12=\frac{2-\sqrt2}{4}$.
Side quest: Ethan asked where $\cos 0$ and $\cos\frac\pi4$ come from → derived from the unit circle (cos = $x$-coordinate, sin = $y$-coordinate). Interactive tool built for it, see [[00 Index]].

**Ex 23, full run:**
1. Split: $\frac{s^2+\sqrt s}{s^2}=\frac{s^2}{s^2}+\frac{\sqrt s}{s^2}=1+s^{-3/2}$ (uses $\sqrt s=s^{1/2}$ and $\frac{s^m}{s^n}=s^{m-n}$).
2. Power Rule: $\int s^{-3/2}ds=\frac{s^{-1/2}}{-1/2}=-\frac{2}{\sqrt s}$, so $F(s)=s-\frac2{\sqrt s}$.
3. Check by differentiating: $F'(s)=1+s^{-3/2}$ ✅
4. FTC II: $F(\sqrt2)=\sqrt2-2^{3/4}$ (since $\sqrt{\sqrt2}=2^{1/4}$ and $2/2^{1/4}=2^{3/4}$), $F(1)=-1$ → $\sqrt2-2^{3/4}+1$.

> [!tip] The decision Ethan got wrong at first
> He assumed Ex 23 was Chain Rule. Ask **"is there something *inside* something?"**
> - Yes (e.g. $\cos 2x$, $(3x+1)^5$) → reverse Chain Rule
> - No, it's a fraction with a single power on the bottom → **split first**, then Power Rule

**Ex 35, full run — first substitution (2026-09-17):**
1. Inside $=x^2$ → $u=x^2$, $du=2x\,dx$, so $x\,dx=\frac12du$ (the $\frac12$ pays back the $2$ the Chain Rule would have produced).
2. Regroup and swap: $xe^{x^2}dx=e^{x^2}(x\,dx)=\frac12e^u\,du$ — every $x$ is gone ✅
3. Convert the limits: $x=0\to u=0$, $x=1\to u=1$. *They coincide only because $0^2=0$ and $1^2=1$ — not a rule.*
4. $\frac12\int_0^1e^u\,du=\frac12\big[e^u\big]_0^1=\frac12(e^1-e^0)=\frac{e-1}2$. Limits converted ⇒ never go back to $x$.
5. Check by differentiating $\frac12e^{x^2}$: Chain Rule → $\frac12e^{x^2}\cdot2x=xe^{x^2}$ ✅; numerically $\frac{e-1}2\approx0.8591409142$ vs Simpson $0.8591409142295228$ ✅

> [!warning] Why the Ex 17 "divide by $a$" trick fails here
> $\int e^{ax}dx=\frac1ae^{ax}$ requires a **linear** inside. Here the inside is $x^2$ (curved), so ÷$a$ is illegal — $\frac1{x^2}e^{x^2}$ is *not* an antiderivative.
> $e^{x^2}$ **on its own has no elementary antiderivative.** The lone $x$ out front is the entire reason this integral is doable: it supplies the inner derivative that substitution needs.

*Ethan asked for the worked solution rather than attempting the setup himself — worth re-testing this pattern cold next session.*

### FTC Part I — differentiating an integral (2026-09-17)
| # | Problem | Technique | Answer | Numeric check |
|---|---|---|---|---|
| Ex 47 | $y=\int_{\sqrt x}^{0}\sin(t^2)\,dt$, find $\frac{dy}{dx}$ | lower limit → **flip sign**, then FTC I + Chain Rule | $-\frac{\sin x}{2\sqrt x}$ | ✅ matches central-difference at $x=0.5,2,3.7$ to 10 dp |

**Ex 47, full run:**
1. The variable is in the **lower** limit, but FTC I needs it on top. Order rule $\int_b^a=-\int_a^b$ gives $y=-\int_0^{\sqrt x}\sin(t^2)\,dt$.
2. FTC I with Chain Rule: $\frac{d}{dx}\int_a^{g(x)}f(t)\,dt=f(g(x))\,g'(x)$, with $f(t)=\sin(t^2)$, $g(x)=\sqrt x$.
3. $f(g(x))=\sin\big((\sqrt x)^2\big)=\sin x$ — the square and the root cancel.
4. $g'(x)=\frac{d}{dx}x^{1/2}=\frac12x^{-1/2}=\frac1{2\sqrt x}$.
5. Reattach the minus: $\frac{dy}{dx}=-\frac{\sin x}{2\sqrt x}$. Domain $x>0$.

> [!important] The point of the whole exercise
> $\sin(t^2)$ has **no elementary antiderivative** — exactly like $e^{x^2}$ in Ex 35. This integral *cannot be evaluated*.
> FTC I still hands you its derivative without ever computing it. That is what the theorem buys you.
> Sanity check: at $x=3.7$, $\sin(3.7)<0$ so the answer is **positive** — sign behaves correctly.

**Set for Ethan (still not done, as of 2026-09-26):**
- $\int_1^4\frac{x^2+x}{x^{3/2}}dx$ — split-then-Power-Rule; answer $\frac{20}3\approx6.6666667$ (set 2026-09-16, **revealed only in the HTML page behind a click**)
- $\int_0^2 x\sqrt{x^2+1}\,dx$ — substitution, cold re-test, limits genuinely change; answer $\frac{5\sqrt5-1}3\approx3.3934466292$ (set 2026-09-17, **not revealed**)
- Absolute max/min of $f(x)=x^2-4x+1$ on $[0,5]$ — answer max $f(5)=6$, min $f(2)=-3$ (set 2026-09-26, **not revealed**)

### Substitution — indefinite (2026-09-19 → 2026-09-21)
| # | Problem | Substitution | Answer | Check |
|---|---|---|---|---|
| Ex 14 | $\int \frac{\cos^2(1/x)}{x^2}dx$ | power-reduction $\cos^2\theta=\frac{1+\cos2\theta}{2}$, then $u=\frac2x$ | $-\frac1{2x}-\frac{\sin(2/x)}4+C$ | ✅ central difference at $x=0.4,0.9,1.7,3.3,-1.2$; Simpson on $[1,2]$ matches $F(2)-F(1)=0.2669566105$ |
| Ex 17 | $\int\sqrt{3-2s}\,ds$ | $u=3-2s$, $du=-2\,ds$ | $-\frac13(3-2s)^{3/2}+C$ | ✅ derivative check; Simpson on $[0,1]$ = $1.398717474$ |
| Ex 29 | $\int\sqrt{x}\,\sin\!\big(x^{3/2}+1\big)dx$ | $u=x^{3/2}+1$, $du=\frac32\sqrt x\,dx$ | $-\frac23\cos\!\big(x^{3/2}+1\big)+C$ | ✅ Simpson on $[0,2]$ and $[1,3]$ match to 8–10 dp |
| Ex 65 | $\int\frac{dy}{(\arctan y)(1+y^2)}$ | $u=\arctan y$, $du=\frac{dy}{1+y^2}$ | $\ln\lvert\arctan y\rvert+C$ | ✅ Simpson on $[1,3]$ and $[-4,-1]$ match to machine precision |

> [!tip] The pattern worth memorising (Ex 65)
> **Derivative on top, the thing itself on the bottom → $\ln\lvert\text{thing}\rvert$.** Spotting the pair is the whole exercise; the integration is one line.

> [!warning] Ex 14 — the coefficient is not decoration
> We lost time arguing whether the printed factor was $\frac1x$ or $\frac1{x^2}$. The rule that settles it: **the extra factor in the integrand has to be exactly $du$**, otherwise the substitution leaves an $x$ behind and dies. With $u=\frac2x$, $du=-\frac2{x^2}dx$ — so the $\frac1{x^2}$ is the version that works.

### Substitution — definite, with converted limits (2026-09-21)
| # | Problem | Technique | Answer | Check |
|---|---|---|---|---|
| Ex 31 | $\int_2^4\frac{dx}{x(\ln x)^2}$ | $u=\ln x$, limits $\ln2\to\ln4$ (Theorem 7) | $\frac1{\ln2}-\frac1{\ln4}=\frac1{2\ln2}\approx0.7213475204$ | ✅ Simpson $n=20000$ matches to 15 dp |
| Ex 41 | $\int_0^1\frac{4}{\sqrt{4-s^2}}ds$ | standard form $\int\frac{ds}{\sqrt{a^2-s^2}}=\arcsin\frac sa$, $a=2$ | $4\arcsin\frac12=\frac{2\pi}3\approx2.0943951024$ | ✅ four independent methods agree to 13 dp |

> [!warning] The two traps we priced out
> **Ex 31:** keeping the old $x$-limits after substituting gives $0.25$ instead of $0.721$; reading $\ln(x^2)$ instead of $(\ln x)^2$ gives $0.3466$.
> **Ex 41:** writing $4\arcsin s$ instead of $4\arcsin\frac s2$ gives $2\pi\approx6.283$; dropping the leading 4 gives $\frac\pi6\approx0.524$.

### Area between curves (2026-09-24)
| Problem | Technique | Answer | Check |
|---|---|---|---|
| Total shaded area between $y=2x^2$ and $y=x^4-2x^2$ | intersections $x^4-4x^2=0\Rightarrow x=0,\pm2$; top − bottom; even symmetry | $\int_{-2}^{2}(4x^2-x^4)dx=\frac{128}{15}\approx8.5333333$ | ✅ Simpson $n=2\,000\,000$ = $8.5333333333$ |

**Structure:** two symmetric lobes across $x=0$, each worth $\frac{64}{15}\approx4.2667$.
**Wrong routes, priced:** treating $\lvert x^4-2x^2\rvert$ as the area gives $5.150$; subtracting that from the parabola's area gives $5.516$. Neither is $8.533$.

### Extrema vocabulary — refresher (2026-09-26)
| Problem | Technique | Answer | Check |
|---|---|---|---|
| Absolute max/min of $f(x)=x^3-3x$ on $[-1.5,3]$ | $f'=3(x-1)(x+1)$; candidates $=$ critical points **plus both endpoints** | max $f(3)=18$ (endpoint), min $f(1)=-2$ | ✅ 700 001-point scan finds the same two |

**Full candidate table:** $f(-1.5)=1.125$, $f(-1)=2$ (local max), $f(1)=-2$ (local min), $f(3)=18$.
**The lesson:** the only real hilltop, $x=-1$, is *not* the absolute max. It loses 2 against 18 because the interval lets the curve keep climbing. Local champion ≠ global champion.

**Also covered:** the First Derivative Test ($+\to-$ max, $-\to+$ min, no flip → neither, e.g. $x^3$ at $0$), the Extreme Value Theorem, and the four ways to check an integral — differentiate back (the king), eyeball the area, squeeze between $m(b-a)$ and $M(b-a)$, and sign sanity. All of it is now an interactive page: `html-visualization/extrema-and-integral-checks.html`.

## Lecture 4 — Vectors and 3D geometry
*No exercises yet.* See [[L04 Vectors and 3D Geometry]].
