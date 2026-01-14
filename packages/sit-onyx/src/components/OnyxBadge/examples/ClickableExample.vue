<script lang="ts" setup>
import { OnyxBadge } from "../../../index.js";

const handleClick = () => {
  alert("Badge clicked!");
};
</script>

<template>
  <!-- Tip: If you want to use a clickable badge for filters (toggling selected state), prefer the "OnyxFilterBadge" instead -->
  <OnyxBadge clickable="Click to do something" @click="handleClick"> Click me </OnyxBadge>
</template>
