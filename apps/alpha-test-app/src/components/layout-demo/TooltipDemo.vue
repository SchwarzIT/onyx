<script lang="ts" setup>
import { OnyxTooltip } from "sit-onyx";

const props = defineProps<{
  forceTooltip?: boolean;
}>();
</script>

<template>
  <OnyxTooltip
    :open="props.forceTooltip != undefined ? props.forceTooltip : undefined"
    text="Hi, I am the tooltip"
    position="bottom"
  >
    Tooltip parent
  </OnyxTooltip>
</template>
