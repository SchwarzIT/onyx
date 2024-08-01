<script lang="ts" setup>
import type { GridElementData } from "./EditGridElementDialog.vue";
import EditGridElementDialog from "./EditGridElementDialog.vue";

const props = defineProps<GridElementData>();

const emit = defineEmits<{
  click: [];
  edit: [data: GridElementData];
  delete: [];
}>();
</script>

<template>
  <div :class="`onyx-grid-span-${props.columnCount}`">
    <button class="grid-element" type="button" @click="emit('click')">
      <slot></slot>
    </button>

    <EditGridElementDialog label="Edit grid element" />
  </div>
</template>

<style lang="scss" scoped>
.grid-element {
  border-radius: var(--onyx-radius-md);
  background-color: var(--onyx-color-base-neutral-200);
  height: 8rem;
  width: 100%;
  border: var(--onyx-1px-in-rem) solid transparent;
  font: inherit;
  color: inherit;
  cursor: pointer;
  padding: 0;

  &:hover,
  &:focus-visible {
    border-color: var(--onyx-color-base-primary-300);
    background-color: var(--onyx-color-base-primary-100);
    color: var(--onyx-color-text-icons-primary-intense);
  }
}
</style>
