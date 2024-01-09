# Getting Started

::: warning Work in progress / Active development
This library is currently in early / active development.
:::

<div class="external-link--hide">

[![npm version](https://badge.fury.io/js/sit-onyx.svg)](https://www.npmjs.com/package/sit-onyx)

</div>

## Installation

<!--
Make sure that this chapter is kept up to date with installation steps in
packages/sit-onyx/README.md file.
 -->

Install the npm package with your corresponding package manager:

::: code-group

```sh [pnpm]
pnpm add sit-onyx
```

```sh [npm]
npm install sit-onyx
```

```sh [yarn]
yarn install sit-onyx
```

:::

After that, import the global CSS file:

::: code-group

```ts [main.ts]
import "sit-onyx/style.css";
// if you override some Onyx styles (e.g. CSS variables),
// make sure to import your custom CSS file after the default "sit-onyx/style.css"
```

:::

Components are now ready to be used, e.g.:

```vue
<script lang="ts" setup>
import { OnyxButton } from "sit-onyx";
</script>

<template>
  <OnyxButton label="Click me" />
</template>
```
