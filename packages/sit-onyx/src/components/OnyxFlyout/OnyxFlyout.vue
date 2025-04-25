<script setup lang="ts" generic="TValue extends SelectOptionValue = SelectOptionValue">
import { createToggletip, createTooltip } from "@sit-onyx/headless";
import {
  computed,
  nextTick,
  onMounted,
  ref,
  shallowRef,
  toValue,
  useId,
  useTemplateRef,
  watch,
  type MaybeRefOrGetter,
  type Ref,
} from "vue";
import {
  useAnchorPositionPolyfill,
  USERAGENT_SUPPORTS_ANCHOR_API,
} from "../../composables/useAnchorPositionPolyfill";
import type { SelectOptionValue } from "../../types";
import type { OnyxFlyoutProps } from "./types";

type CreateToggletipOptions = {
  toggleLabel: MaybeRefOrGetter<string>;
  isVisible?: Ref<boolean>;
};

type CreateTooltipOptions = {
  /**
   * Number of milliseconds to use as debounce when showing/hiding the tooltip.
   */
  debounce: MaybeRefOrGetter<number>;
  isVisible?: Ref<boolean>;
};

const props = withDefaults(defineProps<OnyxFlyoutProps>(), {
  open: "hover",
  position: "auto",
});

defineSlots<{
  default: () => null;
  /**
   * The trigger for the flyout menu. Should be an interactive component like a button or link.
   */
  button?(params: {
    /**
     * Attributes and event listeners that must be bound to an interactive element (button or link), that should act as the flyout trigger.
     */
    trigger: object;
  }): unknown;
}>();

const _isVisible = ref(false);
const isVisible = computed({
  set: (newVal) => (_isVisible.value = newVal),
  get: () => (typeof props.open === "boolean" ? props.open : _isVisible.value),
});

const flyoutPosition = computed(() =>
  //TODO: change it
  props.position === "auto" ? "bottom" : props.position,
);

const flyoutRef = useTemplateRef("flyout");
const flyoutWrapperRef = useTemplateRef("flyoutWrapper");
const { leftPosition, topPosition, updateAnchorPositionPolyfill } = useAnchorPositionPolyfill({
  positionedRef: flyoutRef,
  targetRef: flyoutWrapperRef,
  positionArea: flyoutPosition,
  alignment: "center",
  alignsWithEdge: false,
  fitParent: false,
});

const handleOpening = (open: boolean) => {
  if (open) {
    flyoutRef.value?.showPopover();
  } else {
    flyoutRef.value?.hidePopover();
  }
};

// initial update
onMounted(() => {
  handleOpening(isVisible.value);
  if (!USERAGENT_SUPPORTS_ANCHOR_API) updateAnchorPositionPolyfill();
});

// update open direction when visibility changes to ensure the tooltip is always visible
watch(isVisible, async (newVal) => {
  await nextTick();
  handleOpening(newVal);
  if (!USERAGENT_SUPPORTS_ANCHOR_API) updateAnchorPositionPolyfill();
});

const tooltipOptions = computed<CreateTooltipOptions>(() => ({
  debounce: 200,
  ...((typeof props.open === "object" && props.open.type === "hover" && props.open) || {}),
  isVisible,
}));

const toggletipOptions = computed<CreateToggletipOptions>(() => ({
  toggleLabel: "test",
  ...((typeof props.open === "object" && props.open.type === "click" && props.open) || {}),
  isVisible,
}));

const type = computed(() => {
  if (typeof props.open === "object") return props.open.type;
  if (typeof props.open === "string") return props.open;
  return "hover";
});

const createPattern = () =>
  type.value === "hover"
    ? createTooltip(tooltipOptions.value)
    : createToggletip(toggletipOptions.value);

const ariaPattern = shallowRef(createPattern());
watch(type, () => (ariaPattern.value = createPattern()));

const flyout = computed(() => ariaPattern.value?.elements.tooltip);
const trigger = computed(() => toValue<object>(ariaPattern.value?.elements.trigger));

const id = useId();
const anchorName = computed(() => `--anchor-${id}`);

const flyoutClasses = computed(() => {
  return {
    [`onyx-flyout__list--position-${flyoutPosition.value.replace(" ", "-")}`]: true,
    "onyx-flyout__list--dont-support-anchor": !USERAGENT_SUPPORTS_ANCHOR_API,
  };
});

watch([flyoutPosition], async () => {
  if (!USERAGENT_SUPPORTS_ANCHOR_API) {
    await nextTick();
    updateAnchorPositionPolyfill();
  }
});
</script>

<template>
  <div ref="flyoutWrapper" class="onyx-component onyx-flyout" :style="`anchor-name: ${anchorName}`">
    <slot name="button" :trigger="trigger"></slot>
    <!-- `v-show` instead of `v-if` is necessary, so that we can allow (teleported) dialogs to be shown -->

    <div
      ref="flyout"
      :aria-label="props.label"
      v-bind="flyout"
      class="onyx-flyout__list"
      :class="flyoutClasses"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers";

.onyx-flyout {
  @include layers.component() {
    --onyx-flyout-gap: var(--onyx-spacing-2xs);
    display: inline-flex;
    width: min-content;
    position: relative;

    &__list {
      position: absolute;
      border-radius: var(--onyx-radius-md);
      background-color: var(--onyx-color-base-background-blank);
      padding: 0;
      box-shadow: var(--onyx-shadow-medium-bottom);
      box-sizing: border-box;
      width: max-content;
      min-width: var(--onyx-spacing-4xl);
      max-width: 20rem;
      font-family: var(--onyx-font-family);
      z-index: var(--onyx-z-index-flyout);

      position-anchor: v-bind("anchorName");
      position-area: v-bind("flyoutPosition");

      &--dont-support-anchor {
        left: v-bind(leftPosition);
        top: v-bind(topPosition);
      }

      &:popover-open {
        border: none;
        outline: none;
        background-color: var(--onyx-color-base-background-blank);
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
        margin-left: var(--onyx-flyout-gap);
      }
      &--position-top-right {
        margin-bottom: var(--onyx-flyout-gap);
      }
      &--position-top-left {
        margin-bottom: var(--onyx-flyout-gap);
        margin-right: var(--onyx-flyout-gap);
      }
    }
  }
}
.dark .onyx-flyout-menu__list {
  @include layers.component() {
    outline: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  }
}
</style>
