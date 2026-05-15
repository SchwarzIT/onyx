<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxMenuItem, OnyxSplitButton } from "sit-onyx";
</script>

<template>
  <OnyxSplitButton label="Default" color="neutral">
    <template #options>
      <OnyxMenuItem label="Option 1" :icon="iconPlaceholder" />
      <OnyxMenuItem label="Option 2" :icon="iconPlaceholder" />
      <OnyxMenuItem label="Option 3" :icon="iconPlaceholder" />
    </template>
  </OnyxSplitButton>

  <OnyxSplitButton label="Outline" color="neutral" mode="outline">
    <template #options>
      <OnyxMenuItem label="Option 1" :icon="iconPlaceholder" />
      <OnyxMenuItem label="Option 2" :icon="iconPlaceholder" />
      <OnyxMenuItem label="Option 3" :icon="iconPlaceholder" />
    </template>
  </OnyxSplitButton>

  <OnyxSplitButton label="Plain" color="neutral" mode="plain">
    <template #options>
      <OnyxMenuItem label="Option 1" :icon="iconPlaceholder" />
      <OnyxMenuItem label="Option 2" :icon="iconPlaceholder" />
      <OnyxMenuItem label="Option 3" :icon="iconPlaceholder" />
    </template>
  </OnyxSplitButton>
</template>
