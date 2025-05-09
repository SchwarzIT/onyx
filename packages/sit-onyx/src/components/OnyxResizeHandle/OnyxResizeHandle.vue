<script setup lang="ts">
import { ref } from "vue";
import { getTemplateRefElement } from "../../composables/useResizeObserver";
import { injectI18n } from "../../i18n";
import type { OnyxResizeHandleProps } from "./types";

const props = withDefaults(defineProps<OnyxResizeHandleProps>(), {
  min: 1,
});

const emit = defineEmits<{
  /**
   * Emitted when the width should be updated while resizing.
   * Note: You must take care of actually applied the desired CSS to apply the width.
   */
  updateWidth: [width: number];
  /**
   * Emitted when the size should be set automatically (by double clicking).
   */
  autoSize: [];
  /**
   * Emitted when the resizing has been initialized (by putting the mouse down on the resize handle).
   */
  init: [];
}>();

const { t } = injectI18n();

const previousWidth = ref<number>();
const currentElement = ref<Element>();
let abortController: AbortController | undefined;

const handleResize = (event: MouseEvent) => {
  currentElement.value = getTemplateRefElement(
    typeof props.element === "function" ? props.element(event) : props.element,
  );

  if (!currentElement.value) return;

  emit("init");
  previousWidth.value = currentElement.value.getBoundingClientRect().width;

  abortController = new AbortController();
  const options = { signal: abortController.signal, passive: true };
  window.addEventListener("mousemove", onMouseMove, options);
  window.addEventListener("mouseup", abort, options);
  window.addEventListener("keydown", onKeydown, options);
};

const onMouseMove = (event: MouseEvent) => {
  if (!currentElement.value) return;

  // calculate the desired width
  const newWidth = Math.max(
    props.min,
    event.clientX - currentElement.value.getBoundingClientRect().left,
  );
  emit("updateWidth", newWidth);
};

/**
 * Cleans up event listeners etc.
 */
const abort = () => {
  abortController?.abort();
  previousWidth.value = undefined;
  currentElement.value = undefined;
};

/**
 * Resets the width to the previous width (before resizing) if "Escape" key is pressed.
 */
const onKeydown = (event: KeyboardEvent) => {
  if (event.key !== "Escape") return;
  if (previousWidth.value) emit("updateWidth", previousWidth.value);
  abort();
};
</script>

<template>
  <button
    tabindex="-1"
    type="button"
    role="presentation"
    class="onyx-component onyx-resize-handle"
    :aria-label="t('resizeHandle.label')"
    @mousedown="handleResize"
    @dblclick="emit('autoSize')"
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
  }
}
</style>
