/* ============================================================
   MUTIARA GRACELLA — PRO PORTFOLIO SCRIPTS (multi-page)
   scripts/main.js
   ============================================================ */
(function () {
  'use strict';

  /* ── SMOOTH SCROLL (in-page anchors only) ────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      var el = document.querySelector(id);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior:'smooth' }); }
    });
  });

  /* ── SCROLL REVEAL ───────────────────────────────────────── */
  document.querySelectorAll('.sec > *, .hero-sec > *').forEach(function (el) {
    el.classList.add('reveal-pro');
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold:0.07 });
  document.querySelectorAll('.reveal-pro').forEach(function (el) { io.observe(el); });

  /* ── SKILL BARS ANIMATE ──────────────────────────────────── */
  var bars = document.querySelectorAll('.sk-bar');
  var barObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        setTimeout(function () { e.target.classList.add('animated'); }, 100);
        barObserver.unobserve(e.target);
      }
    });
  }, { threshold:0.5 });
  bars.forEach(function (b) { barObserver.observe(b); });

  /* ── COUNTER ANIMATE ─────────────────────────────────────── */
  function countUp(el, target, suffix) {
    var start = 0, dur = 1400, t0 = null;
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(start + (target - start) * ease) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var numObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      var raw = parseInt(el.dataset.count || el.textContent);
      var suffix = el.dataset.suffix || (el.textContent.includes('+') ? '+' : el.textContent.includes('%') ? '%' : '');
      if (!isNaN(raw)) countUp(el, raw, suffix);
      numObs.unobserve(el);
    });
  }, { threshold:0.8 });
  document.querySelectorAll('.hs-num').forEach(function (el) { numObs.observe(el); });

  /* ── LIGHTBOX ────────────────────────────────────────────── */
  var lb  = document.getElementById('lbPro');
  var img = document.getElementById('lbImg');
  var cap = document.getElementById('lbCap');

  window.openCert = function (src, caption) {
    img.src = src; img.alt = caption;
    if (cap) cap.textContent = caption;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  window.closeCert = function () {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function () { img.src = ''; }, 250);
  };

  /* Cert strip click */
  document.querySelectorAll('.cs-item').forEach(function (item) {
    item.addEventListener('click', function () {
      var i = item.querySelector('img');
      if (i) openCert(i.src, item.querySelector('.cs-label').textContent.trim());
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeCert();
  });

})();
