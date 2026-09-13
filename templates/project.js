/* Halaman detail satu proyek: galeri scroll-snap, info, deskripsi, fitur. */
const { esc, each, icon, t, pageUrl, fmtMonth } = require('../tools/lib');

const LINK_ICON = { github: 'github', postman: 'external', whatsapp: 'whatsapp', link: 'external' };
const LINK_LABEL = {
  github:   { id: 'Lihat di GitHub',    en: 'View on GitHub' },
  postman:  { id: 'Lihat dokumentasi',  en: 'View documentation' },
  whatsapp: { id: 'Tanya proyek ini',   en: 'Ask about this project' },
  link:     { id: 'Lihat proyek',       en: 'View project' }
};

module.exports = function project(ctx, p) {
  const { lang, ui } = ctx;
  const c = t(p, lang);
  const link = p.link;

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

        <div class="section__head" data-reveal>
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

          <aside class="info-card" data-reveal data-reveal-delay="100">
            <h2 style="font-size:var(--step-1)">${esc(ui.sections.projectInfo)}</h2>
            <ul class="info-list">
              <li><span class="k">${esc(ui.meta.category)}</span><span class="v">${esc(ui.categories[p.category] || p.category)}</span></li>
              ${p.framework ? `<li><span class="k">${esc(ui.meta.framework)}</span><span class="v">${esc(p.framework)}</span></li>` : ''}
              ${p.client ? `<li><span class="k">${esc(ui.meta.client)}</span><span class="v">${esc(p.client)}</span></li>` : ''}
              <li><span class="k">${esc(ui.meta.date)}</span><span class="v">${esc(fmtMonth(p.date, lang))}</span></li>
            </ul>
            ${link ? `<a class="btn btn--primary" style="width:100%" href="${esc(link.url)}" target="_blank" rel="noopener noreferrer">${icon(LINK_ICON[link.type] || 'external')} ${esc(LINK_LABEL[link.type][lang])}</a>` : ''}
          </aside>
        </div>
      </div>
    </section>

    <dialog class="lightbox" data-lightbox>
      <img alt="">
      <div class="lightbox__bar">
        <span data-lightbox-caption></span>
        <button class="lightbox__close" type="button" data-lightbox-close
                aria-label="${esc(lang === 'id' ? 'Tutup' : 'Close')}">${icon('close')}</button>
      </div>
    </dialog>`;
};
