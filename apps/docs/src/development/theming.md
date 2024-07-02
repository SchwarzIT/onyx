# Theming

Onyx supports a dark and a light theme. The options how to set up the theme for your application are described in this article.
To learn more about the theming concept of onyx, take a look at our [colors documentation](/basics/colors.html)

## Set the theme once

Per default, onyx will be displayed in light mode after the [initial setup](/development/). In order to use dark mode, simply set the class `dark` once on the root of your application, e.g. on `<html>` or `<body>`.

## Let the user decide

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
