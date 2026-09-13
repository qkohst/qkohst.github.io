/**
 * Pipeline gambar. Membaca aset lama, menulis turunan yang dioptimasi ke assets/img/.
 *
 *   node tools/optimize-images.js          -> hanya yang belum ada
 *   node tools/optimize-images.js --force  -> tulis ulang semuanya
 *
 * Format: AVIF untuk browser modern, JPEG sebagai fallback universal.
 * WebP sengaja dilewati — AVIF sudah mencakup browser modern dan JPEG
 * menangani sisanya, sehingga varian per gambar turun dari 7 ke 4.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('./node_modules/sharp');

const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'assets', 'img');
const FORCE = process.argv.includes('--force');

const projects = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/projects.json'), 'utf8'));
const site = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/site.json'), 'utf8'));

const AVIF = { quality: 50, effort: 5 };
const JPEG = { quality: 76, mozjpeg: true, progressive: true };

let made = 0, skipped = 0, bytes = 0;
const missing = [];

const ensure = d => fs.mkdirSync(d, { recursive: true });
const fresh = (out, src) =>
  !FORCE && fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(src).mtimeMs;

async function emit(src, out, build) {
  if (fresh(out, src)) { skipped++; bytes += fs.statSync(out).size; return; }
  ensure(path.dirname(out));
  await build().toFile(out);
  made++; bytes += fs.statSync(out).size;
}

/** Turunan lebar-responsif: AVIF di tiap lebar, JPEG sekali sebagai fallback. */
async function variants(src, outDir, name, widths, fallbackWidth) {
  for (const w of widths) {
    await emit(src, path.join(outDir, `${name}-${w}.avif`),
      () => sharp(src).resize({ width: w, withoutEnlargement: true }).avif(AVIF));
  }
  await emit(src, path.join(outDir, `${name}-${fallbackWidth}.jpg`),
    () => sharp(src).resize({ width: fallbackWidth, withoutEnlargement: true }).jpeg(JPEG));
}

/** Gambar OG 1200x630: latar gelap, aksen, nama, peran. */
async function ogImage(lang, out) {
  const prof = site.profile[lang];
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#080c0b"/><stop offset="1" stop-color="#0d2a25"/>
    </linearGradient></defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <rect x="0" y="0" width="12" height="630" fill="#14c8a6"/>
    <text x="90" y="250" font-family="Segoe UI, Arial, sans-serif" font-size="34" font-weight="600" fill="#14c8a6" letter-spacing="3">${esc(site.profile.handle.toUpperCase())}</text>
    <text x="90" y="350" font-family="Segoe UI, Arial, sans-serif" font-size="82" font-weight="700" fill="#ffffff">${esc(site.profile.name)}</text>
    <text x="90" y="420" font-family="Segoe UI, Arial, sans-serif" font-size="44" font-weight="500" fill="#99aaa6">${esc(prof.role)}</text>
    <text x="90" y="520" font-family="Segoe UI, Arial, sans-serif" font-size="28" fill="#647672">${esc(site.site.origin.replace(/^https?:\/\//, ''))}</text>
  </svg>`;
  ensure(path.dirname(out));
  if (fresh(out, path.join(ROOT, 'data/site.json'))) { skipped++; bytes += fs.statSync(out).size; return; }
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(out);
  made++; bytes += fs.statSync(out).size;
}

(async () => {
  const t0 = Date.now();

  // --- 1. Tangkapan layar portofolio
  const portfolioDir = path.join(OUT, 'portfolio');
  const thumbs = new Set(projects.map(p => p.thumb));
  let n = 0;
  for (const p of projects) {
    for (const img of p.images) {
      const src = path.join(ROOT, img.source);
      if (!fs.existsSync(src)) { missing.push(img.source); continue; }
      // thumb dipakai kecil di grid, gambar galeri dipakai besar
      const widths = thumbs.has(img.name) ? [480, 960, 1440] : [960, 1440];
      await variants(src, portfolioDir, img.name, widths, 960);
      if (thumbs.has(img.name)) {
        await emit(src, path.join(portfolioDir, `${img.name}-1200x630.jpg`),
          () => sharp(src).resize(1200, 630, { fit: 'cover', position: 'top' }).jpeg(JPEG));
      }
      if (++n % 25 === 0) process.stdout.write(`  ${n}/123 gambar\r`);
    }
  }

  // --- 2. Foto profil (1524x1524 -> 480, dipakai sebagai avatar hero)
  const profileSrc = path.join(ROOT, 'my_pages/assets/img/profile-img.jpg');
  if (fs.existsSync(profileSrc)) {
    await emit(profileSrc, path.join(OUT, 'profile-480.avif'),
      () => sharp(profileSrc).resize(480, 480, { fit: 'cover' }).avif(AVIF));
    await emit(profileSrc, path.join(OUT, 'profile-480.jpg'),
      () => sharp(profileSrc).resize(480, 480, { fit: 'cover' }).jpeg(JPEG));
  } else missing.push('my_pages/assets/img/profile-img.jpg');

  // --- 3. Logo, favicon, apple-touch-icon
  const logoSrc = path.join(ROOT, 'my_pages/assets/img/logo.png');
  if (fs.existsSync(logoSrc)) {
    const transparent = { r: 0, g: 0, b: 0, alpha: 0 };
    await emit(logoSrc, path.join(OUT, 'logo.png'),
      () => sharp(logoSrc).resize(180, 180, { fit: 'contain', background: transparent }).png({ compressionLevel: 9 }));
    await emit(logoSrc, path.join(OUT, 'favicon-32.png'),
      () => sharp(logoSrc).resize(32, 32, { fit: 'contain', background: transparent }).png({ compressionLevel: 9 }));
    await emit(logoSrc, path.join(OUT, 'apple-touch-icon.png'),
      // iOS tidak mendukung transparansi: latar putih agar logo tidak jadi kotak hitam
      () => sharp(logoSrc).resize(180, 180, { fit: 'contain', background: '#ffffff' })
              .flatten({ background: '#ffffff' }).png({ compressionLevel: 9 }));

    // favicon.ico di akar situs. Peramban memintanya walau sudah ada <link rel=icon>,
    // dan 404 di sana membuat sebagian peramban tidak menampilkan ikon sama sekali.
    const icoPng = await sharp(logoSrc)
      .resize(32, 32, { fit: 'contain', background: transparent })
      .png({ compressionLevel: 9 }).toBuffer();
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0);          // reserved
    header.writeUInt16LE(1, 2);          // tipe 1 = ikon
    header.writeUInt16LE(1, 4);          // jumlah gambar
    const entry = Buffer.alloc(16);
    entry[0] = 32; entry[1] = 32;        // lebar, tinggi
    entry[2] = 0; entry[3] = 0;          // jumlah warna, reserved
    entry.writeUInt16LE(1, 4);           // bidang warna
    entry.writeUInt16LE(32, 6);          // bit per piksel
    entry.writeUInt32LE(icoPng.length, 8);
    entry.writeUInt32LE(22, 12);         // offset data
    const ico = Buffer.concat([header, entry, icoPng]);
    fs.writeFileSync(path.join(ROOT, 'favicon.ico'), ico);
    made++; bytes += ico.length;
  } else missing.push('my_pages/assets/img/logo.png');

  // --- 4. Gambar OG per bahasa
  for (const lang of site.site.langs) {
    await ogImage(lang, path.join(OUT, 'og', `og-${lang}.png`));
  }

  // --- Ringkasan
  const srcBytes = projects.flatMap(p => p.images)
    .filter(i => fs.existsSync(path.join(ROOT, i.source)))
    .reduce((s, i) => s + fs.statSync(path.join(ROOT, i.source)).size, 0);

  console.log(`                              `);
  console.log(`dibuat        : ${made} berkas`);
  console.log(`dilewati      : ${skipped} (sudah mutakhir)`);
  console.log(`ukuran keluaran: ${(bytes / 1024 / 1024).toFixed(1)} MB`);
  console.log(`sumber asli    : ${(srcBytes / 1024 / 1024).toFixed(1)} MB (${projects.flatMap(p => p.images).length} tangkapan layar)`);
  console.log(`penghematan    : ${(100 - bytes / srcBytes * 100).toFixed(1)}%`);
  console.log(`durasi         : ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  if (missing.length) {
    console.log(`\nSUMBER HILANG (${missing.length}):`);
    for (const m of missing.slice(0, 10)) console.log('  - ' + m);
    process.exit(1);
  }
})();
