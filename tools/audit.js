/**
 * Uji regresi SEO, aksesibilitas, dan bobot untuk hasil generate.
 * Dipakai sebagai bukti terukur bahwa tiap syarat terpenuhi.
 *
 *   node tools/audit.js            -> periksa _preview/
 *   node tools/audit.js .          -> periksa akar repo
 *
 * Keluar dengan kode 1 bila ada pemeriksaan wajib yang gagal.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIR = path.resolve(ROOT, process.argv[2] || '_preview');

const pages = [];
/* Hanya halaman yang dihasilkan generator yang diaudit. Sub-situs lama
   (pamdes/, wedding/) dan direktori kerja sengaja dilewati — keduanya di luar
   lingkup redesign ini, dan memasukkannya hanya akan memberi alarm palsu. */
const SKIP = /^(\.git|\.claude|\.playwright-mcp|node_modules|my_pages|assets|data|templates|tools|_preview|pamdes|wedding)$/;
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (d === DIR && SKIP.test(e.name)) continue;
      walk(path.join(d, e.name));
    } else if (e.name === 'index.html') {
      pages.push(path.join(d, e.name));
    }
  }
})(DIR);

const one = (h, re) => { const m = re.exec(h); return m ? m[1] : null; };
const count = (h, re) => (h.match(re) || []).length;

const rows = pages.map(file => {
  const h = fs.readFileSync(file, 'utf8');
  // Yang dinilai hanya gambar KONTEN. Dikecualikan: <img> tanpa src (placeholder
  // lightbox, diisi JS) dan aria-hidden (dekoratif, alt kosong memang benar).
  const imgs = [...h.matchAll(/<img\b[^>]*>/g)].map(m => m[0])
    .filter(i => /\bsrc=/.test(i) && !/aria-hidden="true"/.test(i));
  const url = '/' + path.relative(DIR, file).split(path.sep).slice(0, -1).join('/');
  return {
    url: url === '/' ? '/' : url + '/',
    title: one(h, /<title>([^<]*)<\/title>/),
    desc: one(h, /name="description" content="([^"]*)"/),
    canonical: one(h, /rel="canonical" href="([^"]*)"/),
    noindex: /content="noindex/.test(h),
    lang: one(h, /<html lang="([^"]*)"/),
    hreflang: count(h, /rel="alternate" hreflang=/g),
    og: count(h, /property="og:/g),
    twitter: count(h, /name="twitter:/g),
    jsonld: count(h, /application\/ld\+json/g),
    h1: count(h, /<h1[ >]/g),
    scripts: count(h, /<script\b[^>]*\bsrc=/g),
    stylesheets: count(h, /rel="stylesheet"/g),
    imgs: imgs.length,
    imgNoAlt: imgs.filter(i => !/alt="[^"]+"/.test(i)).length,
    imgNoDim: imgs.filter(i => !/\bwidth=/.test(i) || !/\bheight=/.test(i)).length,
    imgNoLoading: imgs.filter(i => !/\bloading=/.test(i)).length,
    bytes: Buffer.byteLength(h)
  };
});

const n = rows.length;
const uniq = k => new Set(rows.map(r => r[k])).size;
const sum = k => rows.reduce((s, r) => s + r[k], 0);
const checks = [];
const check = (label, actual, expected, ok) =>
  checks.push({ label, actual, expected, ok: ok === undefined ? actual === expected : ok });

check('halaman ter-generate', n, n, n > 0);

// Keunikan judul/deskripsi dinilai PER BAHASA. Pasangan id/en yang judulnya
// sama (nama diri seperti ASMARINE) sah: canonical-nya berbeda dan hreflang
// yang memberi tahu mesin pencari versi mana untuk pembaca mana.
for (const lang of [...new Set(rows.map(r => r.lang))]) {
  const sub = rows.filter(r => r.lang === lang);
  check(`judul unik (${lang})`, new Set(sub.map(r => r.title)).size, sub.length);
  check(`deskripsi unik (${lang})`, new Set(sub.map(r => r.desc)).size, sub.length);
}
check('canonical unik', uniq('canonical'), n);
check('halaman dengan OG tag', rows.filter(r => r.og >= 8).length, n);
check('halaman dengan Twitter card', rows.filter(r => r.twitter >= 3).length, n);
check('halaman dengan JSON-LD', rows.filter(r => r.jsonld > 0).length, n);
check('hreflang (id+en+x-default)', rows.filter(r => r.hreflang === 3).length, n);
check('tepat satu <h1>', rows.filter(r => r.h1 === 1).length, n);
check('<img> tanpa alt', sum('imgNoAlt'), 0);
check('<img> tanpa width/height', sum('imgNoDim'), 0);
check('<img> tanpa loading', sum('imgNoLoading'), 0);
check('deskripsi >165 karakter', rows.filter(r => !r.desc || r.desc.length > 165).length, 0);
check('skrip eksternal per halaman', Math.max(...rows.map(r => r.scripts)), 1, Math.max(...rows.map(r => r.scripts)) <= 1);
// Batas 2: main.css di semua halaman, plus cv.css khusus halaman CV. Lembar
// kedua yang dimuat hanya di satu jenis halaman bukan pemborosan.
check('stylesheet per halaman', Math.max(...rows.map(r => r.stylesheets)), '<= 2', Math.max(...rows.map(r => r.stylesheets)) <= 2);

// hreflang harus timbal balik: URL yang ditunjuk harus ada sebagai halaman
const byUrl = new Map(rows.map(r => [r.url, r]));
let reciprocal = 0;
for (const file of pages) {
  const h = fs.readFileSync(file, 'utf8');
  const alts = [...h.matchAll(/rel="alternate" hreflang="(?!x-default)[^"]*" href="([^"]*)"/g)]
    .map(m => m[1].replace(/^https?:\/\/[^/]+/, ''));
  if (alts.every(a => byUrl.has(a))) reciprocal++;
}
check('hreflang timbal balik valid', reciprocal, n);

for (const f of ['sitemap.xml', 'robots.txt', '.nojekyll']) {
  check(`berkas ${f}`, fs.existsSync(path.join(DIR, f)) ? 'ada' : 'HILANG', 'ada');
}

// sitemap harus memuat tiap halaman yang di-generate
if (fs.existsSync(path.join(DIR, 'sitemap.xml'))) {
  const sm = fs.readFileSync(path.join(DIR, 'sitemap.xml'), 'utf8');
  const locs = new Set([...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].replace(/^https?:\/\/[^/]+/, '')));
  // Halaman noindex (CV) memang sengaja tidak dimasukkan ke sitemap.
  const indexable = rows.filter(r => !r.noindex);
  check('halaman tercantum di sitemap', indexable.filter(r => locs.has(r.url)).length, indexable.length);
}

const w = 30;
console.log(`Audit: ${path.relative(ROOT, DIR) || '.'}  (${n} halaman)\n`);
let failed = 0;
for (const c of checks) {
  if (!c.ok) failed++;
  console.log(`${c.ok ? 'OK  ' : 'GAGAL'} ${String(c.label).padEnd(w)} ${c.actual}${c.ok ? '' : `  (diharapkan ${c.expected})`}`);
}

console.log('');
console.log(`total HTML       : ${(sum('bytes') / 1024).toFixed(1)} KB`);
console.log(`rata-rata        : ${(sum('bytes') / n / 1024).toFixed(1)} KB/halaman`);
console.log(`terbesar         : ${[...rows].sort((a, b) => b.bytes - a.bytes)[0].url} (${(Math.max(...rows.map(r => r.bytes)) / 1024).toFixed(1)} KB)`);
console.log(`total <img>      : ${sum('imgs')}`);
console.log(`bahasa           : ${JSON.stringify(rows.reduce((m, r) => (m[r.lang] = (m[r.lang] || 0) + 1, m), {}))}`);

console.log(failed ? `\n${failed} pemeriksaan GAGAL` : '\nsemua pemeriksaan lolos');
process.exit(failed ? 1 : 0);
