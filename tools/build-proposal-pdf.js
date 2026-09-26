/**
 * Mencetak setiap halaman penawaran menjadi berkas PDF A4 siap lampir.
 *
 *   node tools/build-proposal-pdf.js
 *
 * Hasilnya assets/proposals/<slug>-<lang>.pdf, satu berkas per produk per
 * bahasa. Tombol "Unduh PDF" di halaman penawaran menunjuk ke berkas ini.
 *
 * Alasan berkasnya dicetak di sini, bukan diserahkan ke tombol Cetak di
 * peramban: calon klien sering perlu meneruskan penawaran ke atasan atau
 * yayasan lewat WhatsApp dan email, dan yang bisa dilampirkan adalah berkas,
 * bukan tautan. Hasil cetak peramban juga membawa header dan footer bawaan
 * peramban bila penggunanya lupa mematikannya.
 *
 * Mekanisme peramban headless-nya ada di tools/pdf-lib.js, dipakai bersama
 * pencetak PDF CV.
 */
const fs = require('fs');
const path = require('path');
const { pageUrl, setPrefixes } = require('./lib');
const { ROOT, cariPeramban, serve, cetak } = require('./pdf-lib');

const OUT_DIR = path.join(ROOT, 'assets', 'proposals');
const site = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/site.json'), 'utf8'));
const proposals = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/proposals.json'), 'utf8')).items;
setPrefixes(site.site.pathPrefix);

const browser = cariPeramban();
if (!browser) {
  console.error('Tidak menemukan Chrome atau Edge di mesin ini.');
  console.error('Setel CHROME_PATH ke lokasi peramban, lalu jalankan ulang.');
  process.exit(1);
}

(async () => {
  const contoh = pageUrl('proposal', site.site.defaultLang, proposals[0].slug[site.site.defaultLang]);
  if (!fs.existsSync(path.join(ROOT, contoh, 'index.html'))) {
    console.error(`Halaman ${contoh} belum ada. Jalankan \`node tools/build.js --out .\` lebih dulu.`);
    process.exit(1);
  }

  const server = await serve();
  const port = server.address().port;
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const hasil = [];
  for (const p of proposals) {
    for (const lang of site.site.langs) {
      const slug = p.slug[lang];
      const url = `http://127.0.0.1:${port}${pageUrl('proposal', lang, slug)}`;
      const out = path.join(OUT_DIR, `${slug}-${lang}.pdf`);

      const galat = await cetak(browser, url, out);
      if (galat) {
        console.error(`Gagal mencetak ${slug} (${lang}):`, galat);
        server.close();
        process.exit(1);
      }
      hasil.push({ slug, lang, out, bytes: fs.statSync(out).size });
    }
  }

  server.close();

  console.log(`peramban  : ${path.basename(browser)}`);
  let total = 0;
  for (const h of hasil) {
    total += h.bytes;
    console.log(`  ${h.lang}  ${path.relative(ROOT, h.out).replace(/\\/g, '/')}  ${(h.bytes / 1024).toFixed(1)} KB`);
  }
  console.log(`total     : ${hasil.length} berkas, ${(total / 1024 / 1024).toFixed(1)} MB`);
})();
