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

<style scoped>
.wrapper {
  /* needed to not cut off the shadow */
  padding: var(--onyx-density-md);
  width: 100%;
  zoom: 0.6;
}

.onyx-toast-message {
  :deep(.onyx-toast-message__progress-bar) {
    animation-play-state: paused;
    animation-delay: -1.5s;
  }
}
</style>
