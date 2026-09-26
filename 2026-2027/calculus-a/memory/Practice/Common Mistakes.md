---
title: Common Mistakes
tags: [calculus-a, practice, mistakes]
updated: 2026-09-26
---

# ⚠️ Common Mistakes

Back to [[00 Index]] · See [[Student Profile]], [[Verification Methods]]

Ethan's own errors from past sessions, each with its fix. Add new ones as they happen.

## Algebra
| Mistake | Fix |
|---|---|
| Dropping the constant in point-slope: $y-3=-2(x-3)\to y=-2x+6$ | Expand fully, then move the constant: $y=-2x+9$ |
| Cancelling a factor that isn't in **every** term, e.g. $\frac{3z(3-z)+(3-z)}{3z}$ | Split the fraction term by term first |
| Isolating $x$ from $x^{3/2}=1$ | Raise both sides to the reciprocal power $2/3$ |
| Leaving double negatives: $-20\cos^{-5}x\cdot(-\sin x)$ | Always simplify the sign at the end |

## Derivatives
| Mistake | Fix |
|---|---|
| $(\cos x)'=\sin x$ | $(\cos x)'=-\sin x$ — "co" functions get a minus |
| Forgetting the inner derivative: $((x^2+1)^3)'=3(x^2+1)^2$ | ×$2x$ — Chain Rule |
| $(e^{-2x})'=e^{-2x}$ | $-2e^{-2x}$ |
| "Multiply masuk" — differentiating again after the Chain Rule | Chain Rule × is ordinary multiplication; then **stop** |
| Treating $x\cos x$ as if only one part changes | Product Rule: $\cos x-x\sin x$ |
| Implicit: $\frac{d}{dx}y^2=2y$ | $2y\frac{dy}{dx}$ |
| Confusing $\frac{dr}{d\theta}$ (unknown) with $\frac{d\theta}{d\theta}$ ($=1$) | Variable w.r.t. itself $=1$; anything else, write the derivative |
| Quotient Rule inside L'Hôpital | L'Hôpital: differentiate top and bottom **separately** |
| Critical points of $\frac{N}{D}$ | $N=0$ where $D\neq0$; also check where $D=0$ inside the domain |
| Skipping the domain with roots/logs | Find the domain **first** |
| Plug-and-play with table values | Write the rule symbolically first, then substitute |

## Integrals (watch in L03)
| Likely mistake | Fix |
|---|---|
| **Reaching for the Chain Rule on a fraction** (Ex 23, 2026-09-16) | Ask *"is there something **inside** something?"* No inner function → split the fraction and use the Power Rule |
| Dividing by a fractional exponent: $\frac{s^{-1/2}}{-1/2}$ read as $-\frac12 s^{-1/2}$ | Dividing by $-\frac12$ = **multiplying by $-2$** → $-2s^{-1/2}$ |
| Leaving $\sqrt{\sqrt2}$ or $\frac{2}{2^{1/4}}$ unsimplified | Convert roots to powers: $\sqrt{\sqrt2}=2^{1/4}$, $\frac{2}{2^{1/4}}=2^{3/4}$ |
| Forgetting $+C$ | Indefinite always gets $+C$; definite never |
| $\int\sin x=\cos x$ | $-\cos x$ (the sign flips the opposite way from derivatives) |
| $\int\sin(ax)$ without dividing by $a$ | $-\frac1a\cos(ax)$ |
| **Using "divide by $a$" on a non-linear inside**, e.g. $\int e^{x^2}dx=\frac1{x^2}e^{x^2}$ | The ÷$a$ shortcut is only valid when the inside is **linear** ($ax+b$). Curved inside → needs substitution, and only works if the inner derivative is present. $e^{x^2}$ alone has **no** elementary antiderivative |
| Substitution: keeping old $x$-limits after switching to $u$ | Convert the limits or substitute back, never mix |
| Area between curves as bottom − top | top − bottom; test a point |
| **Keeping the old $x$-limits** after switching to $u$ (Ex 31) | Convert them: $x=2\to u=\ln2$. Mixing gives $0.25$ instead of $0.721$ |
| Reading $(\ln x)^2$ as $\ln(x^2)$ (Ex 31) | $(\ln x)^2$ is the log **squared**; $\ln(x^2)=2\ln x$. Wrong reading gives $0.3466$ |
| $\int\frac{ds}{\sqrt{a^2-s^2}}=\arcsin s$ (Ex 41) | It is $\arcsin\frac sa$ — the $a$ lives **inside**. Forgetting it turned $\frac{2\pi}3$ into $2\pi$ |
| Dropping a constant that was factored out (Ex 41) | Park the constant in front and re-attach it: $4\cdot\frac\pi6=\frac{2\pi}3$, not $\frac\pi6$ |
| Guessing $\int\cos^2(\cdot)$ directly (Ex 14) | No antiderivative by sight — use power reduction $\cos^2\theta=\frac{1+\cos2\theta}2$ first |
| Treating the extra factor in a substitution problem as decoration (Ex 14) | That factor **is** $du$. If it doesn't match $du$ exactly, the substitution leaves an $x$ behind and fails |
| Area between curves: using $\lvert\text{lower curve}\rvert$ as an area (2026-09-24) | Always $\int(\text{top}-\text{bottom})$ over the interval. The wrong route gave $5.15$ and $5.52$ instead of $\frac{128}{15}=8.53$ |
| FTC II straight through a blow-up point | Check the interval first → improper integral |
| **FTC I with the variable in the lower limit**, applied without flipping | $\int_b^a=-\int_a^b$ first, so $\frac{d}{dx}\int_{g(x)}^{a}f=-f(g(x))g'(x)$ — the minus is the whole trick (Ex 47) |
| Forgetting $g'(x)$ in FTC I when the limit isn't plain $x$ | $\frac{d}{dx}\int_a^{g(x)}f=f(g(x))\cdot g'(x)$ — same inner-derivative habit as the Chain Rule |

## Extrema (L02 material, re-taught 2026-09-26)
| Mistake | Fix |
|---|---|
| **Forgetting the two endpoints** when hunting absolute max/min | Candidates = critical points **plus $a$ plus $b$**. In $x^3-3x$ on $[-1.5,3]$ the winner *is* the endpoint ($f(3)=18$) |
| Treating $f'(c)=0$ as proof of a maximum | Critical point = **suspect only**. Do the sign flip: $+\to-$ max, $-\to+$ min, no flip → neither ($x^3$ at $0$) |
| Plugging candidates into $f'$ instead of $f$ | Step 2 finds *where*; step 4 needs *how high*. Heights come from $f$ |
| Keeping critical points that lie outside $[a,b]$ | They are not on the walk. Discard them |
| Reporting the local max as the absolute max | Compare every candidate's height. Local champion ≠ global champion |

## Meta
- **Not verifying.** Every final answer gets a check → [[Verification Methods]].
- **Not simplifying first.** Trig identities or splitting fractions often make the problem much easier.
- **Picking the technique before looking.** Name *why* a rule applies before using it — see the "inside something?" test above.
