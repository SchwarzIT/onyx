# @sit-onyx/headless

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
