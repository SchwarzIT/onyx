# @sit-onyx/nuxt-docs

## 1.0.0

### Major Changes

- f565896: release initial version
- df455a1: refactor(nuxt-docs): remove app config in favor of Nuxt overrides

  Configuration via `app.config.ts` file has been removed in favor of a more flexible and Nuxt native approach by leveraging the Nuxt layer

  For further information, see the [onyx documentation](https://onyx.schwarz/development/packages/nuxt-docs.html#customization).

- c1ee0f0: Nuxt 4 is supported now which means you need to update your project to Nuxt 4 as well when using the `@sit-onyx/nuxt` or `@sit-onyx/nuxt-docs` package

  The Nuxt I18n integration of `@sit-onyx/nuxt` now also no longer supports the `iso` property when defining locales which means to need to use `@nuxtjs/i18n >= 9.0.0`, see [Nuxt I18n docs](https://v9.i18n.nuxtjs.org/docs/guide/migrating/)

- 1911f6c: feat(dist)!: Removed commonjs builds
  - **BREAKING CHANGE:** We dropped commonjs (cjs) builds and packages are now shipped as a [pure esm package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#pure-esm-package). Node >= 18 is required.

- 63e4499: feat: support Nuxt i18n

  Nuxt i18n integration is now supported by default. For further information see the [onyx documentation](https://onyx.schwarz/development/packages/nuxt-docs.html#i18n).

  The default Nuxt content config has been changed, so by default, markdown files will only be loaded from the `content/en` directory instead of `content/` directly. To migrate, move all existing files to a new `content/en` folder.

### Minor Changes

- 2440ab5: feat: use OnyxTable for rendering markdown tables

### Patch Changes

- dfe66db: fix bug where markdown files are not loaded when using `@nuxt/content >= 3.5.0`
- 3299c59: fix: correctly pack files when publishing

  After the release of version `1.0.0-beta.92`, the Nuxt docs layer did not work at all when used inside a project.
  The reason is that due to the Nuxt 4 migration, all relevant files are now placed inside the "app" directory but our "files" definition in package.json did not include the directory when publishing so the file were missing in the npm package.

- f3c6bef: fix(@sit-onyx/nuxt-docs): prevent missing test module on startup

  Prevent `Cannot find module "@nuxt/test-utils"` error on app start.

- bf163a2: fix(nuxt-docs): update page content when navigating

  Previously the page content did not update when dynamically navigating to another route which is fixed now

- ed69f4e: Fix some issues when trying to use the `@sit-onyx/nuxt-docs` package:
  - remove no longer existing OnyxNavButton in favor of OnyxNavItem. Also include type-check into the build to prevent such issues in the future
  - update docs to include missing required steps/configuration
  - use peerDependencies instead of dependencies
  - remove `useCollection` composable and move the code to the page directly because async composables are not yet fully supported

- 8a06e79: change default grid max-width to lg instead of md
- Updated dependencies [554833c]
- Updated dependencies [a9d89f6]
- Updated dependencies [d4803b3]
- Updated dependencies [5d8349c]
- Updated dependencies [a190f80]
- Updated dependencies [1a4890b]
- Updated dependencies [9e12bcf]
- Updated dependencies [01f8664]
- Updated dependencies [07e862f]
- Updated dependencies [25893ed]
- Updated dependencies [4f26db2]
- Updated dependencies [eb481fe]
- Updated dependencies [9570420]
- Updated dependencies [d8fe4ca]
- Updated dependencies [79033ac]
- Updated dependencies [4747445]
- Updated dependencies [7951251]
- Updated dependencies [fda8a30]
- Updated dependencies [1093e66]
- Updated dependencies [aa0b540]
- Updated dependencies [c011e27]
- Updated dependencies [d556f85]
- Updated dependencies [269348c]
- Updated dependencies [f838364]
- Updated dependencies [24d3589]
- Updated dependencies [15114f7]
- Updated dependencies [4508633]
- Updated dependencies [442e4c5]
- Updated dependencies [dc2125e]
- Updated dependencies [704e624]
- Updated dependencies [b0554c8]
- Updated dependencies [29a8ba6]
- Updated dependencies [4747445]
- Updated dependencies [97da8df]
- Updated dependencies [47cbc94]
- Updated dependencies [d819092]
- Updated dependencies [b31b7c5]
- Updated dependencies [e4e1983]
- Updated dependencies [dfd13a1]
- Updated dependencies [93f4386]
- Updated dependencies [5f28acb]
- Updated dependencies [4be2eda]
- Updated dependencies [60d3920]
- Updated dependencies [d807a65]
- Updated dependencies [5754525]
- Updated dependencies [d48db41]
- Updated dependencies [27c2bb8]
- Updated dependencies [43de03d]
- Updated dependencies [772f6a5]
- Updated dependencies [0788fb3]
- Updated dependencies [1de4414]
- Updated dependencies [156ebb0]
- Updated dependencies [a0717b8]
- Updated dependencies [bf07bd1]
- Updated dependencies [40b72b2]
- Updated dependencies [7c98a6d]
- Updated dependencies [a84ede4]
- Updated dependencies [d9fedd6]
- Updated dependencies [360dc49]
- Updated dependencies [95673cf]
- Updated dependencies [0d8fef8]
- Updated dependencies [fe38f20]
- Updated dependencies [62c8d65]
- Updated dependencies [d244b9e]
- Updated dependencies [68eeaa4]
- Updated dependencies [a3eb7d0]
- Updated dependencies [8692b19]
- Updated dependencies [5cdbe8c]
- Updated dependencies [9279c7b]
- Updated dependencies [4747445]
- Updated dependencies [3d612d4]
- Updated dependencies [f36104b]
- Updated dependencies [68139e0]
- Updated dependencies [4a4c414]
- Updated dependencies [d1984e2]
- Updated dependencies [f46561c]
- Updated dependencies [4c73713]
- Updated dependencies [c335df7]
- Updated dependencies [adec44e]
- Updated dependencies [cde1fdd]
- Updated dependencies [288afbd]
- Updated dependencies [4747445]
- Updated dependencies [ad93142]
- Updated dependencies [abf8414]
- Updated dependencies [20fe4ff]
- Updated dependencies [19011d6]
- Updated dependencies [2cef847]
- Updated dependencies [1d803fb]
- Updated dependencies [bd2f733]
- Updated dependencies [3d3e728]
- Updated dependencies [d9c4cd1]
- Updated dependencies [7d52457]
- Updated dependencies [33700f9]
- Updated dependencies [41eb73c]
- Updated dependencies [1c52657]
- Updated dependencies [15229dd]
- Updated dependencies [5fbc8b3]
- Updated dependencies [dfa58b8]
- Updated dependencies [c7c3296]
- Updated dependencies [641dac7]
- Updated dependencies [beca92e]
- Updated dependencies [f78c792]
- Updated dependencies [934a903]
- Updated dependencies [a2181c6]
- Updated dependencies [69f1569]
- Updated dependencies [92b9375]
- Updated dependencies [c785597]
- Updated dependencies [da169bb]
- Updated dependencies [2ce3192]
- Updated dependencies [0679f49]
- Updated dependencies [b3b340a]
- Updated dependencies [0ae24aa]
- Updated dependencies [a4df4af]
- Updated dependencies [641eac3]
- Updated dependencies [e2f1083]
- Updated dependencies [928de9f]
- Updated dependencies [d54d357]
- Updated dependencies [d4bb972]
- Updated dependencies [d1df993]
- Updated dependencies [fe0f615]
- Updated dependencies [3f55c48]
- Updated dependencies [6755052]
- Updated dependencies [bf3ea0a]
- Updated dependencies [05b233a]
- Updated dependencies [9319044]
- Updated dependencies [0863114]
- Updated dependencies [743d6b9]
- Updated dependencies [21ee2ad]
- Updated dependencies [decc2a1]
- Updated dependencies [7b72cbc]
- Updated dependencies [c867746]
- Updated dependencies [188c94d]
- Updated dependencies [70c7f93]
- Updated dependencies [cd4a885]
- Updated dependencies [43df367]
- Updated dependencies [5f28acb]
- Updated dependencies [164381e]
- Updated dependencies [772f6a5]
- Updated dependencies [6347d45]
- Updated dependencies [07549b9]
- Updated dependencies [93ad5a9]
- Updated dependencies [9dec6c0]
- Updated dependencies [10fb012]
- Updated dependencies [f6f01c6]
- Updated dependencies [8a1c8d4]
- Updated dependencies [258c3ec]
- Updated dependencies [266c356]
- Updated dependencies [2b48da9]
- Updated dependencies [85482cd]
- Updated dependencies [349f412]
- Updated dependencies [656f85b]
- Updated dependencies [73680bc]
- Updated dependencies [8a06c17]
- Updated dependencies [1cc020a]
- Updated dependencies [8664d21]
- Updated dependencies [b7758f7]
- Updated dependencies [02e4f4d]
- Updated dependencies [12f73c3]
- Updated dependencies [0dc1a0c]
- Updated dependencies [dedae71]
- Updated dependencies [e42ca5e]
- Updated dependencies [5fba96d]
- Updated dependencies [529a84f]
- Updated dependencies [b8db0cc]
- Updated dependencies [276eda9]
- Updated dependencies [743ee88]
- Updated dependencies [62cb2ca]
- Updated dependencies [827a893]
- Updated dependencies [02f1a8a]
- Updated dependencies [9bf9a23]
- Updated dependencies [4e2a5bb]
- Updated dependencies [df77108]
- Updated dependencies [02d9f0f]
- Updated dependencies [1cc020a]
- Updated dependencies [e6af99b]
- Updated dependencies [02f5691]
- Updated dependencies [9f7e8d1]
- Updated dependencies [bf1e992]
- Updated dependencies [4b9f366]
- Updated dependencies [d3e9321]
- Updated dependencies [309fb43]
- Updated dependencies [b3f8734]
- Updated dependencies [a5e72f4]
- Updated dependencies [d22943e]
- Updated dependencies [07084b1]
- Updated dependencies [c358978]
- Updated dependencies [d149c34]
- Updated dependencies [d30c0b6]
- Updated dependencies [b3a43c4]
- Updated dependencies [179a847]
- Updated dependencies [760bb76]
- Updated dependencies [68ec3e2]
- Updated dependencies [fc8c38c]
- Updated dependencies [e3a7e82]
- Updated dependencies [eae5bd9]
- Updated dependencies [0f045f0]
- Updated dependencies [b4c466f]
- Updated dependencies [ea9a9e7]
- Updated dependencies [3a9783d]
- Updated dependencies [1c541ae]
- Updated dependencies [24e3d9b]
- Updated dependencies [3c8cf6d]
- Updated dependencies [e4e1983]
- Updated dependencies [4ddd145]
- Updated dependencies [dc832e4]
- Updated dependencies [1fe4a98]
- Updated dependencies [2ea735b]
- Updated dependencies [555ac22]
- Updated dependencies [107ec36]
- Updated dependencies [59bca7e]
- Updated dependencies [52efb24]
- Updated dependencies [4cb0970]
- Updated dependencies [585f2f5]
- Updated dependencies [9eb7b4e]
- Updated dependencies [1274d2c]
- Updated dependencies [4ee1e7f]
- Updated dependencies [e51f8cb]
- Updated dependencies [2cbd69a]
- Updated dependencies [ce944e1]
- Updated dependencies [4c49760]
- Updated dependencies [5678b46]
- Updated dependencies [cae1e24]
- Updated dependencies [3288513]
- Updated dependencies [6a83be5]
- Updated dependencies [de1cc16]
- Updated dependencies [555ac22]
- Updated dependencies [2e93902]
- Updated dependencies [8d5c937]
- Updated dependencies [6e14afd]
- Updated dependencies [142d651]
- Updated dependencies [b8db0cc]
- Updated dependencies [b20fa64]
- Updated dependencies [49f6e5e]
- Updated dependencies [c79e491]
- Updated dependencies [22c2a64]
- Updated dependencies [30b580e]
- Updated dependencies [744f82e]
- Updated dependencies [0511127]
- Updated dependencies [c605dbb]
- Updated dependencies [981495f]
- Updated dependencies [edbfc22]
- Updated dependencies [1554f8e]
- Updated dependencies [6874b99]
- Updated dependencies [cc27e98]
- Updated dependencies [e250589]
- Updated dependencies [f859db6]
- Updated dependencies [808e638]
- Updated dependencies [3163863]
- Updated dependencies [fdada3a]
- Updated dependencies [4747445]
- Updated dependencies [9566cb6]
- Updated dependencies [9cb8667]
- Updated dependencies [10ba878]
- Updated dependencies [d6321d8]
- Updated dependencies [5d223c3]
- Updated dependencies [5210eb5]
- Updated dependencies [8fe1ab6]
- Updated dependencies [405fa0f]
- Updated dependencies [2d87351]
- Updated dependencies [52bef90]
- Updated dependencies [dfa58b8]
- Updated dependencies [404f295]
- Updated dependencies [981495f]
- Updated dependencies [9086251]
- Updated dependencies [dae102e]
- Updated dependencies [2113cae]
- Updated dependencies [13f96c1]
- Updated dependencies [3bc1d58]
- Updated dependencies [cb3a72b]
- Updated dependencies [df86e6d]
- Updated dependencies [be5b415]
- Updated dependencies [0d08fe0]
- Updated dependencies [93c4495]
- Updated dependencies [bd34fb4]
- Updated dependencies [6fe0527]
- Updated dependencies [de2a1e8]
- Updated dependencies [16723a6]
- Updated dependencies [668d5fe]
- Updated dependencies [9747f10]
- Updated dependencies [d0247d1]
- Updated dependencies [e9eae68]
- Updated dependencies [57d81c9]
- Updated dependencies [cc7e712]
- Updated dependencies [48b24d2]
- Updated dependencies [c1ee0f0]
- Updated dependencies [74f5c74]
- Updated dependencies [25bfc85]
- Updated dependencies [0863114]
- Updated dependencies [b7e9aaf]
- Updated dependencies [e014f4e]
- Updated dependencies [3198059]
- Updated dependencies [18bd03a]
- Updated dependencies [19011d6]
- Updated dependencies [244219f]
- Updated dependencies [79dfa6c]
- Updated dependencies [3b9fbf4]
- Updated dependencies [535ecef]
- Updated dependencies [bb12cdf]
- Updated dependencies [530af96]
- Updated dependencies [641dac7]
- Updated dependencies [a8ad4ff]
- Updated dependencies [a7b5140]
- Updated dependencies [d30c0b6]
- Updated dependencies [0bdb49a]
- Updated dependencies [f4086e3]
- Updated dependencies [a9f9321]
- Updated dependencies [8c1cc76]
- Updated dependencies [8d14b72]
- Updated dependencies [80424f9]
- Updated dependencies [cfd6ab1]
- Updated dependencies [a155d1b]
- Updated dependencies [1377af6]
- Updated dependencies [40b517d]
- Updated dependencies [b01942c]
- Updated dependencies [5a27c6a]
- Updated dependencies [3e49c73]
- Updated dependencies [2d0458d]
- Updated dependencies [d7b68e0]
- Updated dependencies [53b0d50]
- Updated dependencies [61c4964]
- Updated dependencies [bcfb916]
- Updated dependencies [3bc89e8]
- Updated dependencies [5e96001]
- Updated dependencies [0142958]
- Updated dependencies [5294c95]
- Updated dependencies [cdc7bae]
- Updated dependencies [fad403a]
- Updated dependencies [83f78f7]
- Updated dependencies [4482d1d]
- Updated dependencies [2805e75]
- Updated dependencies [6045208]
- Updated dependencies [8647795]
- Updated dependencies [a3bc165]
- Updated dependencies [99b2089]
- Updated dependencies [decd55c]
- Updated dependencies [4464ff3]
- Updated dependencies [52d74fe]
- Updated dependencies [1911f6c]
- Updated dependencies [9ca7eec]
- Updated dependencies [c62476d]
- Updated dependencies [fd86fa1]
- Updated dependencies [0426ecd]
- Updated dependencies [a190f80]
- Updated dependencies [053db89]
- Updated dependencies [c92190a]
- Updated dependencies [a0a9847]
- Updated dependencies [dc798ec]
- Updated dependencies [1baef56]
- Updated dependencies [2b48da9]
- Updated dependencies [d40b149]
- Updated dependencies [4115fe3]
- Updated dependencies [c235692]
- Updated dependencies [f7d716c]
- Updated dependencies [fc57919]
- Updated dependencies [3ec3d94]
- Updated dependencies [a886471]
- Updated dependencies [d1cc1d3]
- Updated dependencies [4492231]
- Updated dependencies [d7b68e0]
- Updated dependencies [ec6e617]
- Updated dependencies [78a1019]
- Updated dependencies [edbfc22]
- Updated dependencies [6797674]
- Updated dependencies [80bdfb2]
- Updated dependencies [2bc861c]
- Updated dependencies [c55a599]
- Updated dependencies [ded1477]
- Updated dependencies [c2a6447]
- Updated dependencies [317ecd6]
- Updated dependencies [43a8616]
- Updated dependencies [ca304b6]
- Updated dependencies [cc9e7c6]
- Updated dependencies [6059d12]
- Updated dependencies [2d2ada6]
- Updated dependencies [2b9cbb7]
- Updated dependencies [2eb0867]
- Updated dependencies [b25aa8f]
- Updated dependencies [9cb65e2]
- Updated dependencies [17c0aa5]
- Updated dependencies [eda3982]
- Updated dependencies [f7e965b]
- Updated dependencies [ad447e9]
- Updated dependencies [2617d53]
- Updated dependencies [df21d23]
- Updated dependencies [fc36296]
- Updated dependencies [c60b3bf]
- Updated dependencies [08c0057]
- Updated dependencies [20199a5]
- Updated dependencies [3385622]
- Updated dependencies [cf03735]
- Updated dependencies [8fe041f]
- Updated dependencies [a754cdf]
- Updated dependencies [f0ca40c]
- Updated dependencies [90f9f86]
- Updated dependencies [fad8140]
- Updated dependencies [f1b7110]
- Updated dependencies [6324d32]
- Updated dependencies [8aa66eb]
- Updated dependencies [03fea09]
- Updated dependencies [37ee3fd]
- Updated dependencies [85128a2]
- Updated dependencies [8d65dce]
- Updated dependencies [70e1088]
- Updated dependencies [dd42def]
- Updated dependencies [9f23f13]
- Updated dependencies [c8beae4]
- Updated dependencies [9ad6208]
- Updated dependencies [193ecf2]
- Updated dependencies [e9ef809]
- Updated dependencies [8421235]
- Updated dependencies [8beb853]
- Updated dependencies [10ba878]
- Updated dependencies [70b545e]
- Updated dependencies [124be5e]
- Updated dependencies [ac16768]
- Updated dependencies [9eb7b4e]
- Updated dependencies [bb826a4]
- Updated dependencies [60a738c]
- Updated dependencies [1a11a27]
- Updated dependencies [c4d1c19]
- Updated dependencies [0920aa6]
- Updated dependencies [df521cf]
- Updated dependencies [b525ca5]
- Updated dependencies [6730706]
- Updated dependencies [16c0969]
- Updated dependencies [a39d444]
- Updated dependencies [f471335]
- Updated dependencies [9e3e8c7]
- Updated dependencies [d4fe7d1]
- Updated dependencies [d4fbcf4]
- Updated dependencies [82fffac]
- Updated dependencies [e8c5341]
- Updated dependencies [16f001a]
- Updated dependencies [3763c1c]
- Updated dependencies [bd5040f]
- Updated dependencies [b6e0b67]
- Updated dependencies [d00c404]
- Updated dependencies [1bb49b5]
- Updated dependencies [b7c370d]
- Updated dependencies [3481329]
- Updated dependencies [b4d113a]
- Updated dependencies [09ce727]
- Updated dependencies [7b8ad3d]
- Updated dependencies [e747463]
- Updated dependencies [6631b3d]
- Updated dependencies [5ac259d]
- Updated dependencies [0455a31]
- Updated dependencies [84d29fb]
- Updated dependencies [afe16cf]
- Updated dependencies [0c50fd5]
- Updated dependencies [b2a99a9]
- Updated dependencies [dc00809]
- Updated dependencies [08b434b]
- Updated dependencies [95b6e75]
- Updated dependencies [a780fa0]
- Updated dependencies [ece5641]
- Updated dependencies [f464b42]
- Updated dependencies [6d4199e]
- Updated dependencies [ab2fbb8]
- Updated dependencies [e587be7]
- Updated dependencies [55c0b19]
- Updated dependencies [941b4a3]
- Updated dependencies [34547be]
- Updated dependencies [6f7149f]
- Updated dependencies [5b1aab0]
- Updated dependencies [413d3e0]
- Updated dependencies [de81676]
- Updated dependencies [5e81385]
- Updated dependencies [e061e91]
- Updated dependencies [00ca133]
- Updated dependencies [c147e3d]
- Updated dependencies [e470108]
- Updated dependencies [5c0535e]
- Updated dependencies [9ddcd26]
- Updated dependencies [9e53a89]
- Updated dependencies [0bdb49a]
- Updated dependencies [ff2f8b7]
- Updated dependencies [aa6b94e]
- Updated dependencies [0b8a142]
- Updated dependencies [ee0fcd2]
- Updated dependencies [9f0b003]
- Updated dependencies [f04d083]
- Updated dependencies [2a7a285]
- Updated dependencies [053db89]
- Updated dependencies [6cddb20]
- Updated dependencies [fb01a85]
- Updated dependencies [90f9f86]
- Updated dependencies [33c7595]
- Updated dependencies [a18d955]
- Updated dependencies [309fb43]
- Updated dependencies [d30c0b6]
- Updated dependencies [911a6ea]
- Updated dependencies [da3cad4]
- Updated dependencies [da3cad4]
- Updated dependencies [f1aad40]
- Updated dependencies [b0554c8]
- Updated dependencies [c17ccf7]
- Updated dependencies [697ffcd]
- Updated dependencies [357ac46]
- Updated dependencies [2f825ec]
- Updated dependencies [f99f38f]
- Updated dependencies [f03482f]
- Updated dependencies [1ac3b2a]
- Updated dependencies [467d8f8]
- Updated dependencies [f2a13f6]
- Updated dependencies [67a5e50]
- Updated dependencies [471deaf]
- Updated dependencies [20fb878]
- Updated dependencies [1eb0528]
- Updated dependencies [0d12793]
- Updated dependencies [a498578]
- Updated dependencies [d3f394b]
  - sit-onyx@1.0.0
  - @sit-onyx/nuxt@1.0.0
  - @sit-onyx/icons@1.0.0

## 1.0.0-beta.108

### Patch Changes

- Updated dependencies [df77108]
  - sit-onyx@1.0.0-beta.292
  - @sit-onyx/nuxt@1.0.0-beta.292

## 1.0.0-beta.107

### Patch Changes

- Updated dependencies [269348c]
  - sit-onyx@1.0.0-beta.291
  - @sit-onyx/nuxt@1.0.0-beta.291

## 1.0.0-beta.106

### Major Changes

- df455a1: refactor(nuxt-docs): remove app config in favor of Nuxt overrides

  Configuration via `app.config.ts` file has been removed in favor of a more flexible and Nuxt native approach by leveraging the Nuxt layer

  For further information, see the [onyx documentation](https://onyx.schwarz/development/packages/nuxt-docs.html#customization).

## 1.0.0-beta.105

### Major Changes

- 63e4499: feat: support Nuxt i18n

  Nuxt i18n integration is now supported by default. For further information see the [onyx documentation](https://onyx.schwarz/development/packages/nuxt-docs.html#i18n).

  The default Nuxt content config has been changed, so by default, markdown files will only be loaded from the `content/en` directory instead of `content/` directly. To migrate, move all existing files to a new `content/en` folder.

## 1.0.0-beta.104

### Patch Changes

- Updated dependencies [641eac3]
  - sit-onyx@1.0.0-beta.290
  - @sit-onyx/nuxt@1.0.0-beta.290

## 1.0.0-beta.103

### Patch Changes

- Updated dependencies [dedae71]
  - @sit-onyx/nuxt@1.0.0-beta.289

## 1.0.0-beta.102

### Patch Changes

- Updated dependencies [33c7595]
  - sit-onyx@1.0.0-beta.288
  - @sit-onyx/nuxt@1.0.0-beta.288

## 1.0.0-beta.101

### Patch Changes

- bf163a2: fix(nuxt-docs): update page content when navigating

  Previously the page content did not update when dynamically navigating to another route which is fixed now

- Updated dependencies [0c50fd5]
  - sit-onyx@1.0.0-beta.287

## 1.0.0-beta.100

### Patch Changes

- Updated dependencies [b4d113a]
  - @sit-onyx/icons@1.0.0-beta.24
  - sit-onyx@1.0.0-beta.286
  - @sit-onyx/nuxt@1.0.0-beta.287

## 1.0.0-beta.99

### Patch Changes

- 8a06e79: change default grid max-width to lg instead of md

## 1.0.0-beta.98

### Patch Changes

- 3299c59: fix: correctly pack files when publishing

  After the release of version `1.0.0-beta.92`, the Nuxt docs layer did not work at all when used inside a project.
  The reason is that due to the Nuxt 4 migration, all relevant files are now placed inside the "app" directory but our "files" definition in package.json did not include the directory when publishing so the file were missing in the npm package.

## 1.0.0-beta.97

### Patch Changes

- Updated dependencies [5cdbe8c]
  - sit-onyx@1.0.0-beta.285
  - @sit-onyx/nuxt@1.0.0-beta.286

## 1.0.0-beta.96

### Patch Changes

- Updated dependencies [c235692]
  - @sit-onyx/icons@1.0.0-beta.22
  - sit-onyx@1.0.0-beta.284
  - @sit-onyx/nuxt@1.0.0-beta.284

## 1.0.0-beta.95

### Patch Changes

- Updated dependencies [405fa0f]
  - sit-onyx@1.0.0-beta.283
  - @sit-onyx/nuxt@1.0.0-beta.283

## 1.0.0-beta.94

### Patch Changes

- Updated dependencies [f78c792]
  - sit-onyx@1.0.0-beta.281
  - @sit-onyx/nuxt@1.0.0-beta.282

## 1.0.0-beta.93

### Patch Changes

- Updated dependencies [ca304b6]
  - sit-onyx@1.0.0-beta.280
  - @sit-onyx/nuxt@1.0.0-beta.281

## 1.0.0-beta.92

### Major Changes

- c1ee0f0: Nuxt 4 is supported now which means you need to update your project to Nuxt 4 as well when using the `@sit-onyx/nuxt` or `@sit-onyx/nuxt-docs` package

  The Nuxt I18n integration of `@sit-onyx/nuxt` now also no longer supports the `iso` property when defining locales which means to need to use `@nuxtjs/i18n >= 9.0.0`, see [Nuxt I18n docs](https://v9.i18n.nuxtjs.org/docs/guide/migrating/)

### Patch Changes

- Updated dependencies [c1ee0f0]
  - @sit-onyx/nuxt@1.0.0-beta.280

## 1.0.0-beta.91

### Patch Changes

- Updated dependencies [317ecd6]
  - sit-onyx@1.0.0-beta.278
  - @sit-onyx/nuxt@1.0.0-beta.279

## 1.0.0-beta.90

### Patch Changes

- Updated dependencies [941b4a3]
  - sit-onyx@1.0.0-beta.277
  - @sit-onyx/nuxt@1.0.0-beta.278

## 1.0.0-beta.89

### Patch Changes

- Updated dependencies [4115fe3]
  - sit-onyx@1.0.0-beta.276
  - @sit-onyx/nuxt@1.0.0-beta.277

## 1.0.0-beta.88

### Patch Changes

- Updated dependencies [ff2f8b7]
  - sit-onyx@1.0.0-beta.275
  - @sit-onyx/nuxt@1.0.0-beta.276

## 1.0.0-beta.87

### Patch Changes

- Updated dependencies [4f26db2]
  - sit-onyx@1.0.0-beta.274
  - @sit-onyx/nuxt@1.0.0-beta.275

## 1.0.0-beta.86

### Patch Changes

- Updated dependencies [928de9f]
  - sit-onyx@1.0.0-beta.272
  - @sit-onyx/nuxt@1.0.0-beta.274

## 1.0.0-beta.85

### Major Changes

- 1911f6c: feat(dist)!: Removed commonjs builds
  - **BREAKING CHANGE:** We dropped commonjs (cjs) builds and packages are now shipped as a [pure esm package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#pure-esm-package). Node >= 18 is required.

### Patch Changes

- Updated dependencies [1911f6c]
  - @sit-onyx/icons@1.0.0-beta.21
  - @sit-onyx/nuxt@1.0.0-beta.273
  - sit-onyx@1.0.0-beta.271

## 1.0.0-beta.84

### Patch Changes

- Updated dependencies [eb481fe]
  - @sit-onyx/icons@1.0.0-beta.20
  - sit-onyx@1.0.0-beta.270
  - @sit-onyx/nuxt@1.0.0-beta.272

## 1.0.0-beta.83

### Patch Changes

- Updated dependencies [6cddb20]
  - sit-onyx@1.0.0-beta.269
  - @sit-onyx/nuxt@1.0.0-beta.271

## 1.0.0-beta.82

### Patch Changes

- Updated dependencies [c92190a]
  - sit-onyx@1.0.0-beta.268
  - @sit-onyx/nuxt@1.0.0-beta.270

## 1.0.0-beta.81

### Patch Changes

- Updated dependencies [73680bc]
  - sit-onyx@1.0.0-beta.267
  - @sit-onyx/nuxt@1.0.0-beta.269

## 1.0.0-beta.80

### Patch Changes

- Updated dependencies [3481329]
  - sit-onyx@1.0.0-beta.266
  - @sit-onyx/nuxt@1.0.0-beta.268

## 1.0.0-beta.79

### Patch Changes

- Updated dependencies [2cbd69a]
  - sit-onyx@1.0.0-beta.265
  - @sit-onyx/nuxt@1.0.0-beta.267

## 1.0.0-beta.78

### Patch Changes

- Updated dependencies [ec6e617]
  - sit-onyx@1.0.0-beta.264
  - @sit-onyx/nuxt@1.0.0-beta.266

## 1.0.0-beta.77

### Patch Changes

- Updated dependencies [cc27e98]
  - sit-onyx@1.0.0-beta.263
  - @sit-onyx/nuxt@1.0.0-beta.265

## 1.0.0-beta.76

### Patch Changes

- Updated dependencies [5a27c6a]
  - @sit-onyx/icons@1.0.0-beta.19
  - sit-onyx@1.0.0-beta.262
  - @sit-onyx/nuxt@1.0.0-beta.264

## 1.0.0-beta.75

### Patch Changes

- Updated dependencies [43de03d]
  - sit-onyx@1.0.0-beta.261
  - @sit-onyx/nuxt@1.0.0-beta.263

## 1.0.0-beta.74

### Patch Changes

- Updated dependencies [2617d53]
  - sit-onyx@1.0.0-beta.260
  - @sit-onyx/nuxt@1.0.0-beta.262

## 1.0.0-beta.73

### Patch Changes

- Updated dependencies [dc798ec]
  - sit-onyx@1.0.0-beta.259
  - @sit-onyx/nuxt@1.0.0-beta.261

## 1.0.0-beta.72

### Patch Changes

- Updated dependencies [6797674]
  - sit-onyx@1.0.0-beta.258
  - @sit-onyx/nuxt@1.0.0-beta.260

## 1.0.0-beta.71

### Patch Changes

- Updated dependencies [0d08fe0]
- Updated dependencies [3763c1c]
  - sit-onyx@1.0.0-beta.257
  - @sit-onyx/nuxt@1.0.0-beta.259

## 1.0.0-beta.70

### Patch Changes

- Updated dependencies [fb01a85]
  - sit-onyx@1.0.0-beta.256
  - @sit-onyx/nuxt@1.0.0-beta.258

## 1.0.0-beta.69

### Patch Changes

- Updated dependencies [df86e6d]
  - sit-onyx@1.0.0-beta.255
  - @sit-onyx/nuxt@1.0.0-beta.257

## 1.0.0-beta.68

### Patch Changes

- Updated dependencies [d22943e]
  - sit-onyx@1.0.0-beta.254
  - @sit-onyx/nuxt@1.0.0-beta.256

## 1.0.0-beta.67

### Patch Changes

- Updated dependencies [dfd13a1]
  - sit-onyx@1.0.0-beta.253
  - @sit-onyx/nuxt@1.0.0-beta.255

## 1.0.0-beta.66

### Patch Changes

- Updated dependencies [49f6e5e]
  - sit-onyx@1.0.0-beta.252
  - @sit-onyx/nuxt@1.0.0-beta.254

## 1.0.0-beta.65

### Patch Changes

- Updated dependencies [d1df993]
  - @sit-onyx/icons@1.0.0-beta.18
  - sit-onyx@1.0.0-beta.251
  - @sit-onyx/nuxt@1.0.0-beta.253

## 1.0.0-beta.64

### Patch Changes

- Updated dependencies [9086251]
  - sit-onyx@1.0.0-beta.250
  - @sit-onyx/nuxt@1.0.0-beta.252

## 1.0.0-beta.63

### Patch Changes

- Updated dependencies [9f0b003]
  - sit-onyx@1.0.0-beta.249
  - @sit-onyx/nuxt@1.0.0-beta.251

## 1.0.0-beta.62

### Patch Changes

- Updated dependencies [0142958]
  - sit-onyx@1.0.0-beta.248
  - @sit-onyx/nuxt@1.0.0-beta.250

## 1.0.0-beta.61

### Patch Changes

- Updated dependencies [cc9e7c6]
  - sit-onyx@1.0.0-beta.247
  - @sit-onyx/nuxt@1.0.0-beta.249

## 1.0.0-beta.60

### Patch Changes

- Updated dependencies [f838364]
  - sit-onyx@1.0.0-beta.246
  - @sit-onyx/nuxt@1.0.0-beta.248

## 1.0.0-beta.59

### Patch Changes

- Updated dependencies [10ba878]
- Updated dependencies [10ba878]
  - sit-onyx@1.0.0-beta.245
  - @sit-onyx/nuxt@1.0.0-beta.247

## 1.0.0-beta.58

### Patch Changes

- Updated dependencies [656f85b]
  - sit-onyx@1.0.0-beta.244
  - @sit-onyx/nuxt@1.0.0-beta.246

## 1.0.0-beta.57

### Patch Changes

- Updated dependencies [6d4199e]
  - sit-onyx@1.0.0-beta.243
  - @sit-onyx/nuxt@1.0.0-beta.245

## 1.0.0-beta.56

### Patch Changes

- Updated dependencies [d3f394b]
  - sit-onyx@1.0.0-beta.242
  - @sit-onyx/nuxt@1.0.0-beta.244

## 1.0.0-beta.55

### Patch Changes

- Updated dependencies [9747f10]
  - sit-onyx@1.0.0-beta.241
  - @sit-onyx/nuxt@1.0.0-beta.243

## 1.0.0-beta.54

### Patch Changes

- Updated dependencies [60a738c]
  - sit-onyx@1.0.0-beta.240
  - @sit-onyx/nuxt@1.0.0-beta.242

## 1.0.0-beta.53

### Patch Changes

- Updated dependencies [404f295]
  - sit-onyx@1.0.0-beta.239
  - @sit-onyx/nuxt@1.0.0-beta.241

## 1.0.0-beta.52

### Patch Changes

- Updated dependencies [1554f8e]
  - sit-onyx@1.0.0-beta.238
  - @sit-onyx/nuxt@1.0.0-beta.240

## 1.0.0-beta.51

### Patch Changes

- Updated dependencies [2ce3192]
  - sit-onyx@1.0.0-beta.237
  - @sit-onyx/nuxt@1.0.0-beta.239

## 1.0.0-beta.50

### Patch Changes

- Updated dependencies [fad403a]
  - sit-onyx@1.0.0-beta.236
  - @sit-onyx/nuxt@1.0.0-beta.238

## 1.0.0-beta.49

### Patch Changes

- Updated dependencies [e014f4e]
  - sit-onyx@1.0.0-beta.235
  - @sit-onyx/nuxt@1.0.0-beta.237

## 1.0.0-beta.48

### Patch Changes

- Updated dependencies [d4803b3]
  - sit-onyx@1.0.0-beta.234
  - @sit-onyx/nuxt@1.0.0-beta.236

## 1.0.0-beta.47

### Patch Changes

- Updated dependencies [9566cb6]
  - sit-onyx@1.0.0-beta.233
  - @sit-onyx/nuxt@1.0.0-beta.235

## 1.0.0-beta.46

### Patch Changes

- Updated dependencies [21ee2ad]
  - sit-onyx@1.0.0-beta.232
  - @sit-onyx/nuxt@1.0.0-beta.234

## 1.0.0-beta.45

### Patch Changes

- Updated dependencies [a84ede4]
  - sit-onyx@1.0.0-beta.231
  - @sit-onyx/nuxt@1.0.0-beta.233

## 1.0.0-beta.44

### Patch Changes

- Updated dependencies [0f045f0]
  - @sit-onyx/icons@1.0.0-beta.17
  - sit-onyx@1.0.0-beta.230
  - @sit-onyx/nuxt@1.0.0-beta.232

## 1.0.0-beta.43

### Patch Changes

- dfe66db: fix bug where markdown files are not loaded when using `@nuxt/content >= 3.5.0`

## 1.0.0-beta.42

### Patch Changes

- Updated dependencies [1a4890b]
  - sit-onyx@1.0.0-beta.229
  - @sit-onyx/nuxt@1.0.0-beta.231

## 1.0.0-beta.41

### Patch Changes

- Updated dependencies [dc832e4]
  - sit-onyx@1.0.0-beta.228
  - @sit-onyx/nuxt@1.0.0-beta.230

## 1.0.0-beta.40

### Patch Changes

- Updated dependencies [d149c34]
  - sit-onyx@1.0.0-beta.227
  - @sit-onyx/nuxt@1.0.0-beta.229

## 1.0.0-beta.39

### Patch Changes

- Updated dependencies [266c356]
  - sit-onyx@1.0.0-beta.226
  - @sit-onyx/nuxt@1.0.0-beta.228

## 1.0.0-beta.38

### Patch Changes

- Updated dependencies [decc2a1]
  - sit-onyx@1.0.0-beta.225
  - @sit-onyx/nuxt@1.0.0-beta.227

## 1.0.0-beta.37

### Patch Changes

- Updated dependencies [535ecef]
  - sit-onyx@1.0.0-beta.224
  - @sit-onyx/nuxt@1.0.0-beta.226

## 1.0.0-beta.36

### Patch Changes

- Updated dependencies [43df367]
  - sit-onyx@1.0.0-beta.223
  - @sit-onyx/nuxt@1.0.0-beta.225

## 1.0.0-beta.35

### Patch Changes

- Updated dependencies [f4086e3]
  - sit-onyx@1.0.0-beta.222
  - @sit-onyx/nuxt@1.0.0-beta.224

## 1.0.0-beta.34

### Patch Changes

- Updated dependencies [1bb49b5]
  - sit-onyx@1.0.0-beta.221
  - @sit-onyx/nuxt@1.0.0-beta.223

## 1.0.0-beta.33

### Patch Changes

- Updated dependencies [fc57919]
  - sit-onyx@1.0.0-beta.220
  - @sit-onyx/nuxt@1.0.0-beta.222

## 1.0.0-beta.32

### Patch Changes

- Updated dependencies [d807a65]
  - sit-onyx@1.0.0-beta.219
  - @sit-onyx/nuxt@1.0.0-beta.221

## 1.0.0-beta.31

### Patch Changes

- Updated dependencies [bd2f733]
  - sit-onyx@1.0.0-beta.218
  - @sit-onyx/nuxt@1.0.0-beta.220

## 1.0.0-beta.30

### Patch Changes

- Updated dependencies [30b580e]
  - sit-onyx@1.0.0-beta.217
  - @sit-onyx/nuxt@1.0.0-beta.219

## 1.0.0-beta.29

### Patch Changes

- Updated dependencies [bb12cdf]
  - sit-onyx@1.0.0-beta.216
  - @sit-onyx/nuxt@1.0.0-beta.218

## 1.0.0-beta.28

### Patch Changes

- Updated dependencies [e747463]
  - sit-onyx@1.0.0-beta.215
  - @sit-onyx/nuxt@1.0.0-beta.217

## 1.0.0-beta.27

### Patch Changes

- Updated dependencies [9e12bcf]
  - sit-onyx@1.0.0-beta.214
  - @sit-onyx/nuxt@1.0.0-beta.216

## 1.0.0-beta.26

### Patch Changes

- Updated dependencies [3288513]
  - sit-onyx@1.0.0-beta.213
  - @sit-onyx/nuxt@1.0.0-beta.215

## 1.0.0-beta.25

### Patch Changes

- Updated dependencies [fe38f20]
  - sit-onyx@1.0.0-beta.212
  - @sit-onyx/nuxt@1.0.0-beta.214

## 1.0.0-beta.24

### Patch Changes

- Updated dependencies [e2f1083]
  - sit-onyx@1.0.0-beta.211
  - @sit-onyx/nuxt@1.0.0-beta.213

## 1.0.0-beta.23

### Patch Changes

- Updated dependencies [a39d444]
  - sit-onyx@1.0.0-beta.210
  - @sit-onyx/nuxt@1.0.0-beta.212

## 1.0.0-beta.22

### Patch Changes

- Updated dependencies [bd34fb4]
  - sit-onyx@1.0.0-beta.209
  - @sit-onyx/nuxt@1.0.0-beta.211

## 1.0.0-beta.21

### Patch Changes

- Updated dependencies [4cb0970]
  - sit-onyx@1.0.0-beta.208
  - @sit-onyx/nuxt@1.0.0-beta.210

## 1.0.0-beta.20

### Patch Changes

- Updated dependencies [911a6ea]
  - sit-onyx@1.0.0-beta.207
  - @sit-onyx/nuxt@1.0.0-beta.209

## 1.0.0-beta.19

### Patch Changes

- Updated dependencies [24d3589]
  - sit-onyx@1.0.0-beta.206
  - @sit-onyx/nuxt@1.0.0-beta.208

## 1.0.0-beta.18

### Patch Changes

- Updated dependencies [de2a1e8]
  - @sit-onyx/icons@1.0.0-beta.16
  - sit-onyx@1.0.0-beta.205
  - @sit-onyx/nuxt@1.0.0-beta.207

## 1.0.0-beta.17

### Patch Changes

- Updated dependencies [0788fb3]
  - sit-onyx@1.0.0-beta.204
  - @sit-onyx/nuxt@1.0.0-beta.206

## 1.0.0-beta.16

### Patch Changes

- Updated dependencies [5fbc8b3]
  - sit-onyx@1.0.0-beta.203
  - @sit-onyx/nuxt@1.0.0-beta.205

## 1.0.0-beta.15

### Patch Changes

- Updated dependencies [a780fa0]
  - sit-onyx@1.0.0-beta.202
  - @sit-onyx/nuxt@1.0.0-beta.204

## 1.0.0-beta.14

### Patch Changes

- Updated dependencies [68ec3e2]
  - sit-onyx@1.0.0-beta.201
  - @sit-onyx/nuxt@1.0.0-beta.203

## 1.0.0-beta.13

### Patch Changes

- Updated dependencies [0455a31]
  - sit-onyx@1.0.0-beta.200
  - @sit-onyx/nuxt@1.0.0-beta.202

## 1.0.0-beta.12

### Patch Changes

- Updated dependencies [60d3920]
  - sit-onyx@1.0.0-beta.199
  - @sit-onyx/nuxt@1.0.0-beta.201

## 1.0.0-beta.11

### Patch Changes

- Updated dependencies [68139e0]
  - sit-onyx@1.0.0-beta.198
  - @sit-onyx/nuxt@1.0.0-beta.200

## 1.0.0-beta.10

### Patch Changes

- Updated dependencies [1274d2c]
  - sit-onyx@1.0.0-beta.197
  - @sit-onyx/nuxt@1.0.0-beta.199

## 1.0.0-beta.9

### Patch Changes

- Updated dependencies [053db89]
- Updated dependencies [053db89]
  - sit-onyx@1.0.0-beta.196
  - @sit-onyx/nuxt@1.0.0-beta.198

## 1.0.0-beta.8

### Patch Changes

- Updated dependencies [e061e91]
  - sit-onyx@1.0.0-beta.195
  - @sit-onyx/nuxt@1.0.0-beta.197

## 1.0.0-beta.7

### Patch Changes

- Updated dependencies [e470108]
  - sit-onyx@1.0.0-beta.194
  - @sit-onyx/nuxt@1.0.0-beta.196

## 1.0.0-beta.6

### Minor Changes

- 2440ab5: feat: use OnyxTable for rendering markdown tables

### Patch Changes

- Updated dependencies [e9ef809]
  - @sit-onyx/icons@1.0.0-beta.15
  - sit-onyx@1.0.0-beta.193
  - @sit-onyx/nuxt@1.0.0-beta.195

## 1.0.0-beta.5

### Patch Changes

- Updated dependencies [e587be7]
  - sit-onyx@1.0.0-beta.192
  - @sit-onyx/nuxt@1.0.0-beta.194

## 1.0.0-beta.4

### Patch Changes

- Updated dependencies [d556f85]
  - sit-onyx@1.0.0-beta.191
  - @sit-onyx/nuxt@1.0.0-beta.193

## 1.0.0-beta.3

### Patch Changes

- f3c6bef: fix(@sit-onyx/nuxt-docs): prevent missing test module on startup

  Prevent `Cannot find module "@nuxt/test-utils"` error on app start.

## 1.0.0-beta.2

### Patch Changes

- ed69f4e: Fix some issues when trying to use the `@sit-onyx/nuxt-docs` package:
  - remove no longer existing OnyxNavButton in favor of OnyxNavItem. Also include type-check into the build to prevent such issues in the future
  - update docs to include missing required steps/configuration
  - use peerDependencies instead of dependencies
  - remove `useCollection` composable and move the code to the page directly because async composables are not yet fully supported

## 1.0.0-beta.1

### Patch Changes

- Updated dependencies [4b9f366]
  - sit-onyx@1.0.0-beta.190
  - @sit-onyx/nuxt@1.0.0-beta.192

## 1.0.0-beta.0

### Major Changes

- f565896: release initial version
