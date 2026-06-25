<script lang="ts" setup>
import { OnyxButton, OnyxEmpty } from "sit-onyx";
</script>

<template>
  <OnyxEmpty>
    No data found
    <template #description> There is no data available that match your selected filters. </template>

    <template #buttons>
      <OnyxButton color="neutral" label="Button" />
      <OnyxButton label="Button" />
    </template>
  </OnyxEmpty>
</template>
