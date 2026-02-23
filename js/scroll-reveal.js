/**
 * Scroll reveal: añade .is-visible a los elementos cuando entran en el viewport.
 * Los elementos con .reveal-on-scroll se animan al hacer scroll.
 */
(function () {
  'use strict';

  var observed = new Set();

  var selectors = [
    '.intro-ea-row',
    '.intro-ea-headline-wrap',
    '.intro-ea-lead-wrap',
    '.intro-ea-video-wrap',
    '.intro-ea-content',
    '.section .container',
    '.sobre-card',
    '.proyecto-card',
    '.grupo-card',
    '.programa-item',
    '.proyecto-realizado-card',
    '.sobre-autora-inner',
    '.tienda-header',
    '.tienda-areas',
    '.tienda-card',
    '.tienda-area-card',
    '.tienda-credito',
    '.coffee-chat-card',
    '.abre-grupo .container',
    '.cursos-coffee-chat',
  ].join(',');

  function observeElements() {
    var elements = document.querySelectorAll(selectors);
    elements.forEach(function (el) {
      if (observed.has(el)) return;
      observed.add(el);
      el.classList.add('reveal-on-scroll');
      observer.observe(el);
    });
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { rootMargin: '0px 0px -50px 0px', threshold: 0.05 }
  );

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      observeElements();
      setTimeout(observeElements, 600);
    });
  } else {
    observeElements();
    setTimeout(observeElements, 600);
  }
})();
