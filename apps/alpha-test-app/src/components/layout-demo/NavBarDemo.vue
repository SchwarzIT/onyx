<script lang="ts" setup>
import { OnyxButton } from "sit-onyx";

const isLeftAligned = defineModel<boolean>();
</script>

<template>
  <div class="nav-bar" :class="{ 'nav-bar--left': isLeftAligned }">
    <strong>Top nav bar</strong> |

    <slot></slot>

    <OnyxButton
      style="display: inline-block"
      label="switch nav"
      @click="isLeftAligned = !isLeftAligned"
    />
  </div>
</template>

<style lang="scss" scoped>
.nav-bar {
  outline: 1px solid lightgrey;
  background-color: white;
  height: 50px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 1rem;

  &--left {
    flex-flow: column nowrap;
    width: 70px;
    height: 100%;
  }
}
</style>
