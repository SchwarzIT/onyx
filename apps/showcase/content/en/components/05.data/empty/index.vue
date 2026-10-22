<script lang="ts" setup>
import { OnyxEmpty } from "sit-onyx";
</script>

<template>
  <OnyxEmpty>
    No data found
    <template #description> Lorem ipsum dolor sit amet. </template>
  </OnyxEmpty>
</template>

<style lang="scss" scoped>
.onyx-empty {
  zoom: 0.65;
}
</style>
