/* ==========================================================================
   animations.js — Scroll reveal via Intersection Observer
   - Targets [data-reveal] elements.
   - Adds .revealed when entering the viewport (threshold 0.15).
   - Respects prefers-reduced-motion (reveals everything immediately).
   - No external dependency.
   ========================================================================== */
(function () {
  "use strict";

  function ready(fn) {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  ready(function () {
    var targets = document.querySelectorAll("[data-reveal]");
    if (!targets.length) return;

    var prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // No IntersectionObserver support or reduced motion: reveal all now.
    if (prefersReduced || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) {
        el.classList.add("revealed");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  });
})();
