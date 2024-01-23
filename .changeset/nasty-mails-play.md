---
"@sit-onyx/vitepress-theme": minor
---

feat: add `breakpoint` scss mixin

Example usage:

```scss
@use "@sit-onyx/vitepress-theme/mixins.scss";

.some-class {
  @include mixins.breakpoint(max, m) {
    // your styles for m breakpoint
  }
}
```
