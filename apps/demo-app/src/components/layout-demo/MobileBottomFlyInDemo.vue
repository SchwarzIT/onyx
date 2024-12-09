<script lang="ts" setup>
import { OnyxHeadline } from "sit-onyx";
import { FooterDemo } from ".";

defineProps<{
  showFooter?: boolean;
}>();

defineSlots<{
  /**
   * Fly-in content.
   */
  default?(): unknown;
}>();
</script>

<template>
  <div class="mobile-fly-in" :class="{ 'mobile-fly-in--split': showFooter }">
    <div>
      <OnyxHeadline is="h2">Mobile fly-in</OnyxHeadline>
      <slot></slot>
    </div>
    <FooterDemo v-if="showFooter" />
  </div>
</template>

<style lang="scss" scoped>
.mobile-fly-in {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  max-height: fit-content;
  margin: auto;

  border: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
  background-color: var(--onyx-color-base-background-blank);
}
</style>
