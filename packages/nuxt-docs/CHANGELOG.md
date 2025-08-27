# @sit-onyx/nuxt-docs

## 1.0.0-beta.116

### Patch Changes

- Updated dependencies [9571f60]
  - sit-onyx@1.0.0-beta.309
  - @sit-onyx/nuxt@1.0.0-beta.300

## 1.0.0-beta.115

### Patch Changes

- Updated dependencies [4834b5e]
  - sit-onyx@1.0.0-beta.306
  - @sit-onyx/nuxt@1.0.0-beta.299

## 1.0.0-beta.114

### Patch Changes

- Updated dependencies [4ef837e]
  - sit-onyx@1.0.0-beta.304
  - @sit-onyx/nuxt@1.0.0-beta.298

## 1.0.0-beta.113

### Patch Changes

- Updated dependencies [6ce11e4]
  - sit-onyx@1.0.0-beta.300
  - @sit-onyx/nuxt@1.0.0-beta.297

## 1.0.0-beta.112

### Patch Changes

- Updated dependencies [5c4d84f]
  - sit-onyx@1.0.0-beta.299
  - @sit-onyx/nuxt@1.0.0-beta.296

## 1.0.0-beta.111

### Patch Changes

- Updated dependencies [30c816b]
  - sit-onyx@1.0.0-beta.296
  - @sit-onyx/nuxt@1.0.0-beta.295

## 1.0.0-beta.110

### Patch Changes

- Updated dependencies [2c6fbd3]
  - sit-onyx@1.0.0-beta.295
  - @sit-onyx/nuxt@1.0.0-beta.294

## 1.0.0-beta.109

### Patch Changes

- Updated dependencies [1ed4c6b]
  - @sit-onyx/icons@1.0.0-beta.25
  - sit-onyx@1.0.0-beta.294
  - @sit-onyx/nuxt@1.0.0-beta.293

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
