/**
 * Capital Integral Investments — Teaser Institucional
 * script.js — Animaciones de scroll (Intersection Observer)
 * ─────────────────────────────────────────────────────
 * Activaciones progresivas con delay escalonado
 * Código limpio, sin dependencias externas
 */

(function () {
  'use strict';

  // ── 1. FADE-UP ON SCROLL ────────────────────────────
  const fadeElements = document.querySelectorAll('.fade-up');

  if (!fadeElements.length) return;

  const observerOptions = {
    root:       null,           // viewport
    rootMargin: '0px 0px -60px 0px',  // activar 60px antes del borde inferior
    threshold:  0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;

      // Delay escalonado para elementos dentro del mismo grid
      const siblings = [...fadeElements].filter(
        (e) => e.parentElement === el.parentElement
      );
      const siblingIdx = siblings.indexOf(el);
      const delay = siblingIdx > 0 ? siblingIdx * 80 : 0;

      setTimeout(() => {
        el.classList.add('visible');
      }, delay);

      // Una vez visible, deja de observar
      observer.unobserve(el);
    });
  }, observerOptions);

  fadeElements.forEach((el) => observer.observe(el));


  // ── 2. HEADER SHADOW ON SCROLL ──────────────────────
  const header = document.querySelector('.site-header');

  if (header) {
    const handleHeaderScroll = () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = '0 1px 16px rgba(0,0,0,0.07)';
      } else {
        header.style.boxShadow = 'none';
      }
    };

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll(); // estado inicial
  }


  // ── 3. HERO PARALLAX (SUTIL) ────────────────────────
  const heroContent = document.querySelector('.hero-content');

  if (heroContent && window.matchMedia('(min-width: 768px)').matches) {
    const handleParallax = () => {
      const scrolled = window.scrollY;
      const maxScroll = window.innerHeight;
      if (scrolled > maxScroll) return;

      const offset = scrolled * 0.25;
      heroContent.style.transform = `translateY(${offset}px)`;
      heroContent.style.opacity   = 1 - (scrolled / maxScroll) * 1.2;
    };

    window.addEventListener('scroll', handleParallax, { passive: true });
  }


  // ── 4. STAT COUNTER ANIMATION ───────────────────────
  const statNums = document.querySelectorAll('.stat-num');

  const animateCounter = (el) => {
    const raw = el.textContent.trim();

    // Solo animar si es puramente numérico
    const num = parseFloat(raw.replace(/[^\d.]/g, ''));
    if (isNaN(num) || raw.match(/[A-Za-z+]/)) return;

    const duration  = 900;
    const start     = performance.now();
    const isDecimal = raw.includes('.');
    const prefix    = raw.match(/^[^0-9]*/)?.[0] || '';
    const suffix    = raw.match(/[^0-9.]*$/)?.[0]  || '';

    const tick = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = num * eased;

      el.textContent = prefix +
        (isDecimal ? current.toFixed(1) : Math.floor(current)) +
        suffix;

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  statNums.forEach((el) => counterObserver.observe(el));

})();
