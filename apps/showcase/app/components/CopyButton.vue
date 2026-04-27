<script lang="ts" setup>
import { iconCheckSmall, iconCopy } from "@sit-onyx/icons";
import { useClipboard } from "@vueuse/core";

const props = defineProps<{
  /**
   * Value to copy.
   */
  value: string;
}>();

const { copy, copied } = useClipboard({ source: toRef(props, "value") });
</script>

<template>
  <OnyxIcon v-if="copied" :icon="iconCheckSmall" color="success" />
  <OnyxSystemButton v-else :label="$t('copyToClipboard')" :icon="iconCopy" @click="copy()" />
</template>
