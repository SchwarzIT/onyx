---
"sit-onyx": minor
---

feat(OnyxDataGrid): Extended feature API with new 'enhanceCells' and 'enhanceRow' hooks

These allow modifying render details per cell/row.
The provided function is called for each cell/row, after the matching typeRenderer was applied.
