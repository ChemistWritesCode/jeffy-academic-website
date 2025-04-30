document.addEventListener('DOMContentLoaded', () => {
  // — Dark-mode toggle (sun ↔️ moon)
  const btn  = document.getElementById('theme-toggle');
  const icon = btn.querySelector('.theme-icon');
  const saved = localStorage.getItem('prefers-dark');

  // Initialize
  const useDark = saved === 'true'
    ? true
    : saved === 'false'
      ? false
      : window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (useDark) {
    document.body.classList.add('dark-mode');
    icon.textContent = '🌙';
  } else {
    document.body.classList.remove('dark-mode');
    icon.textContent = '🌞';
  }

  btn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    icon.textContent = isDark ? '🌙' : '🌞';
    localStorage.setItem('prefers-dark', isDark);
  });

  // — Header scroll effect
  const header = document.querySelector('.site-header');
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    header.classList.toggle('header-scrolled', y > 10);
    header.classList.toggle('header-hidden', y > lastY && y > 150);
    lastY = y;
  });

  // — Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  menuToggle?.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('show');
    document.body.classList.toggle('menu-open');
  });

  // — Scroll-reveal elements
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.section, .reveal').forEach(el => observer.observe(el));
});
