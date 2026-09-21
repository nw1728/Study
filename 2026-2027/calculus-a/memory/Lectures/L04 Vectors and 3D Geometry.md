---
title: "Lecture 4 — Vectors, Products, and Geometry in 3D Space"
lecture: 4
date: 2026-09-21
slides: ../../lectures_slides/lecture_4.pdf
tags: [calculus-a, lecture, vectors, 3d-geometry]
status: in-progress
updated: 2026-09-21
---

# Lecture 4 — Vectors, Products, and Geometry in 3D Space

Back to [[00 Index]] · Prev: [[L03 Integration]]
Practice: [[Exercise Log#Lecture 4 — Vectors and 3D geometry]] · Checking answers: [[Verification Methods]]

> [!abstract] Big picture
> We leave the flat $xy$-plane and go to **3D space**. A **vector** is an arrow: it has a length and a direction.
> Two ways to multiply vectors:
> - **Dot product** $\mathbf u\cdot\mathbf v$ gives a **number**. It measures how much two arrows point the same way (angles, projections, perpendicular test).
> - **Cross product** $\mathbf u\times\mathbf v$ gives a **new vector** perpendicular to both (normals, areas, parallel test).
>
> With these two tools we describe **lines** (point + direction) and **planes** (point + normal) and measure distances and angles between them.

## 1. 3D Cartesian coordinates (slide 2)
- Three mutually perpendicular axes through the origin $O$: $x$, $y$ (horizontal plane), $z$ (vertical).
- **Right-handed:** a right-handed screw turning from $x$ to $y$ moves along $+z$. (Right hand: fingers curl $x\to y$, thumb points to $z$.)
- A point $P(x_0,y_0,z_0)$: signed distances along the $x$-, $y$-, $z$-axes.

## 2. Distance and spheres (slides 3–4)
**Distance** between $P_1(x_1,y_1,z_1)$ and $P_2(x_2,y_2,z_2)$:
$$|P_1P_2|=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2+(z_2-z_1)^2}$$
*Why:* Pythagoras twice. First in the floor: diagonal $=\sqrt{(\Delta x)^2+(\Delta y)^2}$. Then that diagonal and the height $\lvert\Delta z\rvert$ form another right triangle.

**Sphere** with center $P_0(x_0,y_0,z_0)$, radius $a>0$ = all points at distance $a$ from the center:
$$(x-x_0)^2+(y-y_0)^2+(z-z_0)^2=a^2$$

**Slide 4 example:** $x^2+y^2+z^2+3x-4z+1=0$. **Complete the square:**
- $x^2+3x=(x+\tfrac32)^2-\tfrac94$, $z^2-4z=(z-2)^2-4$
- $(x+\tfrac32)^2+y^2+(z-2)^2=\tfrac94+4-1=\tfrac{21}4$
- Center $(-\tfrac32,0,2)$, radius $\tfrac{\sqrt{21}}2\approx2.291$ ✓

> [!warning] Sign flip: $(x+\tfrac32)^2$ means the center has $x_0=-\tfrac32$, not $+\tfrac32$.

## 3. Vectors and component form (slides 5–6)
- $\overrightarrow{AB}$: arrow from **initial point** $A$ to **terminal point** $B$. Two vectors are **equal** if they have the same length and direction, no matter where they start.
- **Component form:** $\mathbf v=\langle v_1,v_2,v_3\rangle$ (the arrow from the origin to $(v_1,v_2,v_3)$).
- From $P(x_1,y_1,z_1)$ to $Q(x_2,y_2,z_2)$: $\overrightarrow{PQ}=\langle x_2-x_1,\ y_2-y_1,\ z_2-z_1\rangle$ (**end minus start**).
- **Magnitude (length):** $|\mathbf v|=\sqrt{v_1^2+v_2^2+v_3^2}$
- Standard unit vectors: $\mathbf i=\langle1,0,0\rangle$, $\mathbf j=\langle0,1,0\rangle$, $\mathbf k=\langle0,0,1\rangle$, so $\langle v_1,v_2,v_3\rangle=v_1\mathbf i+v_2\mathbf j+v_3\mathbf k$.

## 4. Vector operations (slide 7)
$$\mathbf u+\mathbf v=\langle u_1+v_1,u_2+v_2,u_3+v_3\rangle\qquad k\mathbf u=\langle ku_1,ku_2,ku_3\rangle$$
Component by component. Properties: commutative, associative, $\mathbf u+\mathbf 0=\mathbf u$, $\mathbf u+(-\mathbf u)=\mathbf 0$, $0\mathbf u=\mathbf 0$, $1\mathbf u=\mathbf u$, $a(b\mathbf u)=(ab)\mathbf u$, $a(\mathbf u+\mathbf v)=a\mathbf u+a\mathbf v$, $(a+b)\mathbf u=a\mathbf u+b\mathbf u$.

**Slide 7 example:** $\mathbf u=\langle-1,3,1\rangle$, $\mathbf v=\langle4,7,0\rangle$
- (a) $2\mathbf u+3\mathbf v=\langle-2+12,\ 6+21,\ 2+0\rangle=\langle10,27,2\rangle$
- (b) $\mathbf u-\mathbf v=\langle-5,-4,1\rangle$
- (c) $\left|\tfrac12\mathbf u\right|=\left|\langle-\tfrac12,\tfrac32,\tfrac12\rangle\right|=\sqrt{\tfrac14+\tfrac94+\tfrac14}=\tfrac{\sqrt{11}}2\approx1.658$ ✓

## 5. Dot product and angles (slides 8–9)
$$\mathbf u\cdot\mathbf v=u_1v_1+u_2v_2+u_3v_3\quad(\text{a number})$$
**Angle** $\theta$ between nonzero vectors (tails together):
$$\cos\theta=\frac{\mathbf u\cdot\mathbf v}{|\mathbf u||\mathbf v|},\qquad0\le\theta\le\pi$$
- $\theta=0$: same direction. $\theta=\pi$: opposite directions.
- **Orthogonal (perpendicular)** $\iff\mathbf u\cdot\mathbf v=0$ (because $\cos\tfrac\pi2=0$).
- Sign of the dot product: $>0$ acute angle, $=0$ right angle, $<0$ obtuse angle.

**Properties:** $\mathbf u\cdot\mathbf v=\mathbf v\cdot\mathbf u$; $(c\mathbf u)\cdot\mathbf v=c(\mathbf u\cdot\mathbf v)$; $\mathbf u\cdot(\mathbf v+\mathbf w)=\mathbf u\cdot\mathbf v+\mathbf u\cdot\mathbf w$; $\mathbf u\cdot\mathbf u=|\mathbf u|^2$; $\mathbf 0\cdot\mathbf u=0$.

## 6. Vector projection (slide 10)
$\text{proj}_{\mathbf v}\mathbf u$ = the "shadow" of $\mathbf u$ on the line of $\mathbf v$ (drop a perpendicular from the tip of $\mathbf u$):
$$\text{proj}_{\mathbf v}\mathbf u=\frac{\mathbf u\cdot\mathbf v}{|\mathbf v|^2}\,\mathbf v\qquad\text{scalar component}=|\mathbf u|\cos\theta=\frac{\mathbf u\cdot\mathbf v}{|\mathbf v|}$$
- $\theta$ acute: the projection points along $\mathbf v$. $\theta$ obtuse: it points opposite to $\mathbf v$ (negative scalar component).

**Slide 10 example:** $\mathbf u=6\mathbf i+3\mathbf j+2\mathbf k$ onto $\mathbf v=\mathbf i-2\mathbf j-2\mathbf k$
- $\mathbf u\cdot\mathbf v=6-6-4=-4$, $|\mathbf v|^2=1+4+4=9$, $|\mathbf v|=3$
- $\text{proj}_{\mathbf v}\mathbf u=-\tfrac49(\mathbf i-2\mathbf j-2\mathbf k)=-\tfrac49\mathbf i+\tfrac89\mathbf j+\tfrac89\mathbf k$
- Scalar component $=-\tfrac43$ (negative, so the angle is obtuse) ✓

> [!warning] $|\mathbf v|^2$ in the vector formula, only $|\mathbf v|$ in the scalar formula. Mixing them up is the classic mistake.

## 7. Cross product (slides 11–14)
**Definition:** $\mathbf u\times\mathbf v$ is the vector that
1. is perpendicular to both: $(\mathbf u\times\mathbf v)\cdot\mathbf u=0$ and $(\mathbf u\times\mathbf v)\cdot\mathbf v=0$
2. has length $|\mathbf u\times\mathbf v|=|\mathbf u||\mathbf v|\sin\theta$
3. makes $\mathbf u,\mathbf v,\mathbf u\times\mathbf v$ a **right-handed** triad

**Components:**
$$\mathbf u\times\mathbf v=(u_2v_3-u_3v_2)\,\mathbf i+(u_3v_1-u_1v_3)\,\mathbf j+(u_1v_2-u_2v_1)\,\mathbf k$$

**Unit vectors** (cycle $\mathbf i\to\mathbf j\to\mathbf k\to\mathbf i$: forward = $+$, backward = $-$):
| | $\times\mathbf i$ | $\times\mathbf j$ | $\times\mathbf k$ |
|---|---|---|---|
| $\mathbf i$ | $\mathbf 0$ | $\mathbf k$ | $-\mathbf j$ |
| $\mathbf j$ | $-\mathbf k$ | $\mathbf 0$ | $\mathbf i$ |
| $\mathbf k$ | $\mathbf j$ | $-\mathbf i$ | $\mathbf 0$ |

**Slide 13 example:** $(2\mathbf i+\mathbf j-3\mathbf k)\times(-2\mathbf j+5\mathbf k)$
$=[(1)(5)-(-3)(-2)]\mathbf i+[(-3)(0)-(2)(5)]\mathbf j+[(2)(-2)-(1)(0)]\mathbf k=-\mathbf i-10\mathbf j-4\mathbf k$ ✓

**Properties:**
1. $(r\mathbf u)\times(s\mathbf v)=rs(\mathbf u\times\mathbf v)$
2. $\mathbf u\times(\mathbf v+\mathbf w)=\mathbf u\times\mathbf v+\mathbf u\times\mathbf w$
3. $\mathbf v\times\mathbf u=-(\mathbf u\times\mathbf v)$ (**anticommutative**: order matters!)
4. $(\mathbf v+\mathbf w)\times\mathbf u=\mathbf v\times\mathbf u+\mathbf w\times\mathbf u$
5. $\mathbf 0\times\mathbf u=\mathbf 0$
6. $\mathbf u\times(\mathbf v\times\mathbf w)=(\mathbf u\cdot\mathbf w)\mathbf v-(\mathbf u\cdot\mathbf v)\mathbf w$

**Parallel test:** nonzero $\mathbf u,\mathbf v$ are parallel $\iff\mathbf u\times\mathbf v=\mathbf 0$ (since $\sin\theta=0$ means $\theta=0$ or $\pi$).

> [!tip] Dot $=0$ → **perpendicular**. Cross $=\mathbf 0$ → **parallel**.

## 8. Area of a parallelogram (slide 15)
$$A=|\mathbf u\times\mathbf v|$$
*Why:* base $|\mathbf u|$ × height $|\mathbf v|\sin\theta$, which is exactly the length of the cross product. (A triangle with the same two sides has half this area.)

## 9. Cross product as a determinant (slides 16–17)
$$\det\begin{pmatrix}a&b\\c&d\end{pmatrix}=ad-bc$$
$$\mathbf u\times\mathbf v=\det\begin{pmatrix}\mathbf i&\mathbf j&\mathbf k\\u_1&u_2&u_3\\v_1&v_2&v_3\end{pmatrix}=\mathbf i\begin{vmatrix}u_2&u_3\\v_2&v_3\end{vmatrix}-\mathbf j\begin{vmatrix}u_1&u_3\\v_1&v_3\end{vmatrix}+\mathbf k\begin{vmatrix}u_1&u_2\\v_1&v_2\end{vmatrix}$$
Expand along the top row with signs $+\ -\ +$. Cover the column of each unit vector and take the $2\times2$ determinant of what is left.

> [!warning] The **minus sign on the $\mathbf j$ term** is the most common cross-product error.

**Slide 17 examples:**
- $\mathbf u=2\mathbf i+\mathbf j+\mathbf k$, $\mathbf v=-4\mathbf i+3\mathbf j+\mathbf k$: $\mathbf u\times\mathbf v=-2\mathbf i-6\mathbf j+10\mathbf k$, so $\mathbf v\times\mathbf u=2\mathbf i+6\mathbf j-10\mathbf k$ ✓
- Vector perpendicular to the plane through $P(1,-1,0)$, $Q(2,1,-1)$, $R(-1,1,2)$:
  $\overrightarrow{PQ}=\mathbf i+2\mathbf j-\mathbf k$, $\overrightarrow{PR}=-2\mathbf i+2\mathbf j+2\mathbf k$
  $\mathbf n=\overrightarrow{PQ}\times\overrightarrow{PR}=6\mathbf i+0\mathbf j+6\mathbf k$ ✓

> [!tip] Check any cross product: dot it with $\mathbf u$ and with $\mathbf v$. Both must be $0$.
> E.g. $(6,0,6)\cdot(1,2,-1)=6-6=0$ ✓ and $(6,0,6)\cdot(-2,2,2)=-12+12=0$ ✓

## 10. Lines in space (slide 18)
In 2D a line needs a point and a slope. In 3D a line needs **a point and a direction vector**.
- **Vector equation:** $\mathbf r(t)=\mathbf r_0+t\mathbf v$, $-\infty<t<\infty$
- **Parametric equations** (through $(x_0,y_0,z_0)$, parallel to $\mathbf v=\langle v_1,v_2,v_3\rangle$):
$$x=x_0+tv_1,\quad y=y_0+tv_2,\quad z=z_0+tv_3$$
*Read it as:* start at the point, then walk $t$ steps along $\mathbf v$.

## 11. Distance from a point to a line (slide 19)
$$d=\frac{|\overrightarrow{PS}\times\mathbf v|}{|\mathbf v|}$$
$P$ = any point on the line, $\mathbf v$ = its direction, $S$ = the outside point. *Why:* $d=|\overrightarrow{PS}|\sin\theta$ (the height of a parallelogram = area ÷ base).

**Slide 19 example:** $S(1,1,5)$, line $x=1+t,\ y=3-t,\ z=2t$
- Read off $P(1,3,0)$ ($t=0$) and $\mathbf v=\mathbf i-\mathbf j+2\mathbf k$
- $\overrightarrow{PS}=0\mathbf i-2\mathbf j+5\mathbf k$
- $\overrightarrow{PS}\times\mathbf v=\mathbf i+5\mathbf j+2\mathbf k$, length $\sqrt{30}$; $|\mathbf v|=\sqrt6$
- $d=\sqrt{30}/\sqrt6=\sqrt5\approx2.236$ ✓

## 12. Planes in space (slides 20–21)
A plane needs **a point $P_0(x_0,y_0,z_0)$ and a normal vector $\mathbf n=A\mathbf i+B\mathbf j+C\mathbf k$** (perpendicular to the plane).
*Why:* for any $P$ on the plane, $\overrightarrow{P_0P}$ lies in the plane, so $\overrightarrow{P_0P}\cdot\mathbf n=0$:
$$A(x-x_0)+B(y-y_0)+C(z-z_0)=0\quad\Longleftrightarrow\quad Ax+By+Cz=D,\ \ D=Ax_0+By_0+Cz_0$$
The **coefficients of $x,y,z$ are the normal vector**.

**Slide 21 examples:**
- Through $P_0(-3,0,7)$, $\mathbf n=5\mathbf i+2\mathbf j-\mathbf k$: $5(x+3)+2y-(z-7)=0\Rightarrow5x+2y-z=-22$ ✓
- Through $A(0,0,1)$, $B(2,0,0)$, $C(0,3,0)$: $\overrightarrow{AB}=\langle2,0,-1\rangle$, $\overrightarrow{AC}=\langle0,3,-1\rangle$, $\mathbf n=\overrightarrow{AB}\times\overrightarrow{AC}=3\mathbf i+2\mathbf j+6\mathbf k$.
  Using $A$: $3x+2y+6(z-1)=0\Rightarrow3x+2y+6z=6$ ✓ (check: $B$ gives $6$, $C$ gives $6$)

> [!tip] Recipe for a plane through 3 points: two edge vectors → cross product = normal → plug in one point.

## 13. Lines of intersection (slide 22)
- Two planes are **parallel** $\iff$ their normals are parallel ($\mathbf n_1=k\mathbf n_2$).
- Non-parallel planes meet in a **line**. That line is perpendicular to both normals, so its direction is $\mathbf n_1\times\mathbf n_2$.

**Example:** $3x-6y-2z=15$ and $2x+y-2z=5$: $\mathbf n_1\times\mathbf n_2=\langle3,-6,-2\rangle\times\langle2,1,-2\rangle=14\mathbf i+2\mathbf j+15\mathbf k$ ✓

## 14. Distance from a point to a plane (slide 23)
$$d=\left|\overrightarrow{PS}\cdot\frac{\mathbf n}{|\mathbf n|}\right|=\frac{|Ax_1+By_1+Cz_1-D|}{\sqrt{A^2+B^2+C^2}}$$
(scalar projection of $\overrightarrow{PS}$ onto the normal; $S(x_1,y_1,z_1)$ is the outside point.)

**Example:** $S(1,1,3)$ to $3x+2y+6z=6$: $d=\dfrac{|3+2+18-6|}{\sqrt{9+4+36}}=\dfrac{17}7\approx2.43$ ✓

> [!warning] Move $D$ to the left first ($Ax+By+Cz-D$) and keep the absolute value, because distance is never negative.

## 15. Angle between planes (slide 24)
The angle between two intersecting planes = the **acute** angle between their normals:
$$\cos\theta=\frac{|\mathbf n_1\cdot\mathbf n_2|}{|\mathbf n_1||\mathbf n_2|}$$
**Example:** same planes as §13. $\mathbf n_1\cdot\mathbf n_2=6-6+4=4$, $|\mathbf n_1|=7$, $|\mathbf n_2|=3$ → $\cos\theta=\tfrac4{21}$, $\theta=\cos^{-1}\tfrac4{21}\approx79.0^\circ$ ✓

---

## 🧰 Which tool for which job
| Question | Tool |
|---|---|
| Are they perpendicular? | $\mathbf u\cdot\mathbf v=0$ |
| Are they parallel? | $\mathbf u\times\mathbf v=\mathbf 0$ (or $\mathbf u=k\mathbf v$) |
| Angle between vectors | $\cos\theta=\dfrac{\mathbf u\cdot\mathbf v}{\lvert\mathbf u\rvert\lvert\mathbf v\rvert}$ |
| Shadow of $\mathbf u$ on $\mathbf v$ | $\dfrac{\mathbf u\cdot\mathbf v}{\lvert\mathbf v\rvert^2}\mathbf v$ |
| Vector perpendicular to two vectors / normal of a plane | $\mathbf u\times\mathbf v$ |
| Area of parallelogram (triangle) | $\lvert\mathbf u\times\mathbf v\rvert$ (half of it) |
| Line | point + direction: $\mathbf r_0+t\mathbf v$ |
| Plane | point + normal: $A(x-x_0)+B(y-y_0)+C(z-z_0)=0$ |
| Point–line distance | $\lvert\overrightarrow{PS}\times\mathbf v\rvert/\lvert\mathbf v\rvert$ |
| Point–plane distance | $\lvert Ax_1+By_1+Cz_1-D\rvert/\sqrt{A^2+B^2+C^2}$ |
| Direction of line where two planes meet | $\mathbf n_1\times\mathbf n_2$ |
| Angle between planes | acute angle between normals |

---

## 📝 Live lecture notes — 2026-09-21
*Filled in during the lecture: slide number → what the lecturer said, Ethan's questions, extra examples.*

-
