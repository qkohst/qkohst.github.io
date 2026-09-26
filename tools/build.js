/**
 * Generator situs. Membaca data/*.json, menulis halaman statis dwibahasa.
 *
 *   node tools/build.js            -> tulis ke _preview/  (untuk ditinjau)
 *   node tools/build.js --out .    -> tulis ke akar repo  (peralihan, Fase 4)
 *
 * Idempoten: direktori keluaran yang dikelola generator dibersihkan dulu.
 */
const fs = require('fs');
const path = require('path');
const { esc, pageUrl, absUrl, t, setIconVersion, setPrefixes } = require('./lib');
const layout = require('../templates/layout');
const homeTpl = require('../templates/home');
const projectsTpl = require('../templates/projects');
const projectTpl = require('../templates/project');
const servicesTpl = require('../templates/services');
const serviceTpl = require('../templates/service');
const proposalTpl = require('../templates/proposal');
const cvTpl = require('../templates/cv');

const ROOT = path.resolve(__dirname, '..');
const argOut = process.argv.indexOf('--out');
const OUT = path.resolve(ROOT, argOut > -1 ? process.argv[argOut + 1] : '_preview');

/* Pengaman: generator ini menghapus direktori sebelum menulis, jadi keluaran
   di luar repo berbahaya — satu salah ketik pada --out bisa mengenai folder
   lain di komputer. Path keluaran wajib berada di dalam repo. */
if (OUT !== ROOT && !OUT.startsWith(ROOT + path.sep)) {
  console.error('Keluaran menunjuk ke luar repo, dibatalkan.');
  console.error(`  --out  : ${argOut > -1 ? process.argv[argOut + 1] : '(bawaan)'}`);
  console.error(`  menjadi: ${OUT}`);
  console.error(`  repo   : ${ROOT}`);
  console.error('Path --out dihitung relatif terhadap akar repo, bukan folder tempat perintah dijalankan.');
  process.exit(1);
}

const site = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/site.json'), 'utf8'));
/* Proyek diurutkan dari waktu pengerjaan terbaru. Urutannya ditentukan di sini,
   bukan di data, supaya data/projects.json tetap mudah dibaca dan disunting. */
const projects = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/projects.json'), 'utf8'))
  .sort((a, b) => String(b.date).localeCompare(String(a.date)));
const proposalDoc = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/proposals.json'), 'utf8'));
const proposals = proposalDoc.items;
const ORIGIN = site.site.origin;
const LANGS = site.site.langs;
const DEFAULT_LANG = site.site.defaultLang;
setPrefixes(site.site.pathPrefix);

/* Sidik konten untuk CSS/JS. Ditempelkan sebagai ?v=... pada URL aset supaya
   peramban mengambil versi baru begitu berkasnya berubah, tanpa perlu pengguna
   melakukan hard-reload. Berkasnya sendiri tidak berganti nama, jadi tautan
   lama tetap sah. */
const crypto = require('crypto');
const sidik = rel => {
  const f = path.join(ROOT, rel);
  if (!fs.existsSync(f)) return '';
  return crypto.createHash('sha1').update(fs.readFileSync(f)).digest('hex').slice(0, 8);
};
const ASSET_VER = {
  css: sidik('assets/css/main.css'),
  cvCss: sidik('assets/css/cv.css'),
  proposalCss: sidik('assets/css/proposal.css'),
  js: sidik('assets/js/main.js'),
  icons: sidik('assets/icons.svg')
};

/* Ukuran asli sebuah JPEG, dibaca dari penanda SOF-nya.

   Dipakai agar atribut width/height gambar penawaran menyatakan ukuran yang
   SEBENARNYA. Menuliskannya tetap terasa aman, tapi tidak: turunan gambar di
   repo ini rasionya berbeda-beda (terukur 960x600 dan 960x482), sedangkan
   tinggi render mengikuti rasio asli. Angka yang keliru membuat ruang yang
   dipesan browser meleset, dan pada dokumen A4 satu lembar tangkapan layar
   tumpah ke kertas berikutnya. */
function ukuranJpeg(rel) {
  const f = path.join(ROOT, rel);
  if (!fs.existsSync(f)) return null;
  const d = fs.readFileSync(f);
  let i = 2;
  while (i < d.length - 9) {
    if (d[i] !== 0xFF) { i++; continue; }
    const m = d[i + 1];
    if (m >= 0xC0 && m <= 0xC3) return { h: d.readUInt16BE(i + 5), w: d.readUInt16BE(i + 7) };
    if (m === 0xD8 || m === 0xD9 || (m >= 0xD0 && m <= 0xD7)) { i += 2; continue; }
    i += 2 + d.readUInt16BE(i + 2);
  }
  return null;
}

/* Preload font hanya dipancarkan bila berkasnya benar-benar ada, supaya
   tidak menimbulkan 404 di tiap halaman selama font belum dipasang. */
const FONT_PATH = '/assets/fonts/inter-variable.woff2';
const FONT_HREF = fs.existsSync(path.join(ROOT, FONT_PATH.slice(1))) ? FONT_PATH : null;

/* --- Validasi: gagal keras sebelum menulis apa pun ----------------------- */
const fatal = [];
for (const lang of LANGS) {
  const seen = new Set();
  for (const p of projects) {
    const s = p.slug && p.slug[lang];
    if (!s) fatal.push(`${p.key}: slug ${lang} kosong`);
    else if (seen.has(s)) fatal.push(`slug ${lang} ganda: ${s}`);
    seen.add(s);
    if (!t(p, lang).title) fatal.push(`${p.key}: judul ${lang} kosong`);
    if (!t(p, lang).summary) fatal.push(`${p.key}: ringkasan ${lang} kosong`);
    for (const img of p.images) {
      if (!img.alt[lang]) fatal.push(`${p.key}: alt ${lang} kosong pada ${img.name}`);
    }
  }

  /* Blok bersama memasok isi yang sama untuk keempat produk. Bila satu bagian
     kosong, halamannya tetap terbentuk tetapi tanpa isi — cacat yang lolos
     tanpa suara, jadi diperiksa lebih dulu di sini. */
  {
    const b = proposalDoc.bersama && proposalDoc.bersama[lang];
    if (!b) fatal.push(`penawaran: blok bersama.${lang} tidak ada`);
    else {
      for (const bagian of ['teknis', 'tanya', 'syarat', 'langkah']) {
        if (!Array.isArray(b[bagian]) || !b[bagian].length) fatal.push(`penawaran bersama ${lang}: ${bagian} kosong`);
      }
      if (!b.bayar) fatal.push(`penawaran bersama ${lang}: bayar kosong`);
      if (!b.surat || !Array.isArray(b.surat.paragraf) || !b.surat.paragraf.length) fatal.push(`penawaran bersama ${lang}: surat.paragraf kosong`);
      if (!b.penyedia || !Array.isArray(b.penyedia.ringkas) || !b.penyedia.ringkas.length) fatal.push(`penawaran bersama ${lang}: penyedia.ringkas kosong`);
      if (!b.sla || !Array.isArray(b.sla.target) || !b.sla.target.length) fatal.push(`penawaran bersama ${lang}: sla.target kosong`);
      if (!b.tambahan || !(b.tambahan.jamIdr > 0)) fatal.push(`penawaran bersama ${lang}: tambahan.jamIdr harus angka positif`);
      if (!(b.tambahan && b.tambahan.lipatBangunKhususMaks > 1)) fatal.push(`penawaran bersama ${lang}: tambahan.lipatBangunKhususMaks harus lebih dari 1, kalau tidak rentang bangun-khusus jadi satu titik`);
      for (const x of (b.tambahan && b.tambahan.contoh) || []) {
        if (!(x.jamMin > 0) || !(x.jamMax >= x.jamMin)) fatal.push(`penawaran bersama ${lang}: perkiraan jam tidak wajar pada "${x.nama}"`);
      }
      /* Harga bangun-khusus dihitung dari pos bertanda dasarBangunKhusus. Tanpa
         satu pun tanda, kartu "Dibangun khusus" akan memasang harga yang sama
         persis dengan harga lisensi di sebelahnya. */
      const dasar = ((b.tambahan && b.tambahan.contoh) || []).filter(x => x.dasarBangunKhusus);
      if (!dasar.length) fatal.push(`penawaran bersama ${lang}: tidak ada pos tambahan bertanda dasarBangunKhusus, harga bangun-khusus akan sama dengan lisensi`);
      const dasarLain = (((proposalDoc.bersama[lang === 'id' ? 'en' : 'id'] || {}).tambahan || {}).contoh || []).filter(x => x.dasarBangunKhusus);
      if (dasar.length !== dasarLain.length) fatal.push(`penawaran bersama: jumlah pos dasarBangunKhusus beda antar bahasa (${dasar.length} vs ${dasarLain.length})`);
      /* Jumlah entri harus sepadan antar bahasa. Jumlah yang berbeda berarti
         satu bahasa kehilangan isi, dan itu tidak terlihat dari halaman jadi. */
      const lain = proposalDoc.bersama[lang === 'id' ? 'en' : 'id'] || {};
      for (const bagian of ['teknis', 'tanya', 'syarat', 'langkah']) {
        const a = (b[bagian] || []).length, z = (lain[bagian] || []).length;
        if (a !== z) fatal.push(`penawaran bersama: jumlah ${bagian} beda antar bahasa (${a} vs ${z})`);
      }
    }
  }

  /* Penawaran menumpang data proyek untuk judul, gambar, klien, dan slug.
     Tautan yang putus akan menghasilkan halaman separuh jadi yang lolos begitu
     saja, jadi diperiksa di sini bersama slug dan angka harganya. */
  const slugPenawaran = new Set();
  const nomorDipakai = new Set();
  for (const p of proposals) {
    const proyek = projects.find(x => x.key === p.key);
    if (!proyek) { fatal.push(`penawaran ${p.key}: tidak ada proyek dengan key ini`); continue; }
    const s = p.slug && p.slug[lang];
    if (!s) fatal.push(`penawaran ${p.key}: slug ${lang} kosong`);
    else if (slugPenawaran.has(s)) fatal.push(`slug penawaran ${lang} ganda: ${s}`);
    slugPenawaran.add(s);
    if (!(p.licenseIdr > 0)) fatal.push(`penawaran ${p.key}: licenseIdr harus angka positif`);
    /* Nomor dokumen dipakai di sampul dan surat penawaran. Nomor ganda berarti
       dua penawaran diarsipkan klien dengan nomor yang sama. */
    if (!p.nomor) fatal.push(`penawaran ${p.key}: nomor dokumen kosong`);
    else if (nomorDipakai.has(p.nomor)) fatal.push(`nomor penawaran ganda: ${p.nomor}`);
    nomorDipakai.add(p.nomor);
    const c = t(p, lang);
    if (!c.tagline) fatal.push(`penawaran ${p.key}: tagline ${lang} kosong`);
    for (const bagian of ['ringkasan', 'masalah', 'solusi', 'peran', 'modul', 'manfaat', 'termasuk', 'tidakTermasuk', 'tahapan']) {
      if (!Array.isArray(c[bagian]) || !c[bagian].length) fatal.push(`penawaran ${p.key}: ${bagian} ${lang} kosong`);
    }
    /* Tabel manfaat punya empat kolom; satu kolom kosong meninggalkan sel
       menganga di tengah halaman yang justru dipakai menjual. */
    for (const m of c.manfaat || []) {
      for (const kolom of ['pekerjaan', 'sebelum', 'sesudah', 'hemat']) {
        if (!m[kolom]) fatal.push(`penawaran ${p.key}: manfaat ${lang} kekurangan "${kolom}" pada "${m.pekerjaan || '?'}"`);
      }
    }
    for (const s2 of p.shots || []) {
      if (!proyek.images.some(i => i.name === s2.name)) fatal.push(`penawaran ${p.key}: gambar ${s2.name} tidak ada pada proyeknya`);
      if (!s2[lang]) fatal.push(`penawaran ${p.key}: keterangan ${lang} kosong pada ${s2.name}`);
      // Ukuran dibaca dari berkasnya, sekali, lalu dipakai ulang kedua bahasa.
      if (!s2.ukuran) s2.ukuran = ukuranJpeg(`assets/img/portfolio/${s2.name}-960.jpg`);
      if (!s2.ukuran) fatal.push(`penawaran ${p.key}: ukuran ${s2.name}-960.jpg tidak terbaca`);
    }
  }
}
if (fatal.length) {
  console.error('Build dibatalkan, data belum valid:');
  for (const f of fatal.slice(0, 25)) console.error('  - ' + f);
  process.exit(1);
}

/* --- Penulisan ----------------------------------------------------------- */
const written = [];
function write(urlPath, html) {
  const rel = urlPath.endsWith('/') ? path.join(urlPath, 'index.html') : urlPath;
  const file = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  written.push({ url: urlPath, bytes: Buffer.byteLength(html) });
}

/** Bersihkan hanya direktori yang memang dikelola generator. */
function clean() {
  const managed = ['en', 'id', 'proyek', 'layanan', 'projects', 'services', 'proposals', 'penawaran', 'cv'];
  if (path.basename(OUT) === '_preview') {
    fs.rmSync(OUT, { recursive: true, force: true });
  } else {
    for (const d of managed) fs.rmSync(path.join(OUT, d), { recursive: true, force: true });
  }
  fs.mkdirSync(OUT, { recursive: true });
}

/* --- Konteks per halaman ------------------------------------------------- */
function navFor(lang, ui, current) {
  const home = pageUrl('home', lang);
  return [
    { label: ui.nav.home,      href: home,                       key: 'home' },
    { label: ui.nav.about,     href: `${home}#about`,            key: 'about' },
    { label: ui.nav.resume,    href: `${home}#resume`,           key: 'resume' },
    { label: ui.nav.portfolio, href: pageUrl('projects', lang),  key: 'portfolio' },
    { label: ui.nav.services,  href: pageUrl('services', lang),  key: 'services' },
    { label: ui.nav.contact,   href: `${home}#contact`,          key: 'contact' }
  ].map(n => ({ ...n, current: n.key === current }));
}

/** Pasangan hreflang untuk satu halaman logis. */
function alternatesFor(kind, slugByLang) {
  const list = LANGS.map(l => ({
    lang: l,
    url: absUrl(ORIGIN, pageUrl(kind, l, slugByLang && slugByLang[l]))
  }));
  list.push({ lang: 'x-default', url: absUrl(ORIGIN, pageUrl(kind, DEFAULT_LANG, slugByLang && slugByLang[DEFAULT_LANG])) });
  return list;
}

function ctxFor({ lang, kind, slugByLang, title, description, ogImage, ogType, jsonld, navKey, noindex, extraCss, extraCssVer }) {
  const ui = site.ui[lang];
  const alts = alternatesFor(kind, slugByLang);
  const altUrl = Object.fromEntries(alts.filter(a => a.lang !== 'x-default').map(a => [a.lang, pageUrl(kind, a.lang, slugByLang && slugByLang[a.lang])]));
  return {
    site, lang, ui, fontHref: FONT_HREF, extraCss, extraCssVer, ver: ASSET_VER,
    title, description, noindex,
    canonical: absUrl(ORIGIN, pageUrl(kind, lang, slugByLang && slugByLang[lang])),
    alternates: alts,
    ogImage: absUrl(ORIGIN, ogImage || `/assets/img/og/og-${lang}.png`),
    ogType: ogType || 'website',
    jsonld: jsonld || [],
    nav: navFor(lang, ui, navKey),
    altUrl
  };
}

/* --- JSON-LD ------------------------------------------------------------- */
const personLd = lang => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.profile.name,
  alternateName: site.profile.handle,
  jobTitle: t(site.profile, lang).role,
  description: t(site.profile, lang).seoDescription,
  email: `mailto:${site.contact.email}`,
  telephone: `+${site.contact.phoneE164}`,
  url: absUrl(ORIGIN, pageUrl('home', lang)),
  image: absUrl(ORIGIN, '/assets/img/profile-480.jpg'),
  address: { '@type': 'PostalAddress', addressLocality: 'Tuban', addressRegion: 'Jawa Timur', addressCountry: 'ID' },
  sameAs: site.socials.map(s => s.url),
  knowsAbout: [...site.skills, ...site.frameworks].map(s => s.name)
});

const websiteLd = lang => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: `${site.profile.name} — ${t(site.profile, lang).role}`,
  url: absUrl(ORIGIN, pageUrl('home', lang)),
  inLanguage: lang
});

const breadcrumbLd = items => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem', position: i + 1, name: it.name, item: absUrl(ORIGIN, it.url)
  }))
});

const projectLd = (p, lang) => {
  const c = t(p, lang);
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: c.title,
    description: c.summary,
    inLanguage: lang,
    dateCreated: p.date,
    url: absUrl(ORIGIN, pageUrl('project', lang, p.slug[lang])),
    image: absUrl(ORIGIN, `/assets/img/portfolio/${p.thumb}-960.jpg`),
    creator: { '@type': 'Person', name: site.profile.name, url: ORIGIN },
    ...(p.client ? { sourceOrganization: { '@type': 'Organization', name: p.client } } : {}),
    ...(p.framework ? { keywords: [p.framework, p.category] } : {})
  };
};

/* Penawaran produk siap pakai: SoftwareApplication dengan satu Offer berharga
   pasti. Harga ditulis dalam USD karena itulah satuan yang disimpan di data;
   rupiah pada halaman hanyalah hasil konversi saat build, jadi mencantumkannya
   di sini akan basi begitu kurs diperbarui. */
const offerLd = (lang, p, judul, ringkas) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: judul,
  description: ringkas,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  inLanguage: lang,
  url: absUrl(ORIGIN, pageUrl('proposal', lang, p.slug[lang])),
  author: { '@type': 'Person', name: site.profile.name, url: ORIGIN },
  offers: {
    '@type': 'Offer',
    price: p.licenseIdr,
    priceCurrency: 'IDR',
    availability: 'https://schema.org/InStock',
    url: absUrl(ORIGIN, pageUrl('proposal', lang, p.slug[lang]))
  }
});

const serviceLd = (lang, svc) => {
  const x = svc ? t(svc, lang) : t(site.servicesPage, lang);
  const dasar = svc ? svc.from : site.pricing[0].from;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: x.title,
    description: x.summary || x.heading,
    provider: { '@type': 'Person', name: site.profile.name, url: ORIGIN },
    areaServed: 'ID',
    offers: site.pricing.map(tier => ({
      '@type': 'Offer',
      name: t(tier, lang).name,
      price: Math.round(dasar * (tier.from / site.pricing[0].from)),
      priceCurrency: tier.currency,
      description: t(tier, lang).summary,
      url: absUrl(ORIGIN, svc ? pageUrl('service', lang, svc.slug[lang]) : pageUrl('services', lang))
    }))
  };
};

/* --- Render -------------------------------------------------------------- */
setIconVersion(ASSET_VER.icons);
clean();

for (const lang of LANGS) {
  const ui = site.ui[lang];
  const prof = t(site.profile, lang);

  // beranda
  {
    const ctx = ctxFor({
      lang, kind: 'home',
      title: `${site.profile.name} — ${prof.role}`,
      description: prof.seoDescription,
      jsonld: [personLd(lang), websiteLd(lang)],
      navKey: 'home'
    });
    write(pageUrl('home', lang), layout.document(ctx, homeTpl(ctx, projects)));
  }

  // indeks portofolio
  {
    const desc = lang === 'id'
      ? `Kumpulan ${projects.length} proyek karya ${site.profile.name}: aplikasi web, RESTful API, aplikasi mobile, dan desktop.`
      : `A collection of ${projects.length} projects by ${site.profile.name}: web applications, RESTful APIs, mobile, and desktop software.`;
    const ctx = ctxFor({
      lang, kind: 'projects',
      title: `${ui.sections.portfolio} — ${site.profile.name}`,
      description: desc,
      navKey: 'portfolio',
      jsonld: [breadcrumbLd([
        { name: ui.nav.home, url: pageUrl('home', lang) },
        { name: ui.sections.portfolio, url: pageUrl('projects', lang) }
      ])]
    });
    write(pageUrl('projects', lang), layout.document(ctx, projectsTpl(ctx, projects)));
  }

  // halaman jasa
  {
    const sp = t(site.servicesPage, lang);
    const ctx = ctxFor({
      lang, kind: 'services',
      // Judul indeks harus berbeda dari halaman detail "Pengembangan Web",
      // kalau tidak keduanya memakai judul yang sama persis.
      title: `${ui.sections.services} — ${site.profile.name}`,
      description: lang === 'id'
        ? `Empat layanan pengembangan web oleh ${site.profile.name}: pengembangan web, desain web, RESTful API, dan perancangan basis data.`
        : `Four web development services by ${site.profile.name}: web development, web design, RESTful APIs, and database design.`,
      navKey: 'services',
      jsonld: [serviceLd(lang), breadcrumbLd([
        { name: ui.nav.home, url: pageUrl('home', lang) },
        { name: sp.title, url: pageUrl('services', lang) }
      ])]
    });
    /* Produk siap pakai dirangkum di sini, bukan di templat, supaya templat
       tidak perlu tahu cara menyambungkan proposals.json ke projects.json. */
    const produk = proposals.map(x => {
      const proyek = projects.find(o => o.key === x.key);
      return {
        // Kartu menautkan ke halaman PROYEK, bukan langsung ke penawaran:
        // pengunjung yang baru melihat kartu belum tentu siap membaca dokumen
        // penawaran enam belas halaman. Halaman proyek memperkenalkan produknya
        // lebih dulu, dan dari sana tersedia tombol "Lihat penawaran".
        proyekSlug: proyek.slug,
        slug: x.slug, licenseIdr: x.licenseIdr,
        judul: t(proyek, lang).title,
        ringkas: t(x, lang).tagline,
        thumb: proyek.thumb,
        // Alt diambil dari gambar sampul proyeknya, bukan dikarang di templat:
        // teksnya sudah dwibahasa dan sudah lolos gerbang validasi.
        alt: (proyek.images.find(i => i.name === proyek.thumb) || proyek.images[0]).alt[lang]
      };
    });
    write(pageUrl('services', lang), layout.document(ctx, servicesTpl(ctx, produk)));
  }

  // halaman detail tiap layanan
  for (const s of site.services) {
    const x = t(s, lang);
    const ctx = ctxFor({
      lang, kind: 'service', slugByLang: s.slug,
      title: `${x.title} — ${site.profile.name}`,
      description: x.summary,
      navKey: 'services',
      jsonld: [serviceLd(lang, s), breadcrumbLd([
        { name: ui.nav.home, url: pageUrl('home', lang) },
        { name: ui.sections.services, url: pageUrl('services', lang) },
        { name: x.title, url: pageUrl('service', lang, s.slug[lang]) }
      ])]
    });
    write(pageUrl('service', lang, s.slug[lang]), layout.document(ctx, serviceTpl(ctx, s)));
  }

  // halaman penawaran produk siap pakai
  for (const p of proposals) {
    const proyek = projects.find(x => x.key === p.key);   // dijamin ada oleh gerbang validasi
    const c = t(p, lang);
    const judul = t(proyek, lang).title;
    const ctx = ctxFor({
      lang, kind: 'proposal', slugByLang: p.slug,
      // Judul dibedakan dari halaman proyek yang memakai nama sama persis;
      // audit.js mensyaratkan judul unik per bahasa.
      title: `${ui.proposal.docTitle}: ${judul} — ${site.profile.name}`,
      description: c.tagline,
      ogImage: `/assets/img/portfolio/${proyek.thumb}-1200x630.jpg`,
      navKey: 'services',
      jsonld: [offerLd(lang, p, judul, c.tagline), breadcrumbLd([
        { name: ui.nav.home, url: pageUrl('home', lang) },
        { name: ui.sections.services, url: pageUrl('services', lang) },
        { name: `${ui.proposal.docTitle}: ${judul}`, url: pageUrl('proposal', lang, p.slug[lang]) }
      ])],
      extraCss: '/assets/css/proposal.css',
      extraCssVer: ASSET_VER.proposalCss
    });
    write(pageUrl('proposal', lang, p.slug[lang]), layout.document(ctx, proposalTpl(ctx, p, proyek, proposalDoc, projects.length)));
  }

  // halaman CV (noindex: bukan halaman pendaratan, tapi tetap perlu bisa dibuka
  // dan dicetak; isinya ikut site.json sehingga selalu selaras dengan situs)
  {
    const ctx = ctxFor({
      lang, kind: 'cv',
      title: `CV — ${site.profile.name}`,
      description: lang === 'id'
        ? `Curriculum vitae ${site.profile.name}: riwayat pendidikan, pengalaman kerja, sertifikat, dan kemampuan teknis. Dapat dicetak atau disimpan sebagai PDF.`
        : `Curriculum vitae of ${site.profile.name}: education, work experience, certificates, and technical skills. Printable and saveable as PDF.`,
      navKey: null,
      noindex: true,
      jsonld: [personLd(lang)],
      extraCss: '/assets/css/cv.css',
      extraCssVer: ASSET_VER.cvCss
    });
    write(pageUrl('cv', lang), layout.document(ctx, cvTpl(ctx)));
  }

  // 26 halaman detail
  for (const p of projects) {
    const c = t(p, lang);
    const ctx = ctxFor({
      lang, kind: 'project', slugByLang: p.slug,
      title: `${c.title} — ${site.profile.name}`,
      description: c.summary,
      ogImage: `/assets/img/portfolio/${p.thumb}-1200x630.jpg`,
      ogType: 'article',
      navKey: 'portfolio',
      jsonld: [projectLd(p, lang), breadcrumbLd([
        { name: ui.nav.home, url: pageUrl('home', lang) },
        { name: ui.sections.portfolio, url: pageUrl('projects', lang) },
        { name: c.title, url: pageUrl('project', lang, p.slug[lang]) }
      ])]
    });
    // Penawaran ditentukan dari data, bukan daftar slug yang ditulis tangan,
    // supaya produk berikutnya cukup ditambahkan ke data/proposals.json.
    const penawaran = proposals.find(x => x.key === p.key) || null;
    write(pageUrl('project', lang, p.slug[lang]), layout.document(ctx, projectTpl(ctx, p, projects, penawaran)));
  }
}

/* --- Stub redirect untuk URL lama ----------------------------------------
   GitHub Pages tidak bisa mengirim 301 asli, jadi tiap path lama diisi halaman
   kecil berisi meta-refresh + rel=canonical ke URL baru. Canonical-lah yang
   memindahkan sinyal SEO; meta-refresh yang memindahkan pengunjung. Ditandai
   noindex agar stub-nya sendiri tidak ikut terindeks. */
function redirectStub(to, lang) {
  const abs = absUrl(ORIGIN, to);
  const teks = lang === 'id'
    ? { judul: 'Halaman telah dipindahkan', ajak: 'Lanjutkan ke halaman baru' }
    : { judul: 'This page has moved', ajak: 'Continue to the new page' };
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, follow">
<title>${esc(teks.judul)}</title>
<link rel="canonical" href="${esc(abs)}">
<meta http-equiv="refresh" content="0; url=${esc(to)}">
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#080c0b;color:#e7efed;
font:16px/1.6 ui-sans-serif,system-ui,"Segoe UI",Roboto,sans-serif;text-align:center;padding:2rem}
a{color:#14c8a6}</style>
</head>
<body>
<div>
<p>${esc(teks.judul)}.</p>
<p><a href="${esc(to)}">${esc(teks.ajak)} &rarr;</a></p>
</div>
</body>
</html>
`;
}

const redirects = [
  // 1. Halaman situs lama (sebelum redesign). Isinya berbahasa Inggris,
  //    jadi diarahkan ke versi Inggris.
  { from: 'my_pages/portfolio.html',        to: pageUrl('projects', 'en') },
  { from: 'my_pages/web_dev_services.html', to: pageUrl('services', 'en') }
];
for (const p of projects) {
  // Hanya 26 proyek hasil migrasi yang punya halaman lama. Proyek baru yang
  // ditambahkan lewat content/projects/ tidak punya, dan memang tidak perlu.
  if (p.legacyPath) redirects.push({ from: p.legacyPath, to: pageUrl('project', 'en', p.slug.en) });
}

// 2. URL yang berpindah ketika bahasa default ditukar ke Inggris. Path lama
//    diarahkan ke halaman yang sama dalam bahasa yang sama, supaya tautan
//    yang sudah terlanjur dibagikan tidak mati.
const PINDAH = [
  { dari: '/proyek/',      ke: pageUrl('projects', 'id') },
  { dari: '/layanan/',     ke: pageUrl('services', 'id') },
  { dari: '/en/',          ke: pageUrl('home', 'en') },
  { dari: '/en/projects/', ke: pageUrl('projects', 'en') },
  { dari: '/en/services/', ke: pageUrl('services', 'en') },
  { dari: '/en/cv/',       ke: pageUrl('cv', 'en') }
];
for (const p of projects) {
  PINDAH.push({ dari: `/proyek/${p.slug.id}/`,      ke: pageUrl('project', 'id', p.slug.id) });
  PINDAH.push({ dari: `/en/projects/${p.slug.en}/`, ke: pageUrl('project', 'en', p.slug.en) });
}
for (const r of PINDAH) {
  // lewati bila path lama kini justru dipakai halaman sungguhan
  if (r.dari === r.ke) continue;
  redirects.push({ from: path.join(r.dari, 'index.html'), to: r.ke });
}

for (const r of redirects) {
  const file = path.join(OUT, r.from);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, redirectStub(r.to, 'id'));
}

/* --- sitemap.xml + robots.txt -------------------------------------------- */
const entries = [];
const push = (kind, slugByLang, priority, changefreq) => {
  for (const lang of LANGS) {
    entries.push({
      loc: absUrl(ORIGIN, pageUrl(kind, lang, slugByLang && slugByLang[lang])),
      priority, changefreq,
      alt: LANGS.map(l => ({ lang: l, url: absUrl(ORIGIN, pageUrl(kind, l, slugByLang && slugByLang[l])) }))
        .concat([{ lang: 'x-default', url: absUrl(ORIGIN, pageUrl(kind, DEFAULT_LANG, slugByLang && slugByLang[DEFAULT_LANG])) }])
    });
  }
};
push('home', null, '1.0', 'monthly');
push('projects', null, '0.9', 'monthly');
push('services', null, '0.9', 'monthly');
for (const p of projects) push('project', p.slug, '0.7', 'yearly');
for (const s of site.services) push('service', s.slug, '0.8', 'monthly');
for (const p of proposals) push('proposal', p.slug, '0.8', 'monthly');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.map(e => `  <url>
    <loc>${esc(e.loc)}</loc>
${e.alt.map(a => `    <xhtml:link rel="alternate" hreflang="${esc(a.lang)}" href="${esc(a.url)}"/>`).join('\n')}
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(OUT, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(OUT, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${absUrl(ORIGIN, '/sitemap.xml')}\n`);
fs.writeFileSync(path.join(OUT, '.nojekyll'), '');

/* --- Ringkasan ----------------------------------------------------------- */
const total = written.reduce((s, w) => s + w.bytes, 0);
const biggest = [...written].sort((a, b) => b.bytes - a.bytes)[0];
const BUDGET = 60 * 1024;
console.log(`keluaran      : ${path.relative(ROOT, OUT) || '.'}`);
console.log(`halaman       : ${written.length}  (${LANGS.length} bahasa)`);
console.log(`sitemap       : ${entries.length} URL`);
console.log(`stub redirect : ${redirects.length} path lama`);
console.log(`total HTML    : ${(total / 1024).toFixed(1)} KB`);
console.log(`rata-rata     : ${(total / written.length / 1024).toFixed(1)} KB/halaman`);
console.log(`terbesar      : ${biggest.url} (${(biggest.bytes / 1024).toFixed(1)} KB)`);
const over = written.filter(w => w.bytes > BUDGET);
console.log(over.length
  ? `\nDI ATAS ANGGARAN ${BUDGET / 1024} KB: ${over.map(w => `${w.url} ${(w.bytes / 1024).toFixed(1)}KB`).join(', ')}`
  : `\nsemua halaman di bawah ${BUDGET / 1024} KB`);
