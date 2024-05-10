<script lang="ts" setup>
import { OnyxPageLayout } from "sit-onyx";

const slots = defineSlots<{
  default: () => unknown;
  sidebar?: () => unknown;
}>();
</script>

<template>
  <OnyxPageLayout>
    <div class="page">
      <slot></slot>
    </div>

    <template
      v-if="slots.sidebar"
      #sidebar
    >
      <slot name="sidebar"></slot>
    </template>
  </OnyxPageLayout>
</template>

<style lang="scss" scoped>
.page {
  padding: var(--onyx-grid-margin);
  max-width: var(--onyx-grid-max-width);
  margin: 0 auto;
  box-sizing: content-box;
}

:deep(.onyx-page__sidebar) {
  padding: var(--onyx-spacing-md);
  border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
  min-width: 16rem;
  max-width: 24rem;
}
</style>
