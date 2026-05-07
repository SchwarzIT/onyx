# @sit-onyx/storybook-utils

## 1.1.3

### Patch Changes

- 08db793: fix: prevent broken code snippets when replacing onyx icons and flags

## 1.1.2

### Patch Changes

- b1254e8: fix(sourceCodeTransformer): Fix only first occurrence of a flag/icon svg content was being replaced by imported constant
- Updated dependencies
  - @sit-onyx/icons@1.7.0

## 1.1.1

### Patch Changes

- ffcee8c: fix: update `StorybookGlobalType` type to be based on Storybook's types to prevent type mismatch errors
- Updated dependencies
  - @sit-onyx/icons@1.5.0

## 1.1.0

### Minor Changes

- 0dec59a: feat: support Storybook 10

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.2.0

## 1.0.2

### Patch Changes

- fc56283: fix: prevent duplicated imports for generated code snippets

  Previously the generated Storybook code snippets on the "Docs" page contained duplicated imports of used onyx components.

## 1.0.1

### Patch Changes

- 2e43655: feat(events): add latest Vue events to `withNativeEventLogging`

  The new events are: onAnimationcancel, onBeforetoggle, onFormdata, onFullscreenchange, onFullscreenerror, onGotpointercapture, onLostpointercapture, onSecuritypolicyviolation, onToggle, onTransitioncancel, onTransitionrun

- Updated dependencies:
  - @sit-onyx/icons@1.1.0

## 1.0.0

### Major Changes

- 7fde5eb: We proudly announce:

  ## 🎉 Major release of version 1.0.0 🎉

  _There are no changes to the latest `beta` version._

  Thanks for all your help, bug reports and feature requests that made this possible.
  Our work still continues, we are actively working on new and more features and bug-fixes.

  Meet us at the [SITCON.perform](https://sitcon.schwarz/) in our UXDS Design room.

  With the **1.0.0** release the package API is stable and there won't be any breaking changes until the next major release.
  We don't expect more then one major release per year.

### Patch Changes

- Updated dependencies
  - @sit-onyx/flags@1.0.0
  - @sit-onyx/icons@1.0.0

## 1.0.0-beta.105

### Patch Changes

- c8bf3e4: fix: updatae event type to "PointerEvent" for onClick, onContextmenu and onAuxclick events

## 1.0.0-beta.104

### Patch Changes

- 814dbd5: fix: remove `@sit-onyx/shared` peerDependency

## 1.0.0-beta.103

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.25

## 1.0.0-beta.102

### Minor Changes

- b4d113a: feat: replace flags in source code snippets that are imported from `@sit-onyx/flags` with corresponding import statements

### Patch Changes

- Updated dependencies
  - @sit-onyx/flags@1.0.0-beta.7
  - @sit-onyx/icons@1.0.0-beta.24

## 1.0.0-beta.101

### Minor Changes

- bb24466: feat(storybook-utils): format code snippets with prettier

  Since Storybook version 9, the code snippets are no longer formatted by Storybook itself (see [Storybook migration guide](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#parametersdocssourceformat-removal)).

  We re-added the Vue source code formatting using prettier

## 1.0.0-beta.100

### Minor Changes

- a18d955: feat: update onyx icon code replacement to use JavaScript instead of raw SVG imports

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.23

## 1.0.0-beta.99

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.22

## 1.0.0-beta.98

### Patch Changes

- 642dd24: remove imports from `@storybook/vue3` in favor of `@storybook/vue3-vite`

## 1.0.0-beta.97

### Major Changes

- f0bcd9c: fix(background): Fix missing background color on fullscreen stories and sometimes on general page.

  BREAKING CHANGE: `storybook/background` addon is not disabled anymore. If you don't plan on providing additional, custom backgrounds you should hide the background select from the toolbar:

  ```ts
  // manager.ts
  addons.setConfig({
    toolbar: {
      "storybook/background": { hidden: true },
    },
  });
  ```

## 1.0.0-beta.96

### Major Changes

- 1911f6c: feat(dist)!: Removed commonjs builds
  - **BREAKING CHANGE:** We dropped commonjs (cjs) builds and packages are now shipped as a [pure esm package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#pure-esm-package). Node >= 18 is required.

### Patch Changes

- Updated dependencies
  - @sit-onyx/shared@1.0.0-beta.4
  - @sit-onyx/icons@1.0.0-beta.21

## 1.0.0-beta.95

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.20

## 1.0.0-beta.94

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.19

## 1.0.0-beta.93

### Minor Changes

- df86e6d: feat: Implemented Light-Dark mode using native CSS API. Users no longer need to import separate light and dark mode files; now, all styles are combined into a single file with the light-dark function.
  E.g.: @import lidl-light.css; @import lidl-dark.css -> @import lidl.css

  #### Renamed CSS Variables

  | Old                  | New                         |
  | -------------------- | --------------------------- |
  | --onyx-color-steel   | --onyx-color-neutral-steel  |
  | --onyx-color-stone   | --onyx-color-neutral-stone  |
  | --onyx-color-steel   | --onyx-color-digits-mint    |
  | --onyx-color-gray    | --onyx-color-kl-gray        |
  | --onyx-color-lidl    | --onyx-color-lidl-blue      |
  | --onyx-color-prezero | --onyx-color-prezero-green  |
  | --onyx-color-petrol  | --onyx-color-prezero-petrol |
  | --onyx-color-scos    | --onyx-color-scos-blue      |
  | --onyx-color-lemon   | --onyx-color-scos-lemon     |
  | --onyx-color-lime    | --onyx-color-scos-lime      |
  | --onyx-color-green   | --onyx-color-system-green   |
  | --onyx-color-orange  | --onyx-color-system-orange  |
  | --onyx-color-purple  | --onyx-color-system-purple  |
  | --onyx-color-red     | --onyx-color-system-red     |

## 1.0.0-beta.92

### Major Changes

- 980d3bc: - fix(storybook-utils): fix viewports not applied correctly
  - remove type `StorybookBreakpoint`, use the `Viewport` type from `storybook/internal/viewport` instead

## 1.0.0-beta.91

### Patch Changes

- c7f55e5: fix(storybook): exclude unwanted controls

  This includes: "ref", "ref_for", "ref_key", "class", "style", "key" and "$slots"

## 1.0.0-beta.90

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.18

## 1.0.0-beta.89

### Minor Changes

- 0142958: feat: imported font-variables from figma

## 1.0.0-beta.88

### Major Changes

- ccb1b89: feat: support Storybook 9

  This package now supports (and requires) Storybook version `>= 9.0.0`. When updating, please look into the official [Storybook migration guide](https://storybook.js.org/docs/migration-guide) and make all relevant changes to your project.

  In addition, the following breaking changes need to be migrate when using this `@sit-onyx/storybook-utils` package:

  #### Replaced storybook-dark-mode package

  The `storybook-dark-mode` package was replaced with the maintenance fork `@vueless/storybook-dark-mode`. See [this issue](https://github.com/hipstersmoothie/storybook-dark-mode/issues/295#issuecomment-2938151892) for further information. To migrate:
  - replace `storybook-dark-mode` with `@vueless/storybook-dark-mode` in your `.storybook/main.ts` file
  - install `@vueless/storybook-dark-mode` (as devDependency)
  - uninstall package `storybook-dark-mode`

## 1.0.0-beta.87

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.17

## 1.0.0-beta.86

### Patch Changes

- Updated dependencies
  - @sit-onyx/shared@1.0.0-beta.3

## 1.0.0-beta.85

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.16

## 1.0.0-beta.84

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.15

## 1.0.0-beta.83

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.14

## 1.0.0-beta.82

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.13

## 1.0.0-beta.81

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.12

## 1.0.0-beta.80

### Patch Changes

- Updated dependencies
  - @sit-onyx/shared@1.0.0-beta.2

## 1.0.0-beta.79

### Patch Changes

- Updated dependencies
  - @sit-onyx/shared@1.0.0-beta.1

## 1.0.0-beta.78

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.11

## 1.0.0-beta.77

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.10

## 1.0.0-beta.76

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.9

## 1.0.0-beta.75

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.8

## 1.0.0-beta.74

### Major Changes

- e0fbc12: fix(createPreview): revert unintentional breaking change

  We unintentionally introduced a breaking change in version `@sit-onyx/storybook-utils@1.0.0.beta.71` that forced you to pass a required first parameter with brand details when calling `createPreview()`.

  This was reverted now. The brand details are optional and can be passed as second parameter to `createPreview`.

## 1.0.0-beta.73

### Minor Changes

- b4c466f: feat: Added createActionLoggerWrapper util

## 1.0.0-beta.72

### Patch Changes

- Updated dependencies
  - @sit-onyx/shared@0.0.1-beta.0

## 1.0.0-beta.71

### Major Changes

- 7332525: **BREAKING**: Removed brand defaults, `createPreview` now expects a new first parameter which requires brand details to be set.
  **BREAKING**: Removed brand defaults, `createTheme` now requires brand details to be set, `base: "light" | "dark"` is now the secondary parameter.
  feat: Added `getCustomProperty` function which is used to load color values for theme.

## 1.0.0-beta.70

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.7
  - sit-onyx@1.0.0-beta.63

## 1.0.0-beta.69

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.62

## 1.0.0-beta.68

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.61

## 1.0.0-beta.67

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.60

## 1.0.0-beta.66

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.59

## 1.0.0-beta.65

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.58

## 1.0.0-beta.64

### Minor Changes

- 0429341: pass all filter parameters to withVModelDecorator filter function

## 1.0.0-beta.63

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.57

## 1.0.0-beta.62

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.56

## 1.0.0-beta.61

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.55

## 1.0.0-beta.60

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.54

## 1.0.0-beta.59

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.6
  - sit-onyx@1.0.0-beta.53

## 1.0.0-beta.58

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.52

## 1.0.0-beta.57

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.51

## 1.0.0-beta.56

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.50

## 1.0.0-beta.55

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.49

## 1.0.0-beta.54

### Minor Changes

- 5d8349c: New createSymbolArgTypeEnhancer which adds description text to symbols used as default props

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.48

## 1.0.0-beta.53

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.47

## 1.0.0-beta.52

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.5
  - sit-onyx@1.0.0-beta.46

## 1.0.0-beta.51

### Minor Changes

- 889383b: feat: added withNativeEventLogging to log and document native events

## 1.0.0-beta.50

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.4
  - sit-onyx@1.0.0-beta.45

## 1.0.0-beta.49

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.3
  - sit-onyx@1.0.0-beta.44

## 1.0.0-beta.48

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.43

## 1.0.0-beta.47

### Patch Changes

- b9fd3bc: chore: update to Storybook 8.3

  Fix Storybook peer dependency to version `>= 8.3.0` since the version we specified in `@sit-onyx/storybook-utils@1.0.0-beta.44` did not exist.

## 1.0.0-beta.46

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.42

## 1.0.0-beta.45

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.2
  - sit-onyx@1.0.0-beta.41

## 1.0.0-beta.44

### Major Changes

- e2648b6: bump minimum Storybook version to `8.3.0-alpha.5`

  Storybook version `8.3.0-alpha.5` now official supports the improved source code generation, see [changelog](https://github.com/storybookjs/storybook/blob/next/CHANGELOG.prerelease.md#830-alpha3) so we removed our temporarily forked source code generator from `@sit-onyx/storybook-utils`.

  Therefore, the minimum Storybook version was bumped to `8.3.0-alpha.5` which also includes a bug fix that significantly reduces the bundle size when building the Storybook.

## 1.0.0-beta.43

### Patch Changes

- 08a9d76: fix(enhanceEventArgTypes): log actions/events without "on" prefix

## 1.0.0-beta.42

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.40

## 1.0.0-beta.41

### Major Changes

- b2b3700: - **BREAKING CHANGE**: `defineStorybookActionsAndVModels` and `defineActions` was removed: Replace by using the `withVModelDecorator` as a global decorator and the `enhanceEventArgTypes` global argTypesEnhancer.
  - **BREAKING CHANGE**: `withVModelDecorator`: the event array parameter was removed: It is not necessary anymore to define the events manually.

## 1.0.0-beta.40

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.39

## 1.0.0-beta.39

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.38

## 1.0.0-beta.38

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.37

## 1.0.0-beta.37

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.36

## 1.0.0-beta.36

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.1
  - sit-onyx@1.0.0-beta.35

## 1.0.0-beta.35

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.34

## 1.0.0-beta.34

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.33

## 1.0.0-beta.33

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.32

## 1.0.0-beta.32

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.31

## 1.0.0-beta.31

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.30

## 1.0.0-beta.30

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.29

## 1.0.0-beta.29

### Minor Changes

- 4c49760: feat: add `walkTree` function that is able to traverse the storybook type tree

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.28

## 1.0.0-beta.28

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.27

## 1.0.0-beta.27

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.26

## 1.0.0-beta.26

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.25

## 1.0.0-beta.25

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.24

## 1.0.0-beta.24

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.23

## 1.0.0-beta.23

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.22

## 1.0.0-beta.22

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.21

## 1.0.0-beta.21

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.20

## 1.0.0-beta.20

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.19

## 1.0.0-beta.19

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.18

## 1.0.0-beta.18

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.17

## 1.0.0-beta.17

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.16

## 1.0.0-beta.16

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.15

## 1.0.0-beta.15

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.14

## 1.0.0-beta.14

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.13

## 1.0.0-beta.13

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.12

## 1.0.0-beta.12

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.11

## 1.0.0-beta.11

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.10

## 1.0.0-beta.10

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.9

## 1.0.0-beta.9

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.8

## 1.0.0-beta.8

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.7

## 1.0.0-beta.7

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.6

## 1.0.0-beta.6

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.5

## 1.0.0-beta.5

### Major Changes

- ec217c0: chore: update Storybook dependencies

  bump minimum Storybook version to `>= 8.2.0`

## 1.0.0-beta.4

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.4

## 1.0.0-beta.3

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.3

## 1.0.0-beta.2

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.2

## 1.0.0-beta.1

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.1

## 1.0.0-beta.0

### Major Changes

- bf3ea0a: release beta version

  🎉 onyx is now beta! There are no breaking changes to the last `1.0.0.-alpha.*` version

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.0
  - sit-onyx@1.0.0-beta.0

## 1.0.0-alpha.172

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.165

## 1.0.0-alpha.171

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.164

## 1.0.0-alpha.170

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.163

## 1.0.0-alpha.169

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.162

## 1.0.0-alpha.168

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.161

## 1.0.0-alpha.167

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.160

## 1.0.0-alpha.166

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.159

## 1.0.0-alpha.165

### Patch Changes

- 56b364e: fix: generate correct code for slot bindings

## 1.0.0-alpha.164

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.158

## 1.0.0-alpha.163

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.157

## 1.0.0-alpha.162

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.156

## 1.0.0-alpha.161

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.155

## 1.0.0-alpha.160

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.154

## 1.0.0-alpha.159

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.153

## 1.0.0-alpha.158

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.152

## 1.0.0-alpha.157

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.151

## 1.0.0-alpha.156

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.150

## 1.0.0-alpha.155

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.149

## 1.0.0-alpha.154

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.148

## 1.0.0-alpha.153

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.147

## 1.0.0-alpha.152

### Patch Changes

- 5c5bb15: docs: fix Storybook code snippets
  - remove unnecessary new line before `import { ref } from "vue";`
  - fix onyx component imports when component has no props, e.g. `<OnyxComponent>Test</OnyxComponent>`

## 1.0.0-alpha.151

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.146

## 1.0.0-alpha.150

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.145

## 1.0.0-alpha.149

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.144

## 1.0.0-alpha.148

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.143

## 1.0.0-alpha.147

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.142

## 1.0.0-alpha.146

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.141

## 1.0.0-alpha.145

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.140

## 1.0.0-alpha.144

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.139

## 1.0.0-alpha.143

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.138

## 1.0.0-alpha.142

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.137

## 1.0.0-alpha.141

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.136

## 1.0.0-alpha.140

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.135

## 1.0.0-alpha.139

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.134

## 1.0.0-alpha.138

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@0.1.0-alpha.2
  - sit-onyx@1.0.0-alpha.133

## 1.0.0-alpha.137

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.132

## 1.0.0-alpha.136

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.131

## 1.0.0-alpha.135

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.130

## 1.0.0-alpha.134

### Minor Changes

- 48dedc3: feat: add imports for used onyx components to generated source code

## 1.0.0-alpha.133

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.129

## 1.0.0-alpha.132

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.128

## 1.0.0-alpha.131

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.127

## 1.0.0-alpha.130

### Minor Changes

- afe7e21: feat: improve code snippet generation

## 1.0.0-alpha.129

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.126

## 1.0.0-alpha.128

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.125

## 1.0.0-alpha.127

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.124

## 1.0.0-alpha.126

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.123

## 1.0.0-alpha.125

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.122

## 1.0.0-alpha.124

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.121

## 1.0.0-alpha.123

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.120

## 1.0.0-alpha.122

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.119

## 1.0.0-alpha.121

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.118

## 1.0.0-alpha.120

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.117

## 1.0.0-alpha.119

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.116

## 1.0.0-alpha.118

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.115

## 1.0.0-alpha.117

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.114

## 1.0.0-alpha.116

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.113

## 1.0.0-alpha.115

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.112

## 1.0.0-alpha.114

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.111

## 1.0.0-alpha.113

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.110

## 1.0.0-alpha.112

### Major Changes

- 99b2089: use experimental source code generator
  - port the improved source code generator from [this Storybook PR](https://github.com/storybookjs/storybook/pull/27194).
  - globally replace onyx icons with their corresponding imports from `@sit-onyx/icons`

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.109
  - @sit-onyx/icons@0.1.0-alpha.1

## 1.0.0-alpha.111

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.108

## 1.0.0-alpha.110

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.107

## 1.0.0-alpha.109

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.106

## 1.0.0-alpha.108

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.105

## 1.0.0-alpha.107

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.104

## 1.0.0-alpha.106

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.103

## 1.0.0-alpha.105

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.102

## 1.0.0-alpha.104

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.101

## 1.0.0-alpha.103

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.100

## 1.0.0-alpha.102

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.99

## 1.0.0-alpha.101

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.98

## 1.0.0-alpha.100

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.97

## 1.0.0-alpha.99

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.96

## 1.0.0-alpha.98

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.95

## 1.0.0-alpha.97

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.94

## 1.0.0-alpha.96

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.93

## 1.0.0-alpha.95

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.92

## 1.0.0-alpha.94

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.91

## 1.0.0-alpha.93

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.90

## 1.0.0-alpha.92

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.89

## 1.0.0-alpha.91

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.88

## 1.0.0-alpha.90

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.87

## 1.0.0-alpha.89

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.86

## 1.0.0-alpha.88

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.85

## 1.0.0-alpha.87

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.84

## 1.0.0-alpha.86

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.83

## 1.0.0-alpha.85

### Major Changes

- 612d117: remove support for setting theme via query parameter

## 1.0.0-alpha.84

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.82

## 1.0.0-alpha.83

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.81

## 1.0.0-alpha.82

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.80

## 1.0.0-alpha.81

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.79

## 1.0.0-alpha.80

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.78

## 1.0.0-alpha.79

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.77

## 1.0.0-alpha.78

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.76

## 1.0.0-alpha.77

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.75

## 1.0.0-alpha.76

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.74

## 1.0.0-alpha.75

### Major Changes

- d85b6e2: bump min `storybook-dark-mode` to `>= 4`

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.73

## 1.0.0-alpha.74

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.72

## 1.0.0-alpha.73

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.71

## 1.0.0-alpha.72

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.70

## 1.0.0-alpha.71

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.69

## 1.0.0-alpha.70

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.68

## 1.0.0-alpha.69

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.67

## 1.0.0-alpha.68

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.66

## 1.0.0-alpha.67

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.65

## 1.0.0-alpha.66

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.64

## 1.0.0-alpha.65

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.63

## 1.0.0-alpha.64

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.62

## 1.0.0-alpha.63

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.61

## 1.0.0-alpha.62

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.60

## 1.0.0-alpha.61

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.59

## 1.0.0-alpha.60

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.58

## 1.0.0-alpha.59

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.57

## 1.0.0-alpha.58

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.56

## 1.0.0-alpha.57

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.55

## 1.0.0-alpha.56

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.54

## 1.0.0-alpha.55

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.53

## 1.0.0-alpha.54

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.52

## 1.0.0-alpha.53

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.51

## 1.0.0-alpha.52

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.50

## 1.0.0-alpha.51

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.49

## 1.0.0-alpha.50

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.48

## 1.0.0-alpha.49

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.47

## 1.0.0-alpha.48

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.46

## 1.0.0-alpha.47

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.45

## 1.0.0-alpha.46

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.44

## 1.0.0-alpha.45

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.43

## 1.0.0-alpha.44

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.42

## 1.0.0-alpha.43

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.41

## 1.0.0-alpha.42

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.40

## 1.0.0-alpha.41

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.39

## 1.0.0-alpha.40

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.38

## 1.0.0-alpha.39

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.37

## 1.0.0-alpha.38

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.36

## 1.0.0-alpha.37

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.35

## 1.0.0-alpha.36

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.34

## 1.0.0-alpha.35

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.33

## 1.0.0-alpha.34

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.32

## 1.0.0-alpha.33

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.31

## 1.0.0-alpha.32

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.30

## 1.0.0-alpha.31

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.29

## 1.0.0-alpha.30

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.28

## 1.0.0-alpha.29

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.27

## 1.0.0-alpha.28

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.26

## 1.0.0-alpha.27

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.25

## 1.0.0-alpha.26

### Patch Changes

- sit-onyx@1.0.0-alpha.24

## 1.0.0-alpha.25

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.23

## 1.0.0-alpha.24

### Minor Changes

- 778bc7d: feat: set browser color scheme depending on selected theme

## 1.0.0-alpha.23

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.22

## 1.0.0-alpha.22

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.21

## 1.0.0-alpha.21

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.20

## 1.0.0-alpha.20

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.19

## 1.0.0-alpha.19

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.18

## 1.0.0-alpha.18

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.17

## 1.0.0-alpha.17

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.16

## 1.0.0-alpha.16

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.15

## 1.0.0-alpha.15

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.14

## 1.0.0-alpha.14

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.13

## 1.0.0-alpha.13

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.12

## 1.0.0-alpha.12

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.11

## 1.0.0-alpha.11

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-alpha.10

## 1.0.0-alpha.10

### Patch Changes

- Updated dependencies
  - sit-onyx@0.1.0-alpha.9

## 1.0.0-alpha.9

### Patch Changes

- Updated dependencies
  - sit-onyx@0.1.0-alpha.8

## 1.0.0-alpha.8

### Patch Changes

- Updated dependencies
  - sit-onyx@0.1.0-alpha.7

## 1.0.0-alpha.7

### Patch Changes

- Updated dependencies
  - sit-onyx@0.1.0-alpha.6

## 1.0.0-alpha.6

### Patch Changes

- Updated dependencies
  - sit-onyx@0.1.0-alpha.5

## 1.0.0-alpha.5

### Minor Changes

- 5689fb0: feat: add onyx logo

### Patch Changes

- sit-onyx@0.1.0-alpha.4

## 1.0.0-alpha.4

### Patch Changes

- a190f80: fix: prevent type error when importing as library
- Updated dependencies
  - sit-onyx@0.1.0-alpha.4

## 1.0.0-alpha.3

### Minor Changes

- 9f7e8d1: feat: update default "onyx" theme

### Patch Changes

- Updated dependencies
  - sit-onyx@0.1.0-alpha.3

## 0.1.0-alpha.2

### Patch Changes

- 530af96: fix: prevent unresolvable imports due to missing files
- Updated dependencies
  - sit-onyx@0.1.0-alpha.2

## 0.1.0-alpha.1

### Minor Changes

- abaefa6: feat: support custom onyx theme for `createPreview` and `createTheme`

## 0.1.0-alpha.0

### Minor Changes

- 124ae10: feat: add breakpoints / viewports

### Patch Changes

- f703e4e: refactor: rename breakpoints

  | Old     | New |
  | ------- | --- |
  | 2xsmall | 2xs |
  | sxmall  | xs  |
  | small   | sm  |
  | medium  | md  |
  | large   | lg  |
  | xlarge  | xl  |
