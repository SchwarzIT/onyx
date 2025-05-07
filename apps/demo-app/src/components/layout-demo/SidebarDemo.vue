<script lang="ts" setup>
import xSmall from "@sit-onyx/icons/x-small.svg?raw";
import { OnyxButton, OnyxHeadline, OnyxSidebar } from "sit-onyx";

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
  <OnyxSidebar label="Sidebar demo">
    <div class="sidebar__content">
      <section>
        <OnyxHeadline is="h2">Sidebar</OnyxHeadline>
        <slot></slot>
      </section>
    </div>

    <template v-if="isClosable" #footer>
      <OnyxButton :icon="xSmall" label="Close" @click="isOpen = false" />
    </template>
  </OnyxSidebar>
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

  &__content {
    padding: var(--onyx-sidebar-padding);
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-md);
  }
}
</style>
