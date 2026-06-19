/* ==========================================================================
   utils.js — Shared utility helpers for maximized.site
   Exposed on window.MX for use by other scripts/pages. No dependencies.
   ========================================================================== */
(function () {
  "use strict";

  /**
   * Run a callback once the DOM is ready.
   * @param {Function} fn
   */
  function ready(fn) {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  /**
   * Debounce a function by `wait` ms.
   * @param {Function} fn
   * @param {number} wait
   * @returns {Function}
   */
  function debounce(fn, wait) {
    var timer;
    return function () {
      var ctx = this;
      var args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(ctx, args);
      }, wait);
    };
  }

  /**
   * Shorthand querySelector / querySelectorAll.
   */
  function qs(selector, scope) {
    return (scope || document).querySelector(selector);
  }
  function qsa(selector, scope) {
    return Array.prototype.slice.call(
      (scope || document).querySelectorAll(selector)
    );
  }

  /**
   * Set the year in any [data-current-year] element.
   */
  ready(function () {
    var year = String(new Date().getFullYear());
    qsa("[data-current-year]").forEach(function (el) {
      el.textContent = year;
    });
  });

  window.MX = {
    ready: ready,
    debounce: debounce,
    qs: qs,
    qsa: qsa
  };
})();
