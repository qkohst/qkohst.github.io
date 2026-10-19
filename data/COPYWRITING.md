# Pedoman Copywriting Dwibahasa

Acuan tunggal untuk semua copy di `site.json`, `projects.json`, `proposals.json`,
dan katalog `ui`. Dibaca manusia, bukan build — tapi setiap string di tiga
berkas itu harus bisa dibenarkan dengan halaman ini.

Alasan keberadaannya: copy situs ini ditulis bertahap oleh satu orang dalam dua
bahasa. Tanpa keputusan yang ditulis, bahasa Indonesia berangsur menjadi
terjemahan literal dari bahasa Inggris, dan bahasa Inggris berangsur menjadi
deskripsi jabatan pihak ketiga. Keduanya sudah pernah terjadi di repo ini.

---

## 1. Suara

### Bahasa Indonesia

Indonesia profesional-konversasional. Bukan terjemahan, bukan bahasa laporan.

- **Kalimat aktif**, subjek "saya" dibiarkan tersirat bila konteksnya sudah
  jelas. "Membangun sistem penggajian…", bukan "Telah dilakukan pembangunan…".
- **Maksimal ~20 kata per kalimat.** Kalimat majemuk bertingkat dipecah.
- **Pembaca disebut "Anda"**, bukan "klien" atau "pengguna", di semua copy yang
  berbicara langsung kepada calon klien (layanan, penawaran, kontak).
- Nada: percaya diri, konkret, tidak merendah dan tidak membesarkan diri.

Frasa yang **tidak** dipakai:

| Dilarang | Alasan | Pakai |
|---|---|---|
| "Bertanggung jawab atas…" | Terjemahan literal "Responsible for". Menyebut jabatan, bukan hasil | Kata kerja aksi langsung: "Membangun…", "Merapikan…", "Menyatukan…" |
| "melakukan pembangunan", "melakukan pengelolaan" | Kata kerja yang dilemahkan jadi kata benda | "membangun", "mengelola" |
| "merupakan" | Kaku, hampir selalu bisa dibuang | "adalah", atau hilangkan |
| "yang mana", "di mana" sebagai penghubung | Terjemahan "which"/"where" | Pecah kalimatnya |
| "dirancang untuk", "solusi digital", "secara modern dan efisien" | Bahasa pemasaran tanpa isi | Sebut apa yang benar-benar dikerjakan |
| "dapat diandalkan", "user friendly", "intuitif" | Klaim tanpa bukti | Sebut perilakunya yang konkret |

### Bahasa Inggris

Orang pertama tersirat, bukan orang ketiga. Ini portofolio, bukan lowongan.

- **Past tense untuk peran dan proyek yang sudah selesai.** **Present tense
  hanya untuk peran yang masih berjalan** — saat ini hanya `experience[0]`
  (Bizmatic ID, 2025-04 → sekarang).
- Satu gagasan per kalimat. Tidak ada klausa bertumpuk.

Frasa yang **tidak** dipakai:

| Dilarang | Alasan | Pakai |
|---|---|---|
| "Responsible for…" | Suara deskripsi jabatan. Menyebut tugas, bukan hasil | "Built…", "Maintained…", "Integrated…" |
| "Manages", "Maintains" sebagai pembuka (orang ketiga) | Seolah ditulis orang lain tentang saya | Bentuk lampau orang pertama tersirat |
| "passionate", "dedicated", "hardworking", "strong passion for" | Klise yang tidak bisa diverifikasi | Angka dan cakupan: "5+ years building production systems" |
| "cutting-edge", "robust", "seamless", "leverage" | Buzzword | Sebut teknologi dan hasilnya |
| "various", "etc." di akhir daftar | Mengaku daftarnya tidak lengkap | Sebutkan yang penting, hentikan |

### Berlaku untuk keduanya

- **Deskripsi pengalaman dan proyek berorientasi hasil**, dengan pola
  **[kata kerja aksi] + [objek] + [hasil/konteks]**.

  Sebelum: "Responsible for server-side web application logic and integration
  of the work front-end developers do."
  Sesudah (EN): "Built and maintained server-side logic for production web apps
  and integrated REST APIs consumed by web and mobile clients."
  Sesudah (ID): "Membangun dan merawat logika server untuk aplikasi web
  produksi, serta mengintegrasikan REST API yang dipakai klien web dan mobile."

- **Pesan setara, bukan kata setara.** EN dan ID menyampaikan hal yang sama
  dengan cara yang wajar di bahasanya masing-masing. Kalimat ID yang hanya bisa
  dimengerti setelah dibayangkan versi Inggrisnya harus ditulis ulang.
- **Jangan ulangi apa yang sudah terbaca di sebelahnya.** Ringkasan sertifikat
  tidak perlu menyebut penerbit — penerbitnya sudah dirender tepat di atasnya
  (`templates/home.js:127-128`).

---

## 2. Padanan istilah

Satu pilihan, dipakai di semua berkas. Kolom ID adalah bentuk yang dipakai di
copy berbahasa Indonesia.

| Inggris | Indonesia | Catatan |
|---|---|---|
| back-end / front-end | **back-end / front-end** | Tetap. Sudah lazim di industri; padanan "sisi server/sisi klien" dipakai hanya bila kalimatnya butuh penjelasan |
| back-office | **backoffice** | Satu kata, tanpa tanda hubung. Mengikuti `ui.categories.backoffice` yang sudah ada |
| maintainable | **mudah dirawat** | Bukan "mudah dipelihara" (berkesan tanaman) |
| clean code | **kode yang rapi** | Bukan "kode bersih" |
| delivered (proyek) | **diselesaikan** | Bukan "dikirim" |
| deployment / deploy | **rilis / merilis** | |
| database | **basis data** | |
| learning management system | **sistem manajemen pembelajaran** | Boleh "LMS" setelah disebut penuh sekali |
| dashboard | **dasbor** | |
| feature | **fitur** | |
| report | **laporan** | |
| user / end user | **pengguna** | "Anda" bila berbicara langsung ke pembaca |
| client (pemberi kerja) | **klien** | |
| client (perangkat lunak) | **klien** | "klien web dan mobile" |
| procurement | **pengadaan** | |
| payroll | **penggajian** | |
| inventory | **persediaan** | |
| workflow | **alur kerja** | |
| role / permission | **peran / hak akses** | |
| responsive | **responsif** | |
| mobile | **mobile** | Tetap. "seluler" terasa kaku di konteks aplikasi |
| screenshot | **tangkapan layar** | |
| open source | **open source** | Tetap |

### Tidak pernah diterjemahkan

- **Nama teknologi:** PHP, JavaScript, SQL, CSS, Java, GIT, Laravel,
  CodeIgniter, Silverstripe, Bootstrap, Vue.js, Quasar, Node.js, Tailwind CSS,
  REST API / RESTful API.
- **Nama perusahaan dan organisasi:** Bizmatic ID, Morning Glory Enterprise,
  PKBM Nurul Jadid Tambakboyo, SMP Darut Tauhid Tambakboyo, PT. Laut Bonang
  Rembang, Dicoding Indonesia, Sanbercode, OJK.
- **Nama institusi pendidikan:** ditulis sesuai bentuk resminya di masing-masing
  bahasa seperti yang sudah ada di `education[]` — jangan diubah.
- **Nama proyek:** ASMARINE, Treeport, SIASEK, ST SmartPoint, dan seterusnya.

---

## 3. Angka dan fakta

Semuanya dihitung atau dibaca dari data. **Jangan pernah menulis angka ini
sebagai teks di dalam copy** — nanti berselisih dengan nilai yang dirender.

| Angka | Sumber | Nilai saat ini |
|---|---|---|
| Lama pengalaman | `yearsSince(profile.experienceSince)`, `experienceSince: 2021` | 5+ tahun |
| Jumlah proyek | `projects.length` | 27 |
| Jumlah framework | `shown(frameworks, 'site').length` | 8 |
| Jumlah kemampuan | `shown(skills, 'site').length` | 6 |
| Harga | `fmtRp()` dari `fromIdr` / `licenseIdr` | — |
| Tanggal | `fmtMonth()`, `fmtRange()` dari `tools/lib.js` | — |

Format tanggal, format rupiah, dan nama bulan **tidak disentuh** — semuanya
sudah ditangani `tools/lib.js`.

Fakta yang tidak boleh diubah atas nama copywriting: tahun, nama institusi,
nama jabatan, tingkat kemampuan (`level`), nomor dokumen penawaran, dan semua
nilai rupiah.

---

## 4. Panjang

| Jenis | Target | Pagar |
|---|---|---|
| `meta description` | 150–160 karakter | `tools/audit.js:93` menolak >165 |
| `<title>` | `Nama — Peran` / `Bagian — Nama` | `audit.js:81` mewajibkan unik per bahasa |
| Tagline hero | ≤70 karakter, satu kalimat | Pecah dua baris di ponsel kalau lebih |
| Ringkasan proyek | 80–135 karakter, satu kalimat | Dirender di kartu dengan tinggi seragam |
| Paragraf `body` | 2–4 kalimat | |
| Butir `features` | satu kalimat, pola `Nama fitur: penjelasan singkat.` | |
| Ringkasan sertifikat | **satu kalimat** | |
| Ringkasan pengalaman | **satu kalimat**, maksimal dua | |

Deskripsi tiap halaman harus **unik per bahasa** — dua halaman berdeskripsi
sama menggagalkan `audit.js:82`.

---

## 5. Letak copy

| Di mana | Apa |
|---|---|
| `data/site.json` → `profile`, `experience`, `education`, `certificates`, `services`, `servicesPage`, `pricing`, `pricingFeatures` | Isi beranda + CV |
| `data/site.json` → `ui.id` / `ui.en` | Seluruh label, teks a11y, dan deskripsi SEO. **Himpunan key kedua bahasa harus identik** |
| `data/projects.json` | 27 proyek. `siasek` dan `st-smartpoint` **dibangkitkan ulang** dari `content/projects/<key>/project.json` oleh `npm run sync` — edit di sana, bukan di sini |
| `data/proposals.json` | 4 dokumen penawaran + blok `bersama` |
| `tools/lib.js` → `WA_TEKS`, `MONTH` | Pengecualian yang disengaja. Templat pesan WhatsApp dan nama bulan tinggal di kode karena `lib.js` tidak punya akses ke `site.ui`; memindahkannya menuntut mengubah tanda tangan `waLink()` |

**Tidak ada copy baru yang boleh ditulis sebagai ternary `lang === 'id' ? … : …`
di dalam `templates/`.** Semuanya masuk `ui.id`/`ui.en`. Nilai yang perlu
disisipkan memakai placeholder `{n}` / `{total}`, mengikuti pola yang sudah
dipakai `data-template` di `templates/layout.js` dan `templates/projects.js`.

HTML di akar repo adalah **hasil build**. Mengeditnya sia-sia — akan ditimpa
`node build.js --out .`.

---

## 6. Pemeriksaan sebelum commit

```sh
cd tools && npm run pages && npm run audit
```

```sh
# frasa terlarang
#
# Pola ini sengaja dipatok sempit, hasil tiga kali penajaman:
#
#   - "responsible for" hanya dilarang sebagai PEMBUKA kalimat — itu pola
#     deskripsi jabatan. Di tengah kalimat ia Inggris yang wajar ("the data
#     they are responsible for").
#   - "dedicated" hanya dilarang bila menyifati ORANG. "A dedicated approval
#     flow" dan "a dedicated WhatsApp number" adalah kata sifat biasa.
#   - "dirancang untuk" yang diikuti penjelasan konkret tidak masalah; yang
#     dilarang adalah pemakaian tanpa isi.
#
# projects.copy.json dan projects.draft.json DIKECUALIKAN: keduanya sisa alat
# migrasi, tidak dibaca build.js, dan masih menyimpan copy lama sebelum audit.
grep -rniE '("|\. )(responsible for|bertanggung jawab atas)|passionate|hardworking|dedicated (developer|professional|worker|team)|game-changing|seamless|cutting-edge|solusi digital|dapat diandalkan|secara modern dan efisien|business insights|wawasan bisnis' \
  data/site.json data/projects.json data/proposals.json templates/ tools/lib.js tools/build.js

# paritas key ui antar bahasa
node -e "const u=require('./data/site.json').ui;const f=(o,p='')=>Object.entries(o).flatMap(([k,v])=>v&&typeof v==='object'&&!Array.isArray(v)?f(v,p+k+'.'):[p+k]);const a=f(u.id).sort(),b=f(u.en).sort();console.log('id',a.length,'en',b.length);console.log('hanya id:',a.filter(x=>!b.includes(x)));console.log('hanya en:',b.filter(x=>!a.includes(x)))"

# jumlah elemen array proyek harus sama di kedua bahasa
node -e "require('./data/projects.json').forEach(x=>{if(x.id.body.length!==x.en.body.length||x.id.features.length!==x.en.features.length)console.log('BEDA:',x.key)})"
```
