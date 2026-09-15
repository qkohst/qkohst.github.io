/* Beranda: hero, tentang, kemampuan, framework, resume, layanan, proyek pilihan, kontak. */
const { esc, each, icon, t, pageUrl, fmtMonth, fmtRange, yearsSince, shown, waLink, WA_TEKS } = require('../tools/lib');
const { projectCard, meter, contactSection } = require('./partials');

module.exports = function home(ctx, projects) {
  const { site, lang, ui } = ctx;
  const p = t(site.profile, lang);
  const c = site.contact;
  const years = yearsSince(site.profile.experienceSince);

  const featured = projects.slice(0, 6);
  const skills = shown(site.skills, 'site');
  const frameworks = shown(site.frameworks, 'site');
  const education = shown(site.education, 'site');
  const experience = shown(site.experience, 'site');
  const certificates = shown(site.certificates, 'site');

  return `
    <section class="section hero">
      <div class="container-wide hero__inner">
        <div data-reveal>
          <span class="hero__eyebrow">
            <span class="hero__dot" aria-hidden="true"></span>
            ${esc(lang === 'id' ? 'Tersedia untuk proyek baru' : 'Available for new projects')}
          </span>
          <h1 class="hero__title">${esc(site.profile.name)}<br><span class="hero__role">${esc(p.role)}</span></h1>
          <p class="hero__tagline">${esc(p.tagline)}</p>
          <div class="hero__actions">
            <a class="btn btn--primary" href="${esc(waLink(c.phoneE164, WA_TEKS.umum[lang]()))}" target="_blank" rel="noopener noreferrer">${icon('whatsapp')} ${esc(ui.hire)}</a>
            <a class="btn btn--ghost" href="${esc(pageUrl('cv', lang))}">${icon('download')} ${esc(ui.downloadCv)}</a>
          </div>
          <dl class="hero__stats">
            <div class="hero__stat"><strong>${years}+</strong><span>${esc(ui.experienceSuffix)}</span></div>
            <div class="hero__stat"><strong>${projects.length}</strong><span>${esc(lang === 'id' ? 'proyek selesai' : 'projects delivered')}</span></div>
            <div class="hero__stat"><strong>${frameworks.length}</strong><span>${esc(ui.sections.frameworks.toLowerCase())}</span></div>
          </dl>
        </div>
        <div class="hero__portrait" data-reveal data-reveal-delay="120">
          <picture>
            <source type="image/avif" srcset="/assets/img/profile-480.avif">
            <img src="/assets/img/profile-480.jpg" alt="${esc(site.profile.name)}" width="480" height="480" loading="eager" fetchpriority="high" decoding="async">
          </picture>
        </div>
      </div>
    </section>

    <section class="section section--subtle" id="about">
      <div class="container">
        <div class="section__head" data-reveal>
          <span class="section__eyebrow">${esc(ui.nav.about)}</span>
          <h2>${esc(ui.sections.about)}</h2>
        </div>
        <div class="grid grid--2" data-reveal>
          <div class="stack">
            <p>${esc(p.about)}</p>
            <p>${esc(p.about2)}</p>
          </div>
          <ul class="info-list" style="margin:0">
            <li><span class="k">Email</span><span class="v">${esc(c.email)}</span></li>
            <li><span class="k">WhatsApp</span><span class="v">${esc(c.phone)}</span></li>
            <li><span class="k">${esc(lang === 'id' ? 'Lokasi' : 'Location')}</span><span class="v">${esc(t(c, lang).addressShort)}</span></li>
            <li><span class="k">${esc(ui.sections.education)}</span><span class="v">${esc(t(education[0], lang).degree)}</span></li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section" id="skills">
      <div class="container">
        <div class="section__head" data-reveal>
          <span class="section__eyebrow">${esc(lang === 'id' ? 'Kemampuan' : 'Skills')}</span>
          <h2>${esc(`${ui.sections.skills} & ${ui.sections.frameworks}`)}</h2>
        </div>
        <div class="grid grid--2">
          <div data-reveal>
            <h3 class="card__title">${esc(ui.sections.skills)}</h3>
${each(skills, meter)}
          </div>
          <div data-reveal data-reveal-delay="100">
            <h3 class="card__title">${esc(ui.sections.frameworks)}</h3>
${each(frameworks, meter)}
          </div>
        </div>
      </div>
    </section>

    <section class="section section--subtle" id="resume">
      <div class="container">
        <div class="section__head" data-reveal>
          <span class="section__eyebrow">${esc(ui.nav.resume)}</span>
          <h2>${esc(ui.sections.resume)}</h2>
        </div>
        <div class="grid grid--2">
          <div data-reveal>
            <h3 class="card__title">${esc(ui.sections.experience)}</h3>
            <ol class="timeline">
${each(experience, e => {
  const x = t(e, lang);
  return `              <li class="timeline__item">
                <p class="timeline__date">${esc(fmtRange(e.from, e.to, lang, ui.present))}</p>
                <h4 class="timeline__title">${esc(x.role)}</h4>
                <p class="timeline__org">${esc(x.org)}</p>
                <p class="timeline__text">${esc(x.summary)}</p>
              </li>\n`;
})}            </ol>
          </div>
          <div data-reveal data-reveal-delay="100">
            <h3 class="card__title">${esc(ui.sections.education)}</h3>
            <ol class="timeline">
${each(education, e => {
  const x = t(e, lang);
  return `              <li class="timeline__item">
                <p class="timeline__date">${esc(e.from)} — ${esc(e.to)}</p>
                <h4 class="timeline__title">${esc(x.degree || x.org)}</h4>
                ${x.degree ? `<p class="timeline__org">${esc(x.org)}</p>` : ''}
              </li>\n`;
})}            </ol>

            <h3 class="card__title" style="margin-top:var(--sp-6)">${esc(ui.sections.certificate)}</h3>
            <ol class="timeline">
${each(certificates, e => {
  const x = t(e, lang);
  const gambar = `/assets/img/certificates/${e.image}-1000.jpg`;
  return `              <li class="timeline__item">
                <p class="timeline__date">${esc(fmtMonth(e.date, lang))}</p>
                <h4 class="timeline__title">${esc(x.title)}</h4>
                <p class="timeline__org">${esc(x.issuer)}</p>
                <p class="timeline__text">${esc(x.summary)}</p>
                <button class="link-btn" type="button"
                        data-zoom-src="${esc(gambar)}"
                        data-zoom-alt="${esc(`${x.title} — ${x.issuer}`)}">
                  ${icon('zoom')} ${esc(ui.viewCertificate)}
                </button>
              </li>\n`;
})}            </ol>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="services">
      <div class="container">
        <div class="section__head" data-reveal>
          <span class="section__eyebrow">${esc(ui.nav.services)}</span>
          <h2>${esc(ui.sections.services)}</h2>
        </div>
        <ul class="grid grid--4" style="list-style:none;margin:0;padding:0">
${each(site.services, (s, i) => {
  const x = t(s, lang);
  return `          <li style="margin:0" data-reveal data-reveal-delay="${i * 80}">
            <a class="card card--link" href="${esc(pageUrl('service', lang, s.slug[lang]))}"
               style="display:block;text-decoration:none;color:inherit;height:100%">
              <span class="card__icon">${icon(s.icon)}</span>
              <h3 class="card__title">${esc(x.title)}</h3>
              <p class="card__text">${esc(x.summary)}</p>
            </a>
          </li>
`;
})}        </ul>
        <p style="margin-top:var(--sp-5)" data-reveal>
          <a class="btn btn--ghost" href="${esc(pageUrl('services', lang))}">${esc(ui.allServices)} ${icon('arrow-right')}</a>
        </p>
      </div>
    </section>

    <section class="section section--subtle" id="portfolio">
      <div class="container-wide">
        <div class="section__head" data-reveal>
          <span class="section__eyebrow">${esc(ui.nav.portfolio)}</span>
          <h2>${esc(ui.sections.portfolio)}</h2>
          <p class="section__lead">${esc(lang === 'id'
            ? 'Sebagian proyek yang pernah saya kerjakan.'
            : 'A selection of projects I have delivered.')}</p>
        </div>
        <ul class="project-grid" style="list-style:none;margin:0;padding:0">
${each(featured, p2 => projectCard(p2, lang, ui, { reveal: true }))}
        </ul>
        <p style="margin-top:var(--sp-6)">
          <a class="btn btn--ghost" href="${esc(pageUrl('projects', lang))}">${esc(lang === 'id' ? 'Lihat semua proyek' : 'View all projects')} ${icon('arrow-right')}</a>
        </p>
      </div>
    </section>

${contactSection(site, lang, ui)}`;
};
