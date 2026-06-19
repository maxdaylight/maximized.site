/* ==========================================================================
   nav.js — Mobile nav toggle + active link highlighting for maximized.site
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
    var toggle = document.getElementById("nav-toggle");
    var nav = document.getElementById("primary-nav");

    /* ---- Mobile hamburger toggle ---------------------------------------- */
    if (toggle && nav) {
      var setExpanded = function (expanded) {
        toggle.setAttribute("aria-expanded", String(expanded));
        nav.classList.toggle("nav-open", expanded);
      };

      toggle.addEventListener("click", function () {
        var expanded = toggle.getAttribute("aria-expanded") === "true";
        setExpanded(!expanded);
      });

      // Close when clicking outside the nav/toggle.
      document.addEventListener("click", function (event) {
        if (!nav.classList.contains("nav-open")) return;
        var target = event.target;
        if (!nav.contains(target) && !toggle.contains(target)) {
          setExpanded(false);
        }
      });

      // Close on Escape and return focus to the toggle.
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && nav.classList.contains("nav-open")) {
          setExpanded(false);
          toggle.focus();
        }
      });

      // Close after navigating via a link (mobile).
      nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          setExpanded(false);
        });
      });
    }

    /* ---- Active link highlighting --------------------------------------- */
    var links = document.querySelectorAll(".primary-nav__link");
    var path = window.location.pathname.replace(/\/index\.html$/, "/");

    links.forEach(function (link) {
      var href = link.getAttribute("href");
      if (!href) return;

      // Normalize: strip leading ./ and trailing slash for comparison.
      var linkPath = href.replace(/^\.\//, "").replace(/^\//, "");
      var current = path.replace(/^\//, "");

      var isHome =
        (linkPath === "index.html" || linkPath === "") &&
        (current === "" || current === "index.html");

      if (isHome || (linkPath !== "" && current === linkPath)) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  });
})();
