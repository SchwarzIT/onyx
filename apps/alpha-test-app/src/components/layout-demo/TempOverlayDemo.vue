<script lang="ts" setup>
import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import chevronRightSmall from "@sit-onyx/icons/chevron-right-small.svg?raw";
import { OnyxIcon } from "sit-onyx";
import { ref } from "vue";

const tempOverlayOpen = ref(true);
</script>

<template>
  <Teleport to="body">
    <div v-if="tempOverlayOpen" class="backdrop"></div>
    <div class="temp-overlay">
      <button class="demo temp-overlay__hinge" @click="tempOverlayOpen = !tempOverlayOpen">
        <OnyxIcon v-if="tempOverlayOpen" :icon="chevronRightSmall" />
        <OnyxIcon v-else :icon="chevronLeftSmall" />
      </button>
      <div v-if="tempOverlayOpen" class="demo temp-overlay__content">
        <h3>Temp overlay</h3>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped></style>
