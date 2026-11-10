<script lang="ts" setup>
import { OnyxMenuItem, OnyxTag } from "sit-onyx";
</script>

<template>
  <OnyxMenuItem>
    <span class="label">Custom content</span>
    <OnyxTag label="Tag" />
  </OnyxMenuItem>
</template>

<style lang="scss" scoped>
.label {
  flex-grow: 1;
}
</style>
