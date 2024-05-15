# sit-onyx

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

  See [token documentation](https://onyx.schwarz/tokens/shadows.html) for a full list of available shadows.

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
