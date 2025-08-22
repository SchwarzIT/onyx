<!-- For an unknown reason the generic here is necessary, otherwise the typings of the component break -->
<script setup lang="ts" generic="_">
import { createMenuButton } from "@sit-onyx/headless";
import { computed, ref, type ComponentInstance, type VNodeRef } from "vue";
import { useVModel } from "../../../../composables/useVModel.js";
import { mergeVueProps } from "../../../../utils/attrs.js";
import OnyxSupportPopover from "../../../OnyxSupportPopover/OnyxSupportPopover.vue";
import type { OnyxFlyoutMenuProps } from "./types.js";

const props = withDefaults(defineProps<OnyxFlyoutMenuProps>(), {
  trigger: "hover",
  open: undefined,
  position: "bottom span-x-end",
});

const emit = defineEmits<{
  /**
   * Emitted when the isExpanded state changes.
   */
  "update:open": [value: boolean];
}>();

/**
 * If the flyout is expanded or not.
 */
const isExpanded = useVModel({
  props,
  emit,
  key: "open",
  default: false,
});

const slots = defineSlots<{
  /**
   * The trigger for the flyout menu. Should be an interactive component like a button or link.
   */
  button?(params: {
    /**
     * Attributes and event listeners that must be bound to an interactive element (button or link), that should act as the flyout trigger.
     */
    trigger: object;
  }): unknown;
  /**
   * OnyxMenuItem's to show
   */
  options?(): unknown;
  /**
   * Optional header content to display above the options.
   */
  header?(): unknown;
  /**
   * Optional footer content to display below the options.
   */
  footer?(): unknown;
}>();

const popover = ref<ComponentInstance<typeof OnyxSupportPopover>>();
const actualPosition = computed(() => popover.value?.position);

const {
  elements: { root, button, menu },
} = createMenuButton({
  isExpanded: computed(() => !!isExpanded.value),
  onToggle: () => (isExpanded.value = !isExpanded.value),
  trigger: computed(() => props.trigger),
  disabled: computed(() => props.disabled),
  position: computed(() => (actualPosition.value?.includes("top") ? "top" : "bottom")),
});
</script>

<template>
  <OnyxSupportPopover
    v-model:open="isExpanded"
    v-bind="mergeVueProps(root, { ref: popover as VNodeRef | undefined })"
    class="onyx-component onyx-flyout-menu"
    :label="props.label"
    :position="props.position"
  >
    <template v-if="slots.options || slots.header || slots.footer" #trigger>
      <slot name="button" :trigger="button"></slot>
    </template>

    <!-- We always want to render the header so that we can render the padding here -->
    <div class="onyx-flyout-menu__list-header">
      <slot name="header"></slot>
    </div>

    <ul
      v-if="slots.options"
      v-bind="menu"
      class="onyx-flyout-menu__wrapper onyx-flyout-menu__group"
    >
      <slot name="options"></slot>
    </ul>

    <!-- We always want to render the footer so that we can render the padding here -->
    <div class="onyx-flyout-menu__list-footer">
      <slot name="footer"></slot>
    </div>
  </OnyxSupportPopover>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers";

.onyx-flyout-menu {
  @include layers.component() {
    --onyx-flyout-menu-gap: var(--onyx-spacing-2xs);
    --onyx-flyout-min-width: var(--onyx-spacing-4xl);
    --onyx-flyout-max-width: 20rem;
    display: inline-flex;
    width: min-content;
    position: relative;

    .onyx-support-popover__dialog {
      border-radius: var(--onyx-radius-md);
      outline: none;
      box-shadow: var(--onyx-shadow-medium-bottom);
      background-color: var(--onyx-color-base-background-blank);
      min-width: var(--onyx-flyout-min-width);
      max-width: var(--onyx-flyout-max-width);
      max-height: 100%;
      width: max-content;
    }

    &__list {
      &-header {
        position: sticky;
        top: 0;
        min-height: var(--onyx-spacing-2xs);
        width: 100%;
      }

      &-footer {
        position: sticky;
        bottom: 0;
        min-height: var(--onyx-spacing-2xs);
        width: 100%;
      }
    }

    &__wrapper {
      width: 100%;
      padding: 0;
      /**
       * The last option should only be half visible:
       * 7.5 * OnyxListItem, where OnyxListItem => 2 * padding + line-height of OnyxListItem
       */
      max-height: calc(
        (var(--onyx-flyout-menu-visible-item-count, 7) + 0.5) * (2 * var(--onyx-density-xs) + 1lh)
      );
      overflow: auto;

      // when nested item is open, hide all other items in the same layer
      &:has(.onyx-menu-item--open) {
        > .onyx-menu-item:not(.onyx-menu-item--open) {
          display: none;
        }
      }
    }
  }
}

.dark .onyx-flyout-menu .onyx-support-popover__dialog {
  @include layers.component() {
    outline: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  }
}
</style>
