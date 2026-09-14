/* Halaman jasa: penawaran, cara kerja, dan paket harga.
   Nama teknologi sengaja tidak dicantumkan — calon klien menilai hasil dan
   proses, bukan tumpukan teknologi. Harga ditampilkan sebagai titik awal
   dalam dua mata uang, dengan kurs dan tanggalnya disebut terbuka. */
const { esc, each, icon, t, pageUrl, fmtUsd, fmtIdr, fmtDate } = require('../tools/lib');
const { contactSection } = require('./partials');

module.exports = function services(ctx) {
  const { site, lang, ui } = ctx;
  const sp = t(site.servicesPage, lang);
  const feat = site.pricingFeatures;
  const cur = site.currency;

  const wa = paket => `https://api.whatsapp.com/send?${new URLSearchParams({
    phone: site.contact.phoneE164,
    text: lang === 'id'
      ? `Halo, saya tertarik dengan paket ${paket} untuk pengembangan web. Boleh dibantu untuk penawarannya?`
      : `Hello, I am interested in the ${paket} package for web development. Could you send me a quote?`
  })}`;

  return `
    <section class="section">
      <div class="container">
        <nav class="breadcrumb" aria-label="${esc(lang === 'id' ? 'Remah roti' : 'Breadcrumb')}">
          <ol>
            <li><a href="${esc(pageUrl('home', lang))}">${esc(ui.nav.home)}</a></li>
            <li><a href="${esc(pageUrl('home', lang))}#services">${esc(ui.sections.services)}</a></li>
            <li><span aria-current="page">${esc(sp.title)}</span></li>
          </ol>
        </nav>

        <div class="section__head page-head" data-reveal>
          <span class="section__eyebrow">${esc(ui.nav.services)}</span>
          <h1>${esc(sp.heading)}</h1>
        </div>

        <div class="stack" style="max-width:46rem" data-reveal>
${each(sp.body, b => `          <p>${esc(b)}</p>\n`)}
          <p style="margin-top:var(--sp-5)">
            <a class="btn btn--primary" href="${esc(site.contact.whatsapp)}" target="_blank" rel="noopener noreferrer">
              ${icon('whatsapp')} ${esc(lang === 'id' ? 'Diskusikan kebutuhan Anda' : 'Discuss your needs')}
            </a>
          </p>
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
${each(sp.process, (s, i) => `          <li class="step" data-reveal data-reveal-delay="${i * 80}">
            <span class="step__num">${String(i + 1).padStart(2, '0')}</span>
            <h3 class="step__title">${esc(s.judul)}</h3>
            <p class="step__text">${esc(s.isi)}</p>
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
  const x = t(tier, lang);
  return `          <li class="card price${tier.featured ? ' price--featured' : ''}" data-reveal>
            ${tier.featured ? `<span class="price__badge">${esc(lang === 'id' ? 'Paling dipilih' : 'Most popular')}</span>` : ''}
            <h3 class="price__name">${esc(x.name)}</h3>
            <p class="price__from">${esc(ui.startFrom)}</p>
            <p class="price__amount">${esc(fmtUsd(tier.from))}</p>
            <p class="price__idr">${esc(fmtIdr(tier.from, cur))} <span>· ${esc(ui.perProject)}</span></p>
            <p class="price__summary">${esc(x.summary)}</p>
            <ul class="price__features">
              <li>${icon('check')}<span>${esc(lang === 'id' ? `Estimasi ${tier.days} hari kerja` : `About ${tier.days} working days`)}</span></li>
              <li>${icon('check')}<span>${esc(lang === 'id' ? `${tier.revisions} kali revisi` : `${tier.revisions} revisions`)}</span></li>
${each(tier.features, f => `              <li>${icon('check')}<span>${esc(feat[f][lang])}</span></li>\n`)}            </ul>
            <a class="btn ${tier.featured ? 'btn--primary' : 'btn--ghost'}" style="width:100%"
               href="${esc(wa(x.name))}" target="_blank" rel="noopener noreferrer">
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

${contactSection(site, lang, ui)}`;
};
