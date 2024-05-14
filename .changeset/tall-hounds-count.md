---
"sit-onyx": major
---

rename SCSS breakpoint mixin

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
