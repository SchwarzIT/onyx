<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxMenuItem, OnyxSplitButton } from "sit-onyx";

const handleClick = () => {
  // your logic here...
};
</script>

<template>
  <OnyxSplitButton label="Left icon" :icon="iconPlaceholder" @click="handleClick">
    <template #options>
      <OnyxMenuItem label="Option 1" :icon="iconPlaceholder" @click="handleClick" />
      <OnyxMenuItem label="Option 2" :icon="iconPlaceholder" @click="handleClick" />
      <OnyxMenuItem label="Option 3" :icon="iconPlaceholder" @click="handleClick" />
    </template>
  </OnyxSplitButton>

  <OnyxSplitButton
    label="Right icon"
    :icon="iconPlaceholder"
    icon-position="right"
    @click="handleClick"
  >
    <template #options>
      <OnyxMenuItem label="Option 1" :icon="iconPlaceholder" @click="handleClick" />
      <OnyxMenuItem label="Option 2" :icon="iconPlaceholder" @click="handleClick" />
      <OnyxMenuItem label="Option 3" :icon="iconPlaceholder" @click="handleClick" />
    </template>
  </OnyxSplitButton>
</template>
