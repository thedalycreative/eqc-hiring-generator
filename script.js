(() => {
  'use strict';

  const TIMER_START = 15 * 60;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const EMOJIS = [
    '😀',
    '😺',
    '🐲',
    '🐸',
    '⏰',
    '🦄',
    '🚀',
    '🧪',
    '🛸',
    '🍿',
    '⚡',
    '🌈',
    '🧠',
    '🧋',
    '❄️',
    '🌋',
  ];

  const MODE_POOL = [
    {
      key: 'claw',
      label: 'Claw Machine',
      icon: '🕹️',
      subtitle: 'Metal fingers. Emotional damage. One winner.',
    },
    {
      key: 'ball',
      label: 'Magic 8 Ball',
      icon: '🎱',
      subtitle: 'Shake the future until it answers.',
    },
    {
      key: 'slot',
      label: 'Slot Machine',
      icon: '🎰',
      subtitle: 'Three reels. One destiny.',
    },
    {
      key: 'wheel',
      label: 'Wheel of Fortune',
      icon: '🎡',
      subtitle: 'Weighted chaos with a smile.',
    },
    {
      key: 'dart',
      label: 'Dartboard',
      icon: '🎯',
      subtitle: 'One throw. Maximum confidence.',
    },
    {
      key: 'ufo',
      label: 'UFO Abduction',
      icon: '🛸',
      subtitle: 'The beam has chosen.',
    },
    {
      key: 'gift',
      label: 'Mystery Gift',
      icon: '🎁',
      subtitle: 'Open the box and hope for magic.',
    },
    {
      key: 'science',
      label: 'Mad Scientist',
      icon: '🧪',
      subtitle: 'Lightning, smoke, and a brave hypothesis.',
    },
    {
      key: 'pirate',
      label: 'Pirate Treasure Map',
      icon: '🏴‍☠️',
      subtitle: 'X marks the hire.',
    },
    {
      key: 'popcorn',
      label: 'Cinema Popcorn',
      icon: '🍿',
      subtitle: 'Pop, jump, and reveal.',
    },
  ];

  const COMPANY_POOL = [
    {
      name: 'Drüber',
      logo: '🚀',
      headline: 'A Dragon Uber',
      copy: 'Faster than a Toyota. Hotter than a human. Cheaper than diesel.',
      accent: ['#7bf1ff', '#ffb86b'],
    },
    {
      name: 'Cats Against Gravity',
      logo: '🐈',
      headline: 'Anti-Gravity Logistics',
      copy: 'Every parcel lands on its feet.',
      accent: ['#8dff9e', '#7bf1ff'],
    },
    {
      name: 'Bureau of Competitive Napping',
      logo: '😴',
      headline: 'Sleep Optimization Division',
      copy: 'They ship the calmest interfaces in town.',
      accent: ['#ffb86b', '#ff5f87'],
    },
    {
      name: 'Binary Boba',
      logo: '🧋',
      headline: 'Stirring Syntax Since Breakfast',
      copy: 'Pearls, pixels, and perfect loops.',
      accent: ['#c2ff9a', '#7bf1ff'],
    },
    {
      name: 'Quantum Pigeons',
      logo: '🕊️',
      headline: 'Instant Messaging by Bird',
      copy: 'Guaranteed delivery. Eventually.',
      accent: ['#f5f7ff', '#ffb86b'],
    },
    {
      name: 'Moon Cheese Media',
      logo: '🌙',
      headline: 'Lunar Creative Studio',
      copy: 'Soft launches are for cowards.',
      accent: ['#b2fff7', '#ff5f87'],
    },
    {
      name: 'Volcano Mail',
      logo: '🌋',
      headline: 'Hot Logistics With Urgency',
      copy: 'Your package has feelings.',
      accent: ['#ff5f87', '#ffb86b'],
    },
    {
      name: 'Neon Orchard',
      logo: '🌈',
      headline: 'Glow Fruit Supply Chain',
      copy: 'Fruit with a user interface.',
      accent: ['#7bf1ff', '#8dff9e'],
    },
    {
      name: 'Pirate Pixels',
      logo: '🏴‍☠️',
      headline: 'Treasure-Grade Web Design',
      copy: 'X marks the breakpoint.',
      accent: ['#ff8c6b', '#ffd66b'],
    },
    {
      name: 'Glacier Coffee',
      logo: '❄️',
      headline: 'Icy Caffeine for Overachievers',
      copy: 'Cold brew. Hot deadlines.',
      accent: ['#7bf1ff', '#f5f7ff'],
    },
  ];

  const ANNOUNCEMENTS = [
    { seconds: 13 * 60, message: '13 minutes remaining. Coffee has gone cold.' },
    { seconds: 8 * 60, message: '8 minutes remaining. Management is becoming nervous.' },
    { seconds: 5 * 60, message: '5 minutes remaining. Your dragon is asking where the website is.' },
    { seconds: 2 * 60, message: '2 minutes remaining. Someone just pushed directly to production.' },
    { seconds: 30, message: '30 seconds. Pretend confidence.' },
    { seconds: 0, message: 'TIME! Deploy what you\'ve got!' },
  ];

  const beginBtn = document.getElementById('ceremony-start');
  const exportBtn = document.getElementById('ceremony-export');
  const resetBtn = document.getElementById('ceremony-reset');
  const employeeGrid = document.getElementById('employee-grid');
  const pickerStage = document.getElementById('picker-stage');
  const windowStack = document.getElementById('window-stack');
  const trailerFrame = document.querySelector('.trailer__frame');
  const trailerTag = document.querySelector('.trailer__tag');
  const trailerTitle = document.querySelector('.trailer__title');
  const trailerCopy = document.querySelector('.trailer__copy');
  const heroEyebrow = document.querySelector('.hero__eyebrow');
  const heroLede = document.querySelector('.hero__lede');
  const modeValues = [...document.querySelectorAll('.status-chip__value')];
  const pickerPills = [...document.querySelectorAll('.picker-pill')];
  const toastHost = document.querySelector('.toast-host');
  const fxLayer = document.querySelector('.fx-layer');
  const alarmOverlay = document.querySelector('.alarm-overlay');
  const alarmTitle = alarmOverlay.querySelector('h2');
  const alarmCountdown = alarmOverlay.querySelector('.alarm-overlay__countdown');
  const alarmHint = alarmOverlay.querySelector('.alarm-overlay__hint');
  const alarmAction = alarmOverlay.querySelector('.alarm-overlay__action');
  const alarmResetBtn = document.getElementById('alarm-overlay-reset');
  const studentAddForm = document.getElementById('student-add-form');
  const studentNameInput = document.getElementById('student-name-input');
  const addStudentBtn = document.getElementById('add-student-btn');
  const addSampleBtn = document.getElementById('add-sample-btn');
  const pickerBaseMarkup = pickerStage.innerHTML;

  const SAMPLE_STUDENTS = [
    { name: 'Leslie', role: 'Ready to be hired by chaos.', emoji: '😀' },
    { name: 'Victoria', role: 'Camera shake compatible.', emoji: '🐲' },
    { name: 'Ananda', role: 'Looks excellent in tiny windows.', emoji: '🐸' },
    { name: 'Eza', role: 'Monitors the countdown and the vibes.', emoji: '⏰' },
    { name: 'Sophie', role: 'Survives every picker mode.', emoji: '🦄' },
  ];

  const audioState = {
    context: null,
    bossLoop: null,
    bossBeat: 0,
  };

  const state = {
    started: false,
    finished: false,
    roundActive: false,
    timerSeconds: TIMER_START,
    timerId: null,
    startedAt: null,
    finishedAt: null,
    currentRound: null,
    currentRoundTimeouts: [],
    previewTimeout: null,
    remainingStudents: [],
    allStudents: [],
    assignments: [],
    modeDeck: shuffle(MODE_POOL),
    companyDeck: shuffle(COMPANY_POOL),
    announced: new Set(),
  };

  function shuffle(items) {
    const result = items.slice();
    for (let index = result.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
    }
    return result;
  }

  function randomItem(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function slugify(value) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'item';
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatTimer(totalSeconds) {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  function formatDateStamp(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function formatDateTimeStamp(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  function buildEmojiCycle(initialEmoji) {
    return [...new Set([initialEmoji, ...EMOJIS])];
  }

  function getStatusNode(index) {
    return modeValues[index] || null;
  }

  function setPrimaryButtonLabel() {
    if (state.finished) {
      beginBtn.textContent = 'EXPORT TODAY\'S CEREMONY';
      return;
    }

    if (!state.started) {
      beginBtn.textContent = 'BEGIN THE BOOTSTRAP HIRING CEREMONY';
      return;
    }

    beginBtn.textContent = state.roundActive ? 'SKIP ANIMATION' : 'HIRE NEXT DEVELOPER';
  }

  function syncHeroCopy() {
    if (state.finished) {
      heroEyebrow.textContent = 'Ceremony complete';
      heroLede.textContent = 'The hires are locked in. Export the ceremony record and hand out the briefs.';
      return;
    }

    if (state.started) {
      heroEyebrow.textContent = 'Live hiring event';
      heroLede.textContent = 'Each round randomizes the picker, removes the winner, and leaves behind a floating history window.';
      return;
    }

    heroEyebrow.textContent = 'Classified classroom event';
    heroLede.textContent = 'Students arrive as employee cards, get theatrically hired by nonsense companies, and begin with a shared sense of ownership before the timer even starts.';
  }

  function syncHud(modeLabel = 'Roll Call') {
    const modeNode = getStatusNode(0);
    const remainingNode = getStatusNode(1);
    const timerNode = getStatusNode(2);

    if (modeNode) {
      modeNode.textContent = modeLabel;
    }

    if (remainingNode) {
      remainingNode.textContent = String(state.remainingStudents.length);
    }

    if (timerNode) {
      timerNode.textContent = formatTimer(state.timerSeconds);
    }

    document.title = state.finished
      ? 'Bootstrap Hiring Ceremony · Finale'
      : state.started
        ? `Bootstrap Hiring Ceremony · ${modeLabel}`
        : 'Bootstrap Hiring Ceremony';
  }

  function syncPickerSelection(modeKey) {
    pickerPills.forEach((pill, index) => {
      const activeKey = pill.dataset.mode || MODE_POOL[index]?.key;
      pill.classList.toggle('is-selected', activeKey === modeKey);
    });
  }

  function clearPreview() {
    if (state.previewTimeout) {
      clearTimeout(state.previewTimeout);
      state.previewTimeout = null;
    }

    if (!state.roundActive && !state.finished) {
      renderPoolView();
    }
  }

  function clearRoundTimeouts() {
    state.currentRoundTimeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    state.currentRoundTimeouts = [];
  }

  function scheduleRound(callback, delay) {
    const timeoutId = window.setTimeout(() => {
      state.currentRoundTimeouts = state.currentRoundTimeouts.filter((item) => item !== timeoutId);
      callback();
    }, delay);
    state.currentRoundTimeouts.push(timeoutId);
    return timeoutId;
  }

  function ensureAudioContext() {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) {
      return null;
    }

    if (!audioState.context) {
      audioState.context = new AudioCtor();
    }

    if (audioState.context.state === 'suspended') {
      audioState.context.resume().catch(() => {});
    }

    return audioState.context;
  }

  function playTone(frequency, duration = 0.12, type = 'sine', gainValue = 0.05, delay = 0) {
    const context = ensureAudioContext();
    if (!context) {
      return;
    }

    const oscillator = context.createOscillator();
    const gainNode = context.createGain();

    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gainNode.gain.value = 0.0001;

    oscillator.connect(gainNode);
    gainNode.connect(context.destination);

    const now = context.currentTime + delay;
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(Math.max(gainValue, 0.001), now + 0.015);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    oscillator.start(now);
    oscillator.stop(now + duration + 0.05);
  }

  function playChime(notes, options = {}) {
    const {
      type = 'triangle',
      gain = 0.05,
      step = 0.08,
    } = options;

    notes.forEach((frequency, index) => {
      playTone(frequency, 0.16, type, gain, index * step);
    });
  }

  function startBossMusic() {
    if (audioState.bossLoop) {
      return;
    }

    body.classList.add('is-boss');
    showToast('Boss music on.', 'warning');

    const bassline = [196, 220, 174, 247];
    audioState.bossBeat = 0;
    audioState.bossLoop = window.setInterval(() => {
      const note = bassline[audioState.bossBeat % bassline.length];
      playTone(note, 0.12, 'square', 0.045);
      if (audioState.bossBeat % 2 === 0) {
        playTone(note * 2, 0.08, 'triangle', 0.025);
      }
      audioState.bossBeat += 1;
    }, 240);
  }

  function stopBossMusic(silent = false) {
    if (audioState.bossLoop) {
      clearInterval(audioState.bossLoop);
      audioState.bossLoop = null;
    }

    body.classList.remove('is-boss');

    if (!silent) {
      showToast('Boss music off.', 'info');
    }
  }

  function toggleBossMusic() {
    ensureAudioContext();
    if (audioState.bossLoop) {
      stopBossMusic();
      return;
    }

    startBossMusic();
  }

  function spawnParticlesAt(target, options = {}) {
    const {
      count = prefersReducedMotion ? 10 : 24,
      glyphs = ['✨', '✦', '★'],
      colors = ['#7bf1ff', '#ffb86b', '#ff5f87', '#8dff9e'],
      radius = 120,
      durationMin = 700,
      durationMax = 1200,
      sizeMin = 12,
      sizeMax = 20,
    } = options;

    const rect = target && target.getBoundingClientRect
      ? target.getBoundingClientRect()
      : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };

    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    const particleCount = prefersReducedMotion ? Math.min(count, 8) : count;

    for (let index = 0; index < particleCount; index += 1) {
      const particle = document.createElement('span');
      const angle = Math.random() * Math.PI * 2;
      const distance = radius * (0.45 + Math.random() * 0.8);
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance - randomRange(24, 120);
      const size = randomRange(sizeMin, sizeMax);
      const duration = randomRange(durationMin, durationMax);
      const spin = randomRange(-360, 360);

      particle.className = 'fx-particle';
      particle.textContent = randomItem(glyphs);
      particle.style.setProperty('--x', `${originX}px`);
      particle.style.setProperty('--y', `${originY}px`);
      particle.style.setProperty('--dx', `${dx}px`);
      particle.style.setProperty('--dy', `${dy}px`);
      particle.style.setProperty('--dur', `${duration}ms`);
      particle.style.setProperty('--size', `${size}px`);
      particle.style.setProperty('--spin', `${spin}deg`);
      particle.style.color = randomItem(colors);

      fxLayer.appendChild(particle);
      window.setTimeout(() => particle.remove(), duration + 120);
    }
  }

  function randomRange(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  function showToast(message, tone = 'info', title = 'System') {
    const toast = document.createElement('div');
    toast.className = `toast toast--${tone}`;
    toast.innerHTML = `
      <span class="toast__title">${escapeHtml(title)}</span>
      <span class="toast__message">${escapeHtml(message)}</span>
    `;

    toastHost.prepend(toast);
    while (toastHost.childElementCount > 4) {
      toastHost.lastElementChild?.remove();
    }

    window.setTimeout(() => {
      toast.remove();
    }, prefersReducedMotion ? 1800 : 4200);
  }

  function pickNextFromDeck(deckName, source) {
    if (!state[deckName].length) {
      state[deckName] = shuffle(source);
    }

    return state[deckName].shift();
  }

  function updateCardAria(student) {
    const emoji = student.emojiEl.textContent.trim();
    student.card.setAttribute('aria-label', `${student.name}. ${emoji}. ${student.role}.`);
    student.card.title = `${student.name} · ${emoji}`;
  }

  function cycleEmoji(student, announce = true) {
    if (student.hired) {
      return;
    }

    const currentEmoji = student.emojiEl.textContent.trim();
    const currentIndex = student.emojiCycle.indexOf(currentEmoji);
    const nextEmoji = student.emojiCycle[(currentIndex + 1) % student.emojiCycle.length];

    student.emojiEl.textContent = nextEmoji;
    student.emoji = nextEmoji;
    student.card.classList.remove('is-cycled');
    void student.card.offsetWidth;
    student.card.classList.add('is-cycled');
    updateCardAria(student);

    if (announce) {
      playTone(760, 0.06, 'triangle', 0.045);
      showToast(`${student.name} changed emoji to ${nextEmoji}.`, 'info', 'Roll Call');
    }
  }

  function beginDrag(event, student) {
    if (state.finished || student.hired || event.button !== 0) {
      return;
    }

    ensureAudioContext();

    student.drag.active = true;
    student.drag.pointerId = event.pointerId;
    student.drag.startX = event.clientX;
    student.drag.startY = event.clientY;
    student.drag.originX = student.drag.x;
    student.drag.originY = student.drag.y;
    student.drag.moved = false;

    student.card.classList.add('is-dragging');
    student.card.setPointerCapture?.(event.pointerId);
    student.card.style.zIndex = String(10 + student.index);

    event.preventDefault();
  }

  function moveDrag(event) {
    if (!state.allStudents.length) {
      return;
    }

    const activeStudent = state.allStudents.find((student) => student.drag.active && student.drag.pointerId === event.pointerId);
    if (!activeStudent || activeStudent.hired) {
      return;
    }

    const deltaX = event.clientX - activeStudent.drag.startX;
    const deltaY = event.clientY - activeStudent.drag.startY;

    if (Math.abs(deltaX) + Math.abs(deltaY) > 4) {
      activeStudent.drag.moved = true;
    }

    activeStudent.drag.x = clamp(activeStudent.drag.originX + deltaX, -240, 240);
    activeStudent.drag.y = clamp(activeStudent.drag.originY + deltaY, -120, 200);
    activeStudent.drag.rotate = clamp(deltaX / 18, -10, 10);
    activeStudent.card.style.setProperty('--drag-x', `${activeStudent.drag.x}px`);
    activeStudent.card.style.setProperty('--drag-y', `${activeStudent.drag.y}px`);
    activeStudent.card.style.setProperty('--drag-rotate', `${activeStudent.drag.rotate}deg`);
  }

  function endDrag(event) {
    const activeStudent = state.allStudents.find((student) => student.drag.active && student.drag.pointerId === event.pointerId);
    if (!activeStudent) {
      return;
    }

    activeStudent.drag.active = false;
    activeStudent.card.classList.remove('is-dragging');
    activeStudent.card.style.zIndex = '';

    if (activeStudent.drag.moved) {
      activeStudent.justMoved = true;
      playTone(130, 0.05, 'sine', 0.035);
    }
  }

  function handleCardClick(student) {
    if (student.justMoved) {
      student.justMoved = false;
      return;
    }

    cycleEmoji(student);
  }

  function renderPoolView() {
    pickerStage.dataset.mode = '';
    pickerStage.classList.remove('is-shaking');
    pickerStage.innerHTML = pickerBaseMarkup;

    const emojiCloud = pickerStage.querySelector('.emoji-cloud');
    const note = pickerStage.querySelector('.picker-stage__note');

    const emojis = state.remainingStudents.map((student) => student.emoji).filter(Boolean);
    emojiCloud.innerHTML = emojis.length
      ? emojis.map((emoji, index) => `<span style="animation-delay:${index * 140}ms">${escapeHtml(emoji)}</span>`).join('')
      : '<span>🏁</span>';

    note.textContent = state.remainingStudents.length
      ? 'The winner disappears from the next round automatically.'
      : 'All hires complete.';
  }

  function renderPickerScene(mode, preview = false) {
    const pool = state.remainingStudents.map((student) => student.emoji).filter(Boolean);
    const poolMarkup = pool.length
      ? pool.map((emoji, index) => `<span style="animation-delay:${index * 120}ms">${escapeHtml(emoji)}</span>`).join('')
      : '<span>🏁</span>';

    pickerStage.dataset.mode = mode.key;
    pickerStage.classList.remove('is-shaking');
    void pickerStage.offsetWidth;
    pickerStage.classList.add('is-shaking');

    pickerStage.innerHTML = `
      <div class="picker-scene picker-scene--${escapeHtml(mode.key)}">
        <div class="picker-scene__title">${escapeHtml(mode.label)}</div>
        <div class="picker-scene__machine">${escapeHtml(mode.icon)}</div>
        <div class="picker-scene__rack">${poolMarkup}</div>
        <div class="picker-scene__winner">?</div>
        <p class="picker-scene__subtitle">${escapeHtml(preview ? 'Preview only. The real round will still randomize.' : mode.subtitle)}</p>
      </div>
    `;

    window.setTimeout(() => {
      pickerStage.classList.remove('is-shaking');
    }, prefersReducedMotion ? 10 : 420);
  }

  function updatePickerWinner(round) {
    const winner = pickerStage.querySelector('.picker-scene__winner');
    const subtitle = pickerStage.querySelector('.picker-scene__subtitle');
    if (winner) {
      winner.textContent = round.student.emoji;
    }
    if (subtitle) {
      subtitle.textContent = `${round.student.name} is now hired by ${round.company.name}.`;
    }
  }

  function updateTrailer(company) {
    let companyBadge = trailerFrame.querySelector('.company-badge');
    if (!companyBadge) {
      companyBadge = document.createElement('div');
      companyBadge.className = 'company-badge';
      trailerFrame.insertBefore(companyBadge, trailerFrame.firstChild);
    }

    companyBadge.innerHTML = `
      <span>${escapeHtml(company.logo)}</span>
      <strong>${escapeHtml(company.name)}</strong>
    `;
    companyBadge.style.borderColor = company.accent[0];
    companyBadge.style.boxShadow = `0 18px 40px ${company.accent[0]}22`;

    trailerFrame.style.borderColor = company.accent[0];
    trailerFrame.style.boxShadow = `inset 0 0 60px ${company.accent[0]}18, 0 0 0 1px ${company.accent[1]}18`;
    trailerFrame.style.background = `
      radial-gradient(circle at center, rgba(255, 255, 255, 0.06), transparent 36%),
      linear-gradient(180deg, ${company.accent[0]}28, rgba(17, 18, 26, 0.96))
    `;

    trailerTag.textContent = `${company.logo} ${company.name.toUpperCase()}`;
    trailerTitle.textContent = company.headline;
    trailerCopy.textContent = company.copy;
  }

  function addHistoryWindow(round) {
    const historyWindow = document.createElement('article');
    const floatX = randomRange(-20, 18);
    const floatY = randomRange(-8, 8);
    const floatRotate = randomRange(-3, 3);

    historyWindow.className = 'mini-window mini-window--live';
    historyWindow.style.setProperty('--float-x', `${floatX}px`);
    historyWindow.style.setProperty('--float-y', `${floatY}px`);
    historyWindow.style.setProperty('--float-rotate', `${floatRotate}deg`);
    historyWindow.innerHTML = `
      <div class="mini-window__bar">${escapeHtml(round.company.logo)} ${escapeHtml(round.company.name)}</div>
      <div class="mini-window__content">
        <strong>${escapeHtml(round.student.name)}</strong>
        <span>${escapeHtml(round.mode.label)} · ${escapeHtml(round.student.emoji)}</span>
      </div>
    `;

    windowStack.prepend(historyWindow);
    while (windowStack.childElementCount > 8) {
      windowStack.lastElementChild?.remove();
    }
  }

  function previewPickerMode(mode) {
    if (state.finished) {
      return;
    }

    if (state.roundActive) {
      showToast('The picker is busy right now.', 'warning', 'System');
      return;
    }

    ensureAudioContext();
    clearPreview();
    syncPickerSelection(mode.key);
    renderPickerScene(mode, true);
    showToast(`Previewing ${mode.label}.`, 'info', 'Picker');
    playTone(540, 0.05, 'triangle', 0.04);

    state.previewTimeout = window.setTimeout(() => {
      state.previewTimeout = null;
      if (!state.roundActive && !state.finished) {
        renderPoolView();
      }
    }, prefersReducedMotion ? 200 : 1500);
  }

  function resolveRound(round) {
    if (state.finished || !state.currentRound || state.currentRound !== round || round.resolved) {
      return;
    }

    round.resolved = true;
    updatePickerWinner(round);
    spawnParticlesAt(round.student.card, {
      count: prefersReducedMotion ? 10 : 24,
      glyphs: ['✨', '🎉', '💫', '★'],
      colors: ['#7bf1ff', '#ffb86b', '#ff5f87', '#8dff9e'],
      radius: 120,
    });
    playChime([392, 494, 659], { type: 'triangle', gain: 0.055, step: 0.06 });

    scheduleRound(() => finalizeRound(round), prefersReducedMotion ? 20 : 650);
  }

  function finalizeRound(round) {
    if (state.finished || !state.currentRound || state.currentRound !== round) {
      return;
    }

    const hiredStudent = round.student;
    hiredStudent.hired = true;
    hiredStudent.justMoved = false;
    hiredStudent.card.classList.add('is-hired');
    hiredStudent.card.setAttribute('aria-disabled', 'true');

    state.remainingStudents = state.remainingStudents.filter((student) => student.id !== hiredStudent.id);
    state.assignments.push({
      round: state.assignments.length + 1,
      studentId: hiredStudent.id,
      studentName: hiredStudent.name,
      studentEmoji: hiredStudent.emoji,
      companyName: round.company.name,
      companyLogo: round.company.logo,
      companyHeadline: round.company.headline,
      companyCopy: round.company.copy,
      modeLabel: round.mode.label,
      modeIcon: round.mode.icon,
      assignedAt: new Date().toISOString(),
    });

    updateStatusForRound();
    addHistoryWindow(round);
    showToast(`${hiredStudent.name} has been hired by ${round.company.name}.`, 'success', 'Hiring');
    spawnParticlesAt(hiredStudent.card, {
      count: prefersReducedMotion ? 8 : 20,
      glyphs: ['🎉', '✨', '💥', '💫'],
      colors: ['#8dff9e', '#7bf1ff', '#ffb86b', '#ff5f87'],
      radius: 90,
      durationMin: 600,
      durationMax: 1050,
    });

    window.setTimeout(() => {
      if (hiredStudent.card.isConnected) {
        hiredStudent.card.remove();
      }
    }, prefersReducedMotion ? 220 : 560);

    state.currentRound = null;
    state.roundActive = false;
    syncHeroCopy();
    setPrimaryButtonLabel();

    if (!state.remainingStudents.length) {
      enterFinale('All students have been hired.');
      return;
    }

    renderPoolView();
  }

  function updateStatusForRound(modeLabel = 'Ready') {
    const remainingNode = getStatusNode(1);
    const timerNode = getStatusNode(2);
    const modeNode = getStatusNode(0);

    if (modeNode) {
      modeNode.textContent = state.finished
        ? 'Finale'
        : state.roundActive && state.currentRound
          ? `Selecting: ${state.currentRound.mode.label}`
          : modeLabel;
    }

    if (remainingNode) {
      remainingNode.textContent = String(state.remainingStudents.length);
    }

    if (timerNode) {
      timerNode.textContent = formatTimer(state.timerSeconds);
    }
  }

  function beginNextRound() {
    if (state.finished) {
      exportCeremony();
      return;
    }

    if (!state.started) {
      startCeremony();
      return;
    }

    if (state.roundActive && state.currentRound) {
      skipCurrentRound();
      return;
    }

    if (!state.remainingStudents.length) {
      enterFinale('No students remain to be hired.');
      return;
    }

    clearPreview();
    clearRoundTimeouts();
    state.roundActive = true;
    setPrimaryButtonLabel();

    const student = randomItem(state.remainingStudents);
    const company = pickNextFromDeck('companyDeck', COMPANY_POOL);
    const mode = pickNextFromDeck('modeDeck', MODE_POOL);
    const round = {
      student,
      company,
      mode,
      resolved: false,
    };

    state.currentRound = round;
    state.startedAt = state.startedAt || new Date();
    syncHeroCopy();
    syncPickerSelection(mode.key);
    updateTrailer(company);
    renderPickerScene(mode, false);
    updateStatusForRound(`Selecting: ${mode.label}`);
    spawnParticlesAt(trailerFrame, {
      count: prefersReducedMotion ? 10 : 18,
      glyphs: ['✨', '★', '✦', '💫'],
      colors: [company.accent[0], company.accent[1], '#f5f7ff'],
      radius: 140,
    });
    playChime([220, 330, 440], { type: 'triangle', gain: 0.05, step: 0.07 });

    const revealDelay = prefersReducedMotion ? 20 : 1200;
    scheduleRound(() => resolveRound(round), revealDelay);
  }

  function skipCurrentRound() {
    if (!state.currentRound) {
      showToast('Nothing is being skipped right now.', 'info', 'System');
      return;
    }

    clearRoundTimeouts();
    if (state.currentRound.resolved) {
      finalizeRound(state.currentRound);
      return;
    }

    resolveRound(state.currentRound);
  }

  function startCeremony() {
    state.started = true;
    state.startedAt = new Date();
    body.classList.add('is-ready');
    body.classList.add('is-live');
    showToast('The ceremony has begun.', 'success', 'Bootstrap');
    syncHeroCopy();
    setPrimaryButtonLabel();
    startTimer();
    updateStatusForRound('Ready');
  }

  function startTimer() {
    if (state.timerId) {
      return;
    }

    syncHud();

    state.timerId = window.setInterval(() => {
      if (state.finished) {
        return;
      }

      state.timerSeconds = Math.max(0, state.timerSeconds - 1);
      syncHud(state.roundActive && state.currentRound ? `Selecting: ${state.currentRound.mode.label}` : 'Ready');
      announceTimerEvents();

      if (state.timerSeconds === 0) {
        enterFinale('TIME! Deploy what you\'ve got!');
      }
    }, 1000);
  }

  function announceTimerEvents() {
    ANNOUNCEMENTS.forEach((announcement) => {
      if (state.timerSeconds === announcement.seconds && !state.announced.has(announcement.seconds)) {
        state.announced.add(announcement.seconds);
        showToast(announcement.message, announcement.seconds <= 30 ? 'warning' : 'info', 'Timer');

        if (announcement.seconds === 0) {
          spawnParticlesAt(document.body, {
            count: prefersReducedMotion ? 12 : 30,
            glyphs: ['🚨', '⚠️', '✨'],
            colors: ['#ff5f87', '#ffb86b', '#7bf1ff'],
            radius: 180,
            durationMin: 900,
            durationMax: 1500,
          });
        }
      }
    });
  }

  function enterFinale(message) {
    if (state.finished) {
      return;
    }

    clearRoundTimeouts();
    clearPreview();
    state.finished = true;
    state.roundActive = false;
    state.finishedAt = new Date();

    if (state.timerId) {
      clearInterval(state.timerId);
      state.timerId = null;
    }

    stopBossMusic(true);
    body.classList.add('is-finale');
    syncHeroCopy();
    setPrimaryButtonLabel();
    syncHud('Finale');
    renderPoolView();

    alarmOverlay.hidden = false;
    alarmTitle.textContent = state.remainingStudents.length ? 'WELCOME NEW HIRES' : 'MISSION COMPLETE';
    alarmCountdown.textContent = formatTimer(state.timerSeconds);
    alarmHint.textContent = message;
    alarmAction.focus({ preventScroll: true });

    showToast(message, 'danger', 'Finale');
    spawnParticlesAt(alarmOverlay.querySelector('.alarm-overlay__panel'), {
      count: prefersReducedMotion ? 12 : 28,
      glyphs: ['🚨', '⚠️', '✨', '💥'],
      colors: ['#ff5f87', '#ffb86b', '#7bf1ff'],
      radius: 180,
    });
  }

  function buildReportHtml() {
    const generatedAt = formatDateTimeStamp();
    const dateStamp = formatDateStamp(state.startedAt || new Date());
    const durationSeconds = state.startedAt && state.finishedAt
      ? Math.max(0, Math.round((state.finishedAt.getTime() - state.startedAt.getTime()) / 1000))
      : Math.max(0, TIMER_START - state.timerSeconds);
    const assignmentsHtml = state.assignments.map((assignment) => `
      <article class="report-card">
        <div class="report-card__snapshot">
          <span class="report-card__snapshot-emoji">${escapeHtml(assignment.companyLogo)}</span>
          <span class="report-card__snapshot-label">${escapeHtml(assignment.companyName)}</span>
        </div>
        <div class="report-card__body">
          <strong>${escapeHtml(assignment.studentName)}</strong>
          <span>${escapeHtml(assignment.studentEmoji)} · ${escapeHtml(assignment.companyHeadline)}</span>
          <small>${escapeHtml(assignment.modeLabel)} · Round ${assignment.round}</small>
        </div>
      </article>
    `).join('');

    const unassigned = state.remainingStudents.length
      ? state.remainingStudents.map((student) => `
        <li>
          <span>${escapeHtml(student.emoji)}</span>
          <strong>${escapeHtml(student.name)}</strong>
        </li>
      `).join('')
      : '<li><strong>None</strong></li>';

    const modeCounts = tally(state.assignments.map((assignment) => assignment.modeLabel));
    const modeSummary = Object.entries(modeCounts)
      .map(([mode, count]) => `<li><strong>${escapeHtml(mode)}</strong><span>${count}</span></li>`)
      .join('');

    const latestCompany = state.assignments[state.assignments.length - 1]?.companyName || 'None';

    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Bootstrap Hiring Ceremony Report</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #07080f;
        --panel: rgba(15, 18, 31, 0.9);
        --line: rgba(255, 255, 255, 0.12);
        --text: #f5f7ff;
        --muted: rgba(245, 247, 255, 0.72);
        --accent: #7bf1ff;
        --accent-2: #ffb86b;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        color: var(--text);
        background:
          radial-gradient(circle at top, rgba(123, 241, 255, 0.12), transparent 40%),
          radial-gradient(circle at bottom right, rgba(255, 91, 135, 0.12), transparent 30%),
          linear-gradient(180deg, #05060b, #0a0d16 55%, #05060b);
        font-family: "Space Grotesk", "Segoe UI", system-ui, sans-serif;
      }
      main {
        width: min(1200px, calc(100vw - 32px));
        margin: 0 auto;
        padding: 32px 0 64px;
        display: grid;
        gap: 18px;
      }
      .hero, section {
        background: var(--panel);
        border: 1px solid var(--line);
        border-radius: 28px;
        padding: 24px;
        backdrop-filter: blur(16px);
      }
      h1, h2, h3, p { margin-top: 0; }
      h1 {
        font-size: clamp(2.4rem, 6vw, 4.8rem);
        line-height: 0.96;
        letter-spacing: -0.06em;
        margin-bottom: 12px;
      }
      .kicker, .eyebrow {
        font-family: "JetBrains Mono", monospace;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--accent);
        font-size: 0.74rem;
      }
      .stats {
        display: grid;
        gap: 12px;
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
      .stat, .report-card, .badge {
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid var(--line);
        border-radius: 20px;
      }
      .stat { padding: 16px; }
      .stat strong, .summary-list strong { display: block; }
      .stat span, .summary-list span, .report-card span, .report-card small, .meta, .muted {
        color: var(--muted);
      }
      .grid {
        display: grid;
        gap: 14px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .report-card {
        display: grid;
        grid-template-columns: 132px minmax(0, 1fr);
        overflow: hidden;
      }
      .report-card__snapshot {
        display: grid;
        align-content: center;
        justify-items: center;
        gap: 8px;
        padding: 16px;
        min-height: 150px;
        background: linear-gradient(135deg, rgba(123, 241, 255, 0.16), rgba(255, 184, 107, 0.16));
      }
      .report-card__snapshot-emoji {
        font-size: 2.6rem;
        line-height: 1;
      }
      .report-card__snapshot-label {
        font-family: "JetBrains Mono", monospace;
        font-size: 0.74rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        text-align: center;
      }
      .report-card__body {
        display: grid;
        gap: 6px;
        padding: 16px;
        align-content: center;
      }
      .badge {
        display: inline-flex;
        padding: 10px 12px;
        border-radius: 999px;
        margin: 6px 8px 0 0;
        font-family: "JetBrains Mono", monospace;
        font-size: 0.74rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .summary-list {
        display: grid;
        gap: 10px;
      }
      .summary-list li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 12px 14px;
        border-radius: 16px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid var(--line);
      }
      .assignment-list {
        display: grid;
        gap: 14px;
      }
      .pill-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .pill {
        padding: 10px 12px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid var(--line);
        font-size: 0.85rem;
      }
      .two-col {
        display: grid;
        gap: 18px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      @media (max-width: 900px) {
        .stats, .grid, .two-col { grid-template-columns: 1fr; }
        .report-card { grid-template-columns: 1fr; }
      }
    </style>
  </head>
  <body>
    <main>
      <section class="hero">
        <div class="eyebrow">Bootstrap Hiring Ceremony</div>
        <h1>Today's ceremony report</h1>
        <p class="meta">Generated ${escapeHtml(generatedAt)} · Session date ${escapeHtml(dateStamp)} · Duration ${escapeHtml(formatTimer(durationSeconds))}</p>
        <div class="stats">
          <div class="stat"><strong>${state.assignments.length}</strong><span>Hires made</span></div>
          <div class="stat"><strong>${state.remainingStudents.length}</strong><span>Students remaining</span></div>
          <div class="stat"><strong>${new Set(state.assignments.map((assignment) => assignment.companyName)).size}</strong><span>Unique companies</span></div>
          <div class="stat"><strong>${escapeHtml(latestCompany)}</strong><span>Latest company</span></div>
        </div>
      </section>

      <section>
        <div class="eyebrow">Assignments</div>
        <div class="assignment-list">
          ${assignmentsHtml || '<p class="muted">No assignments were made in this session.</p>'}
        </div>
      </section>

      <section class="two-col">
        <div>
          <div class="eyebrow">Unassigned</div>
          <ul class="summary-list">
            ${unassigned}
          </ul>
        </div>
        <div>
          <div class="eyebrow">Picker summary</div>
          <ul class="summary-list">
            ${modeSummary || '<li><strong>No picker data</strong><span>-</span></li>'}
          </ul>
        </div>
      </section>

      <section>
        <div class="eyebrow">Session badges</div>
        <div class="pill-row">
          <span class="pill">Round count ${state.assignments.length}</span>
          <span class="pill">Timer left ${formatTimer(state.timerSeconds)}</span>
          <span class="pill">Exported ${escapeHtml(dateStamp)}</span>
          <span class="pill">${escapeHtml(latestCompany)}</span>
        </div>
      </section>
    </main>
  </body>
</html>`;
  }

  function tally(values) {
    return values.reduce((accumulator, value) => {
      const key = String(value);
      accumulator[key] = (accumulator[key] || 0) + 1;
      return accumulator;
    }, {});
  }

  function downloadReport() {
    const html = buildReportHtml();
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    const fileName = `bootstrap-hiring-ceremony-${formatDateStamp(state.startedAt || new Date())}.html`;

    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast('Ceremony report downloaded.', 'success', 'Export');
  }

  function exportCeremony() {
    ensureAudioContext();
    downloadReport();
  }

  function handleMainAction() {
    ensureAudioContext();

    if (state.finished) {
      exportCeremony();
      return;
    }

    if (!state.started) {
      startCeremony();
      beginNextRound();
      return;
    }

    if (state.roundActive) {
      skipCurrentRound();
      return;
    }

    beginNextRound();
  }

  function handleKeydown(event) {
    const targetTag = event.target?.tagName?.toLowerCase();
    if (targetTag === 'input' || targetTag === 'textarea' || event.metaKey || event.ctrlKey || event.altKey) {
      return;
    }

    if (event.code === 'Space') {
      event.preventDefault();
      if (!state.started) {
        handleMainAction();
      } else if (state.roundActive) {
        skipCurrentRound();
      } else {
        showToast(
          state.finished
            ? 'The ceremony is complete. Use Export to save the report.'
            : 'Nothing to skip right now.',
          'info',
          'System',
        );
      }
      return;
    }

    const key = event.key.toLowerCase();
    switch (key) {
      case 'f':
        ensureAudioContext();
        spawnParticlesAt(document.body, {
          count: prefersReducedMotion ? 12 : 28,
          glyphs: ['✨', '★', '✦', '💫'],
          colors: ['#7bf1ff', '#ffb86b', '#8dff9e', '#ff5f87'],
          radius: 180,
        });
        showToast('Fireworks!', 'success', 'Teacher');
        playChime([784, 988, 1175], { type: 'triangle', gain: 0.06, step: 0.05 });
        break;
      case 'c':
        ensureAudioContext();
        spawnParticlesAt(document.body, {
          count: prefersReducedMotion ? 14 : 36,
          glyphs: ['🎉', '🎊', '✦', '★'],
          colors: ['#7bf1ff', '#ffb86b', '#ff5f87', '#8dff9e'],
          radius: 210,
        });
        showToast('Confetti!', 'success', 'Teacher');
        playTone(920, 0.08, 'triangle', 0.05);
        break;
      case 'b':
        ensureAudioContext();
        toggleBossMusic();
        break;
      case 'r':
        ensureAudioContext();
        body.classList.add('is-shaking');
        window.setTimeout(() => body.classList.remove('is-shaking'), prefersReducedMotion ? 60 : 420);
        spawnParticlesAt(document.body, {
          count: prefersReducedMotion ? 8 : 18,
          glyphs: ['💥', '✨', '⚡', '✦'],
          colors: ['#ff5f87', '#ffb86b', '#7bf1ff'],
          radius: 150,
          durationMin: 600,
          durationMax: 1100,
        });
        showToast('Random explosion!', 'warning', 'Teacher');
        playTone(110, 0.18, 'sawtooth', 0.06);
        break;
      case 's':
        if (state.roundActive) {
          skipCurrentRound();
        } else if (!state.finished) {
          beginNextRound();
        }
        break;
      default:
        break;
    }
  }

  function createStudentObject(name, emoji, role = 'Ready to code.') {
    const index = state.allStudents.length;
    const card = document.createElement('article');
    card.className = 'employee-card';
    card.setAttribute('role', 'listitem');
    card.innerHTML = `
      <button class="employee-card__remove" type="button" title="Remove student" aria-label="Remove ${escapeHtml(name)}">✕</button>
      <div class="employee-card__emoji" aria-hidden="true">${escapeHtml(emoji)}</div>
      <div class="employee-card__body">
        <h3>${escapeHtml(name)}</h3>
        <p>${escapeHtml(role)}</p>
      </div>
    `;

    employeeGrid.appendChild(card);

    const emojiEl = card.querySelector('.employee-card__emoji');
    const removeBtn = card.querySelector('.employee-card__remove');
    const student = {
      id: `${slugify(name)}-${Date.now()}-${index + 1}`,
      index,
      name,
      role,
      card,
      emojiEl,
      emoji,
      emojiCycle: buildEmojiCycle(emoji),
      hired: false,
      justMoved: false,
      drag: {
        active: false,
        pointerId: null,
        startX: 0,
        startY: 0,
        originX: 0,
        originY: 0,
        x: 0,
        y: 0,
        rotate: 0,
        moved: false,
      },
    };

    card.dataset.studentId = student.id;
    card.dataset.mode = 'employee';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-pressed', 'false');
    card.style.setProperty('--entry-delay', `${index * 85}ms`);
    updateCardAria(student);

    card.addEventListener('pointerdown', (event) => {
      if (event.target === removeBtn || removeBtn.contains(event.target)) {
        return;
      }
      beginDrag(event, student);
    });
    card.addEventListener('click', (event) => {
      if (event.target === removeBtn || removeBtn.contains(event.target)) {
        return;
      }
      handleCardClick(student);
    });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleCardClick(student);
      }
    });

    removeBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      removeStudent(student.id);
    });

    return student;
  }

  function addStudent(name, emoji = null, role = 'Ready to code.') {
    if (!name || !name.trim()) {
      return;
    }
    const cleanName = name.trim();
    const studentEmoji = emoji || EMOJIS[state.allStudents.length % EMOJIS.length];
    const student = createStudentObject(cleanName, studentEmoji, role);

    state.allStudents.push(student);
    state.remainingStudents.push(student);

    playTone(580, 0.08, 'triangle', 0.05);
    showToast(`${cleanName} joined the class!`, 'success', 'Roll Call');

    syncHud();
    setPrimaryButtonLabel();
    renderPoolView();
  }

  function removeStudent(studentId) {
    const studentIndex = state.allStudents.findIndex((s) => s.id === studentId);
    if (studentIndex === -1) {
      return;
    }

    const student = state.allStudents[studentIndex];
    if (student.hired || state.started) {
      showToast('Cannot remove student during active ceremony.', 'warning', 'Roll Call');
      return;
    }

    if (student.card.isConnected) {
      student.card.remove();
    }

    state.allStudents = state.allStudents.filter((s) => s.id !== studentId);
    state.remainingStudents = state.remainingStudents.filter((s) => s.id !== studentId);

    showToast(`Removed ${student.name} from class.`, 'info', 'Roll Call');
    syncHud();
    setPrimaryButtonLabel();
    renderPoolView();
  }

  function populateSampleStudents() {
    if (state.allStudents.length > 0) {
      showToast('Students already added to class.', 'info', 'Roll Call');
      return;
    }

    SAMPLE_STUDENTS.forEach((sample) => {
      addStudent(sample.name, sample.emoji, sample.role);
    });
  }

  function resetCeremony() {
    clearRoundTimeouts();
    clearPreview();

    if (state.timerId) {
      clearInterval(state.timerId);
      state.timerId = null;
    }

    stopBossMusic(true);

    state.started = false;
    state.finished = false;
    state.roundActive = false;
    state.timerSeconds = TIMER_START;
    state.startedAt = null;
    state.finishedAt = null;
    state.currentRound = null;
    state.assignments = [];
    state.announced.clear();
    state.modeDeck = shuffle(MODE_POOL);
    state.companyDeck = shuffle(COMPANY_POOL);

    const body = document.body;
    body.classList.remove('is-live');
    body.classList.remove('is-finale');
    body.classList.remove('is-boss');
    alarmOverlay.hidden = true;

    trailerTag.textContent = '🛸 AWAITING REVEAL';
    trailerTitle.textContent = 'Ready for Round 1';
    trailerCopy.textContent = 'Click \'BEGIN THE BOOTSTRAP HIRING CEREMONY\' to launch the first company reveal.';

    windowStack.innerHTML = '<p class="history-empty-hint">Completed hires will pop up here as draggable desktop windows.</p>';

    const savedStudents = state.allStudents.map((s) => ({ name: s.name, emoji: s.emoji, role: s.role }));
    employeeGrid.innerHTML = '';
    state.allStudents = [];
    state.remainingStudents = [];

    if (savedStudents.length) {
      savedStudents.forEach((student) => addStudent(student.name, student.emoji, student.role));
    } else {
      populateSampleStudents();
    }

    syncHeroCopy();
    syncHud();
    setPrimaryButtonLabel();
    renderPoolView();

    showToast('Ceremony reset! Ready for student arrival.', 'info', 'Reset');
  }

  function initializeStudents() {
    employeeGrid.innerHTML = '';
    state.allStudents = [];
    state.remainingStudents = [];
    populateSampleStudents();
  }

  function initializePickerPills() {
    pickerPills.forEach((pill, index) => {
      const mode = MODE_POOL[index];
      if (mode) {
        pill.dataset.mode = mode.key;
      }

      pill.addEventListener('click', () => {
        const selectedMode = MODE_POOL[index];
        if (!selectedMode) {
          return;
        }
        previewPickerMode(selectedMode);
      });
    });
  }

  function wireControls() {
    beginBtn.addEventListener('click', handleMainAction);
    exportBtn.addEventListener('click', exportCeremony);
    resetBtn?.addEventListener('click', resetCeremony);
    alarmAction.addEventListener('click', exportCeremony);
    alarmResetBtn?.addEventListener('click', resetCeremony);

    studentAddForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      const value = studentNameInput.value;
      if (value && value.trim()) {
        addStudent(value);
        studentNameInput.value = '';
      }
    });

    addSampleBtn?.addEventListener('click', () => {
      populateSampleStudents();
    });

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('pointermove', moveDrag);
    document.addEventListener('pointerup', endDrag);
    document.addEventListener('pointercancel', endDrag);
  }

  function initialRender() {
    renderPoolView();
    syncHeroCopy();
    syncHud();
    setPrimaryButtonLabel();
    syncPickerSelection(MODE_POOL[0].key);
    const body = document.body;
    body.classList.add('is-ready');
    window.setTimeout(() => {
      showToast('Roll call is live. Add students as they arrive to class!', 'info', 'Bootstrap');
    }, prefersReducedMotion ? 120 : 450);
  }

  function bootstrap() {
    initializePickerPills();
    initializeStudents();
    wireControls();
    initialRender();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const body = document.body;
        body.classList.add('is-ready');
      });
    });
  }

  bootstrap();
})();
