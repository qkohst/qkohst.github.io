/* Kerangka dokumen: <head> SEO lengkap, header, footer.
   Semua halaman melewati fungsi ini agar blok SEO tidak pernah lupa dipasang. */
const { esc, each, icon, t, pageUrl, absUrl } = require('../tools/lib');

/** Skrip anti-kedip. Harus inline dan sebelum CSS: membaca pilihan tersimpan
    lalu menyetel data-theme sebelum paint pertama. Tanpa ini, halaman
    berkedip terang saat pengguna memakai mode gelap. */
const THEME_BOOT = `try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`;

function head(ctx) {
  const { site, lang, title, description, canonical, alternates, ogImage, ogType, jsonld, noindex } = ctx;
  const locale = lang === 'id' ? 'id_ID' : 'en_US';

  return `
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  ${noindex ? '<meta name="robots" content="noindex, follow">' : ''}
  <link rel="canonical" href="${esc(canonical)}">
${each(alternates, a => `  <link rel="alternate" hreflang="${esc(a.lang)}" href="${esc(a.url)}">\n`)}
  <meta property="og:type" content="${esc(ogType || 'website')}">
  <meta property="og:site_name" content="${esc(site.profile.name)}">
  <meta property="og:locale" content="${locale}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${esc(canonical)}">
  <meta property="og:image" content="${esc(ogImage)}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${esc(ogImage)}">
  <meta name="theme-color" content="${esc(site.site.themeColor.light)}" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="${esc(site.site.themeColor.dark)}" media="(prefers-color-scheme: dark)">
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="icon" href="/assets/img/favicon-32.png" type="image/png" sizes="32x32">
  <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png" sizes="180x180">
  <script>${THEME_BOOT}</script>
${ctx.fontHref ? `  <link rel="preload" href="${esc(ctx.fontHref)}" as="font" type="font/woff2" crossorigin>\n` : ''}  <link rel="stylesheet" href="/assets/css/main.css">${ctx.extraCss ? `
  <link rel="stylesheet" href="${esc(ctx.extraCss)}">` : ''}
${each(jsonld, b => `  <script type="application/ld+json">${JSON.stringify(b)}</script>\n`)}`;
}

function header(ctx) {
  const { site, lang, ui, nav, altUrl } = ctx;
  const home = pageUrl('home', lang);

  return `
  <header class="header">
    <div class="container-wide header__inner">
      <a class="brand" href="${home}">
        <span class="brand__logo">
          <img class="brand__mark" src="/assets/img/logo.png" alt="" aria-hidden="true" width="180" height="180" loading="eager" decoding="async">
        </span>
        <span>${esc(site.profile.name)}</span>
      </a>

      <nav class="nav" id="site-nav" aria-label="${esc(ui.nav.home)}">
${each(nav, n => `        <a class="nav__link${n.current ? ' is-active' : ''}" href="${esc(n.href)}"${n.current ? ' aria-current="page"' : ''}>${esc(n.label)}</a>\n`)}
      </nav>

      <div class="header__tools">
        <div class="lang-switch">
          <a href="${esc(pageUrl('home', 'id'))}"${lang === 'id' ? ' aria-current="true"' : ''} hreflang="id" lang="id">ID</a>
          <a href="${esc(altUrl.en || pageUrl('home', 'en'))}"${lang === 'en' ? ' aria-current="true"' : ''} hreflang="en" lang="en">EN</a>
        </div>

        <button class="icon-btn" type="button" data-theme-toggle
                aria-pressed="false"
                data-label-dark="${esc(lang === 'id' ? 'Aktifkan mode gelap' : 'Switch to dark mode')}"
                data-label-light="${esc(lang === 'id' ? 'Aktifkan mode terang' : 'Switch to light mode')}">
          <span data-theme-icon="light">${icon('moon')}</span>
          <span data-theme-icon="dark" hidden>${icon('sun')}</span>
        </button>

        <button class="icon-btn nav-toggle" type="button" data-nav-toggle
                aria-expanded="false" aria-controls="site-nav"
                aria-label="${esc(lang === 'id' ? 'Buka menu' : 'Open menu')}">
          <span data-nav-icon="menu">${icon('menu')}</span>
          <span data-nav-icon="close" hidden>${icon('close')}</span>
        </button>
      </div>
    </div>
  </header>`;
}

function footer(ctx) {
  const { site, lang, ui } = ctx;
  const socials = site.socials.filter(s => s.showOn.includes('site'));

  return `
  <footer class="footer">
    <div class="container-wide footer__inner">
      <p class="footer__text">
        © <span data-year>${new Date().getFullYear()}</span> ${esc(site.profile.name)} ·
        ${esc(lang === 'id' ? 'Dibangun sendiri tanpa framework' : 'Hand-built, no framework')}
      </p>
      <ul class="socials" style="list-style:none;margin:0;padding:0">
${each(socials, s => `        <li style="margin:0"><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.key)}">${icon(s.icon)}</a></li>\n`)}
      </ul>
    </div>
  </footer>`;
}

/** Bungkus isi halaman menjadi dokumen HTML utuh. */
function document_(ctx, body) {
  return `<!DOCTYPE html>
<html lang="${esc(ctx.lang)}"${ctx.site.site.crispWebsiteId ? ` data-crisp="${esc(ctx.site.site.crispWebsiteId)}"` : ''}${ctx.site.site.crispTheme ? ` data-crisp-theme="${esc(ctx.site.site.crispTheme)}"` : ''}>
<head>${head(ctx)}
</head>
<body>
  <a class="skip-link" href="#main">${esc(ctx.lang === 'id' ? 'Lompat ke konten' : 'Skip to content')}</a>
${header(ctx)}
  <main id="main">
${body}
  </main>
${footer(ctx)}
  <script type="module" src="/assets/js/main.js"></script>
</body>
</html>
`;
}

module.exports = { document: document_, head, header, footer };
