/**
 * main.js – Loads HTML section partials into index.html
 * and handles navigation / UI interactivity.
 */

const SECTIONS = [
  { id: 'header',         file: 'header.html',         label: 'Perfil'         },
  { id: 'experiencia',    file: 'experiencia.html',     label: 'Experiencia'    },
  { id: 'educacion',      file: 'educacion.html',       label: 'Educación'      },
  { id: 'skills',         file: 'skills.html',          label: 'Habilidades'    },
  { id: 'certificaciones',file: 'certificaciones.html', label: 'Certificaciones'},
  { id: 'intereses',      file: 'intereses.html',       label: 'Intereses'      },
  { id: 'lenguajes',      file: 'lenguajes.html',       label: 'Lenguajes'      },
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
    container.innerHTML = `<p class="section-error">⚠ No se pudo cargar ${section.file}</p>`;
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

/* ── Bootstrap ── */
async function init() {
  buildSideNav();
  initScrollTop();

  // Load all sections in parallel
  await Promise.all(SECTIONS.map(loadSection));

  // After all sections loaded, init animations
  initLangBars();
  updateActiveNav();
}

document.addEventListener('DOMContentLoaded', init);
