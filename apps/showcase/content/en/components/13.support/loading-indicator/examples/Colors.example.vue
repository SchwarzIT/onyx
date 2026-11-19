<script lang="ts" setup>
import { OnyxLoadingIndicator } from "sit-onyx";
</script>

<template>
  <OnyxLoadingIndicator class="loading" />
</template>

<style scoped>
.loading {
  color: var(--onyx-color-text-icons-primary-medium);
}
</style>
