<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxInput, OnyxUnstableFormElementAction } from "sit-onyx";
</script>

<template>
  <OnyxInput label="Input" placeholder="Placeholder">
    <template #trailingIcons>
      <OnyxUnstableFormElementAction label="Action label" :icon="iconPlaceholder" />
    </template>
  </OnyxInput>
</template>

<style lang="scss" scoped>
.onyx-input {
  width: 100%;
}
</style>
