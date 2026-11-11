<script lang="ts" setup>
import { OnyxBadge } from "sit-onyx";
</script>

<template>
  <div class="list">
    <OnyxBadge>Badge</OnyxBadge>
    <OnyxBadge>Badge</OnyxBadge>
    <OnyxBadge color="neutral">+3 more</OnyxBadge>
  </div>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  align-items: center;
  gap: var(--onyx-density-sm);
}
</style>
