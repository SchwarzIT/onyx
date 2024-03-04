<script lang="ts" setup>
import chevronRightSmall from "@sit-onyx/icons/chevron-right-small.svg?raw";
import { OnyxButton } from "sit-onyx";

const isOpen = defineModel<boolean>();
defineProps<{ isOverlay: boolean }>();
</script>

<template>
  <OnyxButton class="floating-button" :icon="chevronRightSmall" @click="isOpen = !isOpen" />
</template>

<style lang="scss" scoped>
.floating-button {
  position: sticky;
  bottom: 2rem;
  left: 2rem;
  z-index: var(--onyx-z-index-notification);
}
</style>
