---
outline: [2, 3]
---

# Getting Started

::: warning Work in progress / Active development
This library is currently in early / active development.
:::

<div class="hide-external-link">

[![npm version](https://badge.fury.io/js/sit-onyx.svg)](https://www.npmjs.com/package/sit-onyx)

</div>

## Nuxt

If you are using [Nuxt](https://nuxt.com), please head over to our [Nuxt module](/development/packages/nuxt) to get started.

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

You can check all onyx components and their documentation in our [Storybook](https://storybook.onyx.schwarz).

## First steps <Badge text="recommended" />

Here are some further steps we recommend to take a look at when setting up your new application:

### Layout components

onyx provides [layout components](https://storybook.onyx.schwarz/?path=/docs/layout-about-layouts--docs) for easily setting up common layouts for the app, pages etc. which also take care of ensuring correct scroll containers etc.

Here is an example how a default application looks like when using layout components:

```vue
<script lang="ts" setup>
import { OnyxAppLayout, OnyxPageLayout, OnyxNavBar } from "sit-onyx";
</script>

<template>
  <OnyxAppLayout>
    <template #navBar>
      <OnyxNavBar app-name="My app" />
    </template>

    <OnyxPageLayout>
      <div class="onyx-grid-container">Your page content here...</div>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>
```

### Further references

- [Theming](/development/theming), e.g. for setting up the dark mode
- [i18n](/development/i18n) if you are supporting multiple languages in your application
- [Grid](/development/grid) for easily implementing custom layouts
