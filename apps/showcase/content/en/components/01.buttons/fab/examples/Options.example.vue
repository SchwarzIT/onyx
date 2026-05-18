<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxFAB, OnyxFABItem } from "sit-onyx";

const handleClick = () => {
  // your logic here...
};
</script>

<template>
  <OnyxFAB label="Example label" :icon="iconPlaceholder" hide-label>
    <OnyxFABItem label="Action 3" :icon="iconPlaceholder" @click="handleClick" />
    <OnyxFABItem label="Action 2" :icon="iconPlaceholder" @click="handleClick" />
    <OnyxFABItem label="Action 1" :icon="iconPlaceholder" @click="handleClick" />
  </OnyxFAB>
</template>
