<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxInput, OnyxFormElementAction } from "sit-onyx";
</script>

<template>
  <OnyxInput label="Input" placeholder="Placeholder">
    <template #trailingIcons>
      <OnyxFormElementAction label="Action label" :icon="iconPlaceholder" />
    </template>
  </OnyxInput>
</template>

<style scoped>
.onyx-input {
  width: 100%;
}
</style>
