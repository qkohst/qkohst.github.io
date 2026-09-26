/**
 * Mencetak halaman /cv/ dan /en/cv/ menjadi berkas PDF A4 statis.
 *
 *   node tools/build-cv-pdf.js
 *
 * Memakai Chrome/Edge yang sudah terpasang di mesin lewat mode headless
 * bawaannya — bukan puppeteer, supaya tidak perlu mengunduh Chromium ~300MB.
 * Tidak ada dependency npm sama sekali; mekanismenya ada di tools/pdf-lib.js,
 * dipakai bersama pencetak PDF penawaran.
 */
const fs = require('fs');
const path = require('path');
const { pageUrl, setPrefixes } = require('./lib');
const { ROOT, cariPeramban, serve, cetak } = require('./pdf-lib');

const OUT_DIR = path.join(ROOT, 'assets', 'cv');
const site = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/site.json'), 'utf8'));
setPrefixes(site.site.pathPrefix);   // path CV mengikuti konfigurasi bahasa

const browser = cariPeramban();
if (!browser) {
  console.error('Tidak menemukan Chrome atau Edge di mesin ini.');
  console.error('Setel CHROME_PATH ke lokasi peramban, lalu jalankan ulang.');
  process.exit(1);
}

(async () => {
  if (!fs.existsSync(path.join(ROOT, pageUrl('cv', site.site.defaultLang), 'index.html'))) {
    console.error('Halaman /cv/ belum ada. Jalankan `node tools/build.js --out .` lebih dulu.');
    process.exit(1);
  }

  const server = await serve();
  const port = server.address().port;
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const hasil = [];
  for (const lang of site.site.langs) {
    const url = `http://127.0.0.1:${port}${pageUrl('cv', lang)}`;
    const out = path.join(OUT_DIR, `cv-${site.profile.handle}-${lang}.pdf`);

    const galat = await cetak(browser, url, out);
    if (galat) {
      console.error(`Gagal mencetak ${lang}:`, galat);
      server.close();
      process.exit(1);
    }
    hasil.push({ lang, out, bytes: fs.statSync(out).size });
  }

  server.close();

  console.log(`peramban  : ${path.basename(browser)}`);
  for (const h of hasil) {
    console.log(`  ${h.lang}  ${path.relative(ROOT, h.out).replace(/\\/g, '/')}  ${(h.bytes / 1024).toFixed(1)} KB`);
  }
})();
