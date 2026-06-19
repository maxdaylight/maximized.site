/* ==========================================================================
   contact.js — Ajax submission for the Formspree contact form
   - Progressive enhancement: the form still POSTs natively without JS.
   - Submits via fetch with an Accept: application/json header so Formspree
     responds with JSON instead of redirecting.
   - Shows inline success/error states and disables the button while sending.
   - No external dependencies.
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
    var form = document.getElementById("contact-form");
    if (!form || !("fetch" in window) || !("FormData" in window)) return;

    var submitBtn = form.querySelector("[data-form-submit]");
    var successEl = form.querySelector("[data-form-success]");
    var errorEl = form.querySelector("[data-form-error]");
    var defaultBtnText = submitBtn ? submitBtn.textContent : "Send message";
    var defaultErrorText = errorEl ? errorEl.textContent : "";

    function hide(el) {
      if (el) el.classList.add("is-hidden");
    }

    function show(el) {
      if (el) el.classList.remove("is-hidden");
    }

    function setSubmitting(isSubmitting) {
      if (!submitBtn) return;
      submitBtn.disabled = isSubmitting;
      submitBtn.textContent = isSubmitting ? "Sending\u2026" : defaultBtnText;
    }

    function showError(message) {
      if (errorEl) {
        errorEl.textContent = message || defaultErrorText;
        show(errorEl);
      }
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      hide(successEl);
      hide(errorEl);
      setSubmitting(true);

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          return response.json().then(function (data) {
            return { ok: response.ok, data: data };
          });
        })
        .then(function (result) {
          if (result.ok) {
            // Reveal the success message and clear the inputs.
            form.reset();
            show(successEl);
            if (successEl && typeof successEl.focus === "function") {
              successEl.setAttribute("tabindex", "-1");
              successEl.focus();
            }
          } else {
            var message = defaultErrorText;
            if (result.data && Array.isArray(result.data.errors) && result.data.errors.length) {
              message = result.data.errors
                .map(function (err) {
                  return err.message;
                })
                .join(" ");
            }
            showError(message);
          }
        })
        .catch(function () {
          showError(defaultErrorText);
        })
        .then(function () {
          setSubmitting(false);
        });
    });
  });
})();
