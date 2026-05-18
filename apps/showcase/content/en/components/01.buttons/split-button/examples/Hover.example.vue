<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxMenuItem, OnyxSplitButton } from "sit-onyx";

const handleClick = () => {
  // your logic here...
};
</script>

<template>
  <OnyxSplitButton label="Example button" trigger="hover" @click="handleClick">
    <template #options>
      <OnyxMenuItem label="Option 1" :icon="iconPlaceholder" @click="handleClick" />
      <OnyxMenuItem label="Option 2" :icon="iconPlaceholder" @click="handleClick" />
      <OnyxMenuItem label="Option 3" :icon="iconPlaceholder" @click="handleClick" />
    </template>
  </OnyxSplitButton>
</template>
