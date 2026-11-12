<script lang="ts" setup>
import { iconVolumeUp } from "@sit-onyx/icons";
import { OnyxIcon, OnyxVisuallyHidden, OnyxHeadline } from "sit-onyx";
</script>

<template>
  <div class="container onyx-text--small">
    <OnyxIcon :icon="iconVolumeUp" size="64px" />
    <OnyxHeadline is="h3">
      The following content is hidden but announced by screen readers:
    </OnyxHeadline>
    <OnyxVisuallyHidden>Example screen reader content.</OnyxVisuallyHidden>
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
