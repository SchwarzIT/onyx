---
"sit-onyx": minor
---

feat(OnyxPagination): add compact type with automatic breakpoint detection

- Add new `compact` pagination type with a more space-efficient layout
- Add `compactFlyoutDisabled` prop to disable flyout in compact mode (useful for cursor-based pagination)
- Add `autoTypeDetection` prop (default: `true`) to automatically switch to compact type on viewports smaller than `xs` breakpoint
- Add `useViewportWidth` composable for tracking viewport width changes

The compact pagination type provides a more mobile-friendly alternative that automatically adapts to smaller screens while maintaining full functionality.
