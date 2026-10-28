---
title: Common Mistakes
tags: [calculus-a, practice, mistakes]
updated: 2026-10-28
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

## Vectors & 3D geometry (L04, from the 2026-10-06 walkthrough)

> [!important] The one diagnosis that explains most of it
> **When a linear coefficient is POSITIVE, Ethan's sign flip is always right. When it is NEGATIVE, the flip disappears.**
> Cause: a negative coefficient forces a **minus times minus** ($-(-3)=+3$), which is his oldest weak spot. Not a new error — the old one wearing a new face.
> Fix: the one-line formula below removes the flip step entirely.
>
> **Update 2026-10-07 — the leak changed shape, and that is progress.** The *arithmetic* is fixed (Ex 5.1 had two minus-times-minus and both were right; Materi 3, 4 and 5 are all at zero sign errors). What remains is **completeness**: he stops after finding **one** solution when there are two (Ex 5.2, $k^2=4$).
> He owns the rule already — Ex 1.3 and Ex 4.5, both unprompted — but it is **attached to the wrong trigger**: *"there are $\lvert\cdot\rvert$ bars"* instead of *"a square is being opened"*. Same rule, since $\sqrt{k^2}=\lvert k\rvert$.
> Fix: widen the trigger. **Every time $(\cdot)^2=\text{number}$ appears, write $\pm$ first**, then look for a reason to discard the negative. Due for a re-test in Materi 8 (point-to-plane distance).

| Mistake | Fix |
|---|---|
| **Measuring a distance from the origin instead of from the given point** (Ex 1.3) | $S(1,1,1)$ to $T(1,1,k)$ is $\lvert k-1\rvert$, **not** $\lvert k\rvert$. Write $\Delta z=k-(\text{z of }S)$ explicitly on paper. $k=-6$ gives distance $7$, not $5$ |
| Forgetting that $\sqrt{(\cdot)^2}=\lvert\cdot\rvert$ gives **two** cases (Ex 1.3) | $\lvert k-1\rvert=5$ → $k=6$ **and** $k=-4$. The two answers are symmetric around the reference point, not around $0$ (check: their midpoint must be the reference) |
| Reading the sphere's center straight off $(x+3)^2$ as $+3$ (Ex 2.3) | The master form is $(x-x_0)$, so the **sign inside the bracket is the opposite** of the center's coordinate. Or skip it: $x_0=-\frac{\text{coefficient}}{2}$ |
| Paying a debt of $\frac b2$ instead of $\left(\frac b2\right)^2$ when completing the square (Ex 2.5) | $z^2-4z=(z-2)^2-\mathbf4$, not $-2$. Use $\text{debt}=x_0^2$ — it squares for you |
| Reporting $a=\sqrt{\text{RHS}}$ as the radius without the root | Right side is $a^2$. RHS $=25$ → radius $5$, not $25$ |
| Treating $a^2<0$ as an imaginary-radius sphere (Ex 2.5) | $a^2<0$ → **no real points at all, empty set.** $a^2>0$ sphere · $a^2=0$ a **single point** · $a^2<0$ nothing |
| **Expanding a sphere equation when the question didn't ask** (Ex 2.1) | Standard form *is* the complete answer, and it is more informative. Every extra step is an extra chance to lose the constant ($-2$ became $-20$) |
| "A vector is its distance" (Ex 3.4) | A vector is **length AND direction**. $\langle3,4,0\rangle$, $\langle5,0,0\rangle$, $\langle0,0,-5\rangle$ all have length $5$ but are three different vectors. **Two vectors are equal iff every component matches** |
| Writing $\lvert w\rvert10$ for "the vector of length 10 along $w$" (Ex 3.6) | $\lvert w\rvert$ is a **number** — the bars destroy the direction. Write $\frac{L}{\lvert\mathbf w\rvert}\mathbf w$, or here simply $2\mathbf w$. Scalars go **in front** of the vector, never behind |
| Mixing vector and scalar types in one equation | **Before writing $=$, check both sides are the same type.** arrow $=$ arrow ✓ · number $=$ number ✓ · arrow $=$ number ✗. $\mathbf u+5$ is nonsense |
| Reversing $\overrightarrow{PQ}$ and $\overrightarrow{QP}$ | **END minus START.** Unlike the distance formula there is no square to protect you — wrong order points the arrow backwards. $\overrightarrow{QP}=-\overrightarrow{PQ}$ |
| Dropping a "missing" component in $\mathbf i,\mathbf j,\mathbf k$ form | $2\mathbf i+5\mathbf k$ means $\langle2,\mathbf0,5\rangle$ — the $\mathbf j$ component is **zero, not absent**. Write the zero (this is the #1 cross-product killer in Materi 7) |
| Calling $k<0$ parallel vectors "same direction" (Ex 4.3) | $k>0$ same direction, $k<0$ **opposite** direction ($180^\circ$). Both still count as *parallel*, and $\mathbf u\times\mathbf v=\mathbf0$ does not distinguish them |

### Dot product (Materi 5, 2026-10-07)
| Mistake | Fix |
|---|---|
| **Stopping at one root of $k^2=4$** (Ex 5.2) | $k^2=4\Rightarrow\lvert k\rvert=2\Rightarrow k=\pm2$. Verified: $k=-2$ also gives $\mathbf u\cdot\mathbf v=0$, i.e. exactly $90^\circ$. **Write $\pm$ before computing**, then ask whether a length/radius justifies discarding the negative |
| Treating $\mathbf u\cdot(\mathbf v\cdot\mathbf w)$ as computable (Ex 5.4) | $\mathbf v\cdot\mathbf w$ is already a **NUMBER**, and "arrow dot number" does not exist. The dot product needs **two arrows**. Not "the answer is zero" — **there is no answer** |
| $(\mathbf u\cdot\mathbf v)+\mathbf w$ (Ex 5.4) | number $+$ arrow $=$ nonsense. This is the Materi 4 error $\mathbf u+5$ written backwards |
| Assuming the type check only has to be done once per problem | **The dot product changes the type mid-expression.** $\mathbf u+5$ is nonsense but $\mathbf u\cdot\mathbf v+5$ is fine, because the dot already turned the arrow into a number. **Re-check every line** |
| Expecting the symbol to tell you the operation | It does not — **the operands do.** Textbooks use the *same* dot for scalar multiplication and the dot product: number $\cdot$ arrow $=$ scalar multiple (arrow) · arrow $\cdot$ arrow $=$ dot product (number) · arrow $\cdot$ number $=$ ✗. Same for $\lvert\cdot\rvert$: **magnitude** around an arrow, **absolute value** around a number |
| Multiplying vectors component-by-component into a new vector | $\mathbf u\cdot\mathbf v$ is **one number**. The *summing* step is what kills the arrow — stop before summing and you still have three numbers |
| Computing magnitudes just to answer "acute or obtuse?" | Only the **sign** is needed. $\lvert\mathbf u\rvert\lvert\mathbf v\rvert$ is always positive, so $\operatorname{sign}(\cos\theta)=\operatorname{sign}(\mathbf u\cdot\mathbf v)$: $>0$ acute · $=0$ right · $<0$ obtuse. Ethan did this correctly in Ex 5.1b — keep it |
| Using the long route ($a^2+b^2-c^2=0$) for a perpendicularity test | $\mathbf u\perp\mathbf v\iff\mathbf u\cdot\mathbf v=0$. No magnitudes, no Pythagoras, no roots |
| Converting surds to decimals too early | Ex 5.3: keeping $\sqrt2\cdot\sqrt2$ unevaluated gives exactly $2$ and a clean $\cos\theta=\frac12$; decimals give $0.4999\ldots$ and hide the $60^\circ$ |
| Answering with $\cos\theta$ when the question asked for $\theta$ (Ex 5.5) | State the conclusion the question wants: $\theta=120^\circ$, not just $\cos120^\circ=-\frac12$ |
| Not using $\lvert\cos\theta\rvert\le1$ as an error check | $\cos\theta$ **cannot** exceed $1$ or fall below $-1$. Getting $1.4$ is not a strange angle, it is **arithmetic that went wrong**. Cheapest check in the whole topic |

### The formulas that replaced the error-prone routes
| Instead of | Use |
|---|---|
| halve → write bracket → read sign → flip | $x_0=-\dfrac{\text{coefficient}}2$, $\ \text{debt}=x_0^2$, $\ a^2=-(\text{const})+\sum\text{debt}$ |
| computing components then taking the root | $\lvert k\mathbf u\rvert=\lvert k\rvert\lvert\mathbf u\rvert$ |
| normalise then rescale | $\dfrac{L}{\lvert\mathbf w\rvert}\mathbf w$ in one step |

## Meta
- **Not verifying.** Every final answer gets a check → [[Verification Methods]].
- **Not simplifying first.** Trig identities or splitting fractions often make the problem much easier.
- **Picking the technique before looking.** Name *why* a rule applies before using it — see the "inside something?" test above.

## 🚨 Baris terakhir bocor (pola nomor satu — 7 kejadian pada 2026-10-27)
Penalarannya tidak pernah salah. Yang bocor selalu **baris terakhir**.

| Kejadian | Seharusnya |
|---|---|
| $(\pi+12)$ menjadi $(\pi+2)$ di baris akhir | $\pi+12$ |
| $9\times7=49$ | $63$ |
| $\dfrac{2}{x+1}$ di $x=0$ dijawab $1$ (penyebut saja) | $2$ — pembilangnya belum dibagi |
| $(2-y)^2=4+4y+y^2$ | $4-4y+y^2$ — suku tengah membawa minus |
| Jawaban soal 10 ditulis tanpa huruf $i$ | $\pm\tfrac{\sqrt7}{2}\pm i\tfrac{\sqrt{21}}{2}$ |
| Nama jalan ditukar dengan nilainya: "along $y=1$ dan $x=2$" | jalan $y=0$ beri nilai $2$ |
| Kurung hilang: $f'g+fg'$ tanpa kurung | $(f'g+fg')$ — tandanya bisa ikut terbalik |

**Obat 3 detik:** baca baris terakhir, bandingkan dengan baris di atasnya, pastikan tidak ada yang tertinggal.
**Harga perkiraan di ujian: 5–6 poin**, terhadap garis lulus 23 dari 45.

## Pangkat dan akar
| Mistake | Fix |
|---|---|
| $3^{-2}=\tfrac23$ dan $\tfrac1{x^{1/2}}=x^2$ — pangkatnya **dibalik** | Pangkat dapat **minus**, tidak dibalik: $\tfrac1{a^n}=a^{-n}$. Tangga: $3^2=9,3^1=3,3^0=1,3^{-1}=\tfrac13,3^{-2}=\tfrac19$. "Pindah lantai, bukan tukar angka." |
| $\left(\tfrac{7\sqrt3}{2}\right)^2$ hanya angkanya dikuadratkan | Semuanya ikut: $\tfrac{7^2(\sqrt3)^2}{2^2}=\tfrac{147}{4}$ |
| $\sqrt7\cdot\sqrt3$ dijadikan $\sqrt{10}$ atau $7\sqrt3$ | Akar kali akar digabung di dalam: $\sqrt{21}$ |
| $\pi$ diganti $\tfrac{22}{7}$ | Itu hampiran; ujian minta eksak. Kesalahan ini **menyebabkan** salah hitung berikutnya ($9\times7$). |

## Arah prosedur (maju vs mundur)
| Mistake | Fix |
|---|---|
| $\int\cos(5x)dx=-5\sin(5x)+C$ (menjalankan prosedur turunan) | **"Turunan KALI, integral BAGI."** Benar: $\tfrac15\sin(5x)+C$ |
| $\int\sin u\,du$ dijawab dengan turunan $\cos$ ($-\sin$) | $\int$ bertanya *"siapa yang kalau diturunkan jadi ini?"*. Lingkaran: $\sin\to\cos\to-\sin\to-\cos\to\sin$; turunan maju kanan, integral mundur kiri. ($\int\sin$ dan $\int\cos$ **ada di lembar rumus ujian** — tidak perlu dihafal) |
| Menghitung **nilai** padahal diminta **turunan** (soal 2a/2b) | "Kalau ada data yang tidak kamu pakai, kamu menjawab soal yang salah." |
| Menjawab $\lim_{x\to2}f'(x)$ padahal diminta $f'(2)$ | Itu jembatan, bukan tujuan. **Cek TIPE jawabannya.** |

## Multivariabel & kompleks (baru 2026-10-27)
| Mistake | Fix |
|---|---|
| Mengira dua jalan yang **sepakat** membuktikan limit ada | Tidak. Contoh tandingan $\tfrac{x^2y}{x^4+y^2}$: tiga jalan beri $0$, jalan $y=x^2$ beri $\tfrac12$. **Beda = bukti. Sama = belum apa-apa.** |
| $r\sin\theta$ ditukar menjadi $x$ | $\sin\to$ Opp $\to$ sisi tegak $\to y$. Gambar segitiganya — **ada di lembar rumus**. |
| Menurunkan **seluruh integran** saat mencari $du$ | $u$ hanya **satu potong** (isi kotak). Sisanya adalah barang yang ditukar jadi $du$. |
| Membaca $a=0$ dari $r^2+2r+5$ | $r^2$ berarti $1r^2$ — **$a=1$**. Angka 1 tidak pernah ditulis. |

## ⛔ Pemicu kemacetan nomor satu (bukan kesalahan — kesalahan pengajaran)
**Simbol baru yang tugasnya belum disebutkan membuatnya berhenti total.** Terjadi pada $\frac{dy}{dx}$, $u$, $\frac{\partial z}{\partial u}$, $e^{i\theta}$, dan $y(0)$ — semuanya dalam satu hari.
**Obat:** sebutkan **tugas** simbol itu dalam satu kalimat **sebelum** soal diberikan, bukan setelah dia macet. Matematikanya tidak pernah jadi masalah.

## 🚨 PANGKAT GENAP = DUA JAWABAN (pola nomor dua — 4 kejadian pada 2026-10-28)

| Kejadian | Ditulis | Seharusnya |
|---|---|---|
| Ex 5.2 lama | $k^2=4\Rightarrow k=2$ | $k=\pm2$ |
| Soal 5 | $x^2=4\Rightarrow x=2$ | $x=\pm2$ |
| Soal 8a | $x^8=1\Rightarrow x=1$ | $x=\pm1$ — kalau tidak, titik $(-1,-1)$ hilang |
| Latihan 8a | $x^2=1$ dibiarkan tidak diselesaikan | $x=\pm1$ |

**Obat:** tulis **±** dulu, baru cari alasan membuang yang negatif ("panjang tidak boleh negatif", "soal minta $x>1$). Jangan sebaliknya.
**Dan:** $\pm$ menempel pada **blok yang dikuadratkan**, bukan pada $x$. $(x-3)^2=4 \Rightarrow x-3=\pm2 \Rightarrow x=5$ atau $1$ — tetap dua, tapi bukan $\pm2$.

## 💀 Jangan membagi dengan huruf yang bisa bernilai nol (baru 2026-10-28)
| ❌ | ✅ |
|---|---|
| $x^9=x \Rightarrow$ bagi $x \Rightarrow x^8=1 \Rightarrow x=\pm1$ | $x^9-x=0 \Rightarrow x(x^8-1)=0 \Rightarrow x=0,\pm1$ |
| **titik kritis $(0,0)$ hilang diam-diam** | ketiga titik selamat |

Membagi dengan huruf membunuh akar nol. **Pindahkan ke satu ruas dan faktorkan**, lalu pakai "$A\cdot B=0 \Rightarrow A=0$ atau $B=0$" — aturan itu hanya berlaku terhadap nol.

## Kapan substitusi, kapan tidak (sistem titik kritis)
| Bentuk sistemnya | Caranya |
|---|---|
| Setiap persamaan **mencampur** $x$ dan $y$ (mis. $y=x^3$ dan $x=y^3$) | **substitusi** yang satu ke yang lain |
| Setiap persamaan **hanya satu huruf** (mis. $x^2=1$ dan $y=2$) | selesaikan sendiri-sendiri, lalu **pasangkan setiap $x$ dengan setiap $y$** |

## Minimum/maksimum pada selang tertutup
| Mistake | Fix |
|---|---|
| Hanya mengecek titik di mana $g'=0$ | **Calon = titik kritis di dalam + KEDUA ujung.** Jalur bisa berakhir di pagar sementara masih menurun. |
| Memakai $\vec n$ yang sudah disederhanakan untuk menghitung **luas** | Penyederhanaan boleh untuk **persamaan bidang** (arah sama), tidak boleh untuk **panjang**. Luas $=\tfrac12\lvert\vec n\text{ asli}\rvert$. |

## Notasi yang bisa memakan poin
| Tulisan ambigu | Bisa dibaca sebagai | Tulis begini |
|---|---|---|
| `1/1/2` | $\tfrac{1}{1}/2=\tfrac12$ (4× meleset) | $\dfrac{1}{1/2}=2$ |
| `6lnt/t` | $6\ln\tfrac{t}{t}=0$ | $\dfrac{6\ln t}{t}$ |
| $f'g+fg'$ tanpa kurung di dalam pecahan | tandanya ikut terbalik | $(f'g+fg')$ |
