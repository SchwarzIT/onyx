<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { getTemplateRefElement } from "../../composables/useResizeObserver.js";
import { injectI18n } from "../../i18n/index.js";
import OnyxVisuallyHidden from "../OnyxVisuallyHidden/OnyxVisuallyHidden.vue";
import type { OnyxResizeHandleProps } from "./types.js";

const props = withDefaults(defineProps<OnyxResizeHandleProps>(), {
  min: 1,
  alignment: "right",
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
   * Emitted when the resizing has started (onMousedown).
   */
  start: [];
  /**
   * Emitted when the resizing has ended (onMouseup).
   */
  end: [];
}>();

const { t } = injectI18n();

const previousWidth = ref<number>();
const currentElement = computed(() => getTemplateRefElement(props.element));
let abortController: AbortController | undefined;

const isActive = ref(false);

const handleMousedown = () => {
  if (!currentElement.value) return;

  previousWidth.value = currentElement.value.getBoundingClientRect().width;
  isActive.value = true;

  abortController = new AbortController();
  const options: AddEventListenerOptions = { signal: abortController.signal, passive: true };
  window.addEventListener("mousemove", onMouseMove, options);
  window.addEventListener("mouseup", abort, options);
  window.addEventListener("keydown", onKeydown, options);

  emit("start");
};

onMounted(() => {
  watch(
    () => props.active,
    (newActive) => {
      if (newActive == undefined) return;
      if (newActive && !isActive.value) handleMousedown();
      else if (!newActive && isActive.value) abort();
    },
    { immediate: true },
  );
});

const handleDoubleClick = () => {
  emit("autoSize");
};

const onMouseMove = (event: MouseEvent) => {
  if (!currentElement.value || !isActive.value) return;
  const boundingRect = currentElement.value.getBoundingClientRect();
  let width: number;
  if (props.alignment === "right") {
    width = event.clientX - boundingRect.left;
  } else {
    width = boundingRect.right - event.clientX;
  }
  emit("updateWidth", Math.max(props.min, width));
};

const abort = () => {
  abortController?.abort();
  previousWidth.value = undefined;
  isActive.value = false;
  emit("end");
};

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
    :class="[
      'onyx-component',
      'onyx-resize-handle',
      isActive ? 'onyx-resize-handle--active' : '',
      props.alignment === 'left' ? 'onyx-resize-handle--left' : '',
    ]"
    @mousedown="handleMousedown"
    @dblclick="handleDoubleClick"
  >
    <OnyxVisuallyHidden>{{ t("resizeHandle.label") }}</OnyxVisuallyHidden>
  </button>
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

    &--left {
      left: calc(-0.5 * var(--onyx-resize-handle-width));
      right: unset;
    }

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

    &--active::before {
      content: "";
      height: calc(var(--onyx-resize-handle--active-indicator-height) - 100%);
      width: var(--onyx-resize-handle-border-width);
      position: absolute;
      top: 100%;
      left: calc(50% - 0.5 * var(--onyx-resize-handle-border-width));
      background-color: var(--onyx-color-base-neutral-600);
    }

    &:hover,
    &--active {
      &::after {
        opacity: 0.5;
        background-color: var(--onyx-color-base-primary-500);
      }
    }
  }
}
</style>
