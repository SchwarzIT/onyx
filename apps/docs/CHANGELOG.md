# docs

## 1.0.0

### Major Changes

- f78c792: feat(Grid-Layout):
  - renamed onyx-grid-container to onyx-grid-layout
  - added new onyx-grid-container class
  - changed padding of onyx-grid-layout to have fixed top/bottom spacings
  - update grid to consider the current container instead of the viewport for applying breakpoints (changed from media-query to container-query)
  - added Tests for the sidebar grid.

- bf3ea0a: release beta version

  🎉 onyx is now beta! There are no breaking changes to the last `1.0.0.-alpha.*` version

### Minor Changes

- edbfc22: update getting started guide
  - add example for layout components
  - add example for customizing CSS

- 262459a: Adding a browserslist config file and corresponding Eslint plugin (compat). Code will be linted based on supported browsers. Docs now show a section on the homepage listing all supported browsers and versions.
- 181b681: fix(Docs): fixed the Font-Variables Docs.
- 05b233a: feat(i18n): support Korean Language for i18n
- df521cf: - added light/dark mode transition
  - created the useThemeTransition composable, which observes changes between light and dark mode and dynamically adds the onyx-transition-active class during the transition for a smooth visual effect. See our [docs](https://onyx.schwarz/development/typography.html) on how to use it.

### Patch Changes

- 25893ed: feat: add nuxt module to easily integrate onyx into nuxt projects
  - Add the global styles to the nuxt project
  - Auto imports all onyx components
  - Add nuxt section to the getting started guide

- 90c41e3: test version 1 release pipeline
- 529a84f: feat(nuxt): integrate @nuxtjs/i18n into onyx nuxt module
- 981495f: Require mapping of onyx locales to the project ones.

  This change was necessary because registering all languages supported by onyx would force the project to also support them due to the way locales are merged by nuxt-i18n.

- 3385622: Support themes in nuxt module
- da2523f: fix(OnyxBorderRadiusTokens): Fix background color

## 1.0.0-beta.6

### Major Changes

- f78c792: feat(Grid-Layout):
  - renamed onyx-grid-container to onyx-grid-layout
  - added new onyx-grid-container class
  - changed padding of onyx-grid-layout to have fixed top/bottom spacings
  - update grid to consider the current container instead of the viewport for applying breakpoints (changed from media-query to container-query)
  - added Tests for the sidebar grid.

## 1.0.0-beta.5

### Minor Changes

- 181b681: fix(Docs): fixed the Font-Variables Docs.

## 1.0.0-beta.4

### Minor Changes

- df521cf: - added light/dark mode transition
  - created the useThemeTransition composable, which observes changes between light and dark mode and dynamically adds the onyx-transition-active class during the transition for a smooth visual effect. See our [docs](https://onyx.schwarz/development/typography.html) on how to use it.

## 1.0.0-beta.3

### Minor Changes

- 262459a: Adding a browserslist config file and corresponding Eslint plugin (compat). Code will be linted based on supported browsers. Docs now show a section on the homepage listing all supported browsers and versions.

## 1.0.0-beta.2

### Patch Changes

- da2523f: fix(OnyxBorderRadiusTokens): Fix background color

## 1.0.0-beta.1

### Patch Changes

- 3385622: Support themes in nuxt module

## 1.0.0-beta.0

### Major Changes

- bf3ea0a: release beta version

  🎉 onyx is now beta! There are no breaking changes to the last `1.0.0.-alpha.*` version

## 0.1.0-alpha.4

### Patch Changes

- 981495f: Require mapping of onyx locales to the project ones.

  This change was necessary because registering all languages supported by onyx would force the project to also support them due to the way locales are merged by nuxt-i18n.

## 0.1.0-alpha.3

### Patch Changes

- 529a84f: feat(nuxt): integrate @nuxtjs/i18n into onyx nuxt module

## 0.1.0-alpha.2

### Minor Changes

- edbfc22: update getting started guide
  - add example for layout components
  - add example for customizing CSS

## 0.1.0-alpha.1

### Patch Changes

- 25893ed: feat: add nuxt module to easily integrate onyx into nuxt projects
  - Add the global styles to the nuxt project
  - Auto imports all onyx components
  - Add nuxt section to the getting started guide

## 0.1.0-alpha.0

### Minor Changes

- 05b233a: feat(i18n): support Korean Language for i18n
