<script lang="ts" setup>
import { Default } from "../OnyxDataGridRenderer.stories";
import OnyxDataGridRenderer from "../OnyxDataGridRenderer.vue";
import type { OnyxDataGridRendererProps } from "../types.js";

const props = defineProps<Pick<OnyxDataGridRendererProps, "density">>();
</script>

<template>
  <OnyxDataGridRenderer v-bind="{ ...props, ...Default.args }" striped with-vertical-borders />
</template>
