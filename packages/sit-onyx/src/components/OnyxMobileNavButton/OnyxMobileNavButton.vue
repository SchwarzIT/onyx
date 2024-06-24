<script lang="ts" setup>
import x from "@sit-onyx/icons/x.svg?raw";
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
   * Slot for the menu content when its open.
   */
  default(): unknown;
}>();
</script>

<template>
  <div>
    <button
      class="onyx-mobile-nav-button"
      :class="{ 'onyx-mobile-nav-button--active': props.open }"
      :aria-label="props.label"
      @click="emit('update:open', !props.open)"
    >
      <OnyxIcon :icon="props.open ? x : props.icon" size="24px" />
    </button>

    <div v-if="props.open" class="onyx-mobile-nav-button__menu">
      <div class="onyx-mobile-nav-button__content">
        <slot></slot>
      </div>

      <div
        class="onyx-mobile-nav-button__backdrop"
        role="presentation"
        @click="emit('update:open', false)"
      ></div>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../styles/mixins/layers.scss";

.onyx-mobile-nav-button {
  @include layers.component() {
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

    &__menu {
      width: 100%;
      background-color: var(--onyx-color-base-background-tinted);
      box-shadow: var(--onyx-shadow-medium-bottom);
      position: relative;
      font-family: var(--onyx-font-family);
      color: var(--onyx-color-text-icons-neutral-intense);
    }

    &__backdrop {
      content: "";
      background-color: var(--onyx-color-backdrop);
      width: 100%;
      height: 100vh;
      display: block;
      position: absolute;
      cursor: pointer;
    }

    &__content {
      max-width: 34rem;
      padding: var(--onyx-spacing-xl) var(--onyx-spacing-md);
      display: flex;
      flex-direction: column;
      margin-inline: auto;
      gap: var(--onyx-spacing-2xs);
    }
  }
}
</style>
