# @sit-onyx/nuxt-docs

## 0.7.1

### Patch Changes

- 3efb8bc: fix(sidebar-layout): define content section of TOC layout as container so the actual content width is considered when using the onyx grid
- b2197a5: fix(useCollection): prevent 404 when route starts with locale but has no locale prefix

  This fixes cases where e.g. the route is `/design` for locale `de` which was incorrectly detected as locale prefix (`/de/design`) although no prefix is used in this case.

## 0.7.0

### Minor Changes

- 2a8ce5f: feat(useCollection): require `collection` name to be passed in as parameter
- 2a8ce5f: feat: support passing a `path` option to set which collection path should be queried. By default, the current path will be used instead of the `slug` route parameter
- 2a8ce5f: feat: a fatal 404 error is thrown when the collection item does not exist
- 2a8ce5f: feat: `useSeoMeta()` is automatically called to define the SEO meta for the current collection item
- b20feec: feat(useSidebarNavigation): support new `fields` option to include custom fields for the navigation items
- 2a8ce5f: refactor(useSidebarNavigation)!: require `collection` name to be passed in as parameter

## 0.6.0

### Minor Changes

- 65e3627: feat: support search options for `GlobalSearch`

  You can now override the `GlobalSearch` component to e.g. pass options for generating the search sections:

  ```vue
  <script lang="ts" setup>
  import GlobalSearch from "#layers/onyx/app/components/GlobalSearch.vue";

  const { loggedIn } = useUserSession();
  </script>

  <template>
    <GlobalSearch :options="loggedIn ? undefined : { ignoredTags: ['auth-only'] }" />
  </template>
  ```

### Patch Changes

- 4637a02: fix(sidebar-layout): remove top margin for first child
- Updated dependencies
  - @sit-onyx/mdc@0.2.0

## 0.5.1

### Patch Changes

- Updated dependencies
  - sit-onyx@1.12.0
  - @sit-onyx/icons@1.9.0
  - @sit-onyx/mdc@0.1.0

## 0.5.0

### Minor Changes

- b818852: perf(nuxt-docs): remove `@nuxt/image` due to performance issues

  We've experienced performance issues / "out of memory" issues for some deployment providers when using `@nuxt/image`.
  The `@nuxt/image` module and `ProseImg` was now removed by default so images are no longer automatically optimized.
  Also, you now no longer need to include the `sharp` onlyBuiltDependencies in your `pnpm-workspace.yaml`.

  If you still want to use `@nuxt/image`, simply install the module in your project and create a `app/components/content/ProseImg.vue` file where you are using the `<NuxtImg />` component.

### Patch Changes

- Updated dependencies
  - sit-onyx@1.11.0
  - @sit-onyx/icons@1.8.0

## 0.4.0

### Minor Changes

- 4b31bbd: feat(sidebar-layout): support `hero` slot, remove `noPadding` property since it collides with the TOC
- db6f050: feat: support table of contents for `sidebar` layout

### Patch Changes

- 9ea853e: fix(nav-bar): hide color scheme switch when forced
- Updated dependencies
  - sit-onyx@1.10.0

## 0.3.0

### Minor Changes

- 02318ac: There are now new prose components available for usage in markdown files and existing ones have updated styles.
  - add `InfoCard` component that uses the `OnyxInfoCard`
  - external links are opened with target `_blank` by default
  - add `ProseCode` component for inline code snippets
  - updated vertical spacings for: h2 and h3 headlines, table, PackageManagerCodeTabs and NpmInstallCodeTabs
  - add `ProseHr` component for horizontal separators
  - add `ProseP` component for regular paragraphs
  - replace `ResolvableIcon` component with `useIcon` composable

### Patch Changes

- Updated dependencies
  - sit-onyx@1.8.0
  - @sit-onyx/icons@1.6.0

## 0.2.0

### Minor Changes

- fde0cb5: Support syntax highlighting for `PackageManagerCodeTabs` and `NpmInstallCodeTabs` components.
- 1f3eeb9: feat: support icon for folders and files

  The sidebar layout now supports showing an icon for content folders and pages in the sidebar. Use the "icon" property in the `.navigation.yml` file of a folder or the `navigation.item` frontmatter in your `*.md` files to specify the icon name. For more information, see the [Nuxt Content docs](https://content.nuxt.com/docs/utils/query-collection-navigation#navigation-metadata-with-navigationyml).

  You can browse all available icons in our [icon library](https://onyx.schwarz/icons.html). Important: You need the define the icon name in kebab-case, so e.g. for the "User Settings" icon, use "user-settings".

  Other changes:
  - remove default back button from the nav bar. If needed, you can re-add it by [customizing the nav bar](https://onyx.schwarz/development/packages/nuxt-docs.html#customization)
  - sidebar items that are new sidebar roots now show an arrow icon to indicate that there is nested content
  - fix "Failed to resolve dependency: @nuxtjs/mdc" warning when running the dev server
  - fix: prevent reactivity warning when using markdown tables

- e9e5a8b: - add ProseBr component for accessible line breaks when using `<br />`
  - fix(packageManagerCodeTabs): prevent "Failed to resolve component: ProsePre" warning.
  - feat: make `NpmInstallCodeTabs` a global component so its also available in the [Nuxt Studio](https://nuxt.studio/) visual editor
- d91901d: feat(sidebar): support customizing the sidebar using `.navigation.yml`

  For further information see our [documentation](https://onyx.schwarz/development/packages/nuxt-docs.html#sidebar-layout)

- 8cd0c85: feat: show back button in sidebar for nested sidebar roots

### Patch Changes

- 48291ec: fix: change collection prefix from "" to "/"

  As documented in the [Nuxt content docs](https://content.nuxt.com/docs/collections/sources#prefix), collection prefixes must start with "/" so we fixed the default collection prefix from "" to "/". This also fixes a bug when using [Nuxt Studio](https://nuxt.studio/) where no files/folders are shown.

  **Important**: If you are defining custom collections (e.g. for custom languages), make sure to also fix the prefix if necessary!

- Updated dependencies
  - sit-onyx@1.6.0
  - @sit-onyx/icons@1.4.0

## 0.1.0

### Minor Changes

- 0a67f5b: feat: add `ProsePre` and `NpmInstallCodeTabs` component

  Markdown code snippets are now rendered with the OnyxCodeTabs component. Also a new `NpmInstallCodeTabs` component can be used in markdown files
  to display npm package install commands for common package managers (pnpm, npm, yarn and bun).

- 4a317f3: feat: support global search inside nav bar by default

  The default nav bar now features a global search that can be used to search any markdown content as well as changing the app language and color scheme.
  The previous search inside the sidebar layout has been removed since it is now redundant. If you still want to include a sidebar search, pass custom content / slots to the sidebar layout.

### Patch Changes

- 96b22cc: bump peerDependencies version for `@nuxtjs/color-mode` to `>= 4`
- Updated dependencies
  - sit-onyx@1.4.0
  - @sit-onyx/icons@1.2.0

## 1.0.0-beta.132

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.338
  - @sit-onyx/nuxt@1.0.0-beta.315

## 1.0.0-beta.131

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.335
  - @sit-onyx/nuxt@1.0.0-beta.314

## 1.0.0-beta.130

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.328
  - @sit-onyx/nuxt@1.0.0-beta.313

## 1.0.0-beta.129

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.327
  - @sit-onyx/nuxt@1.0.0-beta.312

## 1.0.0-beta.128

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.325
  - @sit-onyx/nuxt@1.0.0-beta.311

## 1.0.0-beta.127

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.324
  - @sit-onyx/nuxt@1.0.0-beta.310

## 1.0.0-beta.126

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.323
  - @sit-onyx/nuxt@1.0.0-beta.309

## 1.0.0-beta.125

### Major Changes

- 0fcd73f: feat: implement `sidebar` layout

  By default, the new `sidebar` layout will be used to render the (markdown / content) pages.
  It will generate a sidebar navigation based on the content structure.

  Also default vertical margins have been added to prose markdown components (h1-h6, ol and ul)

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.322

## 1.0.0-beta.124

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.320
  - @sit-onyx/nuxt@1.0.0-beta.308

## 1.0.0-beta.123

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.319
  - @sit-onyx/nuxt@1.0.0-beta.307

## 1.0.0-beta.122

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.318
  - @sit-onyx/nuxt@1.0.0-beta.306

## 1.0.0-beta.121

### Patch Changes

- 417a4ee: fix: mobile nav bar not working

## 1.0.0-beta.120

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.314
  - @sit-onyx/nuxt@1.0.0-beta.304

## 1.0.0-beta.119

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.313
  - @sit-onyx/nuxt@1.0.0-beta.303

## 1.0.0-beta.118

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.312
  - @sit-onyx/nuxt@1.0.0-beta.302

## 1.0.0-beta.117

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.311
  - @sit-onyx/nuxt@1.0.0-beta.301

## 1.0.0-beta.116

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.309
  - @sit-onyx/nuxt@1.0.0-beta.300

## 1.0.0-beta.115

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.306
  - @sit-onyx/nuxt@1.0.0-beta.299

## 1.0.0-beta.114

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.304
  - @sit-onyx/nuxt@1.0.0-beta.298

## 1.0.0-beta.113

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.300
  - @sit-onyx/nuxt@1.0.0-beta.297

## 1.0.0-beta.112

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.299
  - @sit-onyx/nuxt@1.0.0-beta.296

## 1.0.0-beta.111

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.296
  - @sit-onyx/nuxt@1.0.0-beta.295

## 1.0.0-beta.110

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.295
  - @sit-onyx/nuxt@1.0.0-beta.294

## 1.0.0-beta.109

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.25
  - sit-onyx@1.0.0-beta.294
  - @sit-onyx/nuxt@1.0.0-beta.293

## 1.0.0-beta.108

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.292
  - @sit-onyx/nuxt@1.0.0-beta.292

## 1.0.0-beta.107

### Patch Changes

- Updated dependencies
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

- Updated dependencies
  - sit-onyx@1.0.0-beta.290
  - @sit-onyx/nuxt@1.0.0-beta.290

## 1.0.0-beta.103

### Patch Changes

- Updated dependencies
  - @sit-onyx/nuxt@1.0.0-beta.289

## 1.0.0-beta.102

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.288
  - @sit-onyx/nuxt@1.0.0-beta.288

## 1.0.0-beta.101

### Patch Changes

- bf163a2: fix(nuxt-docs): update page content when navigating

  Previously the page content did not update when dynamically navigating to another route which is fixed now

- Updated dependencies
  - sit-onyx@1.0.0-beta.287

## 1.0.0-beta.100

### Patch Changes

- Updated dependencies
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

- Updated dependencies
  - sit-onyx@1.0.0-beta.285
  - @sit-onyx/nuxt@1.0.0-beta.286

## 1.0.0-beta.96

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.22
  - sit-onyx@1.0.0-beta.284
  - @sit-onyx/nuxt@1.0.0-beta.284

## 1.0.0-beta.95

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.283
  - @sit-onyx/nuxt@1.0.0-beta.283

## 1.0.0-beta.94

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.281
  - @sit-onyx/nuxt@1.0.0-beta.282

## 1.0.0-beta.93

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.280
  - @sit-onyx/nuxt@1.0.0-beta.281

## 1.0.0-beta.92

### Major Changes

- c1ee0f0: Nuxt 4 is supported now which means you need to update your project to Nuxt 4 as well when using the `@sit-onyx/nuxt` or `@sit-onyx/nuxt-docs` package

  The Nuxt I18n integration of `@sit-onyx/nuxt` now also no longer supports the `iso` property when defining locales which means to need to use `@nuxtjs/i18n >= 9.0.0`, see [Nuxt I18n docs](https://v9.i18n.nuxtjs.org/docs/guide/migrating/)

### Patch Changes

- Updated dependencies
  - @sit-onyx/nuxt@1.0.0-beta.280

## 1.0.0-beta.91

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.278
  - @sit-onyx/nuxt@1.0.0-beta.279

## 1.0.0-beta.90

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.277
  - @sit-onyx/nuxt@1.0.0-beta.278

## 1.0.0-beta.89

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.276
  - @sit-onyx/nuxt@1.0.0-beta.277

## 1.0.0-beta.88

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.275
  - @sit-onyx/nuxt@1.0.0-beta.276

## 1.0.0-beta.87

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.274
  - @sit-onyx/nuxt@1.0.0-beta.275

## 1.0.0-beta.86

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.272
  - @sit-onyx/nuxt@1.0.0-beta.274

## 1.0.0-beta.85

### Major Changes

- 1911f6c: feat(dist)!: Removed commonjs builds
  - **BREAKING CHANGE:** We dropped commonjs (cjs) builds and packages are now shipped as a [pure esm package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#pure-esm-package). Node >= 18 is required.

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.21
  - @sit-onyx/nuxt@1.0.0-beta.273
  - sit-onyx@1.0.0-beta.271

## 1.0.0-beta.84

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.20
  - sit-onyx@1.0.0-beta.270
  - @sit-onyx/nuxt@1.0.0-beta.272

## 1.0.0-beta.83

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.269
  - @sit-onyx/nuxt@1.0.0-beta.271

## 1.0.0-beta.82

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.268
  - @sit-onyx/nuxt@1.0.0-beta.270

## 1.0.0-beta.81

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.267
  - @sit-onyx/nuxt@1.0.0-beta.269

## 1.0.0-beta.80

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.266
  - @sit-onyx/nuxt@1.0.0-beta.268

## 1.0.0-beta.79

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.265
  - @sit-onyx/nuxt@1.0.0-beta.267

## 1.0.0-beta.78

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.264
  - @sit-onyx/nuxt@1.0.0-beta.266

## 1.0.0-beta.77

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.263
  - @sit-onyx/nuxt@1.0.0-beta.265

## 1.0.0-beta.76

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.19
  - sit-onyx@1.0.0-beta.262
  - @sit-onyx/nuxt@1.0.0-beta.264

## 1.0.0-beta.75

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.261
  - @sit-onyx/nuxt@1.0.0-beta.263

## 1.0.0-beta.74

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.260
  - @sit-onyx/nuxt@1.0.0-beta.262

## 1.0.0-beta.73

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.259
  - @sit-onyx/nuxt@1.0.0-beta.261

## 1.0.0-beta.72

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.258
  - @sit-onyx/nuxt@1.0.0-beta.260

## 1.0.0-beta.71

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.257
  - @sit-onyx/nuxt@1.0.0-beta.259

## 1.0.0-beta.70

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.256
  - @sit-onyx/nuxt@1.0.0-beta.258

## 1.0.0-beta.69

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.255
  - @sit-onyx/nuxt@1.0.0-beta.257

## 1.0.0-beta.68

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.254
  - @sit-onyx/nuxt@1.0.0-beta.256

## 1.0.0-beta.67

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.253
  - @sit-onyx/nuxt@1.0.0-beta.255

## 1.0.0-beta.66

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.252
  - @sit-onyx/nuxt@1.0.0-beta.254

## 1.0.0-beta.65

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.18
  - sit-onyx@1.0.0-beta.251
  - @sit-onyx/nuxt@1.0.0-beta.253

## 1.0.0-beta.64

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.250
  - @sit-onyx/nuxt@1.0.0-beta.252

## 1.0.0-beta.63

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.249
  - @sit-onyx/nuxt@1.0.0-beta.251

## 1.0.0-beta.62

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.248
  - @sit-onyx/nuxt@1.0.0-beta.250

## 1.0.0-beta.61

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.247
  - @sit-onyx/nuxt@1.0.0-beta.249

## 1.0.0-beta.60

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.246
  - @sit-onyx/nuxt@1.0.0-beta.248

## 1.0.0-beta.59

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.245
  - @sit-onyx/nuxt@1.0.0-beta.247

## 1.0.0-beta.58

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.244
  - @sit-onyx/nuxt@1.0.0-beta.246

## 1.0.0-beta.57

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.243
  - @sit-onyx/nuxt@1.0.0-beta.245

## 1.0.0-beta.56

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.242
  - @sit-onyx/nuxt@1.0.0-beta.244

## 1.0.0-beta.55

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.241
  - @sit-onyx/nuxt@1.0.0-beta.243

## 1.0.0-beta.54

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.240
  - @sit-onyx/nuxt@1.0.0-beta.242

## 1.0.0-beta.53

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.239
  - @sit-onyx/nuxt@1.0.0-beta.241

## 1.0.0-beta.52

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.238
  - @sit-onyx/nuxt@1.0.0-beta.240

## 1.0.0-beta.51

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.237
  - @sit-onyx/nuxt@1.0.0-beta.239

## 1.0.0-beta.50

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.236
  - @sit-onyx/nuxt@1.0.0-beta.238

## 1.0.0-beta.49

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.235
  - @sit-onyx/nuxt@1.0.0-beta.237

## 1.0.0-beta.48

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.234
  - @sit-onyx/nuxt@1.0.0-beta.236

## 1.0.0-beta.47

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.233
  - @sit-onyx/nuxt@1.0.0-beta.235

## 1.0.0-beta.46

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.232
  - @sit-onyx/nuxt@1.0.0-beta.234

## 1.0.0-beta.45

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.231
  - @sit-onyx/nuxt@1.0.0-beta.233

## 1.0.0-beta.44

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.17
  - sit-onyx@1.0.0-beta.230
  - @sit-onyx/nuxt@1.0.0-beta.232

## 1.0.0-beta.43

### Patch Changes

- dfe66db: fix bug where markdown files are not loaded when using `@nuxt/content >= 3.5.0`

## 1.0.0-beta.42

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.229
  - @sit-onyx/nuxt@1.0.0-beta.231

## 1.0.0-beta.41

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.228
  - @sit-onyx/nuxt@1.0.0-beta.230

## 1.0.0-beta.40

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.227
  - @sit-onyx/nuxt@1.0.0-beta.229

## 1.0.0-beta.39

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.226
  - @sit-onyx/nuxt@1.0.0-beta.228

## 1.0.0-beta.38

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.225
  - @sit-onyx/nuxt@1.0.0-beta.227

## 1.0.0-beta.37

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.224
  - @sit-onyx/nuxt@1.0.0-beta.226

## 1.0.0-beta.36

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.223
  - @sit-onyx/nuxt@1.0.0-beta.225

## 1.0.0-beta.35

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.222
  - @sit-onyx/nuxt@1.0.0-beta.224

## 1.0.0-beta.34

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.221
  - @sit-onyx/nuxt@1.0.0-beta.223

## 1.0.0-beta.33

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.220
  - @sit-onyx/nuxt@1.0.0-beta.222

## 1.0.0-beta.32

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.219
  - @sit-onyx/nuxt@1.0.0-beta.221

## 1.0.0-beta.31

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.218
  - @sit-onyx/nuxt@1.0.0-beta.220

## 1.0.0-beta.30

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.217
  - @sit-onyx/nuxt@1.0.0-beta.219

## 1.0.0-beta.29

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.216
  - @sit-onyx/nuxt@1.0.0-beta.218

## 1.0.0-beta.28

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.215
  - @sit-onyx/nuxt@1.0.0-beta.217

## 1.0.0-beta.27

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.214
  - @sit-onyx/nuxt@1.0.0-beta.216

## 1.0.0-beta.26

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.213
  - @sit-onyx/nuxt@1.0.0-beta.215

## 1.0.0-beta.25

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.212
  - @sit-onyx/nuxt@1.0.0-beta.214

## 1.0.0-beta.24

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.211
  - @sit-onyx/nuxt@1.0.0-beta.213

## 1.0.0-beta.23

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.210
  - @sit-onyx/nuxt@1.0.0-beta.212

## 1.0.0-beta.22

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.209
  - @sit-onyx/nuxt@1.0.0-beta.211

## 1.0.0-beta.21

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.208
  - @sit-onyx/nuxt@1.0.0-beta.210

## 1.0.0-beta.20

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.207
  - @sit-onyx/nuxt@1.0.0-beta.209

## 1.0.0-beta.19

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.206
  - @sit-onyx/nuxt@1.0.0-beta.208

## 1.0.0-beta.18

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.16
  - sit-onyx@1.0.0-beta.205
  - @sit-onyx/nuxt@1.0.0-beta.207

## 1.0.0-beta.17

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.204
  - @sit-onyx/nuxt@1.0.0-beta.206

## 1.0.0-beta.16

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.203
  - @sit-onyx/nuxt@1.0.0-beta.205

## 1.0.0-beta.15

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.202
  - @sit-onyx/nuxt@1.0.0-beta.204

## 1.0.0-beta.14

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.201
  - @sit-onyx/nuxt@1.0.0-beta.203

## 1.0.0-beta.13

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.200
  - @sit-onyx/nuxt@1.0.0-beta.202

## 1.0.0-beta.12

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.199
  - @sit-onyx/nuxt@1.0.0-beta.201

## 1.0.0-beta.11

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.198
  - @sit-onyx/nuxt@1.0.0-beta.200

## 1.0.0-beta.10

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.197
  - @sit-onyx/nuxt@1.0.0-beta.199

## 1.0.0-beta.9

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.196
  - @sit-onyx/nuxt@1.0.0-beta.198

## 1.0.0-beta.8

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.195
  - @sit-onyx/nuxt@1.0.0-beta.197

## 1.0.0-beta.7

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.194
  - @sit-onyx/nuxt@1.0.0-beta.196

## 1.0.0-beta.6

### Minor Changes

- 2440ab5: feat: use OnyxTable for rendering markdown tables

### Patch Changes

- Updated dependencies
  - @sit-onyx/icons@1.0.0-beta.15
  - sit-onyx@1.0.0-beta.193
  - @sit-onyx/nuxt@1.0.0-beta.195

## 1.0.0-beta.5

### Patch Changes

- Updated dependencies
  - sit-onyx@1.0.0-beta.192
  - @sit-onyx/nuxt@1.0.0-beta.194

## 1.0.0-beta.4

### Patch Changes

- Updated dependencies
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

- Updated dependencies
  - sit-onyx@1.0.0-beta.190
  - @sit-onyx/nuxt@1.0.0-beta.192

## 1.0.0-beta.0

### Major Changes

- f565896: release initial version
