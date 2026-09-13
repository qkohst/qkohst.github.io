/**
 * Menggabungkan data/projects.draft.json (hasil ekstraksi mentah) dengan
 * data/projects.id.json (copy Bahasa Indonesia) menjadi data/projects.json final.
 *
 * Bagian mekanis dikerjakan di sini agar tidak ada salah ketik manual:
 *   - tanggal "Augt 2022" / "Des 2021" / "Sept 2024"  -> "2022-08" / "2021-12" / "2024-09"
 *   - nama berkas "asmarine (1).png"                  -> "asmarine-1"
 *   - URL WhatsApp dengan spasi mentah + & telanjang  -> ter-encode benar
 *
 *   node tools/make-projects.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const read = f => JSON.parse(fs.readFileSync(path.join(ROOT, 'data', f), 'utf8'));

const draft = read('projects.draft.json');
const copy = fs.existsSync(path.join(ROOT, 'data', 'projects.copy.json')) ? read('projects.copy.json') : {};

/** Emoji dekoratif di akhir kalimat pada copy lama — dilepas agar nada tetap formal. */
const stripEmoji = s => s.replace(/\s*[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]+\s*$/u, '').trim();

/** Ringkasan pendek untuk kartu & meta description (maks ~155 karakter, dipotong di batas kata). */
function shorten(text, max = 155) {
  const t = stripEmoji(text || '');
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:]$/, '') + '…';
}

/**
 * Slug per bahasa. Nama diri (Asmarine, TreePort, Dinamika) tidak diterjemahkan;
 * nama generik memakai istilah masing-masing bahasa.
 * Kunci = legacySlug dari nama berkas lama. Slug ini permanen begitu terbit.
 */
const SLUGS = {
  'lms-external-ojk':      { id: 'lms-eksternal-ojk',            en: 'lms-external-ojk' },
  'lms-internal-ojk':      { id: 'lms-internal-ojk',             en: 'lms-internal-ojk' },
  'bo-dlik-ojk':           { id: 'backoffice-dlik-ojk',          en: 'backoffice-dlik-ojk' },
  'pabrik_plastik_api':    { id: 'api-pabrik-plastik',           en: 'plastic-factory-api' },
  'property_api':          { id: 'api-properti',                 en: 'property-api' },
  'treeport_api':          { id: 'api-treeport',                 en: 'treeport-api' },
  'pamdes':                { id: 'st-pamdes',                    en: 'st-pamdes' },
  'asmarine':              { id: 'asmarine',                     en: 'asmarine' },
  'pabrik_plastik':        { id: 'pabrik-plastik',               en: 'plastic-factory' },
  'megaria':               { id: 'hotel-megaria',                en: 'megaria-hotel' },
  'dinamika':              { id: 'dinamika',                     en: 'dinamika' },
  'treeport':              { id: 'treeport',                     en: 'treeport' },
  'mgschedule':            { id: 'mg-schedule',                  en: 'mg-schedule' },
  'indonesia_peduli':      { id: 'indonesia-peduli',             en: 'indonesia-peduli' },
  'e_raport':              { id: 'e-raport',                     en: 'e-raport' },
  'e_skripsi_RESTful_API': { id: 'api-e-skripsi',                en: 'e-skripsi-api' },
  'eSkripsi_webClient':    { id: 'klien-web-e-skripsi',          en: 'e-skripsi-web-client' },
  'e_skripsi_Mobile':      { id: 'klien-mobile-e-skripsi',       en: 'e-skripsi-mobile-client' },
  'siasek':                { id: 'sistem-administrasi-sekolah',  en: 'school-administration-system' },
  'surat':                 { id: 'manajemen-surat',              en: 'mail-management-system' },
  'ciLogin':               { id: 'sistem-login-codeigniter',     en: 'ci-login-system' },
  'manhud':                { id: 'website-sekolah-manbaul-huda', en: 'manbaul-huda-school-website' },
  'sosmed':                { id: 'jejaring-sosial-laravel',      en: 'laravel-social-network' },
  'pkbm':                  { id: 'ppdb-pkbm',                    en: 'student-admission-pkbm' },
  'employee':              { id: 'manajemen-karyawan',           en: 'employee-management' },
  'rentalMobil':           { id: 'rental-mobil',                 en: 'car-rental' }
};

/** Singkatan bulan yang muncul di data lama, termasuk yang salah tulis. */
const MONTHS = {
  jan: '01', feb: '02', mar: '03', apr: '04',
  may: '05', mei: '05', jun: '06', jul: '07',
  aug: '08', augt: '08', agu: '08', sep: '09', sept: '09',
  oct: '10', okt: '10', nov: '11', dec: '12', des: '12'
};

function normalizeDate(raw) {
  if (!raw) return null;
  const m = /^([A-Za-z]+)\s+(\d{4})$/.exec(raw.trim());
  if (!m) return { error: raw };
  const mon = MONTHS[m[1].toLowerCase()];
  if (!mon) return { error: raw };
  return `${m[2]}-${mon}`;
}

/** "assets/img/portfolio/asmarine (1).png" -> "asmarine-1" */
function normalizeImage(src, slug, i) {
  const base = path.basename(src).replace(/\.(png|jpe?g)$/i, '');
  const m = /^(.*?)\s*\((\d+)\)$/.exec(base);
  const stem = (m ? m[1] : base).trim().replace(/[\s_]+/g, '-').toLowerCase();
  const num = m ? m[2] : String(i + 1);
  return { name: `${stem}-${num}`, source: `my_pages/${src}` };
}

/** WhatsApp/Postman/GitHub link: pastikan query ter-encode dengan benar. */
function normalizeLink(url) {
  if (!url) return null;
  if (/^https?:\/\/(api\.)?wa(\.me)?/.test(url) || /whatsapp/.test(url)) {
    const [base, query] = url.split('?');
    if (!query) return { type: 'whatsapp', url };
    const params = new URLSearchParams();
    for (const pair of query.split('&')) {
      const i = pair.indexOf('=');
      if (i < 0) continue;
      params.set(pair.slice(0, i), decodeURIComponent(pair.slice(i + 1).replace(/\+/g, ' ')));
    }
    return { type: 'whatsapp', url: `${base}?${params.toString()}` };
  }
  if (/documenter\.getpostman\.com/.test(url)) return { type: 'postman', url };
  if (/github\.com/.test(url)) return { type: 'github', url };
  return { type: 'link', url };
}

const problems = [];
const seen = { id: new Set(), en: new Set() };

const projects = draft.map(p => {
  const slug = SLUGS[p.legacySlug];
  if (!slug) problems.push(`${p.legacySlug}: slug per bahasa belum didefinisikan`);
  for (const lang of ['id', 'en']) {
    if (!slug) continue;
    if (seen[lang].has(slug[lang])) problems.push(`slug ${lang} ganda: ${slug[lang]}`);
    seen[lang].add(slug[lang]);
  }

  const date = normalizeDate(p.dateRaw);
  if (date && date.error) problems.push(`${p.legacySlug}: tanggal tidak dikenali "${date.error}"`);

  const c = copy[p.legacySlug];
  if (!c || !c.id) problems.push(`${p.legacySlug}: copy Bahasa Indonesia belum ada`);

  const enTitle = (c && c.en && c.en.title) || p.title;
  const idTitle = (c && c.id && c.id.title) || null;

  // alt dibangkitkan dari judul + urutan; bisa ditimpa lewat projects.copy.json bila
  // suatu saat ingin deskripsi spesifik per tangkapan layar.
  const images = p.images.map((src, i) => {
    const n = normalizeImage(src, p.legacySlug, i);
    const override = c && c.imageAlt && c.imageAlt[i];
    const total = p.images.length;
    return {
      name: n.name,
      source: n.source,
      alt: {
        id: (override && override.id) || (idTitle ? `Tangkapan layar ${i + 1} dari ${total} — ${idTitle}` : null),
        en: (override && override.en) || `Screenshot ${i + 1} of ${total} — ${enTitle}`
      }
    };
  });

  return {
    key: p.legacySlug,
    slug: slug || { id: p.slug, en: p.slug },
    category: p.category,
    framework: p.framework || null,
    client: p.client && !/^none$/i.test(p.client) ? p.client : null,
    date: date && !date.error ? date : null,
    link: normalizeLink(p.link),
    legacyPath: p.legacyPath,
    thumb: normalizeImage(p.thumb || p.images[0], p.legacySlug, 0).name,
    images,
    id: c && c.id ? {
      title: c.id.title,
      summary: c.id.summary || shorten(c.id.body && c.id.body[0]),
      body: c.id.body,
      features: c.id.features || []
    } : null,
    en: {
      title: enTitle,
      summary: (c && c.en && c.en.summary) || shorten(p.paragraphs[0]),
      body: p.paragraphs.map(stripEmoji),
      features: p.features
    }
  };
});

fs.writeFileSync(path.join(ROOT, 'data', 'projects.json'), JSON.stringify(projects, null, 2) + '\n');

console.log(`proyek ditulis : ${projects.length}`);
console.log(`total gambar   : ${projects.reduce((s, p) => s + p.images.length, 0)}`);
console.log(`tanggal normal : ${projects.filter(p => p.date).length}/${projects.length}`);
console.log(`copy ID lengkap: ${projects.filter(p => p.id).length}/${projects.length}`);
console.log(`alt ID terisi  : ${projects.reduce((s, p) => s + p.images.filter(i => i.alt.id).length, 0)}/${projects.reduce((s, p) => s + p.images.length, 0)}`);
const linkTypes = projects.reduce((m, p) => (m[p.link ? p.link.type : 'none'] = (m[p.link ? p.link.type : 'none'] || 0) + 1, m), {});
console.log(`jenis tautan   : ${JSON.stringify(linkTypes)}`);
if (problems.length) {
  console.log(`\nBELUM LENGKAP (${problems.length}):`);
  for (const p of problems.slice(0, 40)) console.log('  - ' + p);
} else {
  console.log('\nsemua lengkap');
}
