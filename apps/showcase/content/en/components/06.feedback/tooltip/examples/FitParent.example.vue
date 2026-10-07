<script lang="ts" setup>
import { OnyxButton, OnyxTooltip } from "sit-onyx";
</script>

<template>
  <OnyxTooltip text="Example tooltip text..." fit-parent>
    <template #default="{ trigger }">
      <OnyxButton label="Hover me" v-bind="trigger" />
    </template>
  </OnyxTooltip>
</template>
