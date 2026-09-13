/**
 * Sekali pakai: membaca 26 halaman my_pages/<slug>-detail.html + portfolio.html,
 * lalu menulis draft data/projects.draft.json.
 *
 * Tujuannya menghindari salah salin manual. Copy Bahasa Indonesia diisi menyusul;
 * script ini hanya memindahkan struktur + copy Inggris yang sudah ada.
 *
 *   node tools/extract-legacy.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'my_pages');

const strip = h => h.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
const decode = s => s
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ');
const clean = h => decode(strip(h));

/** Peta slug halaman detail -> slug baru yang dipakai di URL. */
const SLUG_MAP = {
  'lms-external-ojk': 'lms-external-ojk',
  'lms-internal-ojk': 'lms-internal-ojk',
  'bo-dlik-ojk': 'backoffice-dlik-ojk',
  'pabrik_plastik_api': 'pabrik-plastik-api',
  'property_api': 'property-api',
  'treeport_api': 'treeport-api',
  'pamdes': 'st-pamdes',
  'asmarine': 'asmarine',
  'pabrik_plastik': 'pabrik-plastik',
  'megaria': 'megaria-hotel',
  'dinamika': 'dinamika',
  'treeport': 'treeport',
  'mgschedule': 'mg-schedule',
  'indonesia_peduli': 'indonesia-peduli',
  'e_raport': 'e-raport',
  'e_skripsi_RESTful_API': 'e-skripsi-api',
  'eSkripsi_webClient': 'e-skripsi-web-client',
  'e_skripsi_Mobile': 'e-skripsi-mobile',
  'siasek': 'sistem-administrasi-sekolah',
  'surat': 'manajemen-surat',
  'ciLogin': 'ci-login-system',
  'manhud': 'website-sekolah-manbaul-huda',
  'sosmed': 'laravel-social-network',
  'pkbm': 'ppdb-pkbm',
  'employee': 'manajemen-karyawan',
  'rentalMobil': 'rental-mobil'
};

/** Kategori filter dari portfolio.html -> kunci kategori baru. */
const CATEGORY_MAP = {
  'filter-web': 'web',
  'filter-app': 'app',
  'filter-api': 'api',
  'filter-desktop': 'desktop'
};

function readPortfolioIndex() {
  const html = fs.readFileSync(path.join(SRC, 'portfolio.html'), 'utf8');
  const items = {};
  // tiap tile: <div class="col-lg-4 ... portfolio-item filter-web"> ... detail href ... thumb src
  const re = /<div[^>]*class="[^"]*portfolio-item[^"]*(filter-[a-z]+)[^"]*"[\s\S]*?<\/div>\s*<\/div>/g;
  let m;
  while ((m = re.exec(html))) {
    const block = m[0];
    const filter = m[1];
    const detail = /href="([a-zA-Z0-9_\-]+)-detail\.html"/.exec(block);
    const thumb = /<img[^>]+src="([^"]+)"/.exec(block);
    const title = /<h4>\s*<a[^>]*>([\s\S]*?)<\/a>/.exec(block) || /<h4>([\s\S]*?)<\/h4>/.exec(block);
    if (!detail) continue;
    items[detail[1]] = {
      category: CATEGORY_MAP[filter] || 'web',
      thumb: thumb ? decode(thumb[1]) : null,
      gridTitle: title ? clean(title[1]) : null
    };
  }
  return items;
}

function parseDetail(file) {
  const html = fs.readFileSync(path.join(SRC, file), 'utf8');
  const legacySlug = file.replace(/-detail\.html$/, '');

  // gambar carousel
  const images = [...html.matchAll(/<img[^>]+src="(assets\/img\/portfolio\/[^"]+)"/g)]
    .map(m => decode(m[1]));

  // info proyek: <li><strong>Category</strong>: Web Development</li>
  const info = {};
  for (const m of html.matchAll(/<li>\s*<strong>([^<]+)<\/strong>\s*:?\s*([^<]*)<\/li>/g)) {
    info[clean(m[1]).toLowerCase()] = clean(m[2]);
  }

  // tombol project link
  const linkM = /<div class="portfolio-info">[\s\S]*?<a\s+href="([^"]+)"/.exec(html);

  // deskripsi
  const descM = /<div class="portfolio-description">([\s\S]*?)<\/div>/.exec(html);
  const desc = descM ? descM[1] : '';
  const titleM = /<h2>([\s\S]*?)<\/h2>/.exec(desc);
  const paras = [...desc.matchAll(/<p>([\s\S]*?)<\/p>/g)].map(m => clean(m[1])).filter(Boolean);
  const features = [...desc.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(m => clean(m[1])).filter(Boolean);

  return {
    legacySlug,
    legacyPath: `my_pages/${file}`,
    slug: SLUG_MAP[legacySlug] || legacySlug,
    title: titleM ? clean(titleM[1]) : null,
    framework: info['framework'] || null,
    client: info['client'] || null,
    dateRaw: info['project time'] || null,
    legacyCategory: info['category'] || null,
    link: linkM ? decode(linkM[1]) : null,
    images,
    paragraphs: paras,
    features
  };
}

const index = readPortfolioIndex();
const files = fs.readdirSync(SRC).filter(f => f.endsWith('-detail.html')).sort();

const projects = files.map(f => {
  const p = parseDetail(f);
  const idx = index[p.legacySlug] || {};
  p.category = idx.category || 'web';
  p.thumb = idx.thumb || p.images[0] || null;
  p.gridTitle = idx.gridTitle;
  return p;
});

fs.writeFileSync(
  path.join(ROOT, 'data', 'projects.draft.json'),
  JSON.stringify(projects, null, 2) + '\n'
);

// ringkasan agar mudah diperiksa
console.log(`halaman detail terbaca : ${files.length}`);
console.log(`tile di portfolio.html : ${Object.keys(index).length}`);
console.log('');
console.log('slug'.padEnd(30), 'kat'.padEnd(8), 'img', 'par', 'fitur', ' judul');
for (const p of projects) {
  console.log(
    String(p.slug).padEnd(30),
    String(p.category).padEnd(8),
    String(p.images.length).padStart(3),
    String(p.paragraphs.length).padStart(3),
    String(p.features.length).padStart(5),
    ' ' + (p.title || '(judul tidak terbaca)')
  );
}
const problems = projects.filter(p => !p.title || !p.images.length);
console.log('');
console.log(problems.length ? `PERLU DIPERIKSA: ${problems.map(p => p.slug).join(', ')}` : 'semua proyek terbaca lengkap');
