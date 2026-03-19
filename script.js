(function () {
  'use strict';

  var elements = document.querySelectorAll('.fade-up');

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, i) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var siblings = Array.from(elements).filter(function(e) {
        return e.parentElement === el.parentElement;
      });
      var delay = siblings.indexOf(el) * 80;
      setTimeout(function() { el.classList.add('visible'); }, delay);
      observer.unobserve(el);
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

  elements.forEach(function(el) { observer.observe(el); });

  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function() {
      header.style.boxShadow = window.scrollY > 20 ? '0 1px 16px rgba(0,0,0,0.07)' : 'none';
    }, { passive: true });
  }
})();
