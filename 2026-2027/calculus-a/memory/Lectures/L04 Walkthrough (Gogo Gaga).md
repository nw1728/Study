---
title: "L04 Walkthrough — Materi per Materi (Gogo Gaga, Bahasa Indonesia)"
lecture: 4
date: 2026-10-06
sessions: [2026-10-06, 2026-10-07]
tags: [calculus-a, lecture, vectors, 3d-geometry, walkthrough, bahasa-indonesia]
status: in-progress
updated: 2026-10-07
---

# 🧸 L04 Walkthrough — Materi per Materi

Back to [[00 Index]] · Teori dari slide: [[L04 Vectors and 3D Geometry]] · Latihan: [[Exercise Log]] · Error: [[Common Mistakes]]

> [!info] Apa ini
> Ethan minta Lecture 4 dijelaskan **per materi, satu-satu, dengan latihan di setiap materi**, dan **dicampur Bahasa Indonesia** (2026-10-06). Ini catatan jalannya — bukan ringkasan slide (itu di [[L04 Vectors and 3D Geometry]]), tapi **jalur pengajaran** lengkap dengan latihan, jawaban Ethan, dan koreksinya.
>
> Aturan main yang dipakai: **1 materi → latihan → Ethan kerjakan → koreksi → materi berikutnya.** Ethan hanya bisa mengirim **jawaban akhir** (tulisan tangan ada di Samsung Notes di tab, belum ada jalur transfer ke laptop). Itu ternyata cukup — pola error bisa direkayasa-balik dari angkanya.

## 🗺️ Peta 8 materi

| # | Materi | Slide | Status |
|---|---|---|--------|
| 1 | Koordinat 3D + jarak dua titik | 2–3 | ✅ lulus |
| 2 | Bola (sphere) + melengkapkan kuadrat | 4 | ✅ lulus |
| 3 | Vektor: bentuk komponen + panjang | 5–6 | ✅ lulus |
| 4 | Operasi vektor (tambah, kali skalar) | 7 | ✅ lulus |
| 5 | **Dot product** — sudut & tegak lurus | 8–9 | ✅ lulus |
| 6 | Proyeksi vektor (bayangan) | 10 | 🟡 diajarkan + ada visualizer; latihan belum dijawab |
| 7 | **Cross product** + luas + determinan | 11–17 | ⬜ **lanjut di sini** |
| 8 | Garis & bidang (+ jarak, sudut) | 18–24 | ⬜ |

---

# 📘 MATERI 1 — Koordinat 3D dan jarak dua titik

## Kalimat pembuka yang dipakai
**"3D itu bukan 2D yang lebih susah. 3D itu 2D PLUS SATU ANGKA."**

$$\text{2D: } \sqrt{(\Delta x)^2+(\Delta y)^2} \qquad\longrightarrow\qquad \text{3D: } \sqrt{(\Delta x)^2+(\Delta y)^2+\underbrace{(\Delta z)^2}_{\text{cuma nambah ini}}}$$

Analogi yang dipakai: **sudut kamar tidur.** Sudut = titik asal $O$, tiga rusuk = tiga sumbu. "Di mana lampunya?" → *"3 langkah ke kanan, 2 ke dalam, 1.5 ke atas"* = $(3,2,1.5)$.

- $x$ = ke kanan, $y$ = ke dalam, $z$ = ke atas
- *Mutually perpendicular axes* = ketiga rusuk saling $90^\circ$, seperti sudut kardus
- *Signed distances* = angkanya **boleh negatif**; $z=-4$ artinya 4 di bawah lantai

## Right-handed orientation (dilakukan pakai tangan)
```
jari tangan KANAN ke arah +x  ->  lengkungkan ke +y  ->  JEMPOL = +z
```
"A right-handed screw turns from $x$ to $y$ to advance along $z$" = **baut biasa**: diputar searah jarum jam, masuk ke dinding.

> [!warning] Kalau sumbu dipasang left-handed, SEMUA cross product (Materi 7) kebalik arah.

## Rumus jarak
$$|P_1P_2|=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2+(z_2-z_1)^2}$$

**Bahasa bayi:** *"Hitung selisih di tiap arah. Kuadratkan ketiganya. Jumlahkan. Akar."*

### Kenapa: Pythagoras DUA KALI
1. **Di lantai dulu** (lupakan tinggi): diagonal lantai $=\sqrt{(\Delta x)^2+(\Delta y)^2}$ — Pythagoras biasa.
2. **Sekarang naik:** diagonal lantai (mendatar) + $\lvert\Delta z\rvert$ (tegak) = **segitiga siku-siku baru**. Pythagoras lagi.
3. $(\text{diagonal lantai})^2$ membuat **akar yang pertama mati** — itu sebabnya rumus akhirnya bersih.

> [!tip] Instinct salah yang dibunuh dulu
> Ethan akan mau **mengurangkan titiknya** ($P_2-P_1$). Itu menghasilkan **panah**, bukan panjang. **Panjang selalu keluar dari akar.**

## Dua cek gratis
1. **Urutan tidak penting:** $(x_2-x_1)^2=(x_1-x_2)^2$ — kuadrat membunuh minus. (Beda dengan Materi 3, di mana urutan **sangat** penting.)
2. **Cek rentang:** $\text{selisih terbesar}\le\text{jarak}\le\text{jumlah semua selisih}$.

## Contoh yang dikerjakan
| Soal | Jalan | Jawaban |
|---|---|---|
| $(0,0,0)\to(3,4,12)$ | $9+16+144=169$ | $13$ (triple Pythagoras 3D) |
| $A(2,-1,5)\to B(-1,3,1)$ | $\Delta y=3-(-1)=4$ ⚠️ minus-minus; $9+16+16=41$ | $\sqrt{41}\approx6.403$ |

## ✍️ Latihan Materi 1 — jawaban Ethan
| # | Soal | Jawaban Ethan | Benar | Hasil |
|---|---|---|---|---|
| 1.1 | jarak $P(1,2,3)$–$Q(4,6,3)$ | $5$ | $5$ | ✅ |
| 1.2 | jarak $A(-2,1,4)$–$B(3,-3,-2)$ | $\sqrt{77}$ | $\sqrt{77}\approx8.775$ | ✅ |
| 1.3 | $S(1,1,1)$, $T(1,1,k)$, $\lvert ST\rvert=5$, cari $k$ | $k=6$ atau $-6$ | $k=6$ atau $k=-4$ | ⚠️ setengah |
| 1.4 | B/S: jarak $(5,0,0)$ ke $O$ = jarak $(0,0,-5)$ ke $O$ | benar | benar | ✅ |
| 1.5 | sisi segitiga $A(0,0,0)$, $B(4,0,0)$, $C(4,3,0)$; siku-siku? | "ya, tapi tidak bisa buktikan; harusnya $a^2+b^2-c^2=0$?" | $3,4,5$; siku-siku di $B$ | ✅ konsep |

### Koreksi 1.3 — jebakan utama materi ini
Instinct Ethan: *"jaraknya 5, berarti $k$ itu 5 langkah dari NOL"* → $\pm$ simetris di sekitar $0$.
**Tapi $S$ ada di $z=1$, bukan di $z=0$.**
$$\Delta z=k-1\ \ (\textbf{bukan } k)\quad\Rightarrow\quad \text{jarak}=\sqrt{(k-1)^2}=\lvert k-1\rvert=5$$
Nilai mutlak **selalu pecah jadi dua kasus:** $k-1=5\Rightarrow k=6$, atau $k-1=-5\Rightarrow k=-4$.

**Harga kesalahannya (Ethan percaya angka):** $k=-6$ memberi $\Delta z=-7$, jadi jarak $=7$, bukan $5$.

Garis bilangan: dua jawaban simetris di sekitar $z=1$, bukan di sekitar $0$. Cek cepat: titik tengah $-4$ dan $6$ adalah $1$ ✓

> [!note] Catatan bagus
> Pertanyaan "semua titik berjarak 5 dari $S$" **adalah definisi bola** — jadi 1.3 sebenarnya Materi 2 dalam bentuk mini. Dipakai sebagai jembatan ke materi berikutnya.

### Koreksi 1.5 — rumus Ethan sah, tinggal satu syarat
Ethan menebak sendiri $a^2+b^2-c^2=0$. **Itu persis tesnya** (cuma pindah ruas dari $a^2+b^2=c^2$). Yang kurang:

> [!warning] $c$ HARUS sisi terpanjang (hipotenusa)
> Bukti: pakai $c=4$ (bukan terpanjang) → $3^2+5^2-4^2=18\ne0$, kelihatan "tidak siku-siku" padahal siku-siku.

Pengerjaan penuh: $AB=4$, $BC=3$, $AC=5$ → $4^2+3^2-5^2=0$ ✓
**Siku-sikunya di $B$** — selalu di titik sudut yang **tidak dilewati sisi miring**. Masuk akal: $A\to B$ murni arah $x$, $B\to C$ murni arah $y$, dan $x\perp y$. Semua $\Delta z=0$ → segitiga terbaring datar di bidang $xy$.

Dijanjikan: **Materi 5 (dot product) akan membuat tes siku-siku jadi satu baris.**

---

# 📘 MATERI 2 — Bola dan melengkapkan kuadrat

## Definisi
Bola = **semua titik yang jaraknya tepat $a$ dari satu titik tetap $P_0$**. Analogi: tali 3 meter dipaku satu ujung, ujung lain ditarik kencang ke segala arah.

Ambil rumus jarak, set $=a$, kuadratkan kedua ruas untuk membunuh akar:
$$(x-x_0)^2+(y-y_0)^2+(z-z_0)^2=a^2$$

**Bahasa bayi:** *"jarak-ke-pusat dikuadratkan = jari-jari dikuadratkan."*

Lingkaran 2D: $(x-x_0)^2+(y-y_0)^2=r^2$. **Lagi-lagi 3D = 2D + satu suku.**

## ⚠️ Jebakan tanda
Rumus induk pakai **MINUS**: $(x-x_0)$. Jadi **tanda di dalam kurung adalah KEBALIKAN dari koordinat pusat**:

| Yang terlihat | Dibaca | $x_0$ |
|---|---|---|
| $(x+3)^2$ | $(x-(-3))^2$ | $-3$ ← negatif! |
| $(y-2)^2$ | sudah pas | $+2$ |
| $z^2$ | $(z-0)^2$ | $0$ |

Dan $a=\sqrt{\text{ruas kanan}}$ — **jangan lupa akarnya.** Ruas kanan $25$ → radius $5$, bukan $25$.

## Melengkapkan kuadrat
Soal ujian datang dalam **bentuk umum** yang berantakan. Pusat **hanya bisa dibaca** dari bentuk kuadrat sempurna.

$$x^2+bx=\left(x+\tfrac b2\right)^2-\left(\tfrac b2\right)^2$$

**Bahasa bayi:** *"Setengahkan angka di depan $x$, masukkan ke kurung, lalu kurangi kuadratnya di luar untuk BAYAR UTANG."*

**Kenapa bayar utang:** $(x+\frac b2)^2$ kalau dijabarkan = $x^2+bx+(\frac b2)^2$ — ada **selundupan** $(\frac b2)^2$ yang tidak ada di soal. Jadi harus dikurangi lagi. *Tambah lalu kurangi = nilai tidak berubah, cuma ganti baju.*

## 💊 Rumus satu baris (obat untuk dua error Ethan)
Jangan lewat jalur "setengahkan → tulis kurung → baca tanda → balik". Terlalu banyak kebocoran. Pakai:

$$\boxed{\;x_0=-\frac{\text{koefisien}}{2}\;}\qquad\boxed{\;\text{utang}=x_0^2\;}\qquad\boxed{\;a^2=-(\text{konstanta})+\textstyle\sum\text{utang}\;}$$

**Bahasa bayi:** *"ambil koefisiennya, bagi dua, kasih minus di depan. Itu pusatnya. Kuadratkan pusat itu — itu utangnya."*

**Enaknya:** minusnya **sudah tertulis sejak awal** (tidak bisa lupa), utangnya **otomatis dikuadratkan**, dan **tidak perlu menulis bentuk kurung sama sekali** kalau yang ditanya hanya pusat & radius.

Diuji di tiga soal, semua cocok:
| Soal | Hitungan | Hasil |
|---|---|---|
| $x^2+y^2+z^2+3x-4z+1=0$ (slide 4) | $x_0=-\frac32$ (utang $\frac94$), $z_0=2$ (utang $4$); $a^2=-1+\frac94+4$ | pusat $(-\frac32,0,2)$, $a=\frac{\sqrt{21}}2\approx2.291$ |
| $x^2+y^2+z^2-2x+6y-4z-11=0$ | $x_0=1,y_0=-3,z_0=2$; $a^2=11+1+9+4$ | pusat $(1,-3,2)$, $a=5$ |
| $x^2+y^2+z^2-6x+4y-2z-11=0$ (Lat 2.3) | $x_0=3,y_0=-2,z_0=1$; $a^2=11+9+4+1$ | pusat $(3,-2,1)$, $a=5$ |

## Posisi titik terhadap bola (keluar di ujian)
$$\text{jarak}(P_0,S)<a\ \Rightarrow\ \text{DI DALAM}\qquad =a\ \Rightarrow\ \text{DI PERMUKAAN}\qquad >a\ \Rightarrow\ \text{DI LUAR}$$
Pakai rumus jarak Materi 1. **Materi 1 + Materi 2 = soal ini.**

## ✍️ Latihan Materi 2 — jawaban Ethan
| # | Soal | Jawaban Ethan | Benar | Hasil |
|---|---|---|---|---|
| 2.1 | tulis persamaan bola, pusat $(1,-2,3)$, $a=4$ | $x^2+y^2+z^2-2x+4y-6z-20=0$ | $(x-1)^2+(y+2)^2+(z-3)^2=16$, atau bentuk umum dengan $\mathbf{-2}$ | ⚠️ konstanta |
| 2.2 | pusat & radius dari $(x+4)^2+(y-1)^2+z^2=9$ | $(-4,1,0)$, $a=3$ | sama | ✅ |
| 2.3 | pusat & radius dari $x^2+y^2+z^2-6x+4y-2z-11=0$ | $(-3,-2,-1)$, $a=5$ | $(3,-2,1)$, $a=5$ | ⚠️ 2 tanda |
| 2.4 | pusat & radius dari $x^2+y^2+z^2+2x=0$; lewat titik asal? | $(-1,0,0)$, $a=1$ (bagian 2 tak dijawab) | sama; **ya**, titik asal tepat di permukaan | ✅ |
| 2.5 | pusat & radius dari $x^2+y^2+z^2-4z+8=0$ | $(0,0,2)$, $a=\sqrt{-6}$ | $a^2=-4$ → **TIDAK ADA BOLA** | ⚠️ angka, tapi lulus konsep |

### Koreksi 2.1 — pelajarannya bukan aritmetika
Suku linearnya **benar semua** ($-2x,+4y,-6z$) — bagian tersulit justru lewat. Yang salah hanya konstanta: $1+4+9=14$, lalu $14-16=\mathbf{-2}$, bukan $-20$.

Harga kesalahan, pakai titik $(5,-2,3)$ yang harus di bola: versi $-20$ memberi $-18$ (bukan nol); versi $-2$ memberi $0$ ✓

> [!warning] Pelajaran sebenarnya: JANGAN MENJABARKAN KALAU TIDAK DIMINTA
> Soalnya cuma minta "tulis persamaan bola". **Bentuk standar sudah jawaban penuh, dan nol risiko.** Ethan mengerjakan langkah ekstra yang tidak diminta, dan di situlah nilainya bocor. Di Materi 2 bentuk standar bahkan **lebih informatif** (pusat & radius langsung terlihat), jadi menjabarkan membuat jawaban **lebih buruk**, bukan lebih baik.

### Koreksi 2.3 — DIAGNOSA PENTING
| var | koefisien | $x_0$ benar | jawaban Ethan | |
|---|---|---|---|---|
| $x$ | $-6$ (negatif) | $+3$ | $-3$ | ✗ |
| $y$ | $+4$ (positif) | $-2$ | $-2$ | ✓ |
| $z$ | $-2$ (negatif) | $+1$ | $-1$ | ✗ |

Dan di 2.4 koefisien $+2$ (positif) → Ethan benar.

> [!important] Penyakitnya
> **Koefisien POSITIF → flip tanda Ethan selalu benar. Koefisien NEGATIF → flip-nya hilang.**
> Sebabnya: koefisien negatif memaksa **minus dikali minus** ($-(-3)=+3$) — dan itu kelemahan lama Ethan yang sudah tercatat di [[Common Mistakes]]. Bukan error baru; **penyakit lama dengan wajah baru.**
> Radius $=5$ **benar**, jadi mekanisme bayar-utangnya sudah jalan. Yang bocor murni *membaca tanda pusat*.

### Koreksi 2.5 — Ethan LULUS ujian sebenarnya
Pusat $(0,0,2)$ benar (dan di sini koefisien negatif $-4$ **berhasil** di-flip jadi $+2$ — jadi dia *bisa*, cuma belum konsisten).

Error angkanya: **besar utang.** $z^2-4z=(z-2)^2-4$, utangnya $(-2)^2=4$, **bukan $2$**. Kalau utang $2$ → hasilnya $-6$ (jawaban Ethan); kalau utang $4$ → $4-8=\mathbf{-4}$.

**Tapi yang diuji di 2.5 adalah apakah Ethan percaya hitungannya sendiri — dan dia percaya.** Dia melaporkan akar bilangan negatif dan tidak memaksa memperbaikinya jadi angka "wajar". Itu kebiasaan yang benar dan layak dipuji.

$$a^2=-4\ \Rightarrow\ (\text{jarak})^2=-4$$
Ruas kiri kuadrat, **selalu $\ge0$**. Mustahil. **Jawaban benar: TIDAK ADA BOLA, himpunan kosong.** (Istilah aman di ujian: *"tidak ada titik real yang memenuhi"*.)

> [!tip] Tiga kemungkinan — hafalkan
> $a^2>0$ → bola sejati · $a^2=0$ → **satu titik** saja (degenerate) · $a^2<0$ → **tidak ada apa-apa**

Bukti kosong: di pusat $(0,0,2)$ ruas kiri $=4$, dan itu **nilai terkecil yang mungkin** (semua kuadrat nol di pusat). Minimum global $4$, kita butuh $0$ → tidak mungkin dari mana pun ✓ *(Ini pakai ide ekstrem absolut dari Lecture 2.)*

---

# 📘 MATERI 3 — Vektor: bentuk komponen dan panjang

## Instinct salah yang dibunuh dulu
> **Titik itu TEMPAT. Vektor itu PERJALANAN.**

$(3,4,0)$ = "ada tanda di lokasi ini." $\langle3,4,0\rangle$ = "jalan 3 ke kanan, 4 ke depan, 0 ke atas."

## Vektor = panah, dengan DUA informasi
1. **Magnitude** (panjang) — seberapa jauh
2. **Direction** (arah) — ke mana

Habis. Tidak ada informasi ketiga. $\overrightarrow{AB}$ = panah dari $A$ (*initial point*, ekor) ke $B$ (*terminal point*, kepala).

## Kalimat terpenting slide 5
> **"Dua vektor SAMA jika panjangnya sama DAN arahnya sama."**

**Tidak ada kata "titik awalnya sama."** Vektor **bebas digeser** (*free vector*). Panah yang sama digambar di Enschede dan di Jakarta tetap **vektor yang sama**.

**Analogi (anak embedded):** *"maju 5 km ke timur laut"* itu **satu instruksi** — sama saja dijalankan dari rumah atau dari kampus. Instruksinya tidak peduli di mana kamu mulai. Bandingkan: *"kampus UT"* itu **lokasi** = titik.

## Bentuk komponen
Geser panahnya sampai ekornya di titik asal; lalu panah itu cukup dijelaskan oleh **di mana kepalanya mendarat**.

> [!warning] Konvensi kurung — dosen ketat
> `( )` kurung **bulat** → **TITIK** · `< >` kurung **lancip** → **VEKTOR**
> (Di PDF slide, kurung lancip jadi simbol aneh `→v1, v2↑` — itu cuma gagal ekstrak teks.)

## Ujung minus awal
$$\overrightarrow{PQ}=\langle x_2-x_1,\ y_2-y_1,\ z_2-z_1\rangle$$
**Bahasa bayi: UJUNG MINUS AWAL.** *Kepala dikurangi ekor. Tujuan dikurangi posisi sekarang.* Logika bodoh tapi benar: *"berapa jauh aku harus jalan di arah $x$? Ya selisih $x$-nya."*

> [!warning] Di SINI urutan SANGAT penting (beda dengan Materi 1)
> Di Materi 1 ada kuadrat yang membunuh minus. Di sini tidak. $\overrightarrow{PQ}=-\overrightarrow{QP}$ — **salah urutan = panahmu menunjuk ke arah sebaliknya.**

## Magnitude
$$|\mathbf v|=\sqrt{v_1^2+v_2^2+v_3^2}$$
**Bukan rumus baru** — ini rumus jarak Materi 1 pakai topi berbeda.

> [!warning] $|\mathbf v|$ artinya PANJANG, bukan nilai mutlak biasa, dan hasilnya **selalu angka, bukan panah**.

## Vektor satuan $\mathbf i,\mathbf j,\mathbf k$
$\mathbf i=\langle1,0,0\rangle$, $\mathbf j=\langle0,1,0\rangle$, $\mathbf k=\langle0,0,1\rangle$ — masing-masing panjangnya 1.
$$\langle3,-2,5\rangle\ \equiv\ 3\mathbf i-2\mathbf j+5\mathbf k$$
**Dua bahasa, satu makna.** Dosen ganti-ganti sesuka hati.

> [!warning] Komponen yang "hilang" itu NOL
> $2\mathbf i+5\mathbf k$ artinya $\langle2,0,5\rangle$ — komponen $\mathbf j$-nya **nol, bukan hilang**. **Tulis nolnya.** Ini penyebab error nomor satu di cross product (Materi 7).

## Normalisasi
$$\text{vektor satuan arah }\mathbf v=\frac{\mathbf v}{|\mathbf v|}$$
**Bahasa bayi:** *"bagi panah dengan panjangnya sendiri, maka dia jadi panjang 1 tapi arahnya tetap."*

Contoh: $\mathbf v=\langle2,-1,2\rangle$, $|\mathbf v|=3$, satuan $=\langle\frac23,-\frac13,\frac23\rangle$. Cek: $\sqrt{\frac49+\frac19+\frac49}=\sqrt1=1$ ✓

## ✍️ Latihan Materi 3 — jawaban Ethan (6/6 angka benar)
| # | Soal | Jawaban Ethan | Hasil |
|---|---|---|---|
| 3.1a | $\overrightarrow{PQ}$, $P(2,-1,4)$, $Q(5,3,-2)$ | $\langle3,4,-6\rangle$ | ✅ |
| 3.1b | $\overrightarrow{QP}$ | $\langle-3,-4,6\rangle$ *"kebalik karena arahnya kebalik"* | ✅ |
| 3.1c | $\lvert\overrightarrow{PQ}\rvert$ | $\sqrt{61}\approx7.810$ | ✅ |
| 3.2 | $\lvert\langle-2,6,-3\rangle\rvert$ | $7$ | ✅ |
| 3.3 | $3\mathbf i-4\mathbf j+12\mathbf k$ → komponen & panjang | $13$ | ✅ ($\langle3,-4,12\rangle$) |
| 3.4 | $\overrightarrow{AB}$ ($A(1,1,1)\to B(4,5,1)$) vs $\overrightarrow{CD}$ ($C(0,0,0)\to D(3,4,0)$) sama? | "sama, karena vektor itu **jaraknya**, terlepas dari letaknya" | ✅ jawaban, ⚠️ alasan |
| 3.5 | satuan arah $\langle1,2,2\rangle$ | $\langle\frac13,\frac23,\frac23\rangle$ | ✅ |
| 3.6 | arah $\langle0,3,-4\rangle$, panjang $10$ | $\langle0,6,-8\rangle$ — *"$\lvert w\rvert10$, bener ga sih simbolnya gitu?"* | ✅ angka, ⚠️ notasi |

**Prestasi ronde ini: NOL error tanda.** Di 3.1 Ethan menghitung $3-(-1)=4$ dengan benar — minus-minus yang menjatuhkannya dua kali di Materi 2.

### Koreksi 3.4 — satu kata yang berbahaya
*"terlepas dari letaknya"* → **benar sekali**, itu inti soalnya. Tapi *"vektor itu jaraknya"* → **bahaya.** Vektor itu **panjang DAN arah**.

Bukti numerik: $\langle3,4,0\rangle$, $\langle5,0,0\rangle$, $\langle0,0,-5\rangle$ — **ketiganya panjang 5**, tapi **tiga vektor berbeda** (miring / ke kanan / ke bawah). Kalau "vektor = jarak", ketiganya jadi sama — jelas salah.

> [!important] Versi yang benar
> **Dua vektor sama ⟺ semua komponennya sama** — karena komponen identik menjamin panjang **dan** arah identik sekaligus.

**Kenapa keras soal satu kata ini:** di Materi 5 Ethan harus membedakan dua panah yang **panjangnya sama tapi arahnya beda** (itu gunanya dot product). Kalau di kepalanya "vektor = jarak", Materi 5 tidak akan masuk akal.

### Koreksi 3.6 — notasi (Ethan bertanya sendiri, bagus)
$\lvert w\rvert10$ **salah**: $\lvert w\rvert$ sudah mengubah panah jadi **angka** ($=5$), jadi tulisannya berbunyi "5 10" — tanpa operasi, tanpa makna. Dan yang dimaksud sebenarnya **panah**, padahal $\lvert w\rvert$ justru membuang arahnya.

Tiga cara menulis yang benar:
$$10\cdot\frac{\mathbf w}{|\mathbf w|}\qquad\text{atau}\qquad \mathbf u=\frac{\mathbf w}{|\mathbf w|},\ \ 10\mathbf u\qquad\text{atau (paling elegan)}\qquad 2\mathbf w$$
$2\mathbf w$ karena faktor peregangannya $=\frac{10}{|\mathbf w|}=\frac{10}5=2$ — **satu baris, nol pecahan.**

> [!important] Aturan notasi — dipakai terus
> | Tulisan | Jenis |
> |---|---|
> | $\mathbf w$ | panah |
> | $\lvert\mathbf w\rvert$ | **ANGKA** (panjangnya) — garis dua MEMBUNUH arahnya |
> | $3\mathbf w$ | panah, skalar ditulis di **DEPAN** |
> | $\mathbf w3$ | ✗ jangan |
>
> **Aturan emas: sebelum menulis $=$, cek ruas kiri dan kanan jenisnya sama tidak?** Panah $=$ panah ✓ · Angka $=$ angka ✓ · **Panah $=$ angka ✗ SELALU SALAH.**

### Rumus umum yang lahir dari 3.6
$$\text{arah }\mathbf w,\text{ panjang }L:\qquad \frac{L}{|\mathbf w|}\,\mathbf w$$
**Bahasa bayi:** *"panjang yang kamu mau, dibagi panjang yang kamu punya — itu faktor peregangannya."*

---

# 📘 MATERI 4 — Operasi vektor

Materi **paling santai** di Lecture 4. Semuanya **komponen per komponen**, tidak ada jebakan baru.

## Penjumlahan
$$\mathbf u+\mathbf v=\langle u_1+v_1,\ u_2+v_2,\ u_3+v_3\rangle$$
**Bahasa bayi:** *"$x$ sama $x$, $y$ sama $y$, $z$ sama $z$. Jangan pernah dicampur."*

**Arti fisik:** **jalankan perjalanan $\mathbf u$, lalu dari situ jalankan $\mathbf v$.** Panah tunggal dari titik awal ke titik akhir = $\mathbf u+\mathbf v$. Namanya **ujung-ke-ekor** (*tip-to-tail*). Langsung masuk akal dari Materi 3: vektor = instruksi perjalanan, menjumlahkan = menjalankan dua instruksi berturut-turut.

## Perkalian skalar
$$k\mathbf u=\langle ku_1,ku_2,ku_3\rangle$$
| $k$ | efek |
|---|---|
| $2$ | 2× lebih panjang, arah **sama** |
| $\frac12$ | setengahnya, arah **sama** |
| $-1$ | panjang **sama**, arah **berbalik** $180^\circ$ |
| $-3$ | 3× lebih panjang **dan** berbalik |
| $0$ | jadi vektor nol |

> [!important] Ide yang dibawa ke Materi 7
> **Perkalian skalar TIDAK BISA memindahkan panah dari garisnya** — cuma mengubah panjang dan maju/mundur. Makanya $\mathbf u=k\mathbf v$ adalah **definisi SEJAJAR**. Dipakai untuk bidang sejajar (slide 22) dan uji cross product (slide 14).

## Pengurangan
$\mathbf u-\mathbf v=\mathbf u+(-\mathbf v)$ — tidak ada aturan baru.
**Bonus geometris:** $\mathbf u-\mathbf v$ adalah panah **dari ujung $\mathbf v$ ke ujung $\mathbf u$** — "ujung minus awal" Materi 3 lagi, pemainnya sekarang vektor.

## Jalan pintas penghemat waktu
$$|k\mathbf u|=|k|\cdot|\mathbf u|$$
**Bahasa bayi:** *"kalau panahnya direntang $k$ kali, panjangnya juga jadi $k$ kali."*
$\lvert k\rvert$ pakai nilai mutlak karena merentang dengan $-3$ membuat panahnya **3× lebih panjang** — **panjang tidak pernah negatif.**

## Daftar 9 sifat di slide — jangan dihafal
Semuanya **aturan aritmetika biasa sejak SD**. Vektor berperilaku seperti angka untuk $+$ dan $\times$skalar. Yang penting justru **apa yang TIDAK ada di daftar:**

> [!warning] $\mathbf u+5$ TIDAK ADA
> panah $+$ panah $=$ panah ✓ · angka $\times$ panah $=$ panah ✓ · **panah $+$ angka $=$ ✗ omong kosong**
> Ini **persis error notasi 3.6**, dalam bentuk lain. Kebiasaan *cek-jenis* akan menyelamatkan Ethan di Materi 5–8, karena di sana dot product menghasilkan **angka** dan cross product menghasilkan **panah** — dan mencampurnya adalah error nomor satu Lecture 4.

## Contoh (dari slide 7): $\mathbf u=\langle-1,3,1\rangle$, $\mathbf v=\langle4,7,0\rangle$
| | Jawaban |
|---|---|
| $2\mathbf u+3\mathbf v$ | $\langle10,27,2\rangle$ |
| $\mathbf u-\mathbf v$ | $\langle-5,-4,1\rangle$ |
| $\lvert\frac12\mathbf u\rvert$ | $\frac{\sqrt{11}}2\approx1.658$ (lewat jalan pintas: $\frac12\sqrt{11}$) |

## ✍️ Latihan Materi 4 — jawaban Ethan (6/6 benar)
| # | Soal | Jawaban Ethan | Hasil |
|---|---|---|---|
| 4.1a | $\mathbf u+\mathbf v$, $\mathbf u=\langle2,-1,3\rangle$, $\mathbf v=\langle-1,4,0\rangle$ | $\langle1,3,3\rangle$ | ✅ |
| 4.1b | $3\mathbf u$ | $\langle6,-3,9\rangle$ | ✅ |
| 4.1c | $2\mathbf u-3\mathbf v$ | $\langle7,-14,6\rangle$ | ✅ ($4-(-3)=7$ ✓) |
| 4.2 | $\lvert\frac17\mathbf u\rvert$, $\mathbf u=\langle6,-2,3\rangle$ | $1$ | ✅ |
| 4.3 | $\langle2,-4,6\rangle$ ∥ $\langle-3,6,-9\rangle$? cari $k$, arah? | sejajar, $k=-\frac32$ (arah tak dijawab) | ✅ ⚠️ arah |
| 4.4 | mana bermakna: $\langle1,2,3\rangle+\langle4,5,6\rangle$ / $+7$ / $7\cdot$ / $\lvert\cdot\rvert+7$ | bermakna $\langle5,7,9\rangle$ / omong kosong / bermakna $\langle7,14,21\rangle$ / bermakna $\sqrt{14}+7$ | ✅✅✅✅ |
| 4.5 | semua $c$ dengan $\lvert c\langle1,-2,2\rangle\rvert=12$ | $c=4$ atau $c=-4$ | ✅ dua-duanya! |
| 4.6 | titik tengah $A(1,0,2)$, $B(3,2,-1)$ | $M(2,1,\frac12)$ | ✅ |

### Koreksi 4.3 — nuansa arah
$k=-\frac32$ **benar**, dan Ethan mengecek ketiga komponen konsisten (itu caranya). Tapi pertanyaan arah belum dijawab:
$$k>0\ \Rightarrow\ \text{sejajar, arah SAMA }(0^\circ)\qquad k<0\ \Rightarrow\ \text{sejajar, arah BERLAWANAN }(180^\circ)$$
Kasus ini $k$ **negatif** → arahnya **berlawanan**, dan 1.5× lebih panjang. **Dua-duanya tetap disebut "sejajar"** dalam definisi buku (garisnya sama) — dan uji $\mathbf u\times\mathbf v=\mathbf 0$ di Materi 7 juga **tidak membedakan** $0^\circ$ dan $180^\circ$.

### Catatan untuk 4.4 dan 4.5
- **4.4:** Ethan menalar lewat **jenis** ("panah + angka") — persis kebiasaan yang ditanamkan di 3.6. Error notasi sudah jadi antibodi. Keempat nilainya juga benar.
- **4.5:** $\lvert c\rvert\cdot3=12\Rightarrow\lvert c\rvert=4\Rightarrow c=\pm4$. **Pelajaran 1.3 nempel** — dia dapat dua jawaban tanpa diingatkan.
- **4.6:** dikerjakan cara vektor ($A+\frac12\overrightarrow{AB}$), dicek dengan rumus titik tengah SMA. Dua jalur, satu jawaban. Cara vektor ini yang nanti dipakai di Materi 8 untuk persamaan garis.

---

# 📘 MATERI 5 — Dot product (sudut & tegak lurus)

Diajarkan **2026-10-07**. Materi pertama di Lecture 4 yang **mengubah jenis**: dua panah masuk, **satu angka** keluar.

## Tiga instinct salah yang dibunuh dulu
1. **"Kali dua vektor ya kali komponennya, jadi panah baru."** Salah — hasilnya **ANGKA**, panahnya mati.
2. **"Kalau cuma angka, itu pasti panjangnya."** Bukan panjang — yang diukur adalah **ARAH**.
3. **"Vektor itu jaraknya"** (error 3.4 yang harus dibereskan sebelum materi ini). Dot product adalah **alat untuk mengukur bagian arahnya**; kalau vektor cuma jarak, tidak ada arah untuk diukur.

## Rumus
$$\mathbf u\cdot\mathbf v=u_1v_1+u_2v_2+u_3v_3\qquad(\textbf{ANGKA})$$
**Bahasa bayi:** *"kalikan pasangan sejenis — $x$ dengan $x$, $y$ dengan $y$, $z$ dengan $z$ — lalu JUMLAHKAN jadi satu angka."*

> [!important] Kata kuncinya **JUMLAHKAN**
> Penjumlahan itulah yang membunuh panahnya. Berhenti sebelum menjumlahkan → masih tiga angka (panah). Setelah dijumlahkan → satu angka, tidak ada arah lagi.

## Kenapa benda ini ada: dia mengukur sudut
$$\cos\theta=\frac{\mathbf u\cdot\mathbf v}{|\mathbf u||\mathbf v|},\qquad 0\le\theta\le\pi$$

**Analogi yang dipakai (gaya engineering): dorong kotak.**
| cara mendorong | dot product |
|---|---|
| lurus searah jalannya kotak | **besar** (tenaga masuk semua) |
| miring | sedang |
| tegak lurus (tekan ke bawah, kotak jalan ke depan) | **NOL** — tidak membantu sama sekali |
| ke belakang (menahan) | **negatif** |

Di fisika ini memang rumus kerja: $W=\mathbf F\cdot\mathbf d$.

## Sifat jembatan — yang menyatukan Materi 3 dan 5
$$\mathbf u\cdot\mathbf u=u_1^2+u_2^2+u_3^2=|\mathbf u|^2\qquad\Longrightarrow\qquad |\mathbf u|=\sqrt{\mathbf u\cdot\mathbf u}$$
**Bahasa bayi:** *"dot product sebuah vektor dengan dirinya sendiri = panjangnya dikuadratkan."* Itu **persis isi dalam akar** rumus panjang Materi 3.

## Turunan rumus $\cos\theta$ (dikerjakan penuh, Ethan suka bagian "kenapa")
Segitiga dari $\mathbf u$ dan $\mathbf v$ yang ekornya ketemu; sisi ketiga $=\mathbf u-\mathbf v$.
1. **Aturan cosinus:** $|\mathbf u-\mathbf v|^2=|\mathbf u|^2+|\mathbf v|^2-2|\mathbf u||\mathbf v|\cos\theta$
2. **Jabarkan pakai sifat jembatan:** $(\mathbf u-\mathbf v)\cdot(\mathbf u-\mathbf v)=\mathbf u\cdot\mathbf u-2\,\mathbf u\cdot\mathbf v+\mathbf v\cdot\mathbf v=|\mathbf u|^2-2(\mathbf u\cdot\mathbf v)+|\mathbf v|^2$
3. **Sandingkan**, coret $|\mathbf u|^2$ dan $|\mathbf v|^2$, bagi $-2$:
$$\mathbf u\cdot\mathbf v=|\mathbf u||\mathbf v|\cos\theta$$

✅ **Cek numerik langkah 2** dengan $\mathbf u=\langle1.3,-2.1,0.7\rangle$, $\mathbf v=\langle-0.4,1.1,2.2\rangle$: kedua ruas $=15.380$ ✓

## Janji #1 dibayar — tes tegak lurus jadi satu baris
$$\mathbf u\perp\mathbf v\iff\mathbf u\cdot\mathbf v=0$$
Karena $\cos90^\circ=0$, jadi pembilangnya harus nol. **Tidak perlu panjang, tidak perlu Pythagoras, tidak perlu akar.**
Ini menggantikan jalan panjang yang Ethan turunkan sendiri di Latihan 1.5 ($a^2+b^2-c^2=0$).
*Orthogonal = tegak lurus = perpendicular* — tiga kata, satu arti.

## Tanda dot product = jenis sudut
Penyebut $|\mathbf u||\mathbf v|$ **selalu positif**, jadi **tanda $\cos\theta$ = tanda dot product**.

| $\mathbf u\cdot\mathbf v$ | $\theta$ | nama |
|---|---|---|
| $>0$ | $0^\circ$–$90^\circ$ | **lancip** (*acute*) |
| $=0$ | tepat $90^\circ$ | **tegak lurus** |
| $<0$ | $90^\circ$–$180^\circ$ | **tumpul** (*obtuse*) |

> [!tip] Hadiah gratis
> Pertanyaan "lancip atau tumpul?" dijawab **tanpa menghitung panjang sama sekali** — cukup lihat tandanya. Jangan pernah hitung akar untuk pertanyaan ini.

Ekstrem: $\theta=0$ → $\mathbf u\cdot\mathbf v=|\mathbf u||\mathbf v|$ (maksimum) · $\theta=\pi$ → $-|\mathbf u||\mathbf v|$ (minimum).
Dot product **membedakan** arah sama vs berlawanan (positif vs negatif) — catatan: cross product di Materi 7 **tidak bisa**.

## Contoh yang dikerjakan
| # | Soal | Jalan | Jawaban |
|---|---|---|---|
| W1 | $\langle2,3,-1\rangle\cdot\langle4,-1,5\rangle$ | $8-3-5$ | $0$ → **tegak lurus** ($90.0000^\circ$ ✓) |
| W2 | sudut $\langle2,0,0\rangle$, $\langle3,3,0\rangle$ | $6/(2\cdot3\sqrt2)=\frac1{\sqrt2}$ | $45^\circ$ ✓ |
| W3 | sudut $\langle1,2,2\rangle$, $\langle-2,-2,-1\rangle$ | $-8/9$ | $152.73^\circ$ (tumpul) ✓ |

**Pengamatan bonus dari W2:** ganti $\mathbf u$ jadi $\langle100,0,0\rangle$, sudutnya **tetap** $45^\circ$. Penyebut $|\mathbf u||\mathbf v|$ tugasnya **membuang panjang** supaya tersisa cuma arah. **Sudut tidak peduli panjang.**

## Sifat-sifat (slide 9) — dan yang TIDAK ada di daftar
| Sifat | Bahasa bayi |
|---|---|
| $\mathbf u\cdot\mathbf v=\mathbf v\cdot\mathbf u$ | **urutan tidak penting** (beda dengan $\overrightarrow{PQ}$ vs $\overrightarrow{QP}$!) |
| $(c\mathbf u)\cdot\mathbf v=c(\mathbf u\cdot\mathbf v)$ | skalar ditarik keluar |
| $\mathbf u\cdot(\mathbf v+\mathbf w)=\mathbf u\cdot\mathbf v+\mathbf u\cdot\mathbf w$ | boleh dibagikan |
| $\mathbf u\cdot\mathbf u=\lvert\mathbf u\rvert^2$ | sifat jembatan |
| $\mathbf 0\cdot\mathbf u=0$ | vektor nol dot apa pun = angka $0$ |

> [!warning] $\mathbf u\cdot(\mathbf v\cdot\mathbf w)$ tidak ada dan tidak akan pernah ada
> $\mathbf v\cdot\mathbf w$ sudah jadi **ANGKA**, dan operasi "panah dot angka" tidak ada. Dot product **wajib dua panah**.

### Cek-jenis versi Materi 5
| Ekspresi | Jenis | Sah? |
|---|---|---|
| $\mathbf u\cdot\mathbf v$ | ANGKA | ✓ |
| $(\mathbf u\cdot\mathbf v)\mathbf w$ | angka × panah = PANAH | ✓ (kali skalar) |
| $\mathbf u\cdot\mathbf v+3$ | angka + angka = ANGKA | ✓ |
| $\mathbf u\cdot(\mathbf v\cdot\mathbf w)$ | panah dot angka | ✗ |
| $\mathbf u\cdot\mathbf v+\mathbf w$ | angka + panah | ✗ |

> [!important] Pelajaran besar yang muncul di sini
> $\mathbf u\cdot\mathbf v+3$ **sah**, padahal $\mathbf u+5$ omong kosong (Materi 4). Bedanya: dot product **sudah mengubah jenisnya** dari panah ke angka.
> **Jenis bisa berubah di tengah ekspresi — jadi cek-jenis harus dilakukan setiap baris, bukan sekali di awal.**

## Cek gratis yang ditanamkan
1. **$\cos\theta$ WAJIB di $[-1,1]$.** Dapat $1.4$ → bukan sudut aneh, itu **salah hitung**. Cek aritmetika termurah di materi ini.
2. **Tanda dulu, angka kemudian.** Tanda dot product sudah memberi jenis sudut; kalau $\arccos$-nya melanggar, ada salah ketik.
3. **$\mathbf u\cdot\mathbf u$ harus positif** dan harus $=|\mathbf u|^2$ — pakai untuk mengecek panjang.

## Resep 3 baris
```
1. u . v  = kalikan pasangan sejenis, JUMLAHKAN -> satu ANGKA
2. tanda  = jenis sudut:  + lancip | 0 tegak lurus | - tumpul
3. sudut  = cos(theta) = (u.v)/(|u||v|), lalu arccos
```

## ✍️ Latihan Materi 5 — jawaban Ethan (6 benar, 1 setengah, 1 kena jebakan) — **LULUS**
| # | Soal | Jawaban Ethan | Hasil |
|---|---|---|---|
| 5.1a | $\langle2,-3,4\rangle\cdot\langle-1,5,3\rangle$ | $-5$ | ✅ (dua minus-minus, dua-duanya benar) |
| 5.1b | jenis sudutnya, **tanpa hitung panjang** | tumpul, "karena minus" | ✅ penalaran tepat ($99.03^\circ$) |
| 5.2 | **semua** $k$ dengan $\langle k,-2,3\rangle\perp\langle k,5,2\rangle$ | $k=2$ | ⚠️ **hilang $k=-2$** |
| 5.3 | sudut $\langle1,1,0\rangle$, $\langle0,1,1\rangle$ | $\cos\theta=\frac12$, $\theta=60^\circ$ | ✅ |
| 5.4 | sah atau omong kosong (5 ekspresi) | "semuanya sah" | ❌ **jebakan** — (b) dan (e) omong kosong |
| 5.5 | sudut dari $\lvert u\rvert=5$, $\lvert v\rvert=4$, $\mathbf u\cdot\mathbf v=-10$ | $\cos120^\circ=-\frac12$ | ✅ |
| 5.6a | $\mathbf u\cdot\mathbf u$ untuk $\langle2,-3,6\rangle$ | $49$ | ✅ |
| 5.6b | $\lvert\mathbf u\rvert$ tanpa hitung ulang akar | $7$, dengan alasan benar | ✅✅ |

### Koreksi 5.2 — akar negatifnya hilang
$\mathbf u\cdot\mathbf v=k^2-10+6=k^2-4$. Sampai $k^2=4$ **sempurna**; langkah terakhirnya yang bocor.
$$k^2=4\ \Longrightarrow\ |k|=2\ \Longrightarrow\ k=+2\ \textbf{atau}\ k=-2$$
✅ Dibuktikan dengan angka: $k=-2$ memberi $\langle-2,-2,3\rangle\cdot\langle-2,5,2\rangle=4-10+6=0$ → **tegak lurus juga**, $90.0000^\circ$. Tabel $k=-3\ldots3$ ditunjukkan supaya terlihat hanya ada **dua** akar.

> [!important] Diagnosis: pemicunya terpasang di tempat yang salah
> Ethan **sudah bisa** aturan ini — Latihan 1.3 ($k=6$ dan $-4$) dan 4.5 ($c=\pm4$), dua-duanya tanpa diingatkan. Tapi dia memasangnya ke pemicu **"ada tanda $\lvert\cdot\rvert$"**, bukan ke pemicu **"ada kuadrat yang dibuka"**.
> Aturannya sama, karena $\sqrt{k^2}=\lvert k\rvert$ — tanda mutlak itu cuma kuadrat yang sudah dibuka.
> **Latihan mental yang diberikan:** setiap kali muncul $(\cdot)^2=\text{angka}$, tulis $\pm$ **dulu**, baru tanya "ada alasan membuang yang negatif?" (panjang/radius tidak boleh negatif). Tidak ada alasan → dua-duanya jawaban.
> Akan diuji lagi di **Materi 8** (jarak titik ke bidang punya nilai mutlak di pembilangnya).

### Koreksi 5.4 — jebakannya, dan pertanyaan Ethan yang menjelaskan kenapa dia kena
Ethan menjawab "semuanya ada arti" **dan bertanya**: *"apakah $*$ dan $\cdot$ itu sama?"* — pertanyaan terbaik di sesi ini, karena **itu tepat akar masalahnya**: kalau dia tidak yakin operasinya apa, dia tidak bisa tahu jenis hasilnya, jadi cek-jenisnya **tidak mungkin dijalankan**. Kebingungan notasi di **hulu**, errornya di **hilir**.

| Ekspresi | Jenis | Putusan |
|---|---|---|
| (a) $(\mathbf u\cdot\mathbf v)+7$ | angka + angka | ✅ sah |
| (b) $\mathbf u\cdot(\mathbf v\cdot\mathbf w)$ | panah dot angka | ❌ omong kosong |
| (c) $(\mathbf u\cdot\mathbf v)\mathbf w$ | angka × panah = panah | ✅ sah (kali skalar) |
| (d) $\lvert\mathbf u\cdot\mathbf v\rvert$ | nilai mutlak sebuah angka | ✅ sah |
| (e) $(\mathbf u\cdot\mathbf v)+\mathbf w$ | angka + panah | ❌ omong kosong |

**Inti jebakannya:** (a) sah tapi (e) tidak — bedanya cuma benda terakhirnya. **Satu huruf mengubah soal sah jadi omong kosong.**
(e) adalah error $\mathbf u+5$ dari Materi 4, ditulis mundur.

> [!important] Jawaban untuk pertanyaan $*$ vs $\cdot$ — simpan, ini kunci membaca notasi Lecture 4
> Dijawab **jujur**, termasuk bagian yang membingungkan: **di buku teks dan di slide, kali skalar ($c\,\mathbf u$) dan dot product ($\mathbf u\cdot\mathbf v$) sering memakai titik yang SAMA.** Jadi Ethan memang berhak bingung — di chat titiknya saya pisah ($*$ vs $\cdot$), di ujian tidak.
> **Cara membedakannya: lihat JENIS benda di kiri dan kanan titik.**
> | kiri · kanan | operasinya | hasilnya |
> |---|---|---|
> | angka · panah | kali skalar | PANAH |
> | panah · panah | dot product | ANGKA |
> | angka · angka | kali biasa | ANGKA |
> | panah · angka | — | ✗ tidak ada |
>
> **Simbolnya tidak memberi tahu operasinya. BENDANYA yang memberi tahu.** Itu sebabnya cek-jenis bukan hiasan — itu satu-satunya cara membaca notasi ini.
> Hal yang sama berlaku untuk $\lvert\cdot\rvert$: **panjang** kalau isinya panah, **nilai mutlak** kalau isinya angka.

### Catatan untuk jawaban yang benar
- **5.1b:** Ethan **tidak menyentuh panjang** sama sekali — padahal $\lvert u\rvert=5.3852$, $\lvert v\rvert=5.9161$, akar jelek. Itu disiplin, bukan kebetulan.
- **5.3:** dia **membiarkan bentuk akar** sampai akhir, jadi $\sqrt2\cdot\sqrt2$ mati bersih jadi $2$ → $\cos\theta=\frac12$ eksak, bukan $0.4999\ldots$. Kebiasaan yang harus dijaga.
- **5.5:** **tidak ada satu komponen pun diberikan** dan dia tetap dapat sudutnya. Pelajarannya: rumus sudut cuma butuh **tiga angka** (dot product + dua panjang); komponen itu cuma jalan untuk mendapatkannya, bukan bahan wajib. Perlu diingatkan: tulis kesimpulannya terang-terangan ($\theta=120^\circ$), bukan hanya $\cos120^\circ=-\frac12$.
- **5.6b:** dia **menemukan sifat jembatan sendiri** dari angkanya (*"u.u kan jadinya u^2 semua, jadi tinggal akar 49"*) — dan kali ini **dia percaya** pada penemuannya, tidak seperti di Latihan 1.5. Kemajuan sikap, bukan cuma kemampuan.
- **Sifat jembatan ini langsung dipakai di Materi 6**, karena rumus proyeksi punya $\lvert\mathbf v\rvert^2$ di penyebut — dan $\lvert\mathbf v\rvert^2=\mathbf v\cdot\mathbf v$ dihitung **tanpa akar sama sekali**. Ethan sudah menemukan sendiri trik yang membuat Materi 6 gampang; tagih itu di awal Materi 6.

---

# 📘 MATERI 6 — Proyeksi vektor (bayangan)

Diajarkan **2026-10-07**. Materi pendek: satu slide, satu rumus utama. Dibuka dengan **menagih temuan Ethan sendiri dari 5.6b** — karena $\lvert\mathbf v\rvert^2=\mathbf v\cdot\mathbf v$, rumus proyeksi vektor **tidak punya akar sama sekali**. Rumus yang kelihatan menakutkan itu sudah dia buat gampang sendiri, sehari sebelumnya.

> [!important] 🧰 Ada visualizer untuk materi ini — Ethan yang MINTA
> [Bayangan Vektor](https://claude.ai/artifact/Ff6iJ5L3aBUcUx4PXTukF6) · lokal: `html-visualization/vector-projection.html`
> Dibuat di tengah materi ini karena Ethan bilang *"aku agak gak ngerti soal bayangan ini, bisakah kamu buatin aku html visualizer?"* — **pertama kali dia meminta tool sendiri** (sebelumnya selalu ditawarkan). Catat polanya: kalau ide geometris tidak mendarat lewat teks, dia sekarang **minta gambar**, bukan diam.

## Tiga instinct salah yang dibunuh dulu
1. **"Proyeksi = memotong u jadi lebih pendek."** Bukan memotong — **memindahkan u ke garisnya v**. Arahnya ikut v (atau kebalikan v), bukan potongan u.
2. **"$\text{proj}_{\mathbf v}\mathbf u=\text{proj}_{\mathbf u}\mathbf v$."** Urutan **penting**. Di Materi 5 $\mathbf u\cdot\mathbf v=\mathbf v\cdot\mathbf u$ sehingga urutan tidak penting — kebiasaan itu **tidak boleh dibawa** ke sini.
3. **"Ada dua rumus mirip, pakai saja yang mana."** Dua rumus itu **beda jenis hasilnya**, dan tertukarnya $\lvert\mathbf v\rvert$ dengan $\lvert\mathbf v\rvert^2$ adalah kesalahan nomor satu di materi ini.

## Analogi yang dipakai: tiang miring dan tanah
$\mathbf v$ = **tanah**, $\mathbf u$ = **tiang miring**, matahari tepat di atas menyinari **tegak lurus tanah**. $\text{proj}_{\mathbf v}\mathbf u$ = **bayangan tiang di tanah**.

Dua sifat yang mendefinisikannya (dan yang dipakai menurunkan rumusnya):
1. $\text{proj}_{\mathbf v}\mathbf u$ **sejajar** $\mathbf v$ — bayangan ada *di* tanah.
2. **sisanya** $\mathbf u-\text{proj}_{\mathbf v}\mathbf u$ **tegak lurus** $\mathbf v$ — sinarnya turun tegak lurus.

## Turunan rumus — dua alat Materi 5, tidak ada yang baru
1. **Sifat 1** → sejajar = kelipatan (Materi 4), jadi $\text{proj}_{\mathbf v}\mathbf u=c\,\mathbf v$. **Tugasnya tinggal mencari satu angka $c$.**
2. **Sifat 2** → pakai tes tegak lurus satu baris dari Materi 5: $(\mathbf u-c\mathbf v)\cdot\mathbf v=0$
3. **Distributif** (slide 9): $\mathbf u\cdot\mathbf v-c(\mathbf v\cdot\mathbf v)=0$
4. $c=\dfrac{\mathbf u\cdot\mathbf v}{\mathbf v\cdot\mathbf v}$
5. **Sifat jembatan 5.6b**: $\mathbf v\cdot\mathbf v=\lvert\mathbf v\rvert^2$

$$\boxed{\ \text{proj}_{\mathbf v}\mathbf u=\frac{\mathbf u\cdot\mathbf v}{\lvert\mathbf v\rvert^2}\,\mathbf v\ }\qquad\qquad \text{komponen skalar}=\lvert\mathbf u\rvert\cos\theta=\frac{\mathbf u\cdot\mathbf v}{\lvert\mathbf v\rvert}$$

(Rumus skalar diturunkan dengan memasukkan $\cos\theta$ Materi 5 ke $\lvert\mathbf u\rvert\cos\theta$ — **$\lvert\mathbf u\rvert$-nya mati**.)

> [!tip] Seluruh Materi 6 adalah Materi 5 yang dipakai dua kali
> Langkah 2 memakai "dot $=0$ artinya tegak lurus"; langkah 5 memakai temuan Ethan sendiri. Tidak ada alat baru di materi ini.

## ⚠️ Jebakan utama: kenapa satu $\lvert\mathbf v\rvert^2$ dan satunya $\lvert\mathbf v\rvert$
**Jangan dihafal.** Panah $=$ panjang $\times$ arah, jadi:
$$\text{proj}_{\mathbf v}\mathbf u=\underbrace{\frac{\mathbf u\cdot\mathbf v}{\lvert\mathbf v\rvert}}_{\text{panjang bayangan}}\times\underbrace{\frac{\mathbf v}{\lvert\mathbf v\rvert}}_{\text{arah satuan}}=\frac{\mathbf u\cdot\mathbf v}{\lvert\mathbf v\rvert^2}\mathbf v$$

> [!important] $\lvert\mathbf v\rvert^2$ itu **dua $\lvert\mathbf v\rvert$ dengan dua pekerjaan**
> $\lvert\mathbf v\rvert$ pertama → menghitung **PANJANG** bayangannya.
> $\lvert\mathbf v\rvert$ kedua → mengubah $\mathbf v$ jadi **ARAH SATUAN**.
> Versi skalar cuma butuh panjang → **satu** $\lvert\mathbf v\rvert$. Versi vektor butuh panjang **dan** arah → **dua**.
> Ini mengikat langsung ke koreksi 3.4: **vektor = panjang DAN arah.** Kalau vektor dibaca "cuma jarak", $\lvert\mathbf v\rvert^2$ akan selamanya terasa acak.

## Cek-jenis sebagai pengingat rumus (bukan cuma penangkap error)
| Jawaban yang diminta | Penyebut yang benar |
|---|---|
| berbentuk $\langle\cdot,\cdot,\cdot\rangle$ | $\lvert\mathbf v\rvert^2$ |
| berbentuk satu angka | $\lvert\mathbf v\rvert$ |

**Jenis jawabannya memberi tahu rumus mana yang benar** — tidak perlu menghafal. Ini kebiasaan 4.4/5.4 yang naik pangkat jadi alat.

## Contoh yang dikerjakan
| # | Soal | Hasil |
|---|---|---|
| W2 | $\langle3,4,0\rangle$ ke $\langle1,0,0\rangle$ | $\text{proj}=\langle3,0,0\rangle$, skalar $3$ |
| W1 | **slide 10:** $\langle6,3,2\rangle$ ke $\langle1,-2,-2\rangle$ | $\mathbf u\cdot\mathbf v=-4$, $\mathbf v\cdot\mathbf v=9$, $\text{proj}=\langle-\frac49,\frac89,\frac89\rangle$, skalar $-\frac43$ ✓ |
| W3 | urutan dibalik: $\text{proj}_{\mathbf u}\mathbf v$ dengan $\mathbf u=\langle3,4,0\rangle$, $\mathbf v=\langle1,0,0\rangle$ | $\langle\frac9{25},\frac{12}{25},0\rangle$, panjang $0.6$ — **beda 5× dari $\text{proj}_{\mathbf v}\mathbf u$** |

**Pengamatan W2 yang paling membantu:** bayangan $\langle3,4,0\rangle$ di sumbu-$x$ adalah $\langle3,0,0\rangle$ — **persis komponen $x$-nya.**
> **Proyeksi ke sumbu = membaca komponennya.** Materi 6 menjelaskan apa arti notasi komponen yang dia pakai sejak Materi 3.

**Dari W1:** $\lvert\text{proj}\rvert=\frac{12}9=\frac43=\lvert{-\frac43}\rvert$ ✓, dan $\theta=100.98^\circ$ (tumpul) konsisten dengan tanda negatifnya. Ditekankan: **tanda negatif bukan panjang negatif** — artinya bayangannya di sisi berlawanan dari $\mathbf v$.

## Empat cek gratis yang ditanamkan
1. $\lvert\text{proj}_{\mathbf v}\mathbf u\rvert=\lvert\text{komponen skalar}\rvert$ — dua rumus, satu panjang.
2. $\lvert\text{proj}_{\mathbf v}\mathbf u\rvert\le\lvert\mathbf u\rvert$ — **bayangan tidak boleh lebih panjang dari tiangnya.** Cek ini yang langsung menangkap jebakan $\lvert\mathbf v\rvert$ vs $\lvert\mathbf v\rvert^2$.
3. Tanda komponen skalar $=$ tanda $\mathbf u\cdot\mathbf v$.
4. $\text{proj}_{\mathbf v}\mathbf u$ harus **kelipatan** $\mathbf v$ — komponennya proporsional dengan komponen $\mathbf v$.

## ✍️ Latihan Materi 6 — ⏳ BELUM DIJAWAB (diberikan 2026-10-07)
| # | Soal | Kunci (jangan dibocorkan sebelum dia mencoba) |
|---|---|---|
| 6.1 | $\langle4,1,-2\rangle$ ke $\langle2,-1,2\rangle$: proj + komponen skalar | $\mathbf u\cdot\mathbf v=3$, $\mathbf v\cdot\mathbf v=9$, $c=\frac13$ → $\langle\frac23,-\frac13,\frac23\rangle$; skalar $=1$ |
| 6.2 | $\langle1,2,2\rangle$ ke $\langle-2,-2,-1\rangle$: komponen skalar + arahnya | $-\frac83$, **berlawanan** arah $\mathbf v$ |
| 6.3 | $\langle5,0,0\rangle$ ke $\langle3,4,0\rangle$: proj, skalar, lalu bandingkan $\lvert\text{proj}\rvert$ dengan $\lvert\mathbf u\rvert$ | $\langle\frac95,\frac{12}5,0\rangle$; skalar $3$; $3\le5$ ✓ masuk akal |
| 6.4 | apakah $\text{proj}_{\mathbf v}\mathbf u=\text{proj}_{\mathbf u}\mathbf v$? mana yang lebih panjang? | **tidak sama**; $\langle3,0,0\rangle$ (panjang $3$) vs $\langle\frac9{25},\frac{12}{25},0\rangle$ (panjang $0.6$) |
| 6.5 | cek-jenis: (a) $\text{proj}_{\mathbf v}\mathbf u+\mathbf u$ (b) $(\text{proj}_{\mathbf v}\mathbf u)\cdot\mathbf v$ (c) $\text{proj}_{\mathbf v}\mathbf u+\lvert\mathbf u\rvert$ (d) $\text{proj}_{\mathbf v}(\mathbf u\cdot\mathbf v)$ | sah · sah · **✗** · **✗** |
| 6.6 | kasus ekstrem: (a) $\mathbf u\perp\mathbf v$ (b) $\mathbf u\parallel\mathbf v$ | (a) $\mathbf 0$ (b) $\mathbf u$ sendiri |

> [!warning] Yang harus diawasi saat mengoreksi
> - **6.1 dan 6.3:** apakah $\lvert\mathbf v\rvert$ tertukar dengan $\lvert\mathbf v\rvert^2$. Di 6.3 rute salah memberi $\langle9,12,0\rangle$ — panjang $15$, **tiga kali lebih panjang dari $\mathbf u$**, dan 6.3(c) memang dirancang supaya keabsurdannya kelihatan sendiri.
> - **6.2:** tanda negatifnya hilang atau tidak. Dia bisa mengeceknya sendiri — pasangan ini sama dengan contoh W3 Materi 5 ($152.73^\circ$, tumpul), jadi jawabannya **wajib** negatif.
> - **6.5:** apakah kebiasaan cek-jenis akhirnya pegang setelah jatuh di 5.4. Dua yang omong kosong, sama seperti 5.4.
> - **6.6:** jawaban konseptual. Visualizer sengaja **tidak** memberi preset tegak-lurus/sejajar; sebagai gantinya ada **tiga tantangan geser** supaya dia menemukannya sendiri lalu merumuskannya dengan kata-katanya.

---

# 📈 Perkembangan Ethan selama walkthrough ini

| | Materi 1 | Materi 2 | Materi 3 | Materi 4 | Materi 5 |
|---|---|---|---|---|---|
| Error tanda (aritmetika) | 1 | 3 | **0** | **0** | **0** |
| Error kelengkapan (akar hilang) | 1 | 0 | 0 | 0 | 1 |
| Error konsep | 0 | 0 | 0 | 0 | 0 |
| Error notasi/bahasa | 0 | 0 | 1 | 0 | 1 (jebakan) |
| Skor angka | 4.5/5 | 2.5/5 | 6/6 | 6/6 | 6.5/8 |

**Kesimpulan:** konsepnya **paham di semua materi**. Yang bocor di Materi 1–2 murni **aritmetika tanda**, dan setelah rumus satu baris ($x_0=-\frac{\text{koef}}2$) plus kebiasaan cek-jenis diberikan, **bocornya berhenti total** mulai Materi 3.

> [!important] Pola yang tersisa setelah Materi 5 — bentuknya BERUBAH, dan itu kabar baik
> Dulu: salah **menghitung** minus (minus × minus hilang). Sekarang sudah sembuh — di 5.1 dua minus-minus dua-duanya benar.
> Sekarang: salah **kelengkapan** — berhenti setelah menemukan **satu** jawaban padahal ada dua ($k^2=4$).
> Jadi bukan aritmetikanya lagi, tapi **pemicu "tulis $\pm$"-nya yang terlalu sempit** (terpasang di $\lvert\cdot\rvert$, belum di kuadrat).

**Hal-hal yang terbawa dengan baik antar materi:**
- Nilai mutlak → **dua jawaban** (1.3 → 4.5, tanpa diingatkan) — tapi **belum** terbawa ke kuadrat (5.2)
- Cek-jenis panah vs angka (3.6 → 4.4) — diuji keras di 5.4, perlu diperkuat
- Jalan pintas $\lvert k\mathbf u\rvert=\lvert k\rvert\lvert\mathbf u\rvert$ (4.2)
- Membiarkan jawaban dalam bentuk akar, tidak memaksa jadi desimal (3.x, dan lagi di 5.3)
- **Memakai jalan pintas yang diajarkan, bukan jalan panjangnya** (5.1b: tanda saja, tanpa panjang)
- **Bertanya kalau notasinya bikin ragu** (3.6, dan lagi di 5.4) — selalu beri penghargaan, ini kelas error termurah

---

# ⏭️ Lanjut dari sini — Materi 7

**Cross product** (slide 11–17). **Materi terpanjang di Lecture 4.**

Urutan isinya: definisi (tegak lurus keduanya, $\lvert\mathbf u\rvert\lvert\mathbf v\rvert\sin\theta$, right-handed) → rumus komponen → tabel $\mathbf i\mathbf j\mathbf k$ → sifat (anticommutative!) → uji sejajar → luas jajaran genjang → bentuk determinan.

Yang harus diperhatikan saat mengajarnya:
1. **Minus di $\mathbf j$ adalah pembunuhnya.** Bentuk determinan punya $-\mathbf j$ di depan minornya. Gabungkan dengan kebocoran lamanya (tanda negatif) → ini titik risiko tertinggi di seluruh Lecture 4.
2. **Tulis komponen nol secara eksplisit.** Peringatan dari 3.6 ($2\mathbf i+5\mathbf k$ berarti $\langle2,\mathbf 0,5\rangle$) baru benar-benar menggigit di sini — ini penyebab error cross product nomor satu.
3. **Cek-jenis berbalik arah lagi:** Materi 5 menghasilkan **angka**, Materi 6 menghasilkan **panah dan angka**, Materi 7 menghasilkan **panah**. Setelah 5.4 dan 6.5, sebutkan jenisnya di tiap langkah.
4. **Cek gratis yang kuat:** $(\mathbf u\times\mathbf v)\cdot\mathbf u$ dan $(\mathbf u\times\mathbf v)\cdot\mathbf v$ **harus dua-duanya nol.** Itu memakai Materi 5 untuk memeriksa Materi 7 — dan dia suka cek numerik seperti ini.
5. **Dot $=0$ → tegak lurus. Cross $=\mathbf 0$ → sejajar.** Sandingkan eksplisit; dan ingatkan bahwa cross **tidak membedakan** $0^\circ$ dari $180^\circ$ (sudah dijanjikan di koreksi 4.3).
6. **Pertimbangkan membuat visualizer lagi** — right-hand rule adalah hal tersulit di Lecture 4 untuk disampaikan lewat teks, dan Ethan sekarang sudah terbukti memakai tool-nya. Pola dari `vector-projection.html` bisa dipakai ulang.

Lalu Materi 8 (garis & bidang) — **di situ kebiasaan $\pm$ diuji ulang** lewat jarak titik ke bidang.
