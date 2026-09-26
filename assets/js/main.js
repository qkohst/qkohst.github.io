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

  const DEFAULT = 'dark';   // default situs; pilihan tersimpan tetap menang
  const current = () => document.documentElement.dataset.theme || DEFAULT;

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

/* --- Pengalih bahasa membawa posisi baca ---------------------------------
   Tanpa ini, berpindah bahasa dari tengah halaman selalu mendarat di puncak
   halaman versi lain. Anchor section yang sedang dibaca ikut dibawa sehingga
   pengunjung tetap berada di bagian yang sama. */
function initLangSwitch() {
  const tautan = $$('.lang-switch a');
  if (!tautan.length) return;

  tautan.forEach(a => a.addEventListener('click', () => {
    const aktifSekarang = $('.nav__link.is-active[href*="#"]');
    const hash = location.hash || (aktifSekarang ? '#' + aktifSekarang.getAttribute('href').split('#')[1] : '');
    if (!hash) return;
    const dasar = a.getAttribute('href').split('#')[0];
    a.setAttribute('href', dasar + hash);
  }));
}

/* --- Penanda menu aktif (pengganti scrollspy jQuery) ---------------------
   Nav memancarkan href absolut ("/#about"), bukan "#about", supaya tautannya
   tetap benar dari halaman mana pun. Selektor lama hanya mencari href yang
   DIAWALI "#" sehingga tidak pernah cocok dan indikator tidak pernah berpindah.
   Di sini hash diambil dari href apa pun, lalu hanya dipakai bila section-nya
   memang ada di halaman ini. */
function initScrollSpy() {
  const kandidat = $$('.nav__link').filter(a => (a.getAttribute('href') || '').includes('#'));
  if (!kandidat.length) return;

  const peta = new Map();      // elemen section -> tautan nav
  for (const a of kandidat) {
    const id = (a.getAttribute('href') || '').split('#')[1];
    if (!id) continue;
    const el = document.getElementById(decodeURIComponent(id));
    if (el) peta.set(el, a);
  }
  if (!peta.size) return;

  // Tautan "Beranda" aktif saat pengunjung masih di puncak halaman. Ditandai
  // lewat atribut oleh generator, bukan ditebak dari href — prefiks bahasa
  // dapat berubah (mis. beranda Indonesia pindah dari "/" ke "/id/") dan
  // tebakan berbasis href akan diam-diam berhenti bekerja.
  const beranda = $('.nav__link[data-nav-home]');

  // Scrollspy hanya boleh hidup di beranda, dan itu HARUS ditanyakan ke
  // penanda halaman — bukan disimpulkan dari "ada section yang cocok".
  // Halaman layanan dan detail layanan juga memuat <section id="contact">,
  // sehingga satu tautan nav ikut cocok dan penjaga di atas lolos. Akibatnya
  // scrollspy menyorot Beranda (saat di puncak) atau Kontak (saat digulir)
  // di samping sorotan statis "Layanan" milik generator — dua tombol menyala
  // sekaligus, karena scrollspy hanya melepas sorotan tautan yang ia kelola.
  if (!beranda || beranda.getAttribute('aria-current') !== 'page') return;

  const semua = [...peta.values(), beranda].filter(Boolean);

  // Di halaman ini scrollspy yang memegang kendali sorotan. aria-current="page"
  // yang dipasang generator pada tautan Beranda harus dilepas, kalau tidak
  // garisnya tetap menyala bersamaan dengan section yang sedang dibaca.
  semua.forEach(a => a.removeAttribute('aria-current'));

  const tandai = aktif => semua.forEach(a => {
    const on = a === aktif;
    a.classList.toggle('is-active', on);
    if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
  });

  const DI_PUNCAK = 140;   // px; di bawah ini dianggap masih di area hero
  let terlihat = new Set();

  const putuskan = () => {
    // Pemeriksaan posisi gulir didahulukan. Memakai sentinel terpisah membuat
    // dua observer berlomba dan yang belakangan menang, sehingga di puncak
    // halaman sorotan bisa meleset ke section pertama.
    if (beranda && window.scrollY < DI_PUNCAK) { tandai(beranda); return; }

    // Section terakhir sering tidak pernah masuk pita deteksi karena halaman
    // sudah mentok sebelum ia sampai ke sana. Saat gulir menyentuh dasar,
    // sorot section terakhir secara eksplisit.
    const dasar = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
    if (dasar) {
      const urut = [...peta.keys()].sort((a, b) => a.offsetTop - b.offsetTop);
      tandai(peta.get(urut[urut.length - 1]));
      return;
    }

    if (!terlihat.size) return;
    const teratas = [...terlihat].sort((a, b) =>
      a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0];
    tandai(peta.get(teratas));
  };

  const io = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (e.isIntersecting) terlihat.add(e.target); else terlihat.delete(e.target);
    }
    putuskan();
  }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });

  peta.forEach((_, el) => io.observe(el));

  let menunggu = false;
  addEventListener('scroll', () => {
    if (menunggu) return;
    menunggu = true;
    requestAnimationFrame(() => { menunggu = false; putuskan(); });
  }, { passive: true });

  putuskan();
}

/* --- Penyaring portofolio (pengganti Isotope) ---------------------------- */
function initFilter() {
  const bar = $('[data-filter-bar]');
  const items = $$('[data-category]');
  if (!bar || !items.length) return;

  const counter = $('[data-filter-count]');
  const tombol = $$('[data-filter]', bar);

  const terapkan = (mau, gulir) => {
    const btn = tombol.find(b => b.dataset.filter === mau);
    if (!btn) return false;
    tombol.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));

    let tampil = 0;
    for (const item of items) {
      const cocok = mau === 'all' || item.dataset.category === mau;
      item.hidden = !cocok;
      if (cocok) tampil++;
    }
    if (counter) counter.textContent = counter.dataset.template.replace('{n}', tampil);
    if (gulir) keAwalDaftar();
    return true;
  };

  // Setelah menyaring, bawa pandangan ke awal daftar. Tanpa ini pengunjung
  // yang menyaring dari tengah halaman mendarat di tengah daftar baru yang
  // lebih pendek — kadang di bawah ujungnya, sehingga tampak kosong.
  const keAwalDaftar = () => {
    const daftar = $('.project-grid');
    if (!daftar) return;

    // Posisi bar saat MENEMPEL dihitung dari nilai sticky `top` + tingginya,
    // bukan dibaca dari getBoundingClientRect().bottom saat ini. Menyembunyikan
    // kartu memendekkan halaman, browser lalu menjepit posisi gulir ke batas
    // baru, dan pada posisi jepitan itu bar kerap belum menempel sehingga
    // bottom-nya jauh lebih besar. Karena scrollY saling meniadakan di rumus
    // di bawah, sasaran jadi hanya bergantung angka tersebut — akibatnya tiap
    // klik mendarat di tempat berbeda dan layar merayap sedikit demi sedikit.
    const atasMenempel = parseFloat(getComputedStyle(bar).top) || 0;
    const bawahBarMenempel = atasMenempel + bar.offsetHeight;

    const sasaran = window.scrollY + daftar.getBoundingClientRect().top - bawahBarMenempel - 12;
    window.scrollTo({ top: Math.max(0, sasaran), behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  bar.addEventListener('click', e => {
    const btn = e.target.closest('[data-filter]');
    if (!btn) return;
    terapkan(btn.dataset.filter, true);
  });

  // Tautan "lihat semua di kategori ini" dari halaman detail proyek datang
  // sebagai /projects/#<kategori>. Tanpa penanganan ini, tandanya diabaikan
  // dan halaman terbuka pada "Semua".
  const dariTanda = () => {
    const kunci = decodeURIComponent((location.hash || '').slice(1));
    if (kunci) terapkan(kunci, false);
  };
  dariTanda();
  addEventListener('hashchange', dariTanda);
}

/* --- Bar filter: tandai saat menempel di bawah header -------------------- */
function initFilterStuck() {
  const bar = $('[data-filter-bar]');
  if (!bar) return;
  const penanda = document.createElement('div');
  penanda.setAttribute('aria-hidden', 'true');
  penanda.style.cssText = 'height:1px;width:100%';
  bar.parentNode.insertBefore(penanda, bar);

  const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 4;
  const px = header * parseFloat(getComputedStyle(document.documentElement).fontSize);
  new IntersectionObserver(([e]) => {
    bar.classList.toggle('is-stuck', !e.isIntersecting);
  }, { rootMargin: `-${Math.round(px)}px 0px 0px 0px` }).observe(penanda);
}

/* --- Galeri proyek (pengganti Owl Carousel) ------------------------------
   Gulirannya murni CSS scroll-snap; JS hanya untuk tombol, indikator titik,
   dan putar otomatis. Auto-slide berhenti begitu pengunjung menyentuhnya, dan
   tidak pernah menyala bila pengguna meminta gerak minimal. */
function initGallery() {
  const gallery = $('[data-gallery]');
  if (!gallery) return;

  const track = $('[data-gallery-track]', gallery);
  const slides = $$('.gallery__slide', track);
  const label = $('[data-gallery-count]', gallery);
  const dots = $('[data-gallery-dots]', gallery);

  if (slides.length < 2) {
    $$('[data-gallery-prev], [data-gallery-next]', gallery).forEach(b => b.hidden = true);
    if (dots) dots.hidden = true;
    return;
  }

  const indexSaatIni = () =>
    Math.min(slides.length - 1, Math.round(track.scrollLeft / (track.scrollWidth / slides.length)));

  // indikator titik
  let tombolDot = [];
  if (dots) {
    dots.innerHTML = '';
    tombolDot = slides.map((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'gallery__dot';
      b.setAttribute('aria-label', (dots.dataset.template || 'Gambar {n}').replace('{n}', i + 1));
      b.addEventListener('click', () => { hentikanOtomatis(); ke(i); });
      dots.appendChild(b);
      return b;
    });
  }

  const perbarui = () => {
    const i = indexSaatIni();
    if (label) label.textContent = (label.dataset.template || '{n}/{total}')
      .replace('{n}', i + 1).replace('{total}', slides.length);
    tombolDot.forEach((b, n) => {
      b.classList.toggle('is-active', n === i);
      b.setAttribute('aria-current', n === i ? 'true' : 'false');
    });
  };

  const ke = i => {
    const n = Math.max(0, Math.min(slides.length - 1, i));
    slides[n].scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest', inline: 'center'
    });
  };
  const geser = langkah => ke(indexSaatIni() + langkah);

  $('[data-gallery-prev]', gallery)?.addEventListener('click', () => { hentikanOtomatis(); geser(-1); });
  $('[data-gallery-next]', gallery)?.addEventListener('click', () => { hentikanOtomatis(); geser(1); });

  let tick;
  track.addEventListener('scroll', () => { clearTimeout(tick); tick = setTimeout(perbarui, 90); }, { passive: true });

  // --- putar otomatis
  const JEDA = 5000;
  let timer = null;
  const jalan = () => {
    if (reduceMotion || timer) return;
    timer = setInterval(() => {
      if (document.hidden) return;
      ke(indexSaatIni() >= slides.length - 1 ? 0 : indexSaatIni() + 1);
    }, JEDA);
  };
  const jeda = () => { clearInterval(timer); timer = null; };
  // berhenti permanen setelah pengunjung mengambil alih kendali
  let diambilAlih = false;
  const hentikanOtomatis = () => { diambilAlih = true; jeda(); };

  gallery.addEventListener('pointerenter', jeda);
  gallery.addEventListener('pointerleave', () => { if (!diambilAlih) jalan(); });
  gallery.addEventListener('focusin', hentikanOtomatis);
  track.addEventListener('pointerdown', hentikanOtomatis);
  document.addEventListener('visibilitychange', () => { if (document.hidden) jeda(); else if (!diambilAlih) jalan(); });

  // hanya berputar selama galeri terlihat di layar
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !diambilAlih) jalan(); else jeda();
  }, { threshold: 0.35 }).observe(gallery);

  perbarui();
}

/* --- Lightbox (pengganti VenoBox) ---------------------------------------- */
function initLightbox() {
  const dialog = $('[data-lightbox]');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  const track = $('[data-lightbox-track]', dialog);
  const caption = $('[data-lightbox-caption]', dialog);
  const hitung = $('[data-lightbox-count]', dialog);
  const tPrev = $('[data-lightbox-prev]', dialog);
  const tNext = $('[data-lightbox-next]', dialog);
  if (!track) return;

  // Dua bentuk pemicu:
  //   <img data-zoom>            -> gambar galeri, sumbernya dirinya sendiri
  //   <button data-zoom-src=...> -> tombol "lihat sertifikat", sumbernya atribut
  const pemicu = $$('[data-zoom], [data-zoom-src]');
  if (!pemicu.length) return;

  // Pemicu yang berada dalam satu galeri membentuk satu rangkaian yang bisa
  // digeser maju-mundur di dalam dialog. Pemicu lepas (mis. sertifikat)
  // menjadi rangkaian berisi satu gambar sehingga tombolnya disembunyikan.
  const rangkaianDari = el => {
    const galeri = el.closest('[data-gallery]');
    return galeri ? $$('[data-zoom]', galeri) : [el];
  };

  let rangkaian = [];
  let opener = null;

  const sumber = el => el.dataset.zoomSrc || el.currentSrc || el.src;
  const teks = el => el.dataset.zoomAlt || el.alt || '';

  const slides = () => $$('.lightbox__slide', track);

  const indexSaatIni = () => {
    const n = slides().length;
    if (!n) return 0;
    return Math.min(n - 1, Math.round(track.scrollLeft / (track.scrollWidth / n)));
  };

  const perbarui = () => {
    const i = indexSaatIni();
    const el = rangkaian[i];
    if (caption) caption.textContent = el ? teks(el) : '';
    const banyak = rangkaian.length > 1;
    if (hitung) {
      hitung.hidden = !banyak;
      hitung.textContent = (hitung.dataset.template || '{n}/{total}')
        .replace('{n}', i + 1).replace('{total}', rangkaian.length);
    }
    if (tPrev) tPrev.hidden = !banyak;
    if (tNext) tNext.hidden = !banyak;
  };

  // Panggilan yang SAMA PERSIS dengan galeri di halaman detail proyek, supaya
  // gerak dan easing-nya identik tanpa perlu menyelaraskan dua animasi.
  const ke = (i, halus = true) => {
    const s = slides();
    if (!s.length) return;
    const n = (i + s.length) % s.length;        // melingkar
    s[n].scrollIntoView({
      behavior: (halus && !reduceMotion) ? 'smooth' : 'auto',
      block: 'nearest', inline: 'center'
    });
  };
  const geser = langkah => ke(indexSaatIni() + langkah);

  const bangun = () => {
    track.innerHTML = '';
    for (const el of rangkaian) {
      const slide = document.createElement('div');
      slide.className = 'lightbox__slide';

      // <picture> pemicu disalin utuh berikut <source> AVIF-nya, bukan disalin
      // alamatnya. Menyalin currentSrc tampak lebih sederhana, tetapi gambar
      // galeri yang belum selesai dimuat (loading="lazy", di luar layar)
      // currentSrc-nya masih kosong — nilainya lalu jatuh ke src, yaitu JPEG
      // cadangan. Terukur: satu slide terunduh ulang sebagai JPEG 10KB padahal
      // AVIF-nya 4KB. Dengan menyalin <picture>, browser sendiri yang memilih
      // dan berkas yang sama persis dipakai ulang dari cache.
      const gambar = el.closest('picture');
      if (gambar) {
        const salinan = gambar.cloneNode(true);
        const im = salinan.querySelector('img');
        if (im) { im.removeAttribute('loading'); im.decoding = 'async'; im.alt = teks(el); }
        slide.appendChild(salinan);
      } else {
        const im = document.createElement('img');
        im.src = sumber(el);
        im.alt = teks(el);
        im.decoding = 'async';
        slide.appendChild(im);
      }
      track.appendChild(slide);
    }
  };

  for (const el of pemicu) {
    el.addEventListener('click', () => {
      if (!sumber(el)) return;
      opener = el;
      rangkaian = rangkaianDari(el);
      bangun();
      dialog.showModal();
      // Lompat tanpa animasi ke gambar yang diklik. Harus SETELAH showModal(),
      // karena sebelum dialog tampil track belum punya lebar dan gulirnya
      // tidak akan bergerak.
      ke(Math.max(0, rangkaian.indexOf(el)), false);
      perbarui();
    });
  }

  tPrev?.addEventListener('click', () => geser(-1));
  tNext?.addEventListener('click', () => geser(1));

  // panah kiri/kanan untuk berpindah gambar
  dialog.addEventListener('keydown', e => {
    if (rangkaian.length < 2) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); geser(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); geser(1); }
  });

  // Geser sentuh tidak lagi ditangani sendiri: scroll-snap sudah memberi
  // gulir sentuh native, lengkap dengan momentum dan tarikan balik.
  let tick;
  track.addEventListener('scroll', () => {
    clearTimeout(tick);
    tick = setTimeout(perbarui, 90);
  }, { passive: true });

  $('[data-lightbox-close]', dialog)?.addEventListener('click', () => dialog.close());
  // klik di area gelap menutup, klik pada isi dialog tidak
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { track.innerHTML = ''; opener?.focus(); });
}


/* --- Tombol kembali ke atas ---------------------------------------------
   Ditempatkan di atas peluncur Crisp agar keduanya tidak bertumpuk. */
function initBackToTop() {
  const btn = $('[data-back-to-top]');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  const penanda = document.createElement('div');
  penanda.setAttribute('aria-hidden', 'true');
  penanda.style.cssText = 'position:absolute;top:70vh;height:1px;width:1px';
  document.body.prepend(penanda);

  new IntersectionObserver(([e]) => {
    btn.classList.toggle('is-visible', !e.isIntersecting);
    btn.tabIndex = e.isIntersecting ? -1 : 0;
  }, { rootMargin: '0px' }).observe(penanda);
}

/* --- Tombol salin tautan pada kartu bagikan ------------------------------ */
/* Pemberitahuan singkat yang muncul sendiri lalu hilang.

   Dipakai sebagai ganti window.alert(): alert memblokir seluruh halaman sampai
   ditutup dan tampil sebagai dialog sistem yang lepas dari tema situs.

   role="status" dengan aria-live="polite" membuat pembaca layar ikut
   mengumumkannya. Tanpa itu, perubahan yang hanya terlihat mata tidak pernah
   sampai ke pengguna yang tidak melihat layar — padahal justru merekalah yang
   paling butuh kepastian bahwa penyalinan berhasil. */
let toastTimer = null;
function toast(pesan) {
  if (!pesan) return;
  let el = $('[data-toast]');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('data-toast', '');
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    document.body.appendChild(el);
  }
  el.textContent = pesan;
  // Reflow dipaksa supaya animasi terputar ulang saat tombol ditekan berturut-
  // turut; tanpa ini kelasnya sudah terpasang dan animasinya diam.
  el.classList.remove('is-on');
  void el.offsetWidth;
  el.classList.add('is-on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-on'), 2600);
}

function initCopyLink() {
  for (const btn of $$('[data-copy-link]')) {
    btn.addEventListener('click', async () => {
      const url = btn.dataset.copyLink;
      let ok = false;
      try {
        await navigator.clipboard.writeText(url);
        ok = true;
      } catch {
        // Clipboard API ditolak (mis. konteks tidak aman) — pakai cara lama.
        const ta = document.createElement('textarea');
        ta.value = url;
        ta.setAttribute('readonly', '');
        ta.style.cssText = 'position:fixed;top:-100px;opacity:0';
        document.body.appendChild(ta);
        ta.select();
        try { ok = document.execCommand('copy'); } catch {}
        ta.remove();
      }
      if (!ok) return;
      toast(btn.dataset.labelToast || btn.dataset.labelDone);
      const semula = btn.getAttribute('aria-label');
      btn.classList.add('is-done');
      btn.setAttribute('aria-label', btn.dataset.labelDone || semula);
      btn.title = btn.dataset.labelDone || semula;
      setTimeout(() => {
        btn.classList.remove('is-done');
        btn.setAttribute('aria-label', semula);
        btn.title = semula;
      }, 2000);
    });
  }
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
    // Warna widget diselaraskan dengan aksen situs. Crisp hanya menerima nama
    // warna dari daftar bakunya, bukan nilai hex.
    const tema = document.documentElement.dataset.crispTheme;
    if (tema) {
      const pasangWarna = () => window.$crisp.push(['config', 'color:theme', [tema]]);
      pasangWarna();                    // lewat antrean, sebelum SDK termuat
      // Antrean pra-muat tidak selalu memproses 'config', jadi pasang sekali lagi
      // begitu SDK benar-benar siap. Aman dipanggil dua kali.
      let sisa = 40;
      const tunggu = setInterval(() => {
        if (window.$crisp && typeof window.$crisp.is === 'function') {
          clearInterval(tunggu);
          pasangWarna();
        } else if (--sisa <= 0) clearInterval(tunggu);
      }, 250);
    }
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


/* --- Tombol cetak pada halaman CV ---------------------------------------- */
function initPrint() {
  $$('[data-print]').forEach(btn => btn.addEventListener('click', () => window.print()));

  /* Nama berkas PDF hasil "Simpan sebagai PDF" diambil peramban dari
     document.title. Judul halaman ini dirancang untuk hasil pencarian —
     "Proposal Penawaran: St SmartPoint — Kukoh Santoso" — dan menjadi nama
     berkas yang panjang serta memuat tanda baca yang canggung di folder unduhan.
     Judul ditukar sesaat selama pencetakan lalu dikembalikan, sehingga SEO dan
     nama berkas bisa sama-sama benar tanpa saling mengalahkan.

     Dipasang lewat beforeprint/afterprint, bukan di dalam penangan klik, supaya
     ikut berlaku ketika pengguna menekan Ctrl+P sendiri. */
  const bernama = $('[data-pdf-name]');
  if (!bernama) return;
  const namaPdf = bernama.getAttribute('data-pdf-name');
  if (!namaPdf) return;

  let judulAsli = '';
  addEventListener('beforeprint', () => { judulAsli = document.title; document.title = namaPdf; });
  addEventListener('afterprint', () => { if (judulAsli) document.title = judulAsli; });
}

/* --- Tahun berjalan di footer -------------------------------------------- */
function initYear() {
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
}

/* --- Jalankan ------------------------------------------------------------ */
/* Dokumen A4 — halaman penawaran dan CV — tampil SAMA di ponsel, tablet, dan
   desktop: tata letaknya tidak pernah dilipat, hanya diperkecil utuh.

   Memakai `zoom`, bukan `transform: scale()`. Keduanya sama-sama memperkecil,
   tetapi transform tidak mengubah ruang yang ditempati elemen di aliran
   dokumen — halaman akan menyisakan area kosong setinggi ukuran aslinya di
   bawah dokumen yang sudah mengecil. zoom ikut mengecilkan ruang itu.

   Faktor skalanya tidak bisa ditulis di CSS: ia bergantung pada lebar layar
   sebagai bilangan, sedangkan media query hanya bisa memilih nilai tetap. */
function initSkalaDokumen() {
  const dokumen = $$('[data-doc-scale]');
  if (!dokumen.length) return;

  const LEBAR_A4 = 210 / 25.4 * 96;   // 210mm dalam piksel CSS
  const TEPI = 24;                    // sisa napas kiri-kanan di layar sempit

  const terapkan = () => {
    const ruang = document.documentElement.clientWidth - TEPI * 2;
    const k = Math.min(1, ruang / LEBAR_A4);
    for (const d of dokumen) {
      // Pada layar yang memang cukup lebar, properti dilepas sama sekali agar
      // tidak ada pembulatan yang menggeser tata letak satu piksel pun.
      d.style.zoom = k >= 1 ? '' : String(Math.round(k * 1000) / 1000);
    }
  };

  terapkan();
  let menunggu = false;
  addEventListener('resize', () => {
    if (menunggu) return;
    menunggu = true;
    requestAnimationFrame(() => { menunggu = false; terapkan(); });
  }, { passive: true });
}

for (const init of [initTheme, initNav, initHeader, initReveal, initScrollSpy, initLangSwitch, initFilter, initFilterStuck, initGallery, initLightbox, initPrint, initSkalaDokumen, initBackToTop, initCopyLink, initChat, initYear]) {
  try { init(); } catch (err) { console.error(`[main.js] ${init.name} gagal:`, err); }
}
