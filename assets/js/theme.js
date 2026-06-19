/* ==========================================================================
   theme.js — Dark/light mode toggle for maximized.site
   - Reads system preference on load.
   - Applies data-theme to <html>.
   - Toggles via [data-theme-toggle] button.
   - In-memory only: no localStorage/sessionStorage (blocked in some contexts).
   ========================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  var media = window.matchMedia("(prefers-color-scheme: dark)");

  // In-memory current theme; defaults to system preference.
  var currentTheme = media.matches ? "dark" : "light";

  function applyTheme(theme) {
    currentTheme = theme;
    root.setAttribute("data-theme", theme);
    updateToggles(theme);
  }

  function updateToggles(theme) {
    var toggles = document.querySelectorAll("[data-theme-toggle]");
    var isDark = theme === "dark";
    toggles.forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(isDark));
      var label = isDark ? "Switch to light theme" : "Switch to dark theme";
      btn.setAttribute("aria-label", label);
      btn.setAttribute("title", label);
    });
  }

  function toggleTheme() {
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  }

  // Apply initial theme immediately.
  applyTheme(currentTheme);

  // Follow system changes only until the user manually overrides.
  var userOverridden = false;
  media.addEventListener("change", function (event) {
    if (!userOverridden) {
      applyTheme(event.matches ? "dark" : "light");
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    updateToggles(currentTheme);
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        userOverridden = true;
        toggleTheme();
      });
    });
  });
})();
