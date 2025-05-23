<script setup lang="ts" generic="TValue extends SelectOptionValue = SelectOptionValue">
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
import { useAnchorPositionPolyfill } from "../../composables/useAnchorPositionPolyfill";
import { useOpenAlignment } from "../../composables/useOpenAlignment";
import { useOpenDirection } from "../../composables/useOpenDirection";
import { useResizeObserver } from "../../composables/useResizeObserver";
import type { SelectOptionValue } from "../../types";
import type { OnyxFlyoutProps } from "./types";

const props = withDefaults(defineProps<OnyxFlyoutProps>(), {
  position: "auto",
  alignment: "auto",
});

defineSlots<{
  /**
   * The always visible parent to which the flyout is aligned.
   * `trigger` can optionally set to a button to explicitly connect the the button and popover.
   */
  default(params: { trigger: AriaAttributes }): unknown;
  /**
   * Content shown in the flyout when it is expanded.
   */
  content(): unknown;
}>();

const _isVisible = ref(false);
const isVisible = computed({
  set: (newVal) => (_isVisible.value = newVal),
  get: () => (typeof props.open === "boolean" && !props.disabled ? props.open : _isVisible.value),
});

const flyoutPosition = computed(() =>
  props.position === "auto" ? openDirection.value : props.position,
);
const flyoutAlignment = computed(() =>
  props.alignment === "auto" ? openAlignment.value : props.alignment,
);
const disabled = computed(() => props.disabled);

const positionAndAlignment = computed(() => {
  let returnPosition = flyoutPosition.value;
  if (flyoutPosition.value === "top" || flyoutPosition.value === "bottom") {
    if (flyoutAlignment.value === "left") {
      returnPosition = flyoutPosition.value + " " + "x-start";
    }
    if (flyoutAlignment.value === "right") {
      returnPosition = flyoutPosition.value + " " + "x-end";
    }
  }
  return returnPosition;
});

const flyoutRef = useTemplateRef("flyout");
const flyoutWrapperRef = useTemplateRef("flyoutWrapper");
const { openDirection, updateOpenDirection } = useOpenDirection(flyoutWrapperRef, "bottom");

const { openAlignment, updateOpenAlignment } = useOpenAlignment(
  flyoutWrapperRef,
  flyoutRef,
  "left",
);
const { leftPosition, topPosition, updateAnchorPositionPolyfill, useragentSupportsAnchorApi } =
  useAnchorPositionPolyfill({
    positionedRef: flyoutRef,
    targetRef: flyoutWrapperRef,
    positionArea: flyoutPosition,
    alignment: flyoutAlignment,
    alignsWithEdge: true,
    fitParent: false,
    offset: 8,
  });

const { width } = useResizeObserver(flyoutWrapperRef);

const flyoutWidth = computed(() =>
  props.fitParent && flyoutWrapperRef.value ? `${width.value}px` : "max-content",
);

const handleOpening = (open: boolean) => {
  if (open) {
    flyoutRef.value?.showPopover();
  } else {
    flyoutRef.value?.hidePopover();
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
  if (!useragentSupportsAnchorApi.value) updateAnchorPositionPolyfill();
});

watch(isVisible, async (newVal) => {
  await nextTick();
  handleOpening(newVal);
  updateDirections();
  if (!useragentSupportsAnchorApi.value) updateAnchorPositionPolyfill();
});

const toggle = () => {
  _isVisible.value = !_isVisible.value;
};

const trigger = computed(() => ({
  onClick: toggle,
  "aria-expanded": isVisible.value,
  "aria-controls": flyoutRef.value?.id,
  disabled: disabled.value,
}));

const id = useId();
const anchorName = computed(() => `--anchor-${id}`);

const flyoutClasses = computed(() => {
  return {
    [`onyx-flyout__dialog--position-${flyoutPosition.value.replace(" ", "-")}`]: true,
    [`onyx-flyout__dialog--alignment-${flyoutAlignment.value}`]: true,
    "onyx-flyout__dialog--fitparent": props.fitParent,
    "onyx-flyout__dialog--disabled": disabled.value,
    "onyx-flyout__dialog--dont-support-anchor": !useragentSupportsAnchorApi.value,
  };
});
watch([disabled], () => {
  if (disabled.value) {
    _isVisible.value = false;
  }
});
watch([flyoutPosition, flyoutAlignment, flyoutWidth], async () => {
  if (!useragentSupportsAnchorApi.value) {
    await nextTick();
    updateDirections();
    updateAnchorPositionPolyfill();
  }
});

const flyoutStyles = computed(() => ({
  "position-anchor": anchorName.value,
  "position-area": positionAndAlignment.value,
  width: props.fitParent ? flyoutWidth.value : undefined,
  left: !useragentSupportsAnchorApi.value ? leftPosition.value : undefined,
  top: !useragentSupportsAnchorApi.value ? topPosition.value : undefined,
}));
</script>

<template>
  <div ref="flyoutWrapper" class="onyx-component onyx-flyout" :style="`anchor-name: ${anchorName}`">
    <slot :trigger="trigger"></slot>
    <!-- we are using inline "style" here since using v-bind causes hydration errors in Nuxt / SSR -->
    <div
      ref="flyout"
      role="dialog"
      :aria-label="props.label"
      popover="manual"
      class="onyx-flyout__dialog"
      :class="flyoutClasses"
      :style="flyoutStyles"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-flyout {
  --onyx-flyout-min-width: var(--onyx-spacing-4xl);
  --onyx-flyout-max-width: 20rem;

  @include layers.component() {
    --onyx-flyout-gap: var(--onyx-spacing-2xs);
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

      min-width: var(--onyx-flyout-min-width);
      max-width: var(--onyx-flyout-max-width);
      width: max-content;
      font-family: var(--onyx-font-family);

      &:popover-open {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      &--position-right {
        margin-left: var(--onyx-flyout-gap);
      }
      &--position-left {
        margin-right: var(--onyx-flyout-gap);
      }
      &--position-bottom {
        margin-top: var(--onyx-flyout-gap);
      }
      &--position-bottom-right {
        margin-top: var(--onyx-flyout-gap);
        margin-left: var(--onyx-flyout-gap);
      }
      &--position-bottom-left {
        margin-top: var(--onyx-flyout-gap);
        margin-right: var(--onyx-flyout-gap);
      }
      &--position-top {
        margin-bottom: var(--onyx-flyout-gap);
      }
      &--position-top-right {
        margin-bottom: var(--onyx-flyout-gap);
        margin-left: var(--onyx-flyout-gap);
      }
      &--position-top-left {
        margin-bottom: var(--onyx-flyout-gap);
        margin-right: var(--onyx-flyout-gap);
      }

      &--alignment-left {
        &.onyx-flyout__dialog--position-top,
        &.onyx-flyout__dialog--position-bottom {
          transform: translateX(100%);
          &.onyx-flyout__dialog--dont-support-anchor {
            transform: none;
          }
        }
      }
      &--alignment-right {
        &.onyx-flyout__dialog--position-top,
        &.onyx-flyout__dialog--position-bottom {
          transform: translateX(-100%);
          &.onyx-flyout__dialog--dont-support-anchor {
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
.dark .onyx-flyout__dialog {
  @include layers.component() {
    outline: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  }
}
</style>
