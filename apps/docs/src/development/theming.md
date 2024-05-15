# Theming

Onyx supports a dark and a light theme.  
To learn more about the theming concept of onyx, take a look at our [colors documentation](/basics/colors.html)

In order to let the user choose the preferred theme, we recommend [useDark of vueuse](https://vueuse.org/core/useDark/#usedark).  
Combine it as follows with an onyx button to let the users set the theme of their choice:

```vue
<script lang="ts" setup>
import { useDark, useToggle } from "@vueuse/core";
import { OnyxButton } from "sit-onyx";

const toggleDark = useToggle(useDark());
</script>

<template>
  <OnyxButton label="Toggle Dark Mode" @click="toggleDark" />
</template>
```
