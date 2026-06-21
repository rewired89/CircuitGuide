// CircuitGuide App — with animations and interactions

const STORAGE_KEY = 'circuitguide_learned';

// ── State ──────────────────────────────────────────────────────────────────
let learnedIds = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));
let currentSection = null;
let searchQuery = '';

// ── DOM refs ───────────────────────────────────────────────────────────────
const mainEl = document.getElementById('main');
const sidebarEl = document.getElementById('sidebar');
const searchInput = document.getElementById('search');
const pillNum = document.getElementById('pillNum');
const pillTotal = document.getElementById('pillTotal');
const menuBtn = document.getElementById('menuBtn');
const toastEl = document.getElementById('toast');
const cursorGlow = document.getElementById('cursorGlow');

// ── Particle Background ────────────────────────────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('bgCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animId;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Particle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.r = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.4 + 0.1;
    this.color = Math.random() > 0.7 ? '#00d4ff' : '#ffffff';
  }

  function init() {
    resize();
    const count = Math.min(Math.floor(W * H / 14000), 100);
    particles = Array.from({ length: count }, () => new Particle());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,212,255,${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color === '#00d4ff'
        ? `rgba(0,212,255,${p.alpha})`
        : `rgba(255,255,255,${p.alpha * 0.5})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
    });

    animId = requestAnimationFrame(draw);
  }

  init();
  draw();
  window.addEventListener('resize', () => { init(); });
})();

// ── Cursor Glow ────────────────────────────────────────────────────────────
(function initCursorGlow() {
  let mx = -500, my = -500;
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursorGlow.style.left = mx + 'px';
    cursorGlow.style.top = my + 'px';
  });
  document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursorGlow.style.opacity = '1';
  });
})();

// ── Init ───────────────────────────────────────────────────────────────────
function init() {
  buildSidebar();
  renderHome();
  updateProgressPill();

  searchInput.addEventListener('input', e => {
    const q = e.target.value.trim();
    if (q.length > 1) {
      searchQuery = q;
      renderSearch(q);
    } else if (q.length === 0) {
      searchQuery = '';
      if (currentSection) renderSection(currentSection);
      else renderHome();
    }
  });

  menuBtn.addEventListener('click', () => {
    const isOpen = sidebarEl.classList.toggle('open');
    menuBtn.classList.toggle('open', isOpen);
  });

  mainEl.addEventListener('click', e => {
    if (sidebarEl.classList.contains('open') &&
        !sidebarEl.contains(e.target) &&
        e.target !== menuBtn) {
      sidebarEl.classList.remove('open');
      menuBtn.classList.remove('open');
    }
  });
}

// ── Sidebar ────────────────────────────────────────────────────────────────
function buildSidebar() {
  sidebarEl.innerHTML = '';

  const homeSection = el('div', { class: 'sidebar-section open' });
  const homeItems = el('div', { class: 'sidebar-items' });
  const homeLink = el('div', { class: 'sidebar-item active' }, '⚡ Home');
  homeLink.dataset.section = 'home';
  homeLink.addEventListener('click', () => {
    currentSection = null;
    searchInput.value = '';
    renderHome();
    setSidebarActive('home');
    closeSidebar();
  });
  homeItems.appendChild(homeLink);
  homeSection.appendChild(homeItems);
  sidebarEl.appendChild(homeSection);

  SECTIONS.forEach(section => {
    const sec = el('div', { class: 'sidebar-section open' });
    const header = el('div', { class: 'sidebar-section-header' });
    header.innerHTML = `${section.icon} ${section.title} <span class="sidebar-chevron">▶</span>`;
    header.addEventListener('click', () => sec.classList.toggle('open'));

    const items = el('div', { class: 'sidebar-items' });
    section.concepts.forEach((concept, i) => {
      const item = el('div', { class: 'sidebar-item' });
      item.style.animationDelay = `${i * 0.02}s`;
      item.dataset.conceptId = concept.id;
      item.dataset.section = section.id;
      renderSidebarItem(item, concept);
      item.addEventListener('click', () => {
        currentSection = section.id;
        searchInput.value = '';
        renderSection(section.id, concept.id);
        setSidebarActive(section.id);
        closeSidebar();
      });
      items.appendChild(item);
    });

    sec.appendChild(header);
    sec.appendChild(items);
    sidebarEl.appendChild(sec);
  });
}

function renderSidebarItem(item, concept) {
  const learned = learnedIds.has(concept.id);
  item.style.opacity = learned ? '0.6' : '';
  item.innerHTML = `
    <span>${learned ? '✓ ' : ''}${concept.title}</span>
    <span class="cert-badge tag tag-${concept.tags[0]}">${tagLabel(concept.tags[0])}</span>
  `;
}

function setSidebarActive(sectionId) {
  sidebarEl.querySelectorAll('.sidebar-item').forEach(item => {
    item.classList.toggle('active', item.dataset.section === sectionId);
  });
}

function closeSidebar() {
  sidebarEl.classList.remove('open');
  menuBtn.classList.remove('open');
}

// ── Home ───────────────────────────────────────────────────────────────────
function renderHome() {
  const total = ALL_CONCEPTS.length;
  const learned = learnedIds.size;
  const pct = total ? Math.round(learned / total * 100) : 0;

  mainEl.innerHTML = '';
  const hero = el('div', { class: 'hero' });

  const sectionNums = [
    { label: 'Concepts', val: total, cls: 'cyan' },
    { label: 'Sections', val: SECTIONS.length, cls: '' },
    { label: 'Learned', val: learned, cls: 'orange' },
  ];

  const statsHtml = sectionNums.map((s, i) => `
    ${i > 0 ? '<div class="stat-divider"></div>' : ''}
    <div class="stat-item">
      <div class="stat-num ${s.cls}" data-target="${s.val}">${s.val}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');

  hero.innerHTML = `
    <div class="hero-eyebrow">Your Learning Path</div>
    <h1>Build real<br><span class="accent">hardware</span> that <span class="accent-warm">works</span></h1>
    <p class="hero-sub">One concept at a time. Each idea connects to the next — like nodes in a circuit. Short, real, no fluff.</p>
    <div class="hero-stats">${statsHtml}</div>
    <div class="overall-progress">
      <div class="overall-progress-header">
        <div class="overall-progress-label">Overall progress</div>
        <div class="overall-progress-pct" id="heroPct">0%</div>
      </div>
      <div class="big-progress-bar">
        <div class="big-progress-fill" id="heroProgressFill" style="width:0%"></div>
      </div>
      <div class="overall-progress-sub">${learned} of ${total} concepts marked as learned</div>
    </div>
    <div class="path-cards" id="pathCards"></div>
    <div class="roadmap-section">
      <div class="roadmap-title">The Hardware Builder Path</div>
      ${SECTIONS.map((s, i) => `
        <div class="roadmap-step">
          <div class="roadmap-dot" style="background:${['#00d4ff','#ff7a2f','#34d399','#a78bfa','#f59e0b'][i % 5]};box-shadow:0 0 10px ${['#00d4ff','#ff7a2f','#34d399','#a78bfa','#f59e0b'][i % 5]}"></div>
          <div>
            <div class="roadmap-step-title">${s.title}</div>
            <div class="roadmap-step-sub">${s.subtitle}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  const cards = hero.querySelector('#pathCards');
  SECTIONS.forEach((section, idx) => {
    const total = section.concepts.length;
    const done = section.concepts.filter(c => learnedIds.has(c.id)).length;
    const p = total ? Math.round(done / total * 100) : 0;
    const numStr = String(idx + 1).padStart(2, '0');

    const card = el('div', { class: 'path-card' });
    card.innerHTML = `
      <div class="path-card-num">${numStr}</div>
      <span class="path-card-icon">${section.icon}</span>
      <h3>${section.title}</h3>
      <p>${section.subtitle}</p>
      <div class="path-card-progress">
        <div class="path-card-bar" data-width="${p}" style="width:0%"></div>
      </div>
      <div class="path-card-count">${done}/${total} · ${p}%</div>
    `;
    addRipple(card);
    card.addEventListener('click', () => {
      currentSection = section.id;
      renderSection(section.id);
      setSidebarActive(section.id);
    });
    cards.appendChild(card);
  });

  mainEl.appendChild(hero);

  // Animate stats and progress bars after paint
  requestAnimationFrame(() => {
    // Animate progress fill
    const fill = document.getElementById('heroProgressFill');
    const pctEl = document.getElementById('heroPct');
    if (fill) {
      setTimeout(() => {
        fill.style.width = pct + '%';
        animateCounter(pctEl, 0, pct, 800, v => v + '%');
      }, 200);
    }

    // Animate card bars
    document.querySelectorAll('.path-card-bar[data-width]').forEach((bar, i) => {
      setTimeout(() => {
        bar.style.width = bar.dataset.width + '%';
      }, 300 + i * 80);
    });

    // Animate stat numbers
    document.querySelectorAll('.stat-num[data-target]').forEach((el, i) => {
      const target = parseInt(el.dataset.target);
      setTimeout(() => {
        animateCounter(el, 0, target, 700 + i * 100);
      }, 100 + i * 80);
    });
  });
}

// ── Section View ───────────────────────────────────────────────────────────
function renderSection(sectionId, scrollToId = null) {
  const section = SECTIONS.find(s => s.id === sectionId);
  if (!section) return;

  const total = section.concepts.length;
  const done = section.concepts.filter(c => learnedIds.has(c.id)).length;
  const pct = total ? Math.round(done / total * 100) : 0;

  mainEl.innerHTML = '';
  const view = el('div', { class: 'section-view' });

  view.innerHTML = `
    <div class="section-view-back" id="backBtn">← Back to Home</div>
    <div class="section-view-header">
      <span class="section-view-icon">${section.icon}</span>
      <h2>${section.title}</h2>
    </div>
    <p class="section-view-meta">${section.subtitle}</p>
    <div class="section-progress-bar">
      <div class="section-progress-fill" id="secProgressFill" style="width:0%"></div>
    </div>
    <div class="section-progress-label" id="secProgressLabel">${done}/${total} concepts learned (${pct}%)</div>
    <div id="conceptList"></div>
  `;

  view.querySelector('#backBtn').addEventListener('click', () => {
    currentSection = null;
    renderHome();
    setSidebarActive('home');
  });

  mainEl.appendChild(view);

  const list = view.querySelector('#conceptList');
  section.concepts.forEach((concept, i) => {
    const card = buildConceptCard(concept, i);
    list.appendChild(card);
  });

  requestAnimationFrame(() => {
    const fill = document.getElementById('secProgressFill');
    if (fill) setTimeout(() => { fill.style.width = pct + '%'; }, 100);

    if (scrollToId) {
      setTimeout(() => {
        const target = document.getElementById('card-' + scrollToId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          target.classList.add('expanded');
        }
      }, 200);
    }
  });
}

// ── Search ─────────────────────────────────────────────────────────────────
function renderSearch(query) {
  const q = query.toLowerCase();
  const results = ALL_CONCEPTS.filter(c =>
    c.title.toLowerCase().includes(q) ||
    c.blurb.toLowerCase().includes(q) ||
    c.chain.some(step => step.toLowerCase().includes(q)) ||
    (c.facts || []).some(f => f.toLowerCase().includes(q)) ||
    c.detail.toLowerCase().includes(q)
  );

  mainEl.innerHTML = '';
  const view = el('div', { class: 'search-view' });
  view.innerHTML = `<h2><span>${results.length} result${results.length !== 1 ? 's' : ''}</span> for "${query}"</h2>`;

  if (results.length === 0) {
    view.innerHTML += `<div class="search-empty">No concepts found for "${query}".<br>Try a shorter or different term.</div>`;
  } else {
    const list = el('div');
    results.forEach((concept, i) => list.appendChild(buildConceptCard(concept, i)));
    view.appendChild(list);
  }

  mainEl.appendChild(view);
}

// ── Concept Card ───────────────────────────────────────────────────────────
function buildConceptCard(concept, index) {
  const isLearned = learnedIds.has(concept.id);
  const card = el('div', {
    class: `concept-card${isLearned ? ' learned' : ''}`,
    id: `card-${concept.id}`
  });
  card.style.animationDelay = `${Math.min(index * 0.04, 0.32)}s`;

  const tagsHtml = concept.tags.map(t =>
    `<span class="tag tag-${t}">${tagLabel(t)}</span>`
  ).join('');

  const chainHtml = concept.chain.map((step, i) =>
    `<span class="chain-node">${step}</span>${i < concept.chain.length - 1 ? '<span class="chain-arrow">→</span>' : ''}`
  ).join('');

  const factsHtml = concept.facts && concept.facts.length
    ? concept.facts.map(f => `<span class="fact-pill">${f}</span>`).join('')
    : '';

  const detailHtml = concept.detail
    .split('\n')
    .map(line => {
      if (line.startsWith('•')) return `<div style="margin:4px 0 4px 14px;font-size:14px;">${line}</div>`;
      if (line.trim() === '') return '<div style="height:8px"></div>';
      return `<div style="font-size:14px;margin:2px 0">${line}</div>`;
    })
    .join('');

  card.innerHTML = `
    <div class="concept-card-top">
      <div class="concept-check" title="Mark as learned">✓</div>
      <div class="concept-card-header">
        <div class="concept-title-row">
          <span class="concept-title">${concept.title}</span>
          ${tagsHtml}
        </div>
        <div class="chain">${chainHtml}</div>
        <div class="concept-blurb">${concept.blurb}</div>
      </div>
      <span class="concept-card-expand-icon">▼</span>
    </div>
    <div class="concept-card-body">
      <div class="detail-section">
        <div class="detail-label">How it works</div>
        <div class="detail-text">${detailHtml}</div>
      </div>
      ${concept.memory ? `
      <div class="detail-section">
        <div class="detail-label">Remember it as</div>
        <div class="memory-tip"><span class="memory-tip-icon">💡</span>${concept.memory.replace(/\n/g, '<br>')}</div>
      </div>` : ''}
      ${concept.examTip ? `
      <div class="detail-section">
        <div class="detail-label">Build tip</div>
        <div class="exam-tip">⚡ ${concept.examTip}</div>
      </div>` : ''}
      ${factsHtml ? `
      <div class="detail-section">
        <div class="detail-label">Quick facts</div>
        <div class="key-facts">${factsHtml}</div>
      </div>` : ''}
      <button class="learn-btn" data-id="${concept.id}">
        ${isLearned ? '✓ Marked as learned' : '○ Mark as learned'}
      </button>
    </div>
  `;

  // Toggle expand with ripple
  card.querySelector('.concept-card-top').addEventListener('click', e => {
    if (e.target.classList.contains('concept-check')) return;
    const wasExpanded = card.classList.contains('expanded');
    card.classList.toggle('expanded');
    if (!wasExpanded) spawnRipple(e, card);
  });

  card.querySelector('.concept-check').addEventListener('click', e => {
    e.stopPropagation();
    toggleLearned(concept.id, card);
  });

  card.querySelector('.learn-btn').addEventListener('click', () => {
    toggleLearned(concept.id, card);
  });

  return card;
}

// ── Learned toggle ─────────────────────────────────────────────────────────
function toggleLearned(conceptId, cardEl) {
  const nowLearned = !learnedIds.has(conceptId);
  if (nowLearned) {
    learnedIds.add(conceptId);
    cardEl.classList.add('learned');
    const btn = cardEl.querySelector('.learn-btn');
    if (btn) btn.textContent = '✓ Marked as learned';
    spawnConfetti(cardEl);
    showToast('✓ Concept learned!');
  } else {
    learnedIds.delete(conceptId);
    cardEl.classList.remove('learned');
    const btn = cardEl.querySelector('.learn-btn');
    if (btn) btn.textContent = '○ Mark as learned';
    showToast('Unmarked');
  }
  saveLearned();
  updateProgressPill();
  updateSectionProgress();
  rebuildSidebarItems();
}

function saveLearned() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...learnedIds]));
}

function updateProgressPill() {
  const total = ALL_CONCEPTS.length;
  const done = learnedIds.size;
  pillTotal.textContent = total;
  animateCounter(pillNum, parseInt(pillNum.textContent) || 0, done, 400);
}

function updateSectionProgress() {
  const fillEl = document.getElementById('secProgressFill');
  const labelEl = document.getElementById('secProgressLabel');
  if (!fillEl || !currentSection) return;
  const section = SECTIONS.find(s => s.id === currentSection);
  if (!section) return;
  const total = section.concepts.length;
  const done = section.concepts.filter(c => learnedIds.has(c.id)).length;
  const pct = total ? Math.round(done / total * 100) : 0;
  fillEl.style.width = pct + '%';
  if (labelEl) labelEl.textContent = `${done}/${total} concepts learned (${pct}%)`;
}

function rebuildSidebarItems() {
  sidebarEl.querySelectorAll('.sidebar-item[data-concept-id]').forEach(item => {
    const id = item.dataset.conceptId;
    const concept = ALL_CONCEPTS.find(c => c.id === id);
    if (!concept) return;
    renderSidebarItem(item, concept);
  });
}

// ── Animations ─────────────────────────────────────────────────────────────
function animateCounter(el, from, to, duration, format) {
  const start = performance.now();
  const update = now => {
    const t = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    const val = Math.round(from + (to - from) * ease);
    el.textContent = format ? format(val) : val;
    if (t < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function spawnRipple(e, container) {
  const rect = container.getBoundingClientRect();
  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  const size = Math.max(rect.width, rect.height) * 2;
  ripple.style.cssText = `
    width:${size}px;height:${size}px;
    left:${e.clientX - rect.left - size/2}px;
    top:${e.clientY - rect.top - size/2}px;
  `;
  container.style.position = 'relative';
  container.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
}

function addRipple(el) {
  el.addEventListener('click', e => spawnRipple(e, el));
}

function spawnConfetti(cardEl) {
  const rect = cardEl.getBoundingClientRect();
  const colors = ['#00d4ff', '#ff7a2f', '#34d399', '#a78bfa', '#fbbf24'];
  for (let i = 0; i < 18; i++) {
    const particle = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 6 + 4;
    const angle = (Math.random() * 360) * Math.PI / 180;
    const dist = Math.random() * 80 + 40;
    const startX = rect.left + rect.width / 2;
    const startY = rect.top;

    particle.style.cssText = `
      position:fixed;
      left:${startX}px;top:${startY}px;
      width:${size}px;height:${size}px;
      background:${color};
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      pointer-events:none;
      z-index:9999;
      transition:all 0.7s cubic-bezier(0.4,0,0.2,1);
      box-shadow:0 0 6px ${color};
    `;
    document.body.appendChild(particle);

    requestAnimationFrame(() => {
      particle.style.transform = `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist - 40}px) rotate(${Math.random()*360}deg)`;
      particle.style.opacity = '0';
    });
    setTimeout(() => particle.remove(), 800);
  }
}

let toastTimer;
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2000);
}

// ── Helpers ────────────────────────────────────────────────────────────────
function el(tag, attrs = {}, text = '') {
  const e = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === 'class') e.className = v;
    else e.setAttribute(k, v);
  });
  if (text) e.textContent = text;
  return e;
}

function tagLabel(tag) {
  return { basic: 'Basics', micro: 'MCU', robo: 'Robotics', proto: 'Build' }[tag] || tag;
}

// ── Boot ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', init);
