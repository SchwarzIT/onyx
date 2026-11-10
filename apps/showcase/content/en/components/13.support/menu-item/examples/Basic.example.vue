<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxMenuItem } from "sit-onyx";
</script>

<template>
  <OnyxMenuItem label="Neutral" :icon="iconPlaceholder" />
  <OnyxMenuItem label="Active" :icon="iconPlaceholder" active />
  <OnyxMenuItem label="Danger" :icon="iconPlaceholder" color="danger" />
</template>
