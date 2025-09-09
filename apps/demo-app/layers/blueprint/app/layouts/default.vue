<script lang="ts" setup>
import { type OnyxPageLayoutProps } from "sit-onyx";

const props = defineProps<OnyxPageLayoutProps>();

defineSlots<{
  /**
   * Page content.
   */
  default(): unknown;
}>();
</script>

<template>
  <OnyxPageLayout v-bind="props">
    <slot></slot>
  </OnyxPageLayout>
</template>
