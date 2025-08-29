# sit-onyx

## 1.0.0-beta.315

### Patch Changes

- 7321967: fix(OnyxInput): update leading/trailing slot separator color in dark mode

## 1.0.0-beta.314

### Minor Changes

- a715969: feat(OnyxFileUpload): add file type validation for accept property

## 1.0.0-beta.313

### Minor Changes

- fa3ccdc: feat: support custom label content for OnyxProgressSteps and OnyxProgressItem
  - OnyxProgressSteps: add new `step` slot to provide custom label content for each step
  - OnyxProgressItem: add new `default` slot to provide custom label content
  - OnyxProgressItem: render white-space in label to support multiline text when passing strings

## 1.0.0-beta.312

### Minor Changes

- 8626ee2: - feat(OnyxSegmentedControl): type value and options with generic
  - fix: export OnyxSegmentedControl and OnyxSegmentedControlElement component and types
  - fix(OnyxSegmentedControl): hide overflow and make component scrollable instead

## 1.0.0-beta.311

### Minor Changes

- 2ec9012: feat: implemented OnyxDialog component

## 1.0.0-beta.310

### Patch Changes

- 7882ece: bug(OnyxStepper): handle NaN in displayValue

## 1.0.0-beta.309

### Major Changes

- 9571f60: feat(OnyxSegmentedControl): made modelValue required for segmentedControl

## 1.0.0-beta.308

### Patch Changes

- dba1f8f: feat(OnyxCard): support `link` property

## 1.0.0-beta.307

### Patch Changes

- 35e4430: fix(OnyxStepper): Fix id prop not being applied to the native input element

## 1.0.0-beta.306

### Minor Changes

- 4834b5e: feat(OnyxSegmentedControl): implemented new components: OnyxSegmentedControl & OnyxSegmentedControlElement

## 1.0.0-beta.305

### Patch Changes

- c2695f9: fix(OnyxTooltip): prevent gap between tooltip and wedge when page is zoomed

## 1.0.0-beta.304

### Minor Changes

- 4ef837e: feat(OnyxFileCard):
  - added progress bar
  - added form validation

## 1.0.0-beta.303

### Patch Changes

- d86d759: fix: use correct types for emitted "update:" events for v-models

  Some v-model "update:" events where typed incorrectly which also allowed null / undefined values.
  This made it harder to work the emitted values because nullish checks had to be implemented by the user, although the actually emitted value is always defined.

  The following events are updated:

  For reference: `type Nullable<T> = T | null | undefined`

  | Component         | Event name            | New type   | Old type             |
  | ----------------- | --------------------- | ---------- | -------------------- |
  | OnyxAccordion     | "update:modelValue"   | `TValue[]` | `Nullable<TValue[]>` |
  | OnyxBasicDialog   | "update:open"         | `boolean`  | `Nullable<boolean>`  |
  | OnyxCheckboxGroup | "update:modelValue"   | `TValue[]` | `Nullable<TValue[]>` |
  | OnyxFAB           | "update:open"         | `boolean`  | `Nullable<boolean>`  |
  | OnyxFilterTag     | "update:active"       | `boolean`  | `Nullable<boolean>`  |
  | OnyxInput         | "update:modelValue"   | `string`   | `Nullable<string>`   |
  | OnyxMiniSearch    | "update:modelValue"   | `string`   | `Nullable<string>`   |
  | OnyxFlyoutMenu    | "update:open"         | `boolean`  | `Nullable<boolean>`  |
  | OnyxMenuItem      | "update:open"         | `boolean`  | `Nullable<boolean>`  |
  | OnyxNavItem       | "update:open"         | `boolean`  | `Nullable<boolean>`  |
  | OnyxUserMenu      | "update:flyoutOpen"   | `boolean`  | `Nullable<boolean>`  |
  | OnyxProgressSteps | "update:highestValue" | `number`   | `Nullable<number>`   |
  | OnyxSwitch        | "update:modelValue"   | `boolean`  | `Nullable<boolean>`  |
  | OnyxTextarea      | "update:modelValue"   | `string`   | `Nullable<string>`   |

## 1.0.0-beta.302

### Patch Changes

- 0bb15a6: refactor: revert workaround for boolean casting

  The issue described [here](https://github.com/SchwarzIT/onyx/issues/3958) that boolean shorthands / boolean casting is not working for some properties has been officially fixed with Vue 3.5.19.

  We removed the onyx internal workarounds in this version which were originally implemented in onyx version [1.0.0-beta.301](https://onyx.schwarz/development/packages/changelogs/sit-onyx.html#_1-0-0-beta-301).

  Note: You can use a Vue version <= 3.5.19 in your project. The fix will still be included because onyx itself is build with the correct >= 3.5.19 version since its a compile-time fix.

## 1.0.0-beta.301

### Patch Changes

- 329de48: fix: implement workaround for boolean shorthands not working

  Previously, some boolean properties did not work when used as shorthand, e.g. `<OnyxSelect multiple />` so they had to be explicitly set to `true`.

  We've implemented an internal workaround to fix this until the [issue](https://github.com/SchwarzIT/onyx/issues/3958) is officially fixed by the Vue core team.

## 1.0.0-beta.300

### Major Changes

- 6ce11e4: feat(OnyxTooltip, OnyxInfoTooltip)!: split up open and trigger property

  Previously, the `open` property of the OnyxTooltip and OnyxInfoTooltip was used to both define the trigger type (hover, click) and set a boolean for the open state.

  This is changed now so:
  - the `open` property is now just a boolean to control the open state. Supports `v-model:open`.
  - the new `trigger` property can be used to set the trigger type (hover, click)

## 1.0.0-beta.299

### Minor Changes

- 5c4d84f: feat(OnyxStepper): implement formatNumber, which is shonw if the stepper is not focused

## 1.0.0-beta.298

### Patch Changes

- a60abca: fix(OnyxFileUpload): apply `--onyx-file-upload-max-files` correctly

## 1.0.0-beta.297

### Patch Changes

- 11e393c: - fix(OnyxFileUpload): show correct file card type icon
  - fix(OnyxFileUpload): disable remove button of file cards when upload is disabled

## 1.0.0-beta.296

### Minor Changes

- 30c816b: feat(OnyxFileUpload): added a file-card area where all selected file are displayed
  - implemented new `listType` property to define how the selected files are displayed
  - added `default` slot to customize how to render a single file card
  - by default, each file will be displayed with a remove button

## 1.0.0-beta.295

### Minor Changes

- 2c6fbd3: bug(OnyxBreadcrumb): fixed onyx-grid for onyx-grid-max-\*

## 1.0.0-beta.294

### Patch Changes

- Updated dependencies [1ed4c6b]
  - @sit-onyx/icons@1.0.0-beta.25

## 1.0.0-beta.293

### Patch Changes

- 4e2c5fb: fix(OnyxAccordionItem): align colors with UX

## 1.0.0-beta.292

### Minor Changes

- df77108: feat(OnyxAccordion): support `type="card"`

## 1.0.0-beta.291

### Minor Changes

- 269348c: feat(OnyxDataGrid): support boolean column type

## 1.0.0-beta.290

### Major Changes

- 641eac3: feat!: Renamed Popover, Dialog, Modal components

  **BREAKING CHANGE**
  - Renamed `OnyxPopover` to `OnyxBasicPopover`.
  - Renamed `OnyxDialog` to `OnyxBasicDialog`.
  - Renamed `OnyxModalDialog` to `OnyxModal`.
  - Renamed `OnyxAlertDialog` to `OnyxAlertModal`.
  - Renamed `disableClosingOnBackdropClick` prop to `nonDismissible` for `OnyxBasicDialog` and `OnyxModal`.
  - Added `role` prop to `OnyxBasicPopover` (Defaults to `dialog`).
  - Removed most instances of the `close` emit, where it was used in combination with the `open` prop. Instead the `open` prop now has `v-model` support:

  ```vue
  <template>
    <!-- OLD -->
    <OnyxComponent :open="isOpen" @close="isOpen = false" />
    <OnyxComponent :open="isOpen" @close="onClose" />

    <!-- is now NEW -->
    <OnyxComponent v-model:open="isOpen" />
    <OnyxComponent :open="isOpen" @update:open="!$event && onClose()" />
  </template>
  ```

## 1.0.0-beta.289

### Patch Changes

- 79dfa6c: fix(DataGridFeatures.useResizing): Fix issue where resizing didn't work with horizontal overflowing data grids

## 1.0.0-beta.288

### Minor Changes

- 33c7595: feat(OnyxSidebar): implement mobile behavior
  The sidebar will collapse automatically into drawer mode when the screen reaches specific breakpoint (depending on the `collapseSidebar` property). A floating action button (FAB) will be shown then to toggle the sidebar visibility

  #### Other changes:
  - implement `OnyxGlobalFAB` component and `useGlobalFAB` composable

  ### Breaking change:
  - OnyxAppLayout: provide OnyxToast and OnyxGlobalFAB by default so it you are using the OnyxAppLayout, you no longer need to add those components manually

## 1.0.0-beta.287

### Patch Changes

- 0c50fd5: fix(OnyxPageLayout): do not set grid max-width when `noPadding` is set

  Due to a refactoring in version 1.0.0-beta.281, the OnyxPageLayout was applying the max-width when the `noPadding` property was set.
  This had the side effect that full-width content like e.g. hero images could not be passed.

  This behavior is fixed now so it works like prior version 1.0.0-beta.281

## 1.0.0-beta.286

### Patch Changes

- Updated dependencies [b4d113a]
  - @sit-onyx/icons@1.0.0-beta.24

## 1.0.0-beta.285

### Major Changes

- 5cdbe8c: refactor: remove OnyxDrawer component and integrate it in OnyxSidebar

  The OnyxDrawer component was removed and integrated into the OnyxSidebar which already supports other useful features like resizing.

  Old:

  ```html
  <OnyxDrawer open> ... </OnyxDrawer>
  ```

  New:

  ```html
  <OnyxSidebar :temporary="{ open: true, floating: true }"> ... </OnyxSidebar>
  ```

  #### Breaking changes
  - remove OnyxDrawer component (use OnyxSidebar with `temporary` property instead)
  - OnyxSidebar: switch default for `resizable` property to `true` instead of `false`
  - OnyxSidebar: rename property `drawer` to `temporary`

## 1.0.0-beta.284

### Patch Changes

- Updated dependencies [c235692]
  - @sit-onyx/icons@1.0.0-beta.22

## 1.0.0-beta.283

### Minor Changes

- 405fa0f: feat(OnyxFileCard): implement `status`, `icon` and `skeleton` property

## 1.0.0-beta.282

### Patch Changes

- a9f9321: fix(OnyxPopover): correctly position popover in some browsers

  Removed CSS `transform` when positioning the popover which caused the popover to be misaligned in some cases for some browsers (e.g. Safari)

## 1.0.0-beta.281

### Major Changes

- f78c792: feat(Grid-Layout):
  - renamed onyx-grid-container to onyx-grid-layout
  - added new onyx-grid-container class
  - changed padding of onyx-grid-layout to have fixed top/bottom spacings
  - update grid to consider the current container instead of the viewport for applying breakpoints (changed from media-query to container-query)
  - added Tests for the sidebar grid.

## 1.0.0-beta.280

### Major Changes

- ca304b6: rename kaufland and scos CSS variables

  | Old                  | New                      |
  | -------------------- | ------------------------ |
  | --onyx-color-kl-\*   | --onyx-color-kaufland-\* |
  | --onyx-color-scos-\* | --onyx-color-schwarz-\*  |

## 1.0.0-beta.279

### Patch Changes

- 24e3d9b: fix(OnyxTextarea): fix invisible overflow causing growing page height for large inputs

## 1.0.0-beta.278

### Minor Changes

- 317ecd6: feat: add new OnyxFileCard and OnyxFileTypeIcon component

## 1.0.0-beta.277

### Major Changes

- 941b4a3: fix(OnyxDialog): correctly detect outside clicks

  This also fixes the issue that the dialog is closed when e.g. clicking inside an OnyxSelect to select an option

  **Breaking change:**

  We added a new `<div class="onyx-dialog__content">` container inside the dialog. If you are applying custom styles to the dialog (padding etc.), make sure to take a look at those that they are still applied correctly. For changing the dialog padding, we recommend using the new `--onyx-dialog-padding` CSS variable.

## 1.0.0-beta.276

### Major Changes

- 4115fe3: In order to align the design systems closer between DEV and UX (Vue.js library and Figma library), some technical changes have been made to the components:
  - renamed `OnyxFab` to `OnyxFAB`
  - renamed `OnyxFabItem` to `OnyxFABItem`
  - renamed `OnyxFabButton` to `OnyxFABButton`
  - renamed `OnyxProgressStep` to `OnyxProgressItem`
  - added new box-shadow CSS variables `var(--onyx-shadow-medium-top)` and `var(--onyx-shadow-soft-top)`
  - OnyxButton: support new `iconPosition` property to show a right aligned icon
  - OnyxColorSchemeDialog: update SVGs for auto, light and dark mode

## 1.0.0-beta.275

### Minor Changes

- ff2f8b7: feat(OnyxFileUpload): add small & medium visualSizes and skeleton

## 1.0.0-beta.274

### Minor Changes

- 4f26db2: feat(OnyxInput): Implement show/hide feature for passwords

## 1.0.0-beta.273

### Patch Changes

- 68eeaa4: fix(OnyxCheckbox): update checked and indeterminate icon color in dark mode

## 1.0.0-beta.272

### Major Changes

- 928de9f: remove digits, kaufland and lidl theme since they are now only available for internal Schwarz employees

  For further information and migration instructions, see our [theming docs](https://onyx.schwarz/development/theming.html)

## 1.0.0-beta.271

### Patch Changes

- Updated dependencies [1911f6c]
  - @sit-onyx/shared@1.0.0-beta.4
  - @sit-onyx/icons@1.0.0-beta.21

## 1.0.0-beta.270

### Patch Changes

- Updated dependencies [eb481fe]
  - @sit-onyx/icons@1.0.0-beta.20

## 1.0.0-beta.269

### Minor Changes

- 6cddb20: feat(OnyxDataGrid): implement default sortings for default column types

## 1.0.0-beta.268

### Patch Changes

- c92190a: fix: ensure all components can be mounted with Vitest without errors

## 1.0.0-beta.267

### Minor Changes

- 73680bc: feat: import Font-Variables from Figma

## 1.0.0-beta.266

### Minor Changes

- 3481329: - feat(OnyxFab): implement skeleton
  - export OnyxFab, OnyxFabButton and OnyxFabItem component and types
  - fix(OnyxFab): set z-index correctly

## 1.0.0-beta.265

### Minor Changes

- 2cbd69a: feat(OnyxDialog): added closing on clicking the backdrop

## 1.0.0-beta.264

### Minor Changes

- ec6e617: feat: add new OnyxFab component

## 1.0.0-beta.263

### Major Changes

- cc27e98: feat(dist)!: add dedicated entrypoint for bundlers
  - **BREAKING CHANGE:** We dropped commonjs (cjs) support and ship `sit-onyx` now as a [pure esm package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#pure-esm-package). Node >= 18 is required.
  - We now publish two entrypoints for `sit-onyx`, if you are using a bundler like `vite` you don't need to change anything:
    1. `./dist/index.esm-bundler.js`: _(Default)_ Non-minified build intended to be used with an bundler. Comes with source-maps and additional logging for an improved developer experience.
    2. `./dist/index.js`: Already bundled, minified and optimized production build.

## 1.0.0-beta.262

### Patch Changes

- Updated dependencies [5a27c6a]
  - @sit-onyx/icons@1.0.0-beta.19

## 1.0.0-beta.261

### Patch Changes

- 43de03d: fix(OnyxMiniSearch): fix text color with filled value in dark mode

## 1.0.0-beta.260

### Patch Changes

- 2617d53: fix kaufland theme
  - fix: add missing neutral-carbon CSS variables which broke the kaufland theme
  - fix: update component showcase to import logo url instead of using absolut path so it shows correctly when importing the showcase

## 1.0.0-beta.259

### Patch Changes

- dc798ec: fix(OnyxListItem): update focus color #3648

## 1.0.0-beta.258

### Minor Changes

- 6797674: feat(OnyxTable): set aria label of native table when headline slot is passed

## 1.0.0-beta.257

### Minor Changes

- 3763c1c: feat(OnyxSidebar): add grid-layout

### Patch Changes

- 0d08fe0: fix(OnyxDataGrid): do not prevent page scroll when sticky columns are active

## 1.0.0-beta.256

### Major Changes

- fb01a85: - feat(OnyxDataGrid): support new `headline` property
  - fix(OnyxDataGrid): do not render empty slots
  - fix(OnyxDataGrid): fix pagination mutation order to work correctly when used together with filtering and/or selection
  - fix(OnyxDataGrid): do not render pagination skeleton when usePagination feature is disabled

  #### Breaking change
  - useSelection: remove property `disabled` in favor of new `enabled` property to align with other features

## 1.0.0-beta.255

### Major Changes

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

## 1.0.0-beta.254

### Minor Changes

- d22943e: - feat: support nested items for OnyxFlyoutMenu and OnyxNavItem
  - feat(OnyxNavBar): keep open state of nav items when toggling the burger menu open state
  - fix(OnyxNavBar): make separator full width on mobile context menu

## 1.0.0-beta.253

### Minor Changes

- dfd13a1: feat(OnyxDataGrid): support new `type` option for usePagination feature that supports lazy and button loading

  Also support new `_trAttributes` and `_columns` property for data grid entries/data:
  - `_trAttributes`: can be used to pass attributes that are bound directly to the `<tr>` element
  - `_columns`: override which columns to render for the specific row. Useful if creating custom full-width rows

## 1.0.0-beta.252

### Major Changes

- 49f6e5e: feat(OnyxFlyout, OnyxPopover): Renamed OnyxFlyout to OnyxPopover

## 1.0.0-beta.251

### Patch Changes

- Updated dependencies [d1df993]
  - @sit-onyx/icons@1.0.0-beta.18

## 1.0.0-beta.250

### Minor Changes

- 9086251: OnyxDataGrid: when using `slots` in a data grid feature, the passed slotContent is now always defined so you don't have to to nullish checks. When there is no existing slot content, the returned array will be empty

## 1.0.0-beta.249

### Patch Changes

- 9f0b003: fix(OnyxProgressSteps): do not cut of outline in focus-visible state

## 1.0.0-beta.248

### Minor Changes

- 0142958: feat: imported font-variables from figma

## 1.0.0-beta.247

### Minor Changes

- cc9e7c6: feat(OnyxDataGrid): support new `usePagination` feature
  - features are now able to pass slots to the underlying OnyxTable of the data grid. Supported slots are: headline, bottomLeft and pagination (see [OnyxTable](https://storybook.onyx.schwarz/?path=/story/data-table--with-slots)).
  - the feature context now also includes the `skeleton` of the data grid which can be used for custom components
  - the skeleton now considers the current data when determining the skeleton count so the data grid layout does not shift
  - the `enabled` option of data grid features can now also be a ref

## 1.0.0-beta.246

### Minor Changes

- f838364: OnyxProgressStep and OnyxProgressSteps: support `skeleton` property
  - also make steps scrollable when width/height is exceeded
  - fix(OnyxProgressSteps): manage `highestValue` internally when not set explicitly

## 1.0.0-beta.245

### Major Changes

- 10ba878: - OnyxCheckboxGroup, OnyxRadioGroup: rename property `direction` to `orientation`
  - rename component `OnyxNavSeparator` to `OnyxSeparator`. Also changed default orientation to `horizontal` instead of `vertical` and removed default margin
  - rename type `Direction` to `Orientation`
  - rename constant `DIRECTIONS` to `ORIENTATIONS`

### Minor Changes

- 10ba878: feat: implement new `OnyxProgressSteps` and `OnyxProgressStep` component

## 1.0.0-beta.244

### Minor Changes

- 656f85b: fix(useOpenAlignment): fixed alignment calc for "right" and "left" as default

## 1.0.0-beta.243

### Minor Changes

- 6d4199e: feat(OnyxNotificationCard): implemented skeleton

## 1.0.0-beta.242

### Major Changes

- d3f394b: - feat(OnyxDataGrid)!: Support async (disabling) data transformation

  BREAKING CHANGE: The `createFeature` and `useDataGridFeatures` API has been adapted.
  The type `DataGridFeature`, which they use, has been renamed to `DataGridFeatureDescription`.
  `DataGridFeature` is now a function which enables the passing of context from the `OnyxDataGrid` itself to the features.
  The function `DataGridFeature` is required to return a `DataGridFeatureDescription` type.
  Simply move the composable function definition from inside `createFeature` to wrap the createFeature call stay compatible:

  **Before:**

  ```ts
  export const useFiltering = createFeature(
    <TEntry extends DataGridEntry>(options?: FilterOptions<TEntry>) => {
      // ...
    },
  );
  ```

  **After:**

  ```ts
  export const useFiltering = <TEntry extends DataGridEntry>(options?: FilterOptions<TEntry>) =>
    createFeature((ctx) => {
      // ...
    });
  ```

## 1.0.0-beta.241

### Minor Changes

- 9747f10: feat(router): consider hash for active state

  Also consider hashes when determining the active state of a link when a Vue Router is provided. E.g. the link `#some-headline` will now be active when the current route is `/page-1#some-headline`

## 1.0.0-beta.240

### Minor Changes

- 60a738c: feat(OnyxTimer): expose `timeLeft`

## 1.0.0-beta.239

### Minor Changes

- 404f295: feat (Tooltip): implement non directional Tooltip

## 1.0.0-beta.238

### Patch Changes

- 1554f8e: fix(OnyxDataGrid, OnyxTable): Restrict width of skeleton indicators

## 1.0.0-beta.237

### Minor Changes

- 2ce3192: feat(OnyxDataGrid): use and pass props to OnyxDataGridRenderer
  feat(OnyxDataGrid): add `key` property to the cell renderer props
  fix(OnyxDataGrid): expose `renderer` types and utils

## 1.0.0-beta.236

### Minor Changes

- fad403a: feat(OnyxSelect): Implemented Auto-Grouping of selected options

## 1.0.0-beta.235

### Minor Changes

- e014f4e: feat(OnyxComponentShowcase): export ComponentShowcase (to use it in themes repo)

## 1.0.0-beta.234

### Patch Changes

- d4803b3: fix(OnyxDataGrid, OnyxTable): fix hover effect is shown when in skeleton mode

## 1.0.0-beta.233

### Minor Changes

- 9566cb6: feat(OnyxTable, OnyxDataGrid): add skeleton property

## 1.0.0-beta.232

### Minor Changes

- 21ee2ad: feat: implement OnyxSidebarItem component

## 1.0.0-beta.231

### Patch Changes

- a84ede4: fix(OnyxDataGrid): fix useHideColumns not using column label in reveal dropdown

## 1.0.0-beta.230

### Patch Changes

- Updated dependencies [0f045f0]
  - @sit-onyx/icons@1.0.0-beta.17

## 1.0.0-beta.229

### Minor Changes

- 1a4890b: feat: implement new `OnyxFileUpload` component

## 1.0.0-beta.228

### Patch Changes

- dc832e4: fix: prevent hydration errors for OnyxFlyout and OnyxTooltip

## 1.0.0-beta.227

### Patch Changes

- d149c34: fix(OnyxNavBar): fix runtime error when OnyxNavItems were mounted asynchronously

## 1.0.0-beta.226

### Patch Changes

- 266c356: fix(OnyxStepper): correctly format 0 when used with precision

## 1.0.0-beta.225

### Patch Changes

- decc2a1: fix(useVModel): fix undefined prop values not being applied to the internal state (#3378)

## 1.0.0-beta.224

### Minor Changes

- 535ecef: feat: add OnyxErrorSVG and OnyxFileUploadSVG illustrations

## 1.0.0-beta.223

### Minor Changes

- 43df367: added disabled prop in OnyxMobileNavButton, OnyxFlyout, OnyxFlyoutMenu, OnyxUserMenu

## 1.0.0-beta.222

### Minor Changes

- f4086e3: feat(OnyxDrawer): add new `modal` property

## 1.0.0-beta.221

### Minor Changes

- 1bb49b5: fixed(OnyxTooltip in OnyxDialog): removed translate attribute from dialog to not disturb the anchor attribute in OnyxTooltip

## 1.0.0-beta.220

### Minor Changes

- fc57919: - feat(OnyxDataGrid): implemented support for passing column type specific configuration
  - all default column types now support `options` for overwriting the formatting
  - feat(i18n): allow passing INTL formatting options for number `n` and date `d`formatter

## 1.0.0-beta.219

### Minor Changes

- d807a65: feat(OnyxSelectDialog): move buttons to sticky footer

## 1.0.0-beta.218

### Minor Changes

- bd2f733: - feat(OnyxPageLayout): support new `sidebarRight` slot
  - feat(OnyxSidebar): support new `alignment` property and resizability when positioned right
  - feat(OnyxResizeHandle): support new `alignment` property with resizability left

## 1.0.0-beta.217

### Patch Changes

- 30b580e: fix(OnyxDataGrid): fix can't access property "closest" error when using hiding columns with resizing feature

## 1.0.0-beta.216

### Patch Changes

- bb12cdf: fix(OnyxAvatar): fix initials using non-word elements

## 1.0.0-beta.215

### Minor Changes

- e747463: feat(OnyxSidebar): support `resizable` property

## 1.0.0-beta.214

### Patch Changes

- 9e12bcf: fix(OnyxFlyoutMenu): fix `alignment` property type and make it optional

## 1.0.0-beta.213

### Patch Changes

- 3288513: fix(OnyxNavBar): prevent console warning for invalid `mobile` property
- Updated dependencies [3288513]
  - @sit-onyx/shared@1.0.0-beta.3

## 1.0.0-beta.212

### Patch Changes

- fe38f20: fix(OnyxAccordionItem): increase vertical padding for `nested-small` type

## 1.0.0-beta.211

### Minor Changes

- e2f1083: feat(OnyxDataGrid): Add extra empty column which fills in the space between the last column and the end of the table

## 1.0.0-beta.210

### Minor Changes

- a39d444: feat: implement basic OnyxSidebar component

## 1.0.0-beta.209

### Patch Changes

- bd34fb4: fix(anchor): prevent "window is not defined" error in SSR

## 1.0.0-beta.208

### Major Changes

- 4cb0970: refactor OnyxAppLayout and OnyxPageLayout component

  The existing OnyxAppLayout and OnyxPageLayout components have been refactored to remove unused features, provide more useful features and extend the documentation and examples.

  The breaking changes in this version are:

  #### OnyxAppLayout
  - removed slot `pageOverlay` and `appOverlay`. Use the OnyxModalDialog, OnyxDialog or OnyxAlertDialog component instead
  - removed default colors for slots. The layout will now no longer define any default colors so they correct colors are taken from the passed slot content

  #### OnyxPageLayout
  - removed property `hideSidebar`. Use a `v-if` on your passed slot instead, e.g. `<template v-if="isSidebarVisible" #sidebar>`
  - removed property `footerAsideSidebar`. Use new `footerAlignment` instead.
  - removed default colors for slots. The layout will now no longer define any default colors so they correct colors are taken from the passed slot content
  - page content and footer will now always be left aligned by default when used together with a sidebar, even when the global app grid is configured to be centered (with CSS class `onyx-grid-center`).

  By default, the page content now has responsive padding (same as the `.onyx-grid-container` CSS class) so you should no longer manually pass it. You can disable this behavior and revert to the previous behavior by setting the new `noPadding` property.

  Before:

  ```html
  <OnyxPageLayout>
    <div class="onyx-grid-container">Page content</div>
  </OnyxPageLayout>
  ```

  After:

  ```html
  <OnyxPageLayout>Page content</OnyxPageLayout>
  ```

## 1.0.0-beta.207

### Minor Changes

- 911a6ea: feat(createOnyxFlyout): implement support component "OnyxFlyout"

## 1.0.0-beta.206

### Patch Changes

- 24d3589: fix(useCustomValidity, OnyxFormElement): fix missing error message in some cases

## 1.0.0-beta.205

### Patch Changes

- Updated dependencies [de2a1e8]
  - @sit-onyx/icons@1.0.0-beta.16

## 1.0.0-beta.204

### Patch Changes

- 0788fb3: fix(OnyxNotificationCard): always show more actions if device does not support hover

  Also added a slight background hover/focus color

## 1.0.0-beta.203

### Major Changes

- 5fbc8b3: feat(OnyxNavBar)!: rename prop `mobileBreakpoint` to `mobile` - behaves as before, but also supports boolean type

## 1.0.0-beta.202

### Minor Changes

- a780fa0: feat(OnyxNotificationCard): support `icon` property

## 1.0.0-beta.201

### Patch Changes

- 68ec3e2: fix(OnyxTab): prevent call stack size exceed error in Nuxt

## 1.0.0-beta.200

### Patch Changes

- 0455a31: fix(OnyxMoreList): fix runtime warning about "failing set operations on readonly target"

## 1.0.0-beta.199

### Minor Changes

- 60d3920: feat(OnyxNotificationCard): support new `headerActions` slot

## 1.0.0-beta.198

### Major Changes

- 68139e0: refactor(OnyxButton): restructure CSS variables

  Allow easier color overrides via CSS by using a updated CSS variables structure so you don't need to copy advanced selectors to override colors.

  #### Renamed variables
  - renamed `--onyx-button-background-hover-color` to `--onyx-button-background-color-hover`

  #### New variables
  - `--onyx-button-padding-inline`
  - `--onyx-button-background-color-disabled`
  - `--onyx-button-text-color-hover`
  - `--onyx-button-text-color-disabled`
  - `--onyx-button-border-color-hover`
  - `--onyx-button-border-color-disabled`

## 1.0.0-beta.197

### Patch Changes

- 1274d2c: fix(OnyxDataGrid): fix empty data grid showing large header instead of "empty" content

## 1.0.0-beta.196

### Major Changes

- 053db89: feat(useMoreList)!: while not yet mounted elements are considered visible

### Minor Changes

- 053db89: feat(OnyxNavBar): implement "+n More" grouping for overflowing menu items

## 1.0.0-beta.195

### Major Changes

- e061e91: - fix(OnyxDataGrid): fixed issue related to sticky columns and restricted height.
  - feat!(OnyxDataGrid): `width` can now be defined using the `columns` configuration. All track-list values that are supported by [grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns) can be used.
    - BREAKING: table is now formatted using CSS (sub-)grids. Existing stylings might break.
  - feat(OnyxDataGrid/resizing): support double-click to auto-size column.

## 1.0.0-beta.194

### Major Changes

- e470108: feat: support new OnyxLanguageMenuItem and OnyxSelectDialog components

  The `modelValue` property of the OnyxColorSchemeDialog is now required. Also the CSS variables `--image-size` and `--gap` have been renamed to `--onyx-select-dialog-icon-size` and `--onyx-select-dialog-gap`.

## 1.0.0-beta.193

### Patch Changes

- Updated dependencies [e9ef809]
  - @sit-onyx/icons@1.0.0-beta.15

## 1.0.0-beta.192

### Minor Changes

- e587be7: feat(OnyxTooltip): added popover-API

## 1.0.0-beta.191

### Minor Changes

- d556f85: feat: Export `OnyxFormElement` and `OnyxNavItemFacade` components

## 1.0.0-beta.190

### Major Changes

- 4b9f366: feat(OnyxNotifications): consider nav bar height for top positioning

  Removed CSS variable `--nav-bar-height` from OnyxNavBar in favor of the new global `--onyx-nav-bar-height` variable.

## 1.0.0-beta.189

### Minor Changes

- 124be5e: feat: implement OnyxNotificationCard component

  Also made the header of `nested-large` and `nested-small` OnyxAccordions sticky by default.

## 1.0.0-beta.188

### Major Changes

- 7d52457: - feat(OnyxNavItem): OnyxNavItem is universal usable and nestable.
  - feat!(OnyxNavButton): removed `OnyxNavButton`, use `OnyxNavItem` instead.

## 1.0.0-beta.187

### Minor Changes

- 0d8fef8: feat(OnyxBreadcrumb): consider grid padding, max-width and alignment when in container mode

## 1.0.0-beta.186

### Minor Changes

- cdc7bae: feat: implement OnyxNotifications and useNotification

  See our [documentation](https://onyx.schwarz/?path=/docs/notifications-notifications--docs) for further information.

## 1.0.0-beta.185

### Minor Changes

- 5d223c3: feat(OnyxBreadcrumb): support `skeleton` prop

## 1.0.0-beta.184

### Minor Changes

- 0679f49: feat(OnyxTag): add interactive Tag & support component OnyxFilterTag

## 1.0.0-beta.183

### Patch Changes

- 4be2eda: fix(OnyxFlyoutMenu): fix scrollbars being always displayed in flyout menu

## 1.0.0-beta.182

### Minor Changes

- 74f5c74: feat: implement OnyxBreadcrumb and OnyxBreadcrumbItem component

## 1.0.0-beta.181

### Patch Changes

- a0a9847: fix(OnyxColorSchemeMenuItem): fix not opening OnyxColorSchemeDialog on click

## 1.0.0-beta.180

### Patch Changes

- bcfb916: fix(OnyxFlyoutMenu, OnyxUserMenu): fix unlimited height and scroll-behavior

## 1.0.0-beta.179

### Major Changes

- e3a7e82: refactor(OnyxDataGrid): align enabled options for useResizing

  The options for enabling the `useResizing` feature of the OnyxDataGrid has been changed to be aligned with all other features.
  Also if no options are passed, the feature is now enabled for all columns instead of being disabled.

  **Old**:

  ```ts
  const withResizing = DataGridFeatures.useResizing<TEntry>({
    columnResizing: true,
    disabledColumns: ["age"],
  });
  ```

  **New**:

  ```ts
  const withResizing = DataGridFeatures.useResizing<TEntry>({
    columns: {
      age: {
        enabled: false,
      },
    },
  });
  ```

## 1.0.0-beta.178

### Patch Changes

- Updated dependencies [41eb73c]
  - @sit-onyx/icons@1.0.0-beta.14

## 1.0.0-beta.177

### Minor Changes

- 142d651: feat(OnyxDataGrid): Add new resizing feature

## 1.0.0-beta.176

### Patch Changes

- cfd6ab1: fix(OnyxSelect): accept `:multiple="false"` without type errors

## 1.0.0-beta.175

### Major Changes

- d9fedd6: feat(OnyxDataGrid): support changing default enabled/disabled state of sorting, filtering and hide columns feature

  Previously, the default enabled behavior of data grid features was inconsistent when passing options without explicitly specifying the enabled property.

  The default enabled/disabled state can now also be configured (and overridden per column if needed):

  ```ts
  DataGridFeatures.useSorting<Entry>({
    enabled: false,
  });
  ```

  #### Breaking changes
  - sorting feature: all columns will be enabled now by default (previously they were disabled)
  - hide columns feature: API / options for passing columns has changed to align with the other features
    - Old:

    ```ts
    DataGridFeatures.useHideColumns({
    columns: [{ name: "a" }, { name: "b", hidden: true }];
    });
    ```

    - New:

    ```ts
    DataGridFeatures.useHideColumns<Entry>({
      columns: {
        b: { hidden: true },
      },
    });
    ```

## 1.0.0-beta.174

### Minor Changes

- da169bb: feat(OnyxAccordion): add new property `type` with additional `nested-large` and `nested-small` option

## 1.0.0-beta.173

### Minor Changes

- 8a06c17: feat(OnyxDataGrid): support column type `date`, `datetime-local`, `time` and `timestamp`

  | Type           | Example output              |
  | -------------- | --------------------------- |
  | date           | Mar 11, 2025                |
  | datetime-local | Mar 11, 2025, 9:51 AM       |
  | time           | 9:51 AM                     |
  | timestamp      | 03/11/2025, 09:51:27 AM GMT |

## 1.0.0-beta.172

### Minor Changes

- a0717b8: feat(OnyxDataGrid): add hideColumns feature

## 1.0.0-beta.171

### Minor Changes

- 18bd03a: feat: add new `OnyxNotificationDot` component

## 1.0.0-beta.170

### Patch Changes

- d48db41: fix(OnyxAccordionItem): fix open indicator displaying parent state instead of their own

## 1.0.0-beta.169

### Minor Changes

- 12f73c3: feat(OnyxStepper): support new `hideButtons` property to hide the +/- buttons

## 1.0.0-beta.168

### Minor Changes

- d244b9e: feat(OnyxDataGrid): add stickyColumns-feature

## 1.0.0-beta.167

### Patch Changes

- 2b9cbb7: fix(OnyxDataGrid): improve string, number and fallback formatters
  - string/fallback formatter now renders "-" if undefined/null is passed. Also arrays are separated with comma and the array values are recursively formatted (undefined/null values are filtered out). Objects are formatted with `JSON.stringify()` instead of showing "[object Object]"
  - number formatter: null, true and false are not correctly formatted as fallback value "-".

## 1.0.0-beta.166

### Patch Changes

- 9ca7eec: fix(OnyxSkeleton): fix animation de-synced in some cases

## 1.0.0-beta.165

### Minor Changes

- c60b3bf: feat: implement new OnyxInfoCard component

## 1.0.0-beta.164

### Minor Changes

- 164381e: - feat(OnyxBottomBar): automatically adapt horizontal padding if used inside OnyxModalDialog (`var(--onyx-modal-dialog-padding-inline)`)
  - feat(OnyxModalDialog): add new `footer` slot
  - feat(OnyxDialog): add new `alignment` property to align the dialog left, center or right
  - feat: add new `OnyxDrawer` component
  - fix(OnyxModalDialog): fix styles when placing multiple components into the custom `headline` slot
  - fix(OnyxModalDialog): the header and footer will now be always be visible if the body has large content. The content will get scrollable if its too large

## 1.0.0-beta.163

### Minor Changes

- 0b8a142: feat(OnyxIcon): added inline mode for use with text

## 1.0.0-beta.162

### Minor Changes

- 360dc49: feat(OnyxImage): support skeleton

  Also update the error icon

## 1.0.0-beta.161

### Patch Changes

- f1b7110: fix(OnyxTable): add missing border when withPageScrolling is set

## 1.0.0-beta.160

### Minor Changes

- de81676: feat(OnyxTable): support slots headline, actions, bottomLeft and pagination

## 1.0.0-beta.159

### Minor Changes

- a498578: feat: implement new OnyxImage component

## 1.0.0-beta.158

### Patch Changes

- ac16768: fix(i18n): prevent message compilation error in Nuxt

## 1.0.0-beta.157

### Minor Changes

- 52bef90: feat(OnyxEmpty): add buttons slot and update colors

  You can now pass custom action buttons via the `<template #buttons>` slot.
  Also the default icon and text color has changed to neutral (soft) instead of primary.

  The default empty icon for the table has also been changed to be aligned with the default of the OnyxEmpty component.

## 1.0.0-beta.156

### Minor Changes

- 52d74fe: feat(OnyxDataGrid): add filter feature

## 1.0.0-beta.155

### Minor Changes

- c335df7: feat(OnyxDataGrid): Implement column categorization

## 1.0.0-beta.154

### Major Changes

- a5e72f4: refactor(OnyxAccordion): move management of items open state to parent component

  The open state of all nested OnyxAccordionItem components is now fully moved to the OnyxAccordion to prevent recursive state logic.
  The OnyxAccordion now also supports a `v-model` for the currently opened items.

  #### Breaking changes
  - OnyxAccordionItem: remove `open` property. Use the new `v-model` / `modelValue` on the OnyxAccordion
  - OnyxAccordionItem: require new `value` property

## 1.0.0-beta.153

### Minor Changes

- 47cbc94: feat: support `link` property for OnyxButton, OnyxIconButton and OnyxSystemButton

## 1.0.0-beta.152

### Minor Changes

- f2a13f6: feat(OnyxDataGrid): new 'type' property is added to the ColumnConfig type. With this property a column can be of type 'string' or 'number'. Different styles will be applied depending on the type of the column.

## 1.0.0-beta.151

### Patch Changes

- eae5bd9: fix: correctly detect links as external

  Previously only links starting with `http://` or `https://` we detected as external links, meaning all other links we treated as internal and navigated using the [provided Vue Router](https://onyx.schwarz/development/router.html).

  Since this is incorrect for links like `mailto:`, `tel:` etc. this behavior has been fixed.
  Now only links starting with `/`, `#`, `./` and `../` are treated as **internal**. All other links are treated as **external**.

## 1.0.0-beta.150

### Patch Changes

- 1fe4a98: fix(OnyxAccordion): update chevron icon to show down for closed, up for opened

## 1.0.0-beta.149

### Minor Changes

- 16c0969: - fix(OnyxFormElement): Fixed bug where the "optional" text didn't show up
  - fix(OnyxTextarea, OnyxInput): Fixed issue, where some supported props were not displayed in API and Storybook
  - feat(OnyxForm): `OnyxForm` now let's you also configure the `requiredMarker` mode for the whole form

## 1.0.0-beta.148

### Patch Changes

- 2113cae: feat(OnyxAccordionItem): transition between open and close state

## 1.0.0-beta.147

### Patch Changes

- 9cb65e2: fix(OnyxDataGrid): fix missing hover effect for selected rows

## 1.0.0-beta.146

### Minor Changes

- 6347d45: feat(OnyxDataGrid): added row selection feature

  The new `DataGridFeatures.useSelection` can be used to enable and configure the selection.

## 1.0.0-beta.145

### Minor Changes

- a886471: feat(OnyxDataGrid): add support for header labels
  Use the `label` property of the `column` configuration to set it.

## 1.0.0-beta.144

### Minor Changes

- 471deaf: implement auto active state for OnyxNavButton, OnyxNavItem and OnyxMenuItem

  By default, the OnyxNavButton, OnyxNavItem and OnyxMenuitem will now manage they active state automatically based on the current route if a [router](https://onyx.schwarz/development/router.html) is provided.

  You can manually set the active state (`true` or `false`) to override/disable this behavior.

## 1.0.0-beta.143

### Major Changes

- 1ac3b2a: integrate nav bar, nav button and nav item with router

  The Vue Router integration has been further improved in this version.

  #### Improvements
  - nav bar app area is now a link instead of a button which supports browser-native features like copy link address, open in a new tab etc.
  - the nav bar automatically closes mobile fly outs (like burger or context menu) when the current route changes, e.g. because the user clicked a nav item
  - fix bug that mobile nav item with children does not open child view but instead directly opens link

  #### Breaking changes
  - OnyxNavBar: remove `navigateToStart` event. App area link will be opened directly (integrated with router). The link defaults to `/` and can be changed by the new `appArea` property
  - OnyxNavBar: remove `appAreaLabel` property in favor of new `appArea` property
  - OnyxNavButton and OnyxNavItem: remove event `navigate` which is no longer needed. The links will be opened directly. External links via the browser, internal links via the provided router (or browser if no router is provided)

## 1.0.0-beta.142

### Major Changes

- b3a43c4: - feat(grid): new `onyx-grid-span-full` class which enables an element to always span the full row width.
  - fix(grid)!: fix issues regarding optional max columns.
    **BREAKING CHANGE:** The default maximum number of columns is `12` (before it was `16`).
    The `onyx-grid-xl-20` class now also sets `16` columns for the `lg` breakpoint.
    The new `onyx-grid-lg-16` class sets `16` columns for the `lg` and `xl` breakpoint.

## 1.0.0-beta.141

### Patch Changes

- cf03735: style(OnyxColorSchemeDialog): update hover color

## 1.0.0-beta.140

### Minor Changes

- a754cdf: feat(OnyxPagination): support new `skeleton` property

## 1.0.0-beta.139

### Major Changes

- f03482f: ### feat(OnyxDataGrid)!: Implemented support for column types and custom renderers into the feature API
  - The new feature property `typeRenderer` can be used to define custom renderers for column types. TypeRenderer keys of type `symbol` are intended for internal usage.
  - These types can now be specified in the `column` configuration with the new `ColumnConfig` type.
  - `watch` is not a required property anymore.
  - Features can now define `modifyColumns` to add, drop or change the normalized column configuration.

  ### feat(DataGridRenderer)!: Removed `prop` from `DataGridRendererColumn`.
  - The `component` has no need for this abstraction. Any props can be directly used in the passed component.

## 1.0.0-beta.138

### Major Changes

- de1cc16: support Vue Router integration

  To enable the Vue Router integration for all onyx components, provide the router using the `createOnyx()` plugin:

  ```ts
  const onyx = createOnyx({
    // if you are using the Vue Router, make sure to pass it here be enable the router integration for onyx
    // router: createRouter(),
  });
  ```

  When passing internal links to onyx components, like OnyxLink, OnyxNavButton etc., they will be opened using the provided router instead of native browser links so no full page-reload is done in SPAs.

  #### Breaking changes
  - rename type `OnyxExternalLinkIcon` to `OnyxExternalLinkIconProps`
  - OnyxLink: make property `href` required
  - OnyxMenuItem: remove properties `href` and `target` in favor of new `link` property
  - OnyxNavButton and OnyxNavItem: remove properties `href`, `target` and `withExternalIcon` in favor of new `link` property

  #### Other changes
  - add new `OnyxRouterLink` component, `useLink` composable and `extractLinkProps` utility

## 1.0.0-beta.137

### Minor Changes

- 3bc89e8: chore: Implement consistent usage of useTemplateRef

## 1.0.0-beta.136

### Patch Changes

- Updated dependencies [9319044]
  - @sit-onyx/icons@1.0.0-beta.13

## 1.0.0-beta.135

### Major Changes

- d9c4cd1: refactor(OnyxAvatar): update default initials

  Previously the initials were taken from the first two words. Now they will be determined as described [here](https://github.com/SchwarzIT/onyx/issues/2454) by considering the locale.
  If the username contains unsupported characters (e.g. for some Korean characters) a fallback icon will be displayed.

  Example for "John Middlename Doe":
  - Previously: "JM"
  - Now: "JD"

  #### Breaking changes
  - OnyxAvatar: The `label` property has been removed in favor of `fullName` which now als supports passing a locale for determining the initials (will use the i18n locale by default).
  - OnyxAvatar: The default slot has been removed in favor of the `initials` property to set custom initials.
  - OnyxUserMenu: The `username` property has been renamed to `fullName` to align with the OnyxAvatar

## 1.0.0-beta.134

### Patch Changes

- Updated dependencies [00ca133]
  - @sit-onyx/icons@1.0.0-beta.12

## 1.0.0-beta.133

### Minor Changes

- 08c0057: feat: implement fallthrough attribute forwarding

## 1.0.0-beta.132

### Minor Changes

- 8664d21: feat(OnyxHeadline): support `showAs` property

## 1.0.0-beta.131

### Major Changes

- ece5641: chore: replace redundant useManagedState with defineModel

  The changes are mostly internal, but the typings were of `OnyxSelect` were improved:
  - The `modelValue` now infers a specific subtype of `SelectOptionValue` and the `options` values must match.
  - `withSearch`: Filtering of the options will not automatically disabled anymore when `searchTerm` is bound. Instead `noFilter` must be set.

## 1.0.0-beta.130

### Patch Changes

- 07549b9: fix 'failed to resolve import source "./components/OnyxDataGrid/features/index.ts"' error
- Updated dependencies [07549b9]
  - @sit-onyx/shared@1.0.0-beta.2

## 1.0.0-beta.129

### Patch Changes

- 70e1088: Added empty slot to DataGrid to be able to pass custom empty content

## 1.0.0-beta.128

### Patch Changes

- adec44e: fix console warning for form elements about readonly target

  The following components were affected: OnyxCheckbox, OnyxCheckboxGroup, OnyxDatePicker, OnyxInput, OnyxRadioButton, OnyxRadioGroup, OnyxSelect, OnyxSelectInput, OnyxStepper, OnyxSwitch and OnyxTextarea

## 1.0.0-beta.127

### Minor Changes

- 276eda9: feat(OnyxColorSchemeDialog): use OnyxModalDialog and OnyxCard internally

## 1.0.0-beta.126

### Patch Changes

- 22c2a64: fix(OnyxFormElement): fix broken counter text when maxlength with counter is used

## 1.0.0-beta.125

### Patch Changes

- 1d803fb: OnyxCard: increase border radius

## 1.0.0-beta.124

### Minor Changes

- 5210eb5: fix(OnyxFlyoutMenu): When the flyout menu opens on click, should be closed on the second click of the button. Decreased the gap between "more button" and flyout to 8px (0.5 rem)

## 1.0.0-beta.123

### Patch Changes

- Updated dependencies [cc46754]
  - @sit-onyx/shared@1.0.0-beta.1

## 1.0.0-beta.122

### Patch Changes

- Updated dependencies [f471335]
  - @sit-onyx/icons@1.0.0-beta.11

## 1.0.0-beta.121

### Patch Changes

- 20199a5: fix(OnyxInfoTooltip): added missing focus indicator

## 1.0.0-beta.120

### Patch Changes

- 808e638: fix(OnyxInput, OnyxTextarea): `maxlength` doesn't restrict the user from typing more than the allowed characters.
  The previous behavior, which restricts the user from typing more than the allowed characters, can be achieved by setting `<OnyxInput :maxlength="{ max: 42, strict: true }" />`.

## 1.0.0-beta.119

### Minor Changes

- 9bf9a23: feat(OnyxAccordion): added OnyxAccordion

## 1.0.0-beta.118

### Minor Changes

- 9ddcd26: feat: implement `OnyxCard` component

## 1.0.0-beta.117

### Minor Changes

- 80bdfb2: fix(OnyxBottomBar): Adjust styles to reflect the grid. Added screenshot tests and a bottom bar in the demo app.

## 1.0.0-beta.116

### Minor Changes

- c17ccf7: feat(OnyxInput): Added the inline slots `leading` and `trailing`

## 1.0.0-beta.115

### Major Changes

- 4464ff3: feat(OnyxHeadline): automatically normalize hash

  Other changes:
  - hide `#` when hash is set for screen readers
  - add hover title and screen reader text to hash link
  - remove `normalizeUrlHash()` method since this is now automatically done by the OnyxHeadline

## 1.0.0-beta.114

### Minor Changes

- bf07bd1: feat(OnyxBottomBar): Replaced right slot with a default slot

## 1.0.0-beta.113

### Minor Changes

- 0dc1a0c: feat: update text color for OnyxNavButton and OnyxUserMenu to improve color contrast

## 1.0.0-beta.112

### Minor Changes

- 6a83be5: feat(OnyxHeadline): implement skeleton

## 1.0.0-beta.111

### Minor Changes

- 8beb853: feat(OnyxHeadline): support `hash` property

## 1.0.0-beta.110

### Patch Changes

- fc8c38c: fix(UserMenu): align mobile footer app version correctly

## 1.0.0-beta.109

### Minor Changes

- 15229dd: fix(OnyxTooltip): fix wedge offset by adding alignsWithEdge prop.

## 1.0.0-beta.108

### Minor Changes

- c7c3296: feat: Expose input elements of form elements

## 1.0.0-beta.107

### Major Changes

- 357ac46: feat(OnyxDataGrid): implement menu items for sorting feature

  #### Breaking changes
  - OnyxDataGrid: rename header actions property `listItems` to `menuItems`. It now expects `OnyxMenuItem` components instead of `OnyxListItem`

  #### Features
  - OnyxDataGrid: add German translations

  #### Fixes
  - OnyxDataGrid: update translations when locale changes
  - OnyxUserMenu: use `OnyxMenuItem` for footer instead of `OnyxListItem`

## 1.0.0-beta.106

### Major Changes

- 9e53a89: feat(OnyxStepper): update OnyxStepper API
  - remove property `step`, use `stepSize` instead
  - remove property `stripStep`, use `validStepSize` instead. User inputs will no longer be manipulated, instead an error will be shown
  - changed logic of `precision` property. Now determined numbers of decimal places to show. Is no longer the default value of `stepSize` property.
  - fix bug that decimal value is not displayed correctly when `precision` is not set

## 1.0.0-beta.105

### Patch Changes

- b3f8734: fix(OnyxInfoTooltip): add missing props from OnyxTooltip

  These props are now also supported for the info tooltip: alignment. density, icon

## 1.0.0-beta.104

### Patch Changes

- Updated dependencies [ad447e9]
  - @sit-onyx/icons@1.0.0-beta.10

## 1.0.0-beta.103

### Patch Changes

- Updated dependencies [ee0fcd2]
  - @sit-onyx/icons@1.0.0-beta.9

## 1.0.0-beta.102

### Minor Changes

- 8fe1ab6: feat(OnyxBottomBar): Implement OnyxBottomBar component

## 1.0.0-beta.101

### Patch Changes

- 0ae24aa: fix(OnyxDialog): remove box shadow and border for modal dialogs

## 1.0.0-beta.100

### Patch Changes

- b01942c: fix(OnyxSelect): do not scroll whole page when opening with selected value

## 1.0.0-beta.99

### Major Changes

- aa6b94e: feat(OnyxModalDialog, OnyxAlertDialog): add `aria-describedby` attribute
  - OnyxModalDialog: renamed slot `subtitle` to `description`

## 1.0.0-beta.98

### Minor Changes

- 2d87351: Custom translation function can now be static

## 1.0.0-beta.97

### Minor Changes

- 0d12793: feat: implement `OnyxModalDialog` component

## 1.0.0-beta.96

### Major Changes

- 16f001a: - renamed CSS variable `--onyx-color-backdrop` to `--onyx-color-component-opacity-backdrop`
  - removed CSS variables `--onyx-number-opacity-medium` and `--onyx-number-opacity-soft`, use `--onyx-color-opacity-medium` and `--onyx-color-opacity-soft` instead

## 1.0.0-beta.95

### Minor Changes

- b2a99a9: feat: implement `OnyxAlertDialog` component

## 1.0.0-beta.94

### Patch Changes

- d8fe4ca: fix(OnyxInput): prevent keyboard focus on clear icon

  The clear icon is no longer focusable via keyboard to not interrupt the users tab order when multiple form elements are used.

## 1.0.0-beta.93

### Patch Changes

- Updated dependencies [6755052]
  - @sit-onyx/icons@1.0.0-beta.8

## 1.0.0-beta.92

### Patch Changes

- b25aa8f: fix(schwarz-theme): use correct theme for dark mode

  The `schwarz` theme in dark mode showed the default onyx colors instead of the ones from the schwarz theme.
  This is fixed now so it shows the correct `schwarz` theme colors in dark and light mode.

## 1.0.0-beta.91

### Minor Changes

- df521cf: - added light/dark mode transition
  - created the useThemeTransition composable, which observes changes between light and dark mode and dynamically adds the onyx-transition-active class during the transition for a smooth visual effect. See our [docs](https://onyx.schwarz/development/typography.html) on how to use it.

## 1.0.0-beta.90

### Minor Changes

- f36104b: feat(OnyxDataGrid): use `OnyxSystemButton` for header actions
  - fix(OnyxFlyoutMenu): correctly position flyout when open

## 1.0.0-beta.89

### Minor Changes

- d1cc1d3: feat(OnyxSystemButton): show native browser tooltip when hovering for a few seconds

## 1.0.0-beta.88

### Major Changes

- e250589: feat(OnyxSystemButton): implement soft and medium color

  Also removed the `density` property since the system button does not support [density](https://onyx.schwarz/basics/density.html).

## 1.0.0-beta.87

### Minor Changes

- 84d29fb: feat(OnyxDataGrid): DataGridFeature type is extended to support listItems which are rendered as a flyout right next to the header

## 1.0.0-beta.86

### Minor Changes

- c358978: feat: implement basic `OnyxSystemButton`

## 1.0.0-beta.85

### Patch Changes

- 1a11a27: fix: update OnyxAvatar and OnyxAvatarStack border to align with Figma
  - OnyxAvatar: remove border
  - OnyxAvatarStack: add primary border to all avatars

## 1.0.0-beta.84

### Patch Changes

- 2a7a285: Fix missing "locale" json, which are referenced by some type definitions.
  Also update default error messages to be more descriptive

## 1.0.0-beta.83

### Minor Changes

- 8fe041f: feat(OnyxInput): support clear and success icon

## 1.0.0-beta.82

### Patch Changes

- 5fba96d: fix: adjust component colors and align with Figma

  All components were updated to be aligned with the Figma UX design. This change brings several color/contrast improvements/fixes:
  - Button: Update background, text and border colors
  - Tag: Update text and border colors
  - IconButton: Update text colors
  - NavButton (mobile): Update text color
  - Pagination: Update text color for buttons
  - Stepper: Update text color for +/- button
  - update several components to use correct CSS variables for focus and border colors so the correct color is used for specific themes (e.g. `schwarz` theme)

## 1.0.0-beta.81

### Minor Changes

- 9e3e8c7: - made the import order of light/dark theme files irrelevant
  - changed figma dark-themes import from where(dark) to dark

## 1.0.0-beta.80

### Minor Changes

- abf8414: feat(OnyxCheckboxGroup, OnyxRadioGroup): Add label tooltip

## 1.0.0-beta.79

### Minor Changes

- c8beae4: feat(OnyxDatePicker): implement `min` and `max` property

  Also fix the bug where the value is always `undefined`, when using `type="datetime-local"`

## 1.0.0-beta.78

### Minor Changes

- 4482d1d: feat(OnyxSelect): update the hover and focus colors of the chevron icon

  Also a the title attribute to the chevron icon to show a native browser tooltip when hovering

## 1.0.0-beta.77

### Major Changes

- 6730706: feat(OnyxMoreList): support more indicator

  Also changed the underlying logic to calculate the component visibility which is now based on component widths instead of using IntersectionObservers.
  - OnyxMoreList: removed `disabled` property
  - OnyxMoreList: removed `is` property. Make sure to use the new `default` and `more` slots and bind the attributes passed to the slots using `v-bind`.
  - useMoreList: removed `disabled` and `componentRefs` option, added required `listRef` and `moreIndicatorRef` option
  - OnyxNavButton: prevent warning for missing injection key

## 1.0.0-beta.76

### Minor Changes

- 9f23f13: feat: support `schwarz` theme

  For docs about how to use the theme, see our [theming docs](https://onyx.schwarz/development/theming.html).
  - `sit-onyx` now also exports a `ONYX_THEMES` array that includes a list of all available themes.
  - OnyxButton: adjust text color contrast

## 1.0.0-beta.75

### Patch Changes

- b4c466f: fix: fix navigation menu opening with delay

## 1.0.0-beta.74

### Minor Changes

- d00c404: feat: implement basic `OnyxDatePicker` component

## 1.0.0-beta.73

### Patch Changes

- 554833c: feat: implement new figma varialbe structure
  - own dark and light colors for each theme
  - removed secondary color (visible in: OnyxBadge, OnyxIcon, OnyxTag)

## 1.0.0-beta.72

### Minor Changes

- 156ebb0: feat(OnyxTextarea): Implement success state styles

## 1.0.0-beta.71

### Minor Changes

- 52efb24: feat(OnyxFormElement): messageTooltip property is removed, instead the type of the message prop is replaced with CustomMessageType which includes shortMessage and longMessage. The longMessage will replace the messageTooltip

## 1.0.0-beta.70

### Major Changes

- 4a4c414: ### BREAKING CHANGE:
  - feat(OnyxNavButton, OnyxUserMenu, OnyxFlyoutMenu): button slot now provides a trigger parameter which must be bound to the interactive element
  - feat(OnyxFlyoutMenu): Renamed "default" slot to "button"

## 1.0.0-beta.69

### Minor Changes

- 3f55c48: feat(OnyxTabs): support horizontal scrolling when overflowing

  The following additional features/fixes are also included:
  - OnyxTabs: add property `size` to change the font style
  - OnyxTabs: fix vertical alignment of tab text if its not selected
  - add CSS variable `--onyx-outline-width` and use it in all components for consistency

## 1.0.0-beta.68

### Minor Changes

- a3eb7d0: feat(OnyxTab): support `disabled` and `skeleton` property

  Also support `skeleton` prop for `OnyxTabs` component which will put all child tab components into skeleton mode.

## 1.0.0-beta.67

### Minor Changes

- 8421235: feat(tabs): support keyboard navigation
  - Arrow left/right: Focus previous/next tab
  - Home: Focus first tab
  - End: Focus last tab
  - Enter/space: Select currently focused tab

## 1.0.0-beta.66

### Patch Changes

- Updated dependencies [b6b4573]
  - @sit-onyx/shared@0.0.1-beta.0

## 1.0.0-beta.65

### Minor Changes

- fda8a30: Implement basic OnyxTabs and OnyxTab component.

## 1.0.0-beta.64

### Minor Changes

- 744f82e: feat(OnyxDataGrid): Added `features` prop which exposes the `useDataGridFeature` API to allow devs to use custom and pre-defined features
  feat(OnyxDataGrid): Expose onyx provided features via a re-export called `DataGridFeatures`
  feat(OnyxDataGrid): Added `DataGridFeatures.useSorting` feature, with support for custom configuration

## 1.0.0-beta.63

### Patch Changes

- Updated dependencies [f6f01c6]
  - @sit-onyx/icons@1.0.0-beta.7

## 1.0.0-beta.62

### Minor Changes

- 95673cf: fix(OnyxFormElement): fix layout jump on invalid OnyxInput

## 1.0.0-beta.61

### Minor Changes

- 3bc1d58: feat(OnyxStepper):
  - Implemented `stripStep` and `precision`.
  - Deprecated `step`, replacing it with `stepSize` and `precision`.

## 1.0.0-beta.60

### Patch Changes

- 80424f9: fix(OnyxColorSchemeDialog): fix warning "Set operation on key modelValue failed: target is readonly"

  The bug caused the color scheme dialog to not emit the correct select color scheme.

## 1.0.0-beta.59

### Patch Changes

- bb826a4: fix(sass): remove usage of globals

  Sass [deprecated the usage of built-in global functions](https://sass-lang.com/documentation/breaking-changes/import/) like `map-get` which might lead to build errors e.g. when using [onyx breakpoint utilities](https://onyx.schwarz/development/breakpoints.html). We removed their usages in favor of importing the corresponding module.

## 1.0.0-beta.58

### Patch Changes

- e42ca5e: Implement autoalignment feature for OnyxTooltip

## 1.0.0-beta.57

### Patch Changes

- 78a1019: fix(OnyxNavButton): prop `mobileChildrenOpen` not working

## 1.0.0-beta.56

### Patch Changes

- b6e0b67: fix: Fix uncaught TypeError for components with symbol props

## 1.0.0-beta.55

### Major Changes

- 772f6a5: refactor(OnyxRadioGroup): rename CSS classes

  Renamed/fixed all radio group CSS class names from `.onyx-radio-button-group` to `.onyx-radio-group` to match the component name

### Patch Changes

- 772f6a5: fix(OnyxPagination): ensure max width for "of n pages" text

## 1.0.0-beta.54

### Minor Changes

- 01f8664: feat(OnyxForm): implement `showError` mode
  fix(OnyxForm): update of injected prop not working when initially using default

## 1.0.0-beta.53

### Patch Changes

- Updated dependencies [be5b415]
  - @sit-onyx/icons@1.0.0-beta.6

## 1.0.0-beta.52

### Patch Changes

- a9d89f6: fix(OnyxButton): ripple animation not working

## 1.0.0-beta.51

### Minor Changes

- 6fe0527: feat(OnyxMenuItem): add property `target`

## 1.0.0-beta.50

### Major Changes

- beca92e: refactor(OnyxDataGridRenderer): enable striped and vertical borders by default

  Changed the default value for the `striped` and `withVerticalBorders` property from `false` to `true`.

## 1.0.0-beta.49

### Patch Changes

- 704e624: fix(OnyxNavBar): Replace cursor pointer with default for OnyxNavButton and it's nested items

## 1.0.0-beta.48

### Minor Changes

- 5d8349c: Implement OnyxForm which allows setting of disabled state for all child form elements

## 1.0.0-beta.47

### Minor Changes

- 8aa66eb: feat: implement basic OnyxDataGridRenderer component
  - also support column grouping for the `OnyxTable` component via the `columnGroups` property

## 1.0.0-beta.46

### Patch Changes

- Updated dependencies [3e49c73]
  - @sit-onyx/icons@1.0.0-beta.5

## 1.0.0-beta.45

### Patch Changes

- Updated dependencies [33700f9]
  - @sit-onyx/icons@1.0.0-beta.4

## 1.0.0-beta.44

### Patch Changes

- Updated dependencies [188c94d]
  - @sit-onyx/icons@1.0.0-beta.3

## 1.0.0-beta.43

### Major Changes

- e6af99b: feat: Remove/Rename emits that collide with native event names
  - OnyxInput, OnyxTextarea and OnyxStepper: Remove `focus` and `blur` event - Use `focusin`/`focusout` or `@focus.capture`/`@focus.blur` instead
  - OnyxInput and OnyxTextarea: Remove Vue `change` emit - You will now receive the native `@change` event, but the value must now retrieved with with `$event.target.value` or use `@update:modelvalue`
  - OnyxNavBar: Rename `appAreaClick` to `navigateToStart` and `backButtonClick` to `navigateBack`
  - OnyxNavButton: Rename `click` to `navigate`, also the native MouseEvent is now passed as second parameter
  - OnyxNavItem: Rename `click` to `navigate`
  - OnyxRadioButton: Remove Vue `change` emit - You will now receive the native `@change` event, but the value must now retrieved with with `$event.target.value` or use `@update:modelvalue`
  - OnyxSelectInput: Rename `click` to `inputClick`
  - OnyxToastMessage: Remove Vue `click` emit - You will now always receive the native `@click` event, even when `clickable` prop is false/not set.

## 1.0.0-beta.42

### Major Changes

- dc00809: feat: support SSR for OnyxSelect, OnyxNavButton, OnyxUserMenu and more components

  The minimum required Vue version was bumped to `>= 3.5.0` because we make use of `useId()` now.

## 1.0.0-beta.41

### Patch Changes

- Updated dependencies [79033ac]
  - @sit-onyx/icons@1.0.0-beta.2

## 1.0.0-beta.40

### Patch Changes

- b7c370d: fix(OnyxInput, OnyxTextarea): Adjust selection highlighting for better contrast

## 1.0.0-beta.39

### Major Changes

- dfa58b8: fix: support SSR for `createOnyx()` plugin

  Removed export of `syncGlobalOptionalText`, use the `createOnyx()` Vue plugin instead

## 1.0.0-beta.38

### Patch Changes

- d4fe7d1: fix(button): make background transparent for `mode="plain"`

## 1.0.0-beta.37

### Minor Changes

- 3d612d4: feat(OnyxPagination): enable search and update select focus styles

## 1.0.0-beta.36

### Patch Changes

- 8647795: fix(OnyxMiniSearch): Adjust the size to the search input

## 1.0.0-beta.35

### Patch Changes

- Updated dependencies [b525ca5]
  - @sit-onyx/icons@1.0.0-beta.1

## 1.0.0-beta.34

### Patch Changes

- 934a903: fix(OnyxFormElement): fix identical default id for all forms

## 1.0.0-beta.33

### Patch Changes

- 07084b1: fix(OnyxSelect): open flyout when clicking the input gap or padding

## 1.0.0-beta.32

### Minor Changes

- e8c5341: feat(OnyxSelect): add property alignment and auto detection for opening to top/bottom depending on the available space

## 1.0.0-beta.31

### Patch Changes

- 467d8f8: test: fix "window.matchMedia is not a function" error in unit tests

## 1.0.0-beta.30

### Major Changes

- d7b68e0: feat: remove inline font families from bundle

  onyx now no longer bundles/inlines the recommend font families because they got bundled by Vite into the main `style.css` file as base64 encoded URL.
  This had negative impact on performance, tree-shaking and bundle size.

  From now on, you need to install and import the font families manually. For more information see our [typography docs](https://onyx.schwarz/development/typography.html#installation).

## 1.0.0-beta.29

### Minor Changes

- 40b517d: feat: implement `OnyxPagination` modern type

## 1.0.0-beta.28

### Minor Changes

- 4c49760: fix: props with managed capability not working when used without v-model

## 1.0.0-beta.27

### Major Changes

- 3163863: fix: require aria label for radio and checkbox group

  Removed property `headline` from `OnyxRadioGroup` and `OnyxCheckbox` in favor of new required `label` property which is also used as aria label for screen readers.
  If you want to visually hide the label, set the `hideLabel` property.

## 1.0.0-beta.26

### Patch Changes

- 93f4386: fix(OnyxTable): disable overscroll behavior

## 1.0.0-beta.25

### Minor Changes

- 244219f: feat(OnyxSelect): Implement listDescription property

## 1.0.0-beta.24

### Minor Changes

- 6f7149f: Adding OnyxButton active animation and OnyxRipple component

## 1.0.0-beta.23

### Major Changes

- dae102e: refactor(OnyxSelect):
  - remove redundant `manualSearch` property in favor of inferring the managed state of searchTerm
  - omit `showfocus` which is only used to control OnyxSelectInput

## 1.0.0-beta.22

### Major Changes

- 349f412: - breaking change: `useOutsideClick` - renamed `element` to `inside`: Can now accept multiple element refs
  - split `createTooltip` into `createTooltip` and `createToggletip` headless functions, as these implement different accessibility concepts: See https://inclusive-components.design/tooltips-toggletips/
  - Therefore, the `OnyxTooltip` had to be reworked:
    - on hover, the tooltip pattern is used
    - on click the toggletip pattern is used
    - the default slot now provides a `trigger` property, which needs to be bound by the user
  - Also, the `OnyxInfoTooltip` component has been updated to be accessible.

## 1.0.0-beta.21

### Patch Changes

- d6321d8: fix(OnyxStepper): check validity when value is changed with Arrow up/down or buttons

  Also add spin button styles for disabled state

## 1.0.0-beta.20

### Patch Changes

- 4c73713: fix(OnyxSelect): remove incorrect usage of `aria-busy`

## 1.0.0-beta.19

### Patch Changes

- 9570420: fix(OnyxToast): do not cut off box shadow

## 1.0.0-beta.18

### Patch Changes

- 82fffac: fix: export `OnyxStepper`

## 1.0.0-beta.17

### Major Changes

- 17c0aa5: refactor(OnyxSelect): restrict modelValue to only contain values

  #### Breaking changes
  - OnyxSelects `modelValue` now only needs TValue, not `SelectOption<TValue>`

  #### Features
  - OnyxSelect determines the displayed labels by comparing `modelValue` with `options`. This can be overridden by setting the new prop `valueLabel`.
  - OnyxSelect now filters the options internally when `searchTerm` is set. This can be overridden by setting the new prop `manualSearch`.

## 1.0.0-beta.16

### Major Changes

- 258c3ec: refactor: implement new density CSS variables

  #### Breaking changes
  - remove CSS variable `--onyx-density`, can be replaced with 2rem, 2.5rem or 3rem accordingly for compact, default and cozy density
  - OnyxBadge: removed CSS variables `--onyx-badge-padding`, ` --onyx-badge-icon-padding`, `--onyx-badge-height` and `--onyx-badge-dot-size`
  - OnyxDialog: removed CSS variable `--onyx-dialog-padding`
  - OnyxMiniSearch: removed CSS variable `--onyx-mini-search-icon-size`
  - OnyxTable: removed CSS variable `--onyx-table-vertical-padding`
  - OnyxTag: removed CSS variable `--onyx-tag-padding`
  - OnyxSwitch: removed CSS variable `--onyx-switch-label-padding-vertical`

  #### Features

  New density CSS variables were added and used inside all onyx components which automatically adjust their spacing based on the current density:
  - --onyx-density-3xs
  - --onyx-density-2xs
  - --onyx-density-xs
  - --onyx-density-sm
  - --onyx-density-md
  - --onyx-density-lg
  - --onyx-density-2xl
  - --onyx-density-3xl
  - --onyx-density-4xl

  The following components now also support density:
  - OnyxCheckboxGroup / OnyxRadioGroup headline and horizontal layout
  - OnyxEmpty
  - OnyxTooltip

  #### Other bug fixes
  - several visual fixes/improvements related to density/spacing
  - fix(OnyxMiniSearch): translate placeholder
  - fix(OnyxSelectInput): disable autocomplete for native input
  - fix(OnyxSelect): hide required asterisk when `hideLabel` is set
  - fix: do not exceed max width for OnyxInput, OnyxTextarea, OnyxSelect and OnyxStepper skeletons when custom max width is set via CSS
  - fix(OnyxBadge): inherit icon size for cozy density from parent components

## 1.0.0-beta.15

### Major Changes

- 9cb8667: fix: prevent "Cannot find module '../composables/density' or its corresponding type declarations." error

  We removed the `sit-onyx/types` alias, please import directly from `sit-onyx` instead

### Patch Changes

- 02e4f4d: fix(OnyxStepper): Remove default modelValue and placeholder

## 1.0.0-beta.14

### Minor Changes

- 25bfc85: feat(OnyxCheckbox, OnyxSwitch, OnyxRadioButton): show error messages in the title when invalid

  For components that don't support an error message footer, we now set the `title` to show the error message info in the default browser tooltip.
  - Supports custom errors as well as default errors, e.g. `required`.
  - Combines the error message with a hidden label in the `title`.

## 1.0.0-beta.13

### Patch Changes

- cae1e24: fix(OnyxSelect): fix cursor always jumping to the end of the search input
  feat(createComboBox): remove required, but redundant inputValue prop

## 1.0.0-beta.12

### Patch Changes

- 7b8ad3d: fix(OnyxNavBar): make bottom border full width when grid width is limited

## 1.0.0-beta.11

### Minor Changes

- 8a1c8d4: feat(OnyxStepper): Implement basic OnyxStepper #1568

## 1.0.0-beta.10

### Patch Changes

- 5c0535e: fix(OnyxNavButton): prevent parent highlighting when an active child is visible on mobile

## 1.0.0-beta.9

### Minor Changes

- dd42def: feat(OnyxUserMenu): allow manual control of flyout toggling

## 1.0.0-beta.8

### Patch Changes

- d0247d1: fix(OnyxFormElement): fix label being applied to all interactive elment of a complex form element

## 1.0.0-beta.7

### Patch Changes

- df21d23: fix(OnyxUserMenu): hide mobile footer when it does not exist

## 1.0.0-beta.6

### Minor Changes

- c2a6447: - implemented headless feature: `createNavigationMenu`
  - headless MenuButton:
    - now takes an `isExpandedRef` and `onToggle` via it's options
    - `flyout` element is removed as it is not needed
    - removed hover and focus toggle features and moved them to the onyx component directly as these are non spec features
  - update headless implementation in `sit-onyx`

## 1.0.0-beta.5

### Patch Changes

- 59bca7e: fix(OnyxNavBar): show app name on open mobile context area and truncate app/nav names

## 1.0.0-beta.4

### Patch Changes

- 6e14afd: fix(OnyxMobileNavButton): scroll on overflowing mobile flyout

  The flyout of OnyxMobileNavButton now has a max height and is scrollable if too many nav/context items exist.
  - app version inside the mobile flyout is not positioned absolute anymore and is a disabled list item
  - fixed duplicate border in mobile context menu when multiple list items exist

## 1.0.0-beta.3

### Minor Changes

- 67a5e50: feat(OnyxSelect, OnyxRadioGroup, OnyxCheckboxGroup): Implement truncation on higher level

## 1.0.0-beta.2

### Minor Changes

- 15114f7: feat(OnyxSelect): Implement truncation for OnyxSelectOptions

## 1.0.0-beta.1

### Major Changes

- 7b72cbc: refactor: rename toast components
  - renamed `OnyxToast` to `OnyxToastMessage`
  - renamed `OnyxToastProvider` to `OnyxToast`

## 1.0.0-beta.0

### Major Changes

- bf3ea0a: release beta version

  🎉 onyx is now beta! There are no breaking changes to the last `1.0.0.-alpha.*` version

### Patch Changes

- Updated dependencies [bf3ea0a]
  - @sit-onyx/icons@1.0.0-beta.0

## 1.0.0-alpha.165

### Patch Changes

- bf1e992: fix(typings): incorrect or outdated type definitions
  - The `vite-plugin-dts` was removed and instead we use `vue-tsc` for the generation of the type definitions.
  - The plugin used an outdated version of the [`@vue/language-core`](https://www.npmjs.com/package/%40vue%2Flanguage-core) package

## 1.0.0-alpha.164

### Major Changes

- 555ac22: refactor navigation components
  - `OnyxFlyoutMenu`: rename default slot to options
  - previous `OnyxNavItem` component is now `OnyxNavButton` with changed API
  - new `OnyxNavItem` is now only intended to be used as children for the new `OnyxNavButton`
  - `OnyxUserMenu`: property `avatar` now only accepts a string, not an object
  - fix(OnyxUserMenu): use correct font weight for username

### Minor Changes

- 48b24d2: feat: support lidl, kaufland and twogo theme

### Patch Changes

- 555ac22: fix(OnyxMenuItem): make whole button/link clickable

  Also add missing export for the component itself

## 1.0.0-alpha.163

### Minor Changes

- 4ddd145: feat(OnyxNavBar): expose method `closeMobileMenus`

## 1.0.0-alpha.162

### Minor Changes

- 90f9f86: feat: implement OnyxColorSchemeMenuItem

### Patch Changes

- 90f9f86: fix(OnyxMenuItem): make whole button/anchor clickable

## 1.0.0-alpha.161

### Minor Changes

- 4492231: feat(OnyxTable): add `withPageScrolling` prop to switch from table-scrolling to page-scrolling

## 1.0.0-alpha.160

### Patch Changes

- cd4a885: fix(OnyxSelect): Fix OnyxSelect opening on submit

## 1.0.0-alpha.159

### Major Changes

- 760bb76: refactor(OnyxTable): split default slot to distinguish thead and tbody

  Including new features:
  - implement empty state when no table data exists
  - define focus outline

## 1.0.0-alpha.158

### Patch Changes

- 4ee1e7f: fix(OnyxNavBar): align horizontal padding with grid

## 1.0.0-alpha.157

### Patch Changes

- c79e491: fix(OnyxSelect): do not submit form when pressing Enter
- 8d14b72: fix(OnyxSelect): position flyout correctly in grid layout

## 1.0.0-alpha.156

### Minor Changes

- ea9a9e7: Implement OnyxMenuItem component which is intended to be used inside OnyxUserMenu

## 1.0.0-alpha.155

### Major Changes

- b8db0cc: refactor(OnyxPageLayout): remove slot `toasts`

  Use the new [OnyxToastProvider](https://storybook.onyx.schwarz/?path=/docs/feedback-toastprovider--docs) instead

### Minor Changes

- b8db0cc: feat: add `OnyxToastProvider` component and `useToast` composable

## 1.0.0-alpha.154

### Patch Changes

- 529a84f: feat(nuxt): integrate @nuxtjs/i18n into onyx nuxt module

## 1.0.0-alpha.153

### Minor Changes

- 2cef847: - feat(OnyxSelect): optionally manage searchTerm and open internally
  - fix(OnyxSelect): fix bug where OnyxSelect closed when clicking the clear button

## 1.0.0-alpha.152

### Minor Changes

- 8692b19: feat: add `OnyxToast` component

## 1.0.0-alpha.151

### Minor Changes

- 3c8cf6d: Implement new OnyxNavItem component

## 1.0.0-alpha.150

### Minor Changes

- 0bdb49a: feat(OnyxSelectInput): support validity handling
  - internal input is not readonly, but blocks all character inputs
  - supports translated error message for empty required inputs

- 0bdb49a: feat(global.css): include layers order to prevent hierarchy issues

## 1.0.0-alpha.149

### Minor Changes

- 1cc020a: feat(OnyxNavBar): support mobile context area

### Patch Changes

- 1cc020a: fix: limit width to `max-content` for OnyxTag and OnyxTimer

## 1.0.0-alpha.148

### Major Changes

- 2d0458d: fix(OnyxIcon): change default size to `24px` instead of font size

## 1.0.0-alpha.147

### Major Changes

- 743ee88: - feat(OnyxIcon): use font-size as default icon size
  - fix(OnyxButton): keep label width when loading
  - fix(OnyxInput, OnyxTextarea): fix label tooltip not correctly vertically aligned
- b7e9aaf: refactor: align list items
  - OnyxSelect: remove property `color`
  - OnyxUserMenu: remove property `options` and even `optionsClick` in favor of a `default` slot where `<OnyxListItem>` should be placed

## 1.0.0-alpha.146

### Major Changes

- d4fbcf4: refactor: align all namings with Figma

  The breaking changes changes are:
  - rename `OnyxRadioButtonGroup` to `OnyxRadioGroup`
  - OnyxRadioButton: rename property `selected` to `checked`
  - OnyxAvatar: remove `type` male/female
  - OnyxHeadline: remove property `monospace`
  - OnyxNavBar: remove unused `label` property

## 1.0.0-alpha.145

### Minor Changes

- 02f1a8a: feat(OnyxNavBar): support mobile nav items

## 1.0.0-alpha.144

### Minor Changes

- 85128a2: feat(OnyxMiniSearch): add magnifier icon when empty

## 1.0.0-alpha.143

### Patch Changes

- 02f5691: fix(OnyxNavAppArea): max-height not honored

## 1.0.0-alpha.142

### Patch Changes

- 7c98a6d: fix(OnyxFormElement): hide message while error is shown + prevent error overflow

## 1.0.0-alpha.141

### Minor Changes

- 08b434b: feat(OnyxSelectInput): support message/label tooltip

## 1.0.0-alpha.140

### Minor Changes

- d3e9321: Add new OnyxNavButton component

## 1.0.0-alpha.139

### Minor Changes

- 107ec36: feat(OnyxSelect): support `option` slot

  The new slot can be used to show custom content for the select options

## 1.0.0-alpha.138

### Minor Changes

- 0863114: feat: support `autofocus` property for multiple components
  - OnyxButton, OnyxCheckbox, OnyxIconButton, OnyxRadioButton, OnyxSwitch, OnyxSelect

- 0863114: feat: add `OnyxColorSchemeDialog` component
- 53b0d50: feat(OnyxInput,OnyxTextarea): Unify template & style of header/footer form elements

## 1.0.0-alpha.137

### Patch Changes

- 442e4c5: fix(OnyxDialog): prevent overflow and add z-index

## 1.0.0-alpha.136

### Patch Changes

- f1aad40: fix(OnyxNavBar): support SSR

  prevent "ResizeObserver not defined" error

## 1.0.0-alpha.135

### Patch Changes

- 0511127: fix(OnyxNavItem): fix styles for selected child items

## 1.0.0-alpha.134

### Minor Changes

- 02d9f0f: feat(validity): Allow short/long message distinguishing for custom errors

## 1.0.0-alpha.133

### Patch Changes

- Updated dependencies [fad8140]
  - @sit-onyx/icons@0.1.0-alpha.2

## 1.0.0-alpha.132

### Patch Changes

- 6059d12: fix keyboard support for the select

## 1.0.0-alpha.131

### Major Changes

- 1baef56: refactor(OnyxTable): rename property grid to withVerticalBorders

## 1.0.0-alpha.130

### Minor Changes

- 37ee3fd: feat: add `OnyxDialog` component

## 1.0.0-alpha.129

### Minor Changes

- 70c7f93: feat(OnyxInfoTooltip): export info tooltip

## 1.0.0-alpha.128

### Patch Changes

- 55c0b19: fix(OnyxTable): make components interactive when showing column hover effect

## 1.0.0-alpha.127

### Minor Changes

- 62cb2ca: feat: support `global.css` file

  See [Getting Started guide](https://onyx.schwarz/development/#installation) for further information.

## 1.0.0-alpha.126

### Minor Changes

- 85482cd: feat(OnyxInput,OnyxTextarea): show invalid messages

### Patch Changes

- edbfc22: fix(OnyxTable): take up full available width

  This also fixed the issue that the table does not align with the grid

- edbfc22: fix: export missing support components

## 1.0.0-alpha.125

### Patch Changes

- 2805e75: fix(OnyxTextarea): Fix first manual resizing being canceled on Firefox

## 1.0.0-alpha.124

### Patch Changes

- 5294c95: Remove unnecessary footer gap in OnyxTextarea and OnyxInput component

## 1.0.0-alpha.123

### Minor Changes

- f7e965b: Implement info/message label on input and textarea

## 1.0.0-alpha.122

### Patch Changes

- 8c1cc76: fix(OnyxSelect): prevent redundant update:searchTerm emits

## 1.0.0-alpha.121

### Patch Changes

- decd55c: fix(OnyxCheckbox,OnyxRadioButton,OnyxSwitch,OnyxSelect): reset control sizes to ignore density. fix radio alignment to center

## 1.0.0-alpha.120

### Patch Changes

- dc2125e: fix(OnyxSelect): hide check all when searching

## 1.0.0-alpha.119

### Patch Changes

- 697ffcd: Removed gap between label and external link icon in the nav item component

## 1.0.0-alpha.118

### Minor Changes

- 2d2ada6: feat(OnyxTable): support vertical/horizontal scrolling

## 1.0.0-alpha.117

### Patch Changes

- 92b9375: fix(OnyxSelect): support `skeleton` and `textMode` property

## 1.0.0-alpha.116

### Major Changes

- b0554c8: refactor: rename listbox to select
  - rename component `OnyxListbox` to `OnyxSelect`
  - rename component `OnyxListboxOption` to `OnyxSelectOption`

  In addition the following types have been renamed:

  | Old name               | New name              |
  | ---------------------- | --------------------- |
  | SelectOption           | BaseSelectOption      |
  | ListboxOption          | SelectOption          |
  | OnyxListboxProps       | OnyxSelectProps       |
  | ListboxModelValueProps | SelectModelValueProps |
  | ListboxLazyLoading     | SelectLazyLoading     |
  | SelectModelValue       | SelectInputModelValue |
  | OnyxListboxOptionProps | OnyxSelectOptionProps |

### Patch Changes

- b0554c8: fix(OnyxSelect): do not focus on outside click

## 1.0.0-alpha.115

### Major Changes

- 19011d6: feat(OnyxListbox): implement select/combobox

  Implement select/combox inside the OnyxListbox. The API and component purpose has changed.
  The OnyxListbox will be renamed to OnyxSelect in a future version.

### Patch Changes

- 19011d6: fix(OnyxSelectItem): add missing styles for hover,active,focus state

## 1.0.0-alpha.114

### Major Changes

- 309fb43: refactor grid implementation
  - remove padding, max-width and center from the `onyx-grid` class in favor of the `onyx-grid-container` class

### Patch Changes

- 309fb43: fix(OnyxButton): limit default width to max-content

## 1.0.0-alpha.113

### Major Changes

- f46561c: Renamed OnyxSelect to OnyxSelectInput

## 1.0.0-alpha.112

### Patch Changes

- f0ca40c: fix(OnyxTextarea): support manual resize for readonly and disabled

  If you want to disable manual resize you need to set the `disableManualResize` property

## 1.0.0-alpha.111

### Minor Changes

- d1984e2: Added OnyxVisuallyHidden support component

## 1.0.0-alpha.110

### Patch Changes

- 2e93902: fix(OnyxIconButton): display inline by default

  Display the icon button inline by default to align with the `OnyxButton`.
  This simplifies the layout then an icon button is placed next to text.

## 1.0.0-alpha.109

### Patch Changes

- 1093e66: Implement external link icon for nested nav items
- Updated dependencies [99b2089]
  - @sit-onyx/icons@0.1.0-alpha.1

## 1.0.0-alpha.108

### Minor Changes

- aa0b540: Added OnyxTimer component

## 1.0.0-alpha.107

### Minor Changes

- 9279c7b: feat(OnyxTextarea): support autosize

## 1.0.0-alpha.106

### Minor Changes

- 34547be: Added search functionality which can be used by setting the `withSearch` flag

## 1.0.0-alpha.105

### Patch Changes

- c011e27: fix(grid): include padding in max-width

## 1.0.0-alpha.104

### Minor Changes

- 20fb878: feat(theme): include color-scheme in the onyx dark/light theme

## 1.0.0-alpha.103

### Patch Changes

- 09ce727: fix(OnyxCheckbox): align checkbox label padding according to density, stabilize check all border

## 1.0.0-alpha.102

### Minor Changes

- 3b9fbf4: feat: add `OnyxTextarea` component

## 1.0.0-alpha.101

### Patch Changes

- 2ea735b: Hide nested children when nav item is closed

## 1.0.0-alpha.100

### Patch Changes

- d54d357: fix(OnyxUserMenu): hide flyout menu when closed

## 1.0.0-alpha.99

### Patch Changes

- 3a9783d: Fix listbox position inside OnyxNavItem

## 1.0.0-alpha.98

### Major Changes

- 9eb7b4e: rename SCSS breakpoint mixin

  Old:

  ```scss
  @use "sit-onyx/breakpoints.scss" as onyx;

  @include onyx.breakpoint(max, md) {
    // your styles
  }
  ```

  New:

  ```scss
  @use "sit-onyx/breakpoints.scss";

  @include breakpoints.screen(max, md) {
    // your styles
  }
  ```

### Minor Changes

- 9eb7b4e: feat: add `OnyxNavBar` component

  If you used one of the `onyx-grid-max-md`, `onyx-grid-max-lg` or `onyx-grid-center` CSS classes which are not placed on the application root, move them to the application root element. See [grid docs](https://onyx.schwarz/development/grid.html#example) for further information

## 1.0.0-alpha.97

### Minor Changes

- 5754525: feat(OnyxCheckboxGroup): align style for "check all" with figma

## 1.0.0-alpha.96

### Major Changes

- f99f38f: refactor: align color property names
  - rename property `variation` to `color` for: OnyxBadge, OnyxButton and OnyxIconButton
  - OnyxButton and OnyxIconButton: rename color `secondary` to `neutral`

## 1.0.0-alpha.95

### Patch Changes

- 2f825ec: fix(OnyxCheckboxGroup,OnyxListbox): preserve disabled states when toggling "check all"

## 1.0.0-alpha.94

### Patch Changes

- c867746: fix(OnyxUserMenu): emit `optionClick` event when clicking an option

## 1.0.0-alpha.93

### Minor Changes

- c55a599: Implement density for OnyxListbox

## 1.0.0-alpha.92

### Minor Changes

- 2b48da9: feat: add basic `OnyxUserMenu` component
- 2b48da9: feat(OnyxListbox): support icon and danger color for options

## 1.0.0-alpha.91

### Patch Changes

- 93ad5a9: Fix hover colors on OnyxListbox
- 1eb0528: Fix OnyxNavItem font-weight for active state

## 1.0.0-alpha.90

### Minor Changes

- 57d81c9: feat: export `OnyxCheckbox` and `OnyxRadioButton`

## 1.0.0-alpha.89

### Major Changes

- 7951251: refactor: align properties for selection components
  - remove type `SelectionOption` and `ListboxOption` in favor of `SelectOption`. Affects: OnyxCheckboxGroup, OnyxRadioButtonGroup, OnyxListbox and OnyxSelect
  - OnyxSelect: change property `modelValue` to be a select options instead of value only. This allows (e.g. to display a label for the current value(s) when the value(s) are not included in the options or the options are loading asynchronously)
  - OnyxSelect: require property `options`
  - OnyxRadioButtonGroup: change property `modelValue` to be the primitive value instead of a whole option
  - fix(OnyxRadioButtonGroup): modelValue not shown as selected if type is number or boolean
  - rename type `Multiple` to `SelectMultiple`
  - remove utility type `TargetEvent`

## 1.0.0-alpha.88

### Minor Changes

- 8d65dce: feat(OnyxTable): add row and column hover styles

## 1.0.0-alpha.87

### Minor Changes

- 413d3e0: Implement external icon when external links are used inside OnyxNavItem

## 1.0.0-alpha.86

### Minor Changes

- 5e96001: feat(OnyxAvatar): update font sizes

## 1.0.0-alpha.85

### Major Changes

- 641dac7: refactor(OnyxCheckboxGroup): remove`checkAllLabel` property in favor of `withCheckAll`

### Minor Changes

- 641dac7: feat(OnyxListbox): implement `check all` support + exclude disabled options from keyboard navigation
- afe16cf: Implement basic OnyxNavItem component

## 1.0.0-alpha.84

### Minor Changes

- 5f28acb: feat(OnyxAvatar): add default slot to allow for custom content

### Patch Changes

- 5f28acb: fix(OnyxAvatar): update font size for size `96px`

## 1.0.0-alpha.83

### Minor Changes

- 29a8ba6: feat: add basic `OnyxTable` component

## 1.0.0-alpha.82

### Minor Changes

- 1377af6: feat(OnyxListbox): implement multiselect. Extend headless listbox to have an array modelValue if multiselect is used.

### Patch Changes

- Updated dependencies [1377af6]
  - @sit-onyx/headless@0.1.0-alpha.7

## 1.0.0-alpha.81

### Minor Changes

- ded1477: feat(OnyxBadge): add property `dot`

## 1.0.0-alpha.80

### Minor Changes

- da3cad4: feat(OnyxAvatar): support custom image

### Patch Changes

- da3cad4: fix(OnyxAvatar): remove aria-label in favor of title

  `aria-label` should only be used for interactive elements so we use `title` instead

## 1.0.0-alpha.79

### Minor Changes

- 193ecf2: feat: add `skeleton` property for `OnyxIconButton` and `OnyxInput`

## 1.0.0-alpha.78

### Patch Changes

- d819092: fix(OnyxSwitch): align label based on density, increase click area + show marker on truncation

## 1.0.0-alpha.77

### Minor Changes

- a7b5140: feat: add `OnyxAvatar` and `OnyxAvatarStack` component

## 1.0.0-alpha.76

### Patch Changes

- a155d1b: fix(OnyxTag): update border radius

## 1.0.0-alpha.75

### Patch Changes

- 61c4964: fix(OnyxButton): add aria label when loading

## 1.0.0-alpha.74

### Minor Changes

- 288afbd: feat: add `OnyxTag` component

## 1.0.0-alpha.73

### Minor Changes

- 43a8616: feat(listbox): support multiple characters for type-ahead

## 1.0.0-alpha.72

### Minor Changes

- f464b42: Implement grouped options for OnyxListbox component

## 1.0.0-alpha.71

### Patch Changes

- b20fa64: fix(OnyxSelect): add missing border style for readonly + hover

## 1.0.0-alpha.70

### Major Changes

- 4508633: refactor: rename density constant and type
  - rename constant `DENSITY` to `DENSITIES`
  - rename type `DensityType` to `Density`

## 1.0.0-alpha.69

### Minor Changes

- cc7e712: feat(OnyxListbox): add loading and empty state

## 1.0.0-alpha.68

### Minor Changes

- 20fe4ff: Update OnyxBadge default icon size

## 1.0.0-alpha.67

### Patch Changes

- e51f8cb: fix(OnyxSwitch): repair zoom alignment of icon

## 1.0.0-alpha.66

### Major Changes

- 4747445: remove `TestInput` in favor of `OnyxInput`
- 4747445: refactor: OnyxRadioButton, OnyxRadioButtonGroup, OnyxSwitch - rename property `errorMessage` to `customError`
- 4747445: refactor: rename type `RadioButtonProps` to `OnyxRadioButtonProps` to align naming with other components

### Patch Changes

- 4747445: fix(OnyxButton): bind `type` property to native `<button>`
- 4747445: fix(OnyxTooltip): prevent "document not defined" error in server side rendering

## 1.0.0-alpha.65

### Minor Changes

- e9eae68: Component styles are now normalized and make use of CSS layers

## 1.0.0-alpha.64

### Minor Changes

- 4e2a5bb: feat: add `OnyxEmpty` component

## 1.0.0-alpha.63

### Minor Changes

- 03fea09: feat: add SCSS mixin for breakpoints

  See the [documentation](https://onyx.schwarz/development/breakpoints.html) for further details

## 1.0.0-alpha.62

### Minor Changes

- cde1fdd: Implement OnyxBadge

## 1.0.0-alpha.61

### Patch Changes

- 93c4495: fix(OnyxTooltip): prevent warning about invalid prop type for `open`

## 1.0.0-alpha.60

### Minor Changes

- b31b7c5: feat(OnyxSelect): implement skeleton, readonly, density and translation

## 1.0.0-alpha.59

### Major Changes

- fe0f615: refactor(OnyxTooltip): remove property `label` and `hideLabel` in favor of `message`

## 1.0.0-alpha.58

### Minor Changes

- 70b545e: Create base of OnyxSelect, excluding the flyout

## 1.0.0-alpha.57

### Patch Changes

- d4bb972: fix(OnyxTooltip): add missing type for open property

## 1.0.0-alpha.56

### Minor Changes

- 6631b3d: Implemented density prop

## 1.0.0-alpha.55

### Patch Changes

- b7758f7: fix(OnyxTooltip): render newlines in text property

## 1.0.0-alpha.54

### Minor Changes

- 40b72b2: feat(OnyxTooltip): add`tooltip` slot, close tooltip with Escape in "hover" mode

## 1.0.0-alpha.53

### Minor Changes

- cb3a72b: add CSS variables for box shadows

  See [token documentation](https://onyx.schwarz/variables/shadows.html) for a full list of available shadows.

### Patch Changes

- 10fb012: fix(OnyxCheckbox): force required/optional marker to be visible on label truncation

## 1.0.0-alpha.52

### Minor Changes

- 9dec6c0: feat(OnyxTooltip): add property open

## 1.0.0-alpha.51

### Major Changes

- a2181c6: Switch OnyxButton to be inline

## 1.0.0-alpha.50

### Minor Changes

- 3d3e728: feat: support listbox keyboard shortcuts

## 1.0.0-alpha.49

### Minor Changes

- 668d5fe: feat: add basic single select `OnyxListbox` component

## 1.0.0-alpha.48

### Minor Changes

- 2eb0867: Add property 'loading' for OnyxButton, OnyxCheckbox, OnyxRadioButton and OnyxSwitch

## 1.0.0-alpha.47

### Patch Changes

- 9ad6208: fix(OnyxButton): apply the type property to the button

## 1.0.0-alpha.46

### Minor Changes

- fd86fa1: feat(OnyxInput): add property `hideLabel`

## 1.0.0-alpha.45

### Minor Changes

- 27c2bb8: feat(OnyxInput): add styles for autofill state

## 1.0.0-alpha.44

### Minor Changes

- 3ec3d94: feat(OnyxInput): add property `maxlength`, `minLength`, `withCounter` and `message`

## 1.0.0-alpha.43

### Minor Changes

- fc36296: feat(OnyxInput): add property `required`

## 1.0.0-alpha.42

### Patch Changes

- 6874b99: fix(OnyxInput): remove default padding of native input

## 1.0.0-alpha.41

### Minor Changes

- 05b233a: feat(i18n): support Korean Language for i18n

## 1.0.0-alpha.40

### Minor Changes

- 179a847: Implement OnyxIconButton

## 1.0.0-alpha.39

### Minor Changes

- c4d1c19: feat(OnyxInput): add property `loading`

## 1.0.0-alpha.38

### Minor Changes

- 5678b46: feat(OnyxInput): add property `readonly` and `disabled`

## 1.0.0-alpha.37

### Minor Changes

- d30c0b6: feat: add auto hyphens for multiline truncation

### Patch Changes

- d30c0b6: fix: top algin checkbox, radio button and switch when using multiline truncation
- d30c0b6: fix: do not show Asterisk / optional label when label is hidden for OnyxCheckbox and OnyxSwitch

## 1.0.0-alpha.36

### Major Changes

- e4e1983: bump minimum TypeScript version to 5.2.2

### Minor Changes

- e4e1983: feat(OnyxInput): add properties autocapitalize, autocomplete, autofocus, name and pattern

## 1.0.0-alpha.35

### Minor Changes

- 3198059: feat: add property `skeleton` to `OnyxCheckboxGroup` and `OnyxRadioButtonGroup`

## 1.0.0-alpha.34

### Patch Changes

- a8ad4ff: fix(OnyxButton): add active state

## 1.0.0-alpha.33

### Minor Changes

- ab2fbb8: feat: add basic OnyxInput component

## 1.0.0-alpha.32

### Minor Changes

- c147e3d: feat: add property `skeleton` to OnyxButton, OnyxCheckbox, OnyxRadioButton and OnyxSwitch

## 1.0.0-alpha.31

### Minor Changes

- 69f1569: feat: add truncation for OnyxButton, OnyxCheckbox, OnyxRadioButton and OnyxSwitch

## 1.0.0-alpha.30

### Patch Changes

- c785597: fix: add padding-right for checkbox and radio button label

## 1.0.0-alpha.29

### Patch Changes

- f04d083: fix(OnyxSwitch): update styles

## 1.0.0-alpha.28

### Minor Changes

- 62c8d65: feat: add component `OnyxSkeleton`

## 1.0.0-alpha.27

### Minor Changes

- 827a893: feat: create components `OnyxAppLayout` and `OnyxPageLayout`

## 1.0.0-alpha.26

### Minor Changes

- 2bc861c: Implement basic OnyxSwitch

## 1.0.0-alpha.25

### Minor Changes

- 743d6b9: refactor(OnyxLoadingIndicator): update dots animation

## 1.0.0-alpha.24

### Patch Changes

- Updated dependencies [5ac259d]
  - @sit-onyx/icons@0.1.0-alpha.0

## 1.0.0-alpha.23

### Minor Changes

- a3bc165: feat(OnyxLink): add CSS states and external link icon

## 1.0.0-alpha.22

### Minor Changes

- f859db6: feat(OnyxLoadingIndicator): animate dots

## 1.0.0-alpha.21

### Minor Changes

- 6324d32: feat: add `OnyxLink` component

## 1.0.0-alpha.20

### Minor Changes

- 6045208: feat: add OnyxLoading indicator (circle)

## 1.0.0-alpha.19

### Minor Changes

- b3b340a: Implemented basic OnyxRadioButtonGroup

## 1.0.0-alpha.18

### Minor Changes

- ce944e1: feat: create z-index CSS variables for onyx

## 1.0.0-alpha.17

### Patch Changes

- f7d716c: Fix disabled state of the button

## 1.0.0-alpha.16

### Major Changes

- 83f78f7: refactor(OnyxCheckbox): make `label` property required

  Even if the label is visually hidden, it must be provided for accessibility reasons / screen readers.
  If you used a checkbox without a label previously, add a descriptive label and use the new `hideLabel`
  visually hide the label.

## 1.0.0-alpha.15

### Minor Changes

- 1de4414: Add icon property to OnyxButton

## 1.0.0-alpha.14

### Minor Changes

- c605dbb: feat: add component `OnyxCheckboxGroup`

## 1.0.0-alpha.13

### Minor Changes

- 1c52657: Add new OnyxButton component

## 1.0.0-alpha.12

### Minor Changes

- 95b6e75: feat(OnyxCheckbox): add property `required`

## 1.0.0-alpha.11

### Major Changes

- 97da8df: refactor(OnyxIcon): rewrite icon size map to reflect Figma pixel values

## 1.0.0-alpha.10

### Major Changes

- a4df4af: refactor: update CSS variables

  | Old                   |                         New |
  | --------------------- | --------------------------: |
  | `--onyx-spacing-4xs`  |        `--onyx-spacing-5xs` |
  | `--onyx-spacing-3xs`  |        `--onyx-spacing-4xs` |
  | `--onyx-spacing-2xs`  |        `--onyx-spacing-3xs` |
  | `--onyx-spacing-xs`   |        `--onyx-spacing-2xs` |
  | `--onyx-color-text-*` | `--onyx-color-text-icons-*` |
  | `--onyx-color-icon-*` | `--onyx-color-text-icons-*` |

## 0.1.0-alpha.9

### Minor Changes

- eda3982: feat(OnyxCheckbox): add property `disabled`

## 0.1.0-alpha.8

### Patch Changes

- c62476d: fix(OnyxIcon): remove default browser margin

## 0.1.0-alpha.7

### Minor Changes

- fdada3a: Implemented barebone RadioButtonGroup and RadioButton support component

## 0.1.0-alpha.6

### Minor Changes

- bd5040f: feat: add `OnyxIcon` component

## 0.1.0-alpha.5

### Minor Changes

- 8d5c937: feat: add component `OnyxHeadline`

## 0.1.0-alpha.4

### Patch Changes

- a190f80: fix: define fonts as peerDependency
- a190f80: fix: prevent type error when importing as library

## 0.1.0-alpha.3

### Minor Changes

- 9f7e8d1: feat: update default "onyx" theme

## 0.1.0-alpha.2

### Patch Changes

- 530af96: fix: support importing json files from `sit-onyx/locales` with intellisense

## 0.1.0-alpha.1

### Patch Changes

- 07e862f: Ensure that the i18n instance is not reset when it has been provided

## 0.1.0-alpha.0

### Minor Changes

- 13f96c1: feat(i18n): support i18n / translations
- 0920aa6: feat: add CSS variables `--onyx-font-family` and `--onyx-font-family-mono`
