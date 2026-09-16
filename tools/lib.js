/* Utilitas bersama untuk generator dan templat. */

/** Escape untuk konteks teks/atribut HTML. Dipakai pada SEMUA nilai dari data. */
const esc = v => String(v ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

/** Gabungkan potongan kelas/atribut, buang yang falsy. */
const join = (...parts) => parts.filter(Boolean).join('');

/** Ulangi templat untuk tiap item. */
const each = (arr, fn) => (arr || []).map(fn).join('');

/** Ikon dari sprite. */
let ICON_VER = '';
const setIconVersion = v => { ICON_VER = v ? `?v=${v}` : ''; };
const icon = (name, cls = '') =>
  `<svg class="${esc(cls)}" aria-hidden="true" focusable="false"><use href="/assets/icons.svg${ICON_VER}#i-${esc(name)}"></use></svg>`;

/** Ambil blok bahasa dari objek {id, en}. */
const t = (obj, lang) => (obj && obj[lang]) || {};

/** Prefiks path per bahasa, disetel dari data/site.json oleh build.js.
    Bahasa default memakai prefiks kosong sehingga menempati akar situs. */
let PREFIX = { id: '', en: '/en' };
const setPrefixes = p => { PREFIX = { ...PREFIX, ...p }; };
const prefix = lang => PREFIX[lang] || '';

/** Segmen path yang berbeda per bahasa. */
const SEGMENT = {
  projects:  { id: 'proyek', en: 'projects' },
  services:  { id: 'layanan', en: 'services' },
  proposals: { id: 'penawaran', en: 'proposals' },
  cv:        { id: 'cv', en: 'cv' }
};

/** URL internal absolut-dari-root untuk sebuah halaman.

    Jenis halaman yang memakai slug WAJIB punya cabang eksplisit di sini. Baris
    terakhir adalah jalur untuk halaman indeks dan mengakses SEGMENT[kind]
    langsung; kind berslug seperti 'proposal' tidak ada di SEGMENT (yang ada
    bentuk jamaknya), sehingga tanpa cabangnya sendiri baris itu melempar
    TypeError, bukan menghasilkan URL yang salah diam-diam. */
function pageUrl(kind, lang, slug) {
  const p = prefix(lang);
  if (kind === 'home') return p ? `${p}/` : '/';
  if (kind === 'project') return `${p}/${SEGMENT.projects[lang]}/${slug}/`;
  if (kind === 'projects') return `${p}/${SEGMENT.projects[lang]}/`;
  if (kind === 'service') return `${p}/${SEGMENT.services[lang]}/${slug}/`;
  if (kind === 'proposal') return `${p}/${SEGMENT.proposals[lang]}/${slug}/`;
  return `${p}/${SEGMENT[kind][lang]}/`;
}

/** Tautan WhatsApp dengan pesan yang sudah terisi sesuai konteks dan bahasa.
    Pesan dibangkitkan saat build, bukan disimpan di data, supaya isinya selalu
    mengikuti bahasa halaman dan judul yang sedang dibuka. */
function waLink(phoneE164, pesan) {
  return `https://api.whatsapp.com/send?${new URLSearchParams({ phone: phoneE164, text: pesan })}`;
}

/** Pesan WhatsApp baku per konteks. */
const WA_TEKS = {
  project: {
    id: judul => `Halo, saya melihat proyek "${judul}" di portofolio Anda. Boleh saya tahu lebih lanjut tentang proyek ini?`,
    en: judul => `Hello, I came across your "${judul}" project in your portfolio. Could you tell me more about it?`
  },
  service: {
    id: judul => `Halo, saya tertarik dengan layanan ${judul}. Boleh dibantu untuk konsultasi dan penawarannya?`,
    en: judul => `Hello, I am interested in your ${judul} service. Could you help me with a consultation and a quote?`
  },
  paket: {
    id: (judul, paket) => `Halo, saya tertarik dengan layanan ${judul} paket ${paket}. Boleh dibantu untuk penawarannya?`,
    en: (judul, paket) => `Hello, I am interested in the ${paket} package for your ${judul} service. Could you send me a quote?`
  },
  proposal: {
    id: judul => `Halo, saya membaca proposal penawaran ${judul}. Boleh dibantu untuk diskusi lebih lanjut dan penyesuaian kebutuhan kami?`,
    en: judul => `Hello, I have read your ${judul} proposal. Could we discuss it further and adjust it to our needs?`
  },
  demo: {
    id: judul => `Halo, saya ingin mencoba demo ${judul} sebelum memutuskan. Boleh dijadwalkan?`,
    en: judul => `Hello, I would like to try a demo of ${judul} before deciding. Could we schedule one?`
  },
  umum: {
    id: () => 'Halo, saya menemukan portofolio Anda dan ingin berdiskusi tentang sebuah proyek.',
    en: () => 'Hello, I found your portfolio and would like to discuss a project.'
  }
};

/** Berkas PDF CV statis yang dihasilkan tools/build-cv-pdf.js. */
const cvPdf = (handle, lang) => `/assets/cv/cv-${handle}-${lang}.pdf`;

/** URL penuh dengan origin, untuk canonical/OG/sitemap. */
const absUrl = (origin, path) => origin.replace(/\/$/, '') + path;

const MONTH = {
  id: ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
  en: ['January','February','March','April','May','June','July','August','September','October','November','December']
};

/** "2024-07" -> "Juli 2024" / "July 2024". */
function fmtMonth(iso, lang) {
  if (!iso) return '';
  const [y, m] = iso.split('-');
  return `${MONTH[lang][Number(m) - 1]} ${y}`;
}

/** Rentang pengalaman: "April 2025 — Sekarang". */
function fmtRange(from, to, lang, presentLabel) {
  const a = fmtMonth(from, lang);
  const b = to ? fmtMonth(to, lang) : presentLabel;
  return `${a} — ${b}`;
}


/** Format harga USD, tanpa desimal. */
const fmtUsd = n => '$' + Number(n).toLocaleString('en-US');

/** Konversi USD ke rupiah lalu dibulatkan agar terbaca sebagai harga, bukan
    hasil kalkulator. Kurs dan tanggalnya disimpan di data/site.json. */
function fmtIdr(usd, cur) {
  const kasar = Number(usd) * cur.idrPerUsd;
  const bulat = Math.round(kasar / cur.roundIdrTo) * cur.roundIdrTo;
  return 'Rp' + bulat.toLocaleString('id-ID');
}

/** "2026-09-11" -> "11 September 2026" / "11 September 2026" */
const fmtDate = (iso, lang) => {
  const [y, m, d] = iso.split('-');
  return `${Number(d)} ${MONTH[lang][Number(m) - 1]} ${y}`;
};

/** Tahun pengalaman dihitung dari tahun mulai. */
const yearsSince = start => Math.max(1, new Date().getFullYear() - start);

/** Saring entri berdasarkan penanda showOn. */
const shown = (arr, surface) => (arr || []).filter(x => !x.showOn || x.showOn.includes(surface));

module.exports = { esc, join, each, icon, setIconVersion, setPrefixes, t, prefix, SEGMENT, pageUrl, cvPdf, waLink, WA_TEKS, absUrl, fmtMonth, fmtRange, fmtUsd, fmtIdr, fmtDate, yearsSince, shown };
