# Theming

Onyx supports a dark and a light theme. The options how to set up the theme for your application are described in this article.
To learn more about the theming concept of onyx, take a look at our [colors documentation](/basics/colors.html)

## Set the theme once

Per default, onyx will be displayed in light mode after the [initial setup](/development/). In order to use dark mode, simply set the class "dark" once on a high level of your application, e.g. on the `html` or `body` tag or on `App.vue` level.

## Let the user decide

In order to let the user switch between light/dark mode, we recommend to use the [useDark composable from vueuse](https://vueuse.org/core/useDark/#usedark).

<!-- TODO: recommend to use theme selection inside the user menu once that feature is supported -->

You can combine it as follows with a switch to let the users set the theme of their choice. The switch will be initialized with the system settings.

```vue
<script lang="ts" setup>
import { useDark, useToggle } from "@vueuse/core";
import { OnyxSwitch } from "sit-onyx";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <OnyxSwitch label="Dark Mode" :model-value="isDark" @update:model-value="toggleDark" />
</template>
```
