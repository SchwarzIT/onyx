<script lang="ts" setup>
import { computed, toRef, useId, useTemplateRef, watch, type AriaAttributes } from "vue";
import { useVModel } from "../../composables/useVModel.js";
import type { OnyxSupportPopoverProps } from "./types.js";
import { usePopoverAutoPosition } from "./usePopoverAutoPosition.js";
import { useUnsupportedPopoverAPI } from "./useUnsupportedPopoverAPI.js";

const props = withDefaults(defineProps<OnyxSupportPopoverProps>(), {
  position: "bottom span-all",
  open: undefined,
});

const emit = defineEmits<{
  /**
   * Emitted when the open state changes.
   */
  "update:open": [open: boolean];
}>();

defineSlots<{
  /**
   * Always visible element, that triggers the popover open state.
   */
  trigger(params: { trigger: AriaAttributes }): unknown;
  /**
   * Content that is shown when the popover is open.
   */
  default(): unknown;
}>();

const isOpen = useVModel({
  props,
  emit,
  key: "open",
  default: false,
});

const dialog = useTemplateRef("dialogRef");
const handleToggle = () => (isOpen.value = !isOpen.value);

watch(
  [isOpen, dialog],
  () => {
    if (!dialog.value) return;
    if (isOpen.value) dialog.value.showPopover();
    else dialog.value.hidePopover();
  },
  { immediate: true },
);

const id = useId();
const anchorName = computed(() => `--anchor-${id}`);

const triggerAttributes = computed<AriaAttributes>(() => ({
  onClick: handleToggle,
  "aria-expanded": isOpen.value,
  "aria-controls": id,
}));

const wrapper = useTemplateRef("wrapperRef");

// using this composable for auto position for now since native CSS position-try
// is still experimental
const { position } = usePopoverAutoPosition({
  position: toRef(props, "position"),
  wrapperRef: wrapper,
  dialogRef: dialog,
  open: isOpen,
});

// polyfill for browsers that do not support the Popover API
// DELETE ONCE ITS SUPPORTED IN ALL MAJOR BROWSERS
const { dialogAttributes } = useUnsupportedPopoverAPI({
  wrapperRef: wrapper,
  dialogRef: dialog,
  open: isOpen,
  position,
});

defineExpose({
  /**
   * Actual position used by the popover (after considering overflow fallbacks).
   */
  position,
});
</script>

<template>
  <div
    ref="wrapperRef"
    :class="['onyx-component', 'onyx-support-popover']"
    :style="`anchor-name: ${anchorName}`"
  >
    <slot name="trigger" :trigger="triggerAttributes"></slot>

    <!-- we are using inline "style" here since using v-bind causes hydration errors in Nuxt / SSR -->
    <div
      :id="id"
      v-bind="dialogAttributes"
      ref="dialogRef"
      role="dialog"
      :aria-label="props.label"
      popover="manual"
      :style="
        dialogAttributes ? undefined : `position-area: ${position}; position-anchor: ${anchorName}`
      "
      :class="{
        'onyx-support-popover__dialog': true,
        'onyx-support-popover__dialog--top':
          position.includes('top') && !position.includes('span-top'),
        'onyx-support-popover__dialog--bottom':
          position.includes('bottom') && !position.includes('span-bottom'),
        'onyx-support-popover__dialog--left':
          position.includes('left') && !position.includes('span-left'),
        'onyx-support-popover__dialog--right': position.includes('right'),
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-support-popover {
  @include layers.component() {
    --onyx-support-popover-gap: var(--onyx-spacing-2xs);
    --onyx-support-popover-min-width: var(--onyx-spacing-4xl);
    --onyx-support-popover-max-width: 20rem;
    display: inline-flex;
    font-family: var(--onyx-font-family);
    color: var(--onyx-color-text-icons-neutral-intense);

    &__dialog {
      // reset default dialog styles
      padding: 0;
      border: none;

      min-width: min(var(--onyx-support-popover-min-width), anchor-size(width));
      max-width: var(--onyx-support-popover-max-width);
      max-height: 100%;

      // see: https://developer.mozilla.org/en-US/docs/Web/CSS/position-try-fallbacks#combining_multiple_values_into_one_option
      // TODO: extend polyfill to support fallbacks
      // position-try:
      //   flip-block,
      //   flip-inline,
      //   flip-block flip-inline;
      // position-try-fallbacks:
      //   flip-block,
      //   flip-inline,
      //   flip-block flip-inline;

      // apply gap spacing depending on the position
      &--top {
        margin-bottom: var(--onyx-support-popover-gap);
      }

      &--bottom {
        margin-top: var(--onyx-support-popover-gap);
      }

      &--left {
        margin-right: var(--onyx-support-popover-gap);
      }

      &--right {
        margin-left: var(--onyx-support-popover-gap);
      }
    }

    // REMOVE ONCE THE POPOVER API IS SUPPORTED IN ALL BROWSERS
    &:has(&__dialog--unsupported-popover-api) {
      --onyx-support-popover-gap: 0;
    }
  }
}
</style>
