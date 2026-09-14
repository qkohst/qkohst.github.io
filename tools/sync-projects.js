/**
 * Menggabungkan proyek dari content/projects/<slug>/ ke data/projects.json.
 *
 *   node tools/sync-projects.js
 *
 * Yang dibangkitkan otomatis dari isi folder, sehingga tidak perlu ditulis
 * tangan: daftar gambar, nama turunan, path sumber, teks alt dua bahasa, dan
 * gambar sampul.
 *
 * Proyek lama (26 hasil migrasi situs lawas) TIDAK berada di content/ dan
 * tidak disentuh sama sekali — penggabungan dilakukan berdasarkan key.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CONTENT = path.join(ROOT, 'content', 'projects');
const DATA = path.join(ROOT, 'data', 'projects.json');

const site = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/site.json'), 'utf8'));
const KATEGORI = Object.keys(site.ui.id.categories);
const GAMBAR = /\.(png|jpe?g|webp)$/i;

if (!fs.existsSync(CONTENT)) {
  console.log('Belum ada content/projects/ — tidak ada yang perlu digabungkan.');
  process.exit(0);
}

const lama = JSON.parse(fs.readFileSync(DATA, 'utf8'));
const perKey = new Map(lama.map(p => [p.key, p]));

const galat = [];
const peringatan = [];
let ditambah = 0, diperbarui = 0;

for (const key of fs.readdirSync(CONTENT).sort()) {
  const dir = path.join(CONTENT, key);
  if (!fs.statSync(dir).isDirectory()) continue;

  const berkasMeta = path.join(dir, 'project.json');
  if (!fs.existsSync(berkasMeta)) { galat.push(`${key}: project.json tidak ada`); continue; }

  let m;
  try { m = JSON.parse(fs.readFileSync(berkasMeta, 'utf8')); }
  catch (e) { galat.push(`${key}: project.json bukan JSON valid — ${e.message}`); continue; }

  // --- validasi kolom wajib
  const wajib = [
    [m.slug && m.slug.id && m.slug.en, 'slug.id dan slug.en harus diisi'],
    [m.category && KATEGORI.includes(m.category), `category harus salah satu dari: ${KATEGORI.join(', ')}`],
    [/^\d{4}-\d{2}$/.test(m.date || ''), 'date harus format YYYY-MM'],
    [m.id && m.id.title, 'id.title harus diisi'],
    [m.en && m.en.title, 'en.title harus diisi'],
    [m.id && m.id.summary, 'id.summary harus diisi'],
    [m.en && m.en.summary, 'en.summary harus diisi']
  ];
  const kurang = wajib.filter(([ok]) => !ok).map(([, pesan]) => pesan);
  if (kurang.length) { galat.push(`${key}: ${kurang.join('; ')}`); continue; }

  // --- gambar dibaca dari isi folder, urut nama berkas
  const berkasGambar = fs.readdirSync(dir).filter(f => GAMBAR.test(f)).sort();
  if (!berkasGambar.length) peringatan.push(`${key}: belum ada gambar di foldernya`);

  const total = berkasGambar.length;
  const images = berkasGambar.map((f, i) => ({
    name: `${key}-${i + 1}`,
    source: path.posix.join('content/projects', key, f),
    alt: {
      id: `Tangkapan layar ${i + 1} dari ${total} — ${m.id.title}`,
      en: `Screenshot ${i + 1} of ${total} — ${m.en.title}`
    }
  }));

  const nomorThumb = Math.min(Math.max(1, Number(m.thumb) || 1), Math.max(1, total));
  if (total && Number(m.thumb) > total) {
    peringatan.push(`${key}: thumb ${m.thumb} melebihi jumlah gambar (${total}), dipakai gambar ${nomorThumb}`);
  }

  const entri = {
    key,
    slug: { id: m.slug.id, en: m.slug.en },
    category: m.category,
    framework: m.framework || null,
    client: m.client || null,
    date: m.date,
    link: m.link && m.link.url ? { type: m.link.type || 'link', url: m.link.url } : null,
    thumb: total ? images[nomorThumb - 1].name : null,
    images,
    id: { title: m.id.title, summary: m.id.summary, body: m.id.body || [], features: m.id.features || [] },
    en: { title: m.en.title, summary: m.en.summary, body: m.en.body || [], features: m.en.features || [] }
  };

  if (perKey.has(key)) diperbarui++; else ditambah++;
  perKey.set(key, entri);
}

// --- slug tidak boleh bentrok antar proyek
for (const lang of ['id', 'en']) {
  const terlihat = new Map();
  for (const p of perKey.values()) {
    const s = p.slug[lang];
    if (terlihat.has(s)) galat.push(`slug ${lang} "${s}" dipakai dua proyek: ${terlihat.get(s)} dan ${p.key}`);
    terlihat.set(s, p.key);
  }
}

if (galat.length) {
  console.error('Penggabungan dibatalkan:\n');
  for (const g of galat) console.error('  - ' + g);
  process.exit(1);
}

const hasil = [...perKey.values()];
fs.writeFileSync(DATA, JSON.stringify(hasil, null, 2) + '\n');

for (const w of peringatan) console.log('catatan: ' + w);
console.log(`proyek ditambah  : ${ditambah}`);
console.log(`proyek diperbarui: ${diperbarui}`);
console.log(`total di data    : ${hasil.length}`);
