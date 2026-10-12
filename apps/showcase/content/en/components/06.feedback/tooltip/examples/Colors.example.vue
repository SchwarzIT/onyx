<script lang="ts" setup>
import { OnyxTag, OnyxTooltip } from "sit-onyx";
</script>

<template>
  <OnyxTooltip text="Example tooltip text.">
    <template #default="{ trigger }">
      <OnyxTag label="Neutral" v-bind="trigger" />
    </template>
  </OnyxTooltip>

  <OnyxTooltip text="Example tooltip text." color="danger">
    <template #default="{ trigger }">
      <OnyxTag label="Danger" color="danger" v-bind="trigger" />
    </template>
  </OnyxTooltip>

  <OnyxTooltip text="Example tooltip text." color="success">
    <template #default="{ trigger }">
      <OnyxTag label="Success" color="success" v-bind="trigger" />
    </template>
  </OnyxTooltip>
</template>
