---
"sit-onyx": major
---

refactor grid implementation

The grid implementation has been refactored in its core. The breaking changes are:

- renamed CSS variable `--onyx-grid-gutter` to `--onyx-grid-gap`
- renamed CSS variable `--onyx-grid-margin` to `--onyx-grid-padding`
- use container queries instead of media queries to allow for nested grids
- remove padding, max-width and center from the `onyx-grid` class in favor of the `onyx-page__content` class
