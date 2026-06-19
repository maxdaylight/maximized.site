# Accessibility Audit

Audit accessibility of: [filename.html or "all pages"]

Check for:
1. Skip-to-content link as first focusable element
2. One <header>, one <main>, one <footer>, <nav aria-label="Primary">
3. All <img> have alt (empty for decorative, descriptive for content)
4. All <input> have associated <label>
5. All icon-only <button> have aria-label
6. No heading levels skipped
7. All interactive elements reachable via Tab key
8. Focus indicators visible (never outline:none without replacement)
9. Color contrast: body text 4.5:1 minimum, large text 3:1 minimum
10. All touch targets 44×44px minimum
11. prefers-reduced-motion respected for all transitions/animations
12. No use of role/aria where native HTML semantic suffices

Report findings and fix all issues found.
