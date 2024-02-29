<script lang="ts" setup>
import { OnyxHeadline } from "sit-onyx";
import { FooterDemo } from ".";
defineProps<{
  showFooter?: boolean;
}>();
</script>

<template>
  <div class="demo mobile-fly-in" :class="{ 'mobile-fly-in--split': showFooter }">
    <div class="mobile-fly-in__content">
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
}
</style>
