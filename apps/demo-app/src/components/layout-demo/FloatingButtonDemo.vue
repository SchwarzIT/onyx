<script lang="ts" setup>
import { iconChevronRightSmall } from "@sit-onyx/icons";
import { OnyxButton } from "sit-onyx";

const isOpen = defineModel<boolean>();
</script>

<template>
  <OnyxButton
    label="Open Sidebar"
    class="floating-button"
    :icon="iconChevronRightSmall"
    @click="isOpen = !isOpen"
  />
</template>

<style lang="scss" scoped>
.floating-button {
  position: sticky;
  bottom: var(--onyx-spacing-xl);
  left: var(--onyx-spacing-xl);
  z-index: var(--onyx-z-index-notification);
}
</style>
