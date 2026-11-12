<script lang="ts" setup>
import { iconVolumeUp } from "@sit-onyx/icons";
import { OnyxIcon, OnyxHeadline } from "sit-onyx";
</script>

<template>
  <div class="container onyx-text--small">
    <OnyxIcon :icon="iconVolumeUp" size="32px" />
    <OnyxHeadline is="h4">
      The following content is hidden but announced by screen readers:
    </OnyxHeadline>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: var(--onyx-density-sm);
}
</style>
