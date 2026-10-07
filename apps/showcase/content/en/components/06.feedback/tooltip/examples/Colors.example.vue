<script lang="ts" setup>
import { OnyxButton, OnyxTooltip } from "sit-onyx";
</script>

<template>
  <OnyxTooltip text="Example tooltip text...">
    <template #default="{ trigger }">
      <OnyxButton label="Neutral" v-bind="trigger" />
    </template>
  </OnyxTooltip>

  <OnyxTooltip text="Example tooltip text..." color="danger">
    <template #default="{ trigger }">
      <OnyxButton label="Danger" color="danger" v-bind="trigger" />
    </template>
  </OnyxTooltip>

  <OnyxTooltip text="Example tooltip text..." color="success">
    <template #default="{ trigger }">
      <OnyxButton label="Success" v-bind="trigger" />
    </template>
  </OnyxTooltip>
</template>
