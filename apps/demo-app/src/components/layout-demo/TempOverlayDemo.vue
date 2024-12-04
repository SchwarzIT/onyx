<script lang="ts" setup>
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import { OnyxButton, OnyxHeadline } from "sit-onyx";

const isOpen = defineModel<boolean>();
defineProps<{ transparent?: boolean }>();

defineSlots<{
  /**
   * Overlay content.
   */
  default?(): unknown;
}>();
</script>

<template>
  <div class="temp-overlay" :class="{ 'temp-overlay--transparent': transparent }">
    <div class="temp-overlay__sidebar">
      <section>
        <OnyxHeadline is="h2">Temp overlay</OnyxHeadline>

        <slot></slot>
      </section>

      <OnyxButton
        class="temp-overlay__close"
        :icon="xSmall"
        label="Close"
        @click="isOpen = false"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.temp-overlay {
  height: 100%;
  widows: 100%;
  z-index: var(--onyx-z-index-page-overlay);
  background-color: rgba(0, 0, 0, 0.5);

  &--transparent {
    background-color: transparent;
  }

  &__sidebar {
    border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
    background-color: var(--onyx-color-base-background-blank);

    width: 15.625rem;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: var(--onyx-spacing-md);
    box-sizing: border-box;
  }
  &__close {
    justify-self: flex-end;
  }
}
</style>
