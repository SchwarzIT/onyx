<script lang="ts" setup>
defineSlots<{
  /**
   * Main page content.
   */
  default(): unknown;
}>();
</script>

<template>
  <OnyxPageLayout>
    <slot></slot>
  </OnyxPageLayout>
</template>
