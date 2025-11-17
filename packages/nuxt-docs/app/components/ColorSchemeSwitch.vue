<script lang="ts" setup>
import { iconCircleContrast } from "@sit-onyx/icons";
import type { ColorSchemeValue } from "sit-onyx";

defineSlots<{
  /**
   * Optional slot to override the trigger slot.
   */
  default?(props: { trigger: typeof trigger }): unknown;
}>();

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

const trigger = {
  onClick: () => (isColorSchemeDialogOpen.value = true),
};
</script>

<template>
  <slot :trigger>
    <OnyxIconButton
      :label="$t('onyx.colorScheme.headline')"
      :icon="iconCircleContrast"
      color="neutral"
      v-bind="trigger"
    />
  </slot>

  <OnyxColorSchemeDialog v-model="colorScheme" v-model:open="isColorSchemeDialogOpen" />
</template>
