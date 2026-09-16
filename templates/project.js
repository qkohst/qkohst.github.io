/* Halaman detail satu proyek: galeri scroll-snap, info, deskripsi, fitur. */
const { esc, each, icon, t, pageUrl, fmtMonth, waLink, WA_TEKS } = require('../tools/lib');
const { projectCard } = require('./partials');

/* CTA utama selalu mengajak berdiskusi lewat WhatsApp dengan pesan yang sudah
   terisi judul proyek dan bahasa halaman. Tautan dokumentasi Postman tetap
   ditampilkan sebagai tombol sekunder karena memang berguna dibuka sendiri;
   tautan repositori tidak lagi ditawarkan sebagai tombol. */
const DOC_LABEL = { id: 'Lihat dokumentasi API', en: 'View API documentation' };

/* Kanal berbagi. Tiap entri membangun URL bagikan baku milik platformnya,
   memakai URL kanonis halaman dan judul proyek. */
const BAGIKAN = [
  { key: 'whatsapp', icon: 'whatsapp', label: 'WhatsApp',
    url: (u, j) => `https://api.whatsapp.com/send?${new URLSearchParams({ text: `${j} — ${u}` })}` },
  { key: 'facebook', icon: 'facebook', label: 'Facebook',
    url: u => `https://www.facebook.com/sharer/sharer.php?${new URLSearchParams({ u })}` },
  { key: 'twitter', icon: 'twitter', label: 'X',
    url: (u, j) => `https://twitter.com/intent/tweet?${new URLSearchParams({ url: u, text: j })}` },
  { key: 'linkedin', icon: 'linkedin', label: 'LinkedIn',
    url: u => `https://www.linkedin.com/sharing/share-offsite/?${new URLSearchParams({ url: u })}` },
  { key: 'telegram', icon: 'telegram', label: 'Telegram',
    url: (u, j) => `https://t.me/share/url?${new URLSearchParams({ url: u, text: j })}` }
];

module.exports = function project(ctx, p, semuaProyek = []) {
  const { lang, ui, site } = ctx;
  const c = t(p, lang);
  const link = p.link;
  // Maksimal tiga proyek lain pada kategori yang sama, terbaru lebih dulu.
  const terkait = semuaProyek.filter(o => o.key !== p.key && o.category === p.category).slice(0, 3);

  return `
    <section class="section">
      <div class="container-wide">
        <nav class="breadcrumb" aria-label="${esc(lang === 'id' ? 'Remah roti' : 'Breadcrumb')}">
          <ol>
            <li><a href="${esc(pageUrl('home', lang))}">${esc(ui.nav.home)}</a></li>
            <li><a href="${esc(pageUrl('projects', lang))}">${esc(ui.sections.portfolio)}</a></li>
            <li><span aria-current="page">${esc(c.title)}</span></li>
          </ol>
        </nav>

        <div class="section__head page-head" data-reveal>
          <div class="project__meta" style="margin-bottom:var(--sp-3)">
            <span class="tag tag--accent">${esc(ui.categories[p.category] || p.category)}</span>
            ${p.framework ? `<span class="tag">${esc(p.framework)}</span>` : ''}
            <span class="tag">${esc(fmtMonth(p.date, lang))}</span>
          </div>
          <h1>${esc(c.title)}</h1>
          <p class="section__lead">${esc(c.summary)}</p>
        </div>

        <div class="detail">
          <div>
            <div class="gallery" data-gallery data-reveal>
              <div class="gallery__track" data-gallery-track tabindex="0" role="group"
                   aria-label="${esc(lang === 'id' ? 'Galeri tangkapan layar' : 'Screenshot gallery')}">
${each(p.images, (img, i) => `                <figure class="gallery__slide" style="margin:0">
                  <picture>
                    <source type="image/avif" srcset="/assets/img/portfolio/${esc(img.name)}-960.avif 960w, /assets/img/portfolio/${esc(img.name)}-1440.avif 1440w" sizes="(min-width: 56rem) 46rem, 92vw">
                    <img src="/assets/img/portfolio/${esc(img.name)}-960.jpg" alt="${esc(img.alt[lang])}"
                         width="1440" height="810" data-zoom
                         loading="${i === 0 ? 'eager' : 'lazy'}" decoding="async"${i === 0 ? ' fetchpriority="high"' : ''}>
                  </picture>
                </figure>\n`)}              </div>

              <div class="gallery__nav">
                <span class="gallery__dots" data-gallery-dots role="tablist"
                      data-template="${esc(lang === 'id' ? 'Gambar {n}' : 'Image {n}')}"></span>
                <span class="gallery__count" data-gallery-count
                      data-template="${esc(lang === 'id' ? '{n} dari {total}' : '{n} of {total}')}">1 / ${p.images.length}</span>
                <span style="display:flex;gap:var(--sp-2)">
                  <button class="icon-btn" type="button" data-gallery-prev aria-label="${esc(lang === 'id' ? 'Gambar sebelumnya' : 'Previous image')}">${icon('arrow-left')}</button>
                  <button class="icon-btn" type="button" data-gallery-next aria-label="${esc(lang === 'id' ? 'Gambar berikutnya' : 'Next image')}">${icon('arrow-right')}</button>
                </span>
              </div>
            </div>

            <div class="stack" style="margin-top:var(--sp-6)" data-reveal>
${each(c.body, b => `              <p>${esc(b)}</p>\n`)}
${c.features && c.features.length ? `              <h2 style="font-size:var(--step-2);margin-top:var(--sp-5)">${esc(ui.sections.keyFeatures)}</h2>
              <ul class="feature-list">
${each(c.features, f => `                <li>${esc(f)}</li>\n`)}              </ul>` : ''}
            </div>
          </div>

          <aside class="detail__side">
            <div class="card share" data-reveal data-reveal-delay="80">
              <h2 class="share__title">${icon('share')} ${esc(ui.shareTitle)}</h2>
              <ul class="share__list list-plain">
${each(BAGIKAN, b => `                <li><a class="share__btn share__btn--${b.key}" href="${esc(b.url(ctx.canonical, c.title))}"
                       target="_blank" rel="noopener noreferrer" aria-label="${esc(b.label)}" title="${esc(b.label)}">${icon(b.icon)}</a></li>
`)}
                <li>
                  <button class="share__btn share__btn--link" type="button"
                          data-copy-link="${esc(ctx.canonical)}"
                          data-label-copy="${esc(ui.copyLink)}" data-label-done="${esc(ui.linkCopied)}"
                          aria-label="${esc(ui.copyLink)}" title="${esc(ui.copyLink)}">${icon('link')}</button>
                </li>
              </ul>
            </div>

            <div class="card info-card" data-reveal data-reveal-delay="100">
            <h2 style="font-size:var(--step-1)">${esc(ui.sections.projectInfo)}</h2>
            <ul class="info-list">
              <li><span class="k">${esc(ui.meta.category)}</span><span class="v">${esc(ui.categories[p.category] || p.category)}</span></li>
              ${p.framework ? `<li><span class="k">${esc(ui.meta.framework)}</span><span class="v">${esc(p.framework)}</span></li>` : ''}
              ${p.client ? `<li><span class="k">${esc(ui.meta.client)}</span><span class="v">${esc(p.client)}</span></li>` : ''}
              <li><span class="k">${esc(ui.meta.date)}</span><span class="v">${esc(fmtMonth(p.date, lang))}</span></li>
            </ul>
            <a class="btn btn--primary" style="width:100%"
               href="${esc(waLink(ctx.site.contact.phoneE164, WA_TEKS.project[lang](c.title)))}"
               target="_blank" rel="noopener noreferrer">
              ${icon('whatsapp')} ${esc(ui.askAboutProject)}
            </a>
            ${link && link.type === 'postman' ? `<a class="btn btn--ghost" style="width:100%;margin-top:var(--sp-3)" href="${esc(link.url)}" target="_blank" rel="noopener noreferrer">${icon('external')} ${esc(DOC_LABEL[lang])}</a>` : ''}
            </div>
          </aside>
        </div>
      </div>
    </section>

${terkait.length ? `
    <section class="section section--subtle">
      <div class="container-wide">
        <div class="section__head" data-reveal>
          <span class="section__eyebrow">${esc(ui.categories[p.category] || p.category)}</span>
          <h2 style="font-size:var(--step-2)">${esc(ui.relatedTitle)}</h2>
        </div>
        <ul class="project-grid list-plain">
${each(terkait, o => projectCard(o, lang, ui, { reveal: true }))}
        </ul>
        <p style="margin-top:var(--sp-5)" data-reveal>
          <a class="btn btn--ghost" href="${esc(pageUrl('projects', lang))}#${esc(p.category)}">
            ${esc(ui.viewAllInCategory)} ${icon('arrow-right')}
          </a>
        </p>
      </div>
    </section>` : ''}`;
};
