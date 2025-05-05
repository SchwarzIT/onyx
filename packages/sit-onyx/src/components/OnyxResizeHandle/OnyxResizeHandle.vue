<script setup lang="ts">
const emit = defineEmits<{
  /**
   * Emitted when the resizing should be started.
   */
  resize: [event: MouseEvent];
  /**
   * Emitted when the size should be set automatically (by double clicking).
   */
  autoSize: [event: MouseEvent];
}>();
</script>

<template>
  <button
    tabindex="-1"
    type="button"
    aria-hidden="true"
    class="onyx-component onyx-resize-handle"
    @dblclick="emit('autoSize', $event)"
    @mousedown="emit('resize', $event)"
  ></button>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-resize-handle {
  @include layers.component() {
    --onyx-resize-handle-width: 1rem;
    --onyx-resize-handle-border-width: var(--onyx-1px-in-rem);
    --onyx-resize-handle--active-indicator-height: 0;
    all: unset;
    position: absolute;
    top: 0;
    right: calc(-0.5 * var(--onyx-resize-handle-width));
    width: var(--onyx-resize-handle-width);
    height: 100%;
    z-index: 1;
    cursor: col-resize;

    &::after {
      content: "";
      height: 100%;
      width: var(--onyx-resize-handle-border-width);
      position: absolute;
      top: 0;
      left: calc(50% - 0.5 * var(--onyx-resize-handle-border-width));
      opacity: 0;
      background-color: var(--onyx-color-base-neutral-600);
    }

    &:active::before {
      content: "";
      height: calc(var(--onyx-resize-handle--active-indicator-height) - 100%);
      width: var(--onyx-resize-handle-border-width);
      position: absolute;
      top: 100%;
      left: calc(50% - 0.5 * var(--onyx-resize-handle-border-width));
      background-color: var(--onyx-color-base-neutral-600);
    }

    &:hover::after,
    &:active::after {
      opacity: 0.5;
      background-color: var(--onyx-color-base-primary-500);
    }

    th:hover &::after {
      opacity: 0.3;
    }
  }
}
</style>

<!-- <style lang="scss">
@use "../../styles/mixins/layers.scss";

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
</style> -->
