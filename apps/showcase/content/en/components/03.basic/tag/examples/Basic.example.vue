<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxTag } from "sit-onyx";
</script>

<template>
  <OnyxTag label="Example label" />
  <OnyxTag label="Example label" :icon="iconPlaceholder" />
</template>
