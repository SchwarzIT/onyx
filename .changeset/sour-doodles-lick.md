---
"@sit-onyx/nuxt-docs": patch
---

Fix some issues when trying to use the `@sit-onyx/nuxt-docs` package:

- remove no longer existing OnyxNavButton in favor of OnyxNavItem. Also include type-check into the build to prevent such issues in the future
- update docs to include missing required steps/configuration
- use peerDependencies instead of dependencies
- remove `useCollection` composable and move the code to the page directly because async composables are not yet fully supported
