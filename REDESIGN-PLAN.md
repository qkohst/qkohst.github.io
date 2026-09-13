# Redesign `index.html` + `my_pages/` — qkohst.github.io

## Context

Situs portofolio `qkohst.github.io` dibangun di atas template BootstrapMade **iPortfolio v1.5.1** (halaman pricing memakai **Scaffold v2.2.0**). Tampilannya usang dan berat, tapi yang lebih mendesak: audit seluruh 29 halaman menemukan fondasi SEO praktis tidak ada, dan ~55MB aset dikirim untuk konten yang setara beberapa ratus KB.

Tujuan: tampilan profesional dan modern, responsif mobile/tablet/desktop, transisi halus, SEO benar, payload ringan — tanpa kehilangan konten yang sudah ada.

**Kondisi terverifikasi** (semua 29 halaman di-fetch dan di-parse, bukan asumsi):

| Aspek | Temuan |
|---|---|
| OG tag / `canonical` / JSON-LD | **0 dari 29** halaman, ketiganya |
| `meta description` | 29 halaman memakai string identik `"Qkoh St \| Portfolio"` |
| `<title>` | 26 halaman memakai judul identik `"Qkoh St \| Portfolio Details"` |
| `<img>` | 188 total — **188 tanpa `alt`**, **0 dengan `loading=lazy`** |
| `robots.txt` / `sitemap.xml` / `.nojekyll` | tidak ada |
| `<h1>` | di semua halaman berisi nama sidebar, bukan subjek halaman |
| Skrip per halaman | rata-rata **11,9** `<script src>` |
| **Payload beranda (terukur)** | **2.254 KB / 37 request** — `profile-img.jpg` 713KB, `icofont.woff2` 525KB |
| Bobot repo | 73MB; `my_pages/` 55MB; gambar 37MB |

**Yang sudah benar, pertahankan:** tidak ada contact form (kontak via `mailto:`/`tel:`/WhatsApp — aman untuk GitHub Pages). Folder `wedding/` di repo ini sudah memakai pola target (tanpa jQuery/Bootstrap, OG lengkap, `preconnect`, ARIA, `lang` benar) — jadikan acuan gaya rumah.

**Koreksi atas dugaan awal:** layout mobile **tidak rusak**. Diukur di viewport 360px: tidak ada horizontal scroll, hanya 1 elemen di section contact meleset 9px. Masalahnya estetika dan bobot, bukan responsivitas yang patah.

## Bug nyata yang diperbaiki saat migrasi

| Lokasi | Masalah |
|---|---|
| 26 × `my_pages/*-detail.html` | favicon `href="my_pages/assets/img/logo.png"` dipanggil dari dalam `my_pages/` → `my_pages/my_pages/...` → **404** |
| [my_pages/portfolio.html:45](my_pages/portfolio.html#L45) | link nama profil ke `index.html` → `my_pages/index.html` yang tidak ada |
| `my_pages/assets_services/css/style.css:351,773` | dua `url()` menunjuk gambar latar yang tidak ada |
| ~90 link | `target="_black"` (typo dari `_blank`) |
| `my_pages/web_dev_services.html:264-267` | form newsletter `action=""` → POST ke Pages = 405; blurb-nya masih **Lorem ipsum** |
| `my_pages/web_dev_services.html` | klaim "2+ years experience" bentrok dengan beranda yang menghitung otomatis "5 years" sejak 2021 |
| `index.html` keywords | nama tertulis "Kukoh **Kantoso**" (seharusnya Santoso) |
| Checklist pricing | Basic & Standard menandai "Responsive Design" **tidak tersedia** — hampir pasti terbalik |
| Nama file gambar | `asmarine (1).png` — spasi + kurung, perlu encoding URL; ganti ke `asmarine-1.avif` |

## Beban mati yang dibuang

- `my_pages/assets_services/` — **~7,5MB duplikat byte-identik** dari `assets/vendor/`, melayani satu halaman.
- ~2,6MB file `.map` dan sumber vendor tak terminifikasi yang tidak pernah disajikan.
- Library dimuat di semua halaman tapi tak terpakai: `php-email-form` (tidak ada form), `counterup`+`waypoints` (`[data-toggle=counter-up]` tidak ada), `typed.js` (hanya index), `isotope` (hanya portfolio), `owl.carousel` (dimuat di index yang tak punya carousel).
- Font ikon **3,3MB** (boxicons + icofont) untuk ~30 glyph → diganti sprite SVG inline ~3KB.
- Aset yatim ~4MB: `materi/`, `presence/`, `hero-img.png`, `teach.png` — sisa halaman yang sudah dihapus di `3e74169`.
- `main.js` scrollspy memanggil `.offset()`/`.outerHeight()` tiap `<section>` pada tiap event scroll → memaksa layout tiap frame. Diganti `IntersectionObserver`.

## Keputusan yang disepakati

| Keputusan | Pilihan |
|---|---|
| Stack | HTML5 + CSS modern + vanilla JS, **tanpa build step saat deploy** |
| Bahasa | Dwibahasa, **dua set URL statis** + `hreflang` |
| Halaman detail | **Di-generate** dari `projects.json` oleh script Node lokal |
| URL lama | URL baru + **stub redirect** (meta-refresh + canonical) |
| Tema | Light + dark otomatis + toggle manual |
| Copy | Boleh ditulis ulang dan dirapikan |

---

## Arsitektur

### Struktur direktori

Yang **di-commit** ditandai `[C]`, yang **di-generate** `[G]` (juga di-commit, karena Pages menyajikan apa adanya).

```
/
├── index.html              [G] beranda Bahasa Indonesia (canonical id + x-default)
├── proyek/<slug>/index.html    [G] 26 halaman detail ID
├── layanan/index.html          [G] halaman jasa + pricing ID
├── en/
│   ├── index.html          [G] beranda English
│   ├── projects/<slug>/index.html  [G] 26 halaman detail EN
│   └── services/index.html [G]
├── assets/
│   ├── css/main.css        [C] ~16KB, satu file
│   ├── js/main.js          [C] ~5KB, ES module
│   ├── icons.svg           [C] sprite SVG ~3KB
│   ├── fonts/              [C] 2 file woff2 subset
│   └── img/                [G] hasil optimasi
├── data/
│   ├── site.json           [C] profil, kontak, skill, resume, layanan, pricing (id+en)
│   └── projects.json       [C] 26 proyek (id+en)
├── templates/              [C] base/home/project/services .html
├── tools/
│   ├── build.js            [C] generator
│   ├── optimize-images.js  [C] pipeline gambar
│   └── package.json        [C] devDependency: sharp
├── my_pages/*.html         [G] 29 stub redirect
├── robots.txt              [C]
├── sitemap.xml             [G]
└── .nojekyll               [C]
```

**Catatan penyimpangan kecil dari kesepakatan:** Anda memilih `/id/` dan `/en/`. Saya sarankan Bahasa Indonesia tinggal di **root** (`/`) alih-alih `/id/`. Alasannya: `/` adalah URL yang sudah punya otoritas SEO dan sudah dibagikan orang; menaruh redirect di sana membuang satu hop dan melemahkan sinyal. `/` menjadi canonical `id` sekaligus `x-default`, `/en/` menjadi English. Kalau Anda tetap ingin simetri `/id/` + `/en/`, itu tetap bisa — bilang saja, tinggal ubah satu konstanta di `build.js`.

### `projects.json` — skema

```json
{
  "slug": "asmarine",
  "category": "web",
  "framework": "Silverstripe",
  "client": "Morning Glory Enterprise",
  "date": "2022-07",
  "featured": true,
  "link": { "type": "whatsapp", "url": "https://wa.me/6285232077932" },
  "images": [
    { "file": "asmarine-1", "alt": { "id": "Halaman beranda situs PT Anugrah Sukses Marine",
                                     "en": "Homepage of the PT Anugrah Sukses Marine site" } }
  ],
  "id": {
    "title": "ASMARINE",
    "summary": "Platform digital untuk operasional PT Anugrah Sukses Marine.",
    "body": "<p>…</p>",
    "features": ["Manajemen dokumen terpusat", "HRD dan umum", "…"]
  },
  "en": {
    "title": "ASMARINE",
    "summary": "A digital platform supporting PT Anugrah Sukses Marine's operations.",
    "body": "<p>…</p>",
    "features": ["Centralized document management", "HR and general affairs", "…"]
  }
}
```

`site.json` memakai pola `{id, en}` yang sama untuk copy, dengan data netral bahasa (email, WA, URL sosial, persentase skill) di level atas agar tidak terduplikasi.

### `build.js`

±150 baris, **nol dependency runtime**. Templating memakai *template literal* JavaScript biasa — tiap file di `templates/` diekspor sebagai fungsi `(data, lang, t) => string`. Alasan memilih ini ketimbang Handlebars/eta: tidak menambah dependency, tidak ada bahasa template baru untuk dipelajari, dan escaping bisa dikontrol eksplisit lewat satu helper `esc()`.

Yang dikerjakan, semuanya idempoten (hapus-lalu-tulis direktori keluaran, aman dijalankan berulang):
1. Baca `data/*.json`, validasi field wajib, gagal keras (`process.exit(1)`) bila ada slug ganda atau gambar yang tidak ada di disk.
2. Render beranda, halaman jasa, dan 26 detail × 2 bahasa = **58 halaman**.
3. Sisipkan blok `<head>` SEO lengkap per halaman (lihat di bawah).
4. Tulis `sitemap.xml` dengan `<xhtml:link rel="alternate" hreflang>` untuk tiap pasangan.
5. Tulis 29 stub redirect di path `my_pages/*` lama.
6. Cetak ringkasan: jumlah halaman, total byte, dan peringatan bila ada halaman > budget.

### CSS

Satu file `assets/css/main.css`, target **≤16KB** (belum gzip). Tanpa framework, tanpa reset pihak ketiga.

- **Lapis token** — seluruh warna, spasi, radius, dan bayangan sebagai custom property di `:root`. Palet light didefinisikan penuh di `:root` polos; blok `@media (prefers-color-scheme: dark)` dan `:root[data-theme="dark"]` hanya menimpa token, tidak menulis ulang komponen.
- **Layout** — CSS Grid untuk kerangka halaman, Flexbox untuk komponen, `clamp()` untuk tipografi fluid sehingga breakpoint yang dibutuhkan tinggal 2 (`48rem`, `72rem`) bukan lima seperti Bootstrap.
- **Komponen** — navbar, hero, kartu proyek, grid filter, timeline resume, kartu skill, tabel harga, kartu kontak, footer, dialog lightbox. Sekitar 10 komponen.
- **Anti-FOUC tema** — satu skrip inline ~6 baris di `<head>` (sebelum CSS) membaca `localStorage.theme` dan menyetel `data-theme` di `<html>` sebelum paint pertama. Ini satu-satunya skrip blocking di situs, dan wajib: tanpanya halaman berkedip putih di mode gelap.
- Hormati `prefers-reduced-motion: reduce` — semua transisi dimatikan di sana.

### JavaScript

Satu modul `assets/js/main.js`, target **≤5KB**. Tiap library lama punya pengganti native:

| Fungsi | Dulu | Sekarang | Perkiraan |
|---|---|---|---|
| Scroll reveal | AOS (44KB) | `IntersectionObserver` + CSS transition | ~0,4KB |
| Efek ketik hero | Typed.js (96KB) | CSS `steps()` animation, atau hapus | 0 |
| Filter portofolio | Isotope (132KB) | filter `hidden` attribute + CSS grid | ~0,6KB |
| Carousel gambar proyek | Owl Carousel (192KB) | CSS `scroll-snap-type: x mandatory` | ~0,2KB |
| Lightbox | VenoBox (100KB) | elemen `<dialog>` native | ~0,5KB |
| Scrollspy nav | jQuery loop tiap scroll | `IntersectionObserver` | ~0,5KB |
| Mobile nav | jQuery toggle | `classList` + `aria-expanded` | ~0,3KB |
| Toggle tema & bahasa | — | `localStorage` + atribut | ~0,8KB |

**jQuery, Bootstrap JS, Waypoints, CounterUp dihapus total.** Transisi antar halaman memakai View Transitions API di browser yang mendukung, dengan degradasi mulus (tanpa polyfill).

### Pipeline gambar

Mesin tidak punya ImageMagick maupun cwebp — jadi `tools/package.json` menambahkan **`sharp`** sebagai devDependency (`npm install` lokal sekali; `node_modules/` masuk `.gitignore`, tidak pernah ter-deploy).

`optimize-images.js` memproses 123 screenshot + aset profil:
- Keluaran **AVIF + WebP**, dengan JPEG sebagai fallback terakhir.
- Lebar responsif **480 / 960 / 1440px**; screenshot 1920px di-downscale — tidak ada layar portofolio yang butuh lebih.
- Markup `<picture>` dengan `srcset`+`sizes`, ditambah `width`/`height` eksplisit (mencegah CLS) dan `loading="lazy"` + `decoding="async"` untuk semua gambar di bawah lipatan.
- Kasus paling boros diperbaiki spesifik: `profile-img.jpg` 1524×1524/713KB → 256px avatar (~12KB); `CV.jpg` 1MB JPEG → **diganti PDF asli** (sebuah CV seharusnya PDF, bukan foto).
- Perkiraan hasil: **37MB → sekitar 3–4MB**, dan beranda dari 2.254KB → **target ≤150KB / ≤15 request**.

Font ikon 3,3MB diganti sprite SVG inline. Google Fonts diganti **self-host woff2 subset** (2 file, ~30KB) dengan `font-display: swap` + `preload` — menghapus dua koneksi pihak ketiga sekaligus render-blocking.

### SEO

Blok `<head>` yang di-generate tiap halaman:

```html
<title>{judul unik per halaman}</title>
<meta name="description" content="{deskripsi unik, 120–160 karakter}">
<link rel="canonical" href="https://qkohst.github.io/{path}">
<link rel="alternate" hreflang="id"        href="https://qkohst.github.io/{path-id}">
<link rel="alternate" hreflang="en"        href="https://qkohst.github.io/en/{path-en}">
<link rel="alternate" hreflang="x-default" href="https://qkohst.github.io/{path-id}">
<meta property="og:type" content="{website|article}">
<meta property="og:title" …><meta property="og:description" …>
<meta property="og:image" content="{URL absolut 1200×630}">
<meta property="og:url" …><meta property="og:locale" content="{id_ID|en_US}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="…">
```

JSON-LD per jenis halaman:
- Beranda → `Person` (dengan `sameAs` ke 6 akun sosial) + `WebSite`
- Detail proyek → `CreativeWork` + `BreadcrumbList`
- Halaman jasa → `Service` + `Offer` untuk tiap tier harga

`robots.txt`: izinkan semua, tunjuk `Sitemap: https://qkohst.github.io/sitemap.xml`. `sitemap.xml` memuat 58 URL dengan anotasi `hreflang` timbal balik. `.nojekyll` ditambahkan sebagai jaring pengaman (dan mempercepat build Pages).

Setiap `<h1>` menjadi subjek halaman sebenarnya (nama proyek), bukan nama pemilik. Ke-188 `alt` kosong diisi dari `projects.json`.

---

## Urutan migrasi

Situs tetap hidup dan utuh di setiap fase — tidak ada titik di mana produksi rusak.

| Fase | Isi | Risiko |
|---|---|---|
| **1. Tooling + data** | Buat `tools/`, `data/`, ekstrak seluruh konten 29 halaman ke `site.json`+`projects.json`. Belum ada perubahan pada situs live. | Nihil |
| **2. Desain** | Tulis `main.css`, `main.js`, `templates/`. Generate ke folder `_preview/` untuk ditinjau lokal. Situs live belum tersentuh. | Nihil |
| **3. Gambar** | Jalankan `optimize-images.js` → `assets/img/`. Aset lama masih di tempat. | Rendah |
| **4. Peralihan** | Generate ke lokasi final, ganti `index.html` root, tulis 29 stub redirect, tambah `sitemap.xml`/`robots.txt`/`.nojekyll`. | **Tertinggi** |
| **5. Pembersihan** | Hapus `my_pages/assets/`, `my_pages/assets_services/`, aset yatim. | Sedang |

**Langkah paling berisiko adalah fase 4** — di situlah URL berubah dan beranda diganti. Cara meredamnya: fase 4 dan 5 dipisah dan di-commit terpisah, sehingga aset lama masih ada saat URL baru sudah live. Bila ada yang meleset, `git revert` satu commit mengembalikan beranda tanpa menyentuh aset. Penghapusan aset (fase 5) baru dijalankan setelah verifikasi fase 4 lulus seluruhnya.

## Verifikasi

Tiap syarat dibuktikan dengan pengukuran, bukan pengamatan sekilas. Skrip sapuan Playwright yang sudah saya pakai untuk audit ini dipakai ulang sebagai alat uji regresi.

| Syarat | Cara membuktikan | Ambang lulus |
|---|---|---|
| **Responsif** | Sapu 58 halaman di viewport 360 / 768 / 1440px, ukur `scrollWidth > clientWidth` dan hitung elemen yang melewati tepi | 0 horizontal scroll, 0 elemen overflow |
| **Load ringan** | `performance.getEntriesByType('resource')` per jenis halaman | beranda ≤150KB & ≤15 request (baseline sekarang 2.254KB / 37) |
| **SEO** | Sapu 58 halaman: cek `title`/`description` unik, `canonical`, timbal balik `hreflang`, JSON-LD ter-parse | 58 judul unik, 58 deskripsi unik, 100% canonical, hreflang timbal balik valid |
| **Gambar** | Hitung `<img>` tanpa `alt`, tanpa `width`/`height`, tanpa `loading=lazy` | nol di ketiganya |
| **Transisi halus** | Rekam trace saat scroll, dan verifikasi seluruh animasi mati di bawah `prefers-reduced-motion` | tidak ada long task >50ms saat scroll |
| **Link** | `HEAD` ke tiap referensi internal di 58 halaman + 29 stub lama | 0 yang 404 |
| **Aksesibilitas** | Cek urutan heading, `aria-expanded` pada nav, focus trap pada `<dialog>`, kontras token terhadap WCAG AA | AA terpenuhi untuk teks |

Lighthouse CLI belum terpasang. Saya sarankan menambahkannya (`npx lighthouse`, tanpa instalasi permanen) di akhir fase 4 untuk satu angka pembanding — tapi tabel di atas sudah cukup untuk membuktikan tiap syarat tanpanya.

## Keputusan lanjutan (sudah dijawab)

### 1. CV — di-generate dari HTML, struktur lama dipertahankan

`CV.jpg` (foto 1MB, 2041×2863) diganti **CV yang dihasilkan dari data**, dengan tata letak dipertahankan persis: A4 dua kolom, aksen biru muda, kolom kiri (foto, banner nama, About me, kontak, Programming Skills bermeter blok, Framework, Social Media) dan kolom kanan (Education, Experience, Certificate, Other Information + QR).

Implementasi:
- `templates/cv.html` + `assets/css/cv.css` (`@page { size: A4; margin: 0 }`) dirender `build.js` dari `site.json` yang sama dengan beranda — jadi CV selalu ikut konten situs, dua bahasa.
- Halaman `/cv/` dan `/en/cv/` bisa dibuka dan dicetak sendiri (`noindex`, tidak masuk sitemap).
- `tools/build-cv.js` mencetaknya ke **PDF asli** via headless Chrome saat build lokal → tombol "Download CV" menautkan file PDF statis. Tidak ada library PDF di sisi klien: `jsPDF`/`html2pdf` berukuran 300KB+ dan akan membatalkan syarat "load ringan".
- QR code digenerate saat build (devDependency `qrcode`), bukan gambar tetap.

**Ketidaksinkronan yang ditemukan** antara CV lama dan website, ditangani tanpa kehilangan data — tiap entri `site.json` punya `showOn`:

| Item | CV lama | Website | `showOn` |
|---|---|---|---|
| Junior Graphic Designer, PT. Laut Bonang Rembang (08.2016–12.2016) | ada | tidak | `["cv"]` |
| Bizmatic ID (04.2025–Present) | tidak | ada | `["cv","site"]` |
| Skill HTML | ada | tidak | `["cv"]` |
| Framework | 4 | 8 | semua `["cv","site"]` |
| Sertifikat | 2 | 3 | semua `["cv","site"]` |

Default ini mereplikasi kondisi sekarang di kedua permukaan. Teks usang "Approximately 3 year" dan jabatan "Back-end Web Development" di CV diganti nilai hidup dari `site.json`.

### 2. Gambar OG 1200×630 — dibuat

Digenerate saat build dari logo + nama + peran, satu varian per bahasa, disimpan `assets/img/og/`. Dipakai semua halaman; halaman detail proyek memakai screenshot pertamanya sebagai OG image.

### 3. Checklist pricing — diperbaiki

"Responsive Design" dan "Design Customization" saat ini ditandai **tidak tersedia** di tier Basic dan Standard. Dibalik menjadi tersedia di semua tier. Klaim "2+ years experience" diganti nilai terhitung yang sama dengan beranda.

### 4. Crisp live chat — dipertahankan

Dipasang di **seluruh** halaman (sekarang hanya 2 dari 29), dimuat `defer` setelah interaksi pertama atau `requestIdleCallback` agar tidak memengaruhi metrik muat awal. Website ID `1389c3f9-bf80-4645-ba9e-f3834eec71c6` dipindah ke `site.json`.

## Pembersihan sisa audit — selesai

File sementara `01-index-desktop.png` dan `seo-sweep.json` yang dihasilkan proses audit sudah dihapus dari root repo, dan server HTTP lokal di port 8899 sudah dihentikan. Folder `.playwright-mcp/` tercakup `.gitignore`.
