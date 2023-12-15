# Getting Started

::: warning Work in progress / Active development
This library is currently in early / active development.
The name `NUI` is only a working title and will be changed in the future.
:::

## Installation

<!--
Make sure that this chapter is kept up to date with installation steps in
packages/nui/README.md file.
 -->

Install the npm package with your corresponding package manager:

::: code-group

```sh [pnpm]
pnpm add nui
```

```sh [npm]
npm install nui
```

```sh [yarn]
yarn install nui
```

:::

After that, import the global CSS file:

::: code-group

```ts [main.ts]
import "nui/style.css";
// if you override some NUI styles (e.g. CSS variables),
// make sure to import your custom CSS file after the default "nui/style.css"
```

:::

Components are now ready to be used, e.g.:

```vue
<script lang="ts" setup>
import { NuiButton } from "nui";
</script>

<template>
  <NuiButton label="Click me" />
</template>
```
