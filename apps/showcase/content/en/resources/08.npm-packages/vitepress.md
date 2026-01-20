---
title: Vitepress
---

# Vitepress

---

# @sit-onyx/vitepress-theme

:npm-package-badge{package="@sit-onyx/vitepress-theme"}

Custom [VitePress](https://vitepress.dev) theme that uses the onyx brand colors (which are currently the same as the Schwarz Digits brand colors).

info
The theme doesn't currently use the entire onyx framework but will be updated in the future.

The very documentation you are reading here is also using this exact custom Vitepress theme.

It extends the default VitePress theme so you can use the same [config](https://vitepress.dev/reference/default-theme-config) that you are already familiar with (which includes search, sidebar etc.).

## Changelog

A full changelog can be found [here](/development/packages/changelogs/vitepress-theme).

## Features

The theme includes the following features:

- light and dark theme that matches the onyx design
- colored gradient logo background on the [home page](/)
- Font families matching the [onyx typography system](/development/typography)

## Installation

:npm-install-code-tabs{packages="@sit-onyx/vitepress-theme" dev}

## Usage

You can check the [VitePress documentation](https://vitepress.dev/guide/custom-theme) for further information.

```ts [.vitepress/theme/index.ts]
import OnyxTheme from "@sit-onyx/vitepress-theme";

// if you use/override custom styles, they must be imported after the theme, e.g.
// import "./styles.css";

export default OnyxTheme;
```

## Utilities

This package also includes some VitePress utilities that you can use on-demand.

### Breakpoint SCSS mixin

Applies CSS only to the given VitePress breakpoint.

details Available VitePress breakpoints

| Breakpoint name | Value    |
| --------------- | -------- |
| xs              | `375px`  |
| s               | `640px`  |
| m               | `768px`  |
| l               | `960px`  |
| xl              | `1280px` |
| xxl             | `1440px` |

```scss
@use "@sit-onyx/vitepress-theme/mixins.scss";

.some-class {
  @include mixins.breakpoint(max, m) {
    // your styles for m breakpoint and smaller
  }

  @include mixins.breakpoint(min, m) {
    // your styles for m breakpoint and larger
  }

  // the breakpoint is inclusive so if you e.g. want to use
  // min and max for the same breakpoint you should
  // define an offset for either min or max
  @include mixins.breakpoint(max, xl) {
    // your styles for smaller and equal xl breakpoint
  }

  @include mixins.breakpoint(min, xl, 1) {
    // your styles for greater than xl breakpoint (exclusive)
  }
}
```
