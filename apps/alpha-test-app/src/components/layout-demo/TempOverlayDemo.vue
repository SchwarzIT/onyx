<script lang="ts" setup>
import { OnyxButton, OnyxHeadline } from "sit-onyx";
import xSmall from "@sit-onyx/icons/x-small.svg?raw";

const isOpen = defineModel<boolean>();
defineProps<{ transparent?: boolean }>();
</script>

<template>
  <div class="backdrop temp-overlay" :class="{ 'backdrop--transparent': transparent }">
    <div class="demo temp-overlay__sidebar">
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
  &__sidebar {
    width: 250px;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    box-sizing: border-box;
  }
  &__close {
    justify-self: flex-end;
  }
}
.backdrop--transparent {
  background-color: transparent;
}
</style>
