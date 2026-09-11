<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxBadge } from "sit-onyx";
</script>

<template>
  <OnyxBadge>Example label</OnyxBadge>
  <OnyxBadge :icon="iconPlaceholder" />
  <OnyxBadge dot />
</template>
