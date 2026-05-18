<script lang="ts" setup>
import { iconArrowSmallUp } from "@sit-onyx/icons";
import { OnyxFAB } from "sit-onyx";

const handleClick = () => {
  // your logic here...
};
</script>

<template>
  <OnyxFAB label="Back to top" :icon="iconArrowSmallUp" @click="handleClick" />
</template>
