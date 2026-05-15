<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxMenuItem, OnyxSplitButton } from "sit-onyx";
</script>

<template>
  <OnyxSplitButton label="Left icon" :icon="iconPlaceholder">
    <template #options>
      <OnyxMenuItem label="Option 1" :icon="iconPlaceholder" />
      <OnyxMenuItem label="Option 2" :icon="iconPlaceholder" />
      <OnyxMenuItem label="Option 3" :icon="iconPlaceholder" />
    </template>
  </OnyxSplitButton>

  <OnyxSplitButton label="Right icon" :icon="iconPlaceholder" icon-position="right">
    <template #options>
      <OnyxMenuItem label="Option 1" :icon="iconPlaceholder" />
      <OnyxMenuItem label="Option 2" :icon="iconPlaceholder" />
      <OnyxMenuItem label="Option 3" :icon="iconPlaceholder" />
    </template>
  </OnyxSplitButton>
</template>
