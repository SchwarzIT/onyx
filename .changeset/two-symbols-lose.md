---
"@sit-onyx/flags": patch
"@sit-onyx/icons": patch
---

prevent naming conflicts when using auto imports (e.g. from Nuxt)

We changed the minification mode when building the icons/flags.
This fixes the issue that occurred when import utils from e.g. `@sit-onyx/icons/utils` when using Nuxt.
The issue cause is that Nuxt provides auto imports which also includes the `h` function from "vue".
Since the minified icons and flags metadata also included am export named `h`, an error was thrown
