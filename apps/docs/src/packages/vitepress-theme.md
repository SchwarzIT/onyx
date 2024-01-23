---
outline: [2, 3]
---

<script lang="ts" setup>
import packageJson from "../../../../packages/vitepress-theme/package.json";
</script>

# @sit-onyx/vitepress-theme

<div class="hide-external-link">

[![npm version](https://badge.fury.io/js/@sit-onyx%2Fvitepress-theme.svg)](https://www.npmjs.com/package/@sit-onyx/vitepress-theme)

</div>

Custom [VitePress](https://vitepress.dev) theme that uses the onyx design system.

The documentation that you are currently reading is created using this custom theme.

It extends the default VitePress theme so you can use the same [config](https://vitepress.dev/reference/default-theme-config) that you are already familiar with (which includes search, sidebar etc.).

## Features

The theme includes the following features:

- light and dark theme that matches the onyx design
- colored name and gradient logo background on the [home page](/)
- Font families matching the [onyx typography system](/typography)

## Installation

::: code-group

```sh [pnpm]
pnpm add -D @sit-onyx/vitepress-theme@alpha
```

```sh [npm]
npm install -D @sit-onyx/vitepress-theme@alpha
```

```sh [yarn]
yarn install -D @sit-onyx/vitepress-theme@alpha
```

:::

## Usage

You can check the [VitePress documentation](https://vitepress.dev/guide/custom-theme) for further information.

::: code-group

```ts [.vitepress/theme/index.ts]
import OnyxTheme from "@sit-onyx/vitepress-theme";

// if you use/override custom styles, they must be imported after the theme, e.g.
// import "./styles.css";

export default OnyxTheme;
```

:::

## Utilities

This package also includes some VitePress utilities that you can use on-demand.

### Breakpoint SCSS mixin

Applies CSS only to the given VitePress breakpoint.

::: details Available VitePress breakpoints

| Breakpoint name | Value    |
| --------------- | -------- |
| xs              | `375px`  |
| s               | `640px`  |
| m               | `768px`  |
| l               | `960px`  |
| xl              | `1280px` |
| xxl             | `1440px` |

:::

```scss
@use "@sit-onyx/vitepress-theme/mixins.scss";

.some-class {
  @include mixins.breakpoint(m, max) {
    // your styles for m breakpoint and smaller
  }

  @include mixins.breakpoint(m, min) {
    // your styles for m breakpoint and larger
  }
}
```
