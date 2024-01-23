# @sit-onyx/vitepress-theme

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
