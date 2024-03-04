<script lang="ts" setup>
import { OnyxButton, OnyxHeadline } from "sit-onyx";
import xSmall from "@sit-onyx/icons/x-small.svg?raw";

const isOpen = defineModel<boolean>();
defineProps<{ isClosable?: boolean }>();
</script>

<template>
  <div class="sidebar" :class="{ 'sidebar--closed': isClosable && !isOpen }">
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
  padding: 1rem;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  // when the sidebar is closed,
  // it uses a minimal space for the grid layout
  &--closed {
    width: 1px;
    padding: 0;
    overflow: hidden;
  }

  &__close {
    justify-self: flex-end;
  }
}
</style>
