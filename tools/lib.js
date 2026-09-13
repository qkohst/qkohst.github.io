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
const icon = (name, cls = '') =>
  `<svg class="${esc(cls)}" aria-hidden="true" focusable="false"><use href="/assets/icons.svg#i-${esc(name)}"></use></svg>`;

/** Ambil blok bahasa dari objek {id, en}. */
const t = (obj, lang) => (obj && obj[lang]) || {};

/** Prefiks path per bahasa: id -> '', en -> '/en'. */
const prefix = lang => (lang === 'en' ? '/en' : '');

/** Segmen path yang berbeda per bahasa. */
const SEGMENT = {
  projects: { id: 'proyek', en: 'projects' },
  services: { id: 'layanan', en: 'services' },
  cv:       { id: 'cv', en: 'cv' }
};

/** URL internal absolut-dari-root untuk sebuah halaman. */
function pageUrl(kind, lang, slug) {
  const p = prefix(lang);
  if (kind === 'home') return p ? `${p}/` : '/';
  if (kind === 'project') return `${p}/${SEGMENT.projects[lang]}/${slug}/`;
  if (kind === 'projects') return `${p}/${SEGMENT.projects[lang]}/`;
  return `${p}/${SEGMENT[kind][lang]}/`;
}

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

/** Tahun pengalaman dihitung dari tahun mulai. */
const yearsSince = start => Math.max(1, new Date().getFullYear() - start);

/** Saring entri berdasarkan penanda showOn. */
const shown = (arr, surface) => (arr || []).filter(x => !x.showOn || x.showOn.includes(surface));

module.exports = { esc, join, each, icon, t, prefix, SEGMENT, pageUrl, absUrl, fmtMonth, fmtRange, yearsSince, shown };
