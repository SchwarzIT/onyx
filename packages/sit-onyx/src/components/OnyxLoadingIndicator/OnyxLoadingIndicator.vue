<script lang="ts" setup>
import CircleSpinner from "./CircleSpinner.vue";
import LoadingDots from "./LoadingDots.vue";
import type { OnyxLoadingIndicatorProps } from "./types";

const props = withDefaults(defineProps<OnyxLoadingIndicatorProps>(), {
  type: "circle",
});
</script>

<template>
  <CircleSpinner v-if="props.type === 'circle'" />
  <LoadingDots v-else-if="props.type === 'dots'" />
</template>
