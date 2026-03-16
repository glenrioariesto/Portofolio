# PRD — Portfolio Website UI/UX Improvement

**Owner:** Glen Rio Aristo  
**Stack:** Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, Embla Carousel  
**Status:** Draft · March 2026

---

## 1. Ringkasan Eksekutif

Portfolio ini sudah memiliki fondasi visual yang kuat — animasi Framer Motion, font kreatif, dan layout responsif. Namun ada sejumlah gap pada navigasi, kelengkapan konten, aksesibilitas, dan konsistensi desain yang perlu diperbaiki agar memberikan first impression terbaik kepada rekruter atau klien potensial.

---

## 2. Audit UI/UX — Temuan Saat Ini

### 2.1 Navigasi

- Navigasi `#services` mengarah ke section Services yang baru ditambahkan.
- Ada **active state indicator** di navbar — user tahu sedang di section mana.
- Label teks terlihat di mobile (tidak hanya via `title` tooltip hover).
- `useState` di-import di `Navbar.tsx` dan digunakan untuk scroll tracking.

### 2.2 Hero Section

- **Hanya satu CTA**: "Email Me" — tidak ada tombol Download CV/Resume atau link ke LinkedIn/GitHub.
- Badge "Available For Remote Work" menggunakan `hidden md:flex` — **tersembunyi di mobile**, padahal info ini penting.
- `ShinyText` di badge (warna putih di atas biru gelap) berisiko memiliki kontras rendah.

### 2.3 Struktur Konten / Section yang Hilang

- **Tidak ada section Contact** yang proper — hanya link `mailto:` di hero.
- **Tidak ada section Education** — umum pada portfolio developer.
- **Tidak ada Footer** — tidak ada copyright, social links, atau info kontak ringkas.
- Hanya **3 proyek** ditampilkan; InstaScheduler tidak memiliki gambar dan langsung menampilkan state "Private Project".

### 2.4 Tech Marquee

- **Tidak ada heading/label** yang menjelaskan konteks section ini ("My Tech Stack").
- Animasi rotasi per-icon berlangsung terus-menerus — dapat terasa distraktif.
- **Tidak ada pause on hover**.

### 2.5 Organizational Experience

- `h3` menggunakan class `text-2xl sm:text-xl` — **terbalik** (lebih besar di mobile, lebih kecil di desktop). Seharusnya `text-xl sm:text-2xl`.
- Beberapa bullet point terlihat seperti **placeholder** ("Built reusable React components for scalable applications" ada di bawah peran *Secretary*).
- Tidak ada link ke website/Instagram organisasi terkait.

### 2.6 Project Showcase (EmblaCarousel & MobileShowcase)

- EmblaCarousel di-`display:none` di bawah 768px via CSS; kedua komponen memiliki **feature set yang sedikit berbeda** dan tidak ada indikator berapa banyak proyek yang ada.
- Carousel desktop tidak memiliki **progress indicator** (dot/step) yang terlihat jelas.
- Icon navigasi gambar (ChevronLeft/Right) di dalam card desktop **tidak intuitif** — user biasanya mengharapkan overlay di atas gambar.

### 2.7 Aksesibilitas

- Banyak elemen interaktif (carousel, tombol gambar) tidak memiliki **ARIA label** yang memadai.
- `text-gray-400` digunakan luas — potensi gagal WCAG AA contrast ratio (4.5:1) untuk teks kecil.
- Tag `<img>` digunakan langsung di `Navbar.tsx` (bukan Next.js `<Image>`) — melewati optimasi dan lazy loading.
- `lang="id"` di `<html>` tapi konten sepenuhnya Bahasa Inggris.

### 2.8 SEO & Metadata

- `metadata` hanya memiliki `title` dan `description` — tidak ada **Open Graph tags**, Twitter Card, atau `og:image`.
- Tidak ada `canonical` URL.
- Tidak ada `robots.txt` atau `sitemap.xml`.

### 2.9 Komponen & Code Quality

- `ShinyText.tsx` menggunakan `React.FC` tapi **tidak mengimpor `React`** — akan error di lingkungan non-JSX-transform.
- `useState` di-import di `Navbar.tsx` tapi tidak terpakai.
- Data proyek (`PROJECTS`) dan data organisasi (`orgExperiences`) di-hardcode dalam komponen — sebaiknya dipisah ke file `lib/data.ts`.

### 2.10 Visual Konsistensi

- Border menggunakan `border-gray-400` di beberapa tempat dan `border-white/20` di tempat lain tanpa pola yang konsisten.
- Terdapat `2xl:border-gray-100` dan `2xl:border-white` sebagai override — nuansa tipis yang sulit dipahami tanpa penjelasan.
- **Tidak ada dark mode** meskipun palet warna mendukungnya.

---

## 3. Fitur / Perbaikan yang Diprioritaskan

### P0 — Critical (Harus diperbaiki)

1. **Implementasi section `#services`** — menambahkan section Services dengan detail konsultasi, infrastruktur, vibe coding, dan optimasi.
2. **Tampilkan badge "Available For Remote Work" di mobile** — hilangkan `hidden md:flex`, sesuaikan posisi.
3. **Perbaiki urutan font size** `text-2xl sm:text-xl` di `OrgExperience.tsx` menjadi `text-xl sm:text-2xl`.
4. **Fix import React** di `ShinyText.tsx` atau pastikan JSX transform aktif secara eksplisit.
5. **Ganti `lang="id"`** menjadi `lang="en"` sesuai bahasa konten.

### P1 — High (Perlu diperbaiki segera)

6. **Tambahkan active state di navbar** menggunakan Intersection Observer atau scroll tracking.
7. **Tambah CTA kedua di Hero**: tombol Download CV dan icon sosial (GitHub, LinkedIn).
8. **Tambahkan heading "My Tech Stack"** di atas marquee agar konteks jelas.
9. **Tambah Footer** minimal dengan: copyright, email, social links.
10. **Bersihkan placeholder text** di `OrgExperience` (bullet point yang tidak relevan dengan peran Secretary).
11. **Tambahkan Open Graph & Twitter Card metadata** di `layout.tsx`.

### P2 — Medium (Rencana jangka menengah)

12. **Tambah section Contact/Services** yang proper dengan form atau detail kontak.
13. **Tambah section Education** — universitas, jurusan, tahun.
14. **Tambah ARIA labels** pada semua elemen interaktif carousel dan tombol gambar.
15. **Perbaiki warna teks** dari `text-gray-400` ke minimal `text-gray-500` atau `text-gray-600` untuk konten utama.
16. **Ganti `<img>`** di `Navbar.tsx` dengan `<Image>` dari Next.js.
17. **Pisahkan data** (`PROJECTS`, `orgExperiences`) ke file `lib/data.ts` agar komponen lebih clean.
18. **Tambah lebih banyak proyek** atau perlakukan InstaScheduler dengan ilustrasi khusus daripada state "Private Project" generic.

### P3 — Low (Nice to have)

19. **Dark mode** — implementasi dengan Tailwind `dark:` classes dan toggle di navbar.
20. **Pause on hover** untuk TechMarquee.
21. **robots.txt & sitemap.xml** untuk SEO lengkap.
22. **Testimonials/Recommendations section** dari klien atau rekan kerja.
23. **Halaman proyek individual** (routing `/projects/[id]`) untuk detail lebih dalam per proyek.

---

## 4. Detail Layanan (Services)

Section **Services** akan mencakup poin-poin berikut:

- **Project Consultation**: Memberikan panduan strategis dan teknis untuk memulai atau restrukturisasi proyek.
- **Infrastructure & DevOps**: Solusi arsitektur yang scalable, deployment, dan manajemen server/cloud.
- **Vibe Coding Rescue**: Memperbaiki dan menyempurnakan project yang dibangun menggunakan AI ("vibe coding") agar stabil dan profesional.
- **Performance & Optimization**: Meningkatkan kecepatan aplikasi, efisiensi resource, dan skor Core Web Vitals.
- **PRD & Documentation Update**: Pembuatan dan integrasi dokumentasi teknis serta PRD yang komprehensif.

---

## 5. Ukuran Keberhasilan

- [x] **Internal Navigation**: Navigasi `#services` mengarah ke section Services.
- [x] **Active State**: Navbar mencatat section aktif via Intersection Observer.
- [x] **Mobile UX**: Badge "Available For Remote Work" dan label navbar terlihat di mobile.
- [x] **Typography**: Hierarchy font di Experience dan Tech Stack sudah diperbaiki.
- [x] **Accessibility**: Contrast ratio ditingkatkan dan ARIA labels ditambahkan.
- [x] **SEO**: Open Graph & Twitter Cards sudah aktif.

---

## 5. Catatan Tambahan

- Font `Rubik Doodle Shadow` sangat kreatif tapi hanya tersedia dengan weight 400 — pastikan heading hierarchy tetap terbaca.
- Pertimbangkan menambah `preload` hint untuk gambar hero agar LCP (Largest Contentful Paint) lebih cepat.
- Gambar proyek menggunakan `.webp` — sudah bagus untuk performa.
