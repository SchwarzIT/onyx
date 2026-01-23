---
"sit-onyx": minor
---

feat(OnyxPagination): add compact type and automatic breakpoint detection

- Add new `type="compact"` pagination with a more space-efficient layout
- Add `disableFlyout` property to disable the flyout in select or compact mode (useful for cursor-based pagination)
- Add `autoCompact` property (default: `true`) to automatically switch to compact type when viewport is smaller than a given breakpoint

The compact pagination type provides a more mobile-friendly alternative that automatically adapts to smaller screens while maintaining full functionality.
