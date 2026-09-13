/* Indeks portofolio: seluruh proyek + penyaring kategori. */
const { esc, each, icon, pageUrl } = require('../tools/lib');
const { projectCard, filterBar } = require('./partials');

module.exports = function projectsIndex(ctx, projects) {
  const { lang, ui } = ctx;

  return `
    <section class="section">
      <div class="container-wide">
        <nav class="breadcrumb" aria-label="${esc(lang === 'id' ? 'Remah roti' : 'Breadcrumb')}">
          <ol>
            <li><a href="${esc(pageUrl('home', lang))}">${esc(ui.nav.home)}</a></li>
            <li><span aria-current="page">${esc(ui.sections.portfolio)}</span></li>
          </ol>
        </nav>

        <div class="section__head" data-reveal>
          <span class="section__eyebrow">${esc(ui.nav.portfolio)}</span>
          <h1>${esc(ui.sections.portfolio)}</h1>
          <p class="section__lead">${esc(lang === 'id'
            ? 'Kumpulan aplikasi dan proyek yang pernah saya kerjakan, dari aplikasi web dan RESTful API hingga aplikasi desktop.'
            : 'A collection of applications and projects I have delivered, from web apps and RESTful APIs to desktop software.')}</p>
        </div>

${filterBar(projects, lang, ui)}

        <p class="text-muted" style="font-size:var(--step--1)" data-filter-count data-template="${esc(lang === 'id' ? 'Menampilkan {n} proyek' : 'Showing {n} projects')}">${esc((lang === 'id' ? 'Menampilkan {n} proyek' : 'Showing {n} projects').replace('{n}', projects.length))}</p>

        <ul class="project-grid" style="list-style:none;margin:var(--sp-5) 0 0;padding:0">
${each(projects, p => projectCard(p, lang, ui, { reveal: true }))}
        </ul>
      </div>
    </section>`;
};
