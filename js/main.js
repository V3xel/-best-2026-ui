/* ============================================
   Best 2026 UI/UX Styles — Main JS
   ============================================ */

// ---- DARK MODE ----
const themeToggle = document.getElementById('themeToggle');
const toggleIcon  = themeToggle.querySelector('.toggle-icon');

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  toggleIcon.textContent = theme === 'dark' ? '☾' : '☀';
}

// ---- STICKY NAV ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 10
    ? '0 1px 20px rgba(0,0,0,0.08)'
    : 'none';
});

// ---- COMPONENT TABS ----
const tabBtns    = document.querySelectorAll('.tab-btn');
const tabPanels  = document.querySelectorAll('.component-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabBtns.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    const panel = document.getElementById('tab-' + target);
    if (panel) panel.classList.add('active');
  });
});

// ---- SWATCH COPY TO CLIPBOARD ----
document.querySelectorAll('.swatch').forEach(swatch => {
  swatch.addEventListener('click', () => {
    const hex = swatch.title;
    if (!hex) return;
    navigator.clipboard.writeText(hex).then(() => {
      showToast('Copied ' + hex);
    }).catch(() => {});
  });
});

// ---- TOAST ----
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(8px);
      background: #0f0f0f;
      color: #fff;
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      opacity: 0;
      transition: all 0.2s ease;
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(8px)';
  }, 2000);
}

// ---- SCROLL REVEAL ----
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity    = '1';
      entry.target.style.transform  = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.style-card, .type-card, .palette-group').forEach(el => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(20px)';
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  observer.observe(el);
});
