<script lang="ts" setup>
import { computed, ref, useTemplateRef, watch } from "vue";
import { useResizeObserver } from "../../../../composables/useResizeObserver";
import type { GridElementConfig } from "../EditGridElementDialog/EditGridElementDialog.vue";

const props = defineProps<
  GridElementConfig & {
    /**
     * Rendered label of the grid element.
     */
    label: string;
    /**
     * If the element should be rendered in the outline or default variant.
     */
    mode?: "default" | "outline";
  }
>();

defineSlots<{
  default?(props: {
    /**
     * Number of grid columns the element is currently spanning.
     */
    gridSpan: number;
  }): unknown;
}>();

const gridClasses = computed(() => {
  return [
    `onyx-grid-span-${props.columnCount}`,
    ...Object.entries(props.breakpoints ?? {}).map(([breakpoint, columns]) => {
      return `onyx-grid-${breakpoint}-span-${columns}`;
    }),
  ];
});

const button = useTemplateRef("buttonRef");
const gridSpan = ref(1);
const size = useResizeObserver(button);

watch(size.width, () => {
  if (!button.value) return;
  gridSpan.value = Number.parseInt(
    getComputedStyle(button.value).gridColumnEnd.replace("span", "").trim(),
  );
});
</script>

<template>
  <button
    ref="buttonRef"
    class="grid-element"
    :class="[...gridClasses, props.mode === 'outline' ? 'grid-element--outline' : '']"
    type="button"
    :aria-label="props.label"
    :title="props.label"
  >
    <slot :grid-span="gridSpan"></slot>
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
    background-color: var(--onyx-color-base-primary-100);
    color: var(--onyx-color-text-icons-primary-intense);
  }

  &:hover {
    border-color: var(--onyx-color-component-border-primary-hover);
  }

  &:focus-visible {
    border-color: var(--onyx-color-component-primary);
    outline: var(--onyx-outline-width) solid var(--onyx-color-component-focus-primary);
  }

  &:active {
    background-color: var(--onyx-color-base-neutral-200);
  }

  &--outline {
    background-color: transparent;
    border-color: var(--onyx-color-component-border-neutral);

    &:active {
      background-color: transparent;
    }
  }
}
</style>
