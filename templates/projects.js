/* Indeks portofolio: seluruh proyek + penyaring kategori. */
const { esc, each, icon, fill, pageUrl } = require('../tools/lib');
const { projectCard, filterBar } = require('./partials');

module.exports = function projectsIndex(ctx, projects) {
  const { lang, ui } = ctx;

  return `
    <section class="section section--banner">
      <div class="container-wide">
        <nav class="breadcrumb" aria-label="${esc(ui.a11y.breadcrumb)}">
          <ol>
            <li><a href="${esc(pageUrl('home', lang))}">${esc(ui.nav.home)}</a></li>
            <li><span aria-current="page">${esc(ui.sections.portfolio)}</span></li>
          </ol>
        </nav>

        <div class="section__head" data-reveal>
          <span class="section__eyebrow">${esc(ui.nav.portfolio)}</span>
          <h1>${esc(ui.sections.portfolio)}</h1>
          <p class="section__lead">${esc(ui.labels.projectsLead)}</p>
        </div>

${filterBar(projects, lang, ui)}

        <p class="text-muted" style="font-size:var(--step--1)" data-filter-count data-template="${esc(ui.labels.showingProjects)}">${esc(fill(ui.labels.showingProjects, { n: projects.length }))}</p>

        <ul class="project-grid" style="list-style:none;margin:var(--sp-5) 0 0;padding:0">
${each(projects, p => projectCard(p, lang, ui, { reveal: true }))}
        </ul>
      </div>
    </section>`;
};
