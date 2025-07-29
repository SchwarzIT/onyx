# Theming

onyx supports a dark and a light theme as well as custom color themes. The options how to set up the theme for your application are described on this page.

To learn more about the theming concept of onyx, take a look at our [colors documentation](/basics/colors.html)

::: warning Schwarz internal themes
onyx includes build-in themes for brands of the [Schwarz group](https://gruppe.schwarz/) that are only accessible for internal employees.

If you are an Schwarz employee and want to access one the following themes, please refer to the [Vue Blueprint documentation](https://vue-blueprint.schwarz/guide/onyx-themes.html):

- Schwarz Digits
- Kaufland
- Lidl
- PreZero
- Schwarz group and Schwarz corporate solutions

If you have any other questions or need support, please get in touch with the [team](/about/team).

:::

## Themes

To use a different theme, add the corresponding imports to your `main.ts` file (example a theme called "my-theme"):

::: code-group

```ts [main.ts]
// import "sit-onyx/styles.css";
// make sure to import the theme AFTER the general "sit-onyx/styles.css" file!
import "./my-theme.css";
```

:::

or if you are using Nuxt, then import them in your `nuxt.config.ts`:

::: code-group

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  css: ["~/assets/css/my-theme.css"],
});
```

:::

## Dark mode

Per default, onyx will be displayed in light mode. In order to use the dark mode, simply set the class `dark` once on the root of your application, e.g. on `<html>` or `<body>`.

### Let the user decide

In order to let the user switch between light, dark and auto mode, we recommend to use the pre-built [OnyxColorSchemeMenuItem](https://storybook.onyx.schwarz/?path=/docs/navigation-navbar-modules-colorschemedialog--docs) component inside the [nav bar](https://storybook.onyx.schwarz/?path=/story/navigation-navbar--with-context-area) together with the [@vueuse/core](https://vueuse.org/core/useColorMode) library.

Additionally, to enable a smooth transition when switching between color modes, you can use the `useThemeTransition` composable. This ensures a visually appealing effect during theme changes.
Below is an example implementation:

```vue
<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { OnyxNavBar, OnyxUserMenu, OnyxColorSchemeMenuItem } from "sit-onyx";
import { ref } from "vue";

const { store: colorScheme } = useColorMode({ disableTransition: false });
useThemeTransition(colorScheme);
</script>

<template>
  <OnyxNavBar app-name="Example app">
    <template #contextArea>
      <OnyxUserMenu full-name="John Doe">
        <OnyxColorSchemeMenuItem v-model="colorScheme" />
      </OnyxUserMenu>
    </template>
  </OnyxNavBar>
</template>
```

Alternatively, you can use the [OnyxColorSchemeDialog](https://storybook.onyx.schwarz/?path=/docs/support-colorschemedialog--docs) component to build your own custom component.
