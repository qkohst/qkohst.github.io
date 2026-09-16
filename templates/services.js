/* Indeks layanan: daftar seluruh layanan yang ditawarkan. */
const { esc, each, icon, t, pageUrl, fmtUsd, fmtIdr, waLink, WA_TEKS } = require('../tools/lib');
const { contactSection } = require('./partials');

module.exports = function services(ctx, produk = []) {
  const { site, lang, ui } = ctx;
  const sp = t(site.servicesPage, lang);
  const cur = site.currency;

  return `
    <section class="section">
      <div class="container">
        <nav class="breadcrumb" aria-label="${esc(lang === 'id' ? 'Remah roti' : 'Breadcrumb')}">
          <ol>
            <li><a href="${esc(pageUrl('home', lang))}">${esc(ui.nav.home)}</a></li>
            <li><span aria-current="page">${esc(ui.sections.services)}</span></li>
          </ol>
        </nav>

        <div class="section__head" data-reveal>
          <span class="section__eyebrow">${esc(ui.nav.services)}</span>
          <h1>${esc(lang === 'id'
            ? 'Layanan pengembangan web dari perancangan sampai serah terima'
            : 'Web development services, from design through handover')}</h1>
          <p class="section__lead">${esc(lang === 'id'
            ? 'Empat layanan yang saling melengkapi. Anda bisa mengambil satu saja, atau menggabungkannya menjadi satu pengerjaan utuh.'
            : 'Four services that complement each other. Take just one, or combine them into a single end-to-end engagement.')}</p>
        </div>

        <ul class="grid grid--services list-plain">
${each(site.services, (s, i) => {
  const x = t(s, lang);
  return `          <li data-reveal data-reveal-delay="${i * 80}">
            <a class="card card--link service-card" href="${esc(pageUrl('service', lang, s.slug[lang]))}">
              <span class="card__icon">${icon(s.icon)}</span>
              <h2 class="card__title">${esc(x.title)}</h2>
              <p class="card__text">${esc(x.summary)}</p>
              <p class="service-card__price">
                <span class="service-card__from">${esc(ui.startFrom)}</span>
                <strong>${esc(fmtUsd(s.from))}</strong>
                <span class="service-card__idr">${esc(fmtIdr(s.from, cur))}</span>
              </p>
            </a>
          </li>\n`;
})}        </ul>

        <p class="stack" style="margin-top:var(--sp-6)" data-reveal>
          <a class="btn btn--primary"
             href="${esc(waLink(site.contact.phoneE164, WA_TEKS.umum[lang]()))}"
             target="_blank" rel="noopener noreferrer">
            ${icon('whatsapp')} ${esc(ui.askAboutService)}
          </a>
        </p>
      </div>
    </section>

${produk.length ? `
    <section class="section section--subtle">
      <div class="container">
        <div class="section__head" data-reveal>
          <span class="section__eyebrow">${esc(ui.proposal.readyProducts)}</span>
          <h2>${esc(ui.proposal.readyProducts)}</h2>
          <p class="section__lead">${esc(ui.proposal.readyProductsLead)}</p>
        </div>
        <ul class="grid grid--3 list-plain">
${each(produk, (x, i) => `          <li data-reveal data-reveal-delay="${i * 80}">
            <a class="card card--link service-card" href="${esc(pageUrl('proposal', lang, x.slug[lang]))}">
              <span class="card__icon">${icon('download')}</span>
              <h3 class="card__title">${esc(x.judul)}</h3>
              <p class="card__text">${esc(x.ringkas)}</p>
              <p class="service-card__price">
                <span class="service-card__from">${esc(ui.proposal.startFromLicense)}</span>
                <strong>${esc(fmtUsd(x.licenseUsd))}</strong>
                <span class="service-card__idr">${esc(fmtIdr(x.licenseUsd, cur))}</span>
              </p>
            </a>
          </li>\n`)}        </ul>
      </div>
    </section>` : ''}

    <section class="section">
      <div class="container">
        <div class="section__head" data-reveal>
          <span class="section__eyebrow">${esc(lang === 'id' ? 'Proses' : 'Process')}</span>
          <h2>${esc(sp.processTitle)}</h2>
          <p class="section__lead">${esc(sp.priceNote)}</p>
        </div>
        <ol class="steps list-plain">
${each(sp.process, (p, i) => `          <li class="step" data-reveal data-reveal-delay="${i * 80}">
            <span class="step__num">${String(i + 1).padStart(2, '0')}</span>
            <h3 class="step__title">${esc(p.judul)}</h3>
            <p class="step__text">${esc(p.isi)}</p>
          </li>\n`)}        </ol>
      </div>
    </section>

${contactSection(site, lang, ui)}`;
};
