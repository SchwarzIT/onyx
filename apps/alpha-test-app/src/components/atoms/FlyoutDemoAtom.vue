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

<style lang="scss" scoped></style>
