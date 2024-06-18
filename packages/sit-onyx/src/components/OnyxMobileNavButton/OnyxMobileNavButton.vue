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
</script>

<template>
  <button
    class="onyx-mobile-nav-button"
    :class="{ 'onyx-mobile-nav-button--active': props.open }"
    :aria-label="props.label"
    @click="emit('update:open', !props.open)"
  >
    <OnyxIcon :icon="props.open ? x : props.icon" size="24px" />
  </button>
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
  }
}
</style>
