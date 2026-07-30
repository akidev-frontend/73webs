// Cambio de idioma ES/CA. Escribe html[lang] y lo persiste en localStorage.
// El CSS de styles/base.css oculta el idioma no activo.
(function () {
  var s = localStorage.getItem('lang');
  if (s === 'ca' || s === 'es') document.documentElement.lang = s;
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-set]');
    if (!b) return;
    var l = b.getAttribute('data-set');
    document.documentElement.lang = l;
    try { localStorage.setItem('lang', l); } catch (_) {}
  });
})();
