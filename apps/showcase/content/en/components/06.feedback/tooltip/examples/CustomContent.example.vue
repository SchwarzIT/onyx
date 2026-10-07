<script lang="ts" setup>
import { OnyxButton, OnyxTooltip } from "sit-onyx";
</script>

<template>
  <OnyxTooltip>
    <template #default="{ trigger }">
      <OnyxButton label="Hover me" v-bind="trigger" />
    </template>

    <template #tooltip>
      This is
      <strong>custom content</strong>
      inside the tooltip.
    </template>
  </OnyxTooltip>
</template>
