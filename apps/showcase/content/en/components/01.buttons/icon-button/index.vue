<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxIconButton } from "sit-onyx";
</script>

<template>
  <OnyxIconButton label="Icon button" :icon="iconPlaceholder" />
  <OnyxIconButton label="Icon button" :icon="iconPlaceholder" color="neutral" />
  <OnyxIconButton label="Icon button" :icon="iconPlaceholder" color="danger" />
</template>
