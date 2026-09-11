<script lang="ts" setup>
import { iconCircleX } from "@sit-onyx/icons";
import { OnyxEmpty, OnyxIcon } from "sit-onyx";
</script>

<template>
  <OnyxEmpty>
    Access denied
    <template #description> You don't have permissions to access this page. </template>

    <template #icon>
      <OnyxIcon :icon="iconCircleX" color="danger" size="48px" />
    </template>
  </OnyxEmpty>
</template>
