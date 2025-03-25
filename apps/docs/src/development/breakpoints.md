# Breakpoints

To easily apply CSS depending on the onyx breakpoint, we offer a SCSS mixin you can use.

For further information, please see the [design documentation](/basics/breakpoints-grid#breakpoints).

The following breakpoints are supported:

<<< @/../../../packages/sit-onyx/src/styles/breakpoints.scss#breakpoints

## Usage (Media Queries)

```scss
@use "sit-onyx/breakpoints.scss";

.some-class {
  @include breakpoints.screen(max, sm) {
    // your styles for md screens and smaller
  }

  @include breakpoints.screen(min, md) {
    // your styles for md screens and larger
  }
}
```

## Container queries

There is also an equivalent for using [container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries) instead of [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries) so the breakpoint is considered for the element width instead if the whole viewport.

Make sure to set the [`container-type`](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries#using_container_queries) CSS property accordingly, otherwise the container query will not work.

```scss
@use "sit-onyx/breakpoints.scss";

.some-class {
  container-type: size;

  @include breakpoints.container(max, sm) {
    // your styles for md containers and smaller
  }

  @include breakpoints.container(min, md) {
    // your styles for md containers and larger
  }

  // the breakpoint is inclusive so if you e.g. want to use
  // min and max for the same breakpoint you should
  // define an offset for either min or max
  @include breakpoints.container(max, xl) {
    // your styles for smaller and equal xl containers
  }

  @include breakpoints.container(min, xl, $offset: 1) {
    // your styles for greater than xl containers (exclusive)
  }
}
```

## Use in JavaScript

If you need to access the breakpoints via JavaScript (e.g. inside a [`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)), you can import them like so:

```ts
import { ONYX_BREAKPOINTS } from "sit-onyx";

console.log(`Width for sm breakpoint is: ${ONYX_BREAKPOINTS.sm}px`);
```
