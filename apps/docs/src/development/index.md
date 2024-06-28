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

If you are using [Nuxt](https://nuxt.com), please head over to our [Nuxt module documentation](/development/packages/nuxt) to get started.

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
import { createApp } from "vue";
import { createOnyx } from "sit-onyx";

import "sit-onyx/style.css";

// by default, no onyx styles will have side affects on your global application styles like <body> etc.
// when building a whole application with onyx, we recommend also importing the following global styles
// which will apply the correct application background color, font styles etc.:
// import "sit-onyx/global.css";

const onyx = createOnyx();
const app = createApp(App);

app.use(onyx);
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

### Customize CSS

For most cases, all onyx components already provide properties to easily use supported features.
However, there might be some custom requirements in your project where you need to override styles / CSS.

All onyx components are designed to be easily customized with custom CSS. Just look up the CSS class that you
want to customize via your browser dev tools and define custom CSS as shown below.

#### Option 1: In a single Vue file <Badge text="recommended" />

For most cases when overriding onyx styles, we recommend to override them inside a single `.vue` file with [scoped styles](https://vuejs.org/api/sfc-css-features#scoped-css)
so the changes only affect components in this file and do not have global side effects on other components of your application.

Note the usage of the `:deep()` selector. For more information, see the [Vue docs](https://vuejs.org/api/sfc-css-features#deep-selectors).

::: code-group

```vue [MyComponent.vue]
<style scoped>
:deep(.onyx-input__label) {
  color: red;
}
</style>
```

:::

#### Option 2: Globally

Be careful when overriding styles globally since it will affect **EVERY** component in your application.

::: code-group

```css [styles.css]
.onyx-input__label {
  color: red;
}
```

:::

### Next steps

- [Theming](/development/theming), e.g. for setting up the dark mode
- [i18n](/development/i18n) if you are supporting multiple languages in your application
- [Grid](/development/grid) for easily implementing custom layouts
