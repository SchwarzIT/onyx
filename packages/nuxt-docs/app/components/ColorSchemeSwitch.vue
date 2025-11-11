<script lang="ts" setup>
import { iconCircleContrast } from "@sit-onyx/icons";
import type { ColorSchemeValue } from "sit-onyx";

const props = withDefaults(
  defineProps<{
    type?: "button" | "globalSearch";
  }>(),
  {
    type: "button",
  },
);

const { t } = useI18n();
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

const label = computed(() => t("onyx.colorScheme.headline"));
</script>

<template>
  <OnyxIconButton
    v-if="props.type === 'button'"
    :label
    :icon="iconCircleContrast"
    color="neutral"
    @click="isColorSchemeDialogOpen = true"
  />
  <OnyxUnstableGlobalSearchOption
    v-else
    :label
    value="appearance"
    :icon="iconCircleContrast"
    @click="isColorSchemeDialogOpen = true"
  />

  <OnyxColorSchemeDialog v-model="colorScheme" v-model:open="isColorSchemeDialogOpen" />
</template>
