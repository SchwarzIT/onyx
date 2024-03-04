<script lang="ts" setup>
import { defineModel } from "vue";

const showFlyout = defineModel<boolean>();

defineProps<{ small?: boolean }>();
</script>

<template>
  <label class="flyout-demo">
    Demo Drop Down:
    <div class="flyout-parent">
      <input :class="{ 'small-input': small }" width="10px" @click="showFlyout = !showFlyout" />
      <div v-if="showFlyout" class="flyout">
        <slot></slot>
      </div>
    </div>
  </label>
</template>

<style lang="scss" scoped>
.flyout-parent {
  position: relative;
}
.flyout {
  outline: 1px solid lightgrey;
  background-color: white;
  position: absolute;
  z-index: var(--onyx-z-index-flyout);
  height: fit-content;
  min-width: 100px;
  right: 0;
  left: 0;
}
.flyout-demo {
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
}
.small-input {
  width: 90%;
}
</style>
