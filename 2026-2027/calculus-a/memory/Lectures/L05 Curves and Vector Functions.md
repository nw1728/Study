---
title: "Lecture 5 — Curves and Vector Functions"
lecture: 5
date: 2026-09-28
slides: ../../lectures_slides/lecture_5.pdf
tags: [calculus-a, lecture, parametric, polar, vector-functions]
status: in-progress
---

# Lecture 5 — Curves and Vector Functions

Back to [[00 Index]] · Prev: [[L04 Vectors and 3D Geometry]] · Walkthrough: [[L04 Walkthrough (Gogo Gaga)]]
Practice: [[Exercise Log]] · Errors to watch: [[Common Mistakes]]

> [!abstract] Big picture — one sentence
> Until now a curve was a **graph**: $y=f(x)$, one $y$ per $x$. From this lecture on, a curve is a **path traced by a moving dot**: a clock $t$ runs, and two (or three) separate recipes say where the dot is at that moment. Everything else in the lecture is ordinary L02/L03 calculus applied **one component at a time**.

> [!tip] Why this lecture exists
> A circle is not a function of $x$ (it fails the vertical-line test), so $y=f(x)$ cannot describe it. Give the dot a clock and it can: $x=\cos t,\ y=\sin t$. Parametrization buys back every curve that the graph language refused.

> [!important] The two engines of the whole lecture
> 1. **Componentwise rule.** Limits, continuity, derivatives and integrals of a vector function are done *separately on each component*. No new calculus is needed.
> 2. **Speed $\times$ time $=$ distance.** Every arc-length formula in this lecture is $L=\int|\mathbf v|\,dt$ in disguise.

## 🗺️ Map — 9 materi

| # | Materi | Slides | Core formula | Status |
|---|---|---|---|---|
| 1 | Parametric plane curves | 2–4 | $x=f(t),\ y=g(t)$ | ⬜ |
| 2 | Calculus on parametric curves (tangents) | 5–6 | $\dfrac{dy}{dx}=\dfrac{dy/dt}{dx/dt}$ | ⬜ |
| 3 | Arc length in the plane | 7–8 | $L=\int_a^b\sqrt{(x')^2+(y')^2}\,dt$ | ⬜ |
| 4 | Polar coordinates | 9–11 | $x=r\cos\theta,\ y=r\sin\theta$ | ⬜ |
| 5 | Vector functions / space curves | 12–14 | $\mathbf r(t)=f(t)\mathbf i+g(t)\mathbf j+h(t)\mathbf k$ | ⬜ |
| 6 | Derivative: velocity, speed, acceleration | 15–16 | $\mathbf v=\mathbf r',\ \text{speed}=\lvert\mathbf v\rvert,\ \mathbf a=\mathbf v'$ | ⬜ |
| 7 | Differentiation rules + constant length | 17–18 | $(\mathbf u\cdot\mathbf v)'=\mathbf u'\cdot\mathbf v+\mathbf u\cdot\mathbf v'$ | ⬜ |
| 8 | Integrals of vector functions | 19–20 | $\int\mathbf r\,dt$ componentwise $+\ \mathbf C$ | ⬜ |
| 9 | Arc length in space, $s(t)$, unit tangent | 21–25 | $L=\int\lvert\mathbf v\rvert\,dt$, $\mathbf T=\mathbf v/\lvert\mathbf v\rvert$ | ⬜ |

> [!warning] Prerequisite gap
> Slide 17 rule 6 is the **cross-product** product rule, and L04 **Materi 7 (cross product) is not taught yet**. Teach L04 Materi 7–8 before Materi 7 of this lecture, or that rule has nothing to stand on.

---

## 1. Parametrizations of plane curves (slides 2–4)

**Definition.** If $x=f(t)$ and $y=g(t)$ over an interval $I$, the set of points $(x,y)=(f(t),g(t))$ is a **parametric curve**; the equations are its **parametric equations**.
- $t$ = **parameter**, $I$ = **parameter interval**.
- On $I=[a,b]$: **initial point** $(f(a),g(a))$, **terminal point** $(f(b),g(b))$.
- Parametric equations **+** interval = a **parametrization**.

**Eliminating the parameter** turns a parametrization back into a Cartesian equation — this names the shape.

**Slide 3 worked:** $x=\cos t,\ y=\sin t,\ 0\le t\le2\pi$. Pythagorean identity $\cos^2t+\sin^2t=1$ gives $x^2+y^2=1$: the unit circle, traced counterclockwise from $(1,0)$.

**Slide 3 second example:** $x=t^2,\ y=t+1$, $-\infty<t<\infty$. From $t=y-1$, $x=(y-1)^2$ — a parabola opening in the $+x$ direction, vertex $(0,1)$.

**Slide 4 — one curve, many parametrizations** of $x^2+y^2=1$:

| Parametrization | Interval | What is different |
|---|---|---|
| $\mathbf r_1(t)=(\cos t,\sin t)$ | $0\le t\le2\pi$ | counterclockwise, standard |
| $\mathbf r_2(u)=(\cos u,-\sin u)$ | $0\le u\le2\pi$ | clockwise (direction flipped) |
| $\mathbf r_3(s)=(\cos\frac s2,\sin\frac s2)$ | $0\le s\le4\pi$ | same route, half the speed |

> [!warning] The curve is the **set of points**; the parametrization also carries **direction** and **speed**. Those three agree as pictures and disagree as journeys.

**Easy example (teaching).** $x=t+1,\ y=2t$, $0\le t\le2$. $t=x-1\Rightarrow y=2x-2$: the straight segment from $(1,0)$ to $(3,4)$. ✅ check $t=1\to(2,2)$, and $2(2)-2=2$ ✓.

## 2. Calculus with parametric curves (slides 5–6)

With $y$ differentiable as a function of $x$, the Chain Rule says $\dfrac{dy}{dt}=\dfrac{dy}{dx}\cdot\dfrac{dx}{dt}$, so whenever $\dfrac{dx}{dt}\neq0$:
$$\frac{dy}{dx}=\frac{dy/dt}{dx/dt}=\frac{dy}{dt}\left(\frac{dx}{dt}\right)^{-1}$$
Second derivative — **differentiate $y'=dy/dx$ with respect to $t$, then divide by $dx/dt$ again**:
$$\frac{d^2y}{dx^2}=\frac{d}{dx}\left(\frac{dy}{dx}\right)=\frac{\dfrac{d}{dt}\left(\dfrac{dy}{dx}\right)}{\dfrac{dx}{dt}}$$

> [!warning] The classic error: $\dfrac{d^2y}{dx^2}\neq\dfrac{d^2y/dt^2}{d^2x/dt^2}$. You may **not** repeat the first-derivative trick on second derivatives.

**Slide 6 worked:** $x=\sec t,\ y=\tan t$ at $(\sqrt2,1)$, $t=\pi/4$.
$\dfrac{dx}{dt}=\sec t\tan t$, $\dfrac{dy}{dt}=\sec^2t$, so
$$\frac{dy}{dx}=\frac{\sec^2t}{\sec t\tan t}=\frac{\sec t}{\tan t}=\csc t$$
At $t=\pi/4$: slope $=\csc(\pi/4)=\sqrt2$. Tangent: $y-1=\sqrt2(x-\sqrt2)\Rightarrow y=\sqrt2\,x-1$.
(Eliminating $t$ here gives $\sec^2t-\tan^2t=1$, i.e. $x^2-y^2=1$ — a hyperbola.)

**Easy example (teaching).** $x=t^2,\ y=t^3$ at $t=2$. $\dfrac{dy}{dx}=\dfrac{3t^2}{2t}=\dfrac{3t}2=3$; point $(4,8)$; tangent $y=3x-4$.
✅ numerical check at $t=2.01$: $(4.0401,8.1206)$, slope $\approx\frac{0.1206}{0.0401}=3.007$ ✓.

## 3. Length of a parametrically defined curve (slides 7–8)

**Derivation (slide 7), in four moves:**
1. Chop $[a,b]$: $a=t_0<t_1<\dots<t_n=b$, join the points $P_i=(f(t_i),g(t_i))$ with straight segments.
2. One segment by Pythagoras: $\Delta L_i=\sqrt{[f(t_i)-f(t_{i-1})]^2+[g(t_i)-g(t_{i-1})]^2}$.
3. Derivative definition: $f(t_i)-f(t_{i-1})\approx f'(t_{i-1})\Delta t_i$ (same for $g$), so $\Delta L_i\approx\sqrt{[f']^2+[g']^2}\,\Delta t_i$.
4. Sum = Riemann sum → limit = integral.

**Definition (slide 8).** If $f'$ and $g'$ are continuous and **not simultaneously zero** on $[a,b]$, and $C$ is traversed **exactly once**:
$$L=\int_a^b\sqrt{[f'(t)]^2+[g'(t)]^2}\,dt=\int_a^b\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2}dt$$

> [!warning] The two conditions are not decoration. **Traversed once** — use $\mathbf r_3$ from slide 4 over $0\le s\le4\pi$ with the wrong interval and you measure the circle twice. **Not simultaneously zero** — a dot that stops can double back without the integral noticing.

**Slide 8 worked (circle of radius $r$):** $x=r\cos t,\ y=r\sin t$, $0\le t\le2\pi$.
$\sqrt{(-r\sin t)^2+(r\cos t)^2}=\sqrt{r^2}=r$, so $L=\int_0^{2\pi}r\,dt=2\pi r$ ✓ (the known circumference).

**Easy example (teaching).** $x=3t,\ y=4t$, $0\le t\le1$. Speed $=\sqrt{9+16}=5$, so $L=5$.
✅ check: straight segment $(0,0)\to(3,4)$, distance $\sqrt{3^2+4^2}=5$ ✓ — the 3-4-5 triangle again.

## 4. Polar coordinates (slides 9–11)

A point is addressed by **(how far, which way)** instead of (across, up):
- $r$ = **directed** distance from the pole $O$; $\theta$ = **directed** angle from the initial ray to $OP$.
- $\theta>0$ counterclockwise, $\theta<0$ clockwise.
- **Negative $r$** means: face along $\theta$, then walk **backwards** $\lvert r\rvert$.

> [!warning] Polar addresses are **not unique**. One Cartesian pair $(x,y)$, infinitely many polar pairs. Slide 9: the point 2 units out along $\pi/6$ is $(2,\frac\pi6)$, $(2,-\frac{11\pi}6)$, $(-2,\frac{7\pi}6)$, $(-2,-\frac{5\pi}6)$, … General rule: $(r,\theta)=(r,\theta+2k\pi)=(-r,\theta+(2k+1)\pi)$.

**Simplest polar graphs (slide 10):**

| Equation | Graph |
|---|---|
| $r=a$ | circle of radius $\lvert a\rvert$ centred at $O$ |
| $\theta=\theta_0$ | line through $O$ making angle $\theta_0$ with the initial ray |

**Conversion (slide 11):**
$$x=r\cos\theta,\qquad y=r\sin\theta,\qquad r^2=x^2+y^2,\qquad \tan\theta=\frac yx$$

**Slide 11 table:**

| Polar | Cartesian |
|---|---|
| $r\cos\theta=2$ | $x=2$ |
| $r^2\cos\theta\sin\theta=4$ | $xy=4$ |
| $r^2\cos^2\theta-r^2\sin^2\theta=1$ | $x^2-y^2=1$ |
| $r=1+2r\cos\theta$ | $y^2-3x^2-4x-1=0$ |
| $r=1-\cos\theta$ | $x^4+y^4+2x^2y^2+2x^3+2xy^2-y^2=0$ |
| $r=\frac{16/5}{1+\frac35\cos\theta}$ | $\frac{(x+3)^2}{25}+\frac{y^2}{16}=1$ |

> [!tip] Recipe for converting: multiply through by $r$ to manufacture $r^2$ ($\to x^2+y^2$), $r\cos\theta$ ($\to x$) or $r\sin\theta$ ($\to y$). Never convert $\cos\theta$ alone.

**Easy example (teaching).** $r\cos\theta=3$. Since $x=r\cos\theta$, this is $x=3$ — a vertical line. ✅ check: the point $r=3,\theta=0$ is $(3,0)$, on the line ✓.

## 5. Curves in space and vector functions (slides 12–14)

A particle in space has $x=f(t),\ y=g(t),\ z=h(t)$ for $t\in I$. Bundle them into one **position vector**:
$$\mathbf r(t)=\overrightarrow{OP}=f(t)\mathbf i+g(t)\mathbf j+h(t)\mathbf k$$

**Definition (slide 13).** A **vector function** of a real variable $t$ assigns a **vector** to each $t$ in its domain. $f,g,h$ are its **components** (ordinary scalar functions). The **domain is the intersection** of the components' domains.

Vector functions generalize to space curves (domain = interval of $\mathbb R$), surfaces (domain = region in $\mathbb R^2$) and vector fields — the last two are Calculus B.

**Slide 12 example — the helix:** $\mathbf r(t)=(\cos t)\mathbf i+(\sin t)\mathbf j+t\mathbf k$. The $x,y$ part runs around the unit circle; $z=t$ climbs steadily. Seen from above it is a circle; in 3D it is a spring.

**Limits and continuity (slide 14) — componentwise.** With $\mathbf L=L_1\mathbf i+L_2\mathbf j+L_3\mathbf k$:
$$\lim_{t\to t_0}\mathbf r(t)=\mathbf L\iff\lim_{t\to t_0}f=L_1,\ \lim_{t\to t_0}g=L_2,\ \lim_{t\to t_0}h=L_3$$
$\mathbf r$ is **continuous at $t_0$** iff $\lim_{t\to t_0}\mathbf r(t)=\mathbf r(t_0)$; continuous means continuous at every point of the domain.

**Easy example (teaching).** $\mathbf r(t)=t\mathbf i+t^2\mathbf j$. At $t=3$: the point $(3,9)$. Eliminating $t$: $y=x^2$ — a parabola. Domain: all of $\mathbb R$.

## 6. Derivative, velocity, speed, acceleration (slides 15–16)

**Definition (slide 15).** $\mathbf r$ is differentiable at $t$ if $f,g,h$ are, and
$$\mathbf r'(t)=\frac{d\mathbf r}{dt}=\lim_{\Delta t\to0}\frac{\mathbf r(t+\Delta t)-\mathbf r(t)}{\Delta t}=\frac{df}{dt}\mathbf i+\frac{dg}{dt}\mathbf j+\frac{dh}{dt}\mathbf k$$
Why it comes out componentwise: the difference quotient is itself a vector, each slot is an ordinary difference quotient, and the limit is taken slot by slot (slide 14). Geometrically $\mathbf r(t+\Delta t)-\mathbf r(t)$ is the **secant** $\overrightarrow{PQ}$; dividing by $\Delta t$ keeps its direction, and as $\Delta t\to0$ the secant becomes the **tangent**.

**Definitions (slide 16).** For $\mathbf r(t)$ the position of a particle on a smooth curve:
$$\mathbf v(t)=\frac{d\mathbf r}{dt}\quad(\textbf{velocity, tangent to the curve}),\qquad\text{speed}=\lvert\mathbf v\rvert,\qquad\mathbf a=\frac{d\mathbf v}{dt}=\frac{d^2\mathbf r}{dt^2}$$
and $\dfrac{\mathbf v}{\lvert\mathbf v\rvert}$ is the **unit vector giving the direction of motion**.

> [!warning] **Velocity is an arrow, speed is a number.** Direction lives in $\mathbf v$, size lives in $\lvert\mathbf v\rvert$. This is exactly the type discipline from L04 Materi 5 ([[Common Mistakes]]): $\lvert\cdot\rvert$ turns an arrow into a number.

**Easy example (teaching).** $\mathbf r(t)=3t\mathbf i+4t\mathbf j+12t\mathbf k$. Then $\mathbf v=\langle3,4,12\rangle$, speed $=\sqrt{9+16+144}=\sqrt{169}=13$, $\mathbf a=\mathbf 0$ (constant velocity — no acceleration), direction $=\langle\frac3{13},\frac4{13},\frac{12}{13}\rangle$.
✅ check $\left(\frac3{13}\right)^2+\left(\frac4{13}\right)^2+\left(\frac{12}{13}\right)^2=\frac{169}{169}=1$ ✓.

## 7. Differentiation rules + constant length (slides 17–18)

With $\mathbf u,\mathbf v$ differentiable vector functions of $t$, $\mathbf C$ a constant vector, $c$ a scalar, $f$ a differentiable scalar function:

| # | Rule | |
|---|---|---|
| 1 | $\dfrac{d}{dt}\mathbf C=\mathbf 0$ | constant |
| 2 | $\dfrac{d}{dt}[c\,\mathbf u]=c\,\mathbf u'$ | scalar multiple |
| 3 | $\dfrac{d}{dt}[f(t)\mathbf u(t)]=f'(t)\mathbf u(t)+f(t)\mathbf u'(t)$ | scalar function $\times$ vector |
| 4 | $\dfrac{d}{dt}[\mathbf u+\mathbf v]=\mathbf u'+\mathbf v'$ | sum |
| 5 | $\dfrac{d}{dt}[\mathbf u-\mathbf v]=\mathbf u'-\mathbf v'$ | difference |
| 6 | $\dfrac{d}{dt}[\mathbf u\cdot\mathbf v]=\mathbf u'\cdot\mathbf v+\mathbf u\cdot\mathbf v'$ | **dot** product |
| 7 | $\dfrac{d}{dt}[\mathbf u\times\mathbf v]=\mathbf u'\times\mathbf v+\mathbf u\times\mathbf v'$ | **cross** product |
| 8 | $\dfrac{d}{dt}[\mathbf u(f(t))]=f'(t)\,\mathbf u'(f(t))$ | chain rule |

**Proof of rule 6 (slide 17).** $\mathbf u\cdot\mathbf v=u_1v_1+u_2v_2+u_3v_3$; differentiate each term with the ordinary scalar Product Rule and regroup:
$$u_1'v_1+u_1v_1'+u_2'v_2+u_2v_2'+u_3'v_3+u_3v_3'=\mathbf u'\cdot\mathbf v+\mathbf u\cdot\mathbf v'$$

> [!warning] **Rule 7 does not commute — keep the order.** $\mathbf u\times\mathbf v=-\mathbf v\times\mathbf u$, so writing $\mathbf v\times\mathbf u'$ instead of $\mathbf u'\times\mathbf v$ flips the sign. (Needs L04 Materi 7.)

**Vector functions of constant length (slide 18).** A particle on a sphere of radius $c$ about the origin has $\lvert\mathbf r(t)\rvert=c$. Then:
$$\mathbf r\cdot\mathbf r=c^2\ \Rightarrow\ \frac{d}{dt}[\mathbf r\cdot\mathbf r]=0\ \Rightarrow\ \mathbf r'\cdot\mathbf r+\mathbf r\cdot\mathbf r'=0\ \Rightarrow\ 2\,\mathbf r'\cdot\mathbf r=0\ \Rightarrow\ \mathbf r'\cdot\mathbf r=0$$
so $\mathbf r'(t)$ and $\mathbf r(t)$ are **orthogonal**: constant length $\Rightarrow$ velocity perpendicular to position.

> [!tip] This is the payoff of L04 Materi 5. Two facts Ethan already owns do all the work: $\mathbf r\cdot\mathbf r=\lvert\mathbf r\rvert^2$ (his own Ex 5.6b discovery) and "dot product $=0$ means perpendicular". Nothing new is needed.

**Easy example (teaching).** $\mathbf u=\langle t,2,0\rangle$, $\mathbf v=\langle1,t,0\rangle$. Direct: $\mathbf u\cdot\mathbf v=t+2t=3t$, derivative $3$. By rule 6: $\langle1,0,0\rangle\cdot\langle1,t,0\rangle+\langle t,2,0\rangle\cdot\langle0,1,0\rangle=1+2=3$ ✓.
Constant length: $\mathbf r=\langle\cos t,\sin t,0\rangle$ has $\lvert\mathbf r\rvert=1$; $\mathbf r'=\langle-\sin t,\cos t,0\rangle$; $\mathbf r\cdot\mathbf r'=-\cos t\sin t+\sin t\cos t=0$ ✓.

## 8. Integrals of vector functions (slides 19–20)

- $\mathbf R(t)$ is an **antiderivative** of $\mathbf r(t)$ on $I$ if $\dfrac{d\mathbf R}{dt}=\mathbf r(t)$ for all $t\in I$.
- Every antiderivative is $\mathbf R(t)+\mathbf C$ with $\mathbf C$ a **constant vector**, and the indefinite integral is $\int\mathbf r(t)\,dt=\mathbf R(t)+\mathbf C$.
- **Definite integral, componentwise:**
$$\int_a^b\mathbf r(t)\,dt=\left(\int_a^bf\,dt\right)\mathbf i+\left(\int_a^bg\,dt\right)\mathbf j+\left(\int_a^bh\,dt\right)\mathbf k$$

> [!warning] $+\mathbf C$ is **three** constants, not one — one per component. Writing a scalar $+C$ here is a type error, and it is the old "forgot $+C$" leak wearing a new coat.

**Slide 20 worked (hang glider).** $\mathbf a(t)=-(3\cos t)\mathbf i-(3\sin t)\mathbf j+2\mathbf k$, $\mathbf v(0)=3\mathbf j$, $\mathbf r(0)=(3,0,0)$.
1. $\mathbf v(t)=\int\mathbf a\,dt=-(3\sin t)\mathbf i+(3\cos t)\mathbf j+2t\mathbf k+\mathbf C$. At $t=0$ this is $3\mathbf j+\mathbf C=3\mathbf j$, so $\mathbf C=\mathbf 0$.
2. $\mathbf r(t)=\int\mathbf v\,dt=(3\cos t)\mathbf i+(3\sin t)\mathbf j+t^2\mathbf k+\mathbf D$. At $t=0$ this is $3\mathbf i+\mathbf D=3\mathbf i$, so $\mathbf D=\mathbf 0$.
3. $\mathbf r(t)=(3\cos t)\mathbf i+(3\sin t)\mathbf j+t^2\mathbf k$ — a widening spiral on the cylinder $x^2+y^2=9$.

**Easy example (teaching).** $\mathbf v(t)=2t\mathbf i+3\mathbf j$ with $\mathbf r(0)=\mathbf i$. Then $\mathbf r(t)=t^2\mathbf i+3t\mathbf j+\mathbf C$; $t=0$ gives $\mathbf C=\mathbf i$, so $\mathbf r(t)=(t^2+1)\mathbf i+3t\mathbf j$.
✅ check: $\mathbf r(0)=\langle1,0\rangle$ ✓ and $\mathbf r'(t)=\langle2t,3\rangle$ ✓.

## 9. Arc length in space, arc-length parameter, unit tangent (slides 21–25)

**Length (slides 21–22).** Same idea as materi 3, one more component:
$$L=\int_a^b\lvert\mathbf v\rvert\,dt=\int_a^b\sqrt{\left(\frac{dx}{dt}\right)^2+\left(\frac{dy}{dt}\right)^2+\left(\frac{dz}{dt}\right)^2}\,dt$$
for a smooth curve traced **exactly once**. The length does not depend on which parametrization you use (proof omitted in the course).

**Slide 22 worked (helix).** $\mathbf r(t)=(\cos t)\mathbf i+(\sin t)\mathbf j+t\mathbf k$, $0\le t\le2\pi$.
$\mathbf r'=(-\sin t)\mathbf i+(\cos t)\mathbf j+\mathbf k$, $\lvert\mathbf r'\rvert=\sqrt{\sin^2t+\cos^2t+1}=\sqrt2$, so $L=\int_0^{2\pi}\sqrt2\,dt=2\pi\sqrt2$.
Sanity: the circle underneath has length $2\pi$ and the climb is $2\pi$; a $45^\circ$ ramp over a $2\pi$ base is $2\pi\sqrt2$ ✓.

**Arc-length parameter (slide 23).** With base point $P(t_0)$:
$$s(t)=\int_{t_0}^t\lvert\mathbf v(\tau)\rvert\,d\tau=\int_{t_0}^t\sqrt{[x'(\tau)]^2+[y'(\tau)]^2+[z'(\tau)]^2}\,d\tau$$
- $t>t_0$: $s(t)$ is the distance from $P(t_0)$ to $P(t)$ **along the curve**. $t<t_0$: $s(t)$ is negative.
- **Speed on a smooth curve:** $\dfrac{ds}{dt}=\lvert\mathbf v(t)\rvert$. (The derivative of distance-so-far is speed — FTC I from [[L03 Integration]], applied here.)
- If $s(t)$ is invertible, **reparametrize** by arc length: $\mathbf r(s)=\mathbf r(t(s))$, so the parameter *is* the distance travelled.

**Slide 24 worked (helix, arc-length parametrization).** $s(t)=\int_0^t\sqrt2\,d\tau=\sqrt2\,t\Rightarrow t=s/\sqrt2$, hence
$$\mathbf r(s)=\cos\!\left(\frac s{\sqrt2}\right)\mathbf i+\sin\!\left(\frac s{\sqrt2}\right)\mathbf j+\frac s{\sqrt2}\mathbf k$$

**Unit tangent vector (slide 25).**
$$\mathbf T=\frac{\mathbf v}{\lvert\mathbf v\rvert}$$
differentiable wherever $\mathbf v$ is. It keeps the **direction** of motion and throws away the **speed** — pure direction, length $1$. (Normalisation from L04 Materi 3.)

**Slide 25 worked.** $\mathbf r(t)=(3\cos t)\mathbf i+(3\sin t)\mathbf j+t^2\mathbf k$.
$\mathbf v=(-3\sin t)\mathbf i+(3\cos t)\mathbf j+2t\mathbf k$, $\lvert\mathbf v\rvert=\sqrt{9\sin^2t+9\cos^2t+4t^2}=\sqrt{9+4t^2}$, so
$$\mathbf T(t)=\frac{-3\sin t}{\sqrt{9+4t^2}}\mathbf i+\frac{3\cos t}{\sqrt{9+4t^2}}\mathbf j+\frac{2t}{\sqrt{9+4t^2}}\mathbf k$$

**Easy example (teaching).** $\mathbf r(t)=(3\cos t)\mathbf i+(3\sin t)\mathbf j+4t\mathbf k$ (a 3-4-5 helix).
$\mathbf v=\langle-3\sin t,3\cos t,4\rangle$, $\lvert\mathbf v\rvert=\sqrt{9+16}=5$ (constant!), so $L$ over $0\le t\le2\pi$ is $10\pi$, $s(t)=5t$, and
$$\mathbf T=\left\langle\frac{-3\sin t}5,\frac{3\cos t}5,\frac45\right\rangle$$
✅ check $\lvert\mathbf T\rvert^2=\frac{9\sin^2t+9\cos^2t+16}{25}=\frac{25}{25}=1$ ✓.

---

## 🧰 Recipe card

| Question | Move |
|---|---|
| "What shape is this?" | eliminate the parameter |
| "Tangent / slope?" | $\dfrac{dy}{dx}=\dfrac{dy/dt}{dx/dt}$, or $\mathbf v=\mathbf r'$ in space |
| "How long is the path?" | $\int\lvert\mathbf v\rvert\,dt$ |
| "How fast?" | $\lvert\mathbf v\rvert$ (a number) |
| "Which way?" | $\mathbf T=\mathbf v/\lvert\mathbf v\rvert$ (an arrow) |
| Given $\mathbf a$, want $\mathbf r$ | integrate twice, kill each $\mathbf C$ with an initial condition |
| "Prove perpendicular" | show $\mathbf r\cdot\mathbf r'=0$; constant length is the usual reason |

## ⚠️ Traps to drill

1. $\dfrac{d^2y}{dx^2}\ne\dfrac{d^2y/dt^2}{d^2x/dt^2}$.
2. Arc length needs **traversed once** and $f',g'$ **not both zero**.
3. Polar coordinates are **not unique**; negative $r$ walks backwards.
4. Convert polar→Cartesian only via $r^2$, $r\cos\theta$, $r\sin\theta$ — multiply by $r$ to get there.
5. $+\mathbf C$ is a **vector** constant (three numbers).
6. Cross-product rule keeps its order; the dot-product rule may be swapped.
7. **Type check every line:** velocity/acceleration/$\mathbf T$ are arrows; speed/length/$s(t)$ are numbers.

---

## 📝 Live lecture notes — 2026-09-28
*Filled in during the lecture: slide number → what the lecturer said, Ethan's questions, extra examples.*

-
