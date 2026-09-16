/* Halaman penawaran produk siap pakai — dokumen A4 terpaginasi, dirancang
   untuk dibaca di layar sekaligus dicetak.

   Halaman dibangun sebagai DAFTAR terlebih dahulu, baru dirender. Dengan begitu
   nomor halaman dan jumlah totalnya dihitung sendiri; menuliskannya langsung di
   markup berarti setiap penambahan bagian harus disusul penomoran ulang manual,
   dan itu pasti meleset cepat atau lambat.

   Perhatikan: hanya SAMPUL yang memuat <h1>. Seluruh judul halaman lain memakai
   <h2>, karena tools/audit.js mensyaratkan tepat satu <h1> per halaman dan
   dokumen ini punya belasan bagian. */
const { esc, each, icon, t, pageUrl, fmtUsd, fmtIdr, fmtDate, fmtMonth, waLink, WA_TEKS } = require('../tools/lib');

/** Pecah daftar menjadi potongan sepanjang n, supaya tabel panjang tidak
    melimpah keluar batas A4 dan kehilangan header/footer halamannya. */
function potong(arr, n) {
  const out = [];
  for (let i = 0; i < (arr || []).length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

/** Tambah hari ke tanggal ISO, kembalikan ISO lagi. Dipakai untuk masa berlaku
    penawaran; dihitung dari tanggal terbit yang tetap di data, bukan dari jam
    build, agar keluarannya tidak berubah tiap kali generator dijalankan. */
function tambahHari(iso, hari) {
  const d = new Date(iso + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + hari);
  return d.toISOString().slice(0, 10);
}

function tabel(kolA, kolB, baris) {
  return `              <table class="pr-table">
                <thead><tr><th>${esc(kolA)}</th><th>${esc(kolB)}</th></tr></thead>
                <tbody>
${each(baris, r => `                  <tr><td>${esc(r.a)}</td><td>${esc(r.b)}</td></tr>\n`)}                </tbody>
              </table>`;
}

/** ctx   konteks halaman
    p     satu entri dari data/proposals.json -> items[]
    proyek entri padanannya di data/projects.json (gambar, klien, tanggal, slug)
    doc   akar data/proposals.json (tanggal terbit dan masa berlaku bersama) */
module.exports = function proposal(ctx, p, proyek, doc) {
  const { site, lang, ui } = ctx;
  const L = ui.proposal;
  const c = t(p, lang);
  const pr = t(proyek, lang);
  const cur = site.currency;

  const judul = pr.title;
  const berlaku = tambahHari(doc.issued, doc.berlakuHari);

  // Harga bangun-khusus diambil dari tangga harga yang sudah dipakai halaman
  // Layanan, bukan angka baru — supaya keduanya tidak pernah berselisih.
  const premium = site.pricing.find(x => x.key === 'premium') || site.pricing[site.pricing.length - 1];

  const waProposal = waLink(site.contact.phoneE164, WA_TEKS.proposal[lang](judul));
  const waDemo = waLink(site.contact.phoneE164, WA_TEKS.demo[lang](judul));

  const gambar = (s, i) => {
    const alt = `${s[lang]} — ${judul}`;
    return `                <figure class="pr-shot">
                  <picture>
                    <source type="image/avif" srcset="/assets/img/portfolio/${esc(s.name)}-960.avif 960w, /assets/img/portfolio/${esc(s.name)}-1440.avif 1440w" sizes="(min-width: 220mm) 180mm, 92vw">
                    <img src="/assets/img/portfolio/${esc(s.name)}-960.jpg" alt="${esc(alt)}"
                         width="${esc(s.ukuran.w)}" height="${esc(s.ukuran.h)}" loading="lazy" decoding="async">
                  </picture>
                  <figcaption>${esc(s[lang])}</figcaption>
                </figure>\n`;
  };

  /* --- Susunan halaman --------------------------------------------------- */
  const halaman = [];

  /* Beberapa bagian digabung dalam satu lembar karena masing-masing terlalu
     pendek untuk berdiri sendiri: terukur "Masalah" hanya mengisi 24% lembar A4
     bila dipisah, menyisakan 178mm kertas kosong. Yang digabung hanyalah yang
     memang satu napas, bukan sekadar yang kebetulan berdekatan. */
  halaman.push({
    judul: L.summary,
    isi: `              <ol class="pr-points">
${each(c.ringkasan, (s, i) => `                <li><span class="pr-points__n">${esc(String(i + 1).padStart(2, "0"))}</span><p>${esc(s)}</p></li>\n`)}              </ol>
              <h3 class="pr-sub">${esc(L.problem)}</h3>
              <ul class="pr-cards">
${each(c.masalah, s => `                <li>${esc(s)}</li>\n`)}              </ul>`
  });

  halaman.push({
    judul: L.solution,
    isi: `              <div class="pr-prose pr-prose--lead">
${each(c.solusi, s => `                <p>${esc(s)}</p>\n`)}              </div>
              <h3 class="pr-sub">${esc(L.roles)}</h3>
              <ul class="pr-roles">
${each(c.peran, r => `                <li><span class="pr-roles__name">${esc(r.nama)}</span><span class="pr-roles__duty">${esc(r.tugas)}</span></li>
`)}              </ul>`
  });

  /* 14 baris per halaman, bukan 8: terukur satu baris memakan sekitar 46px dan
     area isi satu lembar A4 menyisakan sekitar 870px, jadi 8 baris hanya mengisi
     separuh lembar dan sisanya jatuh ke halaman kedua yang nyaris kosong. */
  for (const bagian of potong(c.modul, 14)) {
    halaman.push({
      judul: L.modules,
      isi: tabel(L.moduleCol, L.descCol, bagian.map(m => ({ a: m.nama, b: m.isi })))
    });
  }

  for (const bagian of potong(p.shots, 2)) {
    halaman.push({
      judul: L.screens,
      isi: each(bagian, gambar)
    });
  }

  halaman.push({
    judul: L.twoWays,
    isi: `              <div class="pr-two">
                <div class="pr-way pr-way--pick">
                  <h3>${esc(L.readyMade)}</h3>
                  <p>${esc(L.readyMadeNote)}</p>
                  <p class="pr-way__price">${esc(fmtIdr(p.licenseUsd, cur))}</p>
                  <p class="pr-way__sub">${esc(fmtUsd(p.licenseUsd))} · ${esc(L.license)}</p>
                </div>
                <div class="pr-way">
                  <h3>${esc(L.bespoke)}</h3>
                  <p>${esc(L.bespokeNote)}</p>
                  <p class="pr-way__price">${esc(fmtIdr(premium.from, cur))}</p>
                  <p class="pr-way__sub">${esc(fmtUsd(premium.from))} · ${esc(ui.startFrom)}</p>
                </div>
              </div>
              <h3 class="pr-sub">${esc(L.price)}</h3>
              <table class="pr-table pr-table--price">
                <thead><tr><th>${esc(L.price)}</th><th>USD</th><th>IDR</th></tr></thead>
                <tbody>
                  <tr><td>${esc(L.license)}</td><td>${esc(fmtUsd(p.licenseUsd))}</td><td>${esc(fmtIdr(p.licenseUsd, cur))}</td></tr>
                  <tr><td>${esc(L.annual)}</td><td>${esc(fmtUsd(p.annualUsd))}</td><td>${esc(fmtIdr(p.annualUsd, cur))}</td></tr>
                </tbody>
              </table>
              <p class="pr-note">${esc(L.annualNote)}</p>
              <p class="pr-note">${esc(ui.rateNote.replace('{rate}', `1 USD ≈ ${fmtIdr(1, { ...cur, roundIdrTo: 1 })}`).replace('{date}', fmtDate(cur.rateDate, lang)))}</p>`
  });

  halaman.push({
    judul: `${L.included} · ${L.notIncluded}`,
    isi: `              <div class="pr-two">
                <div>
                  <h3 class="pr-sub">${esc(L.included)}</h3>
                  <ul class="pr-list pr-list--yes">
${each(c.termasuk, s => `                    <li>${esc(s)}</li>\n`)}                  </ul>
                </div>
                <div>
                  <h3 class="pr-sub">${esc(L.notIncluded)}</h3>
                  <ul class="pr-list pr-list--no">
${each(c.tidakTermasuk, s => `                    <li>${esc(s)}</li>\n`)}                  </ul>
                </div>
              </div>
              <h3 class="pr-sub">${esc(L.terms)}</h3>
              <ol class="pr-terms">
${each(c.syarat, s => `                <li>${esc(s)}</li>\n`)}              </ol>
              <p class="pr-valid"><strong>${esc(L.validUntil)}</strong> ${esc(fmtDate(berlaku, lang))}</p>`
  });

  halaman.push({
    judul: L.timeline,
    isi: `              <ol class="pr-steps">
${each(c.tahapan, (s, i) => `                <li>
                  <span class="pr-steps__num">${esc(String(i + 1).padStart(2, '0'))}</span>
                  <div>
                    <h3>${esc(s.judul)}</h3>
                    <p>${esc(s.isi)}</p>
                    <p class="pr-steps__dur">${esc(L.duration)}: ${esc(s.durasi)}</p>
                  </div>
                </li>\n`)}              </ol>
              <h3 class="pr-sub">${esc(L.closing)}</h3>
              <p class="pr-prose">${esc(L.closingNote)}</p>
              <div class="pr-sign">
                <p class="pr-sign__name">${esc(site.profile.name)}</p>
                <p>${esc(t(site.profile, lang).role)}</p>
                <p>${esc(site.contact.phone)} · ${esc(site.contact.email)}</p>
                <p>${esc(site.site.origin.replace(/^https?:\/\//, ''))}</p>
              </div>`
  });

  const total = halaman.length;

  return `
    <div class="pr-doc" data-doc-scale>
      <section class="pr-page pr-page--cover">
        <span class="pr-cover__deco" aria-hidden="true"></span>
        <div class="pr-cover__brand">
          <img class="pr-cover__logo" src="/assets/img/logo.png" alt="" aria-hidden="true" width="180" height="180" loading="eager" decoding="async">
          <span class="pr-cover__brandname">${esc(site.profile.brandName || site.profile.name)}</span>
          <span class="pr-cover__kicker">${esc(L.docTitle)}</span>
        </div>

        <div class="pr-cover__main">
          <h1 class="pr-cover__title">${esc(judul)}</h1>
          <span class="pr-cover__rule" aria-hidden="true"></span>
          <p class="pr-cover__tagline">${esc(c.tagline)}</p>
          ${proyek.client ? `<p class="pr-cover__proven">${esc(L.provenAt)} <strong>${esc(proyek.client)}</strong> · ${esc(fmtMonth(proyek.date, lang))}</p>` : ''}
        </div>

        <div class="pr-cover__foot">
          <dl class="pr-cover__meta">
            <div><dt>${esc(L.preparedBy)}</dt><dd>${esc(site.profile.name)}</dd></div>
            <div><dt>${esc(L.issued)}</dt><dd>${esc(fmtDate(doc.issued, lang))}</dd></div>
            <div><dt>${esc(L.validUntil)}</dt><dd>${esc(fmtDate(berlaku, lang))}</dd></div>
          </dl>
          <p class="pr-cover__contact">${esc(site.contact.phone)} · ${esc(site.contact.email)} · ${esc(site.site.origin.replace(/^https?:\/\//, ''))}</p>
        </div>
      </section>

${each(halaman, (h, i) => `      <section class="pr-page">
        <header class="pr-head">
          <span class="pr-head__doc">${esc(L.docTitle)} · ${esc(judul)}</span>
          <span class="pr-head__no">${esc(String(i + 1).padStart(2, '0'))}</span>
        </header>
        <div class="pr-body">
          <h2 class="pr-title">${esc(h.judul)}</h2>
${h.isi}
        </div>
        <footer class="pr-foot">
          <span>${esc(site.profile.name)} · ${esc(site.contact.phone)}</span>
          <span>${esc(L.page)} ${esc(String(i + 1))}/${esc(String(total))}</span>
        </footer>
      </section>\n`)}    </div>

    <div class="pr-actions">
      <a class="btn btn--primary" href="${esc(waProposal)}" target="_blank" rel="noopener noreferrer">
        ${icon('whatsapp')} ${esc(L.askProposal)}
      </a>
      <a class="btn btn--ghost" href="${esc(waDemo)}" target="_blank" rel="noopener noreferrer">
        ${icon('whatsapp')} ${esc(L.askDemo)}
      </a>
      <button class="btn btn--ghost" type="button" data-print>
        ${icon('download')} ${esc(L.print)}
      </button>
    </div>
    <p class="pr-hint">
      <a href="${esc(pageUrl('project', lang, proyek.slug[lang]))}">${esc(ui.viewProject)}: ${esc(judul)}</a>
    </p>`;
};
