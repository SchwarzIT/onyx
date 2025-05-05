<script setup lang="ts" generic="TValue extends SelectOptionValue = SelectOptionValue">
import { createMenuButton } from "@sit-onyx/headless";
import { computed } from "vue";
import OnyxFlyout from "../../../../components/OnyxFlyout/OnyxFlyout.vue";
import { useVModel, type Nullable } from "../../../../composables/useVModel";
import type { SelectOptionValue } from "../../../../types";
import type { OnyxFlyoutMenuProps } from "./types";
const props = withDefaults(defineProps<OnyxFlyoutMenuProps>(), {
  trigger: "hover",
  open: undefined,
  alignment: "auto",
});
const emit = defineEmits<{
  /**
   * Emitted when the isExpanded state changes.
   */
  "update:open": [value?: Nullable<boolean>];
}>();
/**
 * If the flyout is expanded or not.
 */
const isExpanded = useVModel({
  props,
  emit,
  key: "open",
  initialValue: false,
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

const {
  elements: { root, button, menu },
} = createMenuButton({
  isExpanded: computed(() => !!isExpanded.value),
  onToggle: () => (isExpanded.value = !isExpanded.value),
  trigger: computed(() => props.trigger),
});
</script>

<template>
  <OnyxFlyout
    class="onyx-component onyx-flyout-menu"
    v-bind="root"
    :expanded="isExpanded"
    :label="props.label"
    :alignment="props.alignment"
  >
    <template v-if="slots.options || slots.header || slots.footer" #default>
      <slot name="button" :trigger="button"></slot>
    </template>
    <!-- `v-show` instead of `v-if` is necessary, so that we can allow (teleported) dialogs to be shown -->
    <template #content>
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
    </template>
  </OnyxFlyout>
</template>

<style lang="scss">
@use "../../../../styles/mixins/layers";

.onyx-flyout-menu {
  @include layers.component() {
    --onyx-flyout-menu-gap: var(--onyx-spacing-2xs);
    display: inline-flex;
    width: min-content;
    position: relative;

    &__list {
      &-header {
        position: sticky;
        top: 0;
        min-height: var(--onyx-spacing-2xs);
      }

      &-footer {
        position: sticky;
        bottom: 0;
        min-height: var(--onyx-spacing-2xs);
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
    }
  }
}
.dark .onyx-flyout-menu__list {
  @include layers.component() {
    outline: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  }
}
</style>
