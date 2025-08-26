<script lang="ts" setup>
import { iconCircleInformation } from "@sit-onyx/icons";
import { OnyxButton, OnyxTooltip } from "../../../index.js";
</script>

<template>
  <OnyxTooltip
    :icon="iconCircleInformation"
    text="Clicking this button won't do anything substantial, but will give the actor a slight sense of gratification."
  >
    <template #default="{ trigger }">
      <OnyxButton label="Slot content goes here" v-bind="trigger" />
    </template>
  </OnyxTooltip>
</template>
