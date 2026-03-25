/**
 * main.js – Loads HTML section partials into index.html
 * and handles navigation / UI interactivity.
 */

const SECTIONS = [
  { id: 'header',         file: 'header.html',         label: 'Profile'         },
  { id: 'experiencia',    file: 'experiencia.html',     label: 'Experience'      },
  { id: 'educacion',      file: 'educacion.html',       label: 'Education'       },
  { id: 'skills',         file: 'skills.html',          label: 'Skills'          },
  { id: 'certificaciones',file: 'certificaciones.html', label: 'Certifications'  },
  { id: 'intereses',      file: 'intereses.html',       label: 'Interests'       },
  { id: 'lenguajes',      file: 'lenguajes.html',       label: 'Languages'       },
];

/* ── Fetch & inject each section ── */
async function loadSection(section) {
  const container = document.getElementById(`slot-${section.id}`);
  if (!container) return;

  try {
    const res = await fetch(section.file);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    container.innerHTML = html;
  } catch (err) {
    container.innerHTML = `<p style="color:#888;font-size:.85rem;">⚠ Could not load ${section.file}</p>`;
    console.error(`[CV] Failed to load ${section.file}:`, err);
  }
}

/* ── Side-nav dots ── */
function buildSideNav() {
  const nav = document.getElementById('side-nav');
  if (!nav) return;

  SECTIONS.forEach(s => {
    const dot = document.createElement('span');
    dot.className = 'nav-dot';
    dot.dataset.target = `slot-${s.id}`;
    dot.dataset.label  = s.label;
    dot.title = s.label;
    dot.addEventListener('click', () => {
      document.getElementById(`slot-${s.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    nav.appendChild(dot);
  });
}

/* ── Active dot on scroll ── */
function updateActiveNav() {
  const dots = document.querySelectorAll('.nav-dot');
  const offset = window.innerHeight * 0.4;

  dots.forEach(dot => {
    const el = document.getElementById(dot.dataset.target);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const active = rect.top <= offset && rect.bottom > offset;
    dot.classList.toggle('active', active);
  });
}

/* ── Scroll-to-top button ── */
function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
    updateActiveNav();
  }, { passive: true });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── Animate language bars when visible ── */
function initLangBars() {
  const bars = document.querySelectorAll('.lang-bar[data-width]');
  if (!bars.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.width;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => {
    bar.style.width = '0%';
    observer.observe(bar);
  });
}

/* ── Dark / Light mode toggle ── */
function applyTheme(theme) {
  const btn = document.getElementById('theme-toggle');
  if (theme === 'light') {
    document.documentElement.dataset.theme = 'light';
    if (btn) { btn.textContent = '☀️'; btn.setAttribute('aria-label', 'Switch to dark mode'); }
  } else {
    delete document.documentElement.dataset.theme;
    if (btn) { btn.textContent = '🌙'; btn.setAttribute('aria-label', 'Switch to light mode'); }
  }
}

function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const saved = localStorage.getItem('cv-theme') || 'dark';
  applyTheme(saved);

  btn.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('cv-theme', next);
  });
}

/* ── Bootstrap ── */
async function init() {
  buildSideNav();
  initScrollTop();
  initThemeToggle();

  // Load all sections in parallel
  await Promise.all(SECTIONS.map(loadSection));

  // After all sections loaded, init animations
  initLangBars();
  updateActiveNav();
}

document.addEventListener('DOMContentLoaded', init);
