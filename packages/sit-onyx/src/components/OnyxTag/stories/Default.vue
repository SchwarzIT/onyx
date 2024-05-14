<script lang="ts" setup>
import { ONYX_COLORS, OnyxTag } from "sit-onyx";
</script>

<template>
  <div class="wrapper">
    <OnyxTag v-for="color in ONYX_COLORS" :key="color" label="Tag" :color="color" />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  gap: var(--onyx-spacing-xs);
}
</style>
