<script setup lang="ts">
defineOptions({ inheritAttrs: false });

const props = defineProps<{
  /**
   *
   */
  beingResized: boolean;
}>();

const emit = defineEmits<{
  startResize: [event: MouseEvent];
  autoSize: [event: MouseEvent];
}>();

defineSlots<{
  /**
   *
   */
  default(): unknown;
}>();
</script>

<template>
  <button
    tabindex="-1"
    type="button"
    :class="{
      'onyx-component': true,
      'onyx-data-grid-resize-handle': true,
      'onyx-data-grid-resize-handle--being-resized': props.beingResized,
    }"
    @dblclick="emit('autoSize', $event)"
    @mousedown="emit('startResize', $event)"
  ></button>
  <slot></slot>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers.scss";

@include layers.component {
  .onyx-data-grid-resize-handle {
    all: unset;
    position: absolute;
    top: 0;
    right: -0.5rem;
    width: 1rem;
    height: 100%;
    z-index: 1;
    cursor: col-resize;

    &--being-resized::before {
      content: "";
      position: absolute;

      left: calc(50% - var(--onyx-1px-in-rem) * 0.5);
      top: 100%;
      height: calc(var(--onyx-table-observed-height) - 100%);
      width: var(--onyx-1px-in-rem);
      background-color: var(--onyx-color-base-neutral-600);
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: calc(50% - 0.125rem * 0.5);

      opacity: 0;
      background: var(--onyx-color-base-neutral-600);
      height: 100%;
      width: 0.125rem;
    }

    &:hover::after,
    &--being-resized::after {
      opacity: 0.5;
      background: var(--onyx-color-base-primary-500);
    }

    th:hover &::after {
      opacity: 0.3;
    }
  }
}
</style>
