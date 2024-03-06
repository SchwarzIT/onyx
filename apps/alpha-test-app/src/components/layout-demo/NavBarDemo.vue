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
  border: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
  height: 3.125rem;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: var(--onyx-spacing-md);

  &--left {
    flex-flow: column nowrap;
    width: 4.375rem;
    height: 100%;
  }
}
</style>
