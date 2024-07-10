---
"sit-onyx": patch
---

fix(OnyxMobileNavButton): scroll on overflowing mobile flyout

The flyout of OnyxMobileNavButton now has a max height and is scrollable if too many nav/context items exist.

- app version inside the mobile flyout is not positioned absolute anymore and is a disabled list item
- fixed duplicate border in mobile context menu when multiple list items exist
