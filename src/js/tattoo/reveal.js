// Scroll reveal: marca elementos con [data-reveal] y les añade .is-visible al entrar en viewport.
// Escalona los hijos de las rejillas con transition-delay.
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var sel = '.hero .eyebrow, .hero h1, .hero p.lead, .hero-actions, section > .wrap > .eyebrow, .lead-head, .sub, .pain-card, .sol-item, .svc, .trust-quote, .stars, .trust-name, .final h2, .final p';
  var els = Array.prototype.slice.call(document.querySelectorAll(sel));
  els.forEach(function (el) { el.setAttribute('data-reveal', ''); });
  document.querySelectorAll('.pain-grid, .sol-list, .svc-grid').forEach(function (grid) {
    Array.prototype.slice.call(grid.children).forEach(function (child, i) {
      child.style.transitionDelay = (i * 90) + 'ms';
    });
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach(function (el) { io.observe(el); });
})();
