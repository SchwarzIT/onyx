<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxNavButton } from "sit-onyx";

const handleClick = () => {
  // handle click here...
};
</script>

<template>
  <OnyxNavButton label="Example action" :icon="iconPlaceholder" hide-label @click="handleClick" />
</template>
