<script lang="ts" setup>
import OnyxResizeHandle from "../OnyxResizeHandle.vue";
</script>

<template>
  <div>
    Drag the right border to see the resize handler in action.

    <div class="container">
      <OnyxResizeHandle />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  background-color: var(--onyx-color-base-info-100);
  width: 4rem;
  height: 8rem;
}
</style>
