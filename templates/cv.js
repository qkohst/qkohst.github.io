/* Halaman CV. Tata letak A4 dua kolom mempertahankan struktur CV lama;
   seluruh isinya datang dari data/site.json, jadi selalu ikut konten situs.
   Entri disaring dengan showOn: 'cv'. */
const { esc, each, icon, t, fill, pageUrl, fmtMonth, fmtRange, yearsSince, shown } = require('../tools/lib');

/** Meter blok tersegmen seperti pada CV lama (10 kotak per baris).
    Label aksesibilitasnya ikut bahasa halaman: sebelumnya "dari 100" ditulis
    langsung di sini, sehingga CV berbahasa Inggris pun membacakannya dalam
    bahasa Indonesia. */
const skillRow = (ui) => s => {
  const on = Math.round(s.level / 10);
  return `
            <div class="cv-skill">
              <span class="cv-skill__name">${esc(s.name)}</span>
              <span class="cv-skill__blocks" role="img" aria-label="${esc(fill(ui.a11y.skillLevel, { n: s.level }))}">
${Array.from({ length: 10 }, (_, i) => `                <i${i < on ? ' class="on"' : ''}></i>`).join('\n')}
              </span>
            </div>`;
};

module.exports = function cv(ctx) {
  const { site, lang, ui } = ctx;
  const p = t(site.profile, lang);
  const c = site.contact;
  const cl = t(c, lang);
  const years = yearsSince(site.profile.experienceSince);

  const skills = shown(site.skills, 'cv');
  const frameworks = shown(site.frameworks, 'cv');
  const education = shown(site.education, 'cv');
  const experience = shown(site.experience, 'cv');
  const certificates = shown(site.certificates, 'cv');
  const socials = shown(site.socials, 'cv');

  /* Satu tombol, bukan "Unduh PDF" berdampingan dengan "Cetak". Berkas PDF statis
     tidak lagi disimpan di repo: mesin cetak peramban menghasilkan PDF vektor
     yang teksnya tetap bisa disalin dan dicari, tanpa menambah bobot repo dan
     tanpa satu pun kilobita skrip tambahan di halaman.

     Tujuan tombol "beranda" diambil dari pageUrl, bukan ditulis tangan:
     sebelumnya kedua bahasa tertukar — CV Indonesia mengarah ke "/" (beranda
     Inggris) dan CV Inggris ke "/en/" yang hanya stub redirect. */
  return `
    <div class="cv-actions">
      <button class="btn btn--primary" type="button" data-print
              data-pdf-name="${esc(`CV ${site.profile.name}`)}">${icon('download')} ${esc(ui.labels.savePdf)}</button>
      <a class="btn btn--ghost" href="${esc(pageUrl('home', lang))}">${esc(ui.labels.backHome)}</a>
    </div>
    <p class="cv-hint">${esc(ui.labels.printHint)}</p>

    <article class="cv-page" data-doc-scale>
      <div class="cv-col cv-col--left">
        <picture>
          <source type="image/avif" srcset="/assets/img/profile-480.avif">
          <img class="cv-photo" src="/assets/img/profile-480.jpg" alt="${esc(site.profile.name)}"
               width="480" height="480" loading="eager" decoding="async">
        </picture>

        <div class="cv-namebar">
          <h1 class="cv-name">${esc(site.profile.name)}</h1>
        </div>
        <p class="cv-role">${esc(p.role)}</p>

        <section class="cv-block">
          <h2 class="cv-h">${esc(ui.sections.about)}</h2>
          <div class="cv-rule"></div>
          <p class="cv-text">${esc(p.aboutCv)}</p>
          <p class="cv-text">${esc(fill(ui.labels.cvExperience, { n: years }))}</p>
          <ul class="cv-contact">
            <li>${icon('map-pin')}<span>${esc(cl.address)}</span></li>
            <li>${icon('phone')}<span>${esc(c.phone)}</span></li>
            <li>${icon('mail')}<span>${esc(c.email)}</span></li>
          </ul>
        </section>

        <section class="cv-block">
          <h2 class="cv-h">${esc(ui.sections.skills)}</h2>
          <div class="cv-rule"></div>
${each(skills, skillRow(ui))}
        </section>

        <section class="cv-block">
          <h2 class="cv-h">${esc(ui.sections.frameworks)}</h2>
          <div class="cv-rule"></div>
          <ul class="cv-list">
${each(frameworks, f => `            <li>${esc(f.name)}</li>\n`)}          </ul>
        </section>

        <section class="cv-block">
          <h2 class="cv-h">${esc(ui.labels.socialMedia)}</h2>
          <div class="cv-rule"></div>
          <ul class="cv-social">
${each(socials, s => `            <li>${icon(s.icon)}<span>${esc(s.label)}</span></li>\n`)}          </ul>
        </section>
      </div>

      <div class="cv-col cv-col--right">
        <section class="cv-block">
          <h2 class="cv-h">${esc(ui.sections.education)}</h2>
          <div class="cv-rule"></div>
${each(education, e => {
  const x = t(e, lang);
  return `          <div class="cv-edu">
            <div class="cv-edu__years">${esc(e.from)} / ${esc(e.to)}</div>
            <div>
              <p class="cv-entry__org">${esc(x.org)}</p>
              ${x.degree ? `<p class="cv-entry__title" style="font-size:9pt">${esc(x.degree)}</p>` : ''}
            </div>
          </div>\n`;
})}        </section>

        <section class="cv-block">
          <h2 class="cv-h">${esc(ui.sections.experience)}</h2>
          <div class="cv-rule"></div>
${each(experience, e => {
  const x = t(e, lang);
  return `          <div class="cv-entry">
            <p class="cv-entry__date">${esc(fmtRange(e.from, e.to, lang, ui.present))}</p>
            <h3 class="cv-entry__title">${esc(x.role)}</h3>
            <p class="cv-entry__org">${esc(x.orgType)} | <span>${esc(x.org)}</span></p>
            <p class="cv-entry__text"><b>${esc(ui.labels.description)}</b> ${esc(x.summary)}</p>
          </div>\n`;
})}        </section>

        <section class="cv-block">
          <h2 class="cv-h">${esc(ui.sections.certificate)}</h2>
          <div class="cv-rule"></div>
${each(certificates, e => {
  const x = t(e, lang);
  return `          <div class="cv-entry">
            <p class="cv-entry__date">${esc(fmtMonth(e.date, lang))}</p>
            <h3 class="cv-entry__title">${esc(x.title)}</h3>
            <p class="cv-entry__org">${esc(ui.labels.from)} | <span>${esc(x.issuer)}</span></p>
            <p class="cv-entry__text"><b>${esc(ui.labels.description)}</b> ${esc(x.summary)}</p>
          </div>\n`;
})}        </section>

        <section class="cv-block">
          <h2 class="cv-h">${esc(ui.sections.otherInfo)}</h2>
          <div class="cv-rule"></div>
          <div class="cv-other">
            <img src="/assets/img/qr-site.png" alt="${esc(ui.a11y.qrAlt)}"
                 width="240" height="240" loading="lazy" decoding="async">
            <p>${esc(ui.cvQrNote)}</p>
          </div>
        </section>
      </div>

      <div class="cv-footbar"></div>
    </article>`;
};
