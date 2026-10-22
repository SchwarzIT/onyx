<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxTag } from "sit-onyx";
</script>

<template>
  <OnyxTag label="Tag" />
  <OnyxTag label="Tag" :icon="iconPlaceholder" />
</template>
