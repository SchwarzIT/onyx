<script setup lang="ts" generic="TValue extends SelectOptionValue = SelectOptionValue">
import OnyxFlyout from "../../../../components/OnyxFlyout/OnyxFlyout.vue";
import type { SelectOptionValue } from "../../../../types";
import type { OnyxFlyoutMenuProps } from "./types";

const props = withDefaults(defineProps<OnyxFlyoutMenuProps>(), {
  open: "hover",
  position: "auto",
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
</script>

<template>
  <OnyxFlyout v-bind="props">
    <!--  <template #default> Content </template> -->

    <template #button="{ trigger }">
      <slot name="button" v-bind="{ trigger }"></slot>
    </template>
    <template #default>
      <div class="onyx-flyout-menu__list-header">
        <slot name="header"></slot>
      </div>

      <ul v-if="slots.options" class="onyx-flyout-menu__wrapper onyx-flyout-menu__group">
        <slot name="options"></slot>
      </ul>

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
