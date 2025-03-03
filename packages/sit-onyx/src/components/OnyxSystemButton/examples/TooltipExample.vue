<script lang="ts" setup>
import moreVertical from "@sit-onyx/icons/more-vertical.svg?raw";
import { OnyxSystemButton, OnyxTooltip } from "../../..";
</script>

<template>
  <OnyxTooltip text="Tooltip text">
    <template #default="{ trigger }">
      <OnyxSystemButton v-bind="trigger" label="Button label" :icon="moreVertical" />
    </template>
  </OnyxTooltip>
</template>
