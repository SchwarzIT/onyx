<script lang="ts" setup>
import OnyxCircleSpinner from "./OnyxCircleSpinner.vue";
import OnyxLoadingDots from "./OnyxLoadingDots.vue";
import type { OnyxLoadingIndicatorProps } from "./types.js";

const props = withDefaults(defineProps<OnyxLoadingIndicatorProps>(), {
  type: "dots",
});
</script>

<template>
  <OnyxCircleSpinner v-if="props.type === 'circle'" />
  <OnyxLoadingDots v-else-if="props.type === 'dots'" />
</template>
