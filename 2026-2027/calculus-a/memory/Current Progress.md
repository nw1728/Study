---
title: Current Progress
tags: [calculus-a, progress, exam]
updated: 2026-10-26
last_device: "Arch laptop (nw1728) — via Remote Control, Ethan on claude.ai web GUI"
---

# 📍 Current Progress — continue from here

Back to [[00 Index]] · History: [[Session Log]] · Rencana: [[#🗺️ Roadmap sampai hari ujian]]

> [!danger] 🚨 MODE UJIAN — ini mengalahkan semua rencana lama
> **Ujian Kalkulus A: Rabu 4 November 2026, 08:45–11:45.** Hari ini 26 Oktober → **9 hari.**
> Ethan ambil **202001172 (4 EC)**: soal **1–9**, maksimum **36 poin**, nilai $=1+\text{poin}\times\frac14$, **lulus di 18 poin**.
> Soal 10 & 11 (bilangan kompleks, PD orde dua) **tidak perlu sama sekali**.
> Rencana lama (L04 Materi 6–8 per materi, lalu L05 dari awal) **ditunda** — sekarang semuanya diurutkan berdasarkan poin per jam. Lihat roadmap di bawah.

> [!important] 🧮 ATURAN MENULIS MATH DI CHAT — sudah diuji langsung dengan Ethan (2026-10-26)
> Ethan memakai **claude.ai web GUI** lewat `/remote-control`. Hasil tes:
>
> | Cara tulis | Hasil di layarnya |
> |---|---|
> | `$$...$$` di baris sendiri | ✅ **dirender, paling bagus** — pakai ini untuk rumus penting |
> | `\(...\)` di tengah kalimat | ✅ dirender — pakai ini untuk sisipan pendek |
> | `$...$` | ❌ **RUSAK**, muncul sebagai dolar mentah. **Jangan dipakai sama sekali.** |
>
> Kalimatnya sendiri: *"tes a sama tes b muncul, tapi tes b lebih bagus"*.
> ⚠️ Sempat salah dua kali hari ini sebelum dites betul — pertama dikira semua render, lalu dikira tidak ada yang render. **Jangan menyimpulkan dari "all good"; tes dengan dua contoh berbeda.**
> Aturan lama "plain text, no LaTeX" di [[Teaching Playbook]] dan [[00 Index]] **hanya berlaku kalau dia kembali ke terminal.**

> [!important] 📸 Dia sekarang BISA kirim foto tulisan tangan (2026-10-26)
> Lewat aplikasi Claude di tab-nya. **Ini pertama kalinya** — selama ini diagnosis harus ditebak dari jawaban akhir saja.
> **Minta foto setiap kali ada kesalahan**, jangan cuma jawaban akhir. Kesalahan nomor 2 hari ini ketahuan persis karena fotonya.
> KDE Connect **tidak perlu lagi ditawarkan**.

> [!important] Format mengajar — tetap dipakai
> **Per materi, satu-satu, latihan di tiap materi, campur Bahasa Indonesia**, register **gogo gaga**.
> Loop: 1 materi → jelaskan → 5–6 latihan → tunggu jawabannya → koreksi satu per satu → materi berikutnya.
> Resep lengkap: [[Teaching Playbook]].

## Last session
- **Date:** 2026-10-26 (Senin)
- **Type:** Hari pertama mode ujian. Sample exam dibedah, soal 1 & 2 dikerjakan, aturan turunan di-refresh, roadmap 9 hari dibuat.
- **What happened:**
  - Ethan menjalankan **`/remote-control`** → sekarang belajar lewat **claude.ai web GUI**. **LaTeX dirender** (dikonfirmasi langsung) dan **dia bisa mengirim foto tulisan tangan**. Dua hambatan terbesar selama ini hilang dalam satu sesi.
  - `sample_exam/112025exam_with_solutions.pdf` dibaca lengkap (5 halaman, 11 soal + kunci). Setiap bagian dipetakan ke materi yang sudah/belum dia kuasai.
  - **Temuan utama:** cuma **10 dari 36 poin** berasal dari materi yang pernah kita pelajari. Tapi **soal 6, 7, 8, 9 (17 poin) itu soal RESEP** — paling mekanis di seluruh ujian — sementara **soal 1 (4 poin) justru yang paling susah** dan sudah dia kerjakan. Strategi: panen poin resep dulu.
  - **Lecture 6+ ternyata sudah diajarkan di kelas, tapi Ethan bolos / tidak paham.** Jadi soal 6–9 harus **diajarkan dari nol**, bukan di-review. ⚠️ **Slide lecture 6+ belum ada di `lectures_slides/` — minta dia kirim.**
  - Dua halaman dibuat (lihat Tools di bawah): **halaman ujian interaktif** dan **roadmap 9 hari yang bisa dicentang**.
  - Jadwal dia sendiri diterima apa adanya: Sel–Kam kalkulus, Jum–Min aljabar linear (ulangan Senin 2 Nov), Sel 3 Nov kalkulus lagi, Rab 4 Nov ujian.

## 🧮 Peta ujian — 202001172 (4 EC), 36 poin

| Soal | Poin | Materi | Status Ethan |
|---|---|---|---|
| 1a,1b,1c | 4 | Limit + L'Hôpital | 🟢 **dikerjakan 26 Okt** — 1b benar, 1a/1c penalaran benar tapi penyajian gugur |
| 2a,2b | 4 | Hasil kali, hasil bagi, rantai | 🔴 **dua-duanya salah 26 Okt** — menghitung nilai, bukan turunan |
| 3a | 2 | Substitusi | 🟢 sudah dikuasai (Ex 23, 29, 31…) |
| 3b | 2 | Integral parsial | 🟠 belum diajarkan — sisa L03 |
| 4a,4b | 4 | Cross product, bidang, garis | 🟠 belum — L04 Materi 7 & 8 |
| 5 | 3 | Polar → Cartesius | 🟠 belum — L05 Materi 4 (catatan sudah ada) |
| 6 | 4 | Limit multivariabel tidak ada | ⚪ belum — **TAPI PALING MUDAH, 1 jam** ⭐ |
| 7 | 4 | Rantai multivariabel | ⚪ belum — resep |
| 8a,8b | 5 | Titik kritis + min pada ruas | ⚪ belum — resep |
| 9 | 4 | PD linear orde satu | ⚪ belum — resep (faktor integrasi) |

**Poin aman sekarang: ~2** (cuma 1b). **Target Kamis malam: 36 poin pernah disentuh semua.**

## 🗺️ Roadmap sampai hari ujian
Versi lengkap yang bisa dicentang: **[Roadmap Ujian Kalkulus](https://claude.ai/artifact/JbWyN4VqhEpptjK3sjtxxs)** (salinan lokal `html-visualization/roadmap-ujian.html`).

| Hari | Isi | Poin terkunci |
|---|---|---|
| Sen 26 | **Istirahat** (dia kurang fit). Maks: selesaikan 1c + 2b | — |
| **Sel 27** | Pagi: **aturan turunan, 6 latihan — WAJIB** · Siang: soal 1c + 2 · Sore: **soal 6** | 14 |
| **Rab 28** | Soal **9** (PD) · soal **7** (rantai multivar) · soal **3b** (integral parsial) | 24 |
| **Kam 29** | Soal **8** · soal **4** · soal **5** · tulis **kartu resep** 1 halaman | 36 |
| Jum 30 – Min 1 | **Aljabar Linear** + **15 menit kalkulus/hari (jangan bolos)** | 36 |
| Sen 2 | Ulangan Aljabar Linear — kalkulus **nol** | — |
| **Sel 3** | **Sample #2, simulasi 3 jam**, lalu koreksi + tambal pakai #3 | — |
| **Rab 4** | **UJIAN** 08:45–11:45 | — |

> [!warning] Dua aturan keras
> 1. **Tidak ada materi baru setelah Kamis 29.** Yang belum masuk, relakan.
> 2. **Selasa 3 malam berhenti jam 9.** Tidur itu bagian strategi.

> [!tip] 4 sample exam — jangan dihabiskan di awal
> **#1** (ada kuncinya) = buku pelajaran, Sel–Kam · **#2** = simulasi jujur, Selasa 3 (🔒 jangan disentuh sebelumnya) · **#3** = tambal soal yang gagal di #2 · **#4** = cadangan.

## ▶️ Continue with (besok, Selasa 27)
1. **Pagi — 6 latihan aturan turunan** yang sudah diberikan dan **belum dijawab**:
   $x^5-3x^2+7$ · $x^3e^x$ · $\sin(4x^2)$ · $\frac{x^2}{x+1}$ · jebakan konseptual $(x^2\cdot x^3)'\overset{?}{=}2x\cdot3x^2$ · $\frac{1}{x^2+1}$ **dua cara** (nomor 6 ini kerangka soal 2a persis).
2. **Soal 1c** — dia sudah tahu jawabannya $f'(2)=\frac12$; yang diminta sekarang **menulis justifikasi 3 kalimat**. Itu latihan yang sebenarnya.
3. **Soal 2b** — dia sudah dapat isi dalam $=1$ ✅; tinggal ganti $f\to f'$ dan kalikan turunan dalam. Jawaban: $f'(1)\cdot(g'(1)-2)=2\cdot(-3)=\mathbf{-6}$. **Jangan diberikan sebelum dia coba.**
4. **Soal 6 — limit multivariabel tidak ada.** Ajarkan dari nol, format per materi. Resepnya: dekati lewat $y=0$, lalu lewat $x=0$; hasil beda → limit tidak ada. Jawaban sample: $2$ vs $0$.
5. **Minta slide lecture 6 ke atas** untuk `lectures_slides/`.
6. **Minta dia cek isi formula sheet** yang dilampirkan di ujian — kalau rumus cross product / faktor integrasi ada di situ, beban hafalan turun drastis.

## Watch out for (right now)
- 🔴 **POLA NOMOR SATU: penalaran benar, kalimat terakhir hilang.** Muncul **empat kali** dalam satu sesi:
  | Soal | Penalaran | Yang hilang |
  |---|---|---|
  | 1a | ✅ | kesimpulan $\lim f(x)=5$ tidak ditulis |
  | 1b | ✅ | syarat $\lim A\neq0$ tidak ditulis |
  | 1c | ✅ | berhenti di $\lim_{x\to2}f'(x)$, bukan di $f'(2)$ |
  | Ex 5.5 (lama) | ✅ | $\theta$ tidak ditulis |
  Di ujian ini tertulis *"Answers without explanation will not receive credit."* **Mantra yang sudah diberikan: setelah menghitung, baca ulang pertanyaannya, lalu tanya "tipe jawabannya apa, sudah ditulis belum?"** Harga pola ini di soal 1 saja ≈ 1,5 dari 4 poin.
- 🔴 **Menghitung NILAI, bukan TURUNAN** (baru, 26 Okt, soal 2a **dan** 2b). Tandanya: **tabel punya 4 kolom, dia cuma pakai 2** — kolom $f'$ dan $g'$ tidak disentuh. Aturan: *kalau soal memberi data yang tidak kamu pakai, kamu sedang menjawab soal yang salah.*
- 🔴 **Aturan turunan sudah pudar** ("mampus aku udah lupa"). Sudah di-refresh 26 Okt dalam satu halaman (6 kamus dasar + 3 aturan gabungan + pohon keputusan). **Belum dites.** Ini fondasi soal 2, 3, 7, 8, 9 — kalau goyang, semuanya goyang.
- 🟠 **Mengarang fungsi dari sebuah limit.** Dia menyimpulkan $f(x)=\frac x2+4$ dari $\lim\frac{f(x)-5}{x-2}=\frac12$. Angkanya kebetulan benar, tapi $f$ **tidak tunggal** — tandingannya $g(x)=5+\frac{x-2}{2}+(x-2)^2$ memenuhi hal yang sama. **Boleh dipakai untuk MENGECEK, tidak boleh jadi ALASAN.** Dia sudah dua kali melakukannya (1a dan 1c).
- 🟠 **Memakai alat baru ke semua soal.** Begitu kenal L'Hôpital, dia mau memakainya di 1b yang sebenarnya cuma butuh sifat limit. Ajarkan langkah "cek dulu, apakah ini bentuk yang sudah aku kenal?".
- 🟡 **Notasi pecahan bertingkat.** Dia menulis `1/1/2`. $\frac{1}{1/2}=2$ vs $\frac{1/1}{2}=\frac12$ — beda 4×. Satu keluarga dengan pertanyaan `*` vs `.` dulu.
- ⚪ **Akar negatif yang menguap** (pola lama, belum muncul lagi hari ini). Masih harus dites di soal 8a: $x^8=1$ punya **dua** akar real.
- Masih lemah dari dulu: tanda minus trigonometri, lupa turunan dalam, lupa $+C$, lupa cek domain.

## What is going well (katakan ini ke dia, dia merespons)
- **Tidak ada satu pun salah hitung, salah tanda, atau salah konsep hari ini.** Semua kesalahannya ada di *penyajian* dan *membaca perintah soal* — kelas kesalahan termurah yang ada.
- **Dia mengirim foto tulisan tangan** tanpa diminta dua kali. Diagnosis jadi jauh lebih tajam.
- **Dia bertanya waktu tidak paham** ("turunin nya di mana yak?", "f'(x) ambil dari f(x) kan?") dan itu selalu tepat sasaran — pertanyaannya mendiagnosis dirinya sendiri.
- **Soal 2b bagian tersulit dikerjakan sempurna**: $3-2e^{0}=1$, termasuk $e^0=1$ yang sering dijatuhkan orang.
- **Dia jujur soal kondisi badan** dan minta rencana realistis, bukan rencana heroik. Hargai itu — rencana yang dia percaya akan dijalankan.
- Jalan pintas struktural di 1b (mengenali pecahan terbalik) persis seperti Ex 5.1b dulu.

## Open questions from Ethan
- *(tidak ada yang menggantung)*

## Tools built for this course
- 🟠 **[Ujian Kalkulus A 2025](https://claude.ai/artifact/LApfMvRbq2vNa8KCjStbha)** — **dibuat 2026-10-26.** Seluruh sample exam #1 dengan math ter-render, chip kesiapan per bagian (🟢 siap / 🟠 berikutnya / ⚪ nanti), kotak jawaban yang tersimpan lintas perangkat, **kunci terkunci sampai ditandai "sudah dicoba"**, timer 3 jam, dan proyeksi nilai memakai rumus asli $1+\text{poin}\times\frac14$. Status jawaban tersimpan di `db` (`work/q1a`…). Salinan lokal `html-visualization/sample-exam-2025.html`.
- 🟢 **[Roadmap Ujian Kalkulus](https://claude.ai/artifact/JbWyN4VqhEpptjK3sjtxxs)** — **dibuat 2026-10-26.** Rencana 9 hari, tugas bisa dicentang (tersimpan di `db`, koleksi `tasks`), bar poin terkunci dengan garis batas lulus di 18, hari ini disorot otomatis. Salinan lokal `html-visualization/roadmap-ujian.html`.
- 🔵 [Interactive unit circle](https://claude.ai/artifact/VL1xCLnf4rfz58ezkdLZeG) — 2026-09-16. Local: `html-visualization/unit-circle.html`
- 🟣 [Bayangan Vektor](https://claude.ai/artifact/Ff6iJ5L3aBUcUx4PXTukF6) — proyeksi vektor, 2026-10-07. Local: `html-visualization/vector-projection.html`
- 🟢 `html-visualization/extrema-and-integral-checks.html` — 2026-09-26

## Ditunda sampai setelah ujian (jangan dikerjakan sekarang)
- L04 Materi 6 **Latihan 6.1–6.6** — masih belum dijawab sejak 2026-10-07
- L04 Materi 7–8 per materi lengkap (sekarang cuma diajarkan seperlunya untuk soal 4)
- L05 Materi 1–9 lengkap (sekarang cuma Materi 4 polar, untuk soal 5)
- Tiga soal lama yang menggantung: $f(x)=x^2-4x+1$ pada $[0,5]$ (jawaban: maks $f(5)=6$, min $f(2)=-3$) · $\int_1^4\frac{x^2+x}{x^{3/2}}dx=\frac{20}3$ · $\int_0^2x\sqrt{x^2+1}\,dx=\frac{5\sqrt5-1}3$
- Catatan live Lecture 3 (masih kosong) · integral trigonometri · integral tak wajar · related rates · optimasi
