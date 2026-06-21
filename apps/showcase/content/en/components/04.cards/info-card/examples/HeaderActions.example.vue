<script lang="ts" setup>
import { OnyxInfoCard, OnyxMenuItem } from "sit-onyx";
</script>

<template>
  <OnyxInfoCard headline="Example headline">
    Lorem ipsum dolor sit amet consectetur. Felis euismod sit amet nulla nulla amet libero sed. Id
    non adipiscing duis felis volutpat.

    <template #headerActions>
      <OnyxMenuItem label="Action 1" />
      <OnyxMenuItem label="Action 2" />
    </template>
  </OnyxInfoCard>
</template>
