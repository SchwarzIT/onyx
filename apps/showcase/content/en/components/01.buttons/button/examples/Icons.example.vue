<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxButton } from "sit-onyx";

const handleClick = () => {
  // your logic here...
};
</script>

<template>
  <OnyxButton label="Left icon" :icon="iconPlaceholder" @click="handleClick" />
  <OnyxButton
    label="Right icon"
    :icon="iconPlaceholder"
    icon-position="right"
    @click="handleClick"
  />
</template>
