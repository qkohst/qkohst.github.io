/* Potongan yang dipakai lebih dari satu halaman. */
const { esc, each, icon, t, pageUrl, fmtMonth, fmtRange, shown } = require('../tools/lib');

/** Kartu proyek untuk grid. */
function projectCard(p, lang, ui, opts = {}) {
  const c = t(p, lang);
  const href = pageUrl('project', lang, p.slug[lang]);
  const alt = p.images[0] ? p.images[0].alt[lang] : c.title;
  const w = 960, h = 540;

  return `
        <li class="project" data-category="${esc(p.category)}"${opts.reveal ? ' data-reveal' : ''}>
          <a class="project__card" href="${esc(href)}">
            <div class="project__media">
              <picture>
                <source type="image/avif" srcset="/assets/img/portfolio/${esc(p.thumb)}-480.avif 480w, /assets/img/portfolio/${esc(p.thumb)}-960.avif 960w" sizes="(min-width: 64rem) 20rem, (min-width: 40rem) 45vw, 90vw">
                <img src="/assets/img/portfolio/${esc(p.thumb)}-960.jpg" alt="${esc(alt)}" width="${w}" height="${h}" loading="lazy" decoding="async">
              </picture>
              <span class="project__arrow" aria-hidden="true">${icon('arrow-right')}</span>
            </div>
            <div class="project__body">
              <div class="project__meta">
                <span class="tag tag--accent">${esc(ui.categories[p.category] || p.category)}</span>
                ${p.framework ? `<span class="tag">${esc(p.framework)}</span>` : ''}
              </div>
              <h3 class="project__title">${esc(c.title)}</h3>
              <p class="project__summary">${esc(c.summary)}</p>
              <span class="project__date">${esc(fmtMonth(p.date, lang))}</span>
            </div>
          </a>
        </li>`;
}

/** Bar penyaring kategori. */
function filterBar(projects, lang, ui) {
  const cats = [...new Set(projects.map(p => p.category))];
  return `
      <div class="filters" data-filter-bar role="group" aria-label="${esc(ui.sections.portfolio)}">
        <button class="filter" type="button" data-filter="all" aria-pressed="true">${esc(ui.allProjects)}</button>
${each(cats, c => `        <button class="filter" type="button" data-filter="${esc(c)}" aria-pressed="false">${esc(ui.categories[c] || c)}</button>\n`)}
      </div>`;
}

/** Satu meter kemampuan. */
const meter = s => `
          <div class="meter">
            <div class="meter__head">
              <span class="meter__name">${esc(s.name)}</span>
              <span class="meter__value">${s.level}%</span>
            </div>
            <div class="meter__track">
              <div class="meter__fill" style="--level:${s.level}%"></div>
            </div>
          </div>`;

/** Kartu kontak. */
const contactCard = (iconName, label, value, href) => `
        <a class="contact-card" href="${esc(href)}"${/^https?:/.test(href) ? ' target="_blank" rel="noopener noreferrer"' : ''}>
          <span class="contact-card__icon">${icon(iconName)}</span>
          <span>
            <span class="contact-card__label">${esc(label)}</span>
            <span class="contact-card__value">${esc(value)}</span>
          </span>
        </a>`;

/** Blok kontak lengkap, dipakai di beranda. */
function contactSection(site, lang, ui) {
  const c = site.contact;
  const cl = t(c, lang);
  return `
    <section class="section section--subtle" id="contact">
      <div class="container">
        <div class="section__head" data-reveal>
          <span class="section__eyebrow">${esc(ui.nav.contact)}</span>
          <h2>${esc(ui.sections.contact)}</h2>
          <p class="section__lead">${esc(lang === 'id'
            ? 'Punya proyek atau pertanyaan? Hubungi lewat kanal mana pun di bawah ini.'
            : 'Got a project or a question? Reach me through any of the channels below.')}</p>
        </div>
        <div class="grid grid--3" data-reveal>
${contactCard('mail', 'Email', c.email, `mailto:${c.email}`)}
${contactCard('whatsapp', 'WhatsApp', c.phone, c.whatsapp)}
${contactCard('map-pin', lang === 'id' ? 'Alamat' : 'Address', cl.addressShort, c.mapsUrl)}
        </div>
      </div>
    </section>`;
}

module.exports = { projectCard, filterBar, meter, contactCard, contactSection };
