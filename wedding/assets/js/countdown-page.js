/**
 * COUNTDOWN PAGE — JAVASCRIPT
 * wedding/index.html
 */

document.addEventListener('DOMContentLoaded', () => {

  const g = weddingData.groom;
  const b = weddingData.bride;
  const w = weddingData.wedding;

  /* ── HERO ───────────────────────────────────────────────── */
  const heroBg = document.getElementById('hero-bg');
  if (heroBg) {
    heroBg.style.backgroundImage = "url('assets/images/iamge (1).jpg')";
    setTimeout(() => heroBg.classList.add('loaded'), 100);
  }

  setText('hero-groom-nick', g.nickname);
  setText('hero-bride-nick', b.nickname);
  setText('hero-hashtag',    w.hashtag);

  /* ── COUNTDOWN DATE STRING ──────────────────────────────── */
  setText('cd-date-str', `${w.dateFormatted} — ${w.hijriyah}`);


  /* ── COUPLE ─────────────────────────────────────────────── */
  setText('cp-groom-name',    g.fullName);
  setText('cp-groom-nick',    `" ${g.nickname} "`);
  setText('cp-groom-parents', `Putra dari ${g.parents.father} & ${g.parents.mother}`);
  setText('cp-bride-name',    b.fullName);
  setText('cp-bride-nick',    `" ${b.nickname} "`);
  setText('cp-bride-parents', `Putri dari ${b.parents.father} & ${b.parents.mother}`);


  /* ── CTA HASHTAG ────────────────────────────────────────── */
  setText('cta-hashtag', w.hashtag);

  /* ── COUNTDOWN TIMER ────────────────────────────────────── */
  const weddingDate = new Date(w.date);

  function tick() {
    const diff = weddingDate - new Date();
    if (diff <= 0) {
      setText('cd-days', '00'); setText('cd-hours',   '00');
      setText('cd-minutes', '00'); setText('cd-seconds', '00');
      return;
    }
    setText('cd-days',    pad(Math.floor(diff / 86_400_000)));
    setText('cd-hours',   pad(Math.floor((diff % 86_400_000) / 3_600_000)));
    setText('cd-minutes', pad(Math.floor((diff % 3_600_000)  / 60_000)));
    setText('cd-seconds', pad(Math.floor((diff % 60_000)     / 1_000)));
  }

  tick();
  const timer = setInterval(tick, 1000);
  window.addEventListener('pagehide', () => clearInterval(timer));

  /* ── FLOATING PETALS ────────────────────────────────────── */
  const wrap = document.getElementById('petals-wrap');
  const PETALS = ['🌸', '✦', '🌿', '✿', '❀', '🍃'];
  if (wrap) {
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('span');
      p.className = 'petal';
      p.textContent = PETALS[i % PETALS.length];
      p.style.left             = `${Math.random() * 100}%`;
      p.style.animationDuration = `${6 + Math.random() * 10}s`;
      p.style.animationDelay   = `${Math.random() * 12}s`;
      p.style.fontSize         = `${10 + Math.random() * 10}px`;
      wrap.appendChild(p);
    }
  }

  /* ── WA BUTTON ──────────────────────────────────────────── */
  const floatWa = document.getElementById('float-wa');
  if (floatWa) {
    const msg = [
      `Assalamu'alaikum Wr. Wb. 🌿`,
      ``,
      `Selamat atas pernikahan kakanda *${g.fullName}* & *${b.fullName}* 💍🎊`,
      ``,
      `Semoga Allah SWT senantiasa memberkahi pernikahan ini dan menjadikan`,
      `keluarga yang sakinah, mawaddah, warahmah. 🤲`,
      ``,
      `Barakallahu lakuma wa baraka 'alaykuma wa jama'a baynakuma fi khayr.`,
      ``,
      `*${g.nickname} & ${b.nickname}*`,
      `${w.hashtag}`,
    ].join('\n');
    floatWa.href = `https://wa.me/6285232077932?text=${encodeURIComponent(msg)}`;
  }

});

/* ── HELPERS ─────────────────────────────────────────────── */
function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function setAttr(id, attr, val) {
  const el = document.getElementById(id);
  if (el) el.setAttribute(attr, val);
}

function pad(n) {
  return String(n).padStart(2, '0');
}
