<script lang="ts" setup>
import { iconCircleInformation } from "@sit-onyx/icons";
import { OnyxButton, OnyxTooltip } from "sit-onyx";
</script>

<template>
  <OnyxTooltip text="Example tooltip text..." :icon="iconCircleInformation">
    <template #default="{ trigger }">
      <OnyxButton label="Hover me" v-bind="trigger" />
    </template>
  </OnyxTooltip>

  <OnyxTooltip text="Example tooltip text..." :icon="iconCircleInformation" trigger="click">
    <template #default="{ trigger }">
      <OnyxButton label="Click me" v-bind="trigger" />
    </template>
  </OnyxTooltip>
</template>
