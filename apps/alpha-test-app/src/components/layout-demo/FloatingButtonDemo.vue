<script lang="ts" setup>
import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import chevronRightSmall from "@sit-onyx/icons/chevron-right-small.svg?raw";
import { OnyxButton } from "sit-onyx";

const isOpen = defineModel<boolean>();
</script>

<template>
  <OnyxButton
    class="floating-button"
    :icon="isOpen ? chevronLeftSmall : chevronRightSmall"
    variation="secondary"
    @click="isOpen = !isOpen"
  />
</template>

<style lang="scss" scoped></style>
