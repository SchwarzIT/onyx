<!-- Currently slot props are not supported by Playwright, so we need to provide a custom wrapper. See issue: https://github.com/microsoft/playwright/issues/18758 -->
<script lang="ts" setup>
import OnyxTooltip from "./OnyxTooltip.vue";
import type { OnyxTooltipProps } from "./types.js";

const props = defineProps<OnyxTooltipProps>();
</script>

<template>
  <OnyxTooltip v-bind="props">
    <template #default="{ trigger }">
      <button type="button" v-bind="trigger">test slot</button>
    </template>
  </OnyxTooltip>
</template>
