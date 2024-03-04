<script lang="ts" setup>
import { defineModel } from "vue";

const showFlyout = defineModel<boolean>();

defineProps<{ small?: boolean }>();
</script>

<template>
  <label class="flyout-demo" :class="{ 'flyout-demo--small': small }">
    Demo Drop Down:
    <div class="flyout-demo__parent">
      <input class="flyout-demo__input" width="10px" @click="showFlyout = !showFlyout" />
      <div v-if="showFlyout" class="flyout-demo__flyout">
        <slot></slot>
      </div>
    </div>
  </label>
</template>

<style lang="scss" scoped>
.flyout-demo {
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;

  &__parent {
    position: relative;
  }
  &__flyout {
    outline: 1px solid lightgrey;
    background-color: white;
    position: absolute;
    z-index: var(--onyx-z-index-flyout);
    height: fit-content;
    min-width: 100px;
    right: 0;
    left: 0;
  }

  &--small .flyout-demo__input {
    width: 90%;
  }
}
</style>
