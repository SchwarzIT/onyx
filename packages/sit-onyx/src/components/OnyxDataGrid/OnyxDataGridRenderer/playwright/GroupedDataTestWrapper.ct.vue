<script lang="ts" setup>
import { GroupedData } from "../OnyxDataGridRenderer.stories";
import OnyxDataGridRenderer from "../OnyxDataGridRenderer.vue";
import type { OnyxDataGridRendererProps } from "../types";

const props = defineProps<Pick<OnyxDataGridRendererProps, "density">>();
</script>

<template>
  <OnyxDataGridRenderer v-bind="{ ...props, ...GroupedData.args }" striped with-vertical-borders />
</template>
