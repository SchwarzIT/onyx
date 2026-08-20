<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxUnstableNavButton } from "sit-onyx";

const handleClick = () => {
  // handle click here...
};
</script>

<template>
  <OnyxUnstableNavButton label="Example action" :icon="iconPlaceholder" @click="handleClick" />
</template>
