<script lang="ts" setup>
import { OnyxSelect } from "sit-onyx";
</script>

<template>
  <OnyxSelect label="Select" list-label="List label" placeholder="Placeholder" :options="[]" />
</template>

<style lang="scss" scoped>
.onyx-select {
  width: 100%;
}
</style>
