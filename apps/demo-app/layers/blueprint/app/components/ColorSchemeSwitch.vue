<script lang="ts" setup>
import { iconCircleContrast } from "@sit-onyx/icons";
import { useThemeTransition, type ColorSchemeValue } from "sit-onyx";

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

useThemeTransition(colorScheme);
</script>

<template>
  <OnyxUnstableNavButton
    :label="$t('blueprint.changeColorScheme')"
    :icon="iconCircleContrast"
    hide-label
    @click="isColorSchemeDialogOpen = true"
  />

  <OnyxColorSchemeDialog v-model="colorScheme" v-model:open="isColorSchemeDialogOpen" />
</template>
