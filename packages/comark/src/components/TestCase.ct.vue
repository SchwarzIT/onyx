<script setup lang="ts">
import type { MarkdownProps } from "@comark/vue";
import { OnyxMarkdown } from "../index.js";

const props = defineProps<MarkdownProps>();
</script>

<template>
  <Suspense>
    <!-- eslint-disable-next-line vue/no-static-inline-styles -- CSS <style> not working -->
    <OnyxMarkdown :style="{ width: 'max-content', padding: '1rem' }" v-bind="props" />
  </Suspense>
</template>
