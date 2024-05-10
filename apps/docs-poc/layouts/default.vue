<script lang="ts" setup>
import { OnyxPageLayout } from "sit-onyx";
</script>

<template>
  <OnyxPageLayout>
    <div class="page">
      <slot></slot>
    </div>

    <template #sidebar>
      <slot name="sidebar"></slot>
    </template>
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
.page {
  padding: var(--onyx-grid-margin);
}
</style>
