<script setup lang="ts">
const props = defineProps<{
  /**
   * label of the column
   */
  label: string;
}>();

const slots = defineSlots<{
  actions?(): unknown;
  /**
   * Elements to remove aktive Actions like Filters etc.
   */
  removeActions?(): unknown;
}>();
</script>

<template>
  <div class="onyx-component onyx-data-grid-header-cell">
    <span class="onyx-data-grid-header-cell__label">{{ props.label }}</span>
    <div v-if="slots.removeActions" class="onyx-data-grid-header-cell__remove-actions">
      <slot name="removeActions"></slot>
    </div>
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
  .onyx-system-button--multiple-actions + .onyx-flyout-menu__list {
    .onyx-filter-search {
      border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
    }
  }
}
</style>
