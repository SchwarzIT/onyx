# Breakpoints

To easily apply CSS depending on the onyx breakpoint, we offer a SCSS mixin you can use.

For further information, please see the [design documentation](/basics/breakpoints-grid#breakpoints).

The follow breakpoints are supported:

<<< @/../../../packages/sit-onyx/src/styles/breakpoints.scss#breakpoints

## Usage

```scss
@use "sit-onyx/breakpoints.scss" as onyx;

.some-class {
  @include onyx.breakpoint(max, md) {
    // your styles for md breakpoint and smaller
  }

  @include onyx.breakpoint(min, md) {
    // your styles for md breakpoint and larger
  }

  // the breakpoint is inclusive so if you e.g. want to use
  // min and max for the same breakpoint you should
  // define an offset for either min or max
  @include onyx.breakpoint(max, xl) {
    // your styles for smaller and equal xl breakpoint
  }

  @include onyx.breakpoint(min, xl, $offset: 1) {
    // your styles for greater than xl breakpoint (exclusive)
  }
}
```
