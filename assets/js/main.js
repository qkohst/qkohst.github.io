/* qkohst.github.io — perilaku situs.
   Vanilla, tanpa dependency. Menggantikan jQuery, Bootstrap JS, AOS, Typed.js,
   Isotope, Owl Carousel, VenoBox, Waypoints, dan CounterUp.
   Tiap modul keluar diam-diam bila elemennya tidak ada di halaman. */

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* --- Tema ---------------------------------------------------------------
   Penyetelan awal dilakukan skrip inline di <head> agar tidak berkedip.
   Di sini hanya tombol pengalihnya. */
function initTheme() {
  const btn = $('[data-theme-toggle]');
  if (!btn) return;

  const systemDark = matchMedia('(prefers-color-scheme: dark)');
  const current = () =>
    document.documentElement.dataset.theme || (systemDark.matches ? 'dark' : 'light');

  const sync = () => {
    const dark = current() === 'dark';
    btn.setAttribute('aria-pressed', String(dark));
    btn.setAttribute('aria-label', btn.dataset[dark ? 'labelLight' : 'labelDark'] || 'Toggle theme');
    $$('[data-theme-icon]', btn).forEach(i => {
      i.hidden = i.dataset.themeIcon !== (dark ? 'dark' : 'light');
    });
  };

  btn.addEventListener('click', () => {
    const next = current() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch {}
    sync();
  });

  // ikuti sistem selama pengguna belum memilih manual
  systemDark.addEventListener('change', () => {
    let stored = null;
    try { stored = localStorage.getItem('theme'); } catch {}
    if (!stored) { delete document.documentElement.dataset.theme; sync(); }
  });

  sync();
}

/* --- Navigasi mobile ----------------------------------------------------- */
function initNav() {
  const toggle = $('[data-nav-toggle]');
  const nav = $('#site-nav');
  if (!toggle || !nav) return;

  const setOpen = open => {
    nav.dataset.open = String(open);
    toggle.setAttribute('aria-expanded', String(open));
    $$('[data-nav-icon]', toggle).forEach(i => {
      i.hidden = i.dataset.navIcon !== (open ? 'close' : 'menu');
    });
  };

  toggle.addEventListener('click', () => setOpen(nav.dataset.open !== 'true'));

  // tutup setelah memilih menu, saat klik di luar, dan saat Escape
  nav.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('click', e => {
    if (nav.dataset.open === 'true' && !nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  matchMedia('(min-width: 56rem)').addEventListener('change', e => { if (e.matches) setOpen(false); });

  setOpen(false);
}

/* --- Reveal saat masuk layar (pengganti AOS) -----------------------------
   Elemen bersaudara yang tersingkap pada gulir yang sama diberi jeda
   berurutan, sehingga grid kartu masuk seperti gelombang, bukan serentak. */
function initReveal() {
  const items = $$('[data-reveal]');
  if (!items.length) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const STAGGER = 70;   // ms antar-saudara
  const MAX_STEPS = 6;  // batas agar grid panjang tidak menunggu lama
  let batch = [];
  let flush = null;

  const io = new IntersectionObserver((entries, obs) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      obs.unobserve(entry.target);
      batch.push(entry.target);
    }
    if (!batch.length || flush) return;

    // kumpulkan entri dalam satu frame, lalu beri jeda berurutan
    flush = requestAnimationFrame(() => {
      batch
        .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)
        .forEach((el, i) => {
          const own = Number(el.dataset.revealDelay || 0);
          el.style.setProperty('--reveal-delay', `${own + Math.min(i, MAX_STEPS) * STAGGER}ms`);
          el.classList.add('is-revealed');
        });
      batch = [];
      flush = null;
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  items.forEach(el => io.observe(el));
}

/* --- Garis header muncul setelah halaman digulir ------------------------- */
function initHeader() {
  const header = $('.header');
  if (!header) return;
  const sentinel = document.createElement('div');
  sentinel.setAttribute('aria-hidden', 'true');
  document.body.prepend(sentinel);
  new IntersectionObserver(([e]) => {
    header.classList.toggle('is-stuck', !e.isIntersecting);
  }, { rootMargin: '0px' }).observe(sentinel);
}

/* --- Penanda menu aktif (pengganti scrollspy jQuery) ---------------------
   Versi lama memanggil .offset()/.outerHeight() tiap section pada tiap event
   scroll sehingga memaksa layout tiap frame. IntersectionObserver tidak. */
function initScrollSpy() {
  const links = $$('.nav__link[href^="#"]');
  if (links.length < 2) return;

  const map = new Map();
  for (const link of links) {
    const el = document.getElementById(decodeURIComponent(link.hash.slice(1)));
    if (el) map.set(el, link);
  }
  if (!map.size) return;

  const io = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      links.forEach(l => l.classList.remove('is-active'));
      map.get(entry.target)?.classList.add('is-active');
    }
  }, { rootMargin: '-45% 0px -50% 0px' });

  map.forEach((_, el) => io.observe(el));
}

/* --- Penyaring portofolio (pengganti Isotope) ---------------------------- */
function initFilter() {
  const bar = $('[data-filter-bar]');
  const items = $$('[data-category]');
  if (!bar || !items.length) return;

  const counter = $('[data-filter-count]');

  bar.addEventListener('click', e => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;

    const want = btn.dataset.filter;
    $$('[data-filter]', bar).forEach(b => b.setAttribute('aria-pressed', String(b === btn)));

    let shown = 0;
    for (const item of items) {
      const match = want === 'all' || item.dataset.category === want;
      item.hidden = !match;
      if (match) shown++;
    }
    if (counter) counter.textContent = counter.dataset.template.replace('{n}', shown);
  });
}

/* --- Galeri proyek (pengganti Owl Carousel) ------------------------------
   Gulirannya murni CSS scroll-snap; JS hanya untuk tombol dan penghitung. */
function initGallery() {
  const gallery = $('[data-gallery]');
  if (!gallery) return;

  const track = $('[data-gallery-track]', gallery);
  const slides = $$('.gallery__slide', track);
  const label = $('[data-gallery-count]', gallery);
  if (slides.length < 2) {
    $$('[data-gallery-prev], [data-gallery-next]', gallery).forEach(b => b.hidden = true);
  }

  const indexOfCurrent = () =>
    Math.round(track.scrollLeft / (track.scrollWidth / slides.length));

  const update = () => {
    if (label) label.textContent = label.dataset.template
      .replace('{n}', Math.min(indexOfCurrent() + 1, slides.length))
      .replace('{total}', slides.length);
  };

  const go = step => {
    const next = Math.max(0, Math.min(slides.length - 1, indexOfCurrent() + step));
    slides[next].scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'nearest', inline: 'center'
    });
  };

  $('[data-gallery-prev]', gallery)?.addEventListener('click', () => go(-1));
  $('[data-gallery-next]', gallery)?.addEventListener('click', () => go(1));

  let tick;
  track.addEventListener('scroll', () => {
    clearTimeout(tick);
    tick = setTimeout(update, 90);
  }, { passive: true });

  update();
}

/* --- Lightbox (pengganti VenoBox) ---------------------------------------- */
function initLightbox() {
  const dialog = $('[data-lightbox]');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  const img = $('img', dialog);
  const caption = $('[data-lightbox-caption]', dialog);
  const zoomables = $$('[data-zoom]');
  if (!zoomables.length) return;

  let opener = null;

  for (const source of zoomables) {
    source.addEventListener('click', () => {
      opener = source;
      img.src = source.currentSrc || source.src;
      img.alt = source.alt || '';
      if (caption) caption.textContent = source.alt || '';
      dialog.showModal();
    });
  }

  $('[data-lightbox-close]', dialog)?.addEventListener('click', () => dialog.close());
  // klik di area gelap menutup
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  // kembalikan fokus ke gambar asal
  dialog.addEventListener('close', () => { img.removeAttribute('src'); opener?.focus(); });
}

/* --- Crisp: dimuat saat senggang agar tidak membebani muat awal ---------- */
function initChat() {
  const id = document.documentElement.dataset.crisp;
  if (!id) return;

  let done = false;
  const load = () => {
    if (done) return;
    done = true;
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = id;
    const s = document.createElement('script');
    s.src = 'https://client.crisp.chat/l.js';
    s.async = true;
    document.head.appendChild(s);
  };

  const events = ['pointerdown', 'keydown', 'touchstart'];
  const onFirstInteraction = () => {
    events.forEach(e => removeEventListener(e, onFirstInteraction));
    load();
  };
  events.forEach(e => addEventListener(e, onFirstInteraction, { once: true, passive: true }));

  if ('requestIdleCallback' in window) requestIdleCallback(load, { timeout: 6000 });
  else setTimeout(load, 4000);
}

/* --- Tahun berjalan di footer -------------------------------------------- */
function initYear() {
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
}

/* --- Jalankan ------------------------------------------------------------ */
for (const init of [initTheme, initNav, initHeader, initReveal, initScrollSpy, initFilter, initGallery, initLightbox, initChat, initYear]) {
  try { init(); } catch (err) { console.error(`[main.js] ${init.name} gagal:`, err); }
}
