<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxFAB } from "sit-onyx";
</script>

<template>
  <OnyxFAB label="FAB" :icon="iconPlaceholder" hide-label />
</template>

<style lang="scss" scoped>
.onyx-fab {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: max-content;
}
</style>
