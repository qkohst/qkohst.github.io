/**
 * WEDDING INVITATION — MAIN SCRIPT
 * Shared by index.html (groom) and index2.html (bride)
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── THEME DETECTION ───────────────────────────────────── */
  const isGroom   = document.body.classList.contains('theme-groom');
  const guestList = isGroom ? weddingData.guestsMan : weddingData.guestsWoman;

  /* ── GUEST PERSONALISATION ─────────────────────────────── */
  const params  = new URLSearchParams(window.location.search);
  const toKey   = (params.get('to') || 'default').toLowerCase().trim();
  const guest   = guestList.find(g => g.key.toLowerCase() === toKey)
               || guestList.find(g => g.key === 'default')
               || { name: 'Bapak/Ibu/Saudara/i', address: 'Di Tempat' };

  /* ── POPULATE: COVER ───────────────────────────────────── */
  setText('#cover-guest-name', guest.name);

  /* ── POPULATE: COUPLE & WEDDING ────────────────────────── */
  const g = weddingData.groom;
  const b = weddingData.bride;
  const w = weddingData.wedding;

  setText('#groom-name',        g.fullName);
  setText('#groom-nickname',    `" ${g.nickname} "`);
  setText('#groom-parents',     `Putra dari ${g.parents.father}\n& ${g.parents.mother}`);
  setText('#bride-name',        b.fullName);
  setText('#bride-nickname',    `" ${b.nickname} "`);
  setText('#bride-parents',     `Putri dari ${b.parents.father}\n& ${b.parents.mother}`);
  setText('#wedding-quote',     w.quote);
  setText('#wedding-quote-src', w.quoteSource);

  const coverNames = document.getElementById('cover-names');
  if (coverNames) {
    coverNames.innerHTML = `${g.nickname} <span class="ampersand">&amp;</span> ${b.nickname}`;
  }

  setText('#hashtag',         w.hashtag);
  setText('#hashtag-closing', w.hashtag);
  setText('#closing-names',   `${g.nickname} & ${b.nickname}`);

  /* ── POPULATE: WEDDING DATE TEXT ────────────────────────── */
  setText('#wedding-date-text', `${w.dateFormatted}\n${w.hijriyah}`);

  /* ── POPULATE: EVENTS ──────────────────────────────────── */
  const ak = weddingData.events.akad;
  const re = weddingData.events.resepsi;

  setText('#akad-date',    ak.date);
  setText('#akad-time',    ak.time);
  setText('#akad-venue',   ak.venue);
  setText('#akad-address', ak.address);

  setText('#resepsi-date',    re.date);
  setText('#resepsi-time',    re.time);
  setText('#resepsi-venue',   re.venue);
  setText('#resepsi-address', re.address);

  setAttr('#akad-maps-embed',    'src',  ak.mapsEmbed);
  setAttr('#akad-maps-link',     'href', ak.mapsLink);
  setAttr('#resepsi-maps-embed', 'src',  re.mapsEmbed);
  setAttr('#resepsi-maps-link',  'href', re.mapsLink);

  /* ── POPULATE: BANK TRANSFER ────────────────────────────── */
  const bankList = document.getElementById('bank-list');
  if (bankList) {
    weddingData.bankTransfer.forEach(bank => {
      const card = document.createElement('div');
      card.className = 'bank-card fade-up';
      card.innerHTML = `
        <div class="bank-name">${escHtml(bank.bank)}</div>
        <div class="bank-number">${escHtml(bank.accountNumber)}</div>
        <div class="bank-holder">a.n. ${escHtml(bank.accountName)}</div>
        <button class="btn-copy" onclick="copyNumber('${escHtml(bank.accountNumber)}', this)">
          📋 Salin Nomor
        </button>
      `;
      bankList.appendChild(card);
    });
  }

  /* ── COUNTDOWN TIMER ────────────────────────────────────── */
  const weddingDate = new Date(w.date);

  function updateCountdown() {
    const now  = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      ['cd-days', 'cd-hours', 'cd-minutes', 'cd-seconds'].forEach(id => setText('#' + id, '00'));
      return;
    }

    const days    = Math.floor(diff / 86_400_000);
    const hours   = Math.floor((diff % 86_400_000) / 3_600_000);
    const minutes = Math.floor((diff % 3_600_000)  / 60_000);
    const seconds = Math.floor((diff % 60_000)      / 1_000);

    setText('#cd-days',    pad(days));
    setText('#cd-hours',   pad(hours));
    setText('#cd-minutes', pad(minutes));
    setText('#cd-seconds', pad(seconds));
  }

  updateCountdown();
  const countdownTimer = setInterval(updateCountdown, 1000);

  /* cleanup when navigating away */
  window.addEventListener('pagehide', () => clearInterval(countdownTimer));

  /* ── BOTTOM NAVIGATION ──────────────────────────────────── */
  const navSections = ['cover', 'pasangan', 'galeri', 'acara', 'hadiah'];
  const navItems    = document.querySelectorAll('.nav-item[data-section]');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.dataset.section;
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* Update active nav on scroll */
  const sectionEls = navSections.map(id => document.getElementById(id)).filter(Boolean);

  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(n => n.classList.toggle('active', n.dataset.section === id));
      }
    });
  }, { threshold: 0.45 });

  sectionEls.forEach(el => navObserver.observe(el));

  /* ── SCROLL FADE-UP ANIMATIONS ──────────────────────────── */
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        fadeObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

  /* ── HERO IMAGE KEN BURNS ───────────────────────────────── */
  const hero = document.querySelector('.cover-hero');
  if (hero) {
    setTimeout(() => hero.classList.add('loaded'), 100);
  }

  /* ── LOADING SCREEN ─────────────────────────────────────── */
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => loadingScreen.remove(), 750);
    }, 2000);
  }

  /* ── GALLERY ─────────────────────────────────────────────── */
  // Gallery items animate in via existing .fade-up IntersectionObserver

  /* ── BACKGROUND MUSIC ─────────────────────────────── */
  const audio       = document.getElementById('bg-music');
  const musicToggle = document.getElementById('music-toggle');
  let musicPlaying  = false;

  /* Set audio src from weddingData.musicUrl */
  if (audio && weddingData.wedding.musicUrl) {
    audio.src = weddingData.wedding.musicUrl;
  }

  function setMusicState(playing) {
    musicPlaying = playing;
    if (!musicToggle) return;
    const icon = musicToggle.querySelector('i');
    if (playing) {
      icon.className = 'bi bi-pause-fill';
      musicToggle.setAttribute('aria-label', 'Pause musik');
      musicToggle.classList.add('is-playing');
    } else {
      icon.className = 'bi bi-music-note-beamed';
      musicToggle.setAttribute('aria-label', 'Putar musik');
      musicToggle.classList.remove('is-playing');
    }
  }

  function tryPlay() {
    if (!audio) return;
    audio.volume = 0.35;
    audio.play().then(() => setMusicState(true)).catch(() => {
      /* Autoplay blocked — wait for first gesture */
    });
  }

  /* Try autoplay after loading screen (browser may allow it) */
  setTimeout(tryPlay, 2200);

  /* Fallback: play on first user gesture */
  const playOnGesture = () => {
    if (!musicPlaying) tryPlay();
    document.removeEventListener('click',      playOnGesture);
    document.removeEventListener('touchstart', playOnGesture);
    document.removeEventListener('keydown',    playOnGesture);
  };
  document.addEventListener('click',      playOnGesture);
  document.addEventListener('touchstart', playOnGesture, { passive: true });
  document.addEventListener('keydown',    playOnGesture);

  /* Manual toggle */
  musicToggle?.addEventListener('click', e => {
    e.stopPropagation();
    if (!audio) return;
    if (musicPlaying) {
      audio.pause();
      setMusicState(false);
    } else {
      audio.play().then(() => setMusicState(true)).catch(() => {});
    }
  });

  /* ── WHATSAPP FLOATING BUTTON ───────────────────────────── */
  const floatWa = document.getElementById('float-wa');
  if (floatWa) {
    const waMsg = [
      "Assalamu'alaikum Wr. Wb. 🌿",
      "",
      `Selamat atas pernikahan kakanda *${weddingData.groom.fullName}* & *${weddingData.bride.fullName}* 💍🎊`,
      "",
      "Semoga Allah SWT senantiasa memberkahi pernikahan ini dan menjadikan keluarga yang sakinah, mawaddah, warahmah. 🤲",
      "",
      "Barakallahu lakuma wa baraka 'alaykuma wa jama'a baynakuma fi khayr.",
      "",
      `*${weddingData.wedding.hashtag}*`
    ].join('\n');
    floatWa.href = `https://wa.me/6285232077932?text=${encodeURIComponent(waMsg)}`;
  }

});

/* ── HELPERS ─────────────────────────────────────────────── */

function setText(selector, value) {
  const el = document.querySelector(selector);
  if (el) el.textContent = value;
}

function setAttr(selector, attr, value) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

function pad(n) {
  return String(n).padStart(2, '0');
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ── COPY BANK NUMBER ────────────────────────────────────── */
function copyNumber(number, btn) {
  if (!navigator.clipboard) {
    /* Fallback for older browsers */
    const ta = document.createElement('textarea');
    ta.value = number;
    ta.style.position = 'fixed';
    ta.style.opacity  = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('Nomor rekening disalin!');
    return;
  }

  navigator.clipboard.writeText(number).then(() => {
    const orig = btn.innerHTML;
    btn.innerHTML = '✅ Tersalin!';
    showToast('Nomor rekening disalin!');
    setTimeout(() => { btn.innerHTML = orig; }, 2200);
  }).catch(() => {
    showToast('Gagal menyalin. Salin manual ya 🙏');
  });
}

/* ── TOAST ───────────────────────────────────────────────── */
function showToast(msg) {
  let toast = document.getElementById('toast-notif');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notif';
    toast.className = 'toast-notif';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}
