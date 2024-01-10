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

Custom [VitePress](https://vitepress.dev) theme that uses the Onyx design system.

The documentation that you are currently reading is created using this custom theme.

It extends the default VitePress theme so you can use the same [config](https://vitepress.dev/reference/default-theme-config) that you are already familiar with (which includes search, sidebar etc.).

## Features

The theme includes the following features:

- light and dark theme that matches the Onyx design
- [colored gradient](/) for the name and logo background on the home page

## Installation

::: code-group

```sh [pnpm]
pnpm add -D @sit-onyx/vitepress-theme
```

```sh [npm]
npm install -D @sit-onyx/vitepress-theme
```

```sh [yarn]
yarn install -D @sit-onyx/vitepress-theme
```

:::

## Usage

You can check the [VitePress documentation](https://vitepress.dev/guide/custom-theme) for further information.

::: code-group

```ts [.vitepress/theme/index.ts]
import OnyxTheme from "@sit-onyx/vitepress-theme";

// if you use/override custom styles, they must be imported after the theme
// import "./styles.css";

export default OnyxTheme;
```

:::
