<script lang="ts" setup>
import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import chevronRightSmall from "@sit-onyx/icons/chevron-right-small.svg?raw";
import { OnyxButton } from "sit-onyx";

const isOpen = defineModel<boolean>();
defineProps<{ isOverlay: boolean }>();
</script>

<template>
  <OnyxButton
    class="floating-button"
    :class="{ 'floating-button--open': isOpen, 'floating-button--overlay': isOverlay }"
    :icon="isOpen ? chevronLeftSmall : chevronRightSmall"
    @click="isOpen = !isOpen"
  />
</template>

<style lang="scss" scoped>
.floating-button {
  margin: 0 0 2rem 2rem;
}
</style>
