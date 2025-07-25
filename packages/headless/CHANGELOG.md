# @sit-onyx/headless

## 1.0.0-beta.23

### Minor Changes

- 941b4a3: feat: export "useOutsideClick" composable

## 1.0.0-beta.22

### Major Changes

- 4018961: feat(dist)!: Added esm build
  - **BREAKING CHANGE:** Actual esm dist build was added. So far only typescript was provided.

## 1.0.0-beta.21

### Major Changes

- 1911f6c: feat(dist)!: Removed commonjs builds
  - **BREAKING CHANGE:** We dropped commonjs (cjs) builds and packages are now shipped as a [pure esm package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#pure-esm-package). Node >= 18 is required.

## 1.0.0-beta.20

### Minor Changes

- ec6e617: feat(createMenuButton): add `position` option to support flyouts that open to the top

## 1.0.0-beta.19

### Minor Changes

- d22943e: - feat(onOutsideClick): support `checkOnTab` option to also check the outside focus when pressing the Tab key
  - feat(createMenuButton): support keyboard navigation when menuitems with nested children exist
  - fix(createMenButton): correctly apply trigger events when changing between hover and click trigger dynamically

## 1.0.0-beta.18

### Minor Changes

- 43df367: added disabled prop in OnyxMobileNavButton, OnyxFlyout, OnyxFlyoutMenu, OnyxUserMenu

## 1.0.0-beta.17

### Patch Changes

- ece5641: chore: replace redundant useManagedState with defineModel

  The changes are mostly internal, but the typings were of `OnyxSelect` were improved:
  - The `modelValue` now infers a specific subtype of `SelectOptionValue` and the `options` values must match.
  - `withSearch`: Filtering of the options will not automatically disabled anymore when `searchTerm` is bound. Instead `noFilter` must be set.

## 1.0.0-beta.16

### Minor Changes

- 5210eb5: fix(OnyxFlyoutMenu): When the flyout menu opens on click, should be closed on the second click of the button. Decreased the gap between "more button" and flyout to 8px (0.5 rem)

## 1.0.0-beta.15

### Patch Changes

- b01942c: fix(createListbox): do not scroll whole page when opening with selected value

## 1.0.0-beta.14

### Minor Changes

- b76647b: feat(createMenuButton): add new trigger property that enables the flyout to be expanded on click, not on hover. The default behavior is on hover

## 1.0.0-beta.13

### Patch Changes

- b4c466f: fix: fix navigation menu opening with delay

## 1.0.0-beta.12

### Minor Changes

- a3eb7d0: feat(createTabs): support skipping disabled tabs for keyboard navigation

  Disabled tabs will now be skipped/ignored when navigating via keyboard.
  You need to provide the disabled state when calling the `tabs()` element, e.g.:

  ```vue
  <button v-bind="tab({ value: 'tab-1', disabled: true })" />
  ```

## 1.0.0-beta.11

### Minor Changes

- 8421235: feat(tabs): support keyboard navigation
  - Arrow left/right: Focus previous/next tab
  - Home: Focus first tab
  - End: Focus last tab
  - Enter/space: Select currently focused tab

## 1.0.0-beta.10

### Patch Changes

- fda8a30: fix(tabsTesting): correctly test switching to second tab

## 1.0.0-beta.9

### Minor Changes

- 616550f: feat(headless): implement basic tabs composable #2038

  The package now supports a `createTabs` composable and `tabsTesting()` Playwright utility.

## 1.0.0-beta.8

### Major Changes

- dc00809: feat: support SSR for OnyxSelect, OnyxNavButton, OnyxUserMenu and more components

  Removed `createId()` utility. Use Vue's new `useId()` utility which is SSR safe and supported since Vue `>= 3.5.0`.

## 1.0.0-beta.7

### Patch Changes

- 410064e: fix(OnyxSelect, listbox): Fix auto scroll behavior with search input

## 1.0.0-beta.6

### Patch Changes

- 820e63a: fix(listbox): Fix listbox auto scrolling behavior when it's closed

## 1.0.0-beta.5

### Major Changes

- 349f412: - breaking change: `useOutsideClick` - renamed `element` to `inside`: Can now accept multiple element refs
  - split `createTooltip` into `createTooltip` and `createToggletip` headless functions, as these implement different accessibility concepts: See https://inclusive-components.design/tooltips-toggletips/
  - Therefore, the `OnyxTooltip` had to be reworked:
    - on hover, the tooltip pattern is used
    - on click the toggletip pattern is used
    - the default slot now provides a `trigger` property, which needs to be bound by the user
  - Also, the `OnyxInfoTooltip` component has been updated to be accessible.

## 1.0.0-beta.4

### Major Changes

- 7ea9194: - Replaced incorrect `HtmlHTMLAttributes` with the correct supertype `HTMLAttributes`
  - implemented `createElRef`, which creates a special writeable computed that references a DOM Element and unwraps components.
    - `createElRef` returns a `HeadlessElRef`, which is a special subtype of `WritableComputedRef`. It uses a type differentiator, so no other `Ref` types can be assigned to it.
  - updated `createBuilder` `HeadlessElement` typings to only accept `HeadlessElRef` for `ref` keys. So `createElRef` must be used to create these.

## 1.0.0-beta.3

### Major Changes

- cae1e24: fix(OnyxSelect): fix cursor always jumping to the end of the search input
  feat(createComboBox): remove required, but redundant inputValue prop

## 1.0.0-beta.2

### Major Changes

- c2a6447: - implemented headless feature: `createNavigationMenu`
  - headless MenuButton:
    - now takes an `isExpandedRef` and `onToggle` via it's options
    - `flyout` element is removed as it is not needed
    - removed hover and focus toggle features and moved them to the onyx component directly as these are non spec features
  - update headless implementation in `sit-onyx`

## 1.0.0-beta.1

### Major Changes

- 2e29c45: - BREAKING CHANGE: `createTooltip` now provides a `root` element, which is used to listen for outside clicks
  - new `useGlobalListener` composable helper

## 1.0.0-beta.0

### Major Changes

- bf3ea0a: release beta version

  🎉 onyx is now beta! There are no breaking changes to the last `1.0.0.-alpha.*` version

## 1.0.0-alpha.12

### Patch Changes

- c79e491: fix(createComboBox): prevent submitting form when pressing enter

## 1.0.0-alpha.11

### Minor Changes

- 0bdb49a: feat(createComboBox): open flyout on text input for searchable combo boxes. Fix close/open bug when selecting with space

## 1.0.0-alpha.10

### Minor Changes

- d3e9321: Add new createMenuButton composable

## 1.0.0-alpha.9

### Patch Changes

- 6059d12: fix keyboard support for the select

## 1.0.0-alpha.8

### Major Changes

- 19011d6: feat(createComboBox): implement combobox

## 0.1.0-alpha.7

### Minor Changes

- 1377af6: feat(OnyxListbox): implement multiselect. Extend headless listbox to have an array modelValue if multiselect is used.

## 0.1.0-alpha.6

### Minor Changes

- 43a8616: feat(listbox): support multiple characters for type-ahead

## 0.1.0-alpha.5

### Patch Changes

- 4747445: fix(OnyxTooltip): prevent "document not defined" error in server side rendering

## 0.1.0-alpha.4

### Minor Changes

- 3d3e728: feat: support listbox keyboard shortcuts

## 0.1.0-alpha.3

### Minor Changes

- da20153: feat: add `createTooltip` composable

## 0.1.0-alpha.2

### Minor Changes

- 668d5fe: feat: add `createListbox` composable

## 0.1.0-alpha.1

### Patch Changes

- a190f80: fix: prevent type error when importing as library

## 0.1.0-alpha.0

### Minor Changes

- f427105: Enable export of headless testing util
