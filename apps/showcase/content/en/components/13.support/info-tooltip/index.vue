<script lang="ts" setup>
import { OnyxInfoTooltip } from "sit-onyx";
</script>

<template>
  <OnyxInfoTooltip text="Info tooltip" position="top" alignment="center" trigger="hover" open />
</template>

<style lang="scss" scoped>
:deep(.onyx-tooltip-wrapper) {
  margin-bottom: -2.25rem;
}
</style>
