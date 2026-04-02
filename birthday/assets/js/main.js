/**
 * BIRTHDAY PAGE — JAVASCRIPT
 * birthday/index.html
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── TERMINAL STEPS ────────────────────────────────────── */
  const terminalSteps = [
    'loading_memories... [OK]',
    'checking_milestones...',
    'FOUND: Engagement Date (25-12-2025) - Status: COMPLETED',
    'FOUND: Wedding Date (07-06-2026) - Status: PREPARING...',
    'initializing_birthday_wish_v2.0... [DONE]',
    'system_ready. redirecting to future...'
  ];

  const terminalTextEl = document.getElementById('terminal-text');
  const appEl = document.getElementById('app');
  const terminalScreenEl = document.getElementById('terminal-screen');


  function typeLineAt(index) {
    if (index >= terminalSteps.length) {
      setTimeout(transitionToModernUI, 800);
      return;
    }

    const line = terminalSteps[index];
    let cursor = document.createElement('span');
    cursor.className = 'typed-cursor';
    terminalTextEl.appendChild(cursor);

    let position = 0;
    const speed = 45;

    function addChar() {
      if (position >= line.length) {
        cursor.remove();
        const newLine = document.createElement('div');
        newLine.textContent = line;
        terminalTextEl.appendChild(newLine);
        terminalTextEl.scrollTop = terminalTextEl.scrollHeight;
        setTimeout(() => typeLineAt(index + 1), 180);
        return;
      }

      cursor.textContent = line.slice(0, position + 1);
      position += 1;
      terminalTextEl.scrollTop = terminalTextEl.scrollHeight;
      setTimeout(addChar, speed);
    }

    addChar();
  }

  function transitionToModernUI() {
    terminalScreenEl.classList.add('fade-out-terminal');
    setTimeout(() => {
      terminalScreenEl.style.display = 'none';
      appEl.classList.add('show');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      startCountdown();
      initPetals();
    }, 1100);
  }

  function startCountdown() {
    const weddingTarget = new Date('2026-06-07T00:00:00');

    function update() {
      const now = new Date();
      const diff = weddingTarget - now;

      if (diff <= 0) {
        setText('cd-days', '00');
        setText('cd-hours', '00');
        setText('cd-minutes', '00');
        setText('cd-seconds', '00');
        clearInterval(timerInterval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setText('cd-days', pad(days));
      setText('cd-hours', pad(hours));
      setText('cd-minutes', pad(minutes));
      setText('cd-seconds', pad(seconds));
    }

    update();
    const timerInterval = setInterval(update, 1000);
  }

  function initPetals() {
    const wrap = document.getElementById('petals-wrap');
    const PETALS = ['🌸', '✦', '🌿', '✿', '❀', '🍃'];
    if (wrap) {
      for (let i = 0; i < 18; i++) {
        const p = document.createElement('span');
        p.className = 'petal';
        p.textContent = PETALS[i % PETALS.length];
        p.style.left = `${Math.random() * 100}%`;
        p.style.animationDuration = `${6 + Math.random() * 10}s`;
        p.style.animationDelay = `${Math.random() * 12}s`;
        p.style.fontSize = `${10 + Math.random() * 10}px`;
        wrap.appendChild(p);
      }
    }
  }

  /* ── HERO ───────────────────────────────────────────────── */
  const heroBg = document.getElementById('hero-bg');
  if (heroBg) {
    heroBg.style.backgroundImage = "url('assets/images/iamge (2).png')";
    setTimeout(() => heroBg.classList.add('loaded'), 100);
  }

  setText('hero-groom-nick', 'Kukoh');
  setText('hero-bride-nick', 'Zian');
  setText('hero-hashtag', '#qkohzqa');
  setText('cd-date-str', 'Ahad, 7 Juni 2026');

  function init() {
    terminalTextEl.innerHTML = '';
    typeLineAt(0);
  }

  init();
});

/* ── HELPERS ─────────────────────────────────────────────── */
function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function pad(n) {
  return String(n).padStart(2, '0');
}
