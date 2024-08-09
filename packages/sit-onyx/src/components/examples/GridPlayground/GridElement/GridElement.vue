<script lang="ts" setup>
import { computed } from "vue";
import type { GridElementConfig } from "../EditGridElementDialog/EditGridElementDialog.vue";

const props = defineProps<
  GridElementConfig & {
    label: string;
    mode?: "default" | "outline";
  }
>();

const emit = defineEmits<{
  click: [];
}>();

const gridClasses = computed(() => {
  return [
    `onyx-grid-span-${props.columnCount}`,
    ...Object.entries(props.breakpoints ?? {}).map(([breakpoint, columns]) => {
      return `onyx-grid-${breakpoint}-span-${columns}`;
    }),
  ];
});
</script>

<template>
  <button
    class="grid-element"
    :class="[...gridClasses, props.mode === 'outline' ? 'grid-element--outline' : '']"
    type="button"
    :aria-label="props.label"
    @click="emit('click')"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.grid-element {
  border-radius: var(--onyx-radius-md);
  background-color: var(--onyx-color-base-neutral-200);
  height: 8rem;
  width: 100%;
  border: var(--onyx-1px-in-rem) solid transparent;
  font: inherit;
  color: var(--onyx-color-text-icons-neutral-intense);
  cursor: pointer;
  padding: 0;

  &:hover,
  &:focus-visible {
    border-color: var(--onyx-color-base-primary-300);
    background-color: var(--onyx-color-base-primary-100);
    color: var(--onyx-color-text-icons-primary-intense);
  }

  &:focus-visible {
    outline: 0.25rem solid var(--onyx-color-base-primary-200);
  }

  &:active {
    background-color: var(--onyx-color-base-neutral-200);
  }

  &--outline {
    background-color: transparent;
    border-color: var(--onyx-color-base-neutral-300);

    &:active {
      background-color: transparent;
    }
  }
}
</style>
