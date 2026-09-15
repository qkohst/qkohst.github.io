/* Halaman detail satu layanan.
   Nama teknologi sengaja tidak dicantumkan — calon klien menilai hasil dan
   proses kerja, bukan tumpukan teknologi. Harga ditampilkan sebagai titik awal
   dalam dua mata uang, dengan kurs dan tanggalnya disebut terbuka. */
const { esc, each, icon, t, pageUrl, fmtUsd, fmtIdr, fmtDate, waLink, WA_TEKS } = require('../tools/lib');
const { contactSection } = require('./partials');

module.exports = function service(ctx, s) {
  const { site, lang, ui } = ctx;
  const x = t(s, lang);
  const sp = t(site.servicesPage, lang);
  const cur = site.currency;
  const feat = site.pricingFeatures;
  const lain = site.services.filter(o => o.key !== s.key);

  const waLayanan = waLink(site.contact.phoneE164, WA_TEKS.service[lang](x.title));
  const waPaket = paket => waLink(site.contact.phoneE164, WA_TEKS.paket[lang](x.title, paket));

  return `
    <section class="section">
      <div class="container">
        <nav class="breadcrumb" aria-label="${esc(lang === 'id' ? 'Remah roti' : 'Breadcrumb')}">
          <ol>
            <li><a href="${esc(pageUrl('home', lang))}">${esc(ui.nav.home)}</a></li>
            <li><a href="${esc(pageUrl('services', lang))}">${esc(ui.sections.services)}</a></li>
            <li><span aria-current="page">${esc(x.title)}</span></li>
          </ol>
        </nav>

        <div class="section__head page-head" data-reveal>
          <span class="section__eyebrow">${esc(x.title)}</span>
          <h1>${esc(x.heading)}</h1>
        </div>

        <div class="grid grid--2" style="align-items:start">
          <div class="stack" data-reveal>
${each(x.body, b => `            <p>${esc(b)}</p>\n`)}
            <p style="margin-top:var(--sp-5)">
              <a class="btn btn--primary" href="${esc(waLayanan)}" target="_blank" rel="noopener noreferrer">
                ${icon('whatsapp')} ${esc(ui.askAboutService)}
              </a>
            </p>
          </div>

          <aside class="info-card" data-reveal data-reveal-delay="100">
            <h2 style="font-size:var(--step-1)">${esc(ui.serviceDeliverables)}</h2>
            <ul class="feature-list">
${each(x.deliverables, d => `              <li>${esc(d)}</li>\n`)}            </ul>
          </aside>
        </div>
      </div>
    </section>

    <section class="section section--subtle">
      <div class="container">
        <div class="section__head" data-reveal>
          <span class="section__eyebrow">${esc(lang === 'id' ? 'Proses' : 'Process')}</span>
          <h2>${esc(sp.processTitle)}</h2>
        </div>
        <ol class="steps list-plain">
${each(sp.process, (p, i) => `          <li class="step" data-reveal data-reveal-delay="${i * 80}">
            <span class="step__num">${String(i + 1).padStart(2, '0')}</span>
            <h3 class="step__title">${esc(p.judul)}</h3>
            <p class="step__text">${esc(p.isi)}</p>
          </li>\n`)}        </ol>
      </div>
    </section>

    <section class="section" id="pricing">
      <div class="container">
        <div class="section__head" data-reveal>
          <span class="section__eyebrow">${esc(lang === 'id' ? 'Harga' : 'Pricing')}</span>
          <h2>${esc(lang === 'id' ? 'Paket dan perkiraan biaya' : 'Packages and indicative pricing')}</h2>
          <p class="section__lead">${esc(sp.priceNote)}</p>
        </div>

        <ul class="price-grid list-plain">
${each(site.pricing, tier => {
  const p = t(tier, lang);
  // Harga tiap paket berskala terhadap titik awal layanan ini.
  const mulai = Math.round(s.from * (tier.from / site.pricing[0].from));
  return `          <li class="card price${tier.featured ? ' price--featured' : ''}" data-reveal>
            ${tier.featured ? `<span class="price__badge">${esc(lang === 'id' ? 'Paling dipilih' : 'Most popular')}</span>` : ''}
            <h3 class="price__name">${esc(p.name)}</h3>
            <p class="price__from">${esc(ui.startFrom)}</p>
            <p class="price__amount">${esc(fmtUsd(mulai))}</p>
            <p class="price__idr">${esc(fmtIdr(mulai, cur))} <span>· ${esc(ui.perProject)}</span></p>
            <p class="price__summary">${esc(p.summary)}</p>
            <ul class="price__features">
              <li>${icon('check')}<span>${esc(lang === 'id' ? `Estimasi ${tier.days} hari kerja` : `About ${tier.days} working days`)}</span></li>
              <li>${icon('check')}<span>${esc(lang === 'id' ? `${tier.revisions} kali revisi` : `${tier.revisions} revisions`)}</span></li>
${each(tier.features, f => `              <li>${icon('check')}<span>${esc(feat[f][lang])}</span></li>\n`)}            </ul>
            <a class="btn ${tier.featured ? 'btn--primary' : 'btn--ghost'}" style="width:100%"
               href="${esc(waPaket(p.name))}" target="_blank" rel="noopener noreferrer">
              ${esc(lang === 'id' ? 'Minta penawaran' : 'Request a quote')}
            </a>
          </li>\n`;
})}        </ul>

        <p class="price-note" data-reveal>
          ${esc(ui.rateNote.replace('{rate}', `1 USD ≈ ${fmtIdr(1, { ...cur, roundIdrTo: 1 })}`)
                           .replace('{date}', fmtDate(cur.rateDate, lang)))}
        </p>
      </div>
    </section>

    <section class="section section--subtle">
      <div class="container">
        <div class="section__head" data-reveal>
          <h2 style="font-size:var(--step-2)">${esc(ui.otherServices)}</h2>
        </div>
        <ul class="grid grid--3 list-plain">
${each(lain, (o, i) => {
  const y = t(o, lang);
  return `          <li data-reveal data-reveal-delay="${i * 80}">
            <a class="card card--link" href="${esc(pageUrl('service', lang, o.slug[lang]))}"
               style="display:block;text-decoration:none;color:inherit;height:100%">
              <span class="card__icon">${icon(o.icon)}</span>
              <h3 class="card__title">${esc(y.title)}</h3>
              <p class="card__text">${esc(y.summary)}</p>
            </a>
          </li>\n`;
})}        </ul>
      </div>
    </section>

${contactSection(site, lang, ui)}`;
};
