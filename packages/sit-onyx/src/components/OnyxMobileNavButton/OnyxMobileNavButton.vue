<script lang="ts" setup>
import x from "@sit-onyx/icons/x.svg?raw";
import OnyxHeadline from "../OnyxHeadline/OnyxHeadline.vue";
import OnyxIcon from "../OnyxIcon/OnyxIcon.vue";
import type { OnyxMobileNavButtonProps } from "./types";

const props = withDefaults(defineProps<OnyxMobileNavButtonProps>(), {
  open: false,
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
  /**
   * Slot for a headline of the menu content when it's open
   */
  headline?(): unknown;
}>();
</script>

<template>
  <div class="onyx-mobile-nav-button">
    <button
      type="button"
      class="onyx-mobile-nav-button__control"
      :class="{ 'onyx-mobile-nav-button__control--active': props.open }"
      :aria-label="props.label"
      @click="emit('update:open', !props.open)"
    >
      <OnyxIcon :icon="props.open ? x : props.icon" />
    </button>

    <template v-if="props.open">
      <div class="onyx-mobile-nav-button__flyout">
        <div class="onyx-mobile-nav-button__menu">
          <OnyxHeadline is="h2" class="onyx-mobile-nav-button__headline">
            <slot name="headline"></slot>
          </OnyxHeadline>

          <slot></slot>
        </div>
      </div>
      <div
        class="onyx-mobile-nav-button__backdrop"
        role="presentation"
        @click="emit('update:open', false)"
      ></div
    ></template>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-mobile-nav-button {
  @include layers.component() {
    &__control {
      display: flex;
      background-color: var(--onyx-color-base-background-blank);
      color: var(--onyx-color-text-icons-neutral-medium);
      padding: var(--onyx-spacing-md);
      cursor: pointer;

      :where(&) {
        border: none;
      }

      &:hover:not(&--active) {
        background-color: var(--onyx-color-base-background-tinted);
      }

      &:focus-visible {
        background-color: var(--onyx-color-base-secondary-100);
        outline: none;
      }

      &:active,
      &--active {
        background-color: var(--onyx-color-base-secondary-100);
        color: var(--onyx-color-text-icons-secondary-intense);
      }
    }

    &__flyout {
      width: 100%;
      background-color: var(--onyx-color-base-background-tinted);
      box-shadow: var(--onyx-shadow-medium-bottom);
      position: relative;
      font-family: var(--onyx-font-family);
      color: var(--onyx-color-text-icons-neutral-intense);
      position: absolute;
      left: 0;
      overflow-y: auto;
      // TODO: var
      z-index: 2;
    }

    &__backdrop {
      content: "";
      background-color: var(--onyx-color-backdrop);
      width: 100%;
      height: 100vh;
      display: block;
      position: fixed;
      cursor: pointer;
      // TODO: var
      z-index: 1;
    }

    &__menu {
      max-width: 36rem;
      padding: 0 var(--onyx-spacing-md) var(--onyx-spacing-xl);
      margin-inline: auto;
    }

    &__headline {
      position: sticky;
      top: 0;
      z-index: 1;
      background-color: var(--onyx-color-base-background-tinted);
      padding: var(--onyx-spacing-xl) 0 var(--onyx-spacing-2xs);
      margin-inline: auto;
    }
  }
}
</style>
