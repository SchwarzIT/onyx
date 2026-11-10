<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxNavItem, OnyxIcon } from "sit-onyx";
</script>

<template>
  <OnyxNavItem label="Nav item" active>
    <OnyxIcon :icon="iconPlaceholder" />
    Nav item
  </OnyxNavItem>
</template>
