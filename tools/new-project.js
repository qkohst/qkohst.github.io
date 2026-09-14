/**
 * Menyiapkan folder untuk satu proyek baru.
 *
 *   node tools/new-project.js sistem-inventori
 *
 * Menghasilkan content/projects/<slug>/project.json berisi kerangka yang
 * tinggal diisi. Daftar gambar TIDAK ditulis di sini — gambar dibaca dari isi
 * folder oleh tools/sync-projects.js, jadi cukup jatuhkan berkasnya.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const slug = (process.argv[2] || '').trim();

if (!slug) {
  console.error('Pemakaian: node tools/new-project.js <slug>');
  console.error('Contoh   : node tools/new-project.js sistem-inventori');
  process.exit(1);
}
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  console.error(`Slug "${slug}" tidak valid.`);
  console.error('Pakai huruf kecil, angka, dan tanda hubung. Contoh: sistem-inventori');
  process.exit(1);
}

const dir = path.join(ROOT, 'content', 'projects', slug);
if (fs.existsSync(dir)) {
  console.error(`Folder sudah ada: ${path.relative(ROOT, dir)}`);
  process.exit(1);
}

const site = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/site.json'), 'utf8'));

const kerangka = {
  $panduan: [
    'Isi kolom di bawah, lalu jalankan: npm run build (di folder tools/).',
    'Gambar: jatuhkan ke folder ini dengan nama berurutan 01.png, 02.png, dst.',
    'Urutan nama berkas menentukan urutan tampil di galeri.',
    'thumb = nomor gambar yang dipakai sebagai sampul di grid portofolio.'
  ],
  slug: { id: slug, en: slug },
  category: 'web',
  $categoryPilihan: Object.keys(site.ui.id.categories).join(' | '),
  framework: '',
  client: null,
  date: new Date().toISOString().slice(0, 7),
  thumb: 1,
  link: { type: 'whatsapp', url: site.contact.whatsapp },
  $linkType: 'whatsapp | github | postman | link  (isi null bila tidak ada tautan)',
  id: {
    title: '',
    summary: '',
    body: [''],
    features: []
  },
  en: {
    title: '',
    summary: '',
    body: [''],
    features: []
  }
};

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'project.json'), JSON.stringify(kerangka, null, 2) + '\n');

const rel = path.relative(ROOT, dir).replace(/\\/g, '/');
console.log(`Folder dibuat: ${rel}`);
console.log('');
console.log('Langkah berikutnya:');
console.log(`  1. Salin tangkapan layar ke ${rel}/ dengan nama 01.png, 02.png, ...`);
console.log(`  2. Isi ${rel}/project.json`);
console.log('  3. Jalankan: cd tools && npm run build');
