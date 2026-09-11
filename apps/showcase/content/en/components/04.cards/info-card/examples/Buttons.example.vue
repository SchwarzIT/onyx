<script lang="ts" setup>
import { OnyxButton, OnyxInfoCard } from "sit-onyx";
</script>

<template>
  <OnyxInfoCard headline="Example headline">
    Lorem ipsum dolor sit amet consectetur. Felis euismod sit amet nulla nulla amet libero sed. Id
    non adipiscing duis felis volutpat.

    <template #buttons>
      <OnyxButton color="neutral" label="Button" />
      <OnyxButton color="neutral" label="Button" />
    </template>
  </OnyxInfoCard>
</template>
