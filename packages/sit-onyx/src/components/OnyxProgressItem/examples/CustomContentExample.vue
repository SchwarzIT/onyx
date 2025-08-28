<script lang="ts" setup>
import { OnyxProgressItem } from "../../../index.js";
</script>

<template>
  <OnyxProgressItem label="Custom label" :value="1">
    <template #default="{ label }">
      {{ label }}
      <div class="description">Description</div>
    </template>
  </OnyxProgressItem>
</template>

<style lang="scss" scoped>
.description {
  color: var(--onyx-color-text-icons-neutral-soft);
  font-weight: var(--onyx-font-weight-regular);
  font-size: var(--onyx-font-size-sm);
  line-height: var(--onyx-font-line-height-sm);
}
</style>
