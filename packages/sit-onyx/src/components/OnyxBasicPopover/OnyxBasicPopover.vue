<script setup lang="ts">
import { useGlobalEventListener } from "@sit-onyx/headless";
import {
  computed,
  nextTick,
  onMounted,
  ref,
  useId,
  useTemplateRef,
  watch,
  type AriaAttributes,
} from "vue";
import { useAnchorPositionPolyfill } from "../../composables/useAnchorPositionPolyfill.js";
import { useOpenAlignment } from "../../composables/useOpenAlignment.js";
import { useOpenDirection } from "../../composables/useOpenDirection.js";
import { useResizeObserver } from "../../composables/useResizeObserver.js";
import type { OnyxBasicPopoverProps } from "./types.js";

const props = withDefaults(defineProps<OnyxBasicPopoverProps>(), {
  position: "auto",
  alignment: "auto",
  role: "dialog",
  clipping: false,
});

defineSlots<{
  /**
   * The always visible parent to which the popover is aligned.
   * `trigger` can optionally set to a button to explicitly connect the the button and popover.
   */
  default(params: { trigger: AriaAttributes }): unknown;
  /**
   * Content shown in the popover when it is expanded.
   */
  content(): unknown;
}>();

const emit = defineEmits<{
  "update:open": [value: boolean];
}>();

const _isVisible = ref(false);
const isVisible = computed({
  set: (newVal) => (_isVisible.value = newVal),
  get: () => (typeof props.open === "boolean" && !props.disabled ? props.open : _isVisible.value),
});

const popoverPosition = computed(() =>
  props.position === "auto" ? openDirection.value : props.position,
);
const popoverAlignment = computed(() =>
  props.alignment === "auto" ? openAlignment.value : props.alignment,
);

defineExpose({
  /**
   * Actual used popover position.
   */
  popoverPosition,
  /**
   * Actual used popover alignment.
   */
  popoverAlignment,
});

const disabled = computed(() => props.disabled);

const positionAndAlignment = computed(() => {
  if (popoverPosition.value === "top" || popoverPosition.value === "bottom") {
    if (popoverAlignment.value === "left") {
      return popoverPosition.value + " " + "span-right";
    }
    if (popoverAlignment.value === "right") {
      return popoverPosition.value + " " + "span-left";
    }
  }
  return popoverPosition.value;
});

const popoverRef = useTemplateRef("popover");
const popoverWrapperRef = useTemplateRef("popoverWrapper");
const { openDirection, updateOpenDirection } = useOpenDirection(popoverWrapperRef, "bottom");

const { openAlignment, updateOpenAlignment } = useOpenAlignment(
  popoverWrapperRef,
  popoverRef,
  "left",
);
const { leftPosition, topPosition, updateAnchorPositionPolyfill, useragentSupportsAnchorApi } =
  useAnchorPositionPolyfill({
    positionedRef: popoverRef,
    targetRef: popoverWrapperRef,
    positionArea: popoverPosition,
    alignment: popoverAlignment,
    alignsWithEdge: true,
    fitParent: false,
    offset: 8,
  });

const { width } = useResizeObserver(popoverWrapperRef);

const handleOpening = (open: boolean) => {
  if (open) {
    popoverRef.value?.showPopover?.();
  } else {
    popoverRef.value?.hidePopover?.();
  }
};
const updateDirections = () => {
  updateOpenDirection();
  updateOpenAlignment();
};

const clippingStyles = ref("");
const scrolledOut = ref<null | "top" | "bottom">(null);
const isClipping = ref(false);
const checkVisibilityOnScroll = () => {
  const MIN_DISTANCE_TO_BORDER = 16;
  const MARGIN = 8;

  if (!popoverRef.value || !popoverWrapperRef.value || !isVisible.value) return;

  if (isClipping.value) {
    const popoverRect = popoverRef.value.getBoundingClientRect();
    const wrapperRect = popoverWrapperRef.value.getBoundingClientRect();
    const requiredHeight = popoverRect.height + MIN_DISTANCE_TO_BORDER + MARGIN;

    if (
      popoverPosition.value === "top" ||
      popoverPosition.value === "top left" ||
      popoverPosition.value === "top right"
    ) {
      if (scrolledOut.value === "top" && wrapperRect.top > requiredHeight) {
        isClipping.value = false;
        return;
      }
      if (scrolledOut.value === "bottom" && wrapperRect.top + MARGIN < window.innerHeight) {
        isClipping.value = false;
        return;
      }
    } else if (
      popoverPosition.value === "bottom" ||
      popoverPosition.value === "bottom left" ||
      popoverPosition.value === "bottom right"
    ) {
      if (scrolledOut.value === "top" && wrapperRect.bottom > MARGIN) {
        isClipping.value = false;
        return;
      }
      if (
        scrolledOut.value === "bottom" &&
        window.innerHeight - wrapperRect.bottom > requiredHeight
      ) {
        isClipping.value = false;
        return;
      }
    }
  } else {
    const rect = popoverRef.value.getBoundingClientRect();
    const isTooHigh = rect.top < MIN_DISTANCE_TO_BORDER;
    const isTooLow = rect.bottom > window.innerHeight - MIN_DISTANCE_TO_BORDER;

    if (isTooHigh || isTooLow) {
      isClipping.value = true;
      if (isTooHigh) {
        scrolledOut.value = "top";
        clippingStyles.value = `left: ${rect.left}px; top: 1rem;`;
      } else if (isTooLow) {
        scrolledOut.value = "bottom";
        clippingStyles.value = `left: ${rect.left}px; bottom: 1rem;`;
      }
    }
  }
};
const disableClipping = computed(() => {
  return !props.clipping || !isVisible.value;
});

useGlobalEventListener({
  type: "resize",
  listener: () => updateDirections(),
});
useGlobalEventListener({
  type: "scroll",
  listener: () => checkVisibilityOnScroll(),
  disabled: disableClipping,
});

onMounted(() => {
  handleOpening(isVisible.value);
  updateDirections();
  if (!useragentSupportsAnchorApi.value) updateAnchorPositionPolyfill();
  if (!disableClipping.value) checkVisibilityOnScroll();
});

watch(isVisible, async (newVal) => {
  await nextTick();
  handleOpening(newVal);
  updateDirections();
  if (!useragentSupportsAnchorApi.value) updateAnchorPositionPolyfill();
});

const toggle = () => {
  _isVisible.value = !_isVisible.value;
  emit("update:open", !isVisible.value);
};

const trigger = computed(() => ({
  onClick: toggle,
  "aria-expanded": isVisible.value,
  "aria-controls": popoverRef.value?.id,
  "aria-haspopup": true,
  disabled: disabled.value,
}));

const id = useId();
const anchorName = computed(() => `--anchor-${id}`);

const popoverClasses = computed(() => {
  return {
    [`onyx-basic-popover__dialog--position-${popoverPosition.value.replace(" ", "-")}`]: true,
    [`onyx-basic-popover__dialog--alignment-${popoverAlignment.value}`]: true,
    "onyx-basic-popover__dialog--fitparent": props.fitParent,
    "onyx-basic-popover__dialog--disabled": disabled.value,
    "onyx-basic-popover__dialog--clipping": isClipping.value,
    "onyx-basic-popover__dialog--dont-support-anchor": !useragentSupportsAnchorApi.value,
  };
});
watch(disabled, () => {
  if (disabled.value) {
    _isVisible.value = false;
  }
});
watch([popoverPosition, popoverAlignment, width], async () => {
  if (!useragentSupportsAnchorApi.value) {
    await nextTick();
    updateDirections();
    updateAnchorPositionPolyfill();
  }
});

const popoverStyles = computed(() => {
  const _width = props.fitParent ? `${width.value}px` : undefined;

  if (useragentSupportsAnchorApi.value) {
    return {
      width: _width,
      "position-anchor": anchorName.value,
      "position-area": positionAndAlignment.value,
    };
  }

  // fallback styles if browser does not support the Anchor API yet
  return {
    width: _width,
    left: leftPosition.value,
    top: topPosition.value,
  };
});
</script>

<template>
  <div
    ref="popoverWrapper"
    class="onyx-component onyx-basic-popover"
    :style="`anchor-name: ${anchorName}`"
  >
    <slot :trigger="trigger"></slot>
    <!-- we are using inline "style" here since using v-bind causes hydration errors in Nuxt / SSR -->
    <div
      ref="popover"
      :role="props.role"
      :aria-label="props.label"
      popover="manual"
      class="onyx-basic-popover__dialog"
      :class="popoverClasses"
      :style="!isClipping ? popoverStyles : clippingStyles"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-basic-popover {
  --onyx-basic-popover-min-width: var(--onyx-spacing-4xl);
  --onyx-basic-popover-max-width: 20rem;

  @include layers.component() {
    --onyx-basic-popover-gap: var(--onyx-spacing-2xs);
    display: inline-flex;
    position: relative;

    &__dialog {
      position: fixed;
      border-radius: var(--onyx-radius-md);
      border: none;
      outline: none;
      box-shadow: var(--onyx-shadow-medium-bottom);

      background-color: var(--onyx-color-base-background-blank);
      padding: 0;
      box-sizing: border-box;

      min-width: var(--onyx-basic-popover-min-width);
      max-width: var(--onyx-basic-popover-max-width);
      max-height: 100%;
      width: max-content;
      font-family: var(--onyx-font-family);

      &:popover-open {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      &--position-right {
        margin-left: var(--onyx-basic-popover-gap);
      }
      &--position-left {
        margin-right: var(--onyx-basic-popover-gap);
      }
      &--position-bottom {
        margin-top: var(--onyx-basic-popover-gap);
      }
      &--position-bottom-right {
        margin-top: var(--onyx-basic-popover-gap);
        margin-left: var(--onyx-basic-popover-gap);
      }
      &--position-bottom-left {
        margin-top: var(--onyx-basic-popover-gap);
        margin-right: var(--onyx-basic-popover-gap);
      }
      &--position-top {
        margin-bottom: var(--onyx-basic-popover-gap);
      }
      &--position-top-right {
        margin-bottom: var(--onyx-basic-popover-gap);
        margin-left: var(--onyx-basic-popover-gap);
      }
      &--position-top-left {
        margin-bottom: var(--onyx-basic-popover-gap);
        margin-right: var(--onyx-basic-popover-gap);
      }
      &--fitparent {
        min-width: inherit;
        max-width: inherit;
      }
      &--dont-support-anchor {
        margin: 0;
      }
      &--clipping {
        margin: 0;
        top: auto;
        bottom: auto;
      }
    }
  }
}
.dark .onyx-basic-popover__dialog {
  @include layers.component() {
    outline: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  }
}
</style>
