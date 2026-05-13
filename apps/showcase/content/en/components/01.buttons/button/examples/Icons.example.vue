<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxButton } from "sit-onyx";
</script>

<template>
  <OnyxButton label="Left icon" :icon="iconPlaceholder" />
  <OnyxButton label="Right icon" :icon="iconPlaceholder" icon-position="right" />
</template>
