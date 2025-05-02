<!-- Currently slot props are not supported by Playwright, so we need to provide a custom wrapper. See issue: https://github.com/microsoft/playwright/issues/18758 -->
<script lang="ts" setup>
import OnyxButton from "../OnyxButton/OnyxButton.vue";
import OnyxTooltip from "./OnyxTooltip.vue";
import type { OnyxTooltipProps } from "./types";

const props = defineProps<OnyxTooltipProps>();
</script>

<template>
  <OnyxTooltip v-bind="props">
    <template #default="{ trigger }">
      <OnyxButton type="button" label="Trigger" v-bind="trigger" />
    </template>
  </OnyxTooltip>
</template>
