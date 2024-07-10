# Theming

<script setup lang="ts">
import { data } from './theming.data';
</script>

Onyx supports a dark and a light theme as well as multiple built-in color themes. The options how to set up the theme for your application are described on this page.

To learn more about the theming concept of onyx, take a look at our [colors documentation](/basics/colors.html)

## Themes

The following color themes are built-in to onyx:

<ul>
  <li v-for="(theme, index) in data.themes" :key="theme">
    {{ theme }}
    <span v-if="index === 0">(default)</span>
  </li>
</ul>

To use a different theme, add the corresponding import to your `main.ts` file (example for the lidl theme):

::: code-group

```ts [main.ts]
// import "sit-onyx/styles.css";
// make sure to import the theme AFTER the general "sit-onyx/styles.css" file!
import "sit-onyx/themes/lidl.css";
```

:::

::: info
Importing the styles for the theme manually is not necessary when using the nuxt module. See: [Nuxt](/development/packages/nuxt#themes)
:::

## Dark mode

Per default, onyx will be displayed in light mode. In order to use the dark mode, simply set the class `dark` once on the root of your application, e.g. on `<html>` or `<body>`.

### Let the user decide

In order to let the user switch between light, dark and auto mode, we recommend to use the pre-built [OnyxColorSchemeMenuItem](https://storybook.onyx.schwarz/?path=/docs/navigation-modules-colorschememenuitem--docs) component inside the [nav bar](https://storybook.onyx.schwarz/?path=/story/navigation-navbar--with-context-area) together with the [@vueuse/core](https://vueuse.org/core/useColorMode) library as shown in the example below.

```vue
<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { OnyxNavBar, OnyxUserMenu, OnyxColorSchemeMenuItem } from "sit-onyx";
import { ref } from "vue";

const { store: colorScheme } = useColorMode();
</script>

<template>
  <OnyxNavBar app-name="Example app">
    <template #contextArea>
      <OnyxUserMenu username="John Doe">
        <OnyxColorSchemeMenuItem v-model="colorScheme" />
      </OnyxUserMenu>
    </template>
  </OnyxNavBar>
</template>
```

Alternatively, you can use the [OnyxColorSchemeDialog](https://storybook.onyx.schwarz/?path=/docs/navigation-modules-colorschemedialog--docs) component to build your own custom component.
