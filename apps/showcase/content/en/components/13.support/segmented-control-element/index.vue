<script lang="ts" setup>
import { iconPlaceholder } from "@sit-onyx/icons";
import { OnyxSegmentedControlElement } from "sit-onyx";
</script>

<template>
  <OnyxSegmentedControlElement
    label="Option"
    :icon="iconPlaceholder"
    name="segmented-control"
    value="option-1"
  />
</template>
