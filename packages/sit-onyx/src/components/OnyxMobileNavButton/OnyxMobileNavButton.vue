<script lang="ts" setup>
import x from "@sit-onyx/icons/x.svg?raw";
import { FORM_INJECTED_SYMBOL, useFormContext } from "../OnyxForm/OnyxForm.core";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxMobileNavButtonProps } from "./types";

const props = withDefaults(defineProps<OnyxMobileNavButtonProps>(), {
  open: false,
  disabled: FORM_INJECTED_SYMBOL,
});

const emit = defineEmits<{
  /**
   * Emitted when the open state changes on click.
   */
  "update:open": [isOpen: boolean];
}>();

defineSlots<{
  /**
   * Slot for the menu content when it's open.
   */
  default(): unknown;
}>();
const { disabled } = useFormContext(props);
</script>

<template>
  <div class="onyx-component onyx-mobile-nav-button">
    <button
      type="button"
      class="onyx-mobile-nav-button__trigger"
      :class="{ 'onyx-mobile-nav-button__trigger--active': props.open }"
      :aria-label="props.label"
      :disabled="disabled"
      @click="emit('update:open', !props.open)"
    >
      <OnyxIcon :icon="props.open ? x : props.icon" />
    </button>

    <template v-if="props.open">
      <div class="onyx-mobile-nav-button__flyout">
        <div class="onyx-mobile-nav-button__menu">
          <OnyxHeadline is="h2" v-if="props.headline" class="onyx-mobile-nav-button__headline">
            {{ props.headline }}
          </OnyxHeadline>

          <slot></slot>
        </div>
      </div>
      <div
        class="onyx-mobile-nav-button__backdrop"
        role="presentation"
        @click="!disabled ? emit('update:open', false) : null"
      ></div
    ></template>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-mobile-nav-button {
  @include layers.component() {
    // should be adjusted to the height of the control button
    --top-position: 3.5rem;
    $mobile-children-selector: ":has(.onyx-nav-item-wrapper.onyx-nav-item-wrapper--open)";

    &__trigger {
      display: flex;
      background-color: var(--onyx-color-base-background-blank);
      color: var(--onyx-color-text-icons-neutral-medium);
      padding: var(--onyx-spacing-md);
      cursor: pointer;

      :where(&) {
        border: none;
      }

      &:hover:not(&--active):not(&:disabled) {
        background-color: var(--onyx-color-base-background-tinted);
      }

      &:focus-visible {
        background-color: var(--onyx-color-base-primary-100);
        outline: none;
      }

      &:active,
      &--active {
        background-color: var(--onyx-color-base-primary-100);
        color: var(--onyx-color-text-icons-primary-intense);
      }

      &:disabled {
        cursor: default;

        background-color: var(--onyx-color-base-background-blank);
        color: var(--onyx-color-text-icons-neutral-soft);
      }
    }

    &__headline {
      position: sticky;
      top: 0;
      z-index: 1;
      background-color: var(--onyx-color-base-background-tinted);
      padding: var(--onyx-spacing-xl) 0 var(--onyx-spacing-2xs);
      margin-inline: auto;
    }

    &__flyout {
      max-height: calc(100vh - var(--top-position) - var(--onyx-spacing-3xl));
      width: 100%;
      background-color: var(--onyx-color-base-background-tinted);
      box-shadow: var(--onyx-shadow-medium-bottom);
      position: relative;
      font-family: var(--onyx-font-family);
      color: var(--onyx-color-text-icons-neutral-intense);
      overflow-y: auto;

      position: absolute;
      top: var(--top-position);
      left: 0;
      z-index: var(--onyx-z-index-navigation);
    }

    &__backdrop {
      content: "";
      background-color: var(--onyx-color-component-opacity-backdrop);
      width: 100%;
      height: 100vh;
      display: block;
      cursor: pointer;

      position: fixed;
      top: var(--top-position);
      left: 0;
      z-index: var(--onyx-z-index-page-overlay);
    }

    &__menu {
      max-width: 36rem;
      padding: 0 var(--onyx-spacing-md) var(--onyx-spacing-xl);
      margin-inline: auto;

      &:has(.onyx-nav-bar__mobile-context-content) {
        // context menu needs extra padding on top since there is no headline
        padding-top: var(--onyx-spacing-xl);
      }
    }

    &#{$mobile-children-selector} {
      // hide "Navigation" headline when nav item with children is open
      .onyx-mobile-nav-button__headline {
        display: none;
      }
    }
    // fill up the padding-top if there is no headline
    &#{$mobile-children-selector} .onyx-mobile-nav-button__menu,
    &__menu:not(:has(.onyx-mobile-nav-button__headline)) {
      padding-top: var(--onyx-spacing-xl);
    }
  }
}
</style>
