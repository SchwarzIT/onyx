---
"sit-onyx": patch
---

fix(OnyxTooltip): use anchor-size(width) instead of translate

Reason: next to the viewport border the positioning wasn't set correctly,
because CSS transforms are not tracked by the collision
detection.
