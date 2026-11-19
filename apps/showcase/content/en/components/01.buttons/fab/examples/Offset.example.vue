<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxFAB } from "sit-onyx";

const handleClick = () => {
  // your logic here...
};
</script>

<template>
  <OnyxFAB
    class="fab"
    label="Example label"
    :icon="iconPlaceholder"
    hide-label
    @click="handleClick"
  />
</template>

<style scoped>
.fab {
  --onyx-fab-offset-x: 5rem;
  --onyx-fab-offset-y: 1rem;
}
</style>
