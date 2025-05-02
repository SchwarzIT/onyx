<script lang="ts" setup>
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import { OnyxButton, OnyxHeadline } from "sit-onyx";

const isOpen = defineModel<boolean>();
defineProps<{ isClosable?: boolean }>();

defineSlots<{
  /**
   * Sidebar content.
   */
  default?(): unknown;
}>();
</script>

<template>
  <div class="sidebar">
    <section>
      <OnyxHeadline is="h2">Sidebar</OnyxHeadline>
      <slot></slot>
    </section>

    <OnyxButton
      v-if="isClosable"
      class="sidebar__close"
      :icon="xSmall"
      label="Close"
      @click="isOpen = false"
    />
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  padding: var(--onyx-spacing-md);
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  background-color: var(--onyx-color-base-background-blank);

  &__close {
    justify-self: flex-end;
  }
}
</style>
