# Getting Started

::: warning Work in progress / Active development
This library is currently in early / active development.
:::

<div class="hide-external-link">

[![npm version](https://badge.fury.io/js/sit-onyx.svg)](https://www.npmjs.com/package/sit-onyx)

</div>

## Installation

Install the npm package with your corresponding package manager:

::: code-group

```sh [pnpm]
pnpm add sit-onyx@alpha
```

```sh [npm]
npm install sit-onyx@alpha
```

```sh [yarn]
yarn install sit-onyx@alpha
```

:::

After that, import the global CSS file:

::: code-group

```ts [main.ts]
import "sit-onyx/style.css";
// if you override some onyx styles (e.g. CSS variables),
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

## Nuxt

To setup Onyx in a Nuxt Js project you can simply install the pre-configured Nuxt module for it:

```sh [npm]
npx nuxi add @sit-onyx/nuxt
```

Afterwards you're able to just use all onyx components inside your app and the global styles will automatically be set up for you. E.g.:

```vue
<template>
  <OnyxButton label="Click me" />
</template>
```
