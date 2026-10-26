<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxTooltip } from "sit-onyx";
</script>

<template>
  <OnyxTooltip text="Tooltip" :icon="iconPlaceholder" position="top" alignment="center" open>
    <template #default="{ trigger }">
      <div v-bind="trigger"></div>
    </template>
  </OnyxTooltip>
</template>

<style lang="scss" scoped>
.onyx-tooltip-wrapper {
  margin-bottom: -2.25rem;
}
</style>
