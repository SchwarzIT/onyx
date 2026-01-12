<script lang="ts" setup>
import * as ALL_ICONS from "@sit-onyx/icons";
import { getIconImportName } from "@sit-onyx/icons/utils";

const props = defineProps<{
  /**
   * Icon name that should be resolved.
   */
  name: string;
}>();

const icon = ref<string>();

watch(
  () => props.name,
  (iconName) => {
    icon.value = ALL_ICONS[getIconImportName(iconName) as keyof typeof ALL_ICONS];

    if (import.meta.dev && !icon.value) {
      // eslint-disable-next-line no-console -- used only during development environment
      console.warn(`Dynamic icon with name "${iconName}" not found.`);
    }
  },
  { immediate: true },
);
</script>

<!-- eslint-disable-next-line vue/no-root-v-if -->
<template>
  <OnyxIcon v-if="icon" :icon />
</template>
