<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxIconButton } from "sit-onyx";
</script>

<template>
  <OnyxIconButton label="Loading" :icon="iconPlaceholder" loading />
  <OnyxIconButton label="Skeleton" :icon="iconPlaceholder" skeleton />
</template>
