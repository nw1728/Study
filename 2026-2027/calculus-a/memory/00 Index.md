---
title: Calculus A — Memory Index
tags: [calculus-a, index]
updated: 2026-10-28
---

# 📚 Calculus A — Memory Index

> [!info] Course
> **Calculus A** · University of Twente · Lecturer: **Carlos Pérez Arancibia** (Mathematics of Computational Science, Dept. of Applied Mathematics)
> Slides live in `../lectures_slides/`. Math is written in LaTeX (`$...$`) — Obsidian renders it.
> ⚠️ **Di chat: `$$...$$` di baris sendiri ✅ dan `\(...\)` inline ✅ dirender. `$...$` ❌ RUSAK — jangan dipakai.**
> Diuji langsung dengan Ethan 2026-10-26. Lihat [[Current Progress]] dan [[Teaching Playbook]].

## 🧭 Start here

> [!danger] 🚨 MODE UJIAN — Rabu **4 November 2026**, 08:45–11:45
> Jalur **`202001171` (5 EC)** · soal **1–11** · **45 poin** · nilai `1 + poin × 1/5` · **lulus di 23 poin**
> Posisi **28 Okt malam: 41/45 poin dikerjakan, 32 terverifikasi dingin.** Sisa: soal 4 (belum dicoba) + 4 pelebaran rasa-resit.
> 🗺️ **Ujian punya cetakan tetap** — 3 kertas dibandingkan slot per slot, topik tiap slot sama. Detail di [[Current Progress]].
> 📄 Lembar rumus ujian sudah dipetakan (apa yang gratis vs wajib hafal) — lihat [[Current Progress]].
> 📝 Halaman ujian interaktif: https://claude.ai/artifact/LApfMvRbq2vNa8KCjStbha
> 🗓️ Roadmap: https://claude.ai/artifact/JbWyN4VqhEpptjK3sjtxxs
- 📍 [[Current Progress]] — **where the last session stopped and what to do next**
- [[Student Profile]] — who Ethan is, how he learns best
- [[Teaching Playbook]] — how the instructor (Claude) runs lectures and practice
- [[Session Log]] — what happened in each session, newest first
- 🧸 [[L04 Walkthrough (Gogo Gaga)]] — Lecture 4 taught **per materi, in Bahasa Indonesia**, with the exercises and corrections. This is the format Ethan asked for on 2026-10-06; **continue it**. Materi 1–5 done

## 🎓 Lectures
| # | Date | Topic | Status | Note |
|---|------|-------|--------|------|
| 1 | 2026-09-01 | Functions, limits, continuity | ✅ done | [[L01 Functions Limits Continuity]] |
| 2 | 2026-09-07 | Differentiation | ✅ done + heavy practice | [[L02 Differentiation]] |
| 3 | 2026-09-14 | Integration | 🟡 theory noted; FTC I/II + substitution + one area problem practised (live notes still empty) | [[L03 Integration]] |
| 4 | 2026-09-21 | Vectors, products, 3D geometry (lines, planes) | 🟡 **Materi 1–5 of 8 taught + practised** (coords, spheres, vectors, vector ops, dot product); Materi 6–8 to go | [[L04 Vectors and 3D Geometry]] · [[L04 Walkthrough (Gogo Gaga)]] |
| 5 | 2026-09-28 | Curves and vector functions (parametric, polar, $\mathbf r(t)$) | 🟡 **note written from slides 2026-10-19**: 9-materi map + overview + one easy example per materi; no exercises done yet | [[L05 Curves and Vector Functions]] |

## 📐 Reference sheets
- [[Derivative Rules]] — every derivative formula in one place
- [[Integration Rules]] — antiderivatives, techniques, improper integrals
- [[Verification Methods]] — how to check an answer before trusting it
- 🔵 [Interactive unit circle](https://claude.ai/artifact/VL1xCLnf4rfz58ezkdLZeG) — drag the angle, read off $\cos\theta$ and $\sin\theta$ (built 2026-09-16). Local copy: `html-visualization/unit-circle.html`
- 🟣 [Bayangan Vektor](https://claude.ai/artifact/Ff6iJ5L3aBUcUx4PXTukF6) — drag two arrows and watch the shadow of $\mathbf u$ fall on the line of $\mathbf v$: live $\mathbf u\cdot\mathbf v$, $c$, the projection, the scalar component, and the running proof that **sisa $\cdot\,\mathbf v=0$**; plus a 3D step-by-step checker and a "wrong formula" ghost arrow for the $\lvert\mathbf v\rvert$ vs $\lvert\mathbf v\rvert^2$ trap (built 2026-10-07, Materi 6). Local copy: `html-visualization/vector-projection.html`
- 📈 [Turunan Visual](https://claude.ai/artifact/91iXAEPTaZL93ME9cZJBSU) — 3 tab: apa itu turunan (geser titik, kecilkan $dx$ sampai garis potong jadi garis singgung), $f$ dan $f'$ bersebelahan, dan kartu aturan berwarna (dibangun 2026-10-26). Local: `html-visualization/turunan-visual.html`
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
- [x] ~~L04 Materi 5 — dot product~~ ✅ **passed 2026-10-07** (6 right, 1 half, 1 trap). All three promises paid: $\mathbf u\cdot\mathbf v=0$ as the one-line perpendicular test, the "length **and** direction" framing, and the NUMBER-not-arrow type trap
- [ ] **▶️ L04 Materi 6 — vector projection** (slide 10). Short, one formula. Open by cashing in his own Ex 5.6b discovery ($\lvert\mathbf v\rvert^2=\mathbf v\cdot\mathbf v$ → **no square roots**), and flag the $\lvert\mathbf v\rvert^2$ vs $\lvert\mathbf v\rvert$ trap up front. Full plan at the end of [[L04 Walkthrough (Gogo Gaga)]]
- [ ] L04 Materi 7 cross product (longest — the $\mathbf j$ minus sign) · Materi 8 lines & planes (re-test the $\pm$ habit here)
- [ ] **L05 Curves and Vector Functions** — map + overview + easy examples delivered 2026-10-19 ([[L05 Curves and Vector Functions]]). **Nothing practised yet.** Teach per materi with exercises, starting at Materi 1 (parametric curves). ⚠️ L05 Materi 7 needs L04 Materi 7 (cross product) first
- [ ] Re-offer **KDE Connect** so Ethan can send handwritten working from his tab
- [ ] **Set for Ethan (3 open):** $f(x)=x^2-4x+1$ on $[0,5]$ · $\int_1^4\frac{x^2+x}{x^{3/2}}dx$ · $\int_0^2x\sqrt{x^2+1}\,dx$ — ask for his attempt first
- [ ] Integration by parts (incl. twice), then trig integrals
- [ ] Improper integrals — Type I and II, the $p$-test
- [ ] More area between curves
- [ ] Lecture 3 live notes → [[L03 Integration]] (still empty)
- [ ] Still pending from L02: related rates, optimization word problems, 2nd-derivative test, concavity/inflection

## 🗺️ Folder map
```
memory/
├── 00 Index.md              ← you are here
├── Current Progress.md      ← read first on any device
├── Student Profile.md
├── Teaching Playbook.md
├── Lectures/                ← one note per lecture + the L04 walkthrough
├── Reference/               ← formula sheets
├── Practice/                ← exercise log + mistakes
├── Sessions/                ← session log
└── Ethan_Calculus_A_*.md    ← original handovers
```
