/* Halaman penawaran produk siap pakai — dokumen A4 terpaginasi, dirancang
   untuk dibaca di layar sekaligus dicetak.

   Halaman dibangun sebagai DAFTAR terlebih dahulu, baru dirender. Dengan begitu
   nomor halaman dan jumlah totalnya dihitung sendiri; menuliskannya langsung di
   markup berarti setiap penambahan bagian harus disusul penomoran ulang manual,
   dan itu pasti meleset cepat atau lambat.

   Perhatikan: hanya SAMPUL yang memuat <h1>. Seluruh judul halaman lain memakai
   <h2>, karena tools/audit.js mensyaratkan tepat satu <h1> per halaman dan
   dokumen ini punya belasan bagian.

   Isi yang sama untuk keempat produk diambil dari data/proposals.json -> bersama,
   lalu DITAMBAH isi milik produknya bila ada. Sengaja ditambah, bukan ditimpa:
   sebuah produk boleh punya syarat atau tanya-jawab ekstra tanpa harus menyalin
   ulang dua belas butir yang sudah sama. */
const { esc, each, icon, t, pageUrl, fmtRp, bulatRp, fmtDate, waLink, WA_TEKS, yearsSince } = require('../tools/lib');
const { shareList } = require('./partials');

/** Pecah daftar menjadi potongan yang panjangnya seimbang, dengan batas maks per
    potongan. Dipakai supaya tabel panjang tidak melimpah keluar batas A4.

    Seimbang, bukan sekadar dipotong tiap n: daftar 16 baris dengan batas 14 akan
    jadi 14 + 2 bila dipotong lurus, menyisakan lembar kedua yang nyaris kosong.
    Dibagi rata menjadi 8 + 8 jauh lebih enak dibaca dan dicetak. */
function potongRata(arr, maks) {
  const n = (arr || []).length;
  if (!n) return [];
  const lembar = Math.ceil(n / maks);
  const per = Math.ceil(n / lembar);
  const out = [];
  for (let i = 0; i < n; i += per) out.push(arr.slice(i, i + per));
  return out;
}

/** Tambah bulan kalender ke tanggal ISO, kembalikan ISO lagi. Dipakai untuk masa
    berlaku penawaran; dihitung dari tanggal terbit yang tetap di data, bukan dari
    jam build, agar keluarannya tidak berubah tiap kali generator dijalankan.

    Bulan kalender, bukan kelipatan hari: "berlaku tiga bulan" yang jatuh pada
    tanggal yang sama tiga bulan kemudian lebih mudah dipegang kedua pihak
    daripada hasil penjumlahan 90 hari, yang mendarat di tanggal ganjil.

    Tanggal akhir bulan dijaga: 31 Januari + 1 bulan harus jadi 28 atau 29
    Februari, bukan melompat ke 2 atau 3 Maret seperti perilaku bawaan setMonth. */
function tambahBulan(iso, bulan) {
  const [y, m, hari] = iso.split('-').map(Number);
  const d = new Date(Date.UTC(y, m - 1 + bulan, 1));
  const hariTerakhir = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
  d.setUTCDate(Math.min(hari, hariTerakhir));
  return d.toISOString().slice(0, 10);
}

const ROMAWI = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

/** Nomor surat mengikuti pola yang sudah dipakai penawaran tercetak:
    <urut>/QST/TBN/<bulan romawi>/<tahun>. Diturunkan dari tanggal terbit di
    data, bukan jam build, supaya nomornya tidak berubah tiap kali digenerate. */
function nomorDokumen(nomor, issued) {
  const [tahun, bulan] = issued.split('-');
  return `${nomor}/QST/TBN/${ROMAWI[Number(bulan) - 1]}/${tahun}`;
}

/** Ambil batas atas sebuah perkiraan durasi: "2–3 hari" -> 3, "1 hari" -> 1.
    Batas atas, bukan bawah, supaya total lini waktu tidak menjanjikan lebih
    cepat daripada yang tertulis di tiap tahapannya. */
function hariMaks(durasi) {
  const angka = String(durasi || '').match(/\d+/g);
  return angka ? Math.max(...angka.map(Number)) : 0;
}

/** Tabel dengan jumlah kolom bebas. baris = array of array string. */
function tabel(kolom, baris, kelas = '') {
  return `              <table class="pr-table${kelas ? ' ' + kelas : ''}">
                <thead><tr>${kolom.map(k => `<th>${esc(k)}</th>`).join('')}</tr></thead>
                <tbody>
${each(baris, r => `                  <tr${r.tebal ? ' class="is-total"' : ''}>${(r.sel || r).map(x => `<td>${esc(x)}</td>`).join('')}</tr>\n`)}                </tbody>
              </table>`;
}

/** ctx    konteks halaman
    p      satu entri dari data/proposals.json -> items[]
    proyek entri padanannya di data/projects.json (gambar, klien, tanggal, slug)
    doc    akar data/proposals.json (tanggal terbit, masa berlaku, blok bersama)
    jumlahProyek banyaknya proyek di portofolio — dipakai halaman profil penyedia */
module.exports = function proposal(ctx, p, proyek, doc, jumlahProyek) {
  const { site, lang, ui } = ctx;
  const L = ui.proposal;
  const c = t(p, lang);
  const b = t(doc.bersama, lang);
  const pr = t(proyek, lang);

  const judul = pr.title;
  const berlaku = tambahBulan(doc.issued, doc.berlakuBulan);
  const noDok = nomorDokumen(p.nomor, doc.issued);

  /* Isi bersama ditambah isi khas produk. Urutannya bersama dulu, supaya butir
     umum selalu di atas dan tambahan produk terbaca sebagai pelengkap. */
  const gabung = (nama) => [...(b[nama] || []), ...(c[nama] || [])];
  const teknis = gabung('teknis');
  const tanya = gabung('tanya');
  const syarat = gabung('syarat');
  const langkah = b.langkah || [];
  const tambahan = c.tambahan || b.tambahan;

  /* Harga bangun-khusus DIHITUNG sebagai RENTANG, tidak disimpan sebagai angka:
     harga lisensi produk ini ditambah pos penyesuaian dari daftar biaya tambahan.

     Rentang, bukan satu titik, karena lingkup pekerjaan bangun-khusus memang
     belum diketahui saat penawaran disusun. Satu angka tunggal di sana adalah
     presisi palsu: ia terbaca sebagai harga pasti, lalu setiap penyesuaian di
     luar dugaan terasa sebagai tagihan tambahan yang tidak dijanjikan.

     Batas bawah memakai jam tertinggi tiap pos penyesuaian; batas atas memakai
     pos yang sama dikalikan tambahan.lipatBangunKhususMaks. Keduanya dihitung
     dari daftar yang sama dengan halaman biaya tambahan, sehingga kedua halaman
     tidak bisa berselisih ketika salah satunya diperbarui. */
  const penyesuaianIdr = (tambahan.contoh || [])
    .filter(x => x.dasarBangunKhusus)
    .reduce((n, x) => n + x.jamMax, 0) * tambahan.jamIdr;
  const bangunMin = bulatRp(p.licenseIdr + penyesuaianIdr);
  const bangunMaks = bulatRp(p.licenseIdr + penyesuaianIdr * tambahan.lipatBangunKhususMaks);

  const waProposal = waLink(site.contact.phoneE164, WA_TEKS.proposal[lang](judul));
  const waDemo = waLink(site.contact.phoneE164, WA_TEKS.demo[lang](judul));

  const gambar = (s) => {
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

  /* Judul bagian yang terpecah ke beberapa lembar diberi penanda urutan. Tanpa
     itu dua lembar berjudul sama persis terbaca seperti cetakan dobel. */
  const berurut = (dasar, i, n) => n > 1 ? `${dasar} (${i + 1}/${n})` : dasar;

  /* --- Susunan halaman --------------------------------------------------- */
  const halaman = [];

  /* Surat penawaran. Dokumen tanpa surat pengantar bernomor tidak bisa
     diarsipkan atau dinaikkan ke yayasan oleh calon klien lembaga. Baris
     "Kepada Yth." sengaja dibiarkan sebagai garis kosong untuk ditulis tangan,
     sama seperti penawaran tercetak yang sudah dipakai. */
  halaman.push({
    judul: L.letterTitle,
    isi: `              <div class="pr-letter">
                <div class="pr-letter__head">
                  <dl class="pr-letter__meta">
                    <div><dt>${esc(L.docNo)}</dt><dd>${esc(noDok)}</dd></div>
                    <div><dt>${esc(L.letterAttach)}</dt><dd>${esc(b.surat.lampiran)}</dd></div>
                    <div><dt>${esc(L.letterSubject)}</dt><dd>${esc(b.surat.perihal.replace('{judul}', judul))}</dd></div>
                  </dl>
                  <p class="pr-letter__place">${esc(L.letterCity)}, ${esc(fmtDate(doc.issued, lang))}</p>
                </div>

                <p class="pr-letter__to">${esc(L.letterTo)}</p>
                <p class="pr-letter__fill" aria-hidden="true"></p>
                <p class="pr-letter__to">${esc(L.letterPlace)}</p>

                <p class="pr-letter__open">${esc(L.letterOpen)}</p>
${each(b.surat.paragraf, s => `                <p>${esc(s.replace('{judul}', judul))}</p>\n`)}
                <div class="pr-letter__sign">
                  <p>${esc(L.letterClose)}</p>
                  <p class="pr-sign__line" aria-hidden="true"></p>
                  <p class="pr-sign__name">${esc(site.profile.name)}</p>
                  <p>${esc(t(site.profile, lang).role)}</p>
                </div>
              </div>`
  });

  /* Tempat daftar isi. Isinya baru bisa disusun setelah seluruh halaman lain
     jadi, jadi yang didorong sekarang hanya penampungnya — lihat catatan di
     bawah, tepat sebelum isinya ditulis. */
  const tocIdx = halaman.length;
  halaman.push({ judul: L.toc, isi: '' });

  /* Profil penyedia. Angkanya dihitung dari data situs, bukan ditulis ulang di
     data penawaran, supaya tidak ada dua sumber yang bisa berselisih. */
  const angka = [
    { nilai: String(yearsSince(site.profile.experienceSince)), label: L.statYears },
    { nilai: String(jumlahProyek), label: L.statProjects },
    { nilai: String(doc.items.length), label: L.statProducts }
  ];
  halaman[tocIdx].lanjutan = `              <h3 class="pr-sub">${esc(L.about)}</h3>
              <div class="pr-profile">
                <ul class="pr-stats">
${each(angka, a => `                  <li><span class="pr-stats__n">${esc(a.nilai)}</span><span class="pr-stats__l">${esc(a.label)}</span></li>\n`)}                </ul>
                <div class="pr-prose">
${each(b.penyedia.ringkas, s => `                  <p>${esc(s)}</p>\n`)}                </div>
              </div>`;

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

  /* 24 baris per halaman. Diukur di peramban pada media print: satu baris tabel
     modul tingginya 5,4mm dan ruang isi satu lembar A4 menyisakan 244mm setelah
     margin, header, footer, dan judul — cukup untuk 40-an baris. Batas 24 dipasang
     jauh di bawah itu sebagai cadangan untuk keterangan modul yang memanjang jadi
     dua atau tiga baris. Batas sebelumnya, 14, memecah daftar 16 modul menjadi dua
     lembar yang masing-masing hanya terisi 80mm dari 296mm. */
  const bagianModul = potongRata(c.modul, 24);
  bagianModul.forEach((bagian, i) => {
    halaman.push({
      judul: berurut(L.modules, i, bagianModul.length),
      isi: tabel([L.moduleCol, L.descCol], bagian.map(m => [m.nama, m.isi]))
    });
  });

  const bagianShot = potongRata(p.shots, 2);
  bagianShot.forEach((bagian, i) => {
    halaman.push({
      judul: berurut(L.screens, i, bagianShot.length),
      isi: each(bagian, gambar)
    });
  });

  /* Manfaat terukur. Angkanya perkiraan, dan catatan di bawah tabel menyatakan
     itu terang-terangan — halaman yang paling dipakai menjual justru paling
     cepat kehilangan kepercayaan bila angkanya terkesan diukur padahal bukan. */
  halaman.push({
    judul: L.benefits,
    isi: `${tabel([L.benefitTask, L.benefitBefore, L.benefitAfter, L.benefitSave],
      c.manfaat.map(m => [m.pekerjaan, m.sebelum, m.sesudah, m.hemat]), 'pr-table--4col')}
              <p class="pr-note">${esc(L.benefitNote)}</p>`
  });

  halaman.push({
    judul: L.twoWays,
    isi: `              <div class="pr-two">
                <div class="pr-way pr-way--pick">
                  <h3>${esc(L.readyMade)}</h3>
                  <p>${esc(L.readyMadeNote)}</p>
                  <p class="pr-way__price">${esc(fmtRp(p.licenseIdr))}</p>
                  <p class="pr-way__sub">${esc(L.license)}</p>
                  <ul class="pr-way__scope">
                    <li>${esc(String(c.modul.length))} ${esc(L.scopeModules)}, ${esc(String(c.peran.length))} ${esc(L.scopeRoles)}</li>
                    <li>${esc(L.scopeSetup)}</li>
                    <li>${esc(L.scopeSupport)}</li>
                  </ul>
                  <p class="pr-way__pick">${esc(L.pickReady)}</p>
                </div>
                <div class="pr-way">
                  <h3>${esc(L.bespoke)}</h3>
                  <p>${esc(L.bespokeNote)}</p>
                  <p class="pr-way__price">${esc(fmtRp(bangunMin))} – ${esc(fmtRp(bangunMaks))}</p>
                  <p class="pr-way__sub">${esc(L.bespokeRange)}</p>
                  <ul class="pr-way__scope">
                    <li>${esc(L.scopeBespokeBase)}</li>
                    <li>${esc(L.scopeBespokeWork)}</li>
                    <li>${esc(L.scopeBespokeQuote)}</li>
                  </ul>
                  <p class="pr-way__pick">${esc(L.pickBespoke)}</p>
                </div>
              </div>
              <p class="pr-note pr-note--tengah">${esc(L.oneTimeNote)}</p>
              <h3 class="pr-sub">${esc(L.paymentStages)}</h3>
              ${tabel([L.paymentStage, L.paymentWhen, L.paymentAmount], (b.tahapBayar || []).map(x => [
      `${x.judul} · ${x.persen}%`,
      x.saat,
      fmtRp(p.licenseIdr * x.persen / 100)
    ]), 'pr-table--bayar').trim()}`
  });

  /* Biaya tambahan: yang ditampilkan hanya nama pekerjaan dan kisaran biayanya.
     Perkiraan jam dan tarif per jam tetap dipakai untuk MENGHITUNG angka itu,
     tetapi tidak dicetak — calon klien membeli hasil pekerjaan, bukan waktu, dan
     tarif per jam yang terpampang mengundang tawar-menawar atas jumlah jamnya. */
  const biayaJam = (jam) => fmtRp(jam * tambahan.jamIdr);
  halaman.push({
    judul: L.addons,
    isi: `${tabel([L.addonTask, L.addonCost], tambahan.contoh.map(x => [
      x.nama,
      x.jamMin === x.jamMax ? biayaJam(x.jamMin) : `${biayaJam(x.jamMin)}–${biayaJam(x.jamMax)}`
    ]))}
              <p class="pr-note">${esc(tambahan.catatan)}</p>`
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
              <h3 class="pr-sub">${esc(L.support)}</h3>
              <p class="pr-prose">${esc(b.sla.masuk)}</p>
              <dl class="pr-support">
                <div><dt>${esc(L.supportChannel)}</dt><dd>${esc(b.sla.kanal)}</dd></div>
                <div><dt>${esc(L.supportHours)}</dt><dd>${esc(b.sla.jam)}</dd></div>
              </dl>
              <p class="pr-support__lead">${esc(L.supportTarget)}</p>
              ${tabel([L.supportCase, L.supportReply], b.sla.target.map(x => [x.kelas, x.balas])).trim()}
              <dl class="pr-support">
                <div><dt>${esc(L.supportScope)}</dt><dd>${esc(b.sla.batas)}</dd></div>
                <div><dt>${esc(L.supportExtend)}</dt><dd>${esc(b.sla.perpanjangan)}</dd></div>
              </dl>`
  });

  halaman.push({
    judul: L.spec,
    isi: tabel([L.specItem, L.descCol], teknis.map(x => [x.nama, x.isi]))
  });

  /* Lini waktu: daftar tahapan, ditutup satu angka total. Totalnya menjumlahkan
     BATAS ATAS tiap tahapan, bukan batas bawah, supaya angka di kaki halaman
     tidak menjanjikan lebih cepat daripada yang tertulis di tahapannya sendiri. */
  const totalHari = c.tahapan.reduce((n, s) => n + hariMaks(s.durasi), 0);
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
                </li>
`)}              </ol>
              <p class="pr-note"><strong>${esc(L.totalDuration)}:</strong> ${esc(String(totalHari))} ${esc(L.days)}</p>`
  });

  halaman.push({
    judul: L.faq,
    isi: `              <dl class="pr-faq">
${each(tanya, x => `                <div><dt>${esc(x.q)}</dt><dd>${esc(x.a)}</dd></div>\n`)}              </dl>`
  });

  halaman.push({
    judul: L.terms,
    isi: `              <ol class="pr-terms">
${each(syarat, s => `                <li>${esc(s)}</li>\n`)}              </ol>
              <p class="pr-valid"><strong>${esc(L.validUntil)}</strong> ${esc(fmtDate(berlaku, lang))}</p>`
  });

  /* Lembar terakhir: apa yang harus dilakukan setelah setuju, lalu dua kolom
     tanda tangan. Tanpa kolom klien, dokumen ini hanya bisa dibaca — tidak bisa
     dipakai menutup kesepakatan. */
  halaman.push({
    judul: L.nextSteps,
    isi: `              <ol class="pr-next">
${each(langkah, s => `                <li><h3>${esc(s.judul)}</h3><p>${esc(s.isi)}</p></li>
`)}              </ol>
              <h3 class="pr-sub">${esc(L.payment)}</h3>
              <p class="pr-prose">${esc(b.bayar)}</p>
              <h3 class="pr-sub">${esc(L.closing)}</h3>
              <p class="pr-prose">${esc(L.closingNote)}</p>`
  });

  /* Lembar persetujuan berdiri sebagai lembar terakhir yang utuh, bukan menumpang
     di kaki halaman lain. Lembar inilah yang dicetak, ditandatangani, dipindai,
     lalu dikirim balik — ia harus bisa dilepas sendiri tanpa memotong isi lain,
     dan harus memuat ulang angka yang disetujui supaya sah dibaca berdiri
     sendiri, tanpa pembacanya perlu membolak-balik ke halaman harga. */
  halaman.push({
    judul: L.agreement,
    isi: `              <p class="pr-prose pr-prose--lead">${esc(L.agreementNote)}</p>
              <dl class="pr-deal">
                <div><dt>${esc(L.agreementDoc)}</dt><dd>${esc(noDok)}</dd></div>
                <div><dt>${esc(L.agreementProduct)}</dt><dd>${esc(judul)}</dd></div>
                <div><dt>${esc(L.license)}</dt><dd>${esc(fmtRp(p.licenseIdr))}</dd></div>
              </dl>
              <p class="pr-prose">${esc(L.agreementDeclare)}</p>
              <div class="pr-sign--two">
                <div class="pr-sign">
                  <p class="pr-sign__role">${esc(L.agreementVendor)}</p>
                  <p class="pr-sign__place">${esc(L.letterCity)}, ${esc(fmtDate(doc.issued, lang))}</p>
                  <p class="pr-sign__line" aria-hidden="true"></p>
                  <p class="pr-sign__name">${esc(site.profile.name)}</p>
                  <p>${esc(t(site.profile, lang).role)}</p>
                  <p>${esc(site.contact.phone)} · ${esc(site.contact.email)}</p>
                </div>
                <div class="pr-sign">
                  <p class="pr-sign__role">${esc(L.agreementClient)}</p>
                  <p class="pr-sign__place">${esc(L.agreementPlaceDate)}: <span class="pr-sign__fill" aria-hidden="true"></span></p>
                  <p class="pr-sign__line" aria-hidden="true"></p>
                  <p class="pr-sign__hint">${esc(L.agreementName)}</p>
                  <p class="pr-sign__hint">${esc(L.agreementRole)}: <span class="pr-sign__fill" aria-hidden="true"></span></p>
                  <p class="pr-sign__hint">${esc(L.agreementInstitution)}: <span class="pr-sign__fill" aria-hidden="true"></span></p>
                </div>
              </div>
              <p class="pr-note pr-deal__foot">${esc(L.agreementReturn)}</p>`
  });

  /* Daftar isi ditulis PALING AKHIR meski duduk di halaman kedua: nomor tiap
     bagian baru diketahui setelah seluruh halaman tersusun, termasuk lembar
     tambahan yang muncul sendiri saat tabel modul atau tangkapan layar terpecah.
     Menuliskannya lebih awal berarti menebak, dan tebakan itu akan meleset pada
     produk dengan jumlah modul berbeda. */
  halaman[tocIdx].isi = `              <ol class="pr-toc">
${each(halaman, (h, i) => `                <li><span class="pr-toc__t">${esc(h.judul)}</span><span class="pr-toc__n">${esc(String(i + 1).padStart(2, '0'))}</span></li>\n`)}              </ol>
${halaman[tocIdx].lanjutan}`;

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
          ${c.bukti ? `<p class="pr-cover__proven">${esc(c.bukti)}</p>` : ''}
        </div>

        <div class="pr-cover__foot">
          <dl class="pr-cover__meta">
            <div><dt>${esc(L.docNo)}</dt><dd>${esc(noDok)}</dd></div>
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
      <button class="btn btn--ghost" type="button" data-print
              data-pdf-name="${esc(`${L.docTitle} ${judul} ${noDok.replace(/\//g, '-')}`)}">
        ${icon('download')} ${esc(L.savePdf)}
      </button>
    </div>
    <p class="pr-hint pr-hint--tip">${esc(L.savePdfHint)}</p>

    <div class="pr-share">
      <span class="pr-share__title">${icon('share')} ${esc(L.shareTitle)}</span>
      ${shareList(ctx.canonical, `${L.docTitle}: ${judul}`, ui)}
    </div>
    <p class="pr-hint">
      <a href="${esc(pageUrl('project', lang, proyek.slug[lang]))}">${esc(ui.viewProject)}: ${esc(judul)}</a>
    </p>`;
};
