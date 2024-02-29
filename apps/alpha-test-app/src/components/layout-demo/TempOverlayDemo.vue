<script lang="ts" setup>
import chevronLeftSmall from "@sit-onyx/icons/chevron-left-small.svg?raw";
import chevronRightSmall from "@sit-onyx/icons/chevron-right-small.svg?raw";
import { OnyxButton, OnyxHeadline } from "sit-onyx";
import { ref } from "vue";

const tempOverlayOpen = ref(true);
</script>

<template>
  <Teleport to="body">
    <div v-if="tempOverlayOpen" class="backdrop"></div>
    <div class="temp-overlay">
      <OnyxButton
        class="temp-overlay__hinge"
        :icon="tempOverlayOpen ? chevronRightSmall : chevronLeftSmall"
        variation="secondary"
        @click="tempOverlayOpen = !tempOverlayOpen"
      />
      <div v-if="tempOverlayOpen" class="demo temp-overlay__content">
        <OnyxHeadline is="h2">Temp overlay</OnyxHeadline>
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.temp-overlay {
  position: absolute;
  z-index: var(--onyx-z-index-overlay);
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;

  &__content {
    width: 250px;
  }

  &__hinge {
    margin: auto 0;
  }
}
</style>
