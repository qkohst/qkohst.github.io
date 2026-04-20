/**
 * WEDDING DASHBOARD — JAVASCRIPT
 * Renders guest lists from weddingData and handles WA sharing
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── BASE URL FOR INVITATION LINKS ─────────────────────── */
  const base = (() => {
    const { origin, pathname } = window.location;
    const dir = pathname.substring(0, pathname.lastIndexOf('/') + 1);
    return origin + dir;
  })();

  /* ── GUEST DATA ─────────────────────────────────────────── */
  const groomGuests = weddingData.guestsMan.filter(g => g.key !== 'default').sort((a, b) => a.name.localeCompare(b.name));
  const brideGuests = weddingData.guestsWoman.filter(g => g.key !== 'default').sort((a, b) => a.name.localeCompare(b.name));

  /* ── POPULATE STATS ─────────────────────────────────────── */
  const totalAll = groomGuests.length + brideGuests.length;
  setTextById('stat-total',   String(totalAll));
  setTextById('stat-groom',   String(groomGuests.length));
  setTextById('stat-bride',   String(brideGuests.length));

  /* ── STICKY ELEMENTS DETECTION ─────────────────────────── */
  function initStickyDetection() {
    const stickyTabs = document.querySelector('.sticky-tabs');
    const stickySearchFilter = document.querySelectorAll('.sticky-search-filter');
    
    if (!stickyTabs) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            entry.target.classList.add('stuck');
          } else {
            entry.target.classList.remove('stuck');
          }
        });
      },
      { threshold: 0, rootMargin: '-1px 0px 0px 0px' }
    );

    observer.observe(stickyTabs);
    
    stickySearchFilter.forEach(element => {
      observer.observe(element);
    });
  }

  /* ── WA MESSAGE BUILDER ─────────────────────────────────── */
  function buildWaUrl(guest, inviteFile) {
    const inviteLink = `${base}${inviteFile}#to=${encodeURIComponent(guest.key)}`;
    const g = weddingData.groom;
    const b = weddingData.bride;
    const w = weddingData.wedding;

    const msg = [
      `Assalamu'alaikum Wr. Wb.`,
      ``,
      `Kepada Yth.`,
      `*${guest.name}*`,
      ``,
      `Dengan penuh rasa syukur, kami mengundang Anda untuk hadir dan memberikan doa restu pada acara pernikahan kami:`,
      ``,
      `💍 *${g.fullName}*`,
      `    & *${b.fullName}*`,
      ``,
      `📅 *${w.dateFormatted}*`,
      `    ${w.hijriyah}`,
      ``,
      `Silakan buka undangan digital Anda di tautan berikut:`,
      `👉 ${inviteLink}`,
      ``,
      `Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila *${guest.name}* berkenan hadir.`,
      ``,
      `Wassalamu'alaikum Wr. Wb.`,
      ``,
      `*${g.nickname} & ${b.nickname}*`,
      `${w.hashtag}`,
    ].join('\n');

    // Cek apakah nomor telepon ada dan tidak kosong
    const phone = (guest.phoneNumber && guest.phoneNumber !== '') ? guest.phoneNumber : '';
    
    // Hilangkan karakter non-digit (seperti +, -, atau spasi) agar formatnya benar
    const cleanPhone = phone.replace(/\D/g, '');

    // Jika cleanPhone ada, masukkan ke dalam URL, jika tidak gunakan format share umum
    return cleanPhone
      ? `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(msg)}`
      : `https://wa.me/?text=${encodeURIComponent(msg)}`;
  }

  /* ── RENDER TABLE ───────────────────────────────────────── */
  function renderTable(guests, tbodyId, inviteFile) {
    const tbody = document.getElementById(tbodyId);
    if (!tbody) return;

    if (guests.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="4">
            <div class="empty-state">
              <div class="empty-state-icon">👥</div>
              <p class="empty-state-text">Belum ada tamu terdaftar</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = guests.map((guest, idx) => `
      <tr>
        <td class="td-no">${idx + 1}</td>
        <td class="td-name"> 
          <p class="td-name-text">${escHtml(guest.name)}</p>
          <p class="td-address">${escHtml(guest.address)}\n${escHtml(guest.phoneNumber ? `(${guest.phoneNumber})` : '')}</p>
        </td>
        <td class="td-method">
          <span class="td-method-${guest.undangan === 'online' ? 'online' : 'offline'}">
            ${escHtml(guest.undangan === 'online' ? 'Online' : 'Offline')}
          </span>
          ${guest.kindOfFriend ? `<span class="td-friend">${escHtml(guest.kindOfFriend)}</span>` : ''}
        </td>
        <td class="td-action">
          <a href="${buildWaUrl(guest, inviteFile)}"
             target="_blank"
             rel="noopener noreferrer"
             class="btn-wa"
             aria-label="Bagikan undangan ke ${escHtml(guest.name)} via WhatsApp">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Share
          </a>
        </td>
      </tr>
    `).join('');
  }

  /* ── SEARCH / FILTER ────────────────────────────────────── */
  const filterState = {
    groom: { undangan: {}, kindOfFriend: {} },
    bride: { undangan: {}, kindOfFriend: {} }
  };

  function getUniqueKindOfFriend(guests) {
    const set = new Set();
    guests.forEach(g => {
      if (g.kindOfFriend && g.kindOfFriend.trim() !== '') set.add(g.kindOfFriend);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }

  function renderKindOfFriendCheckboxes(tab, guests) {
    const container = document.getElementById(`filter-friend-group-${tab}`);
    if (!container) return;

    const kinds = getUniqueKindOfFriend(guests);
    if (kinds.length === 0) {
      container.innerHTML = `<p class="filter-empty">Tidak ada data</p>`;
      return;
    }

    container.innerHTML = kinds.map(kind => `
      <label class="filter-option">
        <input type="checkbox" value="${escHtml(kind)}" class="filter-checkbox" data-tab="${tab}" data-filter="kindOfFriend" />
        <span>${escHtml(kind)}</span>
      </label>
    `).join('');
  }

  function countActiveFilters(tab) {
    const state = filterState[tab];
    if (!state) return 0;
    const undanganCount = Object.values(state.undangan).filter(Boolean).length;
    const kindCount = Object.values(state.kindOfFriend).filter(Boolean).length;
    return undanganCount + kindCount;
  }

  function applyFilters(inputId, tbodyId, guests, inviteFile, tab) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const q = input.value.trim().toLowerCase();
    const state = filterState[tab] || { undangan: {}, kindOfFriend: {} };
    const undanganActive = Object.values(state.undangan).some(Boolean);
    const kindActive = Object.values(state.kindOfFriend).some(Boolean);

    const filtered = guests.filter(g => {
      const matchesSearch = !q || g.name.toLowerCase().includes(q) || g.address.toLowerCase().includes(q);
      const matchesMethod = !undanganActive || state.undangan[g.undangan];
      const matchesKind = !kindActive || state.kindOfFriend[g.kindOfFriend];
      return matchesSearch && matchesMethod && matchesKind;
    });
    renderTable(filtered, tbodyId, inviteFile);
  }

  function bindSearch(inputId, tbodyId, guests, inviteFile, tab) {
    const input = document.getElementById(inputId);
    if (!input) return;

    input.addEventListener('input', () => {
      applyFilters(inputId, tbodyId, guests, inviteFile, tab);
    });
  }

  function syncCheckboxesFromState(tab) {
    const state = filterState[tab];
    const checkboxes = document.querySelectorAll(`.filter-checkbox[data-tab="${tab}"]`);
    checkboxes.forEach(cb => {
      const filterKey = cb.dataset.filter;
      const bucket = state[filterKey] || {};
      cb.checked = !!bucket[cb.value];
    });
  }

  function updateBadge(tab) {
    const filterBadge = document.getElementById(`filter-badge-${tab}`);
    if (!filterBadge) return;
    filterBadge.style.display = countActiveFilters(tab) > 0 ? 'flex' : 'none';
  }

  function bindFilterButtons(tab) {
    const filterBtn = document.getElementById(`filter-btn-${tab}`);
    const filterDropdown = document.getElementById(`filter-dropdown-${tab}`);
    const applyBtn = filterDropdown && filterDropdown.querySelector('.filter-action-apply');
    const resetBtn = filterDropdown && filterDropdown.querySelector('.filter-action-reset');
    const searchId = `search-${tab}`;
    const tbodyId = `${tab}-tbody`;
    const guests = tab === 'groom' ? groomGuests : brideGuests;
    const inviteFile = tab === 'groom' ? 'invitation' : 'invitation-2';

    if (!filterBtn || !filterDropdown) return;

    // Toggle dropdown — saat dibuka, sinkronkan checkbox dengan state yang sudah diterapkan
    filterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const willShow = filterDropdown.style.display === 'none';
      filterDropdown.style.display = willShow ? 'block' : 'none';
      if (willShow) syncCheckboxesFromState(tab);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!filterBtn.contains(e.target) && !filterDropdown.contains(e.target)) {
        filterDropdown.style.display = 'none';
        // Saat ditutup tanpa Apply, kembalikan checkbox ke state terakhir
        syncCheckboxesFromState(tab);
      }
    });

    // Apply — baca semua checkbox, simpan ke state, jalankan filter
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        const checkboxes = filterDropdown.querySelectorAll('.filter-checkbox');
        const next = { undangan: {}, kindOfFriend: {} };
        checkboxes.forEach(cb => {
          const filterKey = cb.dataset.filter;
          if (!next[filterKey]) next[filterKey] = {};
          next[filterKey][cb.value] = cb.checked;
        });
        filterState[tab] = next;
        updateBadge(tab);
        applyFilters(searchId, tbodyId, guests, inviteFile, tab);
        filterDropdown.style.display = 'none';
      });
    }

    // Reset — kosongkan semua checkbox & state, jalankan filter
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        filterDropdown.querySelectorAll('.filter-checkbox').forEach(cb => { cb.checked = false; });
        filterState[tab] = { undangan: {}, kindOfFriend: {} };
        updateBadge(tab);
        applyFilters(searchId, tbodyId, guests, inviteFile, tab);
      });
    }
  }

  /* ── TABS ───────────────────────────────────────────────── */
  const tabBtns  = document.querySelectorAll('.tab-btn[data-tab]');
  const tabWraps = document.querySelectorAll('.table-wrap[data-tab]');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b  => b.classList.toggle('active',  b.dataset.tab === target));
      tabWraps.forEach(w => w.classList.toggle('active', w.dataset.tab === target));
      
      // Reset scroll position when switching tabs
      setTimeout(() => {
        const activeTable = document.querySelector('.table-wrap.active');
        if (activeTable) {
          const tableWrapper = activeTable.querySelector('.table-wrapper');
          if (tableWrapper) {
            tableWrapper.scrollTop = 0;
          }
        }
      }, 100);
    });
  });

  /* ── FLOATING PETALS ─────────────────────────────────────── */
  const petalsWrap = document.getElementById('petals-wrap');
  const PETALS = ['🌸', '✦', '🌿', '✿', '❀', '🍃'];
  if (petalsWrap) {
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('span');
      p.className = 'petal';
      p.textContent = PETALS[i % PETALS.length];
      p.style.left              = `${Math.random() * 100}%`;
      p.style.animationDuration = `${6 + Math.random() * 10}s`;
      p.style.animationDelay    = `${Math.random() * 12}s`;
      p.style.fontSize          = `${10 + Math.random() * 10}px`;
      petalsWrap.appendChild(p);
    }
  }

  /* ── INITIAL RENDER ─────────────────────────────────────── */
  renderTable(groomGuests, 'groom-tbody', 'invitation');
  renderTable(brideGuests, 'bride-tbody', 'invitation-2');

  bindSearch('search-groom', 'groom-tbody', groomGuests, 'invitation', 'groom');
  bindSearch('search-bride', 'bride-tbody', brideGuests, 'invitation-2', 'bride');

  renderKindOfFriendCheckboxes('groom', groomGuests);
  renderKindOfFriendCheckboxes('bride', brideGuests);

  bindFilterButtons('groom');
  bindFilterButtons('bride');
  
  /* ── INIT STICKY DETECTION ───────────────────────────────── */
  initStickyDetection();

});

/* ── HELPERS ─────────────────────────────────────────────── */
function setTextById(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}