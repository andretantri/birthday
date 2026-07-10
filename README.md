# 🎂 Birthday Surprise Website

Website surprise ulang tahun romantis dan interaktif, dibuat khusus menggunakan React dan Vite. Proyek ini memiliki animasi kue ulang tahun, slideshow ucapan dengan efek mesin tik, dan background kolase foto estetik yang bergerak secara dinamis.

## ✨ Fitur Utama

- **🎂 Scene 1: Kue Ulang Tahun**
  Animasi kue ulang tahun dengan lilin yang menyala dan berkedip, teks ucapan selamat ulang tahun yang muncul perlahan, serta background partikel bintang.
  
- **🖼️ Scene 2: Kolase Foto & Slideshow Ucapan**
  Background berupa kolase (grid) foto-foto yang akan berjalan otomatis secara horizontal. Di bagian depan, terdapat transisi teks ucapan romantis dengan efek *glassmorphism*. **Semua foto di folder `public/photos/` akan dideteksi dan dimasukkan ke dalam kolase secara otomatis!**
  
- **💕 Scene 3: Penutup**
  Animasi *confetti* (kertas warna-warni) dan emoji hati berjatuhan untuk memberikan kesan meriah di akhir slideshow, lengkap dengan pesan penutup.

---

## 🚀 Teknologi yang Digunakan

- **Framework**: React + Vite (Sangat ringan dan cepat)
- **Styling**: Vanilla CSS dengan CSS Animations / Keyframes murni
- **Data**: File `data.json` lokal sehingga mudah diedit tanpa perlu database
- **Font**: Google Fonts (Playfair Display & Lato) untuk nuansa yang elegan
- **Lain-lain**: 
  - `canvas-confetti` untuk animasi confetti
  - *Native Lazy Loading* & Vite Glob Import untuk performa optimasi gambar

---

## 🛠️ Cara Mengubah Konten (Customization)

Kamu tidak perlu bisa coding untuk mengubah isi web ini! Cukup lakukan dua hal berikut:

### 1. Mengubah Foto Background
Tambahkan atau hapus foto-foto (*.jpg, *.jpeg, *.png, *.webp) langsung ke dalam folder:
📁 `public/photos/`
> **Catatan:** Sistem akan otomatis membaca semua foto di dalam folder tersebut dan menyusunnya secara acak (shuffle) menjadi kolase. Tidak perlu di-coding satu per satu!

### 2. Mengubah Teks Ucapan
Buka file 📁 `src/data/data.json` menggunakan text editor (seperti VS Code atau Notepad).
Ubah bagian-bagian ini sesuai keinginanmu:
- `"name"`: Nama pasanganmu
- `"birthdayDate"`: Tanggal ulang tahun
- `"introTitle"`: Teks yang muncul di atas kue
- `"introSubtitle"`: Teks di bawah kue
- `"slides"`: Berisi kumpulan *caption* (teks besar) dan *subcaption* (teks kecil) yang akan muncul pada bagian slideshow. (Kamu bisa menambah objek baru di dalam array ini jika ingin *slide* ucapannya lebih banyak).
- `"closingMessage"` & `"closingSignature"`: Teks untuk halaman paling akhir.

---

## 💻 Cara Menjalankan Secara Lokal (Local Development)

Pastikan kamu sudah menginstal **Node.js**.

1. Buka terminal di folder project ini.
2. Install semua dependencies (jika baru pertama kali):
   ```bash
   npm install
   ```
3. Jalankan *development server*:
   ```bash
   npm run dev
   ```
4. Buka URL yang muncul di terminal (biasanya `http://localhost:5173`) di browser.

---

## 🌐 Cara Deploy (Publish ke Internet)

Website ini sudah disiapkan untuk bisa di-deploy dengan mudah secara gratis menggunakan **Vercel** (sudah dilengkapi dengan `vercel.json`).

1. Upload (*push*) seluruh file folder ini ke repository GitHub milikmu.
2. Kunjungi [vercel.com](https://vercel.com) dan login menggunakan akun GitHub-mu.
3. Klik **Add New Project**, lalu pilih repository GitHub yang baru saja kamu buat.
4. Klik **Deploy** dan tunggu prosesnya selesai (Vercel otomatis mendeteksi bahwa ini adalah proyek Vite).
5. Selesai! Kamu akan mendapatkan link website gratis (contoh: `https://bday-surprise.vercel.app`) yang bisa langsung kamu kirimkan ke si dia! 💕
