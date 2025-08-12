# @sit-onyx/storybook-utils

## 1.0.0-beta.103

### Patch Changes

- Updated dependencies [1ed4c6b]
  - @sit-onyx/icons@1.0.0-beta.25

## 1.0.0-beta.102

### Minor Changes

- b4d113a: feat: replace flags in source code snippets that are imported from `@sit-onyx/flags` with corresponding import statements

### Patch Changes

- Updated dependencies [b4d113a]
- Updated dependencies [b4d113a]
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

- Updated dependencies [a18d955]
  - @sit-onyx/icons@1.0.0-beta.23

## 1.0.0-beta.99

### Patch Changes

- Updated dependencies [c235692]
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

- Updated dependencies [1911f6c]
  - @sit-onyx/shared@1.0.0-beta.4
  - @sit-onyx/icons@1.0.0-beta.21

## 1.0.0-beta.95

### Patch Changes

- Updated dependencies [eb481fe]
  - @sit-onyx/icons@1.0.0-beta.20

## 1.0.0-beta.94

### Patch Changes

- Updated dependencies [5a27c6a]
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

- Updated dependencies [d1df993]
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

- Updated dependencies [0f045f0]
  - @sit-onyx/icons@1.0.0-beta.17

## 1.0.0-beta.86

### Patch Changes

- Updated dependencies [3288513]
  - @sit-onyx/shared@1.0.0-beta.3

## 1.0.0-beta.85

### Patch Changes

- Updated dependencies [de2a1e8]
  - @sit-onyx/icons@1.0.0-beta.16

## 1.0.0-beta.84

### Patch Changes

- Updated dependencies [e9ef809]
  - @sit-onyx/icons@1.0.0-beta.15

## 1.0.0-beta.83

### Patch Changes

- Updated dependencies [41eb73c]
  - @sit-onyx/icons@1.0.0-beta.14

## 1.0.0-beta.82

### Patch Changes

- Updated dependencies [9319044]
  - @sit-onyx/icons@1.0.0-beta.13

## 1.0.0-beta.81

### Patch Changes

- Updated dependencies [00ca133]
  - @sit-onyx/icons@1.0.0-beta.12

## 1.0.0-beta.80

### Patch Changes

- Updated dependencies [07549b9]
  - @sit-onyx/shared@1.0.0-beta.2

## 1.0.0-beta.79

### Patch Changes

- Updated dependencies [cc46754]
  - @sit-onyx/shared@1.0.0-beta.1

## 1.0.0-beta.78

### Patch Changes

- Updated dependencies [f471335]
  - @sit-onyx/icons@1.0.0-beta.11

## 1.0.0-beta.77

### Patch Changes

- Updated dependencies [ad447e9]
  - @sit-onyx/icons@1.0.0-beta.10

## 1.0.0-beta.76

### Patch Changes

- Updated dependencies [ee0fcd2]
  - @sit-onyx/icons@1.0.0-beta.9

## 1.0.0-beta.75

### Patch Changes

- Updated dependencies [6755052]
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

- Updated dependencies [b6b4573]
  - @sit-onyx/shared@0.0.1-beta.0

## 1.0.0-beta.71

### Major Changes

- 7332525: **BREAKING**: Removed brand defaults, `createPreview` now expects a new first parameter which requires brand details to be set.
  **BREAKING**: Removed brand defaults, `createTheme` now requires brand details to be set, `base: "light" | "dark"` is now the secondary parameter.
  feat: Added `getCustomProperty` function which is used to load color values for theme.

## 1.0.0-beta.70

### Patch Changes

- Updated dependencies [f6f01c6]
  - @sit-onyx/icons@1.0.0-beta.7
  - sit-onyx@1.0.0-beta.63

## 1.0.0-beta.69

### Patch Changes

- Updated dependencies [95673cf]
  - sit-onyx@1.0.0-beta.62

## 1.0.0-beta.68

### Patch Changes

- Updated dependencies [3bc1d58]
  - sit-onyx@1.0.0-beta.61

## 1.0.0-beta.67

### Patch Changes

- Updated dependencies [80424f9]
  - sit-onyx@1.0.0-beta.60

## 1.0.0-beta.66

### Patch Changes

- Updated dependencies [bb826a4]
  - sit-onyx@1.0.0-beta.59

## 1.0.0-beta.65

### Patch Changes

- Updated dependencies [e42ca5e]
  - sit-onyx@1.0.0-beta.58

## 1.0.0-beta.64

### Minor Changes

- 0429341: pass all filter parameters to withVModelDecorator filter function

## 1.0.0-beta.63

### Patch Changes

- Updated dependencies [78a1019]
  - sit-onyx@1.0.0-beta.57

## 1.0.0-beta.62

### Patch Changes

- Updated dependencies [b6e0b67]
  - sit-onyx@1.0.0-beta.56

## 1.0.0-beta.61

### Patch Changes

- Updated dependencies [772f6a5]
- Updated dependencies [772f6a5]
  - sit-onyx@1.0.0-beta.55

## 1.0.0-beta.60

### Patch Changes

- Updated dependencies [01f8664]
  - sit-onyx@1.0.0-beta.54

## 1.0.0-beta.59

### Patch Changes

- Updated dependencies [be5b415]
  - @sit-onyx/icons@1.0.0-beta.6
  - sit-onyx@1.0.0-beta.53

## 1.0.0-beta.58

### Patch Changes

- Updated dependencies [a9d89f6]
  - sit-onyx@1.0.0-beta.52

## 1.0.0-beta.57

### Patch Changes

- Updated dependencies [6fe0527]
  - sit-onyx@1.0.0-beta.51

## 1.0.0-beta.56

### Patch Changes

- Updated dependencies [beca92e]
  - sit-onyx@1.0.0-beta.50

## 1.0.0-beta.55

### Patch Changes

- Updated dependencies [704e624]
  - sit-onyx@1.0.0-beta.49

## 1.0.0-beta.54

### Minor Changes

- 5d8349c: New createSymbolArgTypeEnhancer which adds description text to symbols used as default props

### Patch Changes

- Updated dependencies [5d8349c]
  - sit-onyx@1.0.0-beta.48

## 1.0.0-beta.53

### Patch Changes

- Updated dependencies [8aa66eb]
  - sit-onyx@1.0.0-beta.47

## 1.0.0-beta.52

### Patch Changes

- Updated dependencies [3e49c73]
  - @sit-onyx/icons@1.0.0-beta.5
  - sit-onyx@1.0.0-beta.46

## 1.0.0-beta.51

### Minor Changes

- 889383b: feat: added withNativeEventLogging to log and document native events

## 1.0.0-beta.50

### Patch Changes

- Updated dependencies [33700f9]
  - @sit-onyx/icons@1.0.0-beta.4
  - sit-onyx@1.0.0-beta.45

## 1.0.0-beta.49

### Patch Changes

- Updated dependencies [188c94d]
  - @sit-onyx/icons@1.0.0-beta.3
  - sit-onyx@1.0.0-beta.44

## 1.0.0-beta.48

### Patch Changes

- Updated dependencies [e6af99b]
  - sit-onyx@1.0.0-beta.43

## 1.0.0-beta.47

### Patch Changes

- b9fd3bc: chore: update to Storybook 8.3

  Fix Storybook peer dependency to version `>= 8.3.0` since the version we specified in `@sit-onyx/storybook-utils@1.0.0-beta.44` did not exist.

## 1.0.0-beta.46

### Patch Changes

- Updated dependencies [dc00809]
  - sit-onyx@1.0.0-beta.42

## 1.0.0-beta.45

### Patch Changes

- Updated dependencies [79033ac]
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

- Updated dependencies [b7c370d]
  - sit-onyx@1.0.0-beta.40

## 1.0.0-beta.41

### Major Changes

- b2b3700: - **BREAKING CHANGE**: `defineStorybookActionsAndVModels` and `defineActions` was removed: Replace by using the `withVModelDecorator` as a global decorator and the `enhanceEventArgTypes` global argTypesEnhancer.
  - **BREAKING CHANGE**: `withVModelDecorator`: the event array parameter was removed: It is not necessary anymore to define the events manually.

## 1.0.0-beta.40

### Patch Changes

- Updated dependencies [dfa58b8]
  - sit-onyx@1.0.0-beta.39

## 1.0.0-beta.39

### Patch Changes

- Updated dependencies [d4fe7d1]
  - sit-onyx@1.0.0-beta.38

## 1.0.0-beta.38

### Patch Changes

- Updated dependencies [3d612d4]
  - sit-onyx@1.0.0-beta.37

## 1.0.0-beta.37

### Patch Changes

- Updated dependencies [8647795]
  - sit-onyx@1.0.0-beta.36

## 1.0.0-beta.36

### Patch Changes

- Updated dependencies [b525ca5]
  - @sit-onyx/icons@1.0.0-beta.1
  - sit-onyx@1.0.0-beta.35

## 1.0.0-beta.35

### Patch Changes

- Updated dependencies [934a903]
  - sit-onyx@1.0.0-beta.34

## 1.0.0-beta.34

### Patch Changes

- Updated dependencies [07084b1]
  - sit-onyx@1.0.0-beta.33

## 1.0.0-beta.33

### Patch Changes

- Updated dependencies [e8c5341]
  - sit-onyx@1.0.0-beta.32

## 1.0.0-beta.32

### Patch Changes

- Updated dependencies [467d8f8]
  - sit-onyx@1.0.0-beta.31

## 1.0.0-beta.31

### Patch Changes

- Updated dependencies [d7b68e0]
  - sit-onyx@1.0.0-beta.30

## 1.0.0-beta.30

### Patch Changes

- Updated dependencies [40b517d]
  - sit-onyx@1.0.0-beta.29

## 1.0.0-beta.29

### Minor Changes

- 4c49760: feat: add `walkTree` function that is able to traverse the storybook type tree

### Patch Changes

- Updated dependencies [4c49760]
  - sit-onyx@1.0.0-beta.28

## 1.0.0-beta.28

### Patch Changes

- Updated dependencies [3163863]
  - sit-onyx@1.0.0-beta.27

## 1.0.0-beta.27

### Patch Changes

- Updated dependencies [93f4386]
  - sit-onyx@1.0.0-beta.26

## 1.0.0-beta.26

### Patch Changes

- Updated dependencies [244219f]
  - sit-onyx@1.0.0-beta.25

## 1.0.0-beta.25

### Patch Changes

- Updated dependencies [6f7149f]
  - sit-onyx@1.0.0-beta.24

## 1.0.0-beta.24

### Patch Changes

- Updated dependencies [dae102e]
  - sit-onyx@1.0.0-beta.23

## 1.0.0-beta.23

### Patch Changes

- Updated dependencies [349f412]
  - sit-onyx@1.0.0-beta.22

## 1.0.0-beta.22

### Patch Changes

- Updated dependencies [d6321d8]
  - sit-onyx@1.0.0-beta.21

## 1.0.0-beta.21

### Patch Changes

- Updated dependencies [4c73713]
  - sit-onyx@1.0.0-beta.20

## 1.0.0-beta.20

### Patch Changes

- Updated dependencies [9570420]
  - sit-onyx@1.0.0-beta.19

## 1.0.0-beta.19

### Patch Changes

- Updated dependencies [82fffac]
  - sit-onyx@1.0.0-beta.18

## 1.0.0-beta.18

### Patch Changes

- Updated dependencies [17c0aa5]
  - sit-onyx@1.0.0-beta.17

## 1.0.0-beta.17

### Patch Changes

- Updated dependencies [258c3ec]
  - sit-onyx@1.0.0-beta.16

## 1.0.0-beta.16

### Patch Changes

- Updated dependencies [02e4f4d]
- Updated dependencies [9cb8667]
  - sit-onyx@1.0.0-beta.15

## 1.0.0-beta.15

### Patch Changes

- Updated dependencies [25bfc85]
  - sit-onyx@1.0.0-beta.14

## 1.0.0-beta.14

### Patch Changes

- Updated dependencies [cae1e24]
  - sit-onyx@1.0.0-beta.13

## 1.0.0-beta.13

### Patch Changes

- Updated dependencies [7b8ad3d]
  - sit-onyx@1.0.0-beta.12

## 1.0.0-beta.12

### Patch Changes

- Updated dependencies [8a1c8d4]
  - sit-onyx@1.0.0-beta.11

## 1.0.0-beta.11

### Patch Changes

- Updated dependencies [5c0535e]
  - sit-onyx@1.0.0-beta.10

## 1.0.0-beta.10

### Patch Changes

- Updated dependencies [dd42def]
  - sit-onyx@1.0.0-beta.9

## 1.0.0-beta.9

### Patch Changes

- Updated dependencies [d0247d1]
  - sit-onyx@1.0.0-beta.8

## 1.0.0-beta.8

### Patch Changes

- Updated dependencies [df21d23]
  - sit-onyx@1.0.0-beta.7

## 1.0.0-beta.7

### Patch Changes

- Updated dependencies [c2a6447]
  - sit-onyx@1.0.0-beta.6

## 1.0.0-beta.6

### Patch Changes

- Updated dependencies [59bca7e]
  - sit-onyx@1.0.0-beta.5

## 1.0.0-beta.5

### Major Changes

- ec217c0: chore: update Storybook dependencies

  bump minimum Storybook version to `>= 8.2.0`

## 1.0.0-beta.4

### Patch Changes

- Updated dependencies [6e14afd]
  - sit-onyx@1.0.0-beta.4

## 1.0.0-beta.3

### Patch Changes

- Updated dependencies [67a5e50]
  - sit-onyx@1.0.0-beta.3

## 1.0.0-beta.2

### Patch Changes

- Updated dependencies [15114f7]
  - sit-onyx@1.0.0-beta.2

## 1.0.0-beta.1

### Patch Changes

- Updated dependencies [7b72cbc]
  - sit-onyx@1.0.0-beta.1

## 1.0.0-beta.0

### Major Changes

- bf3ea0a: release beta version

  🎉 onyx is now beta! There are no breaking changes to the last `1.0.0.-alpha.*` version

### Patch Changes

- Updated dependencies [bf3ea0a]
  - @sit-onyx/icons@1.0.0-beta.0
  - sit-onyx@1.0.0-beta.0

## 1.0.0-alpha.172

### Patch Changes

- Updated dependencies [bf1e992]
  - sit-onyx@1.0.0-alpha.165

## 1.0.0-alpha.171

### Patch Changes

- Updated dependencies [555ac22]
- Updated dependencies [555ac22]
- Updated dependencies [48b24d2]
  - sit-onyx@1.0.0-alpha.164

## 1.0.0-alpha.170

### Patch Changes

- Updated dependencies [4ddd145]
  - sit-onyx@1.0.0-alpha.163

## 1.0.0-alpha.169

### Patch Changes

- Updated dependencies [90f9f86]
- Updated dependencies [90f9f86]
  - sit-onyx@1.0.0-alpha.162

## 1.0.0-alpha.168

### Patch Changes

- Updated dependencies [4492231]
  - sit-onyx@1.0.0-alpha.161

## 1.0.0-alpha.167

### Patch Changes

- Updated dependencies [cd4a885]
  - sit-onyx@1.0.0-alpha.160

## 1.0.0-alpha.166

### Patch Changes

- Updated dependencies [760bb76]
  - sit-onyx@1.0.0-alpha.159

## 1.0.0-alpha.165

### Patch Changes

- 56b364e: fix: generate correct code for slot bindings

## 1.0.0-alpha.164

### Patch Changes

- Updated dependencies [4ee1e7f]
  - sit-onyx@1.0.0-alpha.158

## 1.0.0-alpha.163

### Patch Changes

- Updated dependencies [c79e491]
- Updated dependencies [8d14b72]
  - sit-onyx@1.0.0-alpha.157

## 1.0.0-alpha.162

### Patch Changes

- Updated dependencies [ea9a9e7]
  - sit-onyx@1.0.0-alpha.156

## 1.0.0-alpha.161

### Patch Changes

- Updated dependencies [b8db0cc]
- Updated dependencies [b8db0cc]
  - sit-onyx@1.0.0-alpha.155

## 1.0.0-alpha.160

### Patch Changes

- Updated dependencies [529a84f]
  - sit-onyx@1.0.0-alpha.154

## 1.0.0-alpha.159

### Patch Changes

- Updated dependencies [2cef847]
  - sit-onyx@1.0.0-alpha.153

## 1.0.0-alpha.158

### Patch Changes

- Updated dependencies [8692b19]
  - sit-onyx@1.0.0-alpha.152

## 1.0.0-alpha.157

### Patch Changes

- Updated dependencies [3c8cf6d]
  - sit-onyx@1.0.0-alpha.151

## 1.0.0-alpha.156

### Patch Changes

- Updated dependencies [0bdb49a]
- Updated dependencies [0bdb49a]
  - sit-onyx@1.0.0-alpha.150

## 1.0.0-alpha.155

### Patch Changes

- Updated dependencies [1cc020a]
- Updated dependencies [1cc020a]
  - sit-onyx@1.0.0-alpha.149

## 1.0.0-alpha.154

### Patch Changes

- Updated dependencies [2d0458d]
  - sit-onyx@1.0.0-alpha.148

## 1.0.0-alpha.153

### Patch Changes

- Updated dependencies [743ee88]
- Updated dependencies [b7e9aaf]
  - sit-onyx@1.0.0-alpha.147

## 1.0.0-alpha.152

### Patch Changes

- 5c5bb15: docs: fix Storybook code snippets
  - remove unnecessary new line before `import { ref } from "vue";`
  - fix onyx component imports when component has no props, e.g. `<OnyxComponent>Test</OnyxComponent>`

## 1.0.0-alpha.151

### Patch Changes

- Updated dependencies [d4fbcf4]
  - sit-onyx@1.0.0-alpha.146

## 1.0.0-alpha.150

### Patch Changes

- Updated dependencies [02f1a8a]
  - sit-onyx@1.0.0-alpha.145

## 1.0.0-alpha.149

### Patch Changes

- Updated dependencies [85128a2]
  - sit-onyx@1.0.0-alpha.144

## 1.0.0-alpha.148

### Patch Changes

- Updated dependencies [02f5691]
  - sit-onyx@1.0.0-alpha.143

## 1.0.0-alpha.147

### Patch Changes

- Updated dependencies [7c98a6d]
  - sit-onyx@1.0.0-alpha.142

## 1.0.0-alpha.146

### Patch Changes

- Updated dependencies [08b434b]
  - sit-onyx@1.0.0-alpha.141

## 1.0.0-alpha.145

### Patch Changes

- Updated dependencies [d3e9321]
  - sit-onyx@1.0.0-alpha.140

## 1.0.0-alpha.144

### Patch Changes

- Updated dependencies [107ec36]
  - sit-onyx@1.0.0-alpha.139

## 1.0.0-alpha.143

### Patch Changes

- Updated dependencies [0863114]
- Updated dependencies [0863114]
- Updated dependencies [53b0d50]
  - sit-onyx@1.0.0-alpha.138

## 1.0.0-alpha.142

### Patch Changes

- Updated dependencies [442e4c5]
  - sit-onyx@1.0.0-alpha.137

## 1.0.0-alpha.141

### Patch Changes

- Updated dependencies [f1aad40]
  - sit-onyx@1.0.0-alpha.136

## 1.0.0-alpha.140

### Patch Changes

- Updated dependencies [0511127]
  - sit-onyx@1.0.0-alpha.135

## 1.0.0-alpha.139

### Patch Changes

- Updated dependencies [02d9f0f]
  - sit-onyx@1.0.0-alpha.134

## 1.0.0-alpha.138

### Patch Changes

- Updated dependencies [fad8140]
  - @sit-onyx/icons@0.1.0-alpha.2
  - sit-onyx@1.0.0-alpha.133

## 1.0.0-alpha.137

### Patch Changes

- Updated dependencies [6059d12]
  - sit-onyx@1.0.0-alpha.132

## 1.0.0-alpha.136

### Patch Changes

- Updated dependencies [1baef56]
  - sit-onyx@1.0.0-alpha.131

## 1.0.0-alpha.135

### Patch Changes

- Updated dependencies [37ee3fd]
  - sit-onyx@1.0.0-alpha.130

## 1.0.0-alpha.134

### Minor Changes

- 48dedc3: feat: add imports for used onyx components to generated source code

## 1.0.0-alpha.133

### Patch Changes

- Updated dependencies [70c7f93]
  - sit-onyx@1.0.0-alpha.129

## 1.0.0-alpha.132

### Patch Changes

- Updated dependencies [55c0b19]
  - sit-onyx@1.0.0-alpha.128

## 1.0.0-alpha.131

### Patch Changes

- Updated dependencies [62cb2ca]
  - sit-onyx@1.0.0-alpha.127

## 1.0.0-alpha.130

### Minor Changes

- afe7e21: feat: improve code snippet generation

## 1.0.0-alpha.129

### Patch Changes

- Updated dependencies [85482cd]
- Updated dependencies [edbfc22]
- Updated dependencies [edbfc22]
  - sit-onyx@1.0.0-alpha.126

## 1.0.0-alpha.128

### Patch Changes

- Updated dependencies [2805e75]
  - sit-onyx@1.0.0-alpha.125

## 1.0.0-alpha.127

### Patch Changes

- Updated dependencies [5294c95]
  - sit-onyx@1.0.0-alpha.124

## 1.0.0-alpha.126

### Patch Changes

- Updated dependencies [f7e965b]
  - sit-onyx@1.0.0-alpha.123

## 1.0.0-alpha.125

### Patch Changes

- Updated dependencies [8c1cc76]
  - sit-onyx@1.0.0-alpha.122

## 1.0.0-alpha.124

### Patch Changes

- Updated dependencies [decd55c]
  - sit-onyx@1.0.0-alpha.121

## 1.0.0-alpha.123

### Patch Changes

- Updated dependencies [dc2125e]
  - sit-onyx@1.0.0-alpha.120

## 1.0.0-alpha.122

### Patch Changes

- Updated dependencies [697ffcd]
  - sit-onyx@1.0.0-alpha.119

## 1.0.0-alpha.121

### Patch Changes

- Updated dependencies [2d2ada6]
  - sit-onyx@1.0.0-alpha.118

## 1.0.0-alpha.120

### Patch Changes

- Updated dependencies [92b9375]
  - sit-onyx@1.0.0-alpha.117

## 1.0.0-alpha.119

### Patch Changes

- Updated dependencies [b0554c8]
- Updated dependencies [b0554c8]
  - sit-onyx@1.0.0-alpha.116

## 1.0.0-alpha.118

### Patch Changes

- Updated dependencies [19011d6]
- Updated dependencies [19011d6]
  - sit-onyx@1.0.0-alpha.115

## 1.0.0-alpha.117

### Patch Changes

- Updated dependencies [309fb43]
- Updated dependencies [309fb43]
  - sit-onyx@1.0.0-alpha.114

## 1.0.0-alpha.116

### Patch Changes

- Updated dependencies [f46561c]
  - sit-onyx@1.0.0-alpha.113

## 1.0.0-alpha.115

### Patch Changes

- Updated dependencies [f0ca40c]
  - sit-onyx@1.0.0-alpha.112

## 1.0.0-alpha.114

### Patch Changes

- Updated dependencies [d1984e2]
  - sit-onyx@1.0.0-alpha.111

## 1.0.0-alpha.113

### Patch Changes

- Updated dependencies [2e93902]
  - sit-onyx@1.0.0-alpha.110

## 1.0.0-alpha.112

### Major Changes

- 99b2089: use experimental source code generator
  - port the improved source code generator from [this Storybook PR](https://github.com/storybookjs/storybook/pull/27194).
  - globally replace onyx icons with their corresponding imports from `@sit-onyx/icons`

### Patch Changes

- Updated dependencies [1093e66]
- Updated dependencies [99b2089]
  - sit-onyx@1.0.0-alpha.109
  - @sit-onyx/icons@0.1.0-alpha.1

## 1.0.0-alpha.111

### Patch Changes

- Updated dependencies [aa0b540]
  - sit-onyx@1.0.0-alpha.108

## 1.0.0-alpha.110

### Patch Changes

- Updated dependencies [9279c7b]
  - sit-onyx@1.0.0-alpha.107

## 1.0.0-alpha.109

### Patch Changes

- Updated dependencies [34547be]
  - sit-onyx@1.0.0-alpha.106

## 1.0.0-alpha.108

### Patch Changes

- Updated dependencies [c011e27]
  - sit-onyx@1.0.0-alpha.105

## 1.0.0-alpha.107

### Patch Changes

- Updated dependencies [20fb878]
  - sit-onyx@1.0.0-alpha.104

## 1.0.0-alpha.106

### Patch Changes

- Updated dependencies [09ce727]
  - sit-onyx@1.0.0-alpha.103

## 1.0.0-alpha.105

### Patch Changes

- Updated dependencies [3b9fbf4]
  - sit-onyx@1.0.0-alpha.102

## 1.0.0-alpha.104

### Patch Changes

- Updated dependencies [2ea735b]
  - sit-onyx@1.0.0-alpha.101

## 1.0.0-alpha.103

### Patch Changes

- Updated dependencies [d54d357]
  - sit-onyx@1.0.0-alpha.100

## 1.0.0-alpha.102

### Patch Changes

- Updated dependencies [3a9783d]
  - sit-onyx@1.0.0-alpha.99

## 1.0.0-alpha.101

### Patch Changes

- Updated dependencies [9eb7b4e]
- Updated dependencies [9eb7b4e]
  - sit-onyx@1.0.0-alpha.98

## 1.0.0-alpha.100

### Patch Changes

- Updated dependencies [5754525]
  - sit-onyx@1.0.0-alpha.97

## 1.0.0-alpha.99

### Patch Changes

- Updated dependencies [f99f38f]
  - sit-onyx@1.0.0-alpha.96

## 1.0.0-alpha.98

### Patch Changes

- Updated dependencies [2f825ec]
  - sit-onyx@1.0.0-alpha.95

## 1.0.0-alpha.97

### Patch Changes

- Updated dependencies [c867746]
  - sit-onyx@1.0.0-alpha.94

## 1.0.0-alpha.96

### Patch Changes

- Updated dependencies [c55a599]
  - sit-onyx@1.0.0-alpha.93

## 1.0.0-alpha.95

### Patch Changes

- Updated dependencies [2b48da9]
- Updated dependencies [2b48da9]
  - sit-onyx@1.0.0-alpha.92

## 1.0.0-alpha.94

### Patch Changes

- Updated dependencies [93ad5a9]
- Updated dependencies [1eb0528]
  - sit-onyx@1.0.0-alpha.91

## 1.0.0-alpha.93

### Patch Changes

- Updated dependencies [57d81c9]
  - sit-onyx@1.0.0-alpha.90

## 1.0.0-alpha.92

### Patch Changes

- Updated dependencies [7951251]
  - sit-onyx@1.0.0-alpha.89

## 1.0.0-alpha.91

### Patch Changes

- Updated dependencies [8d65dce]
  - sit-onyx@1.0.0-alpha.88

## 1.0.0-alpha.90

### Patch Changes

- Updated dependencies [413d3e0]
  - sit-onyx@1.0.0-alpha.87

## 1.0.0-alpha.89

### Patch Changes

- Updated dependencies [5e96001]
  - sit-onyx@1.0.0-alpha.86

## 1.0.0-alpha.88

### Patch Changes

- Updated dependencies [641dac7]
- Updated dependencies [641dac7]
- Updated dependencies [afe16cf]
  - sit-onyx@1.0.0-alpha.85

## 1.0.0-alpha.87

### Patch Changes

- Updated dependencies [5f28acb]
- Updated dependencies [5f28acb]
  - sit-onyx@1.0.0-alpha.84

## 1.0.0-alpha.86

### Patch Changes

- Updated dependencies [29a8ba6]
  - sit-onyx@1.0.0-alpha.83

## 1.0.0-alpha.85

### Major Changes

- 612d117: remove support for setting theme via query parameter

## 1.0.0-alpha.84

### Patch Changes

- Updated dependencies [1377af6]
  - sit-onyx@1.0.0-alpha.82

## 1.0.0-alpha.83

### Patch Changes

- Updated dependencies [ded1477]
  - sit-onyx@1.0.0-alpha.81

## 1.0.0-alpha.82

### Patch Changes

- Updated dependencies [da3cad4]
- Updated dependencies [da3cad4]
  - sit-onyx@1.0.0-alpha.80

## 1.0.0-alpha.81

### Patch Changes

- Updated dependencies [193ecf2]
  - sit-onyx@1.0.0-alpha.79

## 1.0.0-alpha.80

### Patch Changes

- Updated dependencies [d819092]
  - sit-onyx@1.0.0-alpha.78

## 1.0.0-alpha.79

### Patch Changes

- Updated dependencies [a7b5140]
  - sit-onyx@1.0.0-alpha.77

## 1.0.0-alpha.78

### Patch Changes

- Updated dependencies [a155d1b]
  - sit-onyx@1.0.0-alpha.76

## 1.0.0-alpha.77

### Patch Changes

- Updated dependencies [61c4964]
  - sit-onyx@1.0.0-alpha.75

## 1.0.0-alpha.76

### Patch Changes

- Updated dependencies [288afbd]
  - sit-onyx@1.0.0-alpha.74

## 1.0.0-alpha.75

### Major Changes

- d85b6e2: bump min `storybook-dark-mode` to `>= 4`

### Patch Changes

- Updated dependencies [43a8616]
  - sit-onyx@1.0.0-alpha.73

## 1.0.0-alpha.74

### Patch Changes

- Updated dependencies [f464b42]
  - sit-onyx@1.0.0-alpha.72

## 1.0.0-alpha.73

### Patch Changes

- Updated dependencies [b20fa64]
  - sit-onyx@1.0.0-alpha.71

## 1.0.0-alpha.72

### Patch Changes

- Updated dependencies [4508633]
  - sit-onyx@1.0.0-alpha.70

## 1.0.0-alpha.71

### Patch Changes

- Updated dependencies [cc7e712]
  - sit-onyx@1.0.0-alpha.69

## 1.0.0-alpha.70

### Patch Changes

- Updated dependencies [20fe4ff]
  - sit-onyx@1.0.0-alpha.68

## 1.0.0-alpha.69

### Patch Changes

- Updated dependencies [e51f8cb]
  - sit-onyx@1.0.0-alpha.67

## 1.0.0-alpha.68

### Patch Changes

- Updated dependencies [4747445]
- Updated dependencies [4747445]
- Updated dependencies [4747445]
- Updated dependencies [4747445]
- Updated dependencies [4747445]
  - sit-onyx@1.0.0-alpha.66

## 1.0.0-alpha.67

### Patch Changes

- Updated dependencies [e9eae68]
  - sit-onyx@1.0.0-alpha.65

## 1.0.0-alpha.66

### Patch Changes

- Updated dependencies [4e2a5bb]
  - sit-onyx@1.0.0-alpha.64

## 1.0.0-alpha.65

### Patch Changes

- Updated dependencies [03fea09]
  - sit-onyx@1.0.0-alpha.63

## 1.0.0-alpha.64

### Patch Changes

- Updated dependencies [cde1fdd]
  - sit-onyx@1.0.0-alpha.62

## 1.0.0-alpha.63

### Patch Changes

- Updated dependencies [93c4495]
  - sit-onyx@1.0.0-alpha.61

## 1.0.0-alpha.62

### Patch Changes

- Updated dependencies [b31b7c5]
  - sit-onyx@1.0.0-alpha.60

## 1.0.0-alpha.61

### Patch Changes

- Updated dependencies [fe0f615]
  - sit-onyx@1.0.0-alpha.59

## 1.0.0-alpha.60

### Patch Changes

- Updated dependencies [70b545e]
  - sit-onyx@1.0.0-alpha.58

## 1.0.0-alpha.59

### Patch Changes

- Updated dependencies [d4bb972]
  - sit-onyx@1.0.0-alpha.57

## 1.0.0-alpha.58

### Patch Changes

- Updated dependencies [6631b3d]
  - sit-onyx@1.0.0-alpha.56

## 1.0.0-alpha.57

### Patch Changes

- Updated dependencies [b7758f7]
  - sit-onyx@1.0.0-alpha.55

## 1.0.0-alpha.56

### Patch Changes

- Updated dependencies [40b72b2]
  - sit-onyx@1.0.0-alpha.54

## 1.0.0-alpha.55

### Patch Changes

- Updated dependencies [10fb012]
- Updated dependencies [cb3a72b]
  - sit-onyx@1.0.0-alpha.53

## 1.0.0-alpha.54

### Patch Changes

- Updated dependencies [9dec6c0]
  - sit-onyx@1.0.0-alpha.52

## 1.0.0-alpha.53

### Patch Changes

- Updated dependencies [a2181c6]
  - sit-onyx@1.0.0-alpha.51

## 1.0.0-alpha.52

### Patch Changes

- Updated dependencies [3d3e728]
  - sit-onyx@1.0.0-alpha.50

## 1.0.0-alpha.51

### Patch Changes

- Updated dependencies [668d5fe]
  - sit-onyx@1.0.0-alpha.49

## 1.0.0-alpha.50

### Patch Changes

- Updated dependencies [2eb0867]
  - sit-onyx@1.0.0-alpha.48

## 1.0.0-alpha.49

### Patch Changes

- Updated dependencies [9ad6208]
  - sit-onyx@1.0.0-alpha.47

## 1.0.0-alpha.48

### Patch Changes

- Updated dependencies [fd86fa1]
  - sit-onyx@1.0.0-alpha.46

## 1.0.0-alpha.47

### Patch Changes

- Updated dependencies [27c2bb8]
  - sit-onyx@1.0.0-alpha.45

## 1.0.0-alpha.46

### Patch Changes

- Updated dependencies [3ec3d94]
  - sit-onyx@1.0.0-alpha.44

## 1.0.0-alpha.45

### Patch Changes

- Updated dependencies [fc36296]
  - sit-onyx@1.0.0-alpha.43

## 1.0.0-alpha.44

### Patch Changes

- Updated dependencies [6874b99]
  - sit-onyx@1.0.0-alpha.42

## 1.0.0-alpha.43

### Patch Changes

- Updated dependencies [05b233a]
  - sit-onyx@1.0.0-alpha.41

## 1.0.0-alpha.42

### Patch Changes

- Updated dependencies [179a847]
  - sit-onyx@1.0.0-alpha.40

## 1.0.0-alpha.41

### Patch Changes

- Updated dependencies [c4d1c19]
  - sit-onyx@1.0.0-alpha.39

## 1.0.0-alpha.40

### Patch Changes

- Updated dependencies [5678b46]
  - sit-onyx@1.0.0-alpha.38

## 1.0.0-alpha.39

### Patch Changes

- Updated dependencies [d30c0b6]
- Updated dependencies [d30c0b6]
- Updated dependencies [d30c0b6]
  - sit-onyx@1.0.0-alpha.37

## 1.0.0-alpha.38

### Patch Changes

- Updated dependencies [e4e1983]
- Updated dependencies [e4e1983]
  - sit-onyx@1.0.0-alpha.36

## 1.0.0-alpha.37

### Patch Changes

- Updated dependencies [3198059]
  - sit-onyx@1.0.0-alpha.35

## 1.0.0-alpha.36

### Patch Changes

- Updated dependencies [a8ad4ff]
  - sit-onyx@1.0.0-alpha.34

## 1.0.0-alpha.35

### Patch Changes

- Updated dependencies [ab2fbb8]
  - sit-onyx@1.0.0-alpha.33

## 1.0.0-alpha.34

### Patch Changes

- Updated dependencies [c147e3d]
  - sit-onyx@1.0.0-alpha.32

## 1.0.0-alpha.33

### Patch Changes

- Updated dependencies [69f1569]
  - sit-onyx@1.0.0-alpha.31

## 1.0.0-alpha.32

### Patch Changes

- Updated dependencies [c785597]
  - sit-onyx@1.0.0-alpha.30

## 1.0.0-alpha.31

### Patch Changes

- Updated dependencies [f04d083]
  - sit-onyx@1.0.0-alpha.29

## 1.0.0-alpha.30

### Patch Changes

- Updated dependencies [62c8d65]
  - sit-onyx@1.0.0-alpha.28

## 1.0.0-alpha.29

### Patch Changes

- Updated dependencies [827a893]
  - sit-onyx@1.0.0-alpha.27

## 1.0.0-alpha.28

### Patch Changes

- Updated dependencies [2bc861c]
  - sit-onyx@1.0.0-alpha.26

## 1.0.0-alpha.27

### Patch Changes

- Updated dependencies [743d6b9]
  - sit-onyx@1.0.0-alpha.25

## 1.0.0-alpha.26

### Patch Changes

- sit-onyx@1.0.0-alpha.24

## 1.0.0-alpha.25

### Patch Changes

- Updated dependencies [a3bc165]
  - sit-onyx@1.0.0-alpha.23

## 1.0.0-alpha.24

### Minor Changes

- 778bc7d: feat: set browser color scheme depending on selected theme

## 1.0.0-alpha.23

### Patch Changes

- Updated dependencies [f859db6]
  - sit-onyx@1.0.0-alpha.22

## 1.0.0-alpha.22

### Patch Changes

- Updated dependencies [6324d32]
  - sit-onyx@1.0.0-alpha.21

## 1.0.0-alpha.21

### Patch Changes

- Updated dependencies [6045208]
  - sit-onyx@1.0.0-alpha.20

## 1.0.0-alpha.20

### Patch Changes

- Updated dependencies [b3b340a]
  - sit-onyx@1.0.0-alpha.19

## 1.0.0-alpha.19

### Patch Changes

- Updated dependencies [ce944e1]
  - sit-onyx@1.0.0-alpha.18

## 1.0.0-alpha.18

### Patch Changes

- Updated dependencies [f7d716c]
  - sit-onyx@1.0.0-alpha.17

## 1.0.0-alpha.17

### Patch Changes

- Updated dependencies [83f78f7]
  - sit-onyx@1.0.0-alpha.16

## 1.0.0-alpha.16

### Patch Changes

- Updated dependencies [1de4414]
  - sit-onyx@1.0.0-alpha.15

## 1.0.0-alpha.15

### Patch Changes

- Updated dependencies [c605dbb]
  - sit-onyx@1.0.0-alpha.14

## 1.0.0-alpha.14

### Patch Changes

- Updated dependencies [1c52657]
  - sit-onyx@1.0.0-alpha.13

## 1.0.0-alpha.13

### Patch Changes

- Updated dependencies [95b6e75]
  - sit-onyx@1.0.0-alpha.12

## 1.0.0-alpha.12

### Patch Changes

- Updated dependencies [97da8df]
  - sit-onyx@1.0.0-alpha.11

## 1.0.0-alpha.11

### Patch Changes

- Updated dependencies [a4df4af]
  - sit-onyx@1.0.0-alpha.10

## 1.0.0-alpha.10

### Patch Changes

- Updated dependencies [eda3982]
  - sit-onyx@0.1.0-alpha.9

## 1.0.0-alpha.9

### Patch Changes

- Updated dependencies [c62476d]
  - sit-onyx@0.1.0-alpha.8

## 1.0.0-alpha.8

### Patch Changes

- Updated dependencies [fdada3a]
  - sit-onyx@0.1.0-alpha.7

## 1.0.0-alpha.7

### Patch Changes

- Updated dependencies [bd5040f]
  - sit-onyx@0.1.0-alpha.6

## 1.0.0-alpha.6

### Patch Changes

- Updated dependencies [8d5c937]
  - sit-onyx@0.1.0-alpha.5

## 1.0.0-alpha.5

### Minor Changes

- 5689fb0: feat: add onyx logo

### Patch Changes

- sit-onyx@0.1.0-alpha.4

## 1.0.0-alpha.4

### Patch Changes

- a190f80: fix: prevent type error when importing as library
- Updated dependencies [a190f80]
- Updated dependencies [a190f80]
  - sit-onyx@0.1.0-alpha.4

## 1.0.0-alpha.3

### Minor Changes

- 9f7e8d1: feat: update default "onyx" theme

### Patch Changes

- Updated dependencies [9f7e8d1]
  - sit-onyx@0.1.0-alpha.3

## 0.1.0-alpha.2

### Patch Changes

- 530af96: fix: prevent unresolvable imports due to missing files
- Updated dependencies [530af96]
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
