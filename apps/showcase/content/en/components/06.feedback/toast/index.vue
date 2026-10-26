<script lang="ts" setup>
import { OnyxToastMessage } from "sit-onyx";
</script>

<template>
  <div class="wrapper">
    <OnyxToastMessage
      headline="Toast"
      description="Lorem ipsum dolor sit amet consectetur. Felis euismod sit amet nulla."
      color="success"
    />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  padding: var(--onyx-density-md); // needed to not cut off the shadow
  width: 100%;
}

.onyx-toast-message {
  zoom: 0.8;

  :deep(.onyx-toast-message__progress-bar) {
    animation-play-state: paused;
    animation-delay: -1.5s;
  }
}
</style>
