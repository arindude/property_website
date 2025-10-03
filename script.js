// Mobile navigation toggle
const body = document.body;
const toggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (toggle && navMenu) {
  toggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    body.classList.toggle('nav-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.textContent = isOpen ? 'Close' : 'Menu';
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (!navMenu.classList.contains('is-open')) return;
      navMenu.classList.remove('is-open');
      body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Menu';
    });
  });
}

// Highlight current nav item
const pageKey = body?.dataset?.page;
if (pageKey) {
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === pageKey) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

// IntersectionObserver for reveal animations
const revealNodes = document.querySelectorAll('.reveal');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const hideThreshold = 0.08;
  const showThreshold = 0.18;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= showThreshold) {
        entry.target.classList.add('visible');
        return;
      }

      if (!entry.isIntersecting || entry.intersectionRatio <= hideThreshold) {
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: [0, hideThreshold, showThreshold, 0.35, 0.6, 0.85, 1], rootMargin: '0px 0px -5% 0px' });

  revealNodes.forEach(node => observer.observe(node));
} else {
  revealNodes.forEach(node => node.classList.add('visible'));
}

// Footer year update
const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}
