/**
 * Mencetak halaman /cv/ dan /en/cv/ menjadi berkas PDF A4 statis.
 *
 *   node tools/build-cv-pdf.js
 *
 * Memakai Chrome/Edge yang sudah terpasang di mesin lewat mode headless
 * bawaannya — bukan puppeteer, supaya tidak perlu mengunduh Chromium ~300MB.
 * Tidak ada dependency npm sama sekali; server statisnya memakai modul http
 * bawaan Node.
 *
 * Halaman harus disajikan lewat HTTP, bukan dibuka sebagai file://, karena
 * seluruh aset dirujuk dengan path absolut-dari-akar (/assets/...). Di bawah
 * file:// path itu menunjuk ke akar drive dan semuanya gagal dimuat.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const http = require('http');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'assets', 'cv');
const site = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/site.json'), 'utf8'));

/** Kandidat lokasi peramban, diurutkan dari yang paling disukai. */
const BROWSERS = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
].filter(Boolean);

const browser = BROWSERS.find(p => { try { return fs.existsSync(p); } catch { return false; } });
if (!browser) {
  console.error('Tidak menemukan Chrome atau Edge di mesin ini.');
  console.error('Setel CHROME_PATH ke lokasi peramban, lalu jalankan ulang.');
  process.exit(1);
}

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.avif': 'image/avif',
  '.ico': 'image/x-icon', '.json': 'application/json'
};

/** Jalankan peramban tanpa memblokir event loop.
    spawnSync TIDAK boleh dipakai di sini: ia membekukan event loop Node,
    sehingga server HTTP di proses yang sama tidak pernah sempat melayani
    permintaan Chrome dan pencetakan menggantung sampai timeout. */
function run(cmd, args, timeoutMs = 120000) {
  return new Promise(resolve => {
    const child = spawn(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let err = '';
    child.stderr.on('data', d => { err += d.toString(); });
    const timer = setTimeout(() => { child.kill('SIGKILL'); resolve({ code: null, err: 'timeout' }); }, timeoutMs);
    child.on('error', e => { clearTimeout(timer); resolve({ code: null, err: e.message }); });
    child.on('close', code => { clearTimeout(timer); resolve({ code, err }); });
  });
}

/** Server statis sekali pakai untuk melayani situs selama pencetakan. */
function serve() {
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p.endsWith('/')) p += 'index.html';
    const file = path.join(ROOT, p);
    // jangan layani apa pun di luar akar repo
    if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404); return res.end('404');
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(server)));
}

(async () => {
  if (!fs.existsSync(path.join(ROOT, 'cv', 'index.html'))) {
    console.error('Halaman /cv/ belum ada. Jalankan `node tools/build.js --out .` lebih dulu.');
    process.exit(1);
  }

  const server = await serve();
  const port = server.address().port;
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const hasil = [];
  for (const lang of site.site.langs) {
    const url = `http://127.0.0.1:${port}${lang === 'id' ? '/cv/' : '/en/cv/'}`;
    const out = path.join(OUT_DIR, `cv-${site.profile.handle}-${lang}.pdf`);

    // Profil terpisah itu wajib: bila Chrome milik pengguna sedang berjalan,
    // instance baru akan menyerahkan tugas ke proses yang sudah ada lalu keluar
    // tanpa pernah mencetak apa pun.
    const profil = fs.mkdtempSync(path.join(os.tmpdir(), 'cvpdf-'));
    const r = await run(browser, [
      '--headless=new',
      `--user-data-dir=${profil}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-extensions',
      '--disable-gpu',
      '--no-sandbox',
      '--no-pdf-header-footer',
      '--generate-pdf-document-outline=false',
      // Jangan pakai --virtual-time-budget: waktu virtual tidak berjalan selama
      // Chrome menunggu jaringan, sehingga proses menggantung saat halaman
      // diambil dari server. Chrome sudah mencetak setelah load selesai.
      `--print-to-pdf=${out}`,
      url
    ]);

    try { fs.rmSync(profil, { recursive: true, force: true }); } catch {}

    if (!fs.existsSync(out)) {
      console.error(`Gagal mencetak ${lang}:`, r.err ? r.err.slice(0, 300) : `keluar dengan kode ${r.code}`);
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
