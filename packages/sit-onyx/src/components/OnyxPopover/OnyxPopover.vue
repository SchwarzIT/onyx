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
import type { OnyxPopoverProps } from "./types.js";

const props = withDefaults(defineProps<OnyxPopoverProps>(), {
  position: "auto",
  alignment: "auto",
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
  let returnPosition = popoverPosition.value;
  if (popoverPosition.value === "top" || popoverPosition.value === "bottom") {
    if (popoverAlignment.value === "left") {
      returnPosition = popoverPosition.value + " " + "x-start";
    }
    if (popoverAlignment.value === "right") {
      returnPosition = popoverPosition.value + " " + "x-end";
    }
  }
  return returnPosition;
});

const popoverRef = useTemplateRef("popover");
const popoverWrapperRef = useTemplateRef("popoverWrapper");
const { openDirection, updateOpenDirection } = useOpenDirection(popoverWrapperRef, "bottom");

const { openAlignment, updateOpenAlignment } = useOpenAlignment(
  popoverWrapperRef,
  popoverRef,
  "left",
);
const {
  leftPosition,
  topPosition,
  updateAnchorPositionPolyfill,
  useragentSupportsAnchorApi: userAgentSupportsAnchorApi,
} = useAnchorPositionPolyfill({
  positionedRef: popoverRef,
  targetRef: popoverWrapperRef,
  positionArea: popoverPosition,
  alignment: popoverAlignment,
  alignsWithEdge: true,
  fitParent: false,
  offset: 8,
});

const { width } = useResizeObserver(popoverWrapperRef);

const popoverWidth = computed(() =>
  props.fitParent && popoverWrapperRef.value ? `${width.value}px` : "max-content",
);

const handleOpening = (open: boolean) => {
  if (open) {
    popoverRef.value?.showPopover();
  } else {
    popoverRef.value?.hidePopover();
  }
};
const updateDirections = () => {
  updateOpenDirection();
  updateOpenAlignment();
};

useGlobalEventListener({
  type: "resize",
  listener: () => updateDirections(),
});

onMounted(() => {
  handleOpening(isVisible.value);
  updateDirections();
  if (!userAgentSupportsAnchorApi.value) updateAnchorPositionPolyfill();
});

watch(isVisible, async (newVal) => {
  await nextTick();
  handleOpening(newVal);
  updateDirections();
  if (!userAgentSupportsAnchorApi.value) updateAnchorPositionPolyfill();
});

const toggle = () => {
  _isVisible.value = !_isVisible.value;
};

const trigger = computed(() => ({
  onClick: toggle,
  "aria-expanded": isVisible.value,
  "aria-controls": popoverRef.value?.id,
  disabled: disabled.value,
}));

const id = useId();
const anchorName = computed(() => `--anchor-${id}`);

const popoverClasses = computed(() => {
  return {
    [`onyx-popover__dialog--position-${popoverPosition.value.replace(" ", "-")}`]: true,
    [`onyx-popover__dialog--alignment-${popoverAlignment.value}`]: true,
    "onyx-popover__dialog--fitparent": props.fitParent,
    "onyx-popover__dialog--disabled": disabled.value,
    "onyx-popover__dialog--dont-support-anchor": !userAgentSupportsAnchorApi.value,
  };
});
watch(disabled, () => {
  if (disabled.value) {
    _isVisible.value = false;
  }
});
watch([popoverPosition, popoverAlignment, popoverWidth], async () => {
  if (!userAgentSupportsAnchorApi.value) {
    await nextTick();
    updateDirections();
    updateAnchorPositionPolyfill();
  }
});

const popoverStyles = computed(() => ({
  "position-anchor": anchorName.value,
  "position-area": positionAndAlignment.value,
  width: props.fitParent ? popoverWidth.value : undefined,
  left: !userAgentSupportsAnchorApi.value ? leftPosition.value : undefined,
  top: !userAgentSupportsAnchorApi.value ? topPosition.value : undefined,
}));
</script>

<template>
  <div
    ref="popoverWrapper"
    class="onyx-component onyx-popover"
    :style="`anchor-name: ${anchorName}`"
  >
    <slot :trigger="trigger"></slot>
    <!-- we are using inline "style" here since using v-bind causes hydration errors in Nuxt / SSR -->
    <div
      ref="popover"
      role="dialog"
      :aria-label="props.label"
      popover="manual"
      class="onyx-popover__dialog"
      :class="popoverClasses"
      :style="popoverStyles"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-popover {
  --onyx-popover-min-width: var(--onyx-spacing-4xl);
  --onyx-popover-max-width: 20rem;

  @include layers.component() {
    --onyx-popover-gap: var(--onyx-spacing-2xs);
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

      min-width: var(--onyx-popover-min-width);
      max-width: var(--onyx-popover-max-width);
      max-height: 100%;
      width: max-content;
      font-family: var(--onyx-font-family);

      &:popover-open {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      &--position-right {
        margin-left: var(--onyx-popover-gap);
      }
      &--position-left {
        margin-right: var(--onyx-popover-gap);
      }
      &--position-bottom {
        margin-top: var(--onyx-popover-gap);
      }
      &--position-bottom-right {
        margin-top: var(--onyx-popover-gap);
        margin-left: var(--onyx-popover-gap);
      }
      &--position-bottom-left {
        margin-top: var(--onyx-popover-gap);
        margin-right: var(--onyx-popover-gap);
      }
      &--position-top {
        margin-bottom: var(--onyx-popover-gap);
      }
      &--position-top-right {
        margin-bottom: var(--onyx-popover-gap);
        margin-left: var(--onyx-popover-gap);
      }
      &--position-top-left {
        margin-bottom: var(--onyx-popover-gap);
        margin-right: var(--onyx-popover-gap);
      }

      &--alignment-left {
        &.onyx-popover__dialog--position-top,
        &.onyx-popover__dialog--position-bottom {
          transform: translateX(100%);
          &.onyx-popover__dialog--dont-support-anchor {
            transform: none;
          }
        }
      }
      &--alignment-right {
        &.onyx-popover__dialog--position-top,
        &.onyx-popover__dialog--position-bottom {
          transform: translateX(-100%);
          &.onyx-popover__dialog--dont-support-anchor {
            transform: none;
          }
        }
      }
      &--fitparent {
        min-width: inherit;
        max-width: inherit;
      }

      &--dont-support-anchor {
        margin: 0;
      }
    }
  }
}
.dark .onyx-popover__dialog {
  @include layers.component() {
    outline: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  }
}
</style>
