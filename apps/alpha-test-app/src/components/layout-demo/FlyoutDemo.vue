<script lang="ts" setup>
import { defineModel } from "vue";

const showFlyout = defineModel<boolean>();
</script>

<template>
  <label>
    Demo Drop Down:
    <span class="flyout-parent">
      <input @click="showFlyout = !showFlyout" />
      <div v-if="showFlyout" class="demo flyout">
        <slot></slot>
      </div>
    </span>
  </label>
</template>

<style lang="scss" scoped>
.flyout-parent {
  position: relative;
}
.flyout {
  position: absolute;
  z-index: var(--onyx-z-index-flyout);
  height: fit-content;
  min-width: 100px;
  right: 0;
  left: 0;
}
</style>
