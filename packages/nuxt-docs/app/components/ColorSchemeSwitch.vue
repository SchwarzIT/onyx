<script lang="ts" setup>
import { iconCircleContrast } from "@sit-onyx/icons";
import type { ColorSchemeValue } from "sit-onyx";

const props = withDefaults(
  defineProps<{
    type?: "button" | "menuItem";
  }>(),
  {
    type: "button",
  },
);

const colorMode = useColorMode();
const isColorSchemeDialogOpen = ref(false);

const colorScheme = computed({
  get: () => {
    return colorMode.preference === "system" ? "auto" : (colorMode.preference as ColorSchemeValue);
  },
  set: (newValue) => {
    colorMode.preference = newValue === "auto" ? "system" : newValue;
  },
});
</script>

<template>
  <OnyxColorSchemeMenuItem v-if="props.type === 'menuItem'" v-model="colorScheme" />

  <template v-else>
    <OnyxIconButton
      label="Toggle color scheme"
      :icon="iconCircleContrast"
      color="neutral"
      @click="isColorSchemeDialogOpen = true"
    />

    <OnyxColorSchemeDialog v-model="colorScheme" v-model:open="isColorSchemeDialogOpen" />
  </template>
</template>
