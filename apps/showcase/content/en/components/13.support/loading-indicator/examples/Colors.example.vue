<script lang="ts" setup>
import { OnyxLoadingIndicator } from "sit-onyx";
</script>

<template>
  <OnyxLoadingIndicator class="loading" />
</template>

<style lang="scss" scoped>
.loading {
  color: var(--onyx-color-text-icons-primary-medium);
}
</style>
