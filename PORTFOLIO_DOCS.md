# Dokumentasi Pengembangan Portofolio Nuxt

Dokumen ini berisi rangkuman lengkap mengenai arsitektur, teknologi, dan alur modifikasi pada proyek web portofolio ini. Dibuat agar mudah dipahami baik oleh manusia maupun AI yang akan melanjutkan pengembangan (*maintenance*).

---

## 1. Teknologi yang Digunakan
Proyek ini dibangun menggunakan *stack* modern dan berkinerja tinggi, berpusat pada ekosistem **Nuxt 3** dan **Vue 3**:
- **Framework Utama:** Nuxt 3 (dengan fitur SSR / SSG dari Nitro engine).
- **UI & Styling:** Tailwind CSS dipadukan dengan modul `@nuxt/ui` (Nuxt UI) untuk komponen siap pakai (buttons, icons, dll).
- **Manajemen Konten:** `@nuxt/content` (v3 dengan fitur `queryCollection`) untuk mengelola *file-based content* (seperti halaman *index* atau *blog*).
- **Animasi:** `motion-v/nuxt` digunakan untuk memberikan transisi halus (*framer-motion* versi Vue).
- **Pengolahan Gambar:** `@nuxt/image` untuk performa *loading* gambar.
- **Font & Tipografi:** Google Fonts (khususnya "Oswald" untuk *Hero section*).

---

## 2. Struktur Direktori Utama
Berikut adalah direktori penting yang menjadi pusat pengaturan dan modifikasi web:
- **`app/pages/`**: Menangani sistem *routing*. Setiap file `.vue` di sini merepresentasikan rute halaman (contoh: `index.vue` untuk Beranda/Home).
- **`app/components/`**: Tempat menyimpan bagian-bagian UI yang dapat digunakan kembali (*reusable components*).
  - `AppHeader.vue`: Komponen *navbar* (navigasi atas) tempat logo kustom berada.
  - `AppFooter.vue`: Komponen bagian paling bawah web yang berisi tautan media sosial.
  - `landing/Hero.vue`: Desain *custom* untuk bagian penyambutan (foto profil dengan efek teks 3D tumpang tindih).
- **`app/app.config.ts`**: Pengaturan variabel *global* seperti tautan di *footer*, metadata *default*, hingga tema/warna UI.
- **`nuxt.config.ts`**: Konfigurasi inti framework (modul, kompatibilitas, opsi *build*, dll).
- **`public/`**: Direktori untuk aset statis yang bisa diakses langsung via URL (contoh: `logo.png`, `foto.png`, dan `favicon.png`).

---

## 3. Langkah-Langkah / Alur Modifikasi yang Telah Dilakukan
Selama pengembangan awal, beberapa penyesuaian (*customization*) spesifik telah diselesaikan:
1. **Penyesuaian Logo Navbar:** 
   - Logo asli `.png` dipindahkan ke folder `public/logo.png`.
   - Komponen `AppHeader.vue` diubah menggunakan tag `<img>`. Ditambahkan filter CSS bawaan Tailwind (`dark:invert` dan `drop-shadow`) agar logo otomatis memutih di *dark mode* dan tetap menonjol karena memiliki outline / *drop-shadow*.
2. **Perombakan Desain *Hero Section* (Halaman Awal):**
   - Dibuat efek *3D interwoven* (tumpang tindih) di mana wajah/foto berada di tengah-tengah dua lapisan teks: 
     - **Layer Belakang (Solid)**: Teks berisi *fill* normal.
     - **Layer Depan (Outline)**: Teks berisi `-webkit-text-stroke` tanpa *fill* (`-webkit-text-fill-color: transparent`).
   - Penyesuaian presisi pada sistem **CSS Grid** untuk memastikan posisi tumpukan akurat.
   - Ikon media sosial diletakkan di *layer* belakang namun tetap interaktif (`pointer-events: auto`).
3. **Optimasi Favicon:**
   - Ikon logo dikonversi ke *canvas* persegi transparan, di-*resize* ke resolusi optimal 128x128px (tanpa ditarik/digepengkan), dan ukurannya ditekan hingga sangat kecil (sekitar 11 KB).
   - Registrasi `<link rel="icon" type="image/png" href="/favicon.png">` di file `app/app.vue`.
4. **Pembersihan Konten:**
   - Menghapus komponen tak terpakai (`LandingBlog`, `LandingTestimonials`, `LandingFAQ`) dari `index.vue` agar desain lebih ringkas, murni sebagai portofolio pengembang.
   - Menghapus menu tautan *default* (Discord, Twitter/X) dari *footer* dan menggantinya dengan akun personal LinkedIn dan GitHub.

---

## 4. Panduan Mengubah (How to Edit Everything)

### 4.1 Mengubah Teks & Tampilan (Styling)
- **Teks Penyambutan Utama:** Buka `app/components/landing/Hero.vue`. Ubah *hardcoded text* "Rizki A. Wibowo" dan "Backend Developer" di dua tempat sekaligus (Layer 1 untuk warna solid, Layer 3 untuk *outline* tembus pandang).
- **Foto Profil:** Ganti/timpa file `public/foto.png`.
- **Warna / Jarak (Tailwind):** Gunakan class bawaan Tailwind (`mt-4`, `text-center`, dll) pada file `.vue`. Untuk tata letak ekstrem (seperti efek di *Hero section*), periksa blok `<style scoped>` yang menggunakan variabel CSS `--d` (diameter) dan `--fs` (ukuran font).
- **Metadata & *Social Icons*:** Buka file `app/app.config.ts`. Di sini Anda bisa mengedit *username* LinkedIn, GitHub, teks *credits* di footer, dll.

### 4.2 Mengubah / Menambah Halaman (Routes)
Nuxt otomatis mendeteksi rute berdasarkan struktur file di folder `app/pages/`:
- Ingin menambah halaman `/about`? Buat file baru `app/pages/about.vue`.
- Halaman utama (Home) ada di `app/pages/index.vue`. Di sini Anda mengontrol komponen pendaratan (Landing) apa saja yang dipanggil.

### 4.3 Mengubah Konten Artikel / Proyek (Content)
Jika kelak Anda ingin mengisi bagian blog atau portofolio spesifik menggunakan Nuxt Content:
- Cek folder bernama `content/` (jika tidak ada, Anda bisa membuatnya).
- Biasanya file berekstensi `.md` diletakkan di sana dan otomatis dibaca oleh framework melalui sintaks `queryCollection()`.

---

## 5. Cara *Deploy* (Publikasi ke Server)

Proyek ini menggunakan *Nitro engine* yang sangat fleksibel, mendukung prapemuatan halaman statis (SSG) maupun *Server-Side Rendering* (SSR).

### A. Static Site Generation (SSG) - *Sangat disarankan untuk GitHub Pages, Vercel, Netlify, Cloudflare Pages*
Karena web portofolio ini cenderung statis dan minim perubahan mendadak, Anda bisa me-*generate* HTML statis:
1. Buka terminal dan jalankan:
   ```bash
   npm run generate
   ```
2. Hasil jadinya akan masuk ke direktori `dist/` atau `.output/public/`. Folder inilah yang harus diunggah (di-*deploy*) ke layanan *hosting* statis Anda.

### B. Node.js Server (SSR) - *Untuk VPS / Render / Railway*
Jika ke depan ada integrasi API atau sistem *real-time*:
1. Buka terminal dan jalankan:
   ```bash
   npm run build
   ```
2. Kode yang sudah dikompilasi akan berada di folder `.output/server/`.
3. Jalankan server menggunakan:
   ```bash
   node .output/server/index.mjs
   ```

*(Tips: Jika men-deploy menggunakan platform Vercel atau Netlify, Anda seringkali hanya perlu menyambungkan repositori GitHub ini, dan sistem mereka secara otomatis mendeteksi kalau ini adalah aplikasi Nuxt 3 dan mengonfigurasinya dengan tepat.)*
