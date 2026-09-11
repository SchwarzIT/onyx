<script lang="ts" setup>
import { OnyxInfoCard } from "sit-onyx";

const handleClose = () => {
  // your close logic here, e.g. store a flag in the browsers local storage
  // so the info card is not visible when re-loading the application
};
</script>

<template>
  <OnyxInfoCard headline="Example headline" closable @close="handleClose">
    Lorem ipsum dolor sit amet consectetur. Felis euismod sit amet nulla nulla amet libero sed. Id
    non adipiscing duis felis volutpat.
  </OnyxInfoCard>
</template>
