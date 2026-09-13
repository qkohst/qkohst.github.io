/* Halaman jasa + tabel harga. */
const { esc, each, icon, t, pageUrl } = require('../tools/lib');
const { contactSection } = require('./partials');

module.exports = function services(ctx) {
  const { site, lang, ui } = ctx;
  const sp = t(site.servicesPage, lang);
  const feat = site.pricingFeatures;
  const wa = n => `https://api.whatsapp.com/send?${new URLSearchParams({
    phone: site.contact.phoneE164,
    text: lang === 'id'
      ? `Halo, saya tertarik dengan paket ${n} untuk jasa pembuatan website.`
      : `Hello, I'm interested in the ${n} package for web development.`
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

        <div class="section__head" data-reveal>
          <span class="section__eyebrow">${esc(ui.nav.services)}</span>
          <h1>${esc(sp.heading)}</h1>
        </div>

        <div class="grid grid--2">
          <div class="stack" data-reveal>
${each(sp.body, b => `            <p>${esc(b)}</p>\n`)}
            <p>
              <a class="btn btn--primary" href="${esc(site.contact.whatsapp)}" target="_blank" rel="noopener noreferrer">
                ${icon('whatsapp')} ${esc(lang === 'id' ? 'Hubungi saya' : 'Contact me')}
              </a>
            </p>
          </div>
          <aside class="info-card" data-reveal data-reveal-delay="100">
            <h2 style="font-size:var(--step-1)">${esc(ui.sections.projectInfo)}</h2>
            <ul class="info-list" style="margin:0">
              <li><span class="k">${esc(ui.meta.category)}</span><span class="v">${esc(site.servicesPage.category)}</span></li>
              <li><span class="k">${esc(ui.meta.framework)}</span><span class="v">${esc(site.servicesPage.framework)}</span></li>
              <li><span class="k">DBMS</span><span class="v">${esc(site.servicesPage.dbms)}</span></li>
            </ul>
          </aside>
        </div>
      </div>
    </section>

    <section class="section section--subtle" id="pricing">
      <div class="container">
        <div class="section__head" data-reveal>
          <span class="section__eyebrow">${esc(lang === 'id' ? 'Harga' : 'Pricing')}</span>
          <h2>${esc(lang === 'id' ? 'Paket dan harga' : 'Packages and pricing')}</h2>
          <p class="section__lead">${esc(sp.priceNote)}</p>
        </div>

        <ul class="price-grid" style="list-style:none;margin:0;padding:0">
${each(site.pricing, tier => {
  const x = t(tier, lang);
  return `          <li class="card price${tier.featured ? ' price--featured' : ''}" style="margin:0" data-reveal>
            ${tier.featured ? `<span class="price__badge">${esc(lang === 'id' ? 'Paling dipilih' : 'Most popular')}</span>` : ''}
            <h3 class="price__name">${esc(x.name)}</h3>
            <p class="price__amount"><sup>$</sup>${tier.price}</p>
            <p class="price__summary">${esc(x.summary)}</p>
            <ul class="price__features">
              <li>${icon('check')}<span>${esc(lang === 'id' ? `Pengerjaan ${tier.days} hari` : `${tier.days} days delivery`)}</span></li>
              <li>${icon('check')}<span>${esc(lang === 'id' ? `${tier.revisions} kali revisi` : `${tier.revisions} revisions`)}</span></li>
${each(tier.features, f => `              <li>${icon('check')}<span>${esc(feat[f][lang])}</span></li>\n`)}            </ul>
            <a class="btn ${tier.featured ? 'btn--primary' : 'btn--ghost'}" style="width:100%"
               href="${esc(wa(x.name))}" target="_blank" rel="noopener noreferrer">
              ${esc(lang === 'id' ? 'Pesan sekarang' : 'Order now')}
            </a>
          </li>\n`;
})}        </ul>
      </div>
    </section>

${contactSection(site, lang, ui)}`;
};
