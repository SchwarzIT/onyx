<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxFAB } from "sit-onyx";

const handleClick = () => {
  // your logic here...
};
</script>

<template>
  <OnyxFAB label="Example label" :icon="iconPlaceholder" hide-label @click="handleClick" />
</template>
