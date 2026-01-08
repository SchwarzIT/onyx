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
  },
  { immediate: true },
);
</script>

<!-- eslint-disable-next-line vue/no-root-v-if -->
<template>
  <OnyxIcon v-if="icon" :icon />
</template>
