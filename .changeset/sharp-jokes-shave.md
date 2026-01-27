---
"sit-onyx": minor
---

feat(OnyxPagination): add compact type and automatic breakpoint detection

- add new `type="compact"` pagination with a more space-efficient layout
- add `disableFlyout` property to disable the flyout in select or compact mode (useful for cursor-based pagination)
- add `autoCompact` property to automatically switch to compact type when viewport is smaller than a given breakpoint

The compact pagination type provides a more mobile-friendly alternative that supports automatically adapting to smaller screens while maintaining full functionality.
