<script lang="ts" setup>
import * as ALL_ICONS from "@sit-onyx/icons";
import { getIconImportName } from "@sit-onyx/icons/utils";

const props = defineProps<{
  /**
   * Icon name that should be resolved.
   */
  name: string;
}>();

const icon = ref<string | undefined>();

watch(
  () => props.name,
  (iconName) => {
    const resolvedIcon: string | undefined =
      ALL_ICONS[getIconImportName(iconName) as keyof typeof ALL_ICONS];
    icon.value = resolvedIcon;

    if (import.meta.dev) {
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
