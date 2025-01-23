---
"sit-onyx": major
---

- feat(grid): new `onyx-grid-span-full` class which enables an element to always span the full row width.
- fix(grid)!: fix issues regarding optional max columns.
  **BREAKING CHANGE:** The default maximum number of columns is `12` (before it was `16`).
  The `onyx-grid-xl-20` class now also sets `16` columns for the `lg` breakpoint.
  The new `onyx-grid-lg-16` class sets `16` columns for the `lg` and `xl` breakpoint.
