# @sit-onyx/vitepress-theme

## 1.0.0-alpha.6

### Patch Changes

- Updated dependencies [fdada3a]
  - sit-onyx@0.1.0-alpha.7

## 1.0.0-alpha.5

### Patch Changes

- Updated dependencies [bd5040f]
  - sit-onyx@0.1.0-alpha.6

## 1.0.0-alpha.4

### Patch Changes

- Updated dependencies [8d5c937]
  - sit-onyx@0.1.0-alpha.5

## 1.0.0-alpha.3

### Patch Changes

- a190f80: fix: prevent type error when importing as library
- Updated dependencies [a190f80]
- Updated dependencies [a190f80]
  - sit-onyx@0.1.0-alpha.4

## 1.0.0-alpha.2

### Minor Changes

- 9f7e8d1: feat: update default "onyx" theme

### Patch Changes

- Updated dependencies [9f7e8d1]
  - sit-onyx@0.1.0-alpha.3

## 0.1.0-alpha.1

### Minor Changes

- cc49642: feat: add `breakpoint` scss mixin

  Example usage:

  ```scss
  @use "@sit-onyx/vitepress-theme/mixins.scss";

  .some-class {
    @include mixins.breakpoint(max, m) {
      // your styles for m breakpoint
    }
  }
  ```

## 0.0.1-alpha.0

### Patch Changes

- 530af96: fix: prevent unresolvable imports due to missing files
- Updated dependencies [530af96]
  - sit-onyx@0.1.0-alpha.2
