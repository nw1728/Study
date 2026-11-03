---
title: Current Progress
tags: [calculus-a, progress]
updated: 2026-11-03
last_device: claude-code-cloud
---

# 📍 Current Progress

Back to [[00 Index]]

> [!danger] 🚨 MODE UJIAN — **Kamis 5 November 2026** (dikoreksi Ethan 3 Nov — bukan Rabu 4 Nov). Jam: cek Osiris (kertas lama 08:45–11:45)
> **Jalur `202001171` — 5 EC, dikonfirmasi dari kertas ujian DAN dari Osiris (28 Okt).**
> Soal **1–11** · total **45 poin** · nilai `1 + poin × 1/5` · **lulus (5,5) = 23 poin**

> [!success] 🏆 POSISI 28 OKTOBER MALAM — **41 dari 45 poin sudah dikerjakan**
> **32 poin terverifikasi dingin** (dikerjakan ulang tanpa catatan, benar).
> Garis lulus 23 **sudah dilewati sejak Rabu siang**, 6 hari sebelum ujian.

> [!important] 🧮 ATURAN MENULIS MATH DI CHAT — diuji langsung (2026-10-26)
> | Cara tulis | Hasil |
> |---|---|
> | `$$...$$` di baris sendiri | ✅ dirender, paling bagus |
> | `\(...\)` inline | ✅ dirender |
> | `$...$` | ❌ **RUSAK — jangan dipakai** |

> [!tip] 🎓 FORMAT MENGAJAR YANG BERHASIL (iterasi final 28 Okt)
> **Tabel dua kolom: aturan umum di kiri, soal Ethan dikerjakan di kanan, baris per baris.**
> Detail lengkap + dua format yang ditolak ada di [[Teaching Playbook]].
> Kata-katanya: *"sambil jelasin ini kemana ini kemana, sambil kerjain soalnya juga."*

## 🗺️ TEMUAN TERBESAR: ujian punya CETAKAN TETAP

Ethan mengirim 2 resit (Feb 2026, Jul 2026) pada 28 Okt. Dibandingkan slot per slot dengan Nov 2025:

| Slot | Topik — **sama di ketiga kertas** |
|---|---|
| 1 | limit (Nov: L'Hôpital · resit: \(\sqrt{x^2+bx}-x\), trik **kali sekawan**) |
| 2 | tabel nilai → turunan |
| 3 | dua integral (Nov: substitusi + parsial · resit: **tak wajar** + substitusi) |
| 4 | bidang (Nov: **cross product** · resit: **bidang singgung**) |
| 5 | polar (Nov: → Cartesius · resit: lingkaran, cari \(a\) dan jari-jari) |
| 6 | limit multivariabel tidak ada — **identik** |
| 7 | aturan rantai multivariabel — **identik** |
| 8 | titik kritis + min pada ruas garis — **identik** |
| 9 | PD linear orde 1 + nilai awal — **identik** |
| 10 | akar kompleks (Nov: pangkat 4 · resit: **pangkat 6**, \(z^6-az^3-b=0\)) |
| 11 | PD orde 2 + nilai awal — **identik** |

📁 **Semua kertas kini ada di repo, folder `sample_exam/`** (diunggah 3 Nov):
`112025exam_with_solutions.pdf` · `2026-02_resit_with_solutions.pdf` · `2026-07_resit_with_solutions.pdf` (soal di **hal. 1–2**, kunci mulai **hal. 3** — jangan dibuka saat simulasi) · `2024-11_exam.pdf` · `2025-03_exam.pdf` · `2025-07_exam.pdf` (tanpa kunci).
✅ Kunci Feb 2026 dan Jul 2026 **dicek ulang dengan sympy, semuanya benar**.

### 🧓 Tiga kertas lama (Nov 2024, Mar 2025, Jul 2025) = CETAKAN LAMA
Format lain: kalkulator boleh, tanpa lembar rumus, urutan soal lain, tidak ada slot 6 (limit multivariabel) maupun slot 8 (titik kritis 2 variabel). **Peramal utama tetap tiga kertas terbaru.** Kertas lama hanya dipakai sebagai **latihan tambahan per slot**:

| Slot sekarang | Soal lama yang cocok | Jawaban (dicek sympy) |
|---|---|---|
| 1 limit, kali sekawan | Nov24 #1 \(\lim(\sqrt{x^2+x}-\sqrt{x^2-x})\) · Jul25 #3 \(\frac{\sqrt{ay+a^2}-a}{y}\) | \(1\) · \(\tfrac12\) |
| 3 substitusi / tak wajar | Nov24 #4a \(\int\frac{\cos(\sqrt t+3)}{\sqrt t}dt\) · Jul25 #4b \(\int_0^1\frac{dx}{\sqrt{1-x}}\) (tak wajar tipe II) | \(2\sin(\sqrt t+3)+C\) · \(2\) |
| 4 cross product | Nov24 #5 \(\mathbf u\times\mathbf v\), \(\mathbf u=\tfrac32\mathbf i-\mathbf j+\tfrac12\mathbf k,\ \mathbf v=\mathbf i+\mathbf j+2\mathbf k\) | \(\langle-\tfrac52,-\tfrac52,\tfrac52\rangle\), panjang \(\tfrac{5\sqrt3}2\), arah \(\tfrac1{\sqrt3}\langle-1,-1,1\rangle\) |
| 5 polar | Nov24 #6 \(r^2=4r\sin\theta\) | \(x^2+(y-2)^2=4\), lingkaran pusat \((0,2)\) jari-jari 2 |
| 7 rantai multivariabel | Nov24 #8 \(\partial z/\partial u\) di \(u=0,v=1\) | \(2\) |
| 9 PD linear orde 1 | Nov24 #9 \(ty'+2y=t^3,\ y(2)=1\) | \(y=\frac{t^3}{5}-\frac{12}{5t^2}\) |
| 10 akar kompleks | Nov24 #10 \(x^4+4x^2+16\) · Jul25 #10 \(x^4-5x^2+25\) | \(\pm1\pm i\sqrt3\) · \(\pm\tfrac{\sqrt{15}}2\pm\tfrac{\sqrt5}2i\) |
| 11 PD orde 2 | Nov24 #11 \(y''-4y'+4y=0\) — **kasus AKAR KEMBAR, belum pernah dilatih** · Jul25 #11 \(y''+12y=0\) | \(y=(1-2x)e^{2x}\) · \(y=\frac{\sqrt3}{6}\sin(2\sqrt3x)\) |

Di luar cetakan sekarang (jangan dikejar): fraksi parsial (Nov24 #4b), garis sejajar/bersilang, panjang kurva, kecepatan, turunan berarah, PD tak homogen (Mar25 #10).

## 📊 Papan skor per soal

| Soal | Poin | Status | Jawaban |
|---|---|---|---|
| 1a,1b,1c | 4 | 🔒 dingin ✅ | \(\lim f=5\) · \(4\) · \(f'(2)=\tfrac12\) |
| 2a, 2b | 4 | 🔒 dingin ✅ | \(-\tfrac{\pi+12}{9}\) · \(-6\) |
| 3a | 2 | 🔒 ✅ | \(-2\cos(\sqrt x+1)+C\) |
| 3b | 2 | 🔒 ✅ | \(\tfrac{160\ln2-31}{25}\) |
| 4 | 4 | ⚪ **diajarkan, belum dicoba** | bidang \(3x+2y+5z=13\), luas \(\sqrt{38}\) |
| 5 | 3 | 🔒 dingin ✅ | \(x^2=-4y+4\), parabola buka bawah |
| 6 | 4 | 🔒 dingin ✅ | tidak ada (jalan \(y=0\to2\), \(x=0\to0\)) |
| 7 | 4 | 🟠 perlu rep bersih | \(\partial z/\partial u=0\), \(\partial z/\partial v=2\) |
| 8 | 5 | 🟠 perlu rep bersih untuk (a) | \((0,0),(1,1),(-1,-1)\) · min \(-2\) di \((1,1)\) |
| 9 | 4 | 🔒 dingin ✅ | \(y=\tfrac{x^3}{6}+\tfrac{11}{6x^3}\) |
| 10 | 5 | 🔒 dingin ✅ | \(x=\tfrac{\pm\sqrt7\pm i\sqrt{21}}{2}\) |
| 11 | 4 | 🔒 dingin ✅ | \(y=e^{-2x}(2\cos3x+\tfrac13\sin3x)\) |

## 🤒 Rencana versi FLU (Selasa 3 Nov sore) — menggantikan rencana di bawahnya

Ethan flu parah, tidur maks. 21:00. Ujian **Kamis 5 Nov 08:45**. Dia bilang sudah ~90% bisa di kertas Nov 2025.
**Hitungan yang dikatakan ke Ethan:** slot yang identik dengan Nov 2025 (2, 6, 7, 8, 9, 11) = 24 poin ≥ garis lulus 23. Slot yang beda (1, 3, 4, 5, 10) = 21 poin tambahan. Risiko utama bukan materi, melainkan kurang tidur + baris terakhir bocor.

- **Selasa malam:** Feb dibantu, **hanya slot yang beda** — 1 ✅, 2 ✅ (b lupa ×f′), 3 (sedang), 5, 10. Stop 20:00, tidur 21:00.
- **Rabu:** mini simulasi dingin Jul — soal 1, 3, 4, 5, 10 saja (~1,5 jam) → koreksi → akar kembar (20 menit) → kartu resep → tidur ≤ 21:30.
- **Kamis:** bangun 06:45, baca kartu resep sekali, tidak ada soal baru.

## ▶️ Rencana baru — 2 hari tersisa (dibuat Selasa 3 Nov)

> [!question] Belum tercatat: apakah daftar Kamis 29 Okt di bawah sudah dikerjakan? Tidak ada catatan sesi 29 Okt–2 Nov. Tanyakan ke Ethan.

**Selasa 3 Nov**
1. **Soal 4** — prioritas **bidang singgung** (ini yang keluar di Feb DAN Jul 2026), lalu cross product.
2. ~~Simulasi dingin Feb 2026~~ → **diubah atas permintaan Ethan (16:20): Feb 2026 dikerjakan BARENG** (dia coba dulu, Claude bantu di langkah yang macet). Poin dicatat = yang dia dapat sendiri.

**Rabu 4 Nov**
3. **Jul 2026 = simulasi DINGIN** 09:00–12:00 (sendirian, hal. 1–2, lembar rumus saja), koreksi 12:00–12:45. Ini satu-satunya ukuran dingin sebelum ujian — jangan dibantu.
4. Drill pendek dari kertas lama: **PD orde 2 akar kembar** (Nov24 #11) — kasus ke-3 dari persamaan karakteristik.
5. Kartu resep satu halaman. Tidur cukup.

**Kamis 5 Nov — UJIAN.**

### (Daftar lama Kamis 29 Okt — status belum diketahui)

1. **Soal 4** — selesaikan latihan A (cross product: \(Q_1(1,1,0), Q_2(2,0,1), Q_3(0,2,3)\)) dan **latihan B** (bidang singgung: \(f=x^2+3y^2\) di \((1,1,4)\), jawaban \(z=4+2(x-1)+6(y-1)\)).
2. **Rep bersih soal 7 dan soal 8(a)** — 15 menit.
3. **Empat pelebaran** untuk rasa resit (~2 jam total):
   - slot 1: \(\infty-\infty\) → **kali sekawan** \(\frac{\sqrt{x^2+bx}+x}{\sqrt{x^2+bx}+x}\)
   - slot 3a: **integral tak wajar** \(\int_e^\infty\) (pakai limit batas atas)
   - slot 5: **polar lingkaran** — lengkapkan kuadrat, cari pusat & jari-jari
   - slot 10: **akar pangkat n** — \(n\) akar berjarak \(2\pi/n\); trik pantulan **tidak** berlaku untuk pangkat ganjil
4. **Kartu resep satu halaman** (isinya = daftar 🧠 HAFAL di bawah).
5. **Jumat–Minggu:** Aljabar Linear. Kalkulus hanya **10 menit/hari, satu soal lama, ditulis ulang tanpa catatan.**
6. **Selasa 3 Nov:** simulasi resit Feb 2026 (3 jam, tanpa catatan), koreksi, lalu tambal pakai resit Jul.

## 📄 Lembar rumus — sudah dipetakan

**ADA (jangan hafalkan):** tabel trig 0…2π · \(\sin^2+\cos^2=1\) · segitiga Opp/Adj/Hyp · dot & cross product lengkap · turunan \(c, x^n, e^x, \ln|x|, \sin, \cos, \tan\) · integral \(x^n, \tfrac1x, e^x, \sin, \cos, \tfrac1{\cos^2}, \tan\) · invers trig.

**TIDAK ADA (🧠 isi kartu resep):** aturan rantai ⚠️ · hasil kali · hasil bagi · L'Hôpital · substitusi-\(u\) · integral parsial (LIPET) · konversi polar · rantai multivariabel · titik kritis + ujung selang · faktor integrasi \(\mu=e^{\int P}\) · **rumus ABC** · persamaan karakteristik (3 kasus) · \(e^{i\theta}=\cos\theta+i\sin\theta\) · tabel kuadran/sudut acuan · persamaan bidang · luas \(=\tfrac12|\vec a\times\vec b|\).

Protokol ke Ethan: tiap rumus ditandai **📄 LEMBAR** atau **🧠 HAFAL**.

## ⚠️ Waspadai

> [!warning] **BARIS TERAKHIR BOCOR** — 8 kejadian dalam dua hari
> Penalarannya tidak pernah salah; yang bocor selalu baris terakhir.
> \((\pi+12)\to(\pi+2)\) · \(9\times7=49\) · \(\tfrac{2}{x+1}\) berhenti di 1 · \((2-y)^2\) kehilangan minus · huruf \(i\) hilang · nama jalan ↔ nilainya · \(\tfrac{d}{dt}t^2\) ditulis \(t\).
> **Obat 3 detik:** baca baris terakhir, bandingkan dengan baris di atasnya.

> [!warning] **PANGKAT GENAP = DUA JAWABAN** — 4 kejadian dalam satu hari
> \(k^2=4\) · \(x^2=4\) · \(x^8=1\) · \(x^2=1\) — setiap kali hanya akar positif yang ditulis.
> **Obat:** tulis **±** dulu, baru cari alasan membuang yang negatif.

| Pola | Obat |
|---|---|
| Pangkat negatif **dibalik**, bukan dinegatifkan (\(3^{-2}=\tfrac23\), \(\tfrac1{x^{1/2}}=x^2\)) | "pindah lantai, bukan tukar angka" |
| Membagi dengan huruf yang bisa nol (\(x^9=x \Rightarrow x^8=1\)) | **pindahkan ke satu ruas dan faktorkan** — membagi membunuh akar \(x=0\) |
| **Simbol baru tanpa tugas = berhenti total** (`dy/dx`, `u`, `∂`, `e^{iθ}`, `y(0)`, `dv`) | **sebutkan tugas simbolnya SEBELUM soal.** Ini sumber hampir semua kemacetan. |
| Tidak tahu kapan substitusi vs langsung | **huruf bercampur → substitusi · huruf terpisah → selesaikan sendiri-sendiri lalu pasangkan** |

## 🌟 Yang berjalan baik

- **Tidak lambat di matematika.** Lambat hanya di awal, saat simbol baru belum dikenalkan tugasnya.
- 28 Okt: **soal 9 dikerjakan dingin, benar percobaan pertama, nol petunjuk.**
- 27 Okt malam: **soal 11 utuh sendirian** termasuk \(B=\tfrac13\) pecahan.
- Pertanyaannya selalu tepat sasaran: *"\(x^2+y^2=r^2\) kok kayak pythagoras?"* (memang Pythagoras) · *"kalau dua jalan ketemu, limitnya sama?"* (tidak — dan itu jebakan utama slot 6).
- Menemukan sendiri kekeliruan jalur 4 EC vs 5 EC, dan mencari dua resit tambahan.
- Meminta perubahan format mengajar sampai ketemu yang pas — tiga iterasi, dan hasilnya jauh lebih efektif.

## 🛠️ Alat

| Halaman | Link |
|---|---|
| 📝 Sample exam interaktif (status per soal, toggle 5 EC ON) | https://claude.ai/artifact/LApfMvRbq2vNa8KCjStbha |
| 🚚 **Supir Lintas Kalkulus** — roadmap 2 hari terakhir (Bandung → Prabumulih), centang per halte + skor simulasi Feb | https://claude.ai/artifact/MPo1SoUGmConNAqJ8aayx6 · lokal `html-visualization/roadmap-supir-lintas.html` |
| 🗓️ Roadmap 9 hari (lama) | https://claude.ai/artifact/JbWyN4VqhEpptjK3sjtxxs |
| 📈 Turunan visual | https://claude.ai/artifact/91iXAEPTaZL93ME9cZJBSU |
| 🔵 Unit circle | https://claude.ai/artifact/VL1xCLnf4rfz58ezkdLZeG |

## ❓ Terbuka

- Apakah item Kamis 29 Okt sudah dikerjakan (soal 4, rep 7 & 8a, pelebaran, kartu resep)?
- **Slide kuliah 6+ belum ada** di `lectures_slides/` (baru 1–5). Soal 6,7,8 berasal dari sana.
- Soal 4 belum pernah dicoba Ethan sama sekali.

## ⏸️ Ditunda sampai setelah ujian

Membuktikan limit multivariabel **ada** (squeeze/polar) · deret Taylor & bukti rumus Euler · L04 Materi 7–8 · L05 lengkap.
