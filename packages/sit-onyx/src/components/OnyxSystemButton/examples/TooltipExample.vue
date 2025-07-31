<script lang="ts" setup>
import { iconMoreVertical } from "@sit-onyx/icons";
import { OnyxSystemButton, OnyxTooltip } from "../../../index.js";
</script>

<template>
  <OnyxTooltip text="Tooltip text">
    <template #default="{ trigger }">
      <OnyxSystemButton v-bind="trigger" label="Button label" :icon="iconMoreVertical" />
    </template>
  </OnyxTooltip>
</template>
