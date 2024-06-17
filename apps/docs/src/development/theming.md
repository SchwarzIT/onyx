# Theming

Onyx supports a dark and a light theme. The options how to set up the theme for your application are described in this article.
To learn more about the theming concept of onyx, take a look at our [colors documentation](/basics/colors.html)

## Set the theme once

Per default, onyx will be displayed in light mode after the [initial setup](/development/). In order to use dark mode, simply set the class `dark` once on the root of your application, e.g. on `<html>` or `<body>`.

## Let the user decide

In order to let the user switch between light, dark and auto mode, we recommend to use the [OnyxColorSchemeDialog](https://storybook.onyx.schwarz/?path=/docs/support-colorschemedialog--docs) component inside the [nav bar](https://storybook.onyx.schwarz/?path=/story/components-navbar--with-context-area) together with the [@vueuse/core](https://vueuse.org/core/useColorMode) library:

```vue
<script setup lang="ts">
import circleContrast from "@sit-onyx/icons/circle-contrast.svg?raw";
import { useColorMode } from "@vueuse/core";
import { OnyxColorSchemeDialog, OnyxNavBar, OnyxUserMenu, type SelectOption } from "sit-onyx";
import { ref } from "vue";

const userMenuOptions = [
  { value: "color-scheme", label: "Appearance", icon: circleContrast },
  // your option user enu options...
] as const satisfies SelectOption[];

const { store: colorScheme } = useColorMode();
const isColorSchemeDialogOpen = ref(false);

const handleOptionClick = (value: (typeof userMenuOptions)[number]["value"]) => {
  if (value === "color-scheme") {
    isColorSchemeDialogOpen.value = true;
  }
};
</script>

<template>
  <OnyxNavBar app-name="Example app">
    <template #contextArea>
      <OnyxUserMenu
        username="John Doe"
        :options="userMenuOptions"
        @option-click="handleOptionClick"
      />
    </template>
  </OnyxNavBar>

  <OnyxColorSchemeDialog
    v-model="colorScheme"
    :open="isColorSchemeDialogOpen"
    @close="isColorSchemeDialogOpen = false"
  />
</template>
```
