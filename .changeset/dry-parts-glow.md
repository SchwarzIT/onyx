---
"@sit-onyx/storybook-utils": major
---

feat: support Storybook 9

This package now supports (and requires) Storybook version `>= 9.0.0`. When updating, please look into the official [Storybook migration guide](https://storybook.js.org/docs/migration-guide) and make all relevant changes to your project.

In addition, the following breaking changes need to be migrate when using this `@sit-onyx/storybook-utils` package:

#### Replaced storybook-dark-mode package

The `storybook-dark-mode` package was replaced with the maintenance fork `@vueless/storybook-dark-mode`. See [this issue](https://github.com/hipstersmoothie/storybook-dark-mode/issues/295#issuecomment-2938151892) for further information. To migrate:

- replace `storybook-dark-mode` with `@vueless/storybook-dark-mode` in your `.storybook/main.ts` file
- install `@vueless/storybook-dark-mode` (as devDependency)
- uninstall package `storybook-dark-mode`
