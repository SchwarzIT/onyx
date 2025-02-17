<script setup lang="ts">
const props = defineProps<{
  /**
   * label of the column
   */
  label: string;
}>();

const slots = defineSlots<{
  actions?(): unknown;
}>();
</script>

<template>
  <div class="onyx-component onyx-data-grid-header-cell">
    <span class="onyx-data-grid-header-cell__label">{{ props.label }}</span>
    <div v-if="slots.actions" class="onyx-data-grid-header-cell__actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.onyx-data-grid-header-cell {
  display: flex;
  align-items: center;
  gap: var(--onyx-spacing-2xs);

  &__actions,
  &__remove-actions {
    display: inline-flex;
  }
}
</style>
