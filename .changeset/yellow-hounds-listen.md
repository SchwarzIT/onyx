---
"sit-onyx": minor
---

implement auto active state for OnyxNavButton, OnyxNavItem and OnyxMenuItem

By default, the OnyxNavButton, OnyxNavItem and OnyxMenuitem will now manage they active state automatically based on the current route if a [router](https://onyx.schwarz/development/router.html) is provided.

You can manually set the active state (`true` or `false`) to override/disable this behavior.
