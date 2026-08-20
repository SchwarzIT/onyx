<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxBadge, OnyxIcon, OnyxNavItem } from "sit-onyx";
</script>

<template>
  <OnyxNavItem label="Example page" link="#example-page" />

  <OnyxNavItem label="Example page" link="#example-page-2">
    <OnyxIcon :icon="iconPlaceholder" />
    Example page
    <OnyxBadge color="warning" dot />
  </OnyxNavItem>
</template>
